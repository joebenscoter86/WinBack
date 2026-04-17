import { ReasonCodePromptTemplate } from "../types";

export const visa136Template: ReasonCodePromptTemplate = {
  reason_code: "13.6",
  network: "visa",
  strategy:
    "Prove the refund was already issued, the customer is not owed one, or the return was never completed. If the refunds array shows a refund was already processed, lead with that -- it is the strongest and simplest defense.",
  sections: [
    {
      name: "Refund Status",
      bank_criterion: "Has a refund already been processed?",
      instruction:
        "If the Stripe refunds data shows a refund was issued, state the refund amount, date, and status. Note that refunds may take 5-10 business days to appear on the cardholder's statement. If no refund was issued, skip to the next section.",
      auto_pull_fields: ["refunds"],
      evidence_keys: [
        "refund_confirmation_record",
        "refund_amount_and_date",
        "processor_credit_confirmation",
      ],
      priority: 1,
    },
    {
      name: "Refund/Return Policy",
      bank_criterion: "Did the customer agree to the refund terms?",
      instruction:
        "State the return/refund policy and how it was presented to the customer at checkout. Reference the policy documentation.",
      auto_pull_fields: [],
      evidence_keys: [
        "return_refund_policy_at_checkout",
        "cancellation_policy_disclosure",
      ],
      priority: 1,
    },
    {
      name: "Refund Denial Reason",
      bank_criterion: "Is there a valid reason the refund was not issued?",
      instruction:
        "If the refund was denied, state why: return not completed, outside return window, item returned in unacceptable condition, etc. Reference documentation showing the return was not completed or the condition did not meet policy requirements.",
      auto_pull_fields: [],
      evidence_keys: [
        "return_condition_documentation",
        "no_return_received",
        "customer_denial_communication",
      ],
      priority: 1,
    },
    {
      name: "Customer Communication",
      bank_criterion: "Did the merchant respond to the refund request?",
      instruction:
        "Reference any correspondence about the refund request, return process, or resolution attempts.",
      auto_pull_fields: [],
      evidence_keys: [
        "written_return_refund_communication",
      ],
      priority: 2,
    },
    {
      name: "Transaction Context",
      bank_criterion: "What was the original transaction for?",
      instruction:
        "State the original purchase details for context: what was ordered, when, and for how much.",
      auto_pull_fields: [],
      evidence_keys: [
        "order_confirmation_original_terms",
      ],
      priority: 2,
    },
  ],
};
