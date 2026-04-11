import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    let body = {};
    try {
      body = await req.clone().json();
    } catch {}
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

// Supabase mock -- configured per-test via result variables
let mockGenerationResult: { data: unknown; error: unknown } = {
  data: {
    id: "gen-uuid-1",
    status: "pending",
    dispute_id: "dispute-uuid-1",
    narrative_output: null,
    error: null,
  },
  error: null,
};
let mockMerchantResult: { data: unknown; error: unknown } = {
  data: { id: "merchant-uuid-1" },
  error: null,
};
let mockDisputeResult: { data: unknown; error: unknown } = {
  data: { id: "dispute-uuid-1" },
  error: null,
};

function makeMockFrom(table: string) {
  if (table === "narrative_generations") {
    return {
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve(mockGenerationResult),
        }),
      }),
    };
  }
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
    };
  }
  return {};
}

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: (table: string) => makeMockFrom(table),
  },
}));

function makeRequest(generationId: string): NextRequest {
  return new NextRequest(
    `http://localhost/api/narratives/${generationId}/status`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    },
  );
}

describe("POST /api/narratives/[generationId]/status", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerationResult = {
      data: {
        id: "gen-uuid-1",
        status: "pending",
        dispute_id: "dispute-uuid-1",
        narrative_output: null,
        error: null,
      },
      error: null,
    };
    mockMerchantResult = { data: { id: "merchant-uuid-1" }, error: null };
    mockDisputeResult = { data: { id: "dispute-uuid-1" }, error: null };
  });

  it("returns pending status", async () => {
    const { POST } = await import("../[generationId]/status/route");

    const res = await POST(makeRequest("gen-uuid-1"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("pending");
    expect(json.narrative).toBeUndefined();
  });

  it("returns completed status with narrative and annotations", async () => {
    mockGenerationResult = {
      data: {
        id: "gen-uuid-1",
        status: "completed",
        dispute_id: "dispute-uuid-1",
        narrative_output: {
          narrative: "This is the dispute narrative text.",
          annotations: [
            { section: "intro", reasoning: "Sets the context clearly." },
          ],
        },
        error: null,
      },
      error: null,
    };

    const { POST } = await import("../[generationId]/status/route");

    const res = await POST(makeRequest("gen-uuid-1"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("completed");
    expect(json.narrative).toBe("This is the dispute narrative text.");
    expect(json.annotations).toEqual([
      { section: "intro", reasoning: "Sets the context clearly." },
    ]);
  });

  it("returns failed status with error message", async () => {
    mockGenerationResult = {
      data: {
        id: "gen-uuid-1",
        status: "failed",
        dispute_id: "dispute-uuid-1",
        narrative_output: null,
        error: "Claude API timeout after 30s",
      },
      error: null,
    };

    const { POST } = await import("../[generationId]/status/route");

    const res = await POST(makeRequest("gen-uuid-1"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("failed");
    expect(json.error).toBe("Claude API timeout after 30s");
  });

  it("returns 404 when generation not found", async () => {
    mockGenerationResult = {
      data: null,
      error: { message: "not found", code: "PGRST116" },
    };

    const { POST } = await import("../[generationId]/status/route");

    const res = await POST(makeRequest("gen-uuid-nonexistent"));
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.code).toBe("not_found");
  });
});
