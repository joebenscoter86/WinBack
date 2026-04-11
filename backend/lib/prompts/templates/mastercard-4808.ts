import { ReasonCodePromptTemplate } from "../types";

export const mastercard4808Template: ReasonCodePromptTemplate = {
  reason_code: "4808",
  network: "mastercard",
  strategy:
    "Prove the transaction was properly authorized by the payment network. Authorization code and network-approved status from Stripe are the strongest evidence. If the charged amount differs from the authorized amount, explain why (currency conversion, tip adjustment).",
  sections: [
    {
      name: "Authorization Confirmation",
      bank_criterion: "Was a valid authorization obtained?",
      instruction:
        "State the authorization code and network status from Stripe. These are verified by the payment network. If the network status is 'approved_by_network_rules', state this as confirmation that the authorization was valid.",
      auto_pull_fields: ["authorization_code", "network_status"],
      evidence_keys: [
        "Original authorization record with transaction approval number and timestamp",
        "Transaction approval number",
        "Final charge record tied to the authorization",
      ],
      priority: 1,
    },
    {
      name: "Transaction Authentication",
      bank_criterion: "Were security checks passed?",
      instruction:
        "State AVS, CVC, and 3DS results. Each passing check confirms the transaction was properly verified.",
      auto_pull_fields: [
        "avs_address_check",
        "avs_zip_check",
        "cvc_check",
        "three_d_secure_result",
        "three_d_secure_version",
      ],
      evidence_keys: [],
      priority: 1,
    },
    {
      name: "Transaction Details",
      bank_criterion: "Does the transaction match what was authorized?",
      instruction:
        "State the transaction date, amount, and description. If the authorized and charged amounts match, state this. If they differ, explain why (currency conversion within Mastercard's 10% allowance, tip adjustment within 20% for restaurants).",
      auto_pull_fields: [],
      evidence_keys: [
        "Currency conversion documentation",
        "Tip or gratuity authorization documentation (for restaurant and service merchants)",
        "Order details matching the authorized amount",
      ],
      priority: 1,
    },
    {
      name: "Customer Identity",
      bank_criterion: "Does the transaction tie to the cardholder?",
      instruction:
        "State the customer name, email, and billing address associated with the transaction.",
      auto_pull_fields: ["avs_address_check"],
      evidence_keys: [],
      priority: 2,
    },
    {
      name: "Supporting Documentation",
      bank_criterion: "Is there a paper trail?",
      instruction:
        "Reference any receipts, order confirmations, or processor transaction logs that corroborate the authorization.",
      auto_pull_fields: [],
      evidence_keys: [
        "Payment processor transaction log showing the full record from approval to final charge",
      ],
      priority: 2,
    },
  ],
};
