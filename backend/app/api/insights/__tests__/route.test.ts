import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth:
    (
      handler: (
        req: NextRequest,
        ctx: { identity: { userId: string; accountId: string }; body: unknown },
      ) => Promise<Response>,
    ) =>
    async (req: NextRequest) =>
      handler(req, {
        identity: { userId: "usr_test", accountId: "acct_test" },
        body: {},
      }),
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn().mockResolvedValue(undefined),
}));

let mockMerchantResult: { data: unknown; error: unknown } = {
  data: { id: "merchant-uuid-1" },
  error: null,
};
let mockDisputesResult: { data: unknown; error: unknown } = { data: [], error: null };
const disputesEqCalls: Array<[string, unknown]> = [];

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: (table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: () => Promise.resolve(mockMerchantResult),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: (column: string, value: unknown) => {
              disputesEqCalls.push([column, value]);
              return Promise.resolve(mockDisputesResult);
            },
          }),
        };
      }
      return {};
    },
  },
}));

function makeRequest(): NextRequest {
  return new NextRequest("http://localhost/api/insights", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
}

describe("POST /api/insights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMerchantResult = { data: { id: "merchant-uuid-1" }, error: null };
    mockDisputesResult = { data: [], error: null };
    disputesEqCalls.length = 0;
  });

  it("returns empty insights when the merchant has no row yet", async () => {
    mockMerchantResult = { data: null, error: null };
    const { POST } = await import("../route");

    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.overall.win_rate).toBeNull();
    expect(json.by_reason).toEqual([]);
    expect(json.patterns).toEqual([]);
  });

  it("returns aggregated stats for a merchant with mixed disputes", async () => {
    mockDisputesResult = {
      data: [
        {
          status: "won",
          reason_code: "product_not_received",
          created_at: new Date().toISOString(),
        },
        {
          status: "won",
          reason_code: "product_not_received",
          created_at: new Date().toISOString(),
        },
        {
          status: "lost",
          reason_code: "fraudulent",
          created_at: new Date().toISOString(),
        },
      ],
      error: null,
    };
    const { POST } = await import("../route");

    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.overall.won).toBe(2);
    expect(json.overall.lost).toBe(1);
    expect(json.overall.total_disputes).toBe(3);
    expect(json.overall.win_rate).toBeCloseTo(2 / 3);
    expect(json.by_reason).toHaveLength(2);
  });

  it("scopes the disputes query to the authenticated merchant only", async () => {
    const { POST } = await import("../route");

    await POST(makeRequest());

    expect(disputesEqCalls).toContainEqual(["merchant_id", "merchant-uuid-1"]);
    expect(disputesEqCalls.every(([col]) => col === "merchant_id")).toBe(true);
  });

  it("returns 500 when the disputes query fails", async () => {
    mockDisputesResult = { data: null, error: { message: "boom" } };
    const { POST } = await import("../route");

    const res = await POST(makeRequest());
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.code).toBe("internal_error");
  });
});
