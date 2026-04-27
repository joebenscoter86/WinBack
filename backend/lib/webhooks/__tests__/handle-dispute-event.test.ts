import { describe, it, expect, vi, beforeEach } from "vitest";
import Stripe from "stripe";

const { supabaseMock, billingMock, sentryMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
  billingMock: { reportDisputeWonFee: vi.fn() },
  sentryMock: { captureRouteError: vi.fn() },
}));
vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/billing", () => billingMock);
vi.mock("@/lib/sentry", () => sentryMock);

import { handleDisputeEvent } from "../handle-dispute-event";

const ACCOUNT_ID = "acct_test_123";
const MERCHANT_ID = "merch-uuid-1";

function makeDispute(overrides: Partial<Stripe.Dispute> = {}): Stripe.Dispute {
  return {
    id: "dp_test_1",
    object: "dispute",
    amount: 1234,
    currency: "usd",
    charge: "ch_test_1",
    reason: "fraudulent",
    status: "needs_response",
    network_reason_code: "10.4",
    evidence_details: { due_by: 1700000000, has_evidence: false, past_due: false, submission_count: 0 },
    livemode: false,
    created: 1690000000,
    ...overrides,
  } as unknown as Stripe.Dispute;
}

function makeEvent(type: Stripe.Event.Type, dispute: Stripe.Dispute): Stripe.Event {
  return {
    id: "evt_test",
    type,
    created: 1690000100,
    data: { object: dispute },
  } as unknown as Stripe.Event;
}

describe("handleDisputeEvent", () => {
  let upsertSpy: ReturnType<typeof vi.fn>;

  function mockMerchant(row: { id: string; billing_tier: "usage" | "pro" } | null) {
    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: vi.fn().mockResolvedValue({ data: row, error: null }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return { upsert: upsertSpy };
      }
      throw new Error(`unexpected table ${table}`);
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    upsertSpy = vi.fn().mockResolvedValue({ error: null });
    billingMock.reportDisputeWonFee.mockResolvedValue({ feeCents: 0, identifier: "x" });
    mockMerchant({ id: MERCHANT_ID, billing_tier: "usage" });
  });

  it("upserts dispute with merchant_id on dispute.created", async () => {
    await handleDisputeEvent(
      makeEvent("charge.dispute.created", makeDispute()),
      ACCOUNT_ID,
    );
    expect(upsertSpy).toHaveBeenCalledOnce();
    const [row, opts] = upsertSpy.mock.calls[0];
    expect(row.stripe_dispute_id).toBe("dp_test_1");
    expect(row.merchant_id).toBe(MERCHANT_ID);
    expect(row.amount).toBe(1234);
    expect(opts).toEqual({ onConflict: "stripe_dispute_id" });
  });

  it("sets outcome_at on dispute.closed when status is won", async () => {
    await handleDisputeEvent(
      makeEvent("charge.dispute.closed", makeDispute({ status: "won" })),
      ACCOUNT_ID,
    );
    const [row] = upsertSpy.mock.calls[0];
    expect(row.status).toBe("won");
    expect(row.outcome_at).toBe(new Date(1690000100 * 1000).toISOString());
  });

  it("leaves outcome_at null on dispute.closed when status is non-terminal", async () => {
    await handleDisputeEvent(
      makeEvent("charge.dispute.closed", makeDispute({ status: "under_review" })),
      ACCOUNT_ID,
    );
    const [row] = upsertSpy.mock.calls[0];
    expect(row.outcome_at).toBeNull();
  });

  it("ignores event when merchant is not installed", async () => {
    mockMerchant(null);

    await handleDisputeEvent(
      makeEvent("charge.dispute.created", makeDispute()),
      ACCOUNT_ID,
    );
    expect(upsertSpy).not.toHaveBeenCalled();
  });

  it("reports success fee on won close for usage-tier merchant", async () => {
    await handleDisputeEvent(
      makeEvent("charge.dispute.closed", makeDispute({ status: "won", amount: 10000 })),
      ACCOUNT_ID,
    );
    expect(billingMock.reportDisputeWonFee).toHaveBeenCalledOnce();
    expect(billingMock.reportDisputeWonFee).toHaveBeenCalledWith({
      merchantId: MERCHANT_ID,
      disputeId: "dp_test_1",
      amountRecoveredCents: 10000,
    });
  });

  it("does NOT report success fee when merchant is Pro", async () => {
    mockMerchant({ id: MERCHANT_ID, billing_tier: "pro" });
    await handleDisputeEvent(
      makeEvent("charge.dispute.closed", makeDispute({ status: "won", amount: 10000 })),
      ACCOUNT_ID,
    );
    expect(billingMock.reportDisputeWonFee).not.toHaveBeenCalled();
  });

  it("does NOT report success fee when dispute closed as lost", async () => {
    await handleDisputeEvent(
      makeEvent("charge.dispute.closed", makeDispute({ status: "lost" })),
      ACCOUNT_ID,
    );
    expect(billingMock.reportDisputeWonFee).not.toHaveBeenCalled();
  });

  it("dispute upsert still happens if metering throws", async () => {
    billingMock.reportDisputeWonFee.mockRejectedValueOnce(new Error("stripe down"));
    await handleDisputeEvent(
      makeEvent("charge.dispute.closed", makeDispute({ status: "won" })),
      ACCOUNT_ID,
    );
    expect(upsertSpy).toHaveBeenCalledOnce();
    expect(sentryMock.captureRouteError).toHaveBeenCalledOnce();
  });

  it("infers visa network from reason code prefix", async () => {
    await handleDisputeEvent(
      makeEvent(
        "charge.dispute.created",
        makeDispute({ reason: "visa_compelling_evidence_3" }),
      ),
      ACCOUNT_ID,
    );
    const [row] = upsertSpy.mock.calls[0];
    expect(row.network).toBe("visa");
  });

  describe("inquiry → chargeback escalation", () => {
    beforeEach(() => {
      upsertSpy = vi.fn(() => Promise.resolve({ error: null }));
    });

    function mockMerchantAndDispute(opts: {
      merchant: { id: string; billing_tier: "usage" | "pro" } | null;
      existingDispute: { status: string; evidence_submitted_at: string | null } | null;
    }) {
      supabaseMock.from.mockImplementation((table: string) => {
        if (table === "merchants") {
          return {
            select: () => ({
              eq: () => ({ maybeSingle: () => Promise.resolve({ data: opts.merchant, error: null }) }),
            }),
          };
        }
        if (table === "disputes") {
          return {
            select: () => ({
              eq: () => ({
                maybeSingle: () => Promise.resolve({ data: opts.existingDispute, error: null }),
              }),
            }),
            upsert: upsertSpy,
          };
        }
        throw new Error(`unexpected table: ${table}`);
      });
    }

    it("clears evidence_submitted_at when warning_needs_response escalates to needs_response", async () => {
      mockMerchantAndDispute({
        merchant: { id: MERCHANT_ID, billing_tier: "usage" },
        existingDispute: {
          status: "warning_needs_response",
          evidence_submitted_at: "2026-04-25T10:00:00Z",
        },
      });

      const dispute = makeDispute({ status: "needs_response" });
      await handleDisputeEvent(makeEvent("charge.dispute.updated", dispute), ACCOUNT_ID);

      expect(upsertSpy).toHaveBeenCalledTimes(1);
      const upsertPayload = upsertSpy.mock.calls[0][0];
      expect(upsertPayload).toMatchObject({
        stripe_dispute_id: dispute.id,
        status: "needs_response",
        evidence_submitted_at: null,
      });
    });

    it("does NOT clear evidence_submitted_at on a same-status update", async () => {
      mockMerchantAndDispute({
        merchant: { id: MERCHANT_ID, billing_tier: "usage" },
        existingDispute: {
          status: "warning_needs_response",
          evidence_submitted_at: "2026-04-25T10:00:00Z",
        },
      });

      const dispute = makeDispute({ status: "warning_needs_response" });
      await handleDisputeEvent(makeEvent("charge.dispute.updated", dispute), ACCOUNT_ID);

      const upsertPayload = upsertSpy.mock.calls[0][0];
      expect(upsertPayload).not.toHaveProperty("evidence_submitted_at", null);
    });

    it("does NOT clear evidence_submitted_at when warning_* transitions to warning_closed", async () => {
      mockMerchantAndDispute({
        merchant: { id: MERCHANT_ID, billing_tier: "usage" },
        existingDispute: {
          status: "warning_needs_response",
          evidence_submitted_at: "2026-04-25T10:00:00Z",
        },
      });

      const dispute = makeDispute({ status: "warning_closed" });
      await handleDisputeEvent(makeEvent("charge.dispute.updated", dispute), ACCOUNT_ID);

      const upsertPayload = upsertSpy.mock.calls[0][0];
      expect(upsertPayload).not.toHaveProperty("evidence_submitted_at", null);
    });

    it("treats a missing prior row as no-escalation (safe insert)", async () => {
      mockMerchantAndDispute({
        merchant: { id: MERCHANT_ID, billing_tier: "usage" },
        existingDispute: null,
      });

      const dispute = makeDispute({ status: "needs_response" });
      await handleDisputeEvent(makeEvent("charge.dispute.updated", dispute), ACCOUNT_ID);

      const upsertPayload = upsertSpy.mock.calls[0][0];
      expect(upsertPayload).not.toHaveProperty("evidence_submitted_at", null);
    });
  });
});
