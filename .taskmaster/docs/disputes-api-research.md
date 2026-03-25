# Stripe Disputes API — Comprehensive Research Document

> **WinBack Reference Document**
> Last updated: 2026-03-25
> Sources: Stripe API Reference, Stripe Docs, Stripe Support

---

## Table of Contents

1. [Evidence Submission Mechanics](#1-evidence-submission-mechanics)
2. [Complete Evidence Fields Reference](#2-complete-evidence-fields-reference)
3. [File Upload Process](#3-file-upload-process)
4. [Reason Code to Evidence Field Mapping](#4-reason-code-to-evidence-field-mapping)
5. [File Format and Size Requirements](#5-file-format-and-size-requirements)
6. [Important Constraints and Behaviors](#6-important-constraints-and-behaviors)
7. [Test Mode Behavior](#7-test-mode-behavior)
8. [Dispute Object Reference](#8-dispute-object-reference)
9. [Webhook Events](#9-webhook-events)
10. [WinBack Implementation Notes](#10-winback-implementation-notes)

---

## 1. Evidence Submission Mechanics

### Endpoint

Evidence is submitted by **updating the dispute object** — there is no separate "submit evidence" endpoint.

```
POST /v1/disputes/{dispute_id}
```

In the Node.js SDK:

```typescript
const dispute = await stripe.disputes.update('dp_xxx', {
  evidence: {
    customer_email_address: 'customer@example.com',
    shipping_date: '2026-02-01',
    shipping_documentation: 'file_xxx', // file ID from File Upload API
    uncategorized_text: 'Detailed rebuttal narrative...',
  },
  submit: false, // draft save — do NOT submit yet
});
```

### Draft vs. Final Submission

The `submit` parameter on the update call controls whether evidence is staged (draft) or finalized:

| `submit` value | Behavior |
|---|---|
| `false` | **Saves draft.** Evidence is stored on the dispute object and visible in the API and Dashboard, but is NOT sent to the card issuer. You can update it again later. |
| `true` | **Final submission.** Evidence is immediately and irrevocably sent to the card issuer for review. The dispute status changes from `needs_response` to `under_review`. |
| _(omitted)_ | **Defaults to `true`.** This is a critical gotcha — if you forget to pass `submit: false`, your evidence is submitted immediately. |

### Workflow

1. **Upload files** via the File Upload API (`POST https://files.stripe.com/v1/files` with `purpose: 'dispute_evidence'`)
2. **Save draft** by calling `POST /v1/disputes/{id}` with `submit: false` and the evidence fields — repeat as many times as needed
3. **Final submit** by calling `POST /v1/disputes/{id}` with `submit: true` — this is **irrevocable**

### Key Behaviors

- You can call the update endpoint multiple times with `submit: false` to incrementally build evidence
- Each update **merges** with previously saved evidence (you don't need to re-send all fields)
- To clear a previously set field, pass an empty string `""`
- Once `submit: true` is sent, no further evidence can be added
- If you never submit evidence before the deadline (`evidence_details.due_by`), Stripe automatically closes the dispute in the issuer's favor

---

## 2. Complete Evidence Fields Reference

### Text Fields (String)

| Field | Description | Max Length |
|---|---|---|
| `access_activity_log` | Server or activity logs showing the customer accessed or downloaded the purchased digital product. Include IP addresses, timestamps, and any relevant account activity. | 20,000 chars |
| `billing_address` | The billing address provided by the customer at time of purchase. | — |
| `cancellation_policy_disclosure` | Explanation of how and when the customer was shown your refund/cancellation policy prior to purchase. | 20,000 chars |
| `cancellation_rebuttal` | Justification for why the customer's subscription was not canceled. | 20,000 chars |
| `customer_email_address` | The email address of the customer. | — |
| `customer_name` | The name of the customer. | — |
| `customer_purchase_ip` | The IP address that the customer used when making the purchase. | — |
| `duplicate_charge_explanation` | Explanation of the difference between the disputed charge and the prior charge that appears to be a duplicate. | 20,000 chars |
| `duplicate_charge_id` | The Stripe charge ID for a prior payment that appears to be a duplicate of the disputed charge (e.g., `ch_xxx`). | — |
| `product_description` | Description of the product or service that was sold. | 20,000 chars |
| `refund_policy_disclosure` | Documentation demonstrating that the customer was shown your refund policy prior to purchase. | 20,000 chars |
| `refund_refusal_explanation` | Justification for why the customer is not entitled to a refund. | 20,000 chars |
| `service_date` | The date on which the customer received or began receiving the purchased service, in a clear human-readable format. | — |
| `shipping_address` | The address to which a physical product was shipped. Include the full address (street, city, state/province, postal code, country). | — |
| `shipping_carrier` | The delivery service that shipped the physical product (e.g., USPS, FedEx, UPS). Include all carrier names if multiple shipments. | — |
| `shipping_date` | The date on which a physical product began its route to the shipping address, in a clear human-readable format. | — |
| `shipping_tracking_number` | The tracking number(s) for a physical product shipment. Include all tracking numbers if there are multiple packages. | — |
| `uncategorized_text` | Any additional evidence or statements not covered by other fields. This is the general-purpose narrative field. | 20,000 chars |

**Combined text limit:** All text fields combined cannot exceed **150,000 characters** total.

### File Fields (Stripe File ID)

Each file field accepts a Stripe File ID (e.g., `file_xxx`) obtained from the File Upload API.

| Field | Description |
|---|---|
| `cancellation_policy` | Your subscription cancellation policy, as shown to the customer. |
| `customer_communication` | Any communication with the customer that is relevant to the dispute (emails, chat logs, letters, etc.). Combine multiple communications into one document. |
| `customer_signature` | A document or image showing the customer's signature. |
| `duplicate_charge_documentation` | Documentation for the prior payment that appears to be a duplicate of the disputed charge (e.g., a copy of the receipt from the prior charge). |
| `receipt` | A receipt or message sent to the customer upon payment/charge (order confirmation, invoice, etc.). |
| `refund_policy` | Your refund policy, as shown to the customer. |
| `service_documentation` | Documentation showing proof that the service was provided to the customer (signed delivery receipt, confirmation screenshot, etc.). |
| `shipping_documentation` | Documentation showing proof that the product was shipped to the customer at the shipping address (tracking screenshot, shipping label, carrier receipt, etc.). |
| `uncategorized_file` | Any additional supporting evidence file(s) that don't fit in other categories. Combine multiple documents into one file if possible. |

### Enhanced Evidence (Visa CE 3.0)

For Visa disputes with network reason code 10.4, additional enhanced evidence fields are available under `evidence.enhanced_evidence.visa_compelling_evidence_3`:

- `disputed_transaction` — product description, merchandise_or_services classification
- `prior_undisputed_transactions` — array of up to 2 prior charges with matching evidence elements
- Matching elements: customer_purchase_ip, customer_device_fingerprint, customer_device_id, shipping_address, customer_email_address, customer_account_id

> WinBack v1 should focus on standard evidence fields. Visa CE 3.0 is a future enhancement.

---

## 3. File Upload Process

### Endpoint

Files must be uploaded to a **separate Stripe upload endpoint** (not the standard API host):

```
POST https://files.stripe.com/v1/files
```

This is a **multipart/form-data** request, NOT JSON.

### Node.js Example

```typescript
const fs = require('fs');
const stripe = require('stripe')('sk_test_xxx');

const file = await stripe.files.create({
  purpose: 'dispute_evidence',
  file: {
    data: fs.readFileSync('/path/to/evidence.pdf'),
    name: 'evidence.pdf',
    type: 'application/pdf',
  },
});

// file.id is now something like "file_xxx"
// Use this ID in the dispute evidence fields
```

### Key Details

- **Purpose:** Must be set to `dispute_evidence` for dispute-related files
- **Format:** multipart/form-data per RFC 2388
- **Response:** Returns a File object with `id`, `size`, `type`, `filename`, `purpose`, `url`, and `created`
- **File URL:** The returned `url` requires a live-mode secret key to access — files are not publicly accessible
- **Expiration:** Dispute evidence files expire after **9 months** per Stripe support documentation
- **File links:** Can optionally generate shareable links via `file_link_data` parameter

---

## 4. Reason Code to Evidence Field Mapping

### Stripe Reason Codes

Stripe normalizes hundreds of network-specific reason codes into 8 categories:

| Stripe Reason | Description |
|---|---|
| `fraudulent` | Cardholder claims they did not authorize the payment. Most common category. |
| `credit_not_processed` | Customer claims they are owed a refund that was never issued. |
| `duplicate` | Customer claims they were charged multiple times for the same purchase. |
| `product_not_received` | Customer claims they did not receive the product or service. |
| `product_unacceptable` | Customer claims product was defective, damaged, or not as described. |
| `subscription_canceled` | Customer claims they were charged after canceling a subscription. |
| `unrecognized` | Customer does not recognize the charge on their statement. |
| `general` | Does not fit other categories; requires clarification. |

> Additional less common reasons exist in the API: `bank_cannot_process`, `check_returned`, `customer_initiated`, `debit_not_authorized`, `incorrect_account_details`, `insufficient_funds`, `noncompliant`. These are rare for card disputes.

### Evidence Field Priority by Reason Code

#### `fraudulent` — Unauthorized Transaction

**Goal:** Prove the legitimate cardholder did authorize/use the purchase.

| Priority | Field | Type | Why |
|---|---|---|---|
| **Critical** | `customer_purchase_ip` | text | Ties transaction to a known IP |
| **Critical** | `customer_email_address` | text | Matches cardholder identity |
| **Critical** | `customer_name` | text | Matches cardholder identity |
| **Critical** | `billing_address` | text | AVS match proves authorization |
| High | `receipt` | file | Confirms charge notification was sent |
| High | `customer_communication` | file | Shows engagement with customer |
| High | `customer_signature` | file | Direct proof of authorization |
| High | `access_activity_log` | text | (Digital) Proves customer used the product |
| High | `shipping_documentation` | file | (Physical) Shipped to billing address |
| High | `shipping_address` | text | (Physical) Matches billing address |
| High | `shipping_tracking_number` | text | (Physical) Carrier confirms delivery |
| High | `shipping_carrier` | text | (Physical) Delivery service name |
| High | `shipping_date` | text | (Physical) When shipped |
| Medium | `product_description` | text | Context for the charge |
| Medium | `service_date` | text | (Services) When delivered |
| Medium | `service_documentation` | file | (Services) Proof of service |
| Fallback | `uncategorized_text` | text | AI-generated narrative rebuttal |
| Fallback | `uncategorized_file` | file | Any additional evidence |

#### `credit_not_processed` — Refund Not Issued

**Goal:** Prove refund was issued, customer is not owed one, or return was not completed.

| Priority | Field | Type | Why |
|---|---|---|---|
| **Critical** | `refund_policy` | file | Shows policy customer agreed to |
| **Critical** | `refund_policy_disclosure` | text | How/when customer was shown the policy |
| **Critical** | `refund_refusal_explanation` | text | Why customer is not entitled to refund |
| High | `customer_communication` | file | Shows refund discussion with customer |
| High | `receipt` | file | Original transaction receipt |
| Medium | `cancellation_policy` | file | If subscription-related |
| Medium | `cancellation_policy_disclosure` | text | How cancellation policy was presented |
| Fallback | `uncategorized_text` | text | Narrative rebuttal |
| Fallback | `uncategorized_file` | file | Additional supporting documents |

#### `duplicate` — Charged Multiple Times

**Goal:** Prove each charge was for a separate, intentional purchase.

| Priority | Field | Type | Why |
|---|---|---|---|
| **Critical** | `duplicate_charge_id` | text | Stripe ID of the allegedly duplicate charge |
| **Critical** | `duplicate_charge_explanation` | text | Explains difference between charges |
| **Critical** | `duplicate_charge_documentation` | file | Receipt/docs from the other charge |
| High | `receipt` | file | Receipt for this specific charge |
| High | `shipping_documentation` | file | (Physical) Different shipments prove different orders |
| High | `service_documentation` | file | (Services) Different service instances |
| High | `customer_communication` | file | Customer correspondence about both transactions |
| Fallback | `uncategorized_text` | text | Narrative rebuttal |
| Fallback | `uncategorized_file` | file | Additional supporting documents |

#### `product_not_received` — Product/Service Not Delivered

**Goal:** Prove the product or service was delivered.

| Priority | Field | Type | Why |
|---|---|---|---|
| **Critical** | `shipping_tracking_number` | text | (Physical) Carrier tracking proof |
| **Critical** | `shipping_carrier` | text | (Physical) Which delivery service |
| **Critical** | `shipping_date` | text | (Physical) When it shipped |
| **Critical** | `shipping_address` | text | (Physical) Where it was sent |
| **Critical** | `shipping_documentation` | file | (Physical) Delivery confirmation screenshot |
| **Critical** | `access_activity_log` | text | (Digital) Timestamps of access/download |
| **Critical** | `service_date` | text | (Services) When service was provided |
| **Critical** | `service_documentation` | file | (Services) Proof of service delivery |
| High | `customer_communication` | file | Delivery notifications, tracking emails |
| High | `customer_signature` | file | Signed delivery confirmation |
| Medium | `product_description` | text | What was purchased |
| Medium | `receipt` | file | Order confirmation |
| Fallback | `uncategorized_text` | text | Narrative rebuttal |
| Fallback | `uncategorized_file` | file | Additional supporting documents |

#### `product_unacceptable` — Defective/Not as Described

**Goal:** Prove product matched description and was in acceptable condition.

| Priority | Field | Type | Why |
|---|---|---|---|
| **Critical** | `product_description` | text | As-advertised description |
| **Critical** | `customer_communication` | file | Response to quality complaints |
| High | `refund_policy` | file | Return/exchange policy |
| High | `refund_policy_disclosure` | text | How policy was presented |
| High | `refund_refusal_explanation` | text | Why refund/return was denied |
| High | `receipt` | file | What was ordered and price |
| Medium | `shipping_documentation` | file | Condition at time of shipment |
| Medium | `service_documentation` | file | (Services) What was delivered |
| Fallback | `uncategorized_text` | text | Narrative rebuttal |
| Fallback | `uncategorized_file` | file | Photos, inspection reports, etc. |

#### `subscription_canceled` — Recurring Charge After Cancellation

**Goal:** Prove subscription was still active when charged, or cancellation was not properly requested.

| Priority | Field | Type | Why |
|---|---|---|---|
| **Critical** | `cancellation_policy` | file | Cancellation terms customer agreed to |
| **Critical** | `cancellation_policy_disclosure` | text | How/when customer was shown policy |
| **Critical** | `cancellation_rebuttal` | text | Why subscription was still active |
| High | `customer_communication` | file | Cancellation-related communications |
| High | `access_activity_log` | text | Proof customer used service after alleged cancellation |
| High | `receipt` | file | Renewal notification/invoice |
| Medium | `customer_email_address` | text | Customer identity |
| Medium | `service_date` | text | Service period for the charge |
| Fallback | `uncategorized_text` | text | Narrative rebuttal |
| Fallback | `uncategorized_file` | file | Screenshots of account settings, etc. |

#### `unrecognized` — Customer Doesn't Recognize Charge

**Goal:** Help customer recognize the charge was theirs.

| Priority | Field | Type | Why |
|---|---|---|---|
| **Critical** | `customer_email_address` | text | Matches their records |
| **Critical** | `customer_name` | text | Confirms identity |
| **Critical** | `customer_purchase_ip` | text | Ties to their network |
| High | `receipt` | file | Reminder of what they purchased |
| High | `product_description` | text | What they bought |
| High | `customer_communication` | file | Prior engagement |
| High | `billing_address` | text | Matches their address |
| Medium | `shipping_documentation` | file | (Physical) Delivery to their address |
| Medium | `service_documentation` | file | (Services) Proof of service |
| Fallback | `uncategorized_text` | text | Narrative rebuttal |
| Fallback | `uncategorized_file` | file | Additional supporting documents |

#### `general` — Uncategorized

**Goal:** Varies — contact customer to understand the claim, then respond accordingly.

| Priority | Field | Type | Why |
|---|---|---|---|
| High | `customer_communication` | file | Shows engagement and resolution attempts |
| High | `receipt` | file | Transaction confirmation |
| High | `product_description` | text | What was purchased |
| Medium | All other relevant fields | — | Depends on actual complaint |
| Fallback | `uncategorized_text` | text | Narrative addressing the dispute |
| Fallback | `uncategorized_file` | file | Any supporting documentation |

---

## 5. File Format and Size Requirements

### Accepted File Formats

| Format | MIME Type | Notes |
|---|---|---|
| **PDF** | `application/pdf` | Preferred for multi-page documents. Stripe validates PDF structure — files with annotations or embedded media may be rejected. |
| **JPEG** | `image/jpeg` | Good for screenshots, photos. |
| **PNG** | `image/png` | Good for screenshots with text. |

> Only **PDF, JPEG, and PNG** are accepted for dispute evidence files.

### Size Limits

| Constraint | Limit |
|---|---|
| **Combined file size** (all evidence files) | **4.5 MB** across all card networks |
| **Page count** | Fewer than **50 pages** total |
| **Mastercard-specific** | Maximum **19 pages** |
| **Individual text field** | 20,000 characters each |
| **Combined text** (all text fields) | 150,000 characters total |

### Formatting Best Practices (from Stripe Docs)

- Use **12-point font or larger** in documents
- Use **US Letter or A4 size** in portrait orientation
- Use **bold text, callouts, or arrows** to highlight key information
- Avoid color highlighting (may not render well)
- **Consolidate** multiple documents of the same type into single files (e.g., merge all customer emails into one PDF)
- **Crop** screenshots to relevant areas
- Keep evidence **concise** — long explanations do not help
- Focus on **why the claim is unreasonable**, not general background

### File Upload Rejections

Files may be rejected if:
- They contain VBA macros (Microsoft Office documents)
- PDF validation fails (malformed structure, incompatible annotations)
- File is not PDF, JPEG, or PNG format
- Combined size exceeds 4.5 MB

---

## 6. Important Constraints and Behaviors

### Submission Finality

- **`submit: true` is irrevocable.** Once evidence is submitted, it cannot be modified, supplemented, or retracted. The dispute moves to `under_review` status.
- **Default is `true`.** If you omit the `submit` parameter, evidence is submitted immediately. This is the single most dangerous behavior in the API for WinBack.
- Always explicitly pass `submit: false` when saving drafts.

### Multiple Updates Before Submission

- You **can** update evidence as many times as you want before final submission (with `submit: false`)
- Each update merges with previously saved evidence
- The `evidence_details.submission_count` tracks how many final submissions have been made
- After final submission, the dispute enters `under_review` and no further evidence updates are possible

### Time Limits

- Each dispute has a deadline in `evidence_details.due_by` (Unix timestamp)
- Typically **7-21 days** from dispute creation, depending on the card network
- If evidence is not submitted before the deadline, the dispute is automatically lost
- The `evidence_details.past_due` boolean indicates whether the deadline has passed

### Rate Limits

- Standard Stripe API rate limits apply (100 requests/second in live mode, 25/s in test mode)
- File uploads to `files.stripe.com` have the same rate limits
- Do not load-test against Stripe test mode — you may hit rate limits

### Idempotency

- The Stripe Disputes API supports idempotency keys via the `Idempotency-Key` header
- **Essential for the final `submit: true` call** to prevent double-submission
- Use unique keys per submission attempt (e.g., `dispute_{id}_submit_{timestamp}`)

### Evidence Details Object

The `evidence_details` sub-object on the dispute provides:

| Field | Type | Description |
|---|---|---|
| `due_by` | timestamp (nullable) | Deadline for evidence submission. Null if no deadline (e.g., already submitted). |
| `has_evidence` | boolean | Whether any evidence has been staged (draft or submitted). |
| `past_due` | boolean | Whether the deadline has passed. |
| `submission_count` | integer | Number of times evidence has been finally submitted. Usually 0 or 1. |
| `enhanced_eligibility` | object | Visa CE 3.0 qualification details. |

---

## 7. Test Mode Behavior

### Creating Test Disputes (Card Payments)

Use these test card numbers to create charges that will automatically be disputed:

| Card Number | PaymentMethod Token | Reason Code | Description |
|---|---|---|---|
| `4000000000000259` | `pm_card_createDispute` | `fraudulent` | Charge succeeds, then disputed as fraudulent. Protected after 3DS. |
| `4000000000002685` | `pm_card_createDisputeProductNotReceived` | `product_not_received` | Charge succeeds, then disputed as not received. NOT protected after 3DS. |
| `4000000000001976` | `pm_card_createDisputeInquiry` | (inquiry) | Charge succeeds, then disputed as an inquiry (pre-dispute). |
| `4000000000005423` | `pm_card_createIssuerFraudRecord` | (warning) | Charge succeeds, then receives an early fraud warning. |
| `4000000404000079` | `pm_card_createMultipleDisputes` | (multiple) | Charge succeeds, then disputed multiple times. |
| `4000000404000038` | `pm_card_createCe3EligibleDispute` | `fraudulent` (Visa CE 3.0) | Charge succeeds, then disputed as Visa CE 3.0 eligible. |
| `4000008400000779` | `pm_card_createComplianceDispute` | (Visa compliance) | Charge succeeds, then disputed as Visa compliance dispute. |

### Simulating Dispute Outcomes

To control whether a test dispute is won or lost, set the `uncategorized_text` evidence field:

| Value | Outcome |
|---|---|
| `winning_evidence` | Dispute closes as **won**. Account is credited the disputed amount. |
| `losing_evidence` | Dispute closes as **lost**. Account is not credited. |

```typescript
// Simulate winning a test dispute
await stripe.disputes.update('dp_test_xxx', {
  evidence: {
    uncategorized_text: 'winning_evidence',
  },
  submit: true,
});
```

### Test Mode Limitations

- Only `fraudulent` and `product_not_received` reason codes can be directly triggered with card numbers
- Other reason codes cannot be simulated via card numbers alone
- Dispute outcomes are controlled by the magic `uncategorized_text` values — real-world outcome logic does not apply
- Evidence is not actually reviewed — the outcome is purely determined by the magic string
- Test disputes appear almost immediately after the charge (not days later like real disputes)
- Rate limits are lower in test mode (25 requests/second vs. 100/second in live mode)
- Cannot simulate the full timeline of a real dispute (e.g., evidence review period)

### Creating Test Disputes (PayPal)

For PayPal payment disputes, use email patterns when creating the PaymentIntent:

| Email Pattern | Reason Code |
|---|---|
| `.*dispute_credit_not_processed@.*` | `credit_not_processed` |
| `.*dispute_duplicate@.*` | `duplicate` |
| `.*dispute_fraudulent@.*` | `fraudulent` |
| `.*dispute_general@.*` | `general` |
| `.*dispute_not_received@.*` | `product_not_received` |
| `.*dispute_product_unacceptable@.*` | `product_unacceptable` |
| `.*dispute_subscription_cancelled@.*` | `subscription_canceled` |

> These are useful for testing more reason code variants during development.

---

## 8. Dispute Object Reference

### Core Fields

```typescript
interface Dispute {
  id: string;                    // "dp_xxx"
  object: 'dispute';
  amount: number;                // Disputed amount in smallest currency unit
  charge: string;                // "ch_xxx" — expandable
  payment_intent: string | null; // "pi_xxx" — expandable
  currency: string;              // ISO 4217 (e.g., "usd")
  created: number;               // Unix timestamp
  livemode: boolean;
  metadata: Record<string, string>;
  reason: DisputeReason;
  status: DisputeStatus;
  evidence: DisputeEvidence;
  evidence_details: EvidenceDetails;
  balance_transactions: BalanceTransaction[];
  is_charge_refundable: boolean;
  payment_method_details: PaymentMethodDetails | null;
  enhanced_eligibility_types: string[];
}
```

### Status Values

| Status | Description |
|---|---|
| `needs_response` | Evidence has not been submitted. Action required. |
| `warning_needs_response` | Early warning/inquiry stage. Action recommended. |
| `under_review` | Evidence submitted, awaiting issuer decision. |
| `warning_under_review` | Warning evidence submitted, awaiting decision. |
| `won` | Dispute resolved in merchant's favor. Funds returned. |
| `lost` | Dispute resolved in cardholder's favor. Funds not returned. |
| `warning_closed` | Early warning closed without escalating to formal dispute. |

### Reason Values

| Reason | Common? | Description |
|---|---|---|
| `fraudulent` | Very common | Unauthorized transaction claim |
| `credit_not_processed` | Common | Refund/credit not received |
| `duplicate` | Common | Charged multiple times |
| `product_not_received` | Common | Product/service not delivered |
| `product_unacceptable` | Common | Product defective or not as described |
| `subscription_canceled` | Common | Charged after cancellation |
| `unrecognized` | Common | Customer doesn't recognize charge |
| `general` | Common | Uncategorized claim |
| `bank_cannot_process` | Rare | Bank processing issue |
| `check_returned` | Rare | Check payment returned |
| `customer_initiated` | Rare | Customer-initiated dispute |
| `debit_not_authorized` | Rare | Debit not authorized |
| `incorrect_account_details` | Rare | Wrong account details |
| `insufficient_funds` | Rare | Insufficient funds |
| `noncompliant` | Rare | Network compliance issue |

---

## 9. Webhook Events

| Event | Description |
|---|---|
| `charge.dispute.created` | New dispute opened. Start evidence collection. |
| `charge.dispute.updated` | Dispute updated (status change, evidence added). |
| `charge.dispute.closed` | Dispute resolved (won or lost). |
| `charge.dispute.funds_reinstated` | Funds returned after winning dispute. |
| `charge.dispute.funds_withdrawn` | Funds withdrawn when dispute opened. |
| `radar.early_fraud_warning.created` | Early fraud warning (pre-dispute). |

### Recommended Webhook Strategy for WinBack

1. Listen for `charge.dispute.created` to trigger new dispute intake
2. Listen for `charge.dispute.updated` to track status transitions
3. Listen for `charge.dispute.closed` to record outcomes and update metrics
4. Listen for `radar.early_fraud_warning.created` to proactively alert merchants

---

## 10. WinBack Implementation Notes

### Critical Safety Rules

1. **ALWAYS explicitly set `submit: false`** when saving evidence drafts. Never rely on the default.
2. **Implement double-click prevention** — disable the submit button on click AND use server-side idempotency keys.
3. **Require explicit user confirmation** before the final `submit: true` call. Show a modal/FocusView with clear "this is permanent" language.
4. **Validate evidence completeness** before allowing submission — warn (but don't block) if high-priority fields for the reason code are empty.
5. **Implement idempotency keys** on the `submit: true` call: `Idempotency-Key: dispute_{id}_submit_{uuid}`.

### API Call Flow for WinBack

```
1. User opens dispute in WinBack
   → GET /v1/disputes/{id} (retrieve dispute + current evidence)

2. User uploads evidence file
   → POST https://files.stripe.com/v1/files (purpose: dispute_evidence)
   → Returns file_id

3. User saves evidence draft (auto-save or manual)
   → POST /v1/disputes/{id} { evidence: {...}, submit: false }
   → Can repeat as many times as needed

4. AI generates narrative
   → Claude API call (backend)
   → Save to uncategorized_text via draft update

5. User reviews and submits
   → POST /v1/disputes/{id} { evidence: {...}, submit: true }
   → WITH Idempotency-Key header
   → Status changes to under_review
   → NO FURTHER UPDATES POSSIBLE
```

### File Upload Strategy

- Store files temporarily in Supabase Storage (30-day TTL per CLAUDE.md)
- Upload to Stripe File API only when saving the draft or before final submission
- Track file IDs in Supabase so we can reference them in the evidence update
- Maximum combined file size: 4.5 MB — validate on the client side before upload
- Accepted formats: PDF, JPEG, PNG only — validate on the client side

### Evidence Validation Before AI Narrative

Before generating the AI narrative with Claude, verify:
1. Which evidence fields are populated vs. empty
2. Which fields are high-priority for the given reason code
3. What the uploaded files actually contain (filenames, types)
4. Strip any AI-fabricated references to evidence that doesn't exist (per CLAUDE.md hallucination validation rule)

### Polling for AI Generation

Per the CLAUDE.md architecture decision, narrative generation should be async:
1. `POST /api/generate-narrative` returns `{ generation_id: "gen_xxx" }`
2. Client polls `GET /api/generate-narrative/{gen_id}` until status is `complete`
3. On completion, save the narrative to `uncategorized_text` via draft update

---

## 11. Network-Specific Evidence Rules

### Visa

**Evidence Constraints:**
- Combined file size: 4.5 MB (standard across all networks via Stripe)
- No network-specific page limit beyond the general 50-page ceiling

**Response Timeline:**
- Typically 7-21 days from dispute creation (varies by issuer, reflected in `evidence_details.due_by`)
- Cardholder filing window: 120 calendar days from transaction date (max 540 days)

**Visa Compelling Evidence 3.0 (CE 3.0):**
- Applies to Visa reason code **10.4** (Other Fraud — Card-Absent Environment) → Stripe's `fraudulent`
- Requires ≥2 prior undisputed transactions on same payment method, within 120-365 days
- Must match ≥2 data elements across all 3 transactions (disputed + 2 prior):
  - **Main:** Customer purchase IP, device fingerprint, device ID
  - **Secondary:** Shipping address, email, account ID
  - Valid combos: 2 main, or 1 main + 1 secondary
- Stripe autofills CE 3.0 when eligible — flags `qualified` or `requires_action`
- CE 3.0 automation via Visa Secure went live **October 17, 2025**; associated fees effective **April 17, 2026**
- If CE 3.0 fails qualification, Stripe falls back to standard evidence — always fill standard fields too
- Stripe exposes via `evidence.enhanced_evidence.visa_compelling_evidence_3`

**Visa Compliance Disputes:**
- Contesting a Visa compliance dispute incurs a **$500 USD** network fee (refunded if won)
- Rare but important to surface in UI

### Mastercard

**Evidence Constraints:**
- Combined file size: 4.5 MB
- **Maximum 19 pages** — strictest of any network. Evidence exceeding 19 pages may be truncated silently.

**Response Timeline:**
- Merchant response deadline: up to **45 days** from chargeback issuance (longest of any network)
- Actual deadline reflected in `evidence_details.due_by`

**Mastercard First-Party Trust Program:**
- Targets friendly fraud, expanded globally in 2025
- Requires 1 data element from each of 3 categories: Device (IP, device ID), Delivery (shipping address, email), Identity (account ID, billing address)
- **Stripe does not yet have explicit API support** — submitted via standard evidence fields today

### American Express

**Evidence Constraints:**
- Combined file size: 4.5 MB. No published page limit beyond ~50.

**Response Timeline:**
- Merchant response deadline: **20 days** — tighter than Visa/Mastercard
- Cardholder filing window: 120 days

**Amex as Issuer AND Network (Closed-Loop):**
- Amex is both network and issuer for most cards — directly controls dispute decisions
- Merchants have less leverage; Amex is both judge and party
- Approx. merchant win rate: **~28%** (lower than Visa ~35%, Mastercard ~33%)

**Inquiry Process (Unique to Amex):**
- Two-step: **Inquiry first, then Chargeback**
- During inquiry, Amex requests transaction clarification — 20 days to respond
- Sufficient evidence at inquiry stage = case resolved, no chargeback, no fee, no ratio impact
- Failing to respond = escalation to unwinnable chargeback
- In Stripe API: `warning_needs_response` / `warning_under_review` / `warning_closed`
- **WinBack must treat Amex inquiries with equal urgency to chargebacks**

**Amex-Specific Programs:**
- **Fraud Full Recourse:** If Amex determines third-party fraud, merchant cannot representment
- **Immediate Chargeback:** Clear-cut cases skip inquiry entirely

### Discover

**Evidence Constraints:**
- Combined file size: 4.5 MB. No published page limit.

**Response Timeline:**
- **Retrieval request:** 5 calendar days (shortest initial window of any network)
- **Chargeback representment:** 20 calendar days
- **All Discover timelines are calendar days, including weekends/holidays**

**Retrieval Request Process (Unique to Discover):**
- Only major network that still routinely uses retrieval requests pre-chargeback
- 5 calendar days to respond — failure automatically advances to chargeback
- In Stripe API: `warning_needs_response` status
- Responding well here prevents the chargeback entirely

**Contact Restriction (Unique to Discover):**
- **Discover prohibits merchant-cardholder contact** during active disputes
- All communication must go through formal channels
- WinBack playbooks and AI narrative must suppress "contact the customer" guidance for Discover disputes

### Network Comparison

| Dimension | Visa | Mastercard | Amex | Discover |
|---|---|---|---|---|
| **Network Type** | Open loop | Open loop | Closed loop | Closed loop |
| **Page Limit** | ~50 | **19** | ~50 | ~50 |
| **Response Window** | 7-21 days | Up to 45 days | 20 days | **5 days** (retrieval) / 20 days |
| **Pre-Dispute Phase** | No | No | **Inquiry** | **Retrieval Request** |
| **Friendly Fraud Program** | **CE 3.0** (Stripe API) | First-Party Trust (no API yet) | None | None |
| **Approx. Win Rate** | ~35% | ~33% | ~28% | Limited data |
| **Contact Customer** | Allowed | Allowed | Allowed | **Prohibited** |

### Implications for WinBack v1

**Must handle now:**
1. **Mastercard 19-page limit** — validate total evidence page count, warn before submission
2. **Network-aware urgency** — display `evidence_details.due_by` prominently; call out Discover's 5-day retrieval window and Amex's 20-day inquiry deadline
3. **Inquiry/retrieval handling** — treat `warning_needs_response` with equal or greater urgency than chargebacks; explain that responding prevents escalation
4. **Discover contact restriction** — suppress "contact the customer" guidance for Discover disputes
5. **Visa CE 3.0 eligibility** — surface the eligibility badge and explain the win rate advantage

**Future (v2+):**
1. Visa CE 3.0 manual evidence submission for disputes Stripe's autofill misses
2. Mastercard First-Party Trust integration when Stripe adds API support
3. Network-specific playbook overlays
4. Win rate analytics by network

---

## Sources

- [Stripe API: Update Dispute](https://docs.stripe.com/api/disputes/update)
- [Stripe API: Dispute Object](https://docs.stripe.com/api/disputes/object)
- [Stripe API: File Upload](https://docs.stripe.com/api/files/create)
- [Stripe API: File Object](https://docs.stripe.com/api/files/object)
- [Stripe Docs: Respond to Disputes via API](https://docs.stripe.com/disputes/api)
- [Stripe Docs: Dispute Categories](https://docs.stripe.com/disputes/categories)
- [Stripe Docs: Dispute Reason Codes](https://docs.stripe.com/disputes/reason-codes-defense-requirements)
- [Stripe Docs: Dispute Best Practices](https://docs.stripe.com/disputes/best-practices)
- [Stripe Docs: Visual Evidence Examples](https://docs.stripe.com/disputes/visual-evidence)
- [Stripe Docs: File Upload Guide](https://docs.stripe.com/file-upload)
- [Stripe Docs: Testing](https://docs.stripe.com/testing)
- [Stripe Docs: Visa CE 3.0](https://docs.stripe.com/disputes/api/visa-ce3)
- [Stripe Support: Evidence Submission Troubleshooting](https://support.stripe.com/questions/evidence-submission-troubleshooting-faqs)
- [Stripe Docs: Dispute Monitoring Programs](https://docs.stripe.com/disputes/monitoring-programs)
- [Chargebacks911: Visa CE 3.0](https://chargebacks911.com/visa-compelling-evidence-3-0/)
- [Chargebacks911: American Express Chargebacks](https://chargebacks911.com/american-express-chargebacks/)
- [Chargebacks911: Discover Card Chargebacks](https://chargebacks911.com/discover-card-chargebacks/)
- [Mastercard: First-Party Trust Program](https://www.mastercard.com/us/en/news-and-trends/press/2025/june/first-party-trust-countering-friendly-fraud.html)
- [Kount: Discover Chargeback Guide](https://kount.com/blog/discover-chargeback-dispute-guide-merchants)
