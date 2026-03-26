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
    charge: {
      id: "ch_test_789",
      object: "charge",
      payment_method_details: {
        card: { network: "visa" },
      },
      customer: {
        id: "cus_test_abc",
        name: "Jane Doe",
        email: "jane@example.com",
      },
    },
    evidence_details: {
      due_by: 1712188800,
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
});
