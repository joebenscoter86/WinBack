import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: (req: NextRequest, ctx: { identity: { userId: string; accountId: string }; body: unknown }) => Promise<Response>) => async (req: NextRequest) => {
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

const updateMock = vi.fn();
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      update: updateMock,
    })),
  },
}));

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/merchant/onboarding/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/merchant/onboarding/update", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    updateMock.mockReturnValue({
      eq: vi.fn(() => Promise.resolve({ error: null })),
    });
  });

  it("sets onboarding_completed_at to NOW() when completed=true", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ completed: true }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ completed: true });
    expect(updateMock).toHaveBeenCalledTimes(1);
    const updateArg = updateMock.mock.calls[0][0];
    expect(updateArg.onboarding_completed_at).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    );
  });

  it("sets onboarding_completed_at to NULL when completed=false", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ completed: false }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ completed: false });
    expect(updateMock).toHaveBeenCalledWith({
      onboarding_completed_at: null,
      updated_at: expect.any(String),
    });
  });

  it("returns 400 when completed is missing", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({}));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "Missing completed flag", code: "invalid_request" });
    expect(updateMock).not.toHaveBeenCalled();
  });

  it("returns 400 when completed is not a boolean", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ completed: "yes" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "Missing completed flag", code: "invalid_request" });
  });

  it("returns 500 when update fails", async () => {
    updateMock.mockReturnValue({
      eq: vi.fn(() => Promise.resolve({ error: { message: "update failed" } })),
    });
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ completed: true }));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ error: "Internal server error", code: "internal_error" });
  });
});
