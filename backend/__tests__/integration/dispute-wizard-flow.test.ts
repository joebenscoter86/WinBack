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
  });
});
