import type { Fixture } from "../types";

export const visa104Fixture: Fixture = {
  id: "visa-10.4",
  description: "Visa 10.4 — Other Fraud, card-absent. 3DS authenticated, AVS + CVC pass, delivery to billing address.",
  context: {
    reason_code: "10.4",
    network: "visa",
    display_name: "Other Fraud - Card Absent Environment",
    amount: 18400,
    currency: "usd",
    transaction_date: Math.floor(new Date("2025-09-12T15:20:00Z").getTime() / 1000),
    customer_name: "Jordan Example",
    customer_email: "jordan@example.com",
    card_brand: "Visa",
    card_last4: "4242",
    billing_address: "742 Evergreen Terrace, Springfield, IL 62704",
    charge_description: "Acme Example Co — Order #A-10421",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    three_d_secure_result: "authenticated",
    three_d_secure_version: "2.2.0",
    authorization_code: "081542",
    network_status: "approved_by_network_rules",
    calculated_statement_descriptor: "ACME EXAMPLE CO",
    refunds: [],
    evidence_files: [
      { checklist_item_key: "three_d_secure_proof", file_name: "3ds-proof.pdf" },
      { checklist_item_key: "avs_result", file_name: "avs-result.pdf" },
      { checklist_item_key: "authorization_record", file_name: "auth-record.pdf" },
      { checklist_item_key: "delivery_to_billing_address", file_name: "delivery-confirmation.pdf" },
      { checklist_item_key: "customer_account_details", file_name: "customer-account.pdf" },
    ],
    checklist_notes: {
      customer_account_details:
        "Customer has held an account since 2023-03-04 and has completed four prior undisputed orders.",
    },
    issuer_evaluation:
      "Visa 10.4 issuers evaluate: (1) authentication evidence (3DS, AVS, CVC), (2) identity match between purchaser and cardholder, (3) delivery to verified address, (4) any pattern of legitimate use.",
  },
};
