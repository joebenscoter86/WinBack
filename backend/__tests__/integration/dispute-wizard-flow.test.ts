// IMPORTANT: import mocks BEFORE anything else so vi.mock() hoists apply
// to all subsequent imports of the mocked modules.
import "./mocks";

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient } from "@supabase/supabase-js";
import {
  TEST_ACCOUNT_ID,
  TEST_DISPUTE_ID,
} from "./fixtures";

// Real Supabase client — the test asserts on actual dev DB state.
// Uses service role key to bypass RLS for teardown deletes.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "WIN-43 integration test requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env.local"
  );
}

const testDb = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function cleanupTestData(): Promise<void> {
  // FK constraint disputes_merchant_id_fkey is ON DELETE RESTRICT, so
  // we must delete child rows explicitly before removing the merchant.

  // 1. Find the test merchant id (may not exist on first run).
  const { data: merchant } = await testDb
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", TEST_ACCOUNT_ID)
    .maybeSingle();

  if (merchant) {
    // 2. Delete disputes (which cascade to evidence_files, narrative_generations
    //    if those FKs are CASCADE — otherwise add explicit deletes here).
    const { error: disputesError } = await testDb
      .from("disputes")
      .delete()
      .eq("merchant_id", merchant.id);
    if (disputesError) {
      throw new Error(
        `cleanupTestData: failed to delete test dispute rows: ${disputesError.message}`
      );
    }
  }

  // 3. Delete the merchant row.
  const { error: merchantError } = await testDb
    .from("merchants")
    .delete()
    .eq("stripe_account_id", TEST_ACCOUNT_ID);
  if (merchantError) {
    throw new Error(
      `cleanupTestData: failed to delete test merchant rows: ${merchantError.message}`
    );
  }
}

describe("WIN-43: dispute wizard integration flow", () => {
  beforeAll(async () => {
    await cleanupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  it("walks the full dispute wizard end-to-end", async () => {
    // ---- STEP 1: POST /api/disputes/{id} ----
    // Hits the dispute detail route, which normalizes the mocked Stripe
    // dispute and upserts a real row in our disputes table. This is
    // the canonical entry point — the wizard opens on the Review tab
    // which calls this route first.
    const { POST: getDisputePOST } = await import(
      "@/app/api/disputes/[disputeId]/route"
    );
    const { NextRequest } = await import("next/server");

    const step1Req = new NextRequest(
      `http://localhost/api/disputes/${TEST_DISPUTE_ID}`,
      { method: "POST", headers: { "Content-Type": "application/json" } },
    );
    const step1Res = await getDisputePOST(step1Req);
    expect(step1Res.status).toBe(200);
    const step1Body = await step1Res.json();
    expect(step1Body.data).toBeDefined();
    expect(step1Body.data.id).toBe(TEST_DISPUTE_ID);

    // DB assertions: merchant row exists, dispute row has real values
    const { data: merchantRow } = await testDb
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", TEST_ACCOUNT_ID)
      .single();
    expect(merchantRow).toBeDefined();
    expect(merchantRow?.id).toBeTruthy();

    const { data: disputeRow } = await testDb
      .from("disputes")
      .select("id, merchant_id, amount, reason_code, network")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeRow).toBeDefined();
    expect(disputeRow?.merchant_id).toBe(merchantRow?.id); // NOT null
    expect(disputeRow?.amount).toBe(14900); // NOT zero — WIN-41 regression check
    expect(disputeRow?.reason_code).toBe("10.4"); // NOT empty string
    expect(disputeRow?.network).toBe("visa");

    // ---- STEP 2: POST /api/playbooks ----
    // Fetches the visa-10.4 playbook from Supabase. Already seeded in
    // dev — see WIN-19 QA. Pure read, no DB writes to assert.
    const { POST: playbooksPOST } = await import("@/app/api/playbooks/route");

    const step2Req = new NextRequest("http://localhost/api/playbooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ network: "visa", reason_code: "10.4" }),
    });
    const step2Res = await playbooksPOST(step2Req);
    expect(step2Res.status).toBe(200);
    const step2Body = await step2Res.json();
    expect(step2Body.data).toBeDefined();
    expect(step2Body.data.network).toBe("visa");
    expect(step2Body.data.reason_code).toBe("10.4");

    // ---- STEP 3: GET /api/disputes/{id}/evidence-files (empty) ----
    const { GET: evidenceFilesGET, POST: evidenceFilesPOST } = await import(
      "@/app/api/disputes/[disputeId]/evidence-files/route"
    );

    const step3Req = new NextRequest(
      `http://localhost/api/disputes/${TEST_DISPUTE_ID}/evidence-files`,
      { method: "GET" },
    );
    const step3Res = await evidenceFilesGET(step3Req);
    expect(step3Res.status).toBe(200);
    const step3Body = await step3Res.json();
    expect(step3Body.data).toEqual([]);

    // ---- STEP 4: POST /api/disputes/{id}/evidence-files (upload metadata) ----
    // Evidence files are uploaded to Stripe client-side; this route only
    // registers the resulting metadata in our DB. No multipart needed.
    const { TEST_CHECKLIST_ITEM_KEY, TEST_STRIPE_FILE_ID } = await import(
      "./fixtures"
    );

    const step4Req = new NextRequest(
      `http://localhost/api/disputes/${TEST_DISPUTE_ID}/evidence-files`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checklist_item_key: TEST_CHECKLIST_ITEM_KEY,
          stripe_file_id: TEST_STRIPE_FILE_ID,
          file_name: "delivery-confirmation.pdf",
          file_size: 4321,
          mime_type: "pdf",
        }),
      },
    );
    const step4Res = await evidenceFilesPOST(step4Req);
    expect(step4Res.status).toBe(200);
    const step4Body = await step4Res.json();
    expect(step4Body.data).toBeDefined();

    // DB assertions: evidence_files row exists, linked to the dispute we
    // wrote in step 1 (NOT a zombie dispute with amount: 0).
    const { data: fileRow } = await testDb
      .from("evidence_files")
      .select("id, dispute_id, checklist_item_key, file_name, stripe_file_id")
      .eq("stripe_file_id", TEST_STRIPE_FILE_ID)
      .single();
    expect(fileRow).toBeDefined();
    expect(fileRow?.dispute_id).toBe(disputeRow?.id); // links to step 1's dispute
    expect(fileRow?.checklist_item_key).toBe(TEST_CHECKLIST_ITEM_KEY);
    expect(fileRow?.file_name).toBe("delivery-confirmation.pdf");

    // Regression check for WIN-41: ensure the dispute row still has
    // real values (amount/reason_code were NOT overwritten by the
    // upload route's fallback upsert).
    const { data: disputeRowAfterUpload } = await testDb
      .from("disputes")
      .select("amount, reason_code")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeRowAfterUpload?.amount).toBe(14900);
    expect(disputeRowAfterUpload?.reason_code).toBe("10.4");

    // ---- STEP 5: PATCH /api/disputes/{id} (checklist toggle) ----
    const { PATCH: disputesPATCH } = await import(
      "@/app/api/disputes/[disputeId]/route"
    );

    const step5Req = new NextRequest(
      `http://localhost/api/disputes/${TEST_DISPUTE_ID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checklist_state: { [TEST_CHECKLIST_ITEM_KEY]: true },
        }),
      },
    );
    const step5Res = await disputesPATCH(step5Req);
    expect(step5Res.status).toBe(200);

    // DB assertion: checklist_state persisted
    const { data: disputeAfterPatch } = await testDb
      .from("disputes")
      .select("checklist_state")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeAfterPatch?.checklist_state).toEqual({
      [TEST_CHECKLIST_ITEM_KEY]: true,
    });

    // ---- STEP 6: POST /api/narratives/generate ----
    // The generate route kicks off runBackgroundGeneration via after().
    // Our next/server mock replaces after() with an inline await, so the
    // background work (Claude call + DB writes) completes before this
    // response resolves. That makes the whole generation cycle observable
    // in DB state immediately after the POST returns.
    const { POST: generatePOST } = await import(
      "@/app/api/narratives/generate/route"
    );

    const step6Req = new NextRequest(
      "http://localhost/api/narratives/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dispute_id: TEST_DISPUTE_ID,
          reason_code: "10.4",
          network: "visa",
          merchant_feedback: "",
        }),
      },
    );
    const step6Res = await generatePOST(step6Req);
    expect(step6Res.status).toBe(202);
    const step6Body = await step6Res.json();
    expect(step6Body.generation_id).toBeTruthy();
    const generationId = step6Body.generation_id as string;

    // DB assertions: narrative_generations row completed, dispute has
    // narrative_text populated, counter incremented.
    const { data: genRow } = await testDb
      .from("narrative_generations")
      .select("id, status, narrative_output, error")
      .eq("id", generationId)
      .single();
    expect(genRow?.status).toBe("completed");
    expect(genRow?.error).toBeNull();
    expect(genRow?.narrative_output).toBeTruthy();

    const { data: disputeAfterGen } = await testDb
      .from("disputes")
      .select("narrative_text, narrative_generations_count")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeAfterGen?.narrative_text).toContain("Delivery Confirmation");
    expect(disputeAfterGen?.narrative_generations_count).toBe(1);
  });
});
