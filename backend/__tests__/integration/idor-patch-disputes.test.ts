// WIN-79: regression test for IDOR in PATCH /api/disputes/[disputeId].
//
// Before the fix, when getDisputeForAccount returned null for the
// authenticated merchant, the route fell through to an unguarded upsert
// that hit a globally-unique stripe_dispute_id constraint via
// onConflict and rewrote the row's merchant_id to the caller's. Any
// authenticated merchant could hijack another merchant's dispute row.
//
// The fix: return 404 in the fall-through path. The wizard always POSTs
// /api/disputes/[id] before any PATCH (which backfills the row through a
// Stripe-account-scoped path), so legit callers never hit this branch.

import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { createClient } from "@supabase/supabase-js";

// Mutable identity so individual tests can swap caller mid-file (merchant A
// vs merchant B). The mock reads from this object on every request.
const activeIdentity: { userId: string; accountId: string } = {
  userId: "usr_WIN79_A",
  accountId: "acct_WIN79_A",
};

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth:
    (handler: (req: unknown, ctx: unknown) => unknown) =>
    async (req: Request) => {
      let body: unknown = {};
      try {
        body = await (req as Request & { clone: () => Request })
          .clone()
          .json();
      } catch {
        body = {};
      }
      return handler(req, {
        identity: { ...activeIdentity },
        body,
        livemode: false,
      });
    },
  fetchStripeSignature: vi.fn(),
}));

const ACCT_A = "acct_WIN79_A";
const ACCT_B = "acct_WIN79_B";
const VICTIM_DISPUTE_ID = "du_WIN79_VICTIM";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "WIN-79 IDOR test requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env.local",
  );
}
const testDb = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function cleanup(): Promise<void> {
  for (const acct of [ACCT_A, ACCT_B]) {
    const { data: merchant } = await testDb
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", acct)
      .maybeSingle();
    if (merchant) {
      await testDb
        .from("disputes")
        .delete()
        .eq("merchant_id", (merchant as { id: string }).id);
    }
    await testDb.from("merchants").delete().eq("stripe_account_id", acct);
  }
}

describe("WIN-79: PATCH /api/disputes/[disputeId] cross-tenant IDOR", () => {
  let merchantBId: string;
  const victimRow = {
    amount: 14900,
    reason_code: "10.4",
    network: "visa",
    narrative_text: "Victor's draft narrative.",
    checklist_state: { delivery_to_billing_address: true },
    checklist_notes: { delivery_to_billing_address: "Customer signed at door." },
  };

  beforeAll(async () => {
    await cleanup();

    // Seed both merchants directly. The PATCH route reads merchants only
    // to populate merchant_id on the unsafe upsert path (which we are
    // removing). The auth mock just hands back the identity verbatim.
    const { data: a, error: aErr } = await testDb
      .from("merchants")
      .insert({ stripe_account_id: ACCT_A, billing_tier: "usage" })
      .select("id")
      .single();
    if (aErr || !a) throw new Error(`merchant A seed failed: ${aErr?.message}`);

    const { data: b, error: bErr } = await testDb
      .from("merchants")
      .insert({ stripe_account_id: ACCT_B, billing_tier: "usage" })
      .select("id")
      .single();
    if (bErr || !b) throw new Error(`merchant B seed failed: ${bErr?.message}`);
    merchantBId = (b as { id: string }).id;

    // Seed the victim dispute owned by merchant B with real values --
    // the bug class clobbered amount/reason_code to 0/"" via the upsert,
    // so we assert those survive.
    const { error: dErr } = await testDb.from("disputes").insert({
      merchant_id: merchantBId,
      stripe_dispute_id: VICTIM_DISPUTE_ID,
      stripe_charge_id: "ch_WIN79_VICTIM",
      currency: "usd",
      status: "needs_response",
      livemode: false,
      ...victimRow,
    });
    if (dErr) throw new Error(`victim dispute seed failed: ${dErr.message}`);
  });

  afterAll(async () => {
    await cleanup();
  });

  it("returns 404 when merchant A PATCHes a dispute owned by merchant B", async () => {
    activeIdentity.userId = "usr_WIN79_A";
    activeIdentity.accountId = ACCT_A;

    const { PATCH } = await import("@/app/api/disputes/[disputeId]/route");
    const { NextRequest } = await import("next/server");

    const attackPayload = {
      checklist_state: { hijacked: true },
      checklist_notes: { hijacked: "owned" },
      narrative_text: "MALICIOUS REWRITE",
    };

    const req = new NextRequest(
      `http://localhost/api/disputes/${VICTIM_DISPUTE_ID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attackPayload),
      },
    );
    const res = await PATCH(req);

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.code).toBe("not_found");

    // Critical: merchant B's row is fully unchanged. Pre-fix, ON CONFLICT
    // DO UPDATE would have flipped merchant_id to A and clobbered
    // amount/reason_code/narrative_text/checklist_state.
    const { data: after } = await testDb
      .from("disputes")
      .select(
        "merchant_id, amount, reason_code, network, narrative_text, checklist_state, checklist_notes",
      )
      .eq("stripe_dispute_id", VICTIM_DISPUTE_ID)
      .single();

    expect(after).toBeDefined();
    expect(after?.merchant_id).toBe(merchantBId);
    expect(after?.amount).toBe(victimRow.amount);
    expect(after?.reason_code).toBe(victimRow.reason_code);
    expect(after?.network).toBe(victimRow.network);
    expect(after?.narrative_text).toBe(victimRow.narrative_text);
    expect(after?.checklist_state).toEqual(victimRow.checklist_state);
    expect(after?.checklist_notes).toEqual(victimRow.checklist_notes);
  });

  it("still allows merchant B to PATCH their own dispute (regression check on legit path)", async () => {
    activeIdentity.userId = "usr_WIN79_B";
    activeIdentity.accountId = ACCT_B;

    const { PATCH } = await import("@/app/api/disputes/[disputeId]/route");
    const { NextRequest } = await import("next/server");

    const updatePayload = {
      narrative_text: "Updated by the legitimate owner.",
    };

    const req = new NextRequest(
      `http://localhost/api/disputes/${VICTIM_DISPUTE_ID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      },
    );
    const res = await PATCH(req);

    expect(res.status).toBe(200);
    const { data: after } = await testDb
      .from("disputes")
      .select("merchant_id, amount, reason_code, narrative_text")
      .eq("stripe_dispute_id", VICTIM_DISPUTE_ID)
      .single();
    expect(after?.merchant_id).toBe(merchantBId);
    expect(after?.amount).toBe(victimRow.amount); // untouched
    expect(after?.reason_code).toBe(victimRow.reason_code); // untouched
    expect(after?.narrative_text).toBe(updatePayload.narrative_text);
  });

  it("returns 404 when PATCHing a dispute id that does not exist anywhere", async () => {
    activeIdentity.userId = "usr_WIN79_A";
    activeIdentity.accountId = ACCT_A;

    const { PATCH } = await import("@/app/api/disputes/[disputeId]/route");
    const { NextRequest } = await import("next/server");

    const req = new NextRequest(
      "http://localhost/api/disputes/du_WIN79_DOES_NOT_EXIST",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ narrative_text: "anything" }),
      },
    );
    const res = await PATCH(req);

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.code).toBe("not_found");

    // Defense-in-depth: the old fall-through would have created a zombie
    // row pinned to merchant A. Confirm no such row exists.
    const { data: zombie } = await testDb
      .from("disputes")
      .select("id")
      .eq("stripe_dispute_id", "du_WIN79_DOES_NOT_EXIST")
      .maybeSingle();
    expect(zombie).toBeNull();
  });
});
