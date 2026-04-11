# WIN-17: AI Prompt Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the AI prompt template system that generates evidence-based dispute response narratives via Claude API, with per-reason-code argumentation strategies and a prompt builder that assembles runtime data.

**Architecture:** Shared system prompt + 7 per-reason-code templates + prompt builder function. Templates define argumentation strategy and section ordering; the builder injects live Stripe data, merchant evidence, and playbook evaluation criteria at runtime. Existing `narrative_template` fields get upgraded as manual fallbacks.

**Tech Stack:** TypeScript, Vitest, existing playbook data model

---

## File Structure

| File | Purpose |
|------|---------|
| `backend/lib/prompts/types.ts` | Type definitions: `ReasonCodePromptTemplate`, `NarrativeOutput`, `PromptContext`, `PromptSection` |
| `backend/lib/prompts/system-prompt.ts` | Shared system prompt string constant |
| `backend/lib/prompts/templates/visa-10.4.ts` | Fraud template |
| `backend/lib/prompts/templates/visa-13.1.ts` | Not received template |
| `backend/lib/prompts/templates/visa-13.2.ts` | Cancelled recurring template |
| `backend/lib/prompts/templates/visa-13.3.ts` | Not as described template |
| `backend/lib/prompts/templates/visa-13.6.ts` | Credit not processed template |
| `backend/lib/prompts/templates/mastercard-4808.ts` | Authorization-related template |
| `backend/lib/prompts/templates/mastercard-4853.ts` | Not as described (MC) template |
| `backend/lib/prompts/templates/index.ts` | Template registry: lookup by network + reason_code |
| `backend/lib/prompts/build-prompt.ts` | Prompt assembly function |
| `backend/lib/prompts/index.ts` | Public API barrel export |
| `backend/lib/prompts/__tests__/build-prompt.test.ts` | Tests for prompt assembly |
| `backend/lib/playbooks/data/visa-10.4.ts` | Updated fallback `narrative_template` |
| `backend/lib/playbooks/data/visa-13.1.ts` | Updated fallback `narrative_template` |
| `backend/lib/playbooks/data/visa-13.2.ts` | Updated fallback `narrative_template` |
| `backend/lib/playbooks/data/visa-13.3.ts` | Updated fallback `narrative_template` |
| `backend/lib/playbooks/data/visa-13.6.ts` | Updated fallback `narrative_template` |
| `backend/lib/playbooks/data/mastercard-4808.ts` | Updated fallback `narrative_template` |
| `backend/lib/playbooks/data/mastercard-4853.ts` | Updated fallback `narrative_template` |

---

### Task 1: Types

**Files:**
- Create: `backend/lib/prompts/types.ts`

- [ ] **Step 1: Create the types file**

```typescript
// backend/lib/prompts/types.ts

export interface PromptSection {
  name: string;
  bank_criterion: string;
  instruction: string;
  auto_pull_fields: string[];
  evidence_keys: string[];
  priority: 1 | 2; // 1 = include if any evidence, 2 = include only if strong evidence
}

export interface ReasonCodePromptTemplate {
  reason_code: string;
  network: string;
  strategy: string;
  sections: PromptSection[];
}

export interface NarrativeOutput {
  narrative: string;
  annotations: Array<{
    section: string;
    reasoning: string;
  }>;
}

export interface EvidenceFileRef {
  checklist_item_key: string;
  file_name: string;
}

export interface PromptContext {
  // Dispute metadata
  reason_code: string;
  network: string;
  display_name: string;
  amount: number;
  currency: string;
  transaction_date?: number;
  customer_name?: string;
  customer_email?: string;
  card_brand?: string;
  card_last4?: string;
  billing_address?: string;
  charge_description?: string;

  // Auto-pulled Stripe data
  avs_address_check?: string;
  avs_zip_check?: string;
  cvc_check?: string;
  three_d_secure_result?: string;
  three_d_secure_version?: string;
  authorization_code?: string;
  network_status?: string;
  refunds?: Array<{ amount: number; created: number; status: string }>;

  // Merchant-provided data
  evidence_files: EvidenceFileRef[];
  checklist_notes: Record<string, string>;

  // Playbook context
  issuer_evaluation: string;

  // Optional: merchant feedback for regeneration (WIN-35)
  merchant_feedback?: string;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd backend && npx tsc --noEmit lib/prompts/types.ts`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add backend/lib/prompts/types.ts
git commit -m "feat(backend): add prompt template type definitions (WIN-17)"
```

---

### Task 2: System Prompt

**Files:**
- Create: `backend/lib/prompts/system-prompt.ts`

- [ ] **Step 1: Create the system prompt file**

```typescript
// backend/lib/prompts/system-prompt.ts

export const SYSTEM_PROMPT = `You are a dispute response writer for small merchants. You produce factual, evidence-based narratives that banks use to evaluate payment disputes.

RULES:
1. Facts, not feelings. No emotional appeals, no "valued customer" language, no adjectives that don't add evidence. Every sentence should state a fact or reference a document.
2. Only reference evidence that exists in the provided evidence list. If an evidence item is not present, do not mention it, do not imply it exists, and do not fabricate details (tracking numbers, dates, amounts, names).
3. Lead with the strongest evidence. Bank reviewers process hundreds of disputes -- put the most compelling proof first.
4. Keep it concise. Target 400-1,200 words. Shorter is better if the evidence is strong.
5. Use the auto-pulled Stripe transaction data (AVS, CVC, 3DS, authorization) as foundational facts. These are verified by the payment network.
6. Structure the narrative with clear sections. Each section should address a specific evaluation criterion the bank uses for this reason code.
7. No legal jargon. Write in plain professional English.
8. When merchant-uploaded evidence is missing for an important criterion, skip that section silently. Do not call out gaps.

OUTPUT FORMAT:
Return valid JSON with this structure:
{
  "narrative": "The full narrative text with **markdown bold** for section headers",
  "annotations": [
    {
      "section": "Section name matching a bolded header in the narrative",
      "reasoning": "Plain-language explanation of why this section matters and what bank criterion it addresses"
    }
  ]
}`;
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/prompts/system-prompt.ts
git commit -m "feat(backend): add shared system prompt for narrative generation (WIN-17)"
```

---

### Task 3: Visa 10.4 Prompt Template (Fraud)

**Files:**
- Create: `backend/lib/prompts/templates/visa-10.4.ts`

- [ ] **Step 1: Create the template file**

```typescript
// backend/lib/prompts/templates/visa-10.4.ts
import type { ReasonCodePromptTemplate } from "../types";

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
      bank_criterion:
        "Did the cardholder receive and use the purchase?",
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
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/prompts/templates/visa-10.4.ts
git commit -m "feat(backend): add Visa 10.4 fraud prompt template (WIN-17)"
```

---

### Task 4: Visa 13.1 Prompt Template (Not Received)

**Files:**
- Create: `backend/lib/prompts/templates/visa-13.1.ts`

- [ ] **Step 1: Create the template file**

```typescript
// backend/lib/prompts/templates/visa-13.1.ts
import type { ReasonCodePromptTemplate } from "../types";

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
        "Carrier tracking confirmation with delivery scan",
        "Signed delivery confirmation (for orders over $100)",
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
        "Delivery address verification (matches billing or shipping address on order)",
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
        "Access logs showing customer used the product/service (IP address, login timestamps, download confirmation)",
        "Email delivery confirmation (license key, download link sent to customer's email)",
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
        "Service completion documentation or proof of performance",
        "Appointment or scheduling records confirming service date",
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
        "Communication with customer about delivery (emails, chat logs)",
      ],
      priority: 2,
    },
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/prompts/templates/visa-13.1.ts
git commit -m "feat(backend): add Visa 13.1 not-received prompt template (WIN-17)"
```

---

### Task 5: Visa 13.2 Prompt Template (Cancelled Recurring)

**Files:**
- Create: `backend/lib/prompts/templates/visa-13.2.ts`

- [ ] **Step 1: Create the template file**

```typescript
// backend/lib/prompts/templates/visa-13.2.ts
import type { ReasonCodePromptTemplate } from "../types";

export const visa132Template: ReasonCodePromptTemplate = {
  reason_code: "13.2",
  network: "visa",
  strategy:
    "Prove the subscription was still active when charged, or that cancellation was not properly completed per the terms the customer agreed to. If the customer continued using the service after the alleged cancellation, this undermines their claim.",
  sections: [
    {
      name: "Subscription Status",
      bank_criterion: "Was the subscription active when the charge was processed?",
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
      evidence_keys: [
        "Service usage logs after last billing cycle",
      ],
      priority: 1,
    },
    {
      name: "Customer Communication",
      bank_criterion: "Did the customer follow the cancellation process?",
      instruction:
        "Reference any correspondence about the subscription or cancellation. If the customer was informed of the billing terms and did not follow the cancellation process, state this factually.",
      auto_pull_fields: [],
      evidence_keys: [
        "Communication history with customer",
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
        "Subscription agreement / terms of service",
        "Refund confirmation (if already refunded)",
      ],
      priority: 2,
    },
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/prompts/templates/visa-13.2.ts
git commit -m "feat(backend): add Visa 13.2 cancelled-recurring prompt template (WIN-17)"
```

---

### Task 6: Visa 13.3 Prompt Template (Not as Described)

**Files:**
- Create: `backend/lib/prompts/templates/visa-13.3.ts`

- [ ] **Step 1: Create the template file**

```typescript
// backend/lib/prompts/templates/visa-13.3.ts
import type { ReasonCodePromptTemplate } from "../types";

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
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/prompts/templates/visa-13.3.ts
git commit -m "feat(backend): add Visa 13.3 not-as-described prompt template (WIN-17)"
```

---

### Task 7: Visa 13.6 Prompt Template (Credit Not Processed)

**Files:**
- Create: `backend/lib/prompts/templates/visa-13.6.ts`

- [ ] **Step 1: Create the template file**

```typescript
// backend/lib/prompts/templates/visa-13.6.ts
import type { ReasonCodePromptTemplate } from "../types";

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
        "Refund confirmation / transaction record",
        "Refund amount and date matching the dispute",
        "Processor confirmation of the credit posting",
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
        "Return/refund policy as displayed at checkout",
        "Cancellation policy disclosure (if the missing credit relates to a cancelled subscription)",
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
        "Return condition documentation (photos or inspection records)",
        "Evidence the item was not returned",
        "Customer communication denying the return",
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
        "Written communication about the return or refund",
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
        "Order confirmation showing original terms",
      ],
      priority: 2,
    },
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/prompts/templates/visa-13.6.ts
git commit -m "feat(backend): add Visa 13.6 credit-not-processed prompt template (WIN-17)"
```

---

### Task 8: Mastercard 4808 Prompt Template (Authorization-Related)

**Files:**
- Create: `backend/lib/prompts/templates/mastercard-4808.ts`

- [ ] **Step 1: Create the template file**

```typescript
// backend/lib/prompts/templates/mastercard-4808.ts
import type { ReasonCodePromptTemplate } from "../types";

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
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/prompts/templates/mastercard-4808.ts
git commit -m "feat(backend): add Mastercard 4808 authorization prompt template (WIN-17)"
```

---

### Task 9: Mastercard 4853 Prompt Template (Not as Described MC)

**Files:**
- Create: `backend/lib/prompts/templates/mastercard-4853.ts`

- [ ] **Step 1: Create the template file**

```typescript
// backend/lib/prompts/templates/mastercard-4853.ts
import type { ReasonCodePromptTemplate } from "../types";

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
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/prompts/templates/mastercard-4853.ts
git commit -m "feat(backend): add Mastercard 4853 not-as-described prompt template (WIN-17)"
```

---

### Task 10: Template Registry

**Files:**
- Create: `backend/lib/prompts/templates/index.ts`

- [ ] **Step 1: Create the registry file**

```typescript
// backend/lib/prompts/templates/index.ts
import type { ReasonCodePromptTemplate } from "../types";
import { visa104Template } from "./visa-10.4";
import { visa131Template } from "./visa-13.1";
import { visa132Template } from "./visa-13.2";
import { visa133Template } from "./visa-13.3";
import { visa136Template } from "./visa-13.6";
import { mastercard4808Template } from "./mastercard-4808";
import { mastercard4853Template } from "./mastercard-4853";

const TEMPLATES: ReasonCodePromptTemplate[] = [
  visa104Template,
  visa131Template,
  visa132Template,
  visa133Template,
  visa136Template,
  mastercard4808Template,
  mastercard4853Template,
];

const templateMap = new Map<string, ReasonCodePromptTemplate>(
  TEMPLATES.map((t) => [`${t.network}:${t.reason_code}`, t])
);

export function getPromptTemplate(
  network: string,
  reasonCode: string
): ReasonCodePromptTemplate | undefined {
  return templateMap.get(`${network}:${reasonCode}`);
}

export { TEMPLATES };
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd backend && npx tsc --noEmit lib/prompts/templates/index.ts`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add backend/lib/prompts/templates/index.ts
git commit -m "feat(backend): add prompt template registry with lookup (WIN-17)"
```

---

### Task 11: Prompt Builder -- Tests First

**Files:**
- Create: `backend/lib/prompts/__tests__/build-prompt.test.ts`

- [ ] **Step 1: Write the test file**

```typescript
// backend/lib/prompts/__tests__/build-prompt.test.ts
import { describe, it, expect } from "vitest";
import { buildPrompt } from "../build-prompt";
import type { PromptContext } from "../types";
import { SYSTEM_PROMPT } from "../system-prompt";

function makeContext(overrides: Partial<PromptContext> = {}): PromptContext {
  return {
    reason_code: "13.1",
    network: "visa",
    display_name: "Merchandise / Services Not Received",
    amount: 12750,
    currency: "usd",
    transaction_date: 1710460800, // 2024-03-15
    customer_name: "Jane Smith",
    customer_email: "jane@example.com",
    card_brand: "visa",
    card_last4: "4242",
    billing_address: "123 Main St, Springfield, IL 62704, US",
    charge_description: "Order #1234",
    avs_address_check: "pass",
    avs_zip_check: "pass",
    cvc_check: "pass",
    network_status: "approved_by_network_rules",
    evidence_files: [
      {
        checklist_item_key: "Carrier tracking confirmation with delivery scan",
        file_name: "tracking-screenshot.pdf",
      },
    ],
    checklist_notes: {
      "Carrier tracking confirmation with delivery scan":
        "FedEx tracking 7891234, delivered Mar 18",
    },
    issuer_evaluation: "The bank checks for carrier confirmation of delivery.",
    ...overrides,
  };
}

describe("buildPrompt", () => {
  it("returns system and user messages", () => {
    const result = buildPrompt(makeContext());
    expect(result.system).toBe(SYSTEM_PROMPT);
    expect(result.user).toBeTruthy();
    expect(typeof result.user).toBe("string");
  });

  it("includes dispute context in user message", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("visa 13.1");
    expect(result.user).toContain("Merchandise / Services Not Received");
    expect(result.user).toContain("$127.50");
    expect(result.user).toContain("Jane Smith");
    expect(result.user).toContain("jane@example.com");
    expect(result.user).toContain("4242");
  });

  it("includes auto-pulled Stripe data", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("AVS address check: pass");
    expect(result.user).toContain("AVS zip check: pass");
    expect(result.user).toContain("CVC check: pass");
  });

  it("includes issuer evaluation criteria", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain(
      "The bank checks for carrier confirmation of delivery."
    );
  });

  it("includes argumentation strategy from template", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("Prove delivery was completed");
  });

  it("includes evidence files", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("tracking-screenshot.pdf");
    expect(result.user).toContain(
      "Carrier tracking confirmation with delivery scan"
    );
  });

  it("includes checklist notes", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("FedEx tracking 7891234, delivered Mar 18");
  });

  it("formats amount correctly for different currencies", () => {
    const result = buildPrompt(makeContext({ amount: 5000, currency: "eur" }));
    expect(result.user).toContain("EUR 50.00");
  });

  it("handles missing optional fields gracefully", () => {
    const result = buildPrompt(
      makeContext({
        customer_name: undefined,
        customer_email: undefined,
        card_brand: undefined,
        card_last4: undefined,
        transaction_date: undefined,
        avs_address_check: undefined,
        cvc_check: undefined,
        three_d_secure_result: undefined,
        authorization_code: undefined,
        evidence_files: [],
        checklist_notes: {},
      })
    );
    expect(result.user).toContain("not available");
    expect(result.user).not.toContain("undefined");
  });

  it("returns null user message for unknown reason code", () => {
    const result = buildPrompt(
      makeContext({ network: "visa", reason_code: "99.9" })
    );
    expect(result.system).toBe(SYSTEM_PROMPT);
    expect(result.user).toBeNull();
  });

  it("includes refunds summary when refunds exist", () => {
    const result = buildPrompt(
      makeContext({
        reason_code: "13.6",
        display_name: "Credit Not Processed",
        refunds: [
          { amount: 5000, created: 1710460800, status: "succeeded" },
        ],
      })
    );
    expect(result.user).toContain("$50.00");
    expect(result.user).toContain("succeeded");
  });

  it("includes merchant feedback when present", () => {
    const result = buildPrompt(
      makeContext({
        merchant_feedback: "Too formal, make it more concise",
      })
    );
    expect(result.user).toContain("Too formal, make it more concise");
    expect(result.user).toContain("MERCHANT FEEDBACK");
  });

  it("omits merchant feedback section when not present", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).not.toContain("MERCHANT FEEDBACK");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd backend && npx vitest run lib/prompts/__tests__/build-prompt.test.ts`
Expected: FAIL -- `Cannot find module '../build-prompt'`

- [ ] **Step 3: Commit the failing tests**

```bash
git add backend/lib/prompts/__tests__/build-prompt.test.ts
git commit -m "test(backend): add prompt builder tests (WIN-17)"
```

---

### Task 12: Prompt Builder -- Implementation

**Files:**
- Create: `backend/lib/prompts/build-prompt.ts`

- [ ] **Step 1: Write the prompt builder**

```typescript
// backend/lib/prompts/build-prompt.ts
import { SYSTEM_PROMPT } from "./system-prompt";
import { getPromptTemplate } from "./templates";
import type { PromptContext, PromptSection } from "./types";

export interface PromptResult {
  system: string;
  user: string | null;
}

function formatAmount(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(2);
  const upper = currency.toUpperCase();
  if (upper === "USD") return `$${amount}`;
  return `${upper} ${amount}`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString().split("T")[0];
}

function formatStripeField(value: string | undefined): string {
  if (!value) return "not available";
  return value;
}

function formatRefunds(
  refunds: Array<{ amount: number; created: number; status: string }> | undefined
): string {
  if (!refunds || refunds.length === 0) return "none";
  return refunds
    .map(
      (r) =>
        `${formatAmount(r.amount, "usd")} on ${formatDate(r.created)} (${r.status})`
    )
    .join("; ");
}

function buildSectionsBlock(
  sections: PromptSection[],
  evidenceFiles: Array<{ checklist_item_key: string; file_name: string }>
): string {
  const uploadedKeys = new Set(evidenceFiles.map((f) => f.checklist_item_key));

  return sections
    .map((section, i) => {
      const availableEvidence = section.evidence_keys.filter((key) =>
        uploadedKeys.has(key)
      );
      const hasAutoPull = section.auto_pull_fields.length > 0;
      const evidenceList =
        availableEvidence.length > 0
          ? availableEvidence.join(", ")
          : hasAutoPull
            ? "auto-pulled Stripe data"
            : "none";

      return `${i + 1}. ${section.name} -- ${section.instruction} -- Evidence available: ${evidenceList}`;
    })
    .join("\n");
}

export function buildPrompt(context: PromptContext): PromptResult {
  const template = getPromptTemplate(context.network, context.reason_code);

  if (!template) {
    return { system: SYSTEM_PROMPT, user: null };
  }

  const evidenceFilesList = context.evidence_files
    .map((f) => `- "${f.checklist_item_key}": ${f.file_name}`)
    .join("\n");

  const checklistNotesList = Object.entries(context.checklist_notes)
    .map(([key, note]) => `- "${key}": "${note}"`)
    .join("\n");

  const threeDSecure = context.three_d_secure_result
    ? `${context.three_d_secure_result}${context.three_d_secure_version ? ` (version ${context.three_d_secure_version})` : ""}`
    : "not available";

  const feedbackBlock = context.merchant_feedback
    ? `\nMERCHANT FEEDBACK ON PREVIOUS GENERATION:\n${context.merchant_feedback}\nIncorporate this feedback into the new narrative.\n`
    : "";

  const user = `DISPUTE CONTEXT:
- Reason code: ${context.network} ${context.reason_code} (${context.display_name})
- Amount: ${formatAmount(context.amount, context.currency)}
- Transaction date: ${context.transaction_date ? formatDate(context.transaction_date) : "not available"}
- Customer: ${context.customer_name ?? "not available"} (${context.customer_email ?? "not available"})
- Card: ${context.card_brand ?? "not available"} ending ${context.card_last4 ?? "not available"}
- Billing address: ${context.billing_address ?? "not available"}
- Charge description: ${context.charge_description ?? "not available"}

STRIPE TRANSACTION DATA (verified by payment network):
- AVS address check: ${formatStripeField(context.avs_address_check)}
- AVS zip check: ${formatStripeField(context.avs_zip_check)}
- CVC check: ${formatStripeField(context.cvc_check)}
- Network status: ${formatStripeField(context.network_status)}
- Authorization code: ${formatStripeField(context.authorization_code)}
- 3D Secure: ${threeDSecure}
- Refunds: ${formatRefunds(context.refunds)}

BANK EVALUATION CRITERIA:
${context.issuer_evaluation}

ARGUMENTATION STRATEGY:
${template.strategy}

NARRATIVE SECTIONS (in priority order):
${buildSectionsBlock(template.sections, context.evidence_files)}

MERCHANT-UPLOADED EVIDENCE:
${evidenceFilesList || "(no files uploaded)"}

CHECKLIST NOTES (merchant's own words):
${checklistNotesList || "(no notes provided)"}
${feedbackBlock}
Generate the narrative following the system instructions.`;

  return { system: SYSTEM_PROMPT, user };
}
```

- [ ] **Step 2: Run the tests**

Run: `cd backend && npx vitest run lib/prompts/__tests__/build-prompt.test.ts`
Expected: all tests PASS

- [ ] **Step 3: Commit**

```bash
git add backend/lib/prompts/build-prompt.ts
git commit -m "feat(backend): implement prompt builder for narrative generation (WIN-17)"
```

---

### Task 13: Barrel Export

**Files:**
- Create: `backend/lib/prompts/index.ts`

- [ ] **Step 1: Create the barrel export**

```typescript
// backend/lib/prompts/index.ts
export { buildPrompt } from "./build-prompt";
export type { PromptResult } from "./build-prompt";
export { SYSTEM_PROMPT } from "./system-prompt";
export { getPromptTemplate, TEMPLATES } from "./templates";
export type {
  ReasonCodePromptTemplate,
  NarrativeOutput,
  PromptContext,
  PromptSection,
  EvidenceFileRef,
} from "./types";
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd backend && npx tsc --noEmit lib/prompts/index.ts`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add backend/lib/prompts/index.ts
git commit -m "feat(backend): add prompts barrel export (WIN-17)"
```

---

### Task 14: Update Visa 10.4 Fallback Template

**Files:**
- Modify: `backend/lib/playbooks/data/visa-10.4.ts:269-304` (the `narrative_template` field)

- [ ] **Step 1: Replace the narrative_template value**

Replace the existing `narrative_template` in `backend/lib/playbooks/data/visa-10.4.ts` (lines 269-304) with:

```typescript
  narrative_template: `**Transaction Authentication**
[The bank's first question: was this transaction properly verified? These results are auto-filled from Stripe.]
3D Secure result: {{three_d_secure_result}} (auto-filled from Stripe)
AVS address check: {{avs_address_check}} (auto-filled from Stripe)
AVS zip check: {{avs_zip_check}} (auto-filled from Stripe)
CVC check: {{cvc_check}} (auto-filled from Stripe)
Authorization code: {{authorization_code}} (auto-filled from Stripe)

**Customer Identity Match**
[The bank checks: does the person who made this purchase match the cardholder?]
Customer name: [the name on the order]
Customer email: [the email used at checkout]
Billing address on file: [from your order details]

**Delivery to Cardholder**
[For physical goods: delivery to the billing address undermines a fraud claim. For digital goods: access logs show the customer used the product.]
Tracking number: [from your shipping carrier -- e.g., 1Z999AA10123456784]
Carrier: [e.g., UPS, FedEx, USPS]
Delivery date: [date carrier shows "delivered"]
Delivery address matches billing address: [Yes/No]
[For digital goods instead: describe access logs -- IP address, timestamps, what was accessed]

**Prior Transaction History**
[If this customer has made previous undisputed purchases from your store, list them here. This is especially powerful for Visa's purchase history proof rule.]
Prior purchase 1: [date] -- [amount] -- [status: no dispute]
Prior purchase 2: [date] -- [amount] -- [status: no dispute]
Matching data: [what matches across transactions -- IP address, device, shipping address, account ID]

**Customer Communication**
[Any post-purchase engagement from the customer weakens the fraud claim.]
[Describe: order confirmation emails opened, support tickets filed, chat messages, etc.]

Based on the authentication data and evidence above, this transaction was authorized by the cardholder. We respectfully request this dispute be resolved in our favor.`,
```

- [ ] **Step 2: Run existing playbook tests to ensure no regressions**

Run: `cd backend && npx vitest run lib/playbooks`
Expected: all tests PASS

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/data/visa-10.4.ts
git commit -m "feat(backend): upgrade Visa 10.4 fallback narrative template (WIN-17)"
```

---

### Task 15: Update Visa 13.1 Fallback Template

**Files:**
- Modify: `backend/lib/playbooks/data/visa-13.1.ts:240-258` (the `narrative_template` field)

- [ ] **Step 1: Replace the narrative_template value**

Replace the existing `narrative_template` in `backend/lib/playbooks/data/visa-13.1.ts` (lines 240-258) with:

```typescript
  narrative_template: `**Delivery Confirmation**
[The bank needs carrier proof that the order was delivered. This is the single most important piece of evidence for this dispute type.]
Tracking number: [from your carrier -- e.g., 1Z999AA10123456784]
Carrier: [e.g., UPS, FedEx, USPS]
Delivery date: [the date carrier shows "delivered"]
Delivery status: [e.g., "Delivered, left at front door"]
[For orders over $100: Signed by: [name from signature confirmation]]

**Address Verification**
[The bank checks that you shipped to the address the customer gave you.]
Shipping address on order: [from your order details page]
Delivery address confirmed by carrier: [from tracking page]
AVS result: {{avs_address_check}} (auto-filled from Stripe)
ZIP match: {{avs_zip_check}} (auto-filled from Stripe)

**Digital Access Proof**
[For digital goods only -- skip this section for physical goods.]
[The bank needs proof the customer accessed or downloaded the product.]
Access log timestamps: [dates and times the customer logged in or downloaded]
IP address: [the IP address used to access the product]
What was accessed: [describe what the customer did -- downloaded files, used features, etc.]
Email delivery confirmation: [date the license key or download link was sent]

**Service Completion**
[For services only -- skip this section for physical goods.]
Service performed on: [date]
Service documentation: [describe what was delivered -- reports, work product, etc.]

**Customer Communication**
[Any communication where the customer acknowledged receiving the item is especially valuable.]
[Describe: delivery notification emails sent, tracking shared, customer responses, etc.]

Based on the delivery confirmation and evidence above, the merchandise/service was delivered as ordered. We respectfully request this dispute be resolved in our favor.`,
```

- [ ] **Step 2: Run playbook tests**

Run: `cd backend && npx vitest run lib/playbooks`
Expected: all tests PASS

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/data/visa-13.1.ts
git commit -m "feat(backend): upgrade Visa 13.1 fallback narrative template (WIN-17)"
```

---

### Task 16: Update Visa 13.2 Fallback Template

**Files:**
- Modify: `backend/lib/playbooks/data/visa-13.2.ts:242-265` (the `narrative_template` field)

- [ ] **Step 1: Replace the narrative_template value**

Replace the existing `narrative_template` in `backend/lib/playbooks/data/visa-13.2.ts` with:

```typescript
  narrative_template: `**Subscription Status**
[The bank's main question: was the subscription active when this charge was processed?]
Service/product: [name of your subscription product]
Subscription start date: [when the customer signed up]
Billing cycle: [monthly/annual/etc.]
Disputed charge date: [date of the charge]
Billing period covered: [start date] to [end date]
Subscription status at time of charge: [Active/Cancelled -- if active, say so clearly]

**Cancellation Policy**
[The bank checks whether the customer agreed to your cancellation terms and followed the process.]
Cancellation policy: [your policy -- e.g., "Cancel anytime, effective at end of current billing period"]
How policy was shown: [e.g., "Displayed at checkout and in Terms of Service accepted on [date]"]
Cancellation request received: [date, or "No cancellation request on file"]
[If cancellation was received: Cancellation effective date: [date per your terms]]

**Post-Cancellation Usage**
[If the customer continued using the service after they say they cancelled, this undermines their claim.]
[Describe: login timestamps, features used, content accessed after the alleged cancellation date]

**Customer Communication**
[Any correspondence about the subscription, billing, or cancellation.]
[Describe: emails exchanged, support tickets, cancellation confirmations sent]

**Refund Policy**
[Reference your billing terms. If a refund was already issued, state the details.]
Refund issued: {{refunds}} (auto-filled from Stripe if applicable)
[If no refund: explain why per your terms]

Based on the evidence above, the subscription was active and the charge was valid. We respectfully request this dispute be resolved in our favor.`,
```

- [ ] **Step 2: Run playbook tests**

Run: `cd backend && npx vitest run lib/playbooks`
Expected: all tests PASS

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/data/visa-13.2.ts
git commit -m "feat(backend): upgrade Visa 13.2 fallback narrative template (WIN-17)"
```

---

### Task 17: Update Visa 13.3 Fallback Template

**Files:**
- Modify: `backend/lib/playbooks/data/visa-13.3.ts:255-279` (the `narrative_template` field)

- [ ] **Step 1: Replace the narrative_template value**

Replace the existing `narrative_template` in `backend/lib/playbooks/data/visa-13.3.ts` with:

```typescript
  narrative_template: `**Product Description Accuracy**
[The bank checks: did the product match what was advertised at the time of purchase?]
Product listed as: [exact description from your product page or listing]
What was delivered: [describe what the customer actually received]
[If they match: "The product delivered matches the description provided at the time of purchase."]

**Customer Communication**
[The bank checks whether you tried to resolve the issue. Visa requires the cardholder to attempt merchant resolution before filing.]
Customer contacted us: [Yes on [date] / No -- no pre-dispute contact received]
Issue raised: [what the customer complained about]
Resolution offered: [what you offered -- replacement, return, partial refund, etc.]
Outcome: [what happened -- customer accepted/declined/did not respond]
[If no contact: "The cardholder did not contact us before filing this dispute. Visa requires the cardholder to attempt resolution with the merchant first."]

**Refund/Return Policy**
[The bank checks whether the customer had a path to resolve this without a dispute.]
Return policy: [your policy -- e.g., "30-day returns for any reason"]
How displayed: [e.g., "Shown at checkout and included in order confirmation email"]
Return attempted: [Yes/No]
[If refund denied: explain why -- e.g., "Return window expired" or "Item returned in used condition"]

**Shipping and Condition**
[For physical goods: delivery confirmation and condition at time of shipment.]
Tracking number: [from your carrier]
Delivery confirmed: [date]
Pre-shipment condition: [describe, reference photos if uploaded]

**Service Delivery**
[For services only -- skip for physical goods.]
Service agreement: [describe the scope of work]
Service delivered: [date and what was delivered]
Client sign-off: [if available -- date and form of acceptance]

Based on the evidence above, the product/service matched its description. We respectfully request this dispute be resolved in our favor.`,
```

- [ ] **Step 2: Run playbook tests**

Run: `cd backend && npx vitest run lib/playbooks`
Expected: all tests PASS

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/data/visa-13.3.ts
git commit -m "feat(backend): upgrade Visa 13.3 fallback narrative template (WIN-17)"
```

---

### Task 18: Update Visa 13.6 Fallback Template

**Files:**
- Modify: `backend/lib/playbooks/data/visa-13.6.ts:225-249` (the `narrative_template` field)

- [ ] **Step 1: Replace the narrative_template value**

Replace the existing `narrative_template` in `backend/lib/playbooks/data/visa-13.6.ts` with:

```typescript
  narrative_template: `**Refund Status**
[If you already issued a refund, lead with this -- it's the strongest and simplest defense.]
Refund issued: {{refunds}} (auto-filled from Stripe if applicable)
Refund amount: [amount refunded]
Refund date: [date processed]
[Note: Refunds may take 5-10 business days to appear on the cardholder's statement.]
[If no refund was issued, skip this section and explain why below.]

**Refund/Return Policy**
[The bank checks whether the customer agreed to your refund terms.]
Return/refund policy: [your policy -- e.g., "Full refund within 30 days if item returned in original condition"]
How displayed: [e.g., "Shown at checkout, included in order confirmation email"]

**Refund Denial Reason**
[If you did not issue a refund, explain why.]
Reason: [e.g., "Return not received", "Return window expired", "Item returned in damaged condition"]
Documentation: [reference inspection photos, return tracking, or policy terms]

**Customer Communication**
[Any correspondence about the refund request.]
Customer requested refund on: [date]
Your response: [what you communicated and when]
Outcome: [what happened]

**Transaction Context**
[Brief context about the original purchase.]
Order date: [date]
Items/services: [description]
Order total: [amount]

Based on the evidence above, [the refund was already processed / the refund is not owed under our stated policy]. We respectfully request this dispute be resolved in our favor.`,
```

- [ ] **Step 2: Run playbook tests**

Run: `cd backend && npx vitest run lib/playbooks`
Expected: all tests PASS

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/data/visa-13.6.ts
git commit -m "feat(backend): upgrade Visa 13.6 fallback narrative template (WIN-17)"
```

---

### Task 19: Update Mastercard 4808 Fallback Template

**Files:**
- Modify: `backend/lib/playbooks/data/mastercard-4808.ts:224-252` (the `narrative_template` field)

- [ ] **Step 1: Replace the narrative_template value**

Replace the existing `narrative_template` in `backend/lib/playbooks/data/mastercard-4808.ts` with:

```typescript
  narrative_template: `**Authorization Confirmation**
[The bank's main question: was a valid authorization obtained for this transaction?]
Authorization code: {{authorization_code}} (auto-filled from Stripe)
Network status: {{network_status}} (auto-filled from Stripe)
Transaction date: [date]
Amount authorized: [amount]
Amount charged: [amount]

**Transaction Authentication**
[Security verification results from the payment network.]
AVS address check: {{avs_address_check}} (auto-filled from Stripe)
AVS zip check: {{avs_zip_check}} (auto-filled from Stripe)
CVC check: {{cvc_check}} (auto-filled from Stripe)
3D Secure: {{three_d_secure_result}} (auto-filled from Stripe)

**Transaction Details**
[The bank checks that the final charge matches what was authorized.]
Transaction date: [date]
Authorized amount: [amount]
Final charge amount: [amount]
[If amounts match: "The final charge matches the authorized amount."]
[If amounts differ due to currency conversion: "The difference of [amount] ([X]%) is within Mastercard's 10% currency conversion allowance."]
[If tip adjustment: "The tip of [amount] was added by the customer. This is within Mastercard's 20% restaurant tip allowance."]

**Customer Identity**
[Ties the transaction to the cardholder.]
Customer name: [name on the order]
Customer email: [email used at checkout]
Billing address: [address on file]

**Supporting Documentation**
[Any additional records that corroborate the authorization.]
[Describe: receipts, order confirmations, processor transaction logs]

The transaction was properly authorized and the final charge matches the authorization. We respectfully request this dispute be resolved in our favor.`,
```

- [ ] **Step 2: Run playbook tests**

Run: `cd backend && npx vitest run lib/playbooks`
Expected: all tests PASS

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/data/mastercard-4808.ts
git commit -m "feat(backend): upgrade Mastercard 4808 fallback narrative template (WIN-17)"
```

---

### Task 20: Update Mastercard 4853 Fallback Template

**Files:**
- Modify: `backend/lib/playbooks/data/mastercard-4853.ts:275-309` (the `narrative_template` field)

- [ ] **Step 1: Replace the narrative_template value**

Replace the existing `narrative_template` in `backend/lib/playbooks/data/mastercard-4853.ts` with:

```typescript
  narrative_template: `**Product/Service Description**
[The bank checks: did the merchandise match the description at time of purchase?]
Product listed as: [exact description from your product page, catalog, or order confirmation]
What was delivered: [describe what the customer actually received]
Supporting documentation: [reference product listing screenshots, photos of actual item, quality control records]

**Customer Communication**
[Mastercard requires the cardholder to attempt merchant resolution before filing. If they didn't, say so.]
Customer contacted us: [Yes on [date] / No -- no pre-dispute contact received]
[If yes: describe the issue raised, your response, and the outcome]
[If no: "The cardholder did not contact us before filing this dispute. Mastercard requires the cardholder to attempt resolution with the merchant first. This is a procedural defect in the filing."]

**Return/Refund Policy**
[The bank checks whether the customer had a path to resolve this.]
Return policy: [your policy]
How displayed: [e.g., "Shown at checkout, included in order confirmation, accepted in Terms of Service"]
Return attempted: [Yes/No]
[If refund denied: explain why]

**Delivery and Condition**
[Delivery confirmation and condition at time of shipment.]
Tracking number: [from your carrier]
Delivery confirmed: [date]
Pre-shipment photos: [describe if available -- timestamped packing photos, QC records]

**Service Delivery**
[For services only -- skip for physical goods.]
Scope of work: [describe the agreed service]
Service delivered: [date and what was delivered]
Milestone sign-offs: [if available -- dates and form of client acceptance]

Based on the evidence above, the product/service matched its description. We respectfully request this dispute be resolved in our favor.`,
```

- [ ] **Step 2: Run playbook tests**

Run: `cd backend && npx vitest run lib/playbooks`
Expected: all tests PASS

- [ ] **Step 3: Commit**

```bash
git add backend/lib/playbooks/data/mastercard-4853.ts
git commit -m "feat(backend): upgrade Mastercard 4853 fallback narrative template (WIN-17)"
```

---

### Task 21: Final Verification

**Files:**
- All files from Tasks 1-20

- [ ] **Step 1: Run the full test suite**

Run: `cd backend && npx vitest run`
Expected: all tests PASS, no regressions

- [ ] **Step 2: Run TypeScript type checking**

Run: `cd backend && npx tsc --noEmit`
Expected: no type errors

- [ ] **Step 3: Verify template registry covers all 7 playbooks**

Run: `cd backend && npx tsx -e "import { TEMPLATES } from './lib/prompts'; console.log(TEMPLATES.map(t => t.network + ':' + t.reason_code))"`
Expected: `["visa:10.4", "visa:13.1", "visa:13.2", "visa:13.3", "visa:13.6", "mastercard:4808", "mastercard:4853"]`

- [ ] **Step 4: Verify prompt builder works end-to-end**

Run: `cd backend && npx tsx -e "
import { buildPrompt } from './lib/prompts';
const result = buildPrompt({
  reason_code: '13.1', network: 'visa', display_name: 'Not Received',
  amount: 5000, currency: 'usd', customer_name: 'Test',
  customer_email: 'test@test.com', avs_address_check: 'pass',
  cvc_check: 'pass', evidence_files: [], checklist_notes: {},
  issuer_evaluation: 'Bank checks delivery.'
});
console.log('System prompt length:', result.system.length);
console.log('User prompt length:', result.user?.length);
console.log('Has strategy:', result.user?.includes('Prove delivery'));
"`
Expected: system prompt ~900 chars, user prompt ~1000+ chars, strategy present

- [ ] **Step 5: Commit any remaining changes**

If any files were missed, add and commit them now.
