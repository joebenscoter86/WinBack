import { ReasonCodePromptTemplate } from "../types";

export const visa104Template: ReasonCodePromptTemplate = {
  reason_code: "10.4",
  network: "visa",
  strategy:
    "Prove the legitimate cardholder authorized and participated in this transaction. Lead with authentication data (3DS, AVS, CVC) as these are verified by the payment network and carry the most weight. If prior undisputed transactions exist from the same customer, reference them to establish a pattern of legitimate use.",
  sections: [
    {
      name: "Transaction Authentication",
      bank_criterion: "Was the transaction properly authenticated?",
      instruction:
        "State the 3D Secure result (if used), AVS address and ZIP check results, and CVC verification result. If 3DS was authenticated, emphasize that liability shifted to the issuer. Present each check result as a factual statement.",
      auto_pull_fields: [
        "three_d_secure_result",
        "three_d_secure_version",
        "avs_address_check",
        "avs_zip_check",
        "cvc_check",
        "authorization_code",
        "network_status",
      ],
      evidence_keys: [
        "Bank verification (3D Secure) authentication proof",
        "Address verification result",
        "Security code (CVV) verification result",
        "Transaction authorization record",
      ],
      priority: 1,
    },
    {
      name: "Customer Identity Match",
      bank_criterion: "Does the purchaser match the cardholder?",
      instruction:
        "State the customer name, email, and billing address on the transaction. If the billing address matches AVS records, note this. Reference any account details showing the customer's identity.",
      auto_pull_fields: ["avs_address_check", "avs_zip_check"],
      evidence_keys: [
        "Customer account details (account creation date, purchase history, total prior orders)",
        "Bank statement name screenshot showing recognizable business name",
      ],
      priority: 1,
    },
    {
      name: "Delivery to Cardholder",
      bank_criterion: "Did the cardholder receive and use the purchase?",
      instruction:
        "For physical goods: state delivery confirmation, tracking number, and that the delivery address matches the billing address. For digital goods: reference access logs showing the customer used the product. Delivery to the verified billing address undermines the fraud claim.",
      auto_pull_fields: [],
      evidence_keys: [
        "Delivery confirmation to cardholder's verified billing address",
        "Access/activity logs proving the customer used the product (for digital goods and SaaS)",
      ],
      priority: 1,
    },
    {
      name: "Prior Transaction History",
      bank_criterion: "Is there a pattern of legitimate use?",
      instruction:
        "If prior undisputed transactions exist from this customer, state the count and date range. If refund data shows prior successful transactions, reference it. This establishes the cardholder has a history of legitimate purchases.",
      auto_pull_fields: ["refunds"],
      evidence_keys: [
        "Two prior undisputed transactions from the same cardholder (120-365 days before disputed transaction)",
        "IP address or device ID/fingerprint matching across all 3 transactions (disputed + 2 historical)",
        "Second matching data element across all 3 transactions (user account ID, shipping address, or device ID)",
      ],
      priority: 2,
    },
    {
      name: "Customer Communication",
      bank_criterion:
        "Did the cardholder interact with the merchant post-purchase?",
      instruction:
        "Reference any post-purchase communication: order confirmation emails opened, support tickets, or chat logs. Customer engagement after purchase undermines the claim that the transaction was unauthorized.",
      auto_pull_fields: [],
      evidence_keys: [
        "Communication with cardholder showing engagement (order confirmation emails opened/clicked, support contacts)",
      ],
      priority: 2,
    },
  ],
};
