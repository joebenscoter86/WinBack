import type { Fixture } from "../types";

export const visa133Fixture: Fixture = {
  id: "visa-13.3",
  description: "Visa 13.3 — Not as Described. Product matched listing, customer never attempted return.",
  context: {
    reason_code: "13.3",
    network: "visa",
    display_name: "Not as Described or Defective Merchandise/Services",
    amount: 13900,
    currency: "usd",
    transaction_date: Math.floor(new Date("2025-07-20T16:35:00Z").getTime() / 1000),
    customer_name: "Jordan Example",
    customer_email: "jordan@example.com",
    card_brand: "Visa",
    card_last4: "4242",
    billing_address: "742 Evergreen Terrace, Springfield, IL 62704",
    charge_description: "Acme Example Co — Order #A-8812",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    authorization_code: "072041",
    network_status: "approved_by_network_rules",
    calculated_statement_descriptor: "ACME EXAMPLE CO",
    refunds: [],
    evidence_files: [
      { checklist_item_key: "product_description_at_purchase", file_name: "product-listing.pdf" },
      { checklist_item_key: "product_specifications", file_name: "product-specs.pdf" },
      { checklist_item_key: "no_return_attempt", file_name: "no-return-contact.pdf" },
      { checklist_item_key: "return_policy_at_checkout", file_name: "return-policy.pdf" },
      { checklist_item_key: "delivery_proof", file_name: "delivery-proof.pdf" },
    ],
    checklist_notes: {
      no_return_attempt:
        "Customer did not contact support or initiate a return within the 30-day return window that was presented at checkout.",
    },
    issuer_evaluation:
      "Visa 13.3 issuers look for: (1) product description matching delivered goods, (2) whether merchant resolution was attempted, (3) return/refund policy displayed at checkout, (4) delivery condition documentation.",
  },
};
