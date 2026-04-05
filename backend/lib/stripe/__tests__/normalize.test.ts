import { describe, it, expect } from "vitest";
import type Stripe from "stripe";
import { normalizeDispute } from "../normalize";

const makeStripeDispute = (overrides?: Partial<Stripe.Dispute>): Stripe.Dispute =>
  ({
    id: "dp_test_123",
    object: "dispute",
    amount: 14900,
    currency: "usd",
    reason: "product_not_received",
    status: "needs_response",
    network_reason_code: "13.1",
    payment_intent: "pi_test_456",
    created: 1711324800,
    is_charge_refundable: true,
    evidence: {
      receipt: "file_receipt_123",
      shipping_documentation: null,
    },
    charge: {
      id: "ch_test_789",
      object: "charge",
      created: 1711238400,
      description: "Order #1042 - Blue Widget",
      receipt_url: "https://pay.stripe.com/receipts/test_abc",
      payment_method_details: {
        card: {
          network: "visa",
          brand: "visa",
          last4: "4242",
        },
      },
      customer: {
        id: "cus_test_abc",
        name: "Jane Doe",
        email: "jane@example.com",
      },
      billing_details: {
        address: {
          line1: "123 Main St",
          line2: null,
          city: "Springfield",
          state: "IL",
          postal_code: "62701",
          country: "US",
        },
      },
      metadata: { order_id: "1042" },
    },
    evidence_details: {
      due_by: 1712188800,
      submission_count: 0,
    },
    ...overrides,
  }) as unknown as Stripe.Dispute;

describe("normalizeDispute", () => {
  it("should normalize a full Stripe dispute into WinBack format", () => {
    const result = normalizeDispute(makeStripeDispute());

    expect(result).toEqual({
      id: "dp_test_123",
      amount: 14900,
      currency: "usd",
      reason: "product_not_received",
      status: "needs_response",
      due_by: "2024-04-04",
      reason_code: "13.1",
      network: "visa",
      payment_intent: "pi_test_456",
      charge_id: "ch_test_789",
      customer_name: "Jane Doe",
      customer_email: "jane@example.com",
      created: 1711324800,
      evidence_due_by: 1712188800,
      transaction_date: 1711238400,
      card_brand: "visa",
      card_last4: "4242",
      billing_address: "123 Main St, Springfield, IL 62701, US",
      charge_description: "Order #1042 - Blue Widget",
      receipt_url: "https://pay.stripe.com/receipts/test_abc",
      has_evidence: true,
      evidence_submission_count: 0,
      is_charge_refundable: true,
      metadata: { order_id: "1042" },
    });
  });

  it("should handle missing customer gracefully", () => {
    const dispute = makeStripeDispute({
      charge: {
        id: "ch_test_789",
        object: "charge",
        payment_method_details: {
          card: { network: "mastercard" },
        },
        customer: null,
      } as unknown as Stripe.Charge,
    });
    const result = normalizeDispute(dispute);

    expect(result.customer_name).toBeUndefined();
    expect(result.customer_email).toBeUndefined();
    expect(result.network).toBe("mastercard");
  });

  it("should handle charge as string (unexpanded)", () => {
    const dispute = makeStripeDispute({
      charge: "ch_test_789" as unknown as Stripe.Charge,
    });
    const result = normalizeDispute(dispute);

    expect(result.charge_id).toBe("ch_test_789");
    expect(result.network).toBe("unknown");
    expect(result.customer_name).toBeUndefined();
  });

  it("should handle null evidence_details.due_by", () => {
    const dispute = makeStripeDispute({
      evidence_details: { due_by: null } as unknown as Stripe.Dispute.EvidenceDetails,
    });
    const result = normalizeDispute(dispute);

    expect(result.due_by).toBe("");
    expect(result.evidence_due_by).toBe(0);
  });

  it("should include enriched charge fields", () => {
    const result = normalizeDispute(makeStripeDispute());

    expect(result.transaction_date).toBe(1711238400);
    expect(result.card_brand).toBe("visa");
    expect(result.card_last4).toBe("4242");
    expect(result.billing_address).toBe("123 Main St, Springfield, IL 62701, US");
    expect(result.charge_description).toBe("Order #1042 - Blue Widget");
    expect(result.receipt_url).toBe("https://pay.stripe.com/receipts/test_abc");
    expect(result.metadata).toEqual({ order_id: "1042" });
  });

  it("should include evidence state fields", () => {
    const result = normalizeDispute(makeStripeDispute());

    expect(result.has_evidence).toBe(true);
    expect(result.evidence_submission_count).toBe(0);
    expect(result.is_charge_refundable).toBe(true);
  });

  it("should set has_evidence false when no evidence fields are set", () => {
    const dispute = makeStripeDispute({
      evidence: null as unknown as Stripe.Dispute.Evidence,
    });
    const result = normalizeDispute(dispute);

    expect(result.has_evidence).toBe(false);
  });

  it("should set has_evidence false when evidence has all null values", () => {
    const dispute = makeStripeDispute({
      evidence: { receipt: null, customer_communication: null, shipping_documentation: null } as unknown as Stripe.Dispute.Evidence,
    });
    const result = normalizeDispute(dispute);
    expect(result.has_evidence).toBe(false);
  });

  it("should handle missing billing address", () => {
    const dispute = makeStripeDispute({
      charge: {
        id: "ch_test_789",
        object: "charge",
        payment_method_details: {
          card: { network: "visa", brand: "visa", last4: "4242" },
        },
        billing_details: { address: null },
        customer: null,
        metadata: {},
      } as unknown as Stripe.Charge,
    });
    const result = normalizeDispute(dispute);

    expect(result.billing_address).toBeUndefined();
  });

  it("should handle partial billing address", () => {
    const dispute = makeStripeDispute({
      charge: {
        id: "ch_test_789",
        object: "charge",
        payment_method_details: {
          card: { network: "visa", brand: "visa", last4: "4242" },
        },
        billing_details: {
          address: {
            line1: "456 Oak Ave",
            line2: null,
            city: null,
            state: "CA",
            postal_code: null,
            country: "US",
          },
        },
        customer: null,
        metadata: {},
      } as unknown as Stripe.Charge,
    });
    const result = normalizeDispute(dispute);

    expect(result.billing_address).toBe("456 Oak Ave, CA, US");
  });

  it("should handle charge with no metadata", () => {
    const dispute = makeStripeDispute({
      charge: {
        id: "ch_test_789",
        object: "charge",
        payment_method_details: {
          card: { network: "visa", brand: "visa", last4: "4242" },
        },
        billing_details: { address: null },
        customer: null,
        metadata: {},
      } as unknown as Stripe.Charge,
    });
    const result = normalizeDispute(dispute);

    expect(result.metadata).toEqual({});
  });
});
