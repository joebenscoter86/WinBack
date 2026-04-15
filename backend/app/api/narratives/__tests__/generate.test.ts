import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock next/server's after() API
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    after: vi.fn(),
  };
});

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    const body = await req.clone().json();
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

vi.mock("@/lib/merchants", () => ({ ensureMerchant: vi.fn() }));

vi.mock("@/lib/stripe", () => ({
  getDispute: vi.fn(async () => ({
    id: "du_test",
    status: "needs_response",
  })),
}));

vi.mock("@/lib/narratives/generate-background", () => ({
  runBackgroundGeneration: vi.fn().mockResolvedValue(undefined),
}));

// Supabase mock -- configured per-test via result variables
let mockMerchantResult: { data: unknown; error: unknown } = {
  data: { id: "merchant-uuid-1" },
  error: null,
};
let mockDisputeResult: { data: unknown; error: unknown } = {
  data: { id: "dispute-uuid-1", narrative_generations_count: 0 },
  error: null,
};
let mockUpdateResult: { data: unknown; error: unknown } = {
  data: { narrative_generations_count: 1 },
  error: null,
};
let mockInsertResult: { data: unknown; error: unknown } = {
  data: { id: "gen-uuid-1" },
  error: null,
};

function makeMockFrom(table: string) {
  if (table === "merchants") {
    return {
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve(mockMerchantResult),
        }),
      }),
    };
  }
  if (table === "disputes") {
    return {
      select: () => ({
        eq: (_col1: string, _val1: string) => ({
          eq: (_col2: string, _val2: string) => ({
            single: () => Promise.resolve(mockDisputeResult),
          }),
        }),
      }),
      update: () => ({
        eq: () => ({
          eq: () => ({
            select: () => ({
              single: () => Promise.resolve(mockUpdateResult),
            }),
          }),
        }),
      }),
    };
  }
  if (table === "narrative_generations") {
    return {
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve(mockInsertResult),
        }),
      }),
    };
  }
  return {};
}

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: (table: string) => makeMockFrom(table),
  },
}));

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/narratives/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/narratives/generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMerchantResult = { data: { id: "merchant-uuid-1" }, error: null };
    mockDisputeResult = {
      data: { id: "dispute-uuid-1", narrative_generations_count: 0 },
      error: null,
    };
    mockUpdateResult = {
      data: { narrative_generations_count: 1 },
      error: null,
    };
    mockInsertResult = { data: { id: "gen-uuid-1" }, error: null };
  });

  it("returns 400 when required fields are missing", async () => {
    const { POST } = await import("../generate/route");

    const res1 = await POST(makeRequest({}));
    expect(res1.status).toBe(400);
    const json1 = await res1.json();
    expect(json1.code).toBe("invalid_request");

    const res2 = await POST(makeRequest({ dispute_id: "dp_123" }));
    expect(res2.status).toBe(400);

    const res3 = await POST(
      makeRequest({ dispute_id: "dp_123", reason_code: "13.1" }),
    );
    expect(res3.status).toBe(400);
  });

  it("returns 404 when dispute not found for this merchant", async () => {
    mockDisputeResult = { data: null, error: { message: "not found", code: "PGRST116" } };

    const { POST } = await import("../generate/route");
    const res = await POST(
      makeRequest({ dispute_id: "dp_notexist", reason_code: "13.1", network: "visa" }),
    );
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.code).toBe("not_found");
  });

  it("returns 429 when generation limit (5) is reached", async () => {
    mockDisputeResult = {
      data: { id: "dispute-uuid-1", narrative_generations_count: 5 },
      error: null,
    };

    const { POST } = await import("../generate/route");
    const res = await POST(
      makeRequest({ dispute_id: "dp_123", reason_code: "13.1", network: "visa" }),
    );
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.code).toBe("generation_limit");
  });

  it("returns 202 with generation_id on success", async () => {
    const { POST } = await import("../generate/route");
    const { after } = await import("next/server");

    const res = await POST(
      makeRequest({
        dispute_id: "dp_123",
        reason_code: "13.1",
        network: "visa",
        merchant_feedback: "customer confirmed delivery",
      }),
    );
    expect(res.status).toBe(202);
    const json = await res.json();
    expect(json.generation_id).toBe("gen-uuid-1");
    expect(json.status).toBe("pending");
    // Background generation should be scheduled via after()
    expect(after).toHaveBeenCalledOnce();
  });
});
