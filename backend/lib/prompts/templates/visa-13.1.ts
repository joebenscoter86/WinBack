import { ReasonCodePromptTemplate } from "../types";

export const visa131Template: ReasonCodePromptTemplate = {
  reason_code: "13.1",
  network: "visa",
  strategy:
    "Prove delivery was completed to the correct address. Delivery confirmation with a matching address is the strongest evidence. For digital goods, access logs serve as delivery proof. For services, completion documentation is required.",
  sections: [
    {
      name: "Delivery Confirmation",
      bank_criterion: "Is there carrier confirmation of delivery?",
      instruction:
        "State the tracking number, carrier name, delivery date, and delivery status. If a signature was obtained, include that. Present these as factual statements from carrier records.",
      auto_pull_fields: [],
      evidence_keys: [
        "tracking_delivery_scan",
        "signed_delivery",
      ],
      priority: 1,
    },
    {
      name: "Address Verification",
      bank_criterion: "Was it delivered to the correct address?",
      instruction:
        "State that the shipping address on the order matches the delivery address confirmed by the carrier. Include AVS results from Stripe showing address verification at time of purchase.",
      auto_pull_fields: ["avs_address_check", "avs_zip_check"],
      evidence_keys: [
        "shipping_address_match",
      ],
      priority: 1,
    },
    {
      name: "Digital Access Proof",
      bank_criterion: "Did the customer access the product?",
      instruction:
        "For digital goods only. State access log timestamps, IP addresses, and what the customer accessed or downloaded. Include email delivery confirmation of license keys or download links.",
      auto_pull_fields: [],
      evidence_keys: [
        "digital_access_logs",
        "digital_delivery_email",
      ],
      priority: 1,
    },
    {
      name: "Service Completion",
      bank_criterion: "Was the service performed?",
      instruction:
        "For services only. State the service completion date and reference completion documentation, signed work orders, or appointment records.",
      auto_pull_fields: [],
      evidence_keys: [
        "service_completion",
        "appointment_records",
      ],
      priority: 1,
    },
    {
      name: "Customer Communication",
      bank_criterion: "Was the customer informed and did they respond?",
      instruction:
        "Reference any delivery notifications sent, tracking emails, or customer acknowledgment of receipt. Any communication where the customer acknowledged receiving the item is especially valuable.",
      auto_pull_fields: [],
      evidence_keys: [
        "delivery_communication",
      ],
      priority: 2,
    },
  ],
};
