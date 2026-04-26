import { describe, it, expect, vi, beforeEach } from "vitest";

const { supabaseMock, billingMock, rateLimitMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  billingMock: { createSetupCheckoutSession: vi.fn() },
  rateLimitMock: {
    checkBillingTokenRateLimit: vi
      .fn()
      .mockResolvedValue({ success: true, limit: 30, remaining: 29, reset: 0 }),
    getClientIp: vi.fn().mockReturnValue("203.0.113.5"),
  },
}));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/billing", () => billingMock);
vi.mock("@/lib/rate-limit", () => rateLimitMock);

process.env.UPGRADE_LINK_SECRET = "a".repeat(32);

import { signToken } from "../../../../../lib/upgrade-token";

describe("POST /api/billing/setup-session-from-token", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    rateLimitMock.checkBillingTokenRateLimit.mockResolvedValue({
      success: true,
      limit: 30,
      remaining: 29,
      reset: 0,
    });
    rateLimitMock.getClientIp.mockReturnValue("203.0.113.5");
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

  it("returns 429 with Retry-After header when rate limited", async () => {
    rateLimitMock.checkBillingTokenRateLimit.mockResolvedValue({
      success: false,
      limit: 30,
      remaining: 0,
      reset: Date.now() + 30_000,
    });
    const { POST } = await import("../route");
    const req = new Request("http://local/x", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: "irrelevant" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
    const body = await res.json();
    expect(body.code).toBe("rate_limited");
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
