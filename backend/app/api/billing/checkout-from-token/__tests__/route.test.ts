import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, billingMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  billingMock: { createProCheckoutSession: vi.fn() },
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/billing", () => billingMock);

process.env.UPGRADE_LINK_SECRET = "a".repeat(32);

import { signToken } from "../../../../../lib/upgrade-token";

describe("POST /api/billing/checkout-from-token", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("creates Checkout session for valid upgrade token", async () => {
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
    billingMock.createProCheckoutSession.mockResolvedValue({
      url: "https://checkout.stripe.com/c/xyz",
      sessionId: "cs_1",
    });

    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
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

  it("rejects setup-kind tokens with 400", async () => {
    const token = signToken({ merchant_id: "m-1", kind: "setup" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("invalid_token_kind");
  });

  it("rejects tampered or expired tokens with 401", async () => {
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: "a.b.c" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 409 when merchant already on Pro", async () => {
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
    const token = signToken({ merchant_id: "m-1", kind: "upgrade" });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
  });
});
