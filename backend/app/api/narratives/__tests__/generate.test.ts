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
  withStripeAuth: (handler: (req: NextRequest, ctx: { identity: { userId: string; accountId: string }; body: unknown; livemode: boolean }) => Promise<Response>) => async (req: NextRequest) => {
    const body = await req.clone().json();
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
      livemode: false,
    });
  },
}));

vi.mock("@/lib/merchants", () => ({ ensureMerchant: vi.fn() }));

vi.mock("@/lib/stripe", () => ({
  getDispute: vi.fn(async () => ({
    id: "du_test",
    status: "needs_response",
    network_reason_code: "13.1",
    charge: {
      id: "ch_test",
      payment_method_details: {
        card: { brand: "visa", network: "visa" },
      },
    },
  })),
}));

vi.mock("@/lib/narratives/generate-background", () => ({
  runBackgroundGeneration: vi.fn().mockResolvedValue(undefined),
}));

// Mock the WIN-42 helpers directly. This is cleaner than mocking the
// supabase chain since the helpers encapsulate the join + RPC.
// WIN-78: dispute row now also includes network + network_reason_code +
// reason_code so the route can resolve server-side.
let mockDisputeResult: { data: unknown; error: unknown } = {
  data: {
    id: "dispute-uuid-1",
    narrative_generations_count: 0,
    network: "visa",
    network_reason_code: "13.1",
    reason_code: "fraudulent",
  },
  error: null,
};
let mockIncrementResult: { newCount: number | null; error: unknown } = {
  newCount: 1,
  error: null,
};
vi.mock("@/lib/disputes", () => ({
  getDisputeForAccount: vi.fn(async () => mockDisputeResult),
  incrementNarrativeGenerations: vi.fn(async () => mockIncrementResult),
}));

let mockInsertResult: { data: unknown; error: unknown } = {
  data: { id: "gen-uuid-1" },
  error: null,
};
let lastInsertPayload: Record<string, unknown> | null = null;

function makeMockFrom(table: string) {
  if (table === "narrative_generations") {
    return {
      insert: (payload: Record<string, unknown>) => {
        lastInsertPayload = payload;
        return {
          select: () => ({
            single: () => Promise.resolve(mockInsertResult),
          }),
        };
      },
    };
  }
  if (table === "disputes") {
    // WIN-78: self-heal persist-back path uses
    // .update().eq().eq().is(...) chained calls. Return a chain that
    // resolves successfully at every depth.
    const okResult = { data: null, error: null };
    return {
      update: () => ({
        eq: () => ({
          eq: () => ({
            is: () => ({
              is: () => Promise.resolve(okResult),
            }),
            then: (resolve: (v: typeof okResult) => unknown) => resolve(okResult),
          }),
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
    mockDisputeResult = {
      data: { id: "dispute-uuid-1", narrative_generations_count: 0 },
      error: null,
    };
    mockIncrementResult = { newCount: 1, error: null };
    mockInsertResult = { data: { id: "gen-uuid-1" }, error: null };
    lastInsertPayload = null;
  });

  it("returns 400 when dispute_id is missing", async () => {
    // WIN-78: only dispute_id is required now. reason_code and network are
    // accepted from the body for back-compat but ignored — server resolves
    // both from the DB row (with self-heal fallback to live Stripe dispute).
    const { POST } = await import("../generate/route");

    const res1 = await POST(makeRequest({}));
    expect(res1.status).toBe(400);
    const json1 = await res1.json();
    expect(json1.code).toBe("invalid_request");
  });

  it("returns 404 when dispute not found for this merchant", async () => {
    mockDisputeResult = { data: null, error: null };

    const { POST } = await import("../generate/route");
    const res = await POST(
      makeRequest({ dispute_id: "dp_notexist", reason_code: "13.1", network: "visa" }),
    );
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.code).toBe("not_found");
  });

  it("returns 429 when generation limit (5) is reached", async () => {
    mockIncrementResult = { newCount: null, error: null };

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
    // WIN-60: must pass a thunk (callback), not the already-invoked promise.
    // Passing a promise runs the work inline on the request event loop and
    // can terminate before Claude's 3-15s call resolves on serverless.
    const afterArg = (after as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(typeof afterArg).toBe("function");
  });

  // ---------------------------------------------------------------------
  // WIN-35: structured feedback tags
  // ---------------------------------------------------------------------

  it("stores structured feedback tags and composed feedback text", async () => {
    const { POST } = await import("../generate/route");

    await POST(
      makeRequest({
        dispute_id: "dp_123",
        reason_code: "13.1",
        network: "visa",
        merchant_feedback: "be more specific about delivery dates",
        merchant_feedback_tags: ["too_long", "missing_evidence"],
      }),
    );

    expect(lastInsertPayload).not.toBeNull();
    expect(lastInsertPayload!.merchant_feedback_tags).toEqual([
      "too_long",
      "missing_evidence",
    ]);
    // Composed feedback prepends canonical guidance for each tag and
    // includes the merchant's free text under an attributed heading.
    const composed = lastInsertPayload!.merchant_feedback as string;
    expect(composed).toMatch(/too long/i);
    expect(composed).toMatch(/evidence/i);
    expect(composed).toMatch(/Merchant's own words: be more specific/);
  });

  it("drops unknown tag values silently", async () => {
    const { POST } = await import("../generate/route");

    await POST(
      makeRequest({
        dispute_id: "dp_123",
        reason_code: "13.1",
        network: "visa",
        merchant_feedback_tags: ["too_long", "hacker_attack", 42],
      }),
    );

    expect(lastInsertPayload!.merchant_feedback_tags).toEqual(["too_long"]);
  });

  it("stores null tags and null feedback when merchant skips feedback", async () => {
    const { POST } = await import("../generate/route");

    await POST(
      makeRequest({
        dispute_id: "dp_123",
        reason_code: "13.1",
        network: "visa",
      }),
    );

    expect(lastInsertPayload!.merchant_feedback_tags).toBeNull();
    expect(lastInsertPayload!.merchant_feedback).toBeNull();
  });

  // ---------------------------------------------------------------------
  // WIN-78: server-side network code resolution + self-heal
  // ---------------------------------------------------------------------

  it("WIN-78: ignores client-supplied reason_code and uses DB network_reason_code instead", async () => {
    // Default mock has DB network_reason_code = "13.1". Client sends
    // a stale "10.4". The route MUST forward "13.1" to background gen.
    mockDisputeResult = {
      data: {
        id: "dispute-uuid-1",
        narrative_generations_count: 0,
        network: "visa",
        network_reason_code: "13.1",
        reason_code: "fraudulent",
      },
      error: null,
    };

    const { POST } = await import("../generate/route");
    const { after } = await import("next/server");

    await POST(
      makeRequest({
        dispute_id: "dp_123",
        reason_code: "10.4", // stale, server should ignore
        network: "amex", // stale, server should ignore
      }),
    );

    // The route passes a thunk to after(). Invoke it and capture the call
    // to runBackgroundGeneration to verify the resolved values.
    const afterCallback = (after as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0];
    const { runBackgroundGeneration } = await import(
      "@/lib/narratives/generate-background"
    );
    await afterCallback();

    expect(runBackgroundGeneration).toHaveBeenCalledWith(
      expect.objectContaining({ reasonCode: "13.1", network: "visa" }),
    );
  });

  it("WIN-78: self-heals network + network_reason_code from live Stripe dispute when DB row has nulls", async () => {
    mockDisputeResult = {
      data: {
        id: "dispute-uuid-1",
        narrative_generations_count: 0,
        network: null,
        network_reason_code: null,
        reason_code: "fraudulent",
      },
      error: null,
    };

    const { POST } = await import("../generate/route");
    const { after } = await import("next/server");

    const res = await POST(
      makeRequest({
        dispute_id: "dp_123",
        reason_code: "13.1",
        network: "visa",
      }),
    );

    expect(res.status).toBe(202);
    // Default getDispute mock returns network_reason_code: "13.1" + visa card.
    const afterCallback = (after as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0];
    const { runBackgroundGeneration } = await import(
      "@/lib/narratives/generate-background"
    );
    await afterCallback();
    expect(runBackgroundGeneration).toHaveBeenCalledWith(
      expect.objectContaining({ reasonCode: "13.1", network: "visa" }),
    );
  });

  it("WIN-78: returns 422 when both DB and live Stripe dispute lack network code", async () => {
    mockDisputeResult = {
      data: {
        id: "dispute-uuid-1",
        narrative_generations_count: 0,
        network: null,
        network_reason_code: null,
        reason_code: "fraudulent",
      },
      error: null,
    };

    // Stripe dispute also has nothing.
    const { getDispute } = await import("@/lib/stripe");
    (getDispute as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      id: "du_test",
      status: "needs_response",
      network_reason_code: null,
      charge: { id: "ch_test", payment_method_details: null },
    });

    const { POST } = await import("../generate/route");
    const res = await POST(
      makeRequest({ dispute_id: "dp_123", reason_code: "13.1", network: "visa" }),
    );

    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.code).toBe("unsupported_dispute");
  });
});
