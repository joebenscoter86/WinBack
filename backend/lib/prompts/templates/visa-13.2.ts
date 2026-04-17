import { ReasonCodePromptTemplate } from "../types";

export const visa132Template: ReasonCodePromptTemplate = {
  reason_code: "13.2",
  network: "visa",
  strategy:
    "Prove the subscription was still active when charged, or that cancellation was not properly completed per the terms the customer agreed to. If the customer continued using the service after the alleged cancellation, this undermines their claim.",
  sections: [
    {
      name: "Subscription Status",
      bank_criterion:
        "Was the subscription active when the charge was processed?",
      instruction:
        "State the subscription start date, billing cycle, and that the subscription was active at the time of the disputed charge. Include the billing period covered by the charge.",
      auto_pull_fields: [],
      evidence_keys: [
        "subscription_active_proof",
        "billing_period_covered",
      ],
      priority: 1,
    },
    {
      name: "Cancellation Policy",
      bank_criterion: "Did the customer agree to cancellation terms?",
      instruction:
        "State the cancellation policy and how it was disclosed to the customer at signup. If the cancellation request came after the billing date, state the timeline factually. If no cancellation was received, state that.",
      auto_pull_fields: [],
      evidence_keys: [
        "cancellation_policy_terms",
        "cancellation_request_timestamp",
        "cancellation_confirmation_sent",
      ],
      priority: 1,
    },
    {
      name: "Post-Cancellation Usage",
      bank_criterion: "Did the customer continue using the service?",
      instruction:
        "If access logs show the customer used the service after the alleged cancellation date, state the timestamps and activity. Continued usage undermines the claim that the subscription should have been cancelled.",
      auto_pull_fields: [],
      evidence_keys: ["post_billing_usage_logs"],
      priority: 1,
    },
    {
      name: "Customer Communication",
      bank_criterion: "Did the customer follow the cancellation process?",
      instruction:
        "Reference any correspondence about the subscription or cancellation, including the customer email on file where renewal reminders and cancellation confirmations were sent. If the customer was informed of the billing terms and did not follow the cancellation process, state this factually.",
      auto_pull_fields: [],
      evidence_keys: [
        "customer_communication_history",
        "customer_email_subscription",
      ],
      priority: 2,
    },
    {
      name: "Refund Policy",
      bank_criterion: "Was the customer informed of billing terms?",
      instruction:
        "Reference the subscription agreement and refund policy terms. If a refund was already issued, state the amount and date.",
      auto_pull_fields: ["refunds"],
      evidence_keys: [
        "subscription_agreement",
        "refund_confirmation",
      ],
      priority: 2,
    },
    {
      name: "Installment Plan Defense",
      bank_criterion: "Is this actually a recurring transaction?",
      instruction:
        "If the transaction is a fixed installment plan (e.g., 3 payments of $100) rather than an open-ended subscription, reason code 13.2 does not apply. Reference the installment agreement showing the fixed payment schedule. This is a threshold defense — if successful, the dispute code itself is invalid.",
      auto_pull_fields: [],
      evidence_keys: ["installment_plan_proof"],
      priority: 1,
    },
  ],
};
