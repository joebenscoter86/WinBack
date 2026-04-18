import type { Fixture } from "../types";

export const mastercard4808Fixture: Fixture = {
  id: "mastercard-4808",
  description: "Mastercard 4808 — Authorization. Valid auth code, AVS + CVC pass, charge matches auth amount.",
  context: {
    reason_code: "4808",
    network: "mastercard",
    display_name: "Authorization-Related Chargeback",
    amount: 9900,
    currency: "usd",
    transaction_date: Math.floor(new Date("2025-09-22T20:15:00Z").getTime() / 1000),
    customer_name: "Jordan Example",
    customer_email: "jordan@example.com",
    card_brand: "MasterCard",
    card_last4: "5454",
    billing_address: "742 Evergreen Terrace, Springfield, IL 62704",
    charge_description: "Acme Example Co — Order #A-10298",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    three_d_secure_result: "authenticated",
    three_d_secure_version: "2.2.0",
    authorization_code: "092201",
    network_status: "approved_by_network_rules",
    calculated_statement_descriptor: "ACME EXAMPLE CO",
    refunds: [],
    evidence_files: [
      { checklist_item_key: "authorization_record", file_name: "authorization-record.pdf" },
      { checklist_item_key: "approval_number", file_name: "approval-number.pdf" },
      { checklist_item_key: "final_charge_tied_to_authorization", file_name: "charge-auth-match.pdf" },
      { checklist_item_key: "order_details_matching_amount", file_name: "order-details.pdf" },
    ],
    checklist_notes: {
      final_charge_tied_to_authorization:
        "Authorization and final capture both processed on 2025-09-22 for the full $99.00.",
    },
    issuer_evaluation:
      "Mastercard 4808 issuers evaluate: (1) presence of a valid authorization code, (2) AVS/CVC/3DS results, (3) whether the charged amount matches what was authorized, (4) supporting paper trail.",
  },
};
