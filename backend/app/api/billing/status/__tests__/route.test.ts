import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, authMock, ensureMerchantMock, billingMock, sentryMock } =
  vi.hoisted(() => ({
    supabaseMock: { from: vi.fn() },
    authMock: { withStripeAuth: vi.fn() },
    ensureMerchantMock: vi.fn(),
    billingMock: {
      SUCCESS_FEE_RATE: 0.15,
      hasDefaultPaymentMethod: vi.fn(),
    },
    sentryMock: { captureRouteError: vi.fn() },
  }));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: unknown) => authMock.withStripeAuth(handler),
}));
vi.mock("@/lib/merchants", () => ({ ensureMerchant: ensureMerchantMock }));
vi.mock("@/lib/billing", () => billingMock);
vi.mock("@/lib/sentry", () => sentryMock);
vi.mock("@/lib/env", () => ({ env: () => ({ STRIPE_SECRET_KEY: "sk_test_x" }) }));
vi.mock("stripe", () => ({
  default: class FakeStripe {
    subscriptions = { retrieve: vi.fn() };
  },
}));

const MERCHANT_ROW = {
  id: "m-1",
  billing_tier: "usage" as const,
  subscription_status: null,
  pro_since_at: null,
  upgrade_prompted_at: null,
  stripe_subscription_id: null,
  payment_method_prompt_dismissed_at: null,
};

type DisputesQueryRecorder = {
  filters: Array<[string, unknown]>;
  rangeFilters: Array<[string, string, string]>;
  result: { data: Array<{ amount: number; outcome_at: string }> | null };
};

function makeDisputesQuery(recorder: DisputesQueryRecorder) {
  // Chain matches the route: select().eq().eq().eq().gte().lte()
  // The final builder is awaited as a promise, so we return a thenable.
  const thenable = {
    then(onFulfilled: (v: { data: unknown }) => unknown) {
      return Promise.resolve(recorder.result).then(onFulfilled);
    },
    eq(col: string, val: unknown) {
      recorder.filters.push([col, val]);
      return thenable;
    },
    gte(col: string, val: string) {
      recorder.rangeFilters.push(["gte", col, val]);
      return thenable;
    },
    lte(col: string, val: string) {
      recorder.rangeFilters.push(["lte", col, val]);
      return thenable;
    },
  };
  return thenable;
}

function mockTables(recorder: DisputesQueryRecorder, merchant = MERCHANT_ROW) {
  supabaseMock.from.mockImplementation((table: string) => {
    if (table === "merchants") {
      return {
        select: () => ({
          eq: () => ({
            maybeSingle: vi.fn().mockResolvedValue({ data: merchant, error: null }),
          }),
        }),
      };
    }
    if (table === "disputes") {
      return { select: () => makeDisputesQuery(recorder) };
    }
    throw new Error(`unexpected table ${table}`);
  });
}

async function loadHandler() {
  let capturedHandler: unknown = null;
  authMock.withStripeAuth.mockImplementation((fn: unknown) => {
    capturedHandler = fn;
    return fn;
  });
  await import("../route");
  return capturedHandler as (
    req: Request,
    ctx: { identity: { accountId: string; userId: string }; body: unknown },
  ) => Promise<Response>;
}

describe("POST /api/billing/status", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    ensureMerchantMock.mockResolvedValue(undefined);
    billingMock.hasDefaultPaymentMethod.mockResolvedValue(false);
  });

  // WIN-76: YTD success fees must only count live-mode wins. A merchant flipped
  // into test mode could rack up fake "won" rows; without the livemode filter
  // those would inflate the YTD figure shown on the settings page.
  it("filters YTD won-disputes query by livemode = true", async () => {
    const recorder: DisputesQueryRecorder = {
      filters: [],
      rangeFilters: [],
      result: { data: [] },
    };
    mockTables(recorder);

    const handler = await loadHandler();
    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });

    expect(res.status).toBe(200);
    const livemodeFilter = recorder.filters.find(([col]) => col === "livemode");
    expect(livemodeFilter).toEqual(["livemode", true]);
    expect(recorder.filters).toEqual(
      expect.arrayContaining([
        ["merchant_id", MERCHANT_ROW.id],
        ["status", "won"],
        ["livemode", true],
      ]),
    );
  });

  it("sums 15% of live-mode won amounts into ytd_success_fees_cents", async () => {
    const recorder: DisputesQueryRecorder = {
      filters: [],
      rangeFilters: [],
      result: {
        data: [
          { amount: 10000, outcome_at: "2026-02-01T00:00:00Z" },
          { amount: 5000, outcome_at: "2026-03-01T00:00:00Z" },
        ],
      },
    };
    mockTables(recorder);

    const handler = await loadHandler();
    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    // 0.15 * (10000 + 5000) = 2250
    expect(json.ytd_success_fees_cents).toBe(2250);
  });
});
