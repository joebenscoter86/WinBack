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

describe("POST /api/billing/setup-link", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("returns winbackpay.com/setup-billing URL with setup-kind token", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });

    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: { id: "m-1" },
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
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toMatch(/^https:\/\/winbackpay\.com\/setup-billing\?t=/);
  });
});
