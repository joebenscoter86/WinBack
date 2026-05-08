import { describe, it, expect } from "vitest";
import type Stripe from "stripe";
import { disputeToRow, extractNetwork } from "../to-row";

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

  it("returns network_reason_code from top-level Stripe field", () => {
    expect(
      disputeToRow(mkDispute({ network_reason_code: "10.4" })).network_reason_code,
    ).toBe("10.4");
  });

  it("returns network_reason_code from nested payment_method_details when top-level is null", () => {
    // Stripe API docs put network_reason_code under
    // payment_method_details.card. The SDK 20.4.1 type also exposes the
    // top-level form. We must read both. (WIN-78)
    const row = disputeToRow(
      mkDispute({
        network_reason_code: null,
        payment_method_details: {
          card: { network_reason_code: "4853", brand: "mastercard" },
        },
      } as unknown as Partial<Stripe.Dispute>),
    );
    expect(row.network_reason_code).toBe("4853");
  });

  it("prefers top-level over nested when both are populated", () => {
    const row = disputeToRow(
      mkDispute({
        network_reason_code: "10.4",
        payment_method_details: {
          card: { network_reason_code: "13.1", brand: "visa" },
        },
      } as unknown as Partial<Stripe.Dispute>),
    );
    expect(row.network_reason_code).toBe("10.4");
  });

  it("returns null network_reason_code when both Stripe locations are empty", () => {
    expect(
      disputeToRow(mkDispute({ network_reason_code: null })).network_reason_code,
    ).toBeNull();
  });

  it("does not conflate reason_code with network_reason_code (WIN-78)", () => {
    const row = disputeToRow(
      mkDispute({ reason: "fraudulent", network_reason_code: "10.4" }),
    );
    expect(row.reason_code).toBe("fraudulent");
    expect(row.network_reason_code).toBe("10.4");
  });
});

describe("extractNetwork (WIN-78)", () => {
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

  it("prefers charge.payment_method_details.card.network", () => {
    const d = mkDispute({
      reason: "fraudulent",
      charge: {
        id: "ch_test",
        payment_method_details: {
          card: { network: "visa", brand: "visa" },
        },
      } as unknown as Stripe.Charge,
    });
    expect(extractNetwork(d)).toBe("visa");
  });

  it("falls back to card.brand when network is missing or 'unknown'", () => {
    const d = mkDispute({
      reason: "fraudulent",
      charge: {
        id: "ch_test",
        payment_method_details: {
          card: { network: "unknown", brand: "mastercard" },
        },
      } as unknown as Stripe.Charge,
    });
    expect(extractNetwork(d)).toBe("mastercard");
  });

  it("falls back to inferNetwork(d.reason) when charge has no card details", () => {
    const d = mkDispute({
      reason: "visa_compelling_evidence_3",
      charge: "ch_string", // not expanded
    });
    expect(extractNetwork(d)).toBe("visa");
  });

  it("returns null when nothing is resolvable", () => {
    const d = mkDispute({
      reason: "fraudulent",
      charge: "ch_string",
    });
    expect(extractNetwork(d)).toBeNull();
  });
});
