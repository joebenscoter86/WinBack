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
        "Original product/service description (website listing, catalog page, or order confirmation)",
        "Proof the item or service matched the description (photos of actual item shipped, quality control records, inspection documentation)",
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
        "Customer communication logs (emails, chat transcripts, support tickets)",
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
        "Return/refund policy as displayed at checkout",
        "Refund refusal explanation (if you denied a return or refund request)",
        "Terms of service accepted at checkout",
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
        "Proof of delivery (tracking confirmation, signature)",
        "Photos or video of item before shipment (timestamped packing photos showing correct item in good condition)",
        "Quality control or inspection records (batch inspection reports, QC checklists)",
      ],
      priority: 2,
    },
    {
      name: "Service Delivery",
      bank_criterion: "Was the service performed as agreed?",
      instruction:
        "For services only. Reference the scope of work, proof of delivery, and any milestone sign-offs.",
      auto_pull_fields: [],
      evidence_keys: [
        "Signed scope of work or service agreement",
        "Proof of service delivery (reports, deliverables, login/access logs)",
        "Milestone sign-offs or approval emails from the customer",
      ],
      priority: 1,
    },
  ],
};
