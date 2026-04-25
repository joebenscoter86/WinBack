import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, billingMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  billingMock: { createSetupCheckoutSession: vi.fn() },
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/billing", () => billingMock);

process.env.UPGRADE_LINK_SECRET = "a".repeat(32);

import { signToken } from "../../../../../lib/upgrade-token";

describe("POST /api/billing/setup-session-from-token", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("creates setup-mode Checkout session for valid setup token", async () => {
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
    billingMock.createSetupCheckoutSession.mockResolvedValue({
      url: "https://checkout.stripe.com/setup",
      sessionId: "cs_2",
    });
    const token = signToken({ merchant_id: "m-1", kind: "setup" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });

  it("rejects upgrade-kind tokens with 400", async () => {
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
