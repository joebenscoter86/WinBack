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
        "Proof of active subscription at time of charge",
        "Billing period covered by the disputed charge (service_date)",
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
        "Cancellation policy (terms accepted at signup)",
        "Cancellation request timestamp vs. charge date",
        "Cancellation confirmation sent to customer",
      ],
      priority: 1,
    },
    {
      name: "Post-Cancellation Usage",
      bank_criterion: "Did the customer continue using the service?",
      instruction:
        "If access logs show the customer used the service after the alleged cancellation date, state the timestamps and activity. Continued usage undermines the claim that the subscription should have been cancelled.",
      auto_pull_fields: [],
      evidence_keys: ["Service usage logs after last billing cycle"],
      priority: 1,
    },
    {
      name: "Customer Communication",
      bank_criterion: "Did the customer follow the cancellation process?",
      instruction:
        "Reference any correspondence about the subscription or cancellation. If the customer was informed of the billing terms and did not follow the cancellation process, state this factually.",
      auto_pull_fields: [],
      evidence_keys: ["Communication history with customer"],
      priority: 2,
    },
    {
      name: "Refund Policy",
      bank_criterion: "Was the customer informed of billing terms?",
      instruction:
        "Reference the subscription agreement and refund policy terms. If a refund was already issued, state the amount and date.",
      auto_pull_fields: ["refunds"],
      evidence_keys: [
        "Subscription agreement / terms of service",
        "Refund confirmation (if already refunded)",
      ],
      priority: 2,
    },
  ],
};
