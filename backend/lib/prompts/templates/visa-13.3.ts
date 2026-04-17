import { ReasonCodePromptTemplate } from "../types";

export const visa133Template: ReasonCodePromptTemplate = {
  reason_code: "13.3",
  network: "visa",
  strategy:
    "Prove the product or service matched its description and was delivered in acceptable condition. If the customer did not attempt a return before filing the dispute, note this -- Visa requires the cardholder to attempt merchant resolution first.",
  sections: [
    {
      name: "Product Description Accuracy",
      bank_criterion: "Did the product match the description at time of purchase?",
      instruction:
        "State what was advertised and what was delivered. Reference the product listing or description documentation. If they match, state this factually.",
      auto_pull_fields: [],
      evidence_keys: [
        "product_description_at_purchase",
        "product_specifications",
      ],
      priority: 1,
    },
    {
      name: "Customer Communication",
      bank_criterion: "Did the merchant attempt to resolve the issue?",
      instruction:
        "Reference any complaint handling, resolution offers, or communication about the product. If the customer never contacted the merchant before filing the dispute, state this -- Visa requires the cardholder to attempt resolution first.",
      auto_pull_fields: [],
      evidence_keys: [
        "customer_product_communications",
        "no_return_attempt",
      ],
      priority: 1,
    },
    {
      name: "Refund/Return Policy",
      bank_criterion: "Was the customer given a path to return/refund?",
      instruction:
        "State the return/refund policy and how it was displayed to the customer at checkout. If the customer did not use the return process, state this.",
      auto_pull_fields: [],
      evidence_keys: [
        "return_policy_at_checkout",
        "refund_refusal_explanation",
        "refund_or_replacement_confirmation",
      ],
      priority: 1,
    },
    {
      name: "Shipping/Delivery Condition",
      bank_criterion: "Was the product in acceptable condition when shipped?",
      instruction:
        "Reference delivery confirmation and any pre-shipment condition documentation. If photos of the item before shipment exist, reference them.",
      auto_pull_fields: [],
      evidence_keys: [
        "delivery_proof",
        "pre_shipment_photos",
      ],
      priority: 2,
    },
    {
      name: "Refund Denial Justification",
      bank_criterion: "Is the merchant's refusal reasonable?",
      instruction:
        "If a refund was denied, state the specific reason: return window expired, item returned in unacceptable condition, no return attempted, etc. Reference the policy terms and any documentation supporting the denial.",
      auto_pull_fields: [],
      evidence_keys: [
        "refund_refusal_explanation",
        "refund_or_replacement_confirmation",
      ],
      priority: 2,
    },
    {
      name: "Service Delivery",
      bank_criterion: "Was the service performed as agreed?",
      instruction:
        "For services disputes: reference the signed scope of work or service agreement, the deliverables or work product that was provided, and any client sign-off or written acceptance. If the client approved milestones or the final work, this directly refutes a 'not as described' claim.",
      auto_pull_fields: [],
      evidence_keys: [
        "service_agreement",
        "service_delivery_proof",
        "client_signoff",
      ],
      priority: 1,
    },
  ],
};
