import { describe, it, expect } from "vitest";
import type Stripe from "stripe";
import { disputeToRow } from "../to-row";

function mkDispute(overrides: Partial<Stripe.Dispute> = {}): Stripe.Dispute {
  return {
    id: "dp_1",
    amount: 1234,
    currency: "usd",
    charge: "ch_1",
    reason: "fraudulent",
    status: "needs_response",
    network_reason_code: "10.4",
    evidence_details: {
      due_by: 1700000000,
      has_evidence: false,
      past_due: false,
      submission_count: 0,
    },
    livemode: false,
    created: 1690000000,
    ...overrides,
  } as unknown as Stripe.Dispute;
}

describe("disputeToRow", () => {
  it("preserves Stripe's status verbatim", () => {
    // The contract: status is what Insights aggregates on. If
    // disputeToRow ever transforms it (e.g. lowercases, maps "lost" to
    // "closed"), the Insights win-rate denominator silently shifts.
    for (const status of [
      "needs_response",
      "warning_needs_response",
      "under_review",
      "warning_under_review",
      "won",
      "lost",
      "warning_closed",
      "charge_refunded",
    ] as const) {
      expect(
        disputeToRow(mkDispute({ status: status as Stripe.Dispute.Status })).status,
      ).toBe(status);
    }
  });

  it("preserves Stripe's reason verbatim as reason_code", () => {
    // Insights patterns bucket on reason_code. Same drift risk as status.
    for (const reason of [
      "fraudulent",
      "duplicate",
      "general",
      "visa_compelling_evidence_3",
    ]) {
      expect(disputeToRow(mkDispute({ reason })).reason_code).toBe(reason);
    }
  });

  it("infers visa from a visa_-prefixed reason", () => {
    const row = disputeToRow(mkDispute({ reason: "visa_compelling_evidence_3" }));
    expect(row.network).toBe("visa");
  });

  it("infers null network when Stripe didn't populate network_reason_code", () => {
    const row = disputeToRow(
      mkDispute({ reason: "fraudulent", network_reason_code: null }),
    );
    expect(row.network).toBeNull();
  });

  it("converts due_by epoch seconds to ISO string", () => {
    const row = disputeToRow(mkDispute());
    expect(row.response_deadline).toBe(new Date(1700000000 * 1000).toISOString());
  });

  it("returns null response_deadline when due_by is unset", () => {
    const row = disputeToRow(
      mkDispute({
        evidence_details: {
          due_by: 0,
          has_evidence: false,
          past_due: false,
          submission_count: 0,
        } as Stripe.Dispute.EvidenceDetails,
      }),
    );
    expect(row.response_deadline).toBeNull();
  });

  it("extracts charge id from string or object", () => {
    expect(disputeToRow(mkDispute({ charge: "ch_string" })).stripe_charge_id).toBe(
      "ch_string",
    );
    expect(
      disputeToRow(
        mkDispute({ charge: { id: "ch_object" } as Stripe.Charge }),
      ).stripe_charge_id,
    ).toBe("ch_object");
  });
});
