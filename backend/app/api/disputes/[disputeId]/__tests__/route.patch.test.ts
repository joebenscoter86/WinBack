import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth:
    (handler: (req: Request, ctx: unknown) => Promise<Response>) =>
    async (req: Request) => {
      const body = await req.clone().json();
      return handler(req, {
        identity: { userId: "usr_1", accountId: "acct_test_x" },
        body,
        livemode: body.livemode === true,
      });
    },
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(async () => undefined),
}));

vi.mock("@/lib/disputes", () => ({
  getDisputeForAccount: vi.fn(async () => ({
    data: { id: "row-uuid-1" },
  })),
}));

const updateMock = vi.fn();
const eqMock = vi.fn();
const selectMock = vi.fn();
const singleMock = vi.fn();

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({
      update: (payload: unknown) => {
        updateMock(payload);
        return {
          eq: (col: string, val: string) => {
            eqMock(col, val);
            return {
              select: () => {
                selectMock();
                return {
                  single: async () => {
                    singleMock();
                    return { data: { id: "row-uuid-1" }, error: null };
                  },
                };
              },
            };
          },
        };
      },
    }),
  },
}));

function makeRequest(disputeId: string, body: Record<string, unknown>): NextRequest {
  return new NextRequest(
    new URL(`http://localhost/api/disputes/${disputeId}`),
    {
      method: "PATCH",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: "usr_1",
        account_id: "acct_test_x",
        livemode: false,
        ...body,
      }),
    },
  );
}

beforeEach(() => {
  updateMock.mockReset();
  eqMock.mockReset();
  selectMock.mockReset();
  singleMock.mockReset();
});

describe("PATCH /api/disputes/[disputeId]", () => {
  it("persists narrative_text when included in the body", async () => {
    const { PATCH } = await import("../route");
    const res = await PATCH(
      makeRequest("du_test", { narrative_text: "Customer was clearly authorized." }),
    );
    expect(res.status).toBe(200);
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        narrative_text: "Customer was clearly authorized.",
      }),
    );
  });

  it("persists narrative_text=null to clear a draft", async () => {
    const { PATCH } = await import("../route");
    const res = await PATCH(
      makeRequest("du_test", { narrative_text: null }),
    );
    expect(res.status).toBe(200);
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({ narrative_text: null }),
    );
  });

  it("ignores narrative_text when not a string or null", async () => {
    const { PATCH } = await import("../route");
    const res = await PATCH(
      makeRequest("du_test", {
        narrative_text: 42,
        checklist_notes: { foo: "bar" },
      }),
    );
    expect(res.status).toBe(200);
    const payload = updateMock.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(payload).not.toHaveProperty("narrative_text");
    expect(payload).toHaveProperty("checklist_notes");
  });

  it("still works for the existing checklist_notes path (regression)", async () => {
    const { PATCH } = await import("../route");
    const res = await PATCH(
      makeRequest("du_test", { checklist_notes: { item_a: "saw receipt" } }),
    );
    expect(res.status).toBe(200);
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        checklist_notes: { item_a: "saw receipt" },
      }),
    );
  });

  it("returns 400 when no recognized fields are present", async () => {
    const { PATCH } = await import("../route");
    const res = await PATCH(makeRequest("du_test", { foo: "bar" }));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { code: string };
    expect(json.code).toBe("invalid_request");
    expect(updateMock).not.toHaveBeenCalled();
  });
});
