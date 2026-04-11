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
        "Product description as shown at time of purchase (screenshot, listing page)",
        "Product specifications or detailed listing",
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
        "Customer communications about the product (emails, chat logs)",
        "Proof cardholder did NOT attempt to return the merchandise",
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
        "Return policy clearly stated at checkout (screenshot or policy page)",
        "Refund refusal explanation (if you denied a return or refund request)",
        "Refund or replacement confirmation (if already issued)",
      ],
      priority: 1,
    },
    {
      name: "Shipping and Condition",
      bank_criterion: "Was the product in acceptable condition when shipped?",
      instruction:
        "Reference delivery confirmation and any pre-shipment condition documentation. If photos of the item before shipment exist, reference them.",
      auto_pull_fields: [],
      evidence_keys: [
        "Proof of delivery (tracking number with delivery confirmation)",
        "Pre-shipment photos of the actual item",
      ],
      priority: 2,
    },
    {
      name: "Service Delivery",
      bank_criterion: "Was the service performed as agreed?",
      instruction:
        "For services only. Reference the service agreement, proof of delivery, and any client sign-off.",
      auto_pull_fields: [],
      evidence_keys: [
        "Service agreement or scope of work document",
        "Proof of service delivery (reports, access logs, deliverables, work product)",
        "Client sign-off or acceptance documentation",
      ],
      priority: 1,
    },
  ],
};
