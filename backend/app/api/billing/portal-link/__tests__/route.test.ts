import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, authMock, ensureMerchantMock, stripeMock } = vi.hoisted(() => {
  const billingPortalSessionsCreate = vi.fn();
  class MockStripe {
    billingPortal = {
      sessions: { create: billingPortalSessionsCreate },
    };
  }
  return {
    supabaseMock: { from: vi.fn() },
    authMock: { withStripeAuth: vi.fn() },
    ensureMerchantMock: vi.fn(),
    stripeMock: { default: MockStripe, billingPortalSessionsCreate },
  };
});

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: unknown) => authMock.withStripeAuth(handler),
}));
vi.mock("@/lib/merchants", () => ({ ensureMerchant: ensureMerchantMock }));
vi.mock("stripe", () => ({ default: stripeMock.default }));

function setRequiredEnvVars() {
  process.env.STRIPE_SECRET_KEY = "sk_test_x";
  process.env.STRIPE_APP_SECRET = "absec_x";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_x";
  process.env.STRIPE_BILLING_WEBHOOK_SECRET = "whsec_b";
  process.env.STRIPE_PRICE_PRO_MONTHLY = "price_pro";
  process.env.STRIPE_PRICE_USAGE_FEE = "price_usage";
  process.env.UPGRADE_LINK_SECRET = "a".repeat(32);
  process.env.SUPABASE_URL = "https://x.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "svc-key";
  process.env.ANTHROPIC_API_KEY = "sk-ant-x";
}

describe("POST /api/billing/portal-link", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    setRequiredEnvVars();
    const { __resetEnvCacheForTests } = await import("@/lib/env");
    __resetEnvCacheForTests();
  });

  it("returns Stripe portal session URL for a Pro merchant", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });

    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1", stripe_billing_customer_id: "cus_123" },
            error: null,
          }),
        }),
      }),
    });
    ensureMerchantMock.mockResolvedValue(undefined);
    stripeMock.billingPortalSessionsCreate.mockResolvedValue({
      url: "https://billing.stripe.com/p/session/test_xyz",
    });

    await import("../route");
    const handler = capturedHandler as (
      req: Request,
      ctx: { identity: { accountId: string; userId: string }; body: unknown },
    ) => Promise<Response>;

    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toMatch(/^https:\/\/billing\.stripe\.com\//);
    expect(stripeMock.billingPortalSessionsCreate).toHaveBeenCalledWith({
      customer: "cus_123",
      return_url: "https://dashboard.stripe.com/settings/apps",
    });
  });

  it("returns 409 when merchant has no billing customer", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });
    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1", stripe_billing_customer_id: null },
            error: null,
          }),
        }),
      }),
    });
    ensureMerchantMock.mockResolvedValue(undefined);

    await import("../route");
    const handler = capturedHandler as (
      req: Request,
      ctx: { identity: { accountId: string; userId: string }; body: unknown },
    ) => Promise<Response>;

    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });
    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.code).toBe("no_customer");
    expect(stripeMock.billingPortalSessionsCreate).not.toHaveBeenCalled();
  });

  it("returns 404 when merchant not found", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });
    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }),
    });
    ensureMerchantMock.mockResolvedValue(undefined);

    await import("../route");
    const handler = capturedHandler as (
      req: Request,
      ctx: { identity: { accountId: string; userId: string }; body: unknown },
    ) => Promise<Response>;

    const res = await handler(new Request("http://local/x", { method: "POST" }), {
      identity: { accountId: "acct_1", userId: "u-1" },
      body: {},
    });
    expect(res.status).toBe(404);
  });
});
