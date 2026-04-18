import type { Fixture } from "../types";

export const visa132Fixture: Fixture = {
  id: "visa-13.2",
  description: "Visa 13.2 — Cancelled Recurring. Subscription active, no cancellation received, post-billing usage.",
  context: {
    reason_code: "13.2",
    network: "visa",
    display_name: "Cancelled Recurring Transaction",
    amount: 2900,
    currency: "usd",
    transaction_date: Math.floor(new Date("2025-10-01T09:00:00Z").getTime() / 1000),
    customer_name: "Jordan Example",
    customer_email: "jordan@example.com",
    card_brand: "Visa",
    card_last4: "4242",
    billing_address: "742 Evergreen Terrace, Springfield, IL 62704",
    charge_description: "Acme Example Co — Pro Plan, October 2025",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    authorization_code: "100107",
    network_status: "approved_by_network_rules",
    calculated_statement_descriptor: "ACME EXAMPLE CO PRO",
    refunds: [],
    evidence_files: [
      { checklist_item_key: "subscription_active_proof", file_name: "subscription-active.pdf" },
      { checklist_item_key: "billing_period_covered", file_name: "billing-period.pdf" },
      { checklist_item_key: "cancellation_policy_terms", file_name: "cancellation-policy.pdf" },
      { checklist_item_key: "post_billing_usage_logs", file_name: "usage-logs.csv" },
    ],
    checklist_notes: {
      subscription_active_proof:
        "Subscription started 2024-12-18 and was active without interruption through the 2025-10-01 billing cycle.",
      post_billing_usage_logs:
        "Customer signed in on 2025-10-03, 2025-10-07, and 2025-10-12, each time using Pro-tier features.",
    },
    issuer_evaluation:
      "Visa 13.2 issuers evaluate: (1) whether the subscription was active at charge time, (2) whether the merchant's cancellation policy was disclosed and followed, (3) whether the customer continued using the service, (4) communication history.",
  },
};
