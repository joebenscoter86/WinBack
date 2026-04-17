import { ReasonCodePromptTemplate } from "../types";

export const mastercard4853Template: ReasonCodePromptTemplate = {
  reason_code: "4853",
  network: "mastercard",
  strategy:
    "Prove the product or service matched its description, mapped to Mastercard's evaluation criteria. Mastercard requires the cardholder to attempt merchant resolution before filing -- if they skipped this step, note it as a filing defect.",
  sections: [
    {
      name: "Product/Service Description",
      bank_criterion: "Did the merchandise match the description?",
      instruction:
        "State what was advertised and what was delivered. Reference product listing documentation, photos, or quality control records.",
      auto_pull_fields: [],
      evidence_keys: [
        "product_description_original",
        "matched_description_proof",
      ],
      priority: 1,
    },
    {
      name: "Customer Communication",
      bank_criterion: "Did the merchant try to resolve?",
      instruction:
        "Reference complaint handling and resolution attempts. Mastercard requires the cardholder to attempt merchant resolution before filing. If no pre-dispute contact was received, state this as a procedural defect in the filing.",
      auto_pull_fields: [],
      evidence_keys: [
        "customer_communication_logs",
      ],
      priority: 1,
    },
    {
      name: "Return/Refund Policy",
      bank_criterion: "Was the customer offered a return path?",
      instruction:
        "State the return/refund policy, how it was displayed at checkout, and whether the customer used it. If a refund or replacement was already issued, state the details.",
      auto_pull_fields: ["refunds"],
      evidence_keys: [
        "return_refund_policy_at_checkout",
        "refund_refusal_explanation",
        "checkout_terms_of_service",
      ],
      priority: 1,
    },
    {
      name: "Delivery and Condition",
      bank_criterion: "Was the product delivered in acceptable condition?",
      instruction:
        "Reference delivery confirmation and any pre-shipment condition documentation. Include photos or inspection records if available.",
      auto_pull_fields: [],
      evidence_keys: [
        "proof_of_delivery",
        "pre_shipment_photos",
        "qc_inspection_records",
      ],
      priority: 2,
    },
    {
      name: "Dispute Rebuttal",
      bank_criterion: "What does the merchant say happened?",
      instruction:
        "Provide a specific, factual response to the customer's claim. Address the exact complaint and explain why the product/service matched its description. If the customer did not contact the merchant or attempt a return before filing, state this as a procedural defect.",
      auto_pull_fields: [],
      evidence_keys: [
        "prior_transaction_history",
        "checkout_terms_of_service",
      ],
      priority: 2,
    },
  ],
};
