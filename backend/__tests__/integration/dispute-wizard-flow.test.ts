// IMPORTANT: import mocks BEFORE anything else so vi.mock() hoists apply
// to all subsequent imports of the mocked modules.
import "./mocks";

import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

// The submit route imports downloadStripeFile and uploadCombinedEvidence
// directly from "@/lib/stripe/client" (NOT the barrel), so the @/lib/stripe
// mock in ./mocks.ts does not cover them. Replace both with vi.fn() stubs so
// the WIN-20 step 10 multi-file concat test can provide buffers and capture
// the upload call without touching real Stripe. Other exports from the
// client module (getDispute, submitDispute, etc.) are preserved via
// importOriginal — the barrel mock in ./mocks.ts still overrides those on
// the @/lib/stripe re-export path, which is what the route uses for them.
vi.mock("@/lib/stripe/client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/lib/stripe/client")>();
  return {
    ...actual,
    downloadStripeFile: vi.fn(
      async (_accountId: string, _id: string) => Buffer.from([]),
    ),
    uploadCombinedEvidence: vi.fn(
      async (_accountId: string, _pdf: Buffer, _name: string) =>
        "file_combined_default",
    ),
  };
});

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

    // The generate route is fire-and-forget: it calls
    // `after(runBackgroundGeneration(...))` and returns 202 without awaiting.
    // The mocks.ts `after` override can't actually block the handler's return
    // (the route discards after()'s return value), so the background write to
    // narrative_generations races the test's next assertion. Locally the write
    // usually wins; in CI (GitHub runner → dev Supabase latency) it doesn't.
    // Poll briefly for a terminal status — mirrors how the real client polls
    // the status endpoint in step 7 anyway. Fix introduced in WIN-46 to
    // unblock CI; revisit if the route ever becomes directly awaitable.
    let genRow: {
      id: string;
      status: string;
      narrative_output: unknown;
      error: string | null;
    } | null = null;
    for (let i = 0; i < 40; i++) {
      const { data } = await testDb
        .from("narrative_generations")
        .select("id, status, narrative_output, error")
        .eq("id", generationId)
        .single();
      genRow = data;
      if (data?.status === "completed" || data?.status === "failed") break;
      await new Promise((r) => setTimeout(r, 100));
    }

    // DB assertions: narrative_generations row completed, dispute has
    // narrative_text populated, counter incremented.
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

    // ---- STEP 7: POST /api/narratives/{gen_id}/status ----
    const { POST: statusPOST } = await import(
      "@/app/api/narratives/[generationId]/status/route"
    );

    const step7Req = new NextRequest(
      `http://localhost/api/narratives/${generationId}/status`,
      { method: "POST", headers: { "Content-Type": "application/json" } },
    );
    const step7Res = await statusPOST(step7Req);
    expect(step7Res.status).toBe(200);
    const step7Body = await step7Res.json();
    expect(step7Body.status).toBe("completed");
    expect(step7Body.narrative).toContain("Delivery Confirmation");

    // ---- STEP 8: inspect captured Anthropic call args ----
    // The mocked messages.create captured its input into capturedAnthropicCalls.
    // Assert that the prompt Claude saw actually referenced the evidence file
    // we uploaded in step 4 — this catches regressions where evidence files
    // silently fail to flow into the prompt context (the pre-WIN-19 state).
    const { capturedAnthropicCalls } = await import("./mocks");
    expect(capturedAnthropicCalls.length).toBe(1);
    const promptUser = capturedAnthropicCalls[0].user;
    expect(promptUser).toContain(TEST_CHECKLIST_ITEM_KEY);
    expect(promptUser).toContain("delivery-confirmation.pdf");
  });

  it("WIN-44: prompt includes live Stripe transaction data (AVS/CVC/auth_code/network)", async () => {
    const { capturedAnthropicCalls } = await import("./mocks");
    expect(capturedAnthropicCalls.length).toBeGreaterThanOrEqual(1);
    // The happy-path test above generated a narrative; re-use its captured call.
    const promptUser = capturedAnthropicCalls[capturedAnthropicCalls.length - 1].user;
    expect(promptUser).toContain("AVS address check: pass");
    expect(promptUser).toContain("AVS zip check: pass");
    expect(promptUser).toContain("CVC check: pass");
    expect(promptUser).toContain("Network status: approved_by_network");
    expect(promptUser).toContain("Authorization code: AUTH42WIN");
    expect(promptUser).not.toContain("AVS address check: not available");
  });

  it("WIN-20: step 9 — submits evidence end-to-end", async () => {
    const { POST: submitRoutePOST } = await import(
      "@/app/api/disputes/[disputeId]/submit/route"
    );
    const { NextRequest } = await import("next/server");
    const { getDispute, submitDispute } = await import("@/lib/stripe");
    const mockGetDispute = getDispute as ReturnType<typeof vi.fn>;
    const mockSubmitDispute = submitDispute as ReturnType<typeof vi.fn>;

    // Pre-submission guard fetch: Stripe returns needs_response with charge expanded
    mockGetDispute.mockResolvedValueOnce({
      id: TEST_DISPUTE_ID,
      status: "needs_response",
      evidence: {},
      evidence_details: { due_by: Math.floor(Date.now() / 1000) + 86_400 },
      charge: {
        id: "ch_integration_test",
        object: "charge",
        billing_details: {
          name: "Integration Test",
          email: "test@example.com",
          address: {
            line1: "1 Test St",
            line2: null,
            city: "Brooklyn",
            state: "NY",
            postal_code: "11201",
            country: "US",
          },
          phone: null,
        },
        description: "Test widget",
        payment_method_details: {
          card: {
            brand: "visa",
            network: "visa",
            last4: "4242",
            authorization_code: "AUTH42WIN",
            checks: {
              address_line1_check: "pass",
              address_postal_code_check: "pass",
              cvc_check: "pass",
            },
          },
          type: "card",
        },
        outcome: {
          network_status: "approved_by_network",
        },
        refunds: { data: [] },
      },
    } as never);

    // submitDispute call: Stripe returns under_review
    mockSubmitDispute.mockResolvedValueOnce({
      id: TEST_DISPUTE_ID,
      status: "under_review",
      evidence: {},
    } as never);

    const res = await submitRoutePOST(
      new NextRequest(
        `http://localhost/api/disputes/${TEST_DISPUTE_ID}/submit`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
      ),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.submission_id).toBeDefined();
    expect(body.data.dispute_status).toBe("under_review");

    // Verify local dispute row was updated
    const { data: disputeRow } = await testDb
      .from("disputes")
      .select("id, status, evidence_submitted_at")
      .eq("stripe_dispute_id", TEST_DISPUTE_ID)
      .single();
    expect(disputeRow?.status).toBe("evidence_submitted");
    expect(disputeRow?.evidence_submitted_at).not.toBeNull();

    // Verify dispute_submissions row exists and is succeeded
    const { data: submissions } = await testDb
      .from("dispute_submissions")
      .select("*")
      .eq("dispute_id", disputeRow!.id);
    expect(submissions).toHaveLength(1);
    expect(submissions![0].status).toBe("succeeded");

    // Verify submitDispute was called correctly.
    // submitDispute(accountId, disputeId, evidence, idempotencyKey)
    expect(mockSubmitDispute).toHaveBeenCalledOnce();
    const [, calledDisputeId, calledEvidence, calledIdempotencyKey] =
      mockSubmitDispute.mock.calls[0];
    expect(calledDisputeId).toBe(TEST_DISPUTE_ID);
    expect(calledEvidence).toEqual(
      expect.objectContaining({ customer_name: "Integration Test" }),
    );
    expect(calledIdempotencyKey).toBeDefined();
    expect((calledIdempotencyKey as string).length).toBeGreaterThan(10);
  });

  it("WIN-20: step 9b — second submit returns cached response without re-calling Stripe", async () => {
    const { POST: submitRoutePOST } = await import(
      "@/app/api/disputes/[disputeId]/submit/route"
    );
    const { NextRequest } = await import("next/server");
    const { getDispute, submitDispute } = await import("@/lib/stripe");
    const mockGetDispute = getDispute as ReturnType<typeof vi.fn>;
    const mockSubmitDispute = submitDispute as ReturnType<typeof vi.fn>;

    const callsBefore = mockSubmitDispute.mock.calls.length;

    // Idempotency check now runs BEFORE the guard, so returning the realistic
    // post-submit status (under_review) is correct: the route finds the
    // succeeded row from step 9 and returns the cached 200 without ever
    // reaching the guard or calling Stripe again.
    mockGetDispute.mockResolvedValueOnce({
      id: TEST_DISPUTE_ID,
      status: "under_review",
      evidence: {},
      evidence_details: { due_by: Math.floor(Date.now() / 1000) + 86_400 },
      charge: {
        id: "ch_integration_test",
        object: "charge",
        billing_details: {},
        description: null,
        payment_method_details: { card: {}, type: "card" },
        outcome: {},
        refunds: { data: [] },
      },
    } as never);

    const res = await submitRoutePOST(
      new NextRequest(
        `http://localhost/api/disputes/${TEST_DISPUTE_ID}/submit`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
      ),
    );

    expect(res.status).toBe(200);
    expect(mockSubmitDispute.mock.calls.length).toBe(callsBefore); // no new call to Stripe
  });

  it("WIN-20: step 10 — submits evidence with multi-file concat in one slot", async () => {
    // visa-13.1 has two checklist items that both map to the
    // customer_communication slot: delivery_communication and digital_delivery_email.
    // Thanks to the (dispute_id, checklist_item_key) unique constraint on
    // evidence_files, this is the only way to land 2+ files in the same slot.
    const ITEM_KEY_A = "delivery_communication";
    const ITEM_KEY_B = "digital_delivery_email";
    const CONCAT_DISPUTE_ID = "du_WIN20_CONCAT_TEST";

    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const jpg = await fs.readFile(
      path.join(__dirname, "../fixtures/concat/sample.jpg"),
    );

    // Grab the merchant created by the happy-path test (step 1). afterAll
    // cascades deletes everything under this merchant, so whatever we seed
    // here gets cleaned up with the rest.
    const { data: merchantRow } = await testDb
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", TEST_ACCOUNT_ID)
      .single();
    expect(merchantRow?.id).toBeTruthy();
    const merchantId = (merchantRow as { id: string }).id;

    // Seed a fresh dispute row pinned to visa-13.1 so the submit route's
    // playbook lookup picks up the customer_communication-sharing items.
    // Direct insert (bypassing POST /api/disputes/[id]) because the canned
    // Stripe fixture is visa-10.4 and changing it would affect the other
    // tests in this file.
    const { data: disputeInsert, error: disputeErr } = await testDb
      .from("disputes")
      .insert({
        merchant_id: merchantId,
        stripe_dispute_id: CONCAT_DISPUTE_ID,
        stripe_charge_id: "ch_WIN20_CONCAT_TEST",
        amount: 9900,
        currency: "usd",
        reason_code: "13.1",
        network: "visa",
        status: "needs_response",
        narrative_text: "Customer received the download link and activated it.",
      })
      .select("id")
      .single();
    if (disputeErr) throw new Error(`seed dispute failed: ${disputeErr.message}`);
    const disputeRowId = (disputeInsert as { id: string }).id;

    // Seed two evidence_files rows — one for each checklist item, both
    // landing in the same customer_communication slot.
    const { error: ef1Err } = await testDb.from("evidence_files").insert({
      dispute_id: disputeRowId,
      checklist_item_key: ITEM_KEY_A,
      file_name: "customer-email-thread.jpg",
      file_path: "test/customer-email-thread.jpg",
      file_size: jpg.length,
      mime_type: "image/jpeg",
      stripe_file_id: "file_concat_in_1",
    });
    if (ef1Err) throw new Error(`seed evidence A failed: ${ef1Err.message}`);

    const { error: ef2Err } = await testDb.from("evidence_files").insert({
      dispute_id: disputeRowId,
      checklist_item_key: ITEM_KEY_B,
      file_name: "license-key-email.jpg",
      file_path: "test/license-key-email.jpg",
      file_size: jpg.length,
      mime_type: "image/jpeg",
      stripe_file_id: "file_concat_in_2",
    });
    if (ef2Err) throw new Error(`seed evidence B failed: ${ef2Err.message}`);

    // Wire up mocks for this test.
    const { getDispute, submitDispute } = await import("@/lib/stripe");
    const { downloadStripeFile, uploadCombinedEvidence } = await import(
      "@/lib/stripe/client"
    );
    const mockGetDispute = getDispute as ReturnType<typeof vi.fn>;
    const mockSubmitDispute = submitDispute as ReturnType<typeof vi.fn>;
    const mockDownload = downloadStripeFile as ReturnType<typeof vi.fn>;
    const mockUpload = uploadCombinedEvidence as ReturnType<typeof vi.fn>;

    // Clear any leftover calls so this test's assertions are precise.
    mockUpload.mockClear();
    mockDownload.mockClear();
    mockSubmitDispute.mockClear();

    // Pre-submission guard fetch: return a 13.1 dispute with charge expanded.
    mockGetDispute.mockResolvedValueOnce({
      id: CONCAT_DISPUTE_ID,
      status: "needs_response",
      evidence: {},
      evidence_details: { due_by: Math.floor(Date.now() / 1000) + 86_400 },
      network_reason_code: "13.1",
      charge: {
        id: "ch_WIN20_CONCAT_TEST",
        object: "charge",
        billing_details: {
          name: "Concat Tester",
          email: "concat@example.com",
          address: {
            line1: "1 Concat St",
            line2: null,
            city: "Brooklyn",
            state: "NY",
            postal_code: "11201",
            country: "US",
          },
          phone: null,
        },
        description: "Digital license",
        payment_method_details: {
          card: {
            brand: "visa",
            network: "visa",
            last4: "4242",
            authorization_code: "AUTHCONCAT",
            checks: {
              address_line1_check: "pass",
              address_postal_code_check: "pass",
              cvc_check: "pass",
            },
          },
          type: "card",
        },
        outcome: { network_status: "approved_by_network" },
        refunds: { data: [] },
      },
    } as never);

    // Every downloadStripeFile call in this test returns the sample JPEG.
    mockDownload.mockResolvedValue(jpg);

    // Combined PDF upload returns the expected new file id.
    mockUpload.mockResolvedValueOnce("file_combined_xyz");

    // Stripe submit returns a successful under_review status.
    mockSubmitDispute.mockResolvedValueOnce({
      id: CONCAT_DISPUTE_ID,
      status: "under_review",
      evidence: {},
    } as never);

    const { POST: submitRoutePOST } = await import(
      "@/app/api/disputes/[disputeId]/submit/route"
    );
    const { NextRequest } = await import("next/server");

    const res = await submitRoutePOST(
      new NextRequest(
        `http://localhost/api/disputes/${CONCAT_DISPUTE_ID}/submit`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
      ),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.submission_id).toBeDefined();

    // Exactly one combined upload — both files merged into one PDF.
    expect(mockUpload).toHaveBeenCalledTimes(1);
    // Both source files were downloaded prior to concat.
    expect(mockDownload).toHaveBeenCalledTimes(2);

    // submitDispute(accountId, disputeId, evidence, idempotencyKey) — assert
    // the combined file id lands in customer_communication.
    expect(mockSubmitDispute).toHaveBeenCalledOnce();
    const [, calledDisputeId, calledEvidence] =
      mockSubmitDispute.mock.calls[0];
    expect(calledDisputeId).toBe(CONCAT_DISPUTE_ID);
    expect(calledEvidence).toEqual(
      expect.objectContaining({ customer_communication: "file_combined_xyz" }),
    );

    // dispute_submissions row should have concat_receipts with an entry for
    // the customer_communication slot.
    const { data: submission } = await testDb
      .from("dispute_submissions")
      .select("concat_receipts, status")
      .eq("dispute_id", disputeRowId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    expect(submission?.status).toBe("succeeded");
    const receipts = submission?.concat_receipts as Array<{
      slot: string;
      input_file_ids: string[];
      combined_file_id: string;
    }> | null;
    expect(receipts).toHaveLength(1);
    expect(receipts![0].slot).toBe("customer_communication");
    expect(receipts![0].combined_file_id).toBe("file_combined_xyz");
    expect(receipts![0].input_file_ids).toEqual(
      expect.arrayContaining(["file_concat_in_1", "file_concat_in_2"]),
    );
  });
});
