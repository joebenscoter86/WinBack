import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: (req: NextRequest, ctx: { identity: { userId: string; accountId: string }; body: unknown }) => Promise<Response>) => async (req: NextRequest) => {
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

// The status route now uses a single merchant-scoped query:
//   .from("narrative_generations").select(..., disputes!inner(...)).eq(id).eq(stripe_account_id).maybeSingle()
// (WIN-42)
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

function makeMockFrom(table: string) {
  if (table === "narrative_generations") {
    return {
      select: () => ({
        eq: () => ({
          eq: () => ({
            maybeSingle: () => Promise.resolve(mockGenerationResult),
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

  it("returns 404 when generation not found or not owned by this merchant", async () => {
    mockGenerationResult = { data: null, error: null };

    const { POST } = await import("../[generationId]/status/route");

    const res = await POST(makeRequest("gen-uuid-nonexistent"));
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.code).toBe("not_found");
  });
});
