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
  // Delete every merchants row for the test account. Child rows
  // (disputes, evidence_files, narrative_generations) cascade via FK.
  // If a constraint is ON DELETE RESTRICT instead of CASCADE, delete
  // children explicitly here — see Task 4 Step 4.3.
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

  it("sanity: test merchant does not exist after setup", async () => {
    const { data, error } = await testDb
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", TEST_ACCOUNT_ID);
    expect(error).toBeNull();
    expect(data).toEqual([]);
  });
});
