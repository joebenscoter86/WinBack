import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    const body = await req.clone().json();
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(),
}));

const maybeSingleMock = vi.fn();
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: maybeSingleMock,
        })),
      })),
    })),
  },
}));

function makeRequest(): NextRequest {
  return new NextRequest("http://localhost/api/merchant/onboarding", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
}

describe("POST /api/merchant/onboarding", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns completed:false when onboarding_completed_at is null", async () => {
    maybeSingleMock.mockResolvedValue({
      data: { onboarding_completed_at: null },
      error: null,
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ completed: false, completed_at: null });
  });

  it("returns completed:true when onboarding_completed_at is set", async () => {
    maybeSingleMock.mockResolvedValue({
      data: { onboarding_completed_at: "2026-04-18T12:00:00Z" },
      error: null,
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({
      completed: true,
      completed_at: "2026-04-18T12:00:00Z",
    });
  });

  it("returns 404 when merchant row is missing", async () => {
    maybeSingleMock.mockResolvedValue({ data: null, error: null });

    const { POST } = await import("../route");
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json).toEqual({ error: "Merchant not found", code: "not_found" });
  });

  it("returns 500 on database error", async () => {
    maybeSingleMock.mockResolvedValue({
      data: null,
      error: { message: "connection reset" },
    });

    const { POST } = await import("../route");
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ error: "Internal server error", code: "internal_error" });
  });
});
