# WIN-17: AI Prompt Templates Per Reason Code

## Problem

WinBack needs to generate compelling, evidence-based dispute response narratives using Claude API. Each of the 7 MVP reason codes requires a different argumentation strategy because banks evaluate them against different criteria. The current `narrative_template` fields are static mad-libs that don't leverage AI at all.

## Approach

**Shared system prompt + per-reason-code user prompt templates, with dynamic playbook injection.**

One system prompt establishes the AI's role, tone, output schema, and anti-hallucination rules. Seven per-reason-code templates define the argumentation strategy and section ordering. At runtime, the prompt builder injects live data (Stripe transaction fields, merchant evidence, playbook evaluation criteria) into the template before sending to Claude.

The existing `narrative_template` field stays as a beefed-up static fallback for when the Claude API is unavailable.

## Decisions

- **All 7 playbooks** get prompt templates (Visa 10.4, 13.1, 13.2, 13.3, 13.6; Mastercard 4808, 4853)
- **Static fallbacks coexist** with AI templates -- `narrative_template` stays as the manual-entry scaffold, upgraded to be genuinely usable
- **Structured output** -- Claude returns `{ narrative, annotations[] }` as JSON, not freeform text
- **Annotations are separate from narrative** -- frontend (WIN-19) renders them as expandable sections via Accordion, not inline clutter
- **Auto-pulled Stripe data is the foundation** -- narrative always has something to work with even if merchant uploads nothing
- **Tone: facts, not feelings** -- no emotional appeals, no filler adjectives, every sentence states a fact or references evidence
- **Target length: 400-1,200 words** -- bank reviewers process hundreds of disputes, shorter is better when evidence is strong

---

## 1. System Prompt

Shared across all reason codes. Establishes role, rules, and output format.

```
You are a dispute response writer for small merchants. You produce factual,
evidence-based narratives that banks use to evaluate payment disputes.

RULES:
1. Facts, not feelings. No emotional appeals, no "valued customer" language,
   no adjectives that don't add evidence. Every sentence should state a fact
   or reference a document.
2. Only reference evidence that exists in the provided evidence list. If an
   evidence item is not present, do not mention it, do not imply it exists,
   and do not fabricate details (tracking numbers, dates, amounts, names).
3. Lead with the strongest evidence. Bank reviewers process hundreds of
   disputes -- put the most compelling proof first.
4. Keep it concise. Target 400-1,200 words. Shorter is better if the
   evidence is strong.
5. Use the auto-pulled Stripe transaction data (AVS, CVC, 3DS, authorization)
   as foundational facts. These are verified by the payment network.
6. Structure the narrative with clear sections. Each section should address
   a specific evaluation criterion the bank uses for this reason code.
7. No legal jargon. Write in plain professional English.
8. When merchant-uploaded evidence is missing for an important criterion,
   skip that section silently. Do not call out gaps.

OUTPUT FORMAT:
Return valid JSON with this structure:
{
  "narrative": "The full narrative text with **markdown bold** for section headers",
  "annotations": [
    {
      "section": "Section name matching a bolded header in the narrative",
      "reasoning": "Plain-language explanation of why this section matters
                     and what bank criterion it addresses"
    }
  ]
}
```

## 2. Per-Reason-Code Template Structure

Each reason code gets a typed template object:

```typescript
interface ReasonCodePromptTemplate {
  reason_code: string;
  network: string;
  strategy: string;           // 2-3 sentence argumentation direction
  sections: Array<{
    name: string;              // e.g., "Delivery Confirmation"
    bank_criterion: string;    // what the issuer is evaluating
    instruction: string;       // what to write in this section
    auto_pull_fields: string[];// which WinBackDispute fields to use
    evidence_keys: string[];   // which checklist `item` strings to reference
                               // (matches EvidenceChecklistItem.item and
                               // evidence_files.checklist_item_key)
    priority: number;          // 1 = include if any evidence exists,
                               // 2 = include only if strong evidence
  }>;
}
```

## 3. Reason Code Strategies

### Visa 10.4 -- Fraud / Unauthorized Transaction

**Strategy:** Prove the legitimate cardholder authorized and participated in this transaction.

**Sections (priority order):**
1. **Transaction Authentication** -- AVS, CVC, 3DS results from auto-pull. Bank criterion: was the transaction properly authenticated?
2. **Customer Identity Match** -- name, email, billing address. Bank criterion: does the purchaser match the cardholder?
3. **Delivery to Cardholder's Address** -- (physical) shipping to billing address, or (digital) access logs. Bank criterion: did the cardholder receive and use the purchase?
4. **Prior Transaction History** -- if refunds array shows past successful orders from this customer. Bank criterion: is there a pattern of legitimate use?
5. **Customer Communication** -- emails, chat logs showing engagement. Bank criterion: did the cardholder interact with the merchant post-purchase?

### Visa 13.1 -- Merchandise/Services Not Received

**Strategy:** Prove delivery was completed to the correct address.

**Sections (priority order):**
1. **Delivery Confirmation** -- tracking number, carrier, delivery date, delivery status. Bank criterion: is there carrier confirmation of delivery?
2. **Address Verification** -- shipping address matches order + AVS result from auto-pull. Bank criterion: was it delivered to the correct address?
3. **Digital Access Proof** -- (digital goods only) access logs, download confirmation. Bank criterion: did the customer access the product?
4. **Service Completion** -- (services only) completion documentation. Bank criterion: was the service performed?
5. **Customer Communication** -- delivery notifications, tracking emails, any acknowledgment of receipt. Bank criterion: was the customer informed and did they respond?

### Visa 13.2 -- Cancelled Recurring Transaction

**Strategy:** Prove the subscription was still active when charged, or cancellation was not properly completed.

**Sections (priority order):**
1. **Subscription Status** -- billing history, active status at time of charge. Bank criterion: was the subscription active when the charge was processed?
2. **Cancellation Policy** -- policy text and how it was disclosed to customer. Bank criterion: did the customer agree to cancellation terms?
3. **Post-Cancellation Usage** -- access logs showing continued use after alleged cancellation. Bank criterion: did the customer continue using the service?
4. **Customer Communication** -- cancellation-related correspondence. Bank criterion: did the customer follow the cancellation process?
5. **Refund Policy** -- policy disclosure. Bank criterion: was the customer informed of billing terms?

### Visa 13.3 -- Not as Described / Defective

**Strategy:** Prove the product/service matched its description and was delivered in acceptable condition.

**Sections (priority order):**
1. **Product Description Accuracy** -- as-advertised description vs. what was delivered. Bank criterion: did the product match the description at time of purchase?
2. **Customer Communication** -- complaint handling, resolution offered. Bank criterion: did the merchant attempt to resolve the issue?
3. **Refund/Return Policy** -- policy and disclosure. Bank criterion: was the customer given a path to return/refund?
4. **Shipping/Delivery Condition** -- packaging, condition documentation. Bank criterion: was the product in acceptable condition when shipped?
5. **Refund Denial Justification** -- why refund was not issued (if applicable). Bank criterion: is the merchant's refusal reasonable?

### Visa 13.6 -- Credit Not Processed

**Strategy:** Prove the refund was already issued, the customer isn't owed one, or the return was never completed.

**Sections (priority order):**
1. **Refund Status** -- auto-pull refunds array; if refund already issued, lead with that. Bank criterion: has a refund already been processed?
2. **Refund/Return Policy** -- policy and how it was shown to customer. Bank criterion: did the customer agree to the refund terms?
3. **Refund Denial Reason** -- return not completed, outside window, etc. Bank criterion: is there a valid reason the refund was not issued?
4. **Customer Communication** -- refund request correspondence. Bank criterion: did the merchant respond to the refund request?
5. **Transaction Context** -- original purchase details. Bank criterion: what was the original transaction for?

### Mastercard 4808 -- Authorization-Related

**Strategy:** Prove the transaction was properly authorized by the payment network.

**Sections (priority order):**
1. **Authorization Confirmation** -- authorization code, network status from auto-pull. Bank criterion: was a valid authorization obtained?
2. **Transaction Authentication** -- AVS, CVC, 3DS results. Bank criterion: were security checks passed?
3. **Transaction Details** -- amount, date, description. Bank criterion: does the transaction match what was authorized?
4. **Customer Identity** -- name, email, billing address. Bank criterion: does the transaction tie to the cardholder?
5. **Supporting Documentation** -- receipts, order confirmations. Bank criterion: is there a paper trail?

### Mastercard 4853 -- Not as Described (Mastercard)

**Strategy:** Prove the product/service matched its description, mapped to Mastercard's evaluation criteria.

**Sections (priority order):**
1. **Product/Service Description** -- as-advertised vs. delivered. Bank criterion: did the merchandise match the description?
2. **Customer Communication** -- complaint handling, resolution attempts. Bank criterion: did the merchant try to resolve?
3. **Return/Refund Policy** -- policy and disclosure. Bank criterion: was the customer offered a return path?
4. **Delivery and Condition** -- shipping documentation, condition at delivery. Bank criterion: was the product delivered in acceptable condition?
5. **Dispute Rebuttal** -- specific response to the customer's claim. Bank criterion: what does the merchant say happened?

## 4. Prompt Assembly

At runtime, the prompt builder constructs the user message by injecting live data:

```
DISPUTE CONTEXT:
- Reason code: {network} {reason_code} ({display_name})
- Amount: {amount formatted}
- Transaction date: {transaction_date formatted}
- Customer: {customer_name} ({customer_email})
- Card: {card_brand} ending {card_last4}

STRIPE TRANSACTION DATA (verified by payment network):
- AVS address check: {avs_address_check}
- AVS zip check: {avs_zip_check}
- CVC check: {cvc_check}
- Network status: {network_status}
- Authorization code: {authorization_code}
- 3D Secure: {three_d_secure_result} (version {three_d_secure_version})
- Refunds: {refunds summary or "none"}

BANK EVALUATION CRITERIA:
{playbook.issuer_evaluation -- injected verbatim}

ARGUMENTATION STRATEGY:
{template.strategy}

NARRATIVE SECTIONS (in priority order):
{for each template.section with available evidence:}
{n}. {section.name} -- {section.instruction} -- Evidence available: {list of matching evidence}

MERCHANT-UPLOADED EVIDENCE:
{for each evidence file:}
- "{checklist_item_key}": {file_name}
{for items with no upload:}
- "{checklist_item_key}": (not uploaded)

CHECKLIST NOTES (merchant's own words):
{for each note in checklist_notes:}
- "{checklist_item_key}": "{note text}"

Generate the narrative following the system instructions.
```

### Anti-Hallucination Safeguards

Three layers:

1. **Prompt-level** -- system prompt rule: "only reference evidence that exists in the provided evidence list"
2. **Post-generation validation** (implemented in WIN-18) -- after Claude returns the narrative, programmatically check that every evidence item mentioned in the text corresponds to an item in the uploaded evidence list. Flag or strip references that don't match.
3. **Checklist notes as source material** -- the merchant's own notes are injected as quotable facts. Claude can reference "the merchant states FedEx tracking 7891234 was delivered Mar 18" because that came from merchant input, not fabrication.

### Handling Missing Evidence

When a section has no evidence (neither auto-pulled data nor merchant uploads), the template instruction tells Claude to skip the section entirely. The annotations array will only contain entries for sections that appear in the narrative.

## 5. Static Fallback Templates

The existing `narrative_template` field on each playbook gets upgraded to be a genuinely usable manual fallback for when the Claude API is unavailable.

Improvements over current mad-libs:
- Section headers matching the AI narrative structure
- Specific fill-in guidance (not just `[date]` but `[e.g., March 18, 2026 -- the delivery date from your carrier tracking page]`)
- Inline coaching hints explaining what the bank is looking for in each section
- `{{field_name}}` placeholders for auto-pulled Stripe data that the frontend can substitute before showing the template
- Coverage of all sections so the merchant doesn't miss anything

Example (Visa 13.1 excerpt):
```
**Delivery Confirmation**
[The bank needs carrier proof that the order was delivered. This is the
single most important piece of evidence for this dispute type.]
Tracking number: [from your carrier -- e.g., 1Z999AA10123456784]
Carrier: [e.g., UPS, FedEx, USPS]
Delivery date: [the date carrier shows "delivered"]
Delivery status: [e.g., "Delivered, left at front door"]

**Address Verification**
[The bank checks that you shipped to the address the customer gave you.]
Shipping address on order: [from your order details page]
AVS result: {{avs_address_check}} (auto-filled from Stripe)
ZIP match: {{avs_zip_check}} (auto-filled from Stripe)
```

## 6. Output Schema

```typescript
interface NarrativeOutput {
  narrative: string;          // Markdown-formatted narrative text
  annotations: Array<{
    section: string;          // Matches a **bolded header** in the narrative
    reasoning: string;        // Merchant-facing explanation of why this matters
  }>;
}
```

Claude's response will be enforced via structured output (JSON mode) rather than hoping for well-formed JSON from freeform generation.

## 7. Integration Points

| Ticket | How it consumes this work |
|--------|--------------------------|
| **WIN-18** (Claude API route) | Calls `buildPrompt()`, sends to Claude, runs post-generation hallucination validation |
| **WIN-19** (Narrative UI) | Renders `narrative` as main text, `annotations` as expandable Accordion sections |
| **WIN-20** (Evidence submission) | Submits final `narrative` (after merchant edits) as `uncategorized_text` to Stripe |
| **WIN-34** (Prompt eval) | Uses prompt builder with test fixtures, scores against quality criteria |
| **WIN-35** (Feedback on regenerate) | Appends merchant feedback to user prompt before regeneration |

## 8. Deliverables

| File | Purpose |
|------|---------|
| `backend/lib/prompts/system-prompt.ts` | Shared system prompt |
| `backend/lib/prompts/types.ts` | `ReasonCodePromptTemplate`, `NarrativeOutput`, `PromptContext` interfaces |
| `backend/lib/prompts/templates/visa-10.4.ts` | Fraud prompt template |
| `backend/lib/prompts/templates/visa-13.1.ts` | Not received prompt template |
| `backend/lib/prompts/templates/visa-13.2.ts` | Cancelled recurring prompt template |
| `backend/lib/prompts/templates/visa-13.3.ts` | Not as described prompt template |
| `backend/lib/prompts/templates/visa-13.6.ts` | Credit not processed prompt template |
| `backend/lib/prompts/templates/mastercard-4808.ts` | Authorization-related prompt template |
| `backend/lib/prompts/templates/mastercard-4853.ts` | Not as described (MC) prompt template |
| `backend/lib/prompts/templates/index.ts` | Template registry (lookup by network + reason code) |
| `backend/lib/prompts/build-prompt.ts` | Prompt assembly function |
| `backend/lib/prompts/__tests__/build-prompt.test.ts` | Tests for prompt assembly logic |
| Updated `backend/lib/playbooks/data/*.ts` | Beefed-up static fallback `narrative_template` on all 7 playbooks |
