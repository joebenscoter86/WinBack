import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, authMock, ensureMerchantMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  authMock: { withStripeAuth: vi.fn() },
  ensureMerchantMock: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: unknown) => authMock.withStripeAuth(handler),
}));
vi.mock("@/lib/merchants", () => ({ ensureMerchant: ensureMerchantMock }));

process.env.UPGRADE_LINK_SECRET = "a".repeat(32);

describe("POST /api/billing/upgrade-link", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("returns winbackpay.com/upgrade URL with a signed token for a usage-tier merchant", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });

    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1", billing_tier: "usage" },
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
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.url).toMatch(/^https:\/\/winbackpay\.com\/upgrade\?t=/);
    const token = new URL(json.url).searchParams.get("t");
    expect(token).toBeTruthy();
    // Token has three parts.
    expect(token!.split(".").length).toBe(3);
  });

  it("returns 409 when merchant already on Pro", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });

    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1", billing_tier: "pro" },
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
    expect(json.code).toBe("already_pro");
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
