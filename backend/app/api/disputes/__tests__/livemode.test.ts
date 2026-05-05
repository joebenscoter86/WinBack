import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth:
    (handler: (req: Request, ctx: unknown) => Promise<Response>) =>
    async (req: Request) => {
      const body = await req.clone().json();
      return handler(req, {
        identity: { userId: "usr_1", accountId: "acct_test_x" },
        body,
        livemode: body.livemode === true,
      });
    },
}));

const listDisputesMock = vi.fn();
vi.mock("@/lib/stripe", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/stripe")>();
  return {
    ...actual,
    listDisputes: listDisputesMock,
  };
});

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(async () => undefined),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null }),
        }),
        in: async () => ({ data: [], error: null }),
      }),
    }),
  },
}));

beforeEach(() => {
  listDisputesMock.mockReset();
  listDisputesMock.mockResolvedValue([]);
});

describe("/api/disputes (livemode plumbing)", () => {
  it("passes livemode=true to listDisputes for a live-mode signed request", async () => {
    const { POST } = await import("../route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: "usr_1",
        account_id: "acct_test_x",
        livemode: true,
      }),
    });
    await POST(req as unknown as import("next/server").NextRequest);
    expect(listDisputesMock).toHaveBeenCalledWith(
      true,
      "acct_test_x",
      expect.objectContaining({ limit: 100 }),
    );
  });

  it("passes livemode=false for a test-mode signed request", async () => {
    const { POST } = await import("../route");
    const req = new Request("https://x/api/disputes", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: "usr_1",
        account_id: "acct_test_x",
        livemode: false,
      }),
    });
    await POST(req as unknown as import("next/server").NextRequest);
    expect(listDisputesMock).toHaveBeenCalledWith(
      false,
      "acct_test_x",
      expect.objectContaining({ limit: 100 }),
    );
  });
});
