import type { Fixture } from "../types";

export const visa136Fixture: Fixture = {
  id: "visa-13.6",
  description: "Visa 13.6 — Credit Not Processed. Refund already issued; reference the processor credit.",
  context: {
    reason_code: "13.6",
    network: "visa",
    display_name: "Credit Not Processed",
    amount: 5600,
    currency: "usd",
    transaction_date: Math.floor(new Date("2025-09-04T18:00:00Z").getTime() / 1000),
    customer_name: "Jordan Example",
    customer_email: "jordan@example.com",
    card_brand: "Visa",
    card_last4: "4242",
    billing_address: "742 Evergreen Terrace, Springfield, IL 62704",
    charge_description: "Acme Example Co — Order #A-10115",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    authorization_code: "090412",
    network_status: "approved_by_network_rules",
    calculated_statement_descriptor: "ACME EXAMPLE CO",
    refunds: [
      {
        amount: 5600,
        created: Math.floor(new Date("2025-09-18T12:30:00Z").getTime() / 1000),
        status: "succeeded",
      },
    ],
    evidence_files: [
      { checklist_item_key: "refund_confirmation_record", file_name: "stripe-refund.pdf" },
      { checklist_item_key: "refund_amount_and_date", file_name: "refund-receipt.pdf" },
      { checklist_item_key: "processor_credit_confirmation", file_name: "processor-credit.pdf" },
      { checklist_item_key: "return_refund_policy_at_checkout", file_name: "refund-policy.pdf" },
    ],
    checklist_notes: {
      refund_confirmation_record:
        "Full refund processed on 2025-09-18; credit should post to the cardholder's statement within 5-10 business days.",
    },
    issuer_evaluation:
      "Visa 13.6 issuers evaluate: (1) whether the refund was already processed, (2) refund policy disclosure, (3) valid reason for denial if no refund was issued, (4) original transaction context.",
  },
};
