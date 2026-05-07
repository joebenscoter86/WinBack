import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextRequest } from "next/server";
import Stripe from "stripe";

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

const listDisputesMock = vi.fn();
vi.mock("@/lib/stripe", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/stripe")>();
  return {
    ...actual,
    listDisputes: listDisputesMock,
  };
});

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(async () => undefined),
}));

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new Request("https://x/api/disputes/for-payment-object", {
    method: "POST",
    headers: { "stripe-signature": "stub" },
    body: JSON.stringify({
      user_id: "usr_1",
      account_id: "acct_test_x",
      livemode: false,
      ...body,
    }),
  }) as unknown as NextRequest;
}

const FAKE_DISPUTE = {
  id: "du_1",
  object: "dispute",
  charge: { id: "ch_1", customer: null },
  payment_intent: null,
  amount: 5000,
  currency: "usd",
  reason: "fraudulent",
  status: "needs_response",
  evidence_details: { due_by: 1714867200, has_evidence: false, past_due: false, submission_count: 0 },
  evidence: {},
  network_reason_code: "10.4",
  livemode: false,
  metadata: {},
  created: 1712275200,
  is_charge_refundable: false,
  balance_transactions: [],
} as unknown as Stripe.Dispute;

beforeEach(() => {
  listDisputesMock.mockReset();
});

describe("/api/disputes/for-payment-object", () => {
  it("filters by charge when object='charge'", async () => {
    listDisputesMock.mockResolvedValue([FAKE_DISPUTE]);
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ id: "ch_abc", object: "charge" }));
    expect(res.status).toBe(200);
    expect(listDisputesMock).toHaveBeenCalledWith(
      false,
      "acct_test_x",
      expect.objectContaining({ charge: "ch_abc", limit: 1 }),
    );
    const call = listDisputesMock.mock.calls[0]?.[2];
    expect(call).not.toHaveProperty("payment_intent");
  });

  it("filters by payment_intent when object='payment_intent'", async () => {
    listDisputesMock.mockResolvedValue([FAKE_DISPUTE]);
    const { POST } = await import("../route");
    const res = await POST(
      makeRequest({ id: "pi_abc", object: "payment_intent" }),
    );
    expect(res.status).toBe(200);
    expect(listDisputesMock).toHaveBeenCalledWith(
      false,
      "acct_test_x",
      expect.objectContaining({ payment_intent: "pi_abc", limit: 1 }),
    );
    const call = listDisputesMock.mock.calls[0]?.[2];
    expect(call).not.toHaveProperty("charge");
  });

  it("returns 404 not_found when Stripe returns no disputes", async () => {
    listDisputesMock.mockResolvedValue([]);
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ id: "ch_none", object: "charge" }));
    expect(res.status).toBe(404);
    const json = (await res.json()) as { code: string };
    expect(json.code).toBe("not_found");
  });

  it("returns 400 for unsupported object types", async () => {
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ id: "in_xxx", object: "invoice" }));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { code: string };
    expect(json.code).toBe("invalid_request");
    expect(listDisputesMock).not.toHaveBeenCalled();
  });

  it("returns 400 when id or object is missing", async () => {
    const { POST } = await import("../route");
    const r1 = await POST(makeRequest({ object: "charge" }));
    expect(r1.status).toBe(400);
    const r2 = await POST(makeRequest({ id: "ch_x" }));
    expect(r2.status).toBe(400);
    expect(listDisputesMock).not.toHaveBeenCalled();
  });

  it("does not silence Stripe errors as 404", async () => {
    const stripeErr = Object.assign(new Stripe.errors.StripeInvalidRequestError({
      message: "Invalid id",
      type: "invalid_request_error",
    }), { code: "parameter_invalid_string_blank" });
    listDisputesMock.mockRejectedValue(stripeErr);
    const { POST } = await import("../route");
    const res = await POST(makeRequest({ id: "ch_bad", object: "charge" }));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { code: string };
    expect(json.code).toBe("invalid_request");
  });

  it("propagates livemode and stripeAccount through listDisputes", async () => {
    listDisputesMock.mockResolvedValue([FAKE_DISPUTE]);
    const { POST } = await import("../route");
    const req = new Request("https://x/api/disputes/for-payment-object", {
      method: "POST",
      headers: { "stripe-signature": "stub" },
      body: JSON.stringify({
        user_id: "usr_1",
        account_id: "acct_test_x",
        livemode: true,
        id: "ch_live",
        object: "charge",
      }),
    }) as unknown as NextRequest;
    await POST(req);
    expect(listDisputesMock).toHaveBeenCalledWith(
      true,
      "acct_test_x",
      expect.objectContaining({ charge: "ch_live" }),
    );
  });
});
