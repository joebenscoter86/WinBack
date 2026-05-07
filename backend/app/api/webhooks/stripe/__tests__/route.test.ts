import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const TEST_WEBHOOK_SECRET = "whsec_test_secret_for_unit_tests";
const LIVE_WEBHOOK_SECRET = "whsec_live_secret_for_unit_tests";
process.env.STRIPE_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;
process.env.STRIPE_WEBHOOK_SECRET_LIVE = LIVE_WEBHOOK_SECRET;
process.env.STRIPE_WEBHOOK_SECRET_TEST = TEST_WEBHOOK_SECRET;
process.env.STRIPE_SECRET_KEY = "sk_test_fake";

const { supabaseMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
}));
vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));

const { handleDisputeEventMock } = vi.hoisted(() => ({
  handleDisputeEventMock: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/webhooks/handle-dispute-event", () => ({
  handleDisputeEvent: handleDisputeEventMock,
}));

vi.mock("@/lib/sentry", () => ({ captureRouteError: vi.fn() }));

import { POST } from "../route";

const stripe = new Stripe("sk_test_fake");

function signedRequest(payload: object, secret = TEST_WEBHOOK_SECRET): NextRequest {
  const body = JSON.stringify(payload);
  const sig = stripe.webhooks.generateTestHeaderString({ payload: body, secret });
  return new NextRequest("http://localhost:3000/api/webhooks/stripe", {
    method: "POST",
    body,
    headers: { "stripe-signature": sig, "content-type": "application/json" },
  });
}

function disputeEvent(
  type: Stripe.Event.Type = "charge.dispute.created",
  overrides: Partial<{ id: string; account: string; status: string }> = {},
): object {
  return {
    id: overrides.id ?? "evt_test_1",
    type,
    object: "event",
    created: 1700000000,
    livemode: false,
    api_version: null,
    pending_webhooks: 0,
    request: { id: null, idempotency_key: null },
    account: overrides.account ?? "acct_test_1",
    data: {
      object: {
        id: "dp_test_1",
        object: "dispute",
        amount: 100,
        currency: "usd",
        charge: "ch_test_1",
        reason: "fraudulent",
        status: overrides.status ?? "needs_response",
        livemode: false,
        created: 1690000000,
      },
    },
  };
}

describe("POST /api/webhooks/stripe", () => {
  let webhookEventsInsert: ReturnType<typeof vi.fn>;
  let webhookEventsUpdate: ReturnType<typeof vi.fn>;
  let updateEqSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    webhookEventsInsert = vi.fn().mockResolvedValue({ error: null });
    updateEqSpy = vi.fn().mockResolvedValue({ error: null });
    webhookEventsUpdate = vi.fn().mockReturnValue({ eq: updateEqSpy });

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "webhook_events") {
        return { insert: webhookEventsInsert, update: webhookEventsUpdate };
      }
      throw new Error(`unexpected table ${table}`);
    });
  });

  it("returns 400 when stripe-signature header is missing", async () => {
    const req = new NextRequest("http://localhost:3000/api/webhooks/stripe", {
      method: "POST",
      body: "{}",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when signature is invalid", async () => {
    const req = signedRequest(disputeEvent(), "whsec_wrong_secret");
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when forged with neither live nor test secret", async () => {
    const req = signedRequest(disputeEvent(), "whsec_neither_live_nor_test");
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(handleDisputeEventMock).not.toHaveBeenCalled();
  });

  it("accepts a livemode event signed with the live secret", async () => {
    const req = signedRequest(
      { ...disputeEvent(), livemode: true },
      LIVE_WEBHOOK_SECRET,
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(handleDisputeEventMock).toHaveBeenCalledOnce();
    expect(webhookEventsInsert).toHaveBeenCalledWith(
      expect.objectContaining({ livemode: true }),
    );
  });

  it("dispatches valid dispute event to handler and marks processed", async () => {
    const req = signedRequest(disputeEvent());
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(handleDisputeEventMock).toHaveBeenCalledOnce();
    expect(webhookEventsUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ status: "processed" }),
    );
  });

  it("dedupes when event_id already exists", async () => {
    webhookEventsInsert.mockResolvedValue({ error: { code: "23505" } });
    const req = signedRequest(disputeEvent());
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.deduped).toBe(true);
    expect(handleDisputeEventMock).not.toHaveBeenCalled();
  });

  it("ignores non-handled event types but marks processed", async () => {
    const req = signedRequest(disputeEvent("payment_intent.succeeded"));
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ignored).toBe(true);
    expect(handleDisputeEventMock).not.toHaveBeenCalled();
  });

  it("trims whitespace from STRIPE_WEBHOOK_SECRET_TEST before verification", async () => {
    // Vercel env-var pastes occasionally include a trailing newline. Stripe's
    // SDK explicitly calls this out: "The provided signing secret contains
    // whitespace." Defense-in-depth: the route trims the secret before
    // constructEvent so a misconfigured env doesn't 400 every test webhook.
    process.env.STRIPE_WEBHOOK_SECRET_TEST = `\n${TEST_WEBHOOK_SECRET}\n`;
    try {
      const req = signedRequest(disputeEvent());
      const res = await POST(req);
      expect(res.status).toBe(200);
      expect(handleDisputeEventMock).toHaveBeenCalledOnce();
    } finally {
      process.env.STRIPE_WEBHOOK_SECRET_TEST = TEST_WEBHOOK_SECRET;
    }
  });

  it("trims whitespace from STRIPE_WEBHOOK_SECRET_LIVE before verification", async () => {
    process.env.STRIPE_WEBHOOK_SECRET_LIVE = ` ${LIVE_WEBHOOK_SECRET}\n`;
    try {
      const req = signedRequest(
        { ...disputeEvent(), livemode: true },
        LIVE_WEBHOOK_SECRET,
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
      expect(handleDisputeEventMock).toHaveBeenCalledOnce();
    } finally {
      process.env.STRIPE_WEBHOOK_SECRET_LIVE = LIVE_WEBHOOK_SECRET;
    }
  });

  it("returns 500 and marks failed when handler throws", async () => {
    handleDisputeEventMock.mockRejectedValueOnce(new Error("boom"));
    const req = signedRequest(disputeEvent());
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(webhookEventsUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ status: "failed", error_message: "boom" }),
    );
  });
});
