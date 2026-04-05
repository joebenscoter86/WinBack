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

vi.mock("@/lib/playbooks", () => ({
  getPlaybook: vi.fn(),
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(),
}));

import { getPlaybook } from "@/lib/playbooks";
import { ensureMerchant } from "@/lib/merchants";

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/playbooks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/playbooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 with playbook data for valid network and reason_code", async () => {
    const mockPlaybook = {
      id: "pb_1",
      network: "visa",
      reason_code: "13.1",
      title: "Merchandise / Services Not Received",
      steps: [],
    };
    vi.mocked(getPlaybook).mockResolvedValue(mockPlaybook);

    const { POST } = await import("../route");
    const res = await POST(makeRequest({ network: "visa", reason_code: "13.1" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ data: mockPlaybook });
    expect(getPlaybook).toHaveBeenCalledWith("visa", "13.1");
    expect(ensureMerchant).toHaveBeenCalledWith("acct_test", "usr_test");
  });

  it("returns 404 when playbook is not found", async () => {
    vi.mocked(getPlaybook).mockResolvedValue(null);

    const { POST } = await import("../route");
    const res = await POST(makeRequest({ network: "visa", reason_code: "99.9" }));
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json).toEqual({ error: "Playbook not found", code: "not_found" });
  });

  it("returns 400 when network is missing", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ reason_code: "13.1" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "Missing network or reason_code", code: "invalid_request" });
    expect(getPlaybook).not.toHaveBeenCalled();
  });

  it("returns 400 when reason_code is missing", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ network: "visa" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "Missing network or reason_code", code: "invalid_request" });
    expect(getPlaybook).not.toHaveBeenCalled();
  });

  it("returns 500 on database error", async () => {
    vi.mocked(getPlaybook).mockRejectedValue(new Error("Database connection failed"));

    const { POST } = await import("../route");
    const res = await POST(makeRequest({ network: "visa", reason_code: "13.1" }));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ error: "Internal server error", code: "internal_error" });
  });
});
