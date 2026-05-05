// IMPORTANT: import mocks BEFORE anything else so vi.mock() hoists apply
// to all subsequent imports of the mocked modules.
import "./mocks";

import { describe, it, expect, vi, beforeEach } from "vitest";
import { TEST_ACCOUNT_ID, TEST_USER_ID } from "./fixtures";

// Self-contained Supabase + merchants mocks so this test does not require
// migration 022 to be applied to dev DB. The is_new query needs a usable
// chain (`.from().select().eq().maybeSingle()` for the merchant id lookup,
// then `.from().select().eq().eq().in()` for the disputes view rows).
// `disputesEqEq` is the second `.eq()` on the disputes chain — it captures
// the livemode value the route filters by so the third assertion can verify
// mode-scoping without cross-mode false positives.
const disputesEqEq = vi.fn();

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(async () => undefined),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: (table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: { id: "merchant_isolation_test" },
                error: null,
              }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: () => ({
              eq: (column: string, value: unknown) => {
                disputesEqEq(column, value);
                return {
                  in: async () => ({ data: [], error: null }),
                };
              },
            }),
          }),
        };
      }
      throw new Error(`unmocked table: ${table}`);
    },
  },
}));

const stripeModule = await import("@/lib/stripe");

const liveDispute = {
  id: "dp_live_only",
  object: "dispute",
  amount: 11111,
  currency: "usd",
  reason: "fraudulent",
  status: "needs_response",
  created: 1700000000,
  livemode: true,
  charge: "ch_live_x",
  payment_intent: "pi_live_x",
  evidence_details: { has_evidence: false },
};

const testDispute = {
  id: "dp_test_only",
  object: "dispute",
  amount: 1099,
  currency: "usd",
  reason: "fraudulent",
  status: "needs_response",
  created: 1700000000,
  livemode: false,
  charge: "ch_test_x",
  payment_intent: "pi_test_x",
  evidence_details: { has_evidence: false },
};

beforeEach(() => {
  disputesEqEq.mockClear();
  vi.mocked(stripeModule.listDisputes).mockImplementation(
    async (livemode: boolean) =>
      (livemode ? [liveDispute] : [testDispute]) as never,
  );
});

describe("/api/disputes mode isolation", () => {
  it("a live-mode signed request only sees live disputes", async () => {
    const { POST } = await import("@/app/api/disputes/route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: TEST_USER_ID,
        account_id: TEST_ACCOUNT_ID,
        livemode: true,
      }),
    });
    const res = await POST(
      req as unknown as import("next/server").NextRequest,
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].id).toBe("dp_live_only");
    expect(stripeModule.listDisputes).toHaveBeenCalledWith(
      true,
      TEST_ACCOUNT_ID,
      expect.objectContaining({ limit: 100 }),
    );
  });

  it("a test-mode signed request only sees test disputes", async () => {
    const { POST } = await import("@/app/api/disputes/route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: TEST_USER_ID,
        account_id: TEST_ACCOUNT_ID,
        livemode: false,
      }),
    });
    const res = await POST(
      req as unknown as import("next/server").NextRequest,
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].id).toBe("dp_test_only");
    expect(stripeModule.listDisputes).toHaveBeenCalledWith(
      false,
      TEST_ACCOUNT_ID,
      expect.objectContaining({ limit: 100 }),
    );
  });

  it("the is_new query filters by livemode (no cross-mode false positives)", async () => {
    const { POST } = await import("@/app/api/disputes/route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: TEST_USER_ID,
        account_id: TEST_ACCOUNT_ID,
        livemode: true,
      }),
    });
    const res = await POST(
      req as unknown as import("next/server").NextRequest,
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.data[0].is_new).toBe(false);
    expect(disputesEqEq).toHaveBeenCalledWith("livemode", true);
  });
});
