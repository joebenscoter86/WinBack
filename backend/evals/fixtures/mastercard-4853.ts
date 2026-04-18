import type { Fixture } from "../types";

export const mastercard4853Fixture: Fixture = {
  id: "mastercard-4853",
  description: "Mastercard 4853 — Cardholder Disputes. Product matched listing; no pre-dispute contact from customer.",
  context: {
    reason_code: "4853",
    network: "mastercard",
    display_name: "Cardholder Disputes - Not as Described or Defective",
    amount: 16800,
    currency: "usd",
    transaction_date: Math.floor(new Date("2025-08-28T13:40:00Z").getTime() / 1000),
    customer_name: "Jordan Example",
    customer_email: "jordan@example.com",
    card_brand: "MasterCard",
    card_last4: "5454",
    billing_address: "742 Evergreen Terrace, Springfield, IL 62704",
    charge_description: "Acme Example Co — Order #A-10050",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    authorization_code: "082812",
    network_status: "approved_by_network_rules",
    calculated_statement_descriptor: "ACME EXAMPLE CO",
    refunds: [],
    evidence_files: [
      { checklist_item_key: "product_description_original", file_name: "product-listing.pdf" },
      { checklist_item_key: "matched_description_proof", file_name: "qc-photos.pdf" },
      { checklist_item_key: "customer_communication_logs", file_name: "support-logs.pdf" },
      { checklist_item_key: "return_refund_policy_at_checkout", file_name: "return-policy.pdf" },
      { checklist_item_key: "proof_of_delivery", file_name: "delivery-proof.pdf" },
    ],
    checklist_notes: {
      customer_communication_logs:
        "No pre-dispute contact from customer. First communication was the chargeback filed on 2025-09-30.",
    },
    issuer_evaluation:
      "Mastercard 4853 issuers evaluate: (1) whether the product matched its description, (2) whether the cardholder attempted merchant resolution, (3) whether a return path was offered, (4) delivery condition.",
  },
};
