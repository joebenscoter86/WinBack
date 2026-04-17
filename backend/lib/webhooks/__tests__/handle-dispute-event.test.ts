import { describe, it, expect, vi, beforeEach } from "vitest";
import Stripe from "stripe";

const { supabaseMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
}));
vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));

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

  beforeEach(() => {
    vi.clearAllMocks();
    upsertSpy = vi.fn().mockResolvedValue({ error: null });

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: vi.fn().mockResolvedValue({
                data: { id: MERCHANT_ID },
                error: null,
              }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return { upsert: upsertSpy };
      }
      throw new Error(`unexpected table ${table}`);
    });
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
    supabaseMock.from.mockImplementation(() => ({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }),
    }));

    await handleDisputeEvent(
      makeEvent("charge.dispute.created", makeDispute()),
      ACCOUNT_ID,
    );
    expect(upsertSpy).not.toHaveBeenCalled();
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
});
