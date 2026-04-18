import type { Fixture } from "../types";

export const visa131Fixture: Fixture = {
  id: "visa-13.1",
  description: "Visa 13.1 — Merchandise Not Received. Physical goods delivered with tracking + signature.",
  context: {
    reason_code: "13.1",
    network: "visa",
    display_name: "Merchandise/Services Not Received",
    amount: 7450,
    currency: "usd",
    transaction_date: Math.floor(new Date("2025-08-02T14:11:00Z").getTime() / 1000),
    customer_name: "Jordan Example",
    customer_email: "jordan@example.com",
    card_brand: "Visa",
    card_last4: "4242",
    billing_address: "742 Evergreen Terrace, Springfield, IL 62704",
    charge_description: "Acme Example Co — Order #A-9980",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    authorization_code: "072110",
    network_status: "approved_by_network_rules",
    calculated_statement_descriptor: "ACME EXAMPLE CO",
    refunds: [],
    evidence_files: [
      { checklist_item_key: "tracking_delivery_scan", file_name: "ups-tracking.pdf" },
      { checklist_item_key: "signed_delivery", file_name: "signed-delivery.png" },
      { checklist_item_key: "order_confirmation_delivery_date", file_name: "order-confirmation.pdf" },
      { checklist_item_key: "shipping_address_match", file_name: "address-match.pdf" },
    ],
    checklist_notes: {
      tracking_delivery_scan:
        "UPS tracking 1Z999AA10123456784 shows delivery scan on 2025-08-07 at 11:42 local time.",
    },
    issuer_evaluation:
      "Visa 13.1 issuers look for: (1) carrier confirmation of delivery, (2) shipping address matching the billing address (AVS), (3) for digital goods, access logs demonstrating receipt, (4) post-delivery customer communication.",
  },
};
