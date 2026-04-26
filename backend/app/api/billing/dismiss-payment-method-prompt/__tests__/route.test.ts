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

describe("POST /api/billing/dismiss-payment-method-prompt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("stamps payment_method_prompt_dismissed_at on the merchant row", async () => {
    let capturedHandler: unknown = null;
    authMock.withStripeAuth.mockImplementation((fn: unknown) => {
      capturedHandler = fn;
      return fn;
    });
    const eqChain = { eq: vi.fn().mockResolvedValue({ error: null }) };
    const updateMock = vi.fn(() => eqChain);
    supabaseMock.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({ data: { id: "m-1" }, error: null }),
        }),
      }),
      update: updateMock,
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
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({ payment_method_prompt_dismissed_at: expect.any(String) }),
    );
  });
});
