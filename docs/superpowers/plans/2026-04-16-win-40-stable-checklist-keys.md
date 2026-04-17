# WIN-40 Stable Checklist Item Keys Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a stable `key` field to every playbook evidence checklist item so the display label (`item`) can be rewritten without orphaning uploaded files, checklist state, or merchant notes.

**Architecture:** Extend `EvidenceChecklistItem` with `key: string`. Enforce per-playbook key uniqueness via the invariant validator. Migrate runtime identifiers — `evidence_files.checklist_item_key`, `disputes.checklist_state` JSONB keys, `disputes.checklist_notes` JSONB keys — from labels to stable keys via SQL migration 011. Swap every `item.item` identifier use in backend + frontend to `item.key`. Display uses `item.item`; identity uses `item.key`.

**Tech Stack:** TypeScript, Next.js 15 App Router, Supabase (Postgres + JSONB), Vitest, Stripe Apps SDK (React).

**Scope note:** The Linear ACs frame the fix around `evidence_files`. The checklist_state and checklist_notes JSONB columns share the same bug (JSONB keys are labels, so label drift orphans them too). This plan fixes all three together in one pass — the extra cost is one extra SQL `UPDATE` per column and swapping the keying in `EvidenceChecklist.tsx`/`NarrativePreGeneration.tsx`. Leaving them on labels would invite the same bug to recur on an adjacent surface.

---

## Task 0: Set up the branch

**Files:** none

- [ ] **Step 1: Sync main and create the feature branch**

```bash
cd /Users/joeb/Projects/WinBack
git checkout main
git pull --ff-only origin main
git checkout -b joebenscoter/win-40-stable-checklist-keys
```

Expected: switched to a new branch with main's tip.

---

## Task 1: Add `key` field to the shared types

**Files:**
- Modify: `backend/lib/playbooks/types.ts:30-65`
- Modify: `stripe-app/src/lib/types.ts:67-82`

- [ ] **Step 1: Add `key: string` to the backend `EvidenceChecklistItem`**

Edit `backend/lib/playbooks/types.ts`. Insert the new `key` field at the top of the interface, above `item`, with a comment explaining the role:

```typescript
export interface EvidenceChecklistItem {
  /**
   * Stable identifier used as the database key in evidence_files.checklist_item_key
   * and in disputes.checklist_state / disputes.checklist_notes JSONB. NEVER
   * change once assigned — changing this orphans every piece of data keyed
   * to it. Must be unique within a playbook. The `item` field is the human
   * label and can be rewritten freely. (WIN-40)
   */
  key: string;
  item: string;
  category: EvidenceCategory;
  // ... rest unchanged
```

- [ ] **Step 2: Add `key: string` to the stripe-app mirror type**

Edit `stripe-app/src/lib/types.ts`. Add the same field at the top of the frontend `EvidenceChecklistItem` interface with a comment:

```typescript
export interface EvidenceChecklistItem {
  // Stable identifier that mirrors backend/lib/playbooks/types.ts EvidenceChecklistItem.key.
  // Used everywhere the playbook item needs a stable handle (filesByKey,
  // checklist_state, checklist_notes). The `item` field is the display label. (WIN-40)
  key: string;
  item: string;
  category: 'mandatory' | 'recommended' | 'situational';
  // ... rest unchanged
```

- [ ] **Step 3: Run type check in both packages to confirm the field is surfaced**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit
```

Expected: type errors EVERYWHERE playbook data files reference checklist items without `key` (visa-10.4.ts etc.). Those are what Task 2 fills in.

- [ ] **Step 4: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add backend/lib/playbooks/types.ts stripe-app/src/lib/types.ts
git commit -m "feat(WIN-40): add stable key field to EvidenceChecklistItem type"
```

---

## Task 2: Enforce per-playbook key uniqueness in the validator

**Files:**
- Modify: `backend/lib/playbooks/validate.ts`
- Modify: `backend/lib/playbooks/validate.test.ts`

- [ ] **Step 1: Extend the `baseItem` helper in the validator test to include a `key`**

Edit `backend/lib/playbooks/validate.test.ts:5-17` — add `key: "test_key"` to the default object so existing tests still satisfy the new type. Final helper:

```typescript
function baseItem(overrides: Partial<EvidenceChecklistItem> = {}): EvidenceChecklistItem {
  return {
    key: "test_key",
    item: "Test item",
    category: "recommended",
    context: "all",
    required: false,
    why_matters: "because",
    where_to_find: "somewhere",
    urgency_essential: false,
    urgency_order: null,
    ...overrides,
  };
}
```

- [ ] **Step 2: Write a failing test for the duplicate-key invariant**

Append to `backend/lib/playbooks/validate.test.ts`:

```typescript
  it("rejects a playbook with two items sharing the same key", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ key: "shared_key", item: "First", stripe_field: "authorization" }),
        baseItem({ key: "shared_key", item: "Second", stripe_field: "avs_result" }),
      ]),
    ).toThrow(PlaybookInvariantError);
  });

  it("rejects a playbook with an empty-string key", () => {
    expect(() =>
      validatePlaybookChecklist("visa-10.4", [
        baseItem({ key: "", stripe_field: "authorization" }),
      ]),
    ).toThrow(PlaybookInvariantError);
  });
```

- [ ] **Step 3: Run the tests — the new cases fail**

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run lib/playbooks/validate.test.ts
```

Expected: `rejects a playbook with two items sharing the same key` and `rejects a playbook with an empty-string key` FAIL. The other tests still pass.

- [ ] **Step 4: Extend the validator with the uniqueness + non-empty check**

Edit `backend/lib/playbooks/validate.ts`. Extend the function body to also enforce key invariants:

```typescript
export function validatePlaybookChecklist(
  playbookKey: string,
  checklist: EvidenceChecklistItem[],
): void {
  const seenKeys = new Set<string>();
  for (const item of checklist) {
    if (!item.key || item.key.trim().length === 0) {
      throw new PlaybookInvariantError(
        `Playbook ${playbookKey} item "${item.item}" has an empty key. Every checklist item must have a non-empty stable key.`,
      );
    }
    if (seenKeys.has(item.key)) {
      throw new PlaybookInvariantError(
        `Playbook ${playbookKey} has duplicate checklist key "${item.key}" (on item "${item.item}"). Keys must be unique within a playbook.`,
      );
    }
    seenKeys.add(item.key);

    const flags = [
      Boolean(item.stripe_field),
      Boolean(item.narrative_only),
      Boolean(item.stripe_evidence_field),
    ];
    const count = flags.filter(Boolean).length;
    if (count !== 1) {
      const present = [
        item.stripe_field ? "stripe_field" : null,
        item.narrative_only ? "narrative_only" : null,
        item.stripe_evidence_field ? "stripe_evidence_field" : null,
      ].filter(Boolean);
      const detail = present.length === 0 ? "none set" : `set: ${present.join(", ")}`;
      throw new PlaybookInvariantError(
        `Playbook ${playbookKey} item "${item.item}" violates A/T/Slot invariant (${detail}). Exactly one of stripe_field, narrative_only, or stripe_evidence_field must be set.`,
      );
    }
  }
}
```

- [ ] **Step 5: Run tests again — all pass**

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run lib/playbooks/validate.test.ts
```

Expected: all tests in the file PASS.

- [ ] **Step 6: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add backend/lib/playbooks/validate.ts backend/lib/playbooks/validate.test.ts
git commit -m "feat(WIN-40): enforce per-playbook uniqueness of checklist keys"
```

---

## Task 3: Assign stable keys to every playbook data file

**Files:**
- Modify: `backend/lib/playbooks/data/visa-10.4.ts`
- Modify: `backend/lib/playbooks/data/visa-13.1.ts`
- Modify: `backend/lib/playbooks/data/visa-13.2.ts`
- Modify: `backend/lib/playbooks/data/visa-13.3.ts`
- Modify: `backend/lib/playbooks/data/visa-13.6.ts`
- Modify: `backend/lib/playbooks/data/mastercard-4808.ts`
- Modify: `backend/lib/playbooks/data/mastercard-4853.ts`

Each checklist item in each playbook file needs a `key:` property added as the first field (before `item:`). The mapping below is authoritative — DO NOT change any key once this task is committed, since downstream rows will reference them.

### Key map by playbook

**visa-10.4 (13 items, in order):**

| Display label (current `item` text) | Stable `key` |
|---|---|
| Transaction authorization record | `authorization_record` |
| Address verification result | `avs_result` |
| Security code (CVV) verification result | `cvc_verification` |
| Two prior undisputed transactions from the same cardholder (120-365 days before disputed transaction) | `ce3_prior_transactions` |
| IP address or device ID/fingerprint matching across all 3 transactions (disputed + 2 historical) | `ce3_primary_link` |
| Second matching data element across all 3 transactions (user account ID, shipping address, or device ID) | `ce3_secondary_link` |
| Bank verification (3D Secure) authentication proof | `three_d_secure_proof` |
| Delivery confirmation to cardholder's verified billing address | `delivery_to_billing_address` |
| Customer account details (account creation date, purchase history, total prior orders) | `customer_account_details` |
| Access/activity logs proving the customer used the product (for digital goods and SaaS) | `digital_access_logs` |
| Device identifier and IP address of the transaction | `device_and_ip` |
| Bank statement name screenshot showing recognizable business name | `statement_descriptor_proof` |
| Communication with cardholder showing engagement (order confirmation emails opened/clicked, support contacts) | `customer_engagement_communication` |

**visa-13.1 (11 items, in order):**

| Display label | Stable `key` |
|---|---|
| Carrier tracking confirmation with delivery scan | `tracking_delivery_scan` |
| Delivery address verification (matches billing or shipping address on order) | `shipping_address_match` |
| Signed delivery confirmation (for orders over $100) | `signed_delivery` |
| Order confirmation showing agreed delivery date | `order_confirmation_delivery_date` |
| Screenshot of order details (items, quantities, shipping method) | `order_details_screenshot` |
| Communication with customer about delivery (emails, chat logs) | `delivery_communication` |
| Access logs showing customer used the product/service (IP address, login timestamps, download confirmation) | `digital_access_logs` |
| Email delivery confirmation (license key, download link sent to customer's email) | `digital_delivery_email` |
| Terms of service / delivery terms accepted at checkout | `checkout_terms` |
| Service completion documentation or proof of performance | `service_completion` |
| Appointment or scheduling records confirming service date | `appointment_records` |

**visa-13.2 (11 items, in order):**

| Display label | Stable `key` |
|---|---|
| Proof of active subscription at time of charge | `subscription_active_proof` |
| Billing period covered by the disputed charge (service_date) | `billing_period_covered` |
| Customer email address tied to the subscription | `customer_email_subscription` |
| Cancellation policy (terms accepted at signup) | `cancellation_policy_terms` |
| Cancellation request timestamp vs. charge date | `cancellation_request_timestamp` |
| Cancellation confirmation sent to customer | `cancellation_confirmation_sent` |
| Service usage logs after last billing cycle | `post_billing_usage_logs` |
| Subscription agreement / terms of service | `subscription_agreement` |
| Communication history with customer | `customer_communication_history` |
| Refund confirmation (if already refunded) | `refund_confirmation` |
| Proof this is an installment plan, not a recurring transaction | `installment_plan_proof` |

**visa-13.3 (12 items, in order):**

| Display label | Stable `key` |
|---|---|
| Product description as shown at time of purchase (screenshot, listing page) | `product_description_at_purchase` |
| Proof of delivery (tracking number with delivery confirmation) | `delivery_proof` |
| Pre-shipment photos of the actual item | `pre_shipment_photos` |
| Product specifications or detailed listing | `product_specifications` |
| Customer communications about the product (emails, chat logs) | `customer_product_communications` |
| Proof cardholder did NOT attempt to return the merchandise | `no_return_attempt` |
| Refund refusal explanation (if you denied a return or refund request) | `refund_refusal_explanation` |
| Return policy clearly stated at checkout (screenshot or policy page) | `return_policy_at_checkout` |
| Refund or replacement confirmation (if already issued) | `refund_or_replacement_confirmation` |
| Service agreement or scope of work document | `service_agreement` |
| Proof of service delivery (reports, access logs, deliverables, work product) | `service_delivery_proof` |
| Client sign-off or acceptance documentation | `client_signoff` |

**visa-13.6 (10 items, in order):**

| Display label | Stable `key` |
|---|---|
| Refund confirmation / transaction record | `refund_confirmation_record` |
| Refund amount and date matching the dispute | `refund_amount_and_date` |
| Processor confirmation of the credit posting | `processor_credit_confirmation` |
| Return/refund policy as displayed at checkout | `return_refund_policy_at_checkout` |
| Return condition documentation (photos or inspection records) | `return_condition_documentation` |
| Evidence the item was not returned | `no_return_received` |
| Customer communication denying the return | `customer_denial_communication` |
| Order confirmation showing original terms | `order_confirmation_original_terms` |
| Cancellation policy disclosure (if the missing credit relates to a cancelled subscription) | `cancellation_policy_disclosure` |
| Written communication about the return or refund | `written_return_refund_communication` |

**mastercard-4808 (9 items, in order):**

| Display label | Stable `key` |
|---|---|
| Original authorization record with transaction approval number and timestamp | `authorization_record` |
| Final charge record tied to the authorization | `final_charge_tied_to_authorization` |
| Transaction approval number | `approval_number` |
| Currency conversion documentation | `currency_conversion` |
| Tip or gratuity authorization documentation (for restaurant and service merchants) | `tip_gratuity_authorization` |
| Renewed payment approval record (if original authorization expired before the charge was finalized) | `renewed_payment_approval` |
| Timestamp proof that the charge was finalized before the authorization expired | `charge_before_expiry_timestamp` |
| Payment processor transaction log showing the full record from approval to final charge | `processor_transaction_log` |
| Order details matching the authorized amount | `order_details_matching_amount` |

**mastercard-4853 (13 items, in order):**

| Display label | Stable `key` |
|---|---|
| Original product/service description (website listing, catalog page, or order confirmation) | `product_description_original` |
| Proof the item or service matched the description (photos of actual item shipped, quality control records, inspection documentation) | `matched_description_proof` |
| Customer communication logs (emails, chat transcripts, support tickets) | `customer_communication_logs` |
| Return/refund policy as displayed at checkout | `return_refund_policy_at_checkout` |
| Refund refusal explanation (if you denied a return or refund request) | `refund_refusal_explanation` |
| Proof of delivery (tracking confirmation, signature) | `proof_of_delivery` |
| Prior transaction history with the cardholder | `prior_transaction_history` |
| Photos or video of item before shipment (timestamped packing photos showing correct item in good condition) | `pre_shipment_photos` |
| Quality control or inspection records (batch inspection reports, QC checklists) | `qc_inspection_records` |
| Terms of service accepted at checkout | `checkout_terms_of_service` |
| Signed scope of work or service agreement | `signed_scope_of_work` |
| Proof of service delivery (reports, deliverables, login/access logs) | `service_delivery_proof` |
| Milestone sign-offs or approval emails from the customer | `milestone_signoffs` |

- [ ] **Step 1: Add `key` to every item in `visa-10.4.ts`**

For each of the 13 items in `backend/lib/playbooks/data/visa-10.4.ts`, add `key: "<value from table>",` as the first property of the object (immediately above `item:`). Example for the first item:

```typescript
    {
      key: "authorization_record",
      item: "Transaction authorization record",
      category: "mandatory",
      // ...rest unchanged
    },
```

- [ ] **Step 2: Add `key` to every item in `visa-13.1.ts`**

Same pattern, 11 items, using the visa-13.1 table above.

- [ ] **Step 3: Add `key` to every item in `visa-13.2.ts`**

Same pattern, 11 items, using the visa-13.2 table above.

- [ ] **Step 4: Add `key` to every item in `visa-13.3.ts`**

Same pattern, 12 items, using the visa-13.3 table above.

- [ ] **Step 5: Add `key` to every item in `visa-13.6.ts`**

Same pattern, 10 items, using the visa-13.6 table above.

- [ ] **Step 6: Add `key` to every item in `mastercard-4808.ts`**

Same pattern, 9 items, using the mastercard-4808 table above.

- [ ] **Step 7: Add `key` to every item in `mastercard-4853.ts`**

Same pattern, 13 items, using the mastercard-4853 table above.

- [ ] **Step 8: Tighten types test to assert `key` exists on every item**

Edit `backend/lib/playbooks/__tests__/types.test.ts`. Inside the `it("has valid evidence item structure for all checklist items", ...)` block (around line 113-125), add a key assertion:

```typescript
    it("has valid evidence item structure for all checklist items", () => {
      for (const item of playbook.evidence_checklist) {
        expect(item.key.trim()).toBeTruthy();
        expect(item.item.trim()).toBeTruthy();
        expect(VALID_EVIDENCE_CATEGORIES).toContain(item.category);
        // ... rest unchanged
      }
    });
```

Then ADD a new test inside the same `describe.each` block right after:

```typescript
    it("has unique checklist item keys within this playbook", () => {
      const keys = playbook.evidence_checklist.map((item) => item.key);
      expect(new Set(keys).size).toBe(keys.length);
    });
```

- [ ] **Step 9: Run the playbooks test suite**

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run lib/playbooks
```

Expected: all tests pass. If a key is missing or duplicated, the failure message names the playbook and offending item — fix and rerun.

- [ ] **Step 10: Run backend typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: 0 errors in `lib/playbooks/`. Errors elsewhere (in routes/libraries that still use `item.item` as an identifier) are expected and handled in Task 5.

- [ ] **Step 11: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add backend/lib/playbooks/
git commit -m "feat(WIN-40): assign stable keys to all 79 playbook checklist items"
```

---

## Task 4: Write the SQL migration

**Files:**
- Create: `backend/supabase/migrations/011_stable_checklist_keys.sql`

This migration rewrites three columns in one transaction:
1. `evidence_files.checklist_item_key` TEXT — old label (or legacy label) → new stable key.
2. `disputes.checklist_state` JSONB — rebuild with keys instead of labels.
3. `disputes.checklist_notes` JSONB — rebuild with keys instead of labels.

The mapping is hardcoded because the migration must be deterministic. It covers: (a) every current label from Task 3's playbooks; (b) every known historical label that appeared before a rename (the two called out in the WIN-40 issue: `"CVV2 verification result"` and `"3D Secure / Visa Secure authentication proof"`). Rows with labels outside the map keep their existing value and stay orphaned — they were already orphaned before this migration, which is the bug we're paving over.

- [ ] **Step 1: Create the migration file with the label → key map**

Write `backend/supabase/migrations/011_stable_checklist_keys.sql`:

```sql
-- WIN-40: migrate checklist identifiers from display label to stable key.
-- Before this migration: evidence_files.checklist_item_key, disputes.checklist_state
-- keys, and disputes.checklist_notes keys all stored the human-readable label.
-- Renaming a playbook label orphaned every row keyed to the old text.
-- After this migration: all three use the stable key from the playbook definition.
-- The map below covers every current label from visa-10.4/13.1/13.2/13.3/13.6 and
-- mastercard-4808/4853, plus two known historical labels from WIN-19 QA.

BEGIN;

-- Build a one-shot mapping table so we can reuse it across all three updates.
CREATE TEMP TABLE win40_label_map (
  label TEXT PRIMARY KEY,
  stable_key TEXT NOT NULL
) ON COMMIT DROP;

INSERT INTO win40_label_map (label, stable_key) VALUES
  -- visa-10.4
  ('Transaction authorization record', 'authorization_record'),
  ('Address verification result', 'avs_result'),
  ('Security code (CVV) verification result', 'cvc_verification'),
  ('CVV2 verification result', 'cvc_verification'), -- legacy label (WIN-19 QA)
  ('Two prior undisputed transactions from the same cardholder (120-365 days before disputed transaction)', 'ce3_prior_transactions'),
  ('IP address or device ID/fingerprint matching across all 3 transactions (disputed + 2 historical)', 'ce3_primary_link'),
  ('Second matching data element across all 3 transactions (user account ID, shipping address, or device ID)', 'ce3_secondary_link'),
  ('Bank verification (3D Secure) authentication proof', 'three_d_secure_proof'),
  ('3D Secure / Visa Secure authentication proof', 'three_d_secure_proof'), -- legacy label (WIN-19 QA)
  ('Delivery confirmation to cardholder''s verified billing address', 'delivery_to_billing_address'),
  ('Customer account details (account creation date, purchase history, total prior orders)', 'customer_account_details'),
  ('Access/activity logs proving the customer used the product (for digital goods and SaaS)', 'digital_access_logs'),
  ('Device identifier and IP address of the transaction', 'device_and_ip'),
  ('Bank statement name screenshot showing recognizable business name', 'statement_descriptor_proof'),
  ('Communication with cardholder showing engagement (order confirmation emails opened/clicked, support contacts)', 'customer_engagement_communication'),

  -- visa-13.1
  ('Carrier tracking confirmation with delivery scan', 'tracking_delivery_scan'),
  ('Delivery address verification (matches billing or shipping address on order)', 'shipping_address_match'),
  ('Signed delivery confirmation (for orders over $100)', 'signed_delivery'),
  ('Order confirmation showing agreed delivery date', 'order_confirmation_delivery_date'),
  ('Screenshot of order details (items, quantities, shipping method)', 'order_details_screenshot'),
  ('Communication with customer about delivery (emails, chat logs)', 'delivery_communication'),
  -- 'Access logs showing customer used the product/service (IP address, login timestamps, download confirmation)' collides
  -- with visa-10.4's 'digital_access_logs'. Same stable key is intentional — the key is scoped per playbook at lookup
  -- time (dispute_id narrows scope to one reason code), so reuse is safe.
  ('Access logs showing customer used the product/service (IP address, login timestamps, download confirmation)', 'digital_access_logs'),
  ('Email delivery confirmation (license key, download link sent to customer''s email)', 'digital_delivery_email'),
  ('Terms of service / delivery terms accepted at checkout', 'checkout_terms'),
  ('Service completion documentation or proof of performance', 'service_completion'),
  ('Appointment or scheduling records confirming service date', 'appointment_records'),

  -- visa-13.2
  ('Proof of active subscription at time of charge', 'subscription_active_proof'),
  ('Billing period covered by the disputed charge (service_date)', 'billing_period_covered'),
  ('Customer email address tied to the subscription', 'customer_email_subscription'),
  ('Cancellation policy (terms accepted at signup)', 'cancellation_policy_terms'),
  ('Cancellation request timestamp vs. charge date', 'cancellation_request_timestamp'),
  ('Cancellation confirmation sent to customer', 'cancellation_confirmation_sent'),
  ('Service usage logs after last billing cycle', 'post_billing_usage_logs'),
  ('Subscription agreement / terms of service', 'subscription_agreement'),
  ('Communication history with customer', 'customer_communication_history'),
  ('Refund confirmation (if already refunded)', 'refund_confirmation'),
  ('Proof this is an installment plan, not a recurring transaction', 'installment_plan_proof'),

  -- visa-13.3
  ('Product description as shown at time of purchase (screenshot, listing page)', 'product_description_at_purchase'),
  ('Proof of delivery (tracking number with delivery confirmation)', 'delivery_proof'),
  ('Pre-shipment photos of the actual item', 'pre_shipment_photos'),
  ('Product specifications or detailed listing', 'product_specifications'),
  ('Customer communications about the product (emails, chat logs)', 'customer_product_communications'),
  ('Proof cardholder did NOT attempt to return the merchandise', 'no_return_attempt'),
  ('Refund refusal explanation (if you denied a return or refund request)', 'refund_refusal_explanation'),
  ('Return policy clearly stated at checkout (screenshot or policy page)', 'return_policy_at_checkout'),
  ('Refund or replacement confirmation (if already issued)', 'refund_or_replacement_confirmation'),
  ('Service agreement or scope of work document', 'service_agreement'),
  ('Proof of service delivery (reports, access logs, deliverables, work product)', 'service_delivery_proof'),
  ('Client sign-off or acceptance documentation', 'client_signoff'),

  -- visa-13.6
  ('Refund confirmation / transaction record', 'refund_confirmation_record'),
  ('Refund amount and date matching the dispute', 'refund_amount_and_date'),
  ('Processor confirmation of the credit posting', 'processor_credit_confirmation'),
  ('Return/refund policy as displayed at checkout', 'return_refund_policy_at_checkout'),
  ('Return condition documentation (photos or inspection records)', 'return_condition_documentation'),
  ('Evidence the item was not returned', 'no_return_received'),
  ('Customer communication denying the return', 'customer_denial_communication'),
  ('Order confirmation showing original terms', 'order_confirmation_original_terms'),
  ('Cancellation policy disclosure (if the missing credit relates to a cancelled subscription)', 'cancellation_policy_disclosure'),
  ('Written communication about the return or refund', 'written_return_refund_communication'),

  -- mastercard-4808
  ('Original authorization record with transaction approval number and timestamp', 'authorization_record'),
  ('Final charge record tied to the authorization', 'final_charge_tied_to_authorization'),
  ('Transaction approval number', 'approval_number'),
  ('Currency conversion documentation', 'currency_conversion'),
  ('Tip or gratuity authorization documentation (for restaurant and service merchants)', 'tip_gratuity_authorization'),
  ('Renewed payment approval record (if original authorization expired before the charge was finalized)', 'renewed_payment_approval'),
  ('Timestamp proof that the charge was finalized before the authorization expired', 'charge_before_expiry_timestamp'),
  ('Payment processor transaction log showing the full record from approval to final charge', 'processor_transaction_log'),
  ('Order details matching the authorized amount', 'order_details_matching_amount'),

  -- mastercard-4853
  ('Original product/service description (website listing, catalog page, or order confirmation)', 'product_description_original'),
  ('Proof the item or service matched the description (photos of actual item shipped, quality control records, inspection documentation)', 'matched_description_proof'),
  ('Customer communication logs (emails, chat transcripts, support tickets)', 'customer_communication_logs'),
  -- 'Return/refund policy as displayed at checkout' is shared with visa-13.6 under the same key.
  ('Proof of delivery (tracking confirmation, signature)', 'proof_of_delivery'),
  ('Prior transaction history with the cardholder', 'prior_transaction_history'),
  ('Photos or video of item before shipment (timestamped packing photos showing correct item in good condition)', 'pre_shipment_photos'),
  ('Quality control or inspection records (batch inspection reports, QC checklists)', 'qc_inspection_records'),
  ('Terms of service accepted at checkout', 'checkout_terms_of_service'),
  ('Signed scope of work or service agreement', 'signed_scope_of_work'),
  -- 'Proof of service delivery (reports, deliverables, login/access logs)' reuses the visa-13.3 'service_delivery_proof'
  -- key — stable keys are scoped per playbook at lookup time, reuse is safe.
  ('Milestone sign-offs or approval emails from the customer', 'milestone_signoffs')
ON CONFLICT (label) DO NOTHING;

-- 1. evidence_files.checklist_item_key
UPDATE evidence_files ef
SET checklist_item_key = m.stable_key
FROM win40_label_map m
WHERE ef.checklist_item_key = m.label;

-- 2. disputes.checklist_state — rebuild JSONB object with keys remapped.
-- Entries whose old key is not in the map are preserved as-is so we don't
-- silently drop unknown state (it was already orphaned before this migration).
UPDATE disputes d
SET checklist_state = (
  SELECT COALESCE(jsonb_object_agg(
    COALESCE(m.stable_key, entry.key),
    entry.value
  ), '{}'::jsonb)
  FROM jsonb_each(d.checklist_state) AS entry(key, value)
  LEFT JOIN win40_label_map m ON m.label = entry.key
)
WHERE d.checklist_state IS NOT NULL
  AND d.checklist_state <> '{}'::jsonb;

-- 3. disputes.checklist_notes — same pattern.
UPDATE disputes d
SET checklist_notes = (
  SELECT COALESCE(jsonb_object_agg(
    COALESCE(m.stable_key, entry.key),
    entry.value
  ), '{}'::jsonb)
  FROM jsonb_each(d.checklist_notes) AS entry(key, value)
  LEFT JOIN win40_label_map m ON m.label = entry.key
)
WHERE d.checklist_notes IS NOT NULL
  AND d.checklist_notes <> '{}'::jsonb;

COMMIT;
```

- [ ] **Step 2: Dry-check the SQL syntax locally**

```bash
cd /Users/joeb/Projects/WinBack/backend
cat supabase/migrations/011_stable_checklist_keys.sql | head -40
```

Expected: the file reads cleanly with no stray characters. (No local psql run — apply it in Task 9 against dev Supabase via MCP.)

- [ ] **Step 3: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add backend/supabase/migrations/011_stable_checklist_keys.sql
git commit -m "feat(WIN-40): add migration 011 rekeying evidence and checklist JSONB to stable keys"
```

---

## Task 5: Switch backend code from `item.item` to `item.key`

**Files:**
- Modify: `backend/lib/disputes/assemble-evidence.ts:78-90`
- Modify: `backend/lib/disputes/submission-guard.ts:49-58`
- Modify: `backend/lib/narratives/generate-background.ts:149-157`
- Modify: `backend/lib/prompts/build-prompt.ts:93-106`
- Modify: `backend/lib/prompts/types.ts:38-41`

The backend currently uses `item.item` (the label) in four places as an identifier. Each one must switch to `item.key`. None of the user-visible label strings change; only the keyed lookup changes.

- [ ] **Step 1: Swap assemble-evidence's itemByKey to key-based lookup**

Edit `backend/lib/disputes/assemble-evidence.ts` around lines 78-90. Change:

```typescript
  const itemByKey = new Map<string, EvidenceChecklistItem>();
  for (const item of playbook.evidence_checklist) {
    itemByKey.set(item.item, item);
  }
```

to:

```typescript
  const itemByKey = new Map<string, EvidenceChecklistItem>();
  for (const item of playbook.evidence_checklist) {
    itemByKey.set(item.key, item);
  }
```

The `file.checklist_item_key` lookup below it (line 84) is already comparing against whatever we put in the map, so it stays unchanged.

- [ ] **Step 2: Swap submission-guard's missingMandatory to match on key, display label**

Edit `backend/lib/disputes/submission-guard.ts:49-55`. Change:

```typescript
  const filedKeys = new Set(evidenceFiles.map((f) => f.checklist_item_key));
  const missingMandatory = playbook.evidence_checklist
    .filter((i) => i.category === "mandatory")
    .filter((i) => !(i as { narrative_only?: boolean }).narrative_only)
    .filter((i) => !(i as { stripe_field?: boolean }).stripe_field)
    .filter((i) => !filedKeys.has(i.item))
    .map((i) => i.item);
```

to:

```typescript
  const filedKeys = new Set(evidenceFiles.map((f) => f.checklist_item_key));
  const missingMandatory = playbook.evidence_checklist
    .filter((i) => i.category === "mandatory")
    .filter((i) => !(i as { narrative_only?: boolean }).narrative_only)
    .filter((i) => !(i as { stripe_field?: boolean }).stripe_field)
    .filter((i) => !filedKeys.has(i.key))
    .map((i) => i.item);
```

The returned `missingMandatory` list keeps `i.item` — it's displayed to the merchant, so the human label is the right thing to surface.

- [ ] **Step 3: Extend NarrativeOnlyItem with the stable key**

Edit `backend/lib/prompts/types.ts:38-41`:

```typescript
export interface NarrativeOnlyItem {
  key: string;
  item: string;
  fallback?: string;
}
```

- [ ] **Step 4: Pass the key through from generate-background**

Edit `backend/lib/narratives/generate-background.ts:149-157`:

```typescript
      narrative_only_items: (
        (playbook.evidence_checklist ?? []) as Array<{
          key: string;
          item: string;
          narrative_only?: boolean;
          narrative_fallback?: string;
        }>
      )
        .filter((it) => it.narrative_only === true)
        .map((it) => ({ key: it.key, item: it.item, fallback: it.narrative_fallback })),
```

- [ ] **Step 5: Swap build-prompt's narrativeAssertionsList to key-based lookups**

Edit `backend/lib/prompts/build-prompt.ts:93-106`. Change:

```typescript
  const narrativeOnlyItems = context.narrative_only_items ?? [];
  const narrativeAssertionsList = narrativeOnlyItems
    .map((item) => {
      const merchantNote = context.checklist_notes[item.item]?.trim();
      if (merchantNote) {
        return `- "${item.item}": "${merchantNote}" (merchant's own words)`;
      }
      if (item.fallback) {
        return `- "${item.item}": "${item.fallback}" (standard assertion for this reason code)`;
      }
      return null;
    })
    .filter((line): line is string => line !== null)
    .join("\n");
```

to:

```typescript
  const narrativeOnlyItems = context.narrative_only_items ?? [];
  const narrativeAssertionsList = narrativeOnlyItems
    .map((item) => {
      // checklist_notes in Supabase is now keyed by the stable key (WIN-40
      // migration 011). The display label is kept in the emitted line so the
      // LLM sees a human-readable anchor, not an opaque identifier.
      const merchantNote = context.checklist_notes[item.key]?.trim();
      if (merchantNote) {
        return `- "${item.item}": "${merchantNote}" (merchant's own words)`;
      }
      if (item.fallback) {
        return `- "${item.item}": "${item.fallback}" (standard assertion for this reason code)`;
      }
      return null;
    })
    .filter((line): line is string => line !== null)
    .join("\n");
```

- [ ] **Step 6: Run backend typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: 0 errors. If errors remain in prompt/narrative tests, they're handled in Task 7.

- [ ] **Step 7: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add backend/lib/disputes/assemble-evidence.ts backend/lib/disputes/submission-guard.ts backend/lib/narratives/generate-background.ts backend/lib/prompts/build-prompt.ts backend/lib/prompts/types.ts
git commit -m "refactor(WIN-40): backend uses item.key as checklist identifier"
```

---

## Task 6: Switch frontend code from `item.item` to `item.key`

**Files:**
- Modify: `stripe-app/src/components/evidence/EvidenceChecklist.tsx`
- Modify: `stripe-app/src/components/evidence/ChecklistItem.tsx:114, 235`
- Modify: `stripe-app/src/components/narrative/NarrativePreGeneration.tsx:53-56, 139, 172`
- Modify: `stripe-app/src/components/submit/SubmitView.tsx:60`

All four maps (`checklistState`, `notesState`, `filesState`, `expandedSections`) and all callbacks (`handleToggle`, `handleNotesChange`, `handleFileChange`, `handleSectionToggle`) are currently keyed by `item.item` in `EvidenceChecklist.tsx`. All of them switch to `item.key`. The display text (JSX, aria-labels) keeps `item.item` because that's what the merchant reads.

- [ ] **Step 1: Switch EvidenceChecklist.tsx's state keying from label to key**

Edit `stripe-app/src/components/evidence/EvidenceChecklist.tsx`. Replace every `item.item` that is used as a state key with `item.key`. Keep `item.item` only where it is rendered to the user or used as a React `key` prop. Concretely:

In `buildInitialState` (lines 44-60):

```typescript
function buildInitialState(
  items: EvidenceChecklistItem[],
  dispute: Dispute,
): ChecklistState {
  const state: ChecklistState = {};
  for (const item of items) {
    state[item.key] = false;
    const result = getStripeFieldResult(item, dispute);
    if (result?.status === 'positive') {
      state[item.key] = true;
    }
  }
  if (dispute.checklist_state) {
    for (const [key, value] of Object.entries(dispute.checklist_state)) {
      if (key in state) {
        state[key] = value;
      }
    }
  }
  return state;
}
```

In the initial `expandedSections` setup (lines 74-84):

```typescript
  const [expandedSections, setExpandedSections] = useState<Map<string, Set<ExpandedSection>>>(
    () => {
      const initial = new Map<string, Set<ExpandedSection>>();
      for (const item of items) {
        if (item.narrative_only) {
          initial.set(item.key, new Set<ExpandedSection>(['notes']));
        }
      }
      return initial;
    }
  );
```

In the playbook-change effect (lines 95-110) — same swap in the inner loop:

```typescript
    const nextExpanded = new Map<string, Set<ExpandedSection>>();
    for (const item of items) {
      if (item.narrative_only) {
        nextExpanded.set(item.key, new Set<ExpandedSection>(['notes']));
      }
    }
    setExpandedSections(nextExpanded);
```

In the fetchFiles effect (lines 113-130) — `filesState` is keyed by `file.checklist_item_key`, which is now the stable key, so this block is already correct; no change.

In progress count (line 275):

```typescript
  const completedItems = items.filter((item) => checklistState[item.key]).length;
```

In the render loop (lines 318-339):

```typescript
          {groupItems.map((item) => {
            const stripeResult = getStripeFieldResult(item, dispute);
            return (
              <ChecklistItem
                key={item.key}
                item={item}
                checked={!!checklistState[item.key]}
                stripeFieldResult={stripeResult ?? undefined}
                expandedSections={expandedSections.get(item.key) ?? new Set()}
                notes={notesState[item.key] ?? ''}
                existingFile={filesState[item.key] ?? null}
                disputeId={dispute.id}
                context={contextRef.current}
                onToggle={() => handleToggle(item.key)}
                onSectionToggle={(section) => handleSectionToggle(item.key, section)}
                onNotesChange={(value) => handleNotesChange(item.key, value)}
                onSaveNotes={flushNotes}
                onFileChange={(file) => handleFileChange(item.key, file)}
                submitted={submitted}
              />
            );
          })}
```

Rename the callback parameter names for clarity: `itemName` → `itemKey` in `handleToggle`, `handleNotesChange`, `handleFileChange`, `handleSectionToggle`. Search-and-replace in this file only:

```typescript
  const handleToggle = useCallback((itemKey: string) => {
    setChecklistState((prev) => {
      const newState = { ...prev, [itemKey]: !prev[itemKey] };
      persistChecklist(newState);
      return newState;
    });
  }, [persistChecklist]);

  const handleNotesChange = useCallback((itemKey: string, value: string) => {
    setNotesState((prev) => {
      const newNotes = { ...prev, [itemKey]: value };
      persistNotes(newNotes);
      return newNotes;
    });
  }, [persistNotes]);

  const handleFileChange = useCallback((itemKey: string, file: EvidenceFile | null) => {
    setFilesState((prev) => ({ ...prev, [itemKey]: file }));
  }, []);

  const handleSectionToggle = useCallback((itemKey: string, section: ExpandedSection) => {
    setExpandedSections((prev) => {
      const next = new Map(prev);
      const sections = new Set(prev.get(itemKey) ?? []);
      if (sections.has(section)) {
        sections.delete(section);
      } else {
        sections.add(section);
      }
      next.set(itemKey, sections);
      return next;
    });
  }, []);
```

- [ ] **Step 2: Pass the stable key (not the label) into ChecklistItem's FileUploadSection**

Edit `stripe-app/src/components/evidence/ChecklistItem.tsx:235` — change `checklistItemKey={item.item}` to `checklistItemKey={item.key}`. Keep `aria-label={item.item}` (line 114) and the rendered label text (line 123) as-is — that's the display surface.

- [ ] **Step 3: Switch NarrativePreGeneration.tsx's filesByKey lookup**

Edit `stripe-app/src/components/narrative/NarrativePreGeneration.tsx`. Lines 52-58 become:

```typescript
  const itemStatuses = checklistItems.map((item) => {
    const matchedFile = filesByKey.get(item.key);
    const stripeField = getStripeFieldResult(item, dispute);
    const autoFilled = stripeField?.status === 'positive';
    const hasMerchantNote = !!(checklistNotes[item.key]?.trim());
    const isNarrativeOnly = !!item.narrative_only;
    const satisfied = !!matchedFile || autoFilled || isNarrativeOnly;
    // ... rest unchanged
```

And line 139 `<Box key={item.item}` becomes `<Box key={item.key}`. Leave line 172 `{item.item}` as-is — it's the displayed label.

- [ ] **Step 4: Switch SubmitView's filed.has check**

Edit `stripe-app/src/components/submit/SubmitView.tsx:60`:

```typescript
    (i) => i.stripe_field || i.narrative_only || filed.has(i.key),
```

The `filed` Set is populated from `evidence_files` rows (which now contain keys post-migration), so this lookup now matches by key too.

- [ ] **Step 5: Frontend typecheck**

```bash
cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add stripe-app/src/components/
git commit -m "refactor(WIN-40): frontend uses item.key for state, files, notes identity"
```

---

## Task 7: Update unit + integration test fixtures to use stable keys

**Files:**
- Modify: `backend/lib/prompts/__tests__/build-prompt.test.ts`
- Modify: `backend/lib/disputes/assemble-evidence.test.ts`
- Modify: `backend/lib/disputes/submission-guard.test.ts`
- Modify: `backend/lib/narratives/__tests__/generate-background.test.ts`
- Modify: `backend/lib/narratives/__tests__/validate-hallucinations.test.ts`
- Modify: `backend/scripts/smoke-test-narrative.ts`
- Modify: `backend/app/api/disputes/[disputeId]/submit/__tests__/route.test.ts`
- Modify: `backend/app/api/disputes/[disputeId]/evidence-files/__tests__/route.test.ts`
- Modify: `backend/__tests__/integration/fixtures.ts`
- Modify: `backend/__tests__/integration/dispute-wizard-flow.test.ts:504-507`

Fixtures in these files currently use label strings as `checklist_item_key`. Post-WIN-40 they must use the stable key. No semantics change — only the string constant.

- [ ] **Step 1: Update build-prompt tests**

Edit `backend/lib/prompts/__tests__/build-prompt.test.ts`. In `makeContext` (around lines 24-35), replace:

```typescript
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
```

with:

```typescript
    evidence_files: [
      {
        checklist_item_key: "tracking_delivery_scan",
        file_name: "tracking-screenshot.pdf",
      },
    ],
    checklist_notes: {
      tracking_delivery_scan: "FedEx tracking 7891234, delivered Mar 18",
    },
```

In the test assertions around lines 77-92, update:

- line 80 stays — `tracking-screenshot.pdf` is the file name, unchanged.
- line 81 — change the expected to use the stable key as the emitted anchor IF prompt-builder is now keyed by key. Review build-prompt.ts line 79 — it emits `- "${f.checklist_item_key}": ${f.file_name}`. Since `checklist_item_key` is now the stable key, the test should expect the key in the emitted text. Replace:

```typescript
  it("includes evidence files", () => {
    const result = buildPrompt(makeContext());
    expect(result.user).toContain("tracking-screenshot.pdf");
    expect(result.user).toContain("tracking_delivery_scan");
  });
```

And for the `not-uploaded` assertion around line 88-92, this comes from `allEvidenceKeys` in build-prompt.ts, which is populated from template's `section.evidence_keys`. That template array is hardcoded in `backend/lib/prompts/templates/*.ts` — review that file next step.

For `narrative_only_items` assertion blocks at lines 169, 189, 209 — each passes test items that need `key` added. Apply the default test helper pattern: inside each test, prefix the items with `{ key: "test_key_1", item: "...", fallback: "..." }` / `{ key: "test_key_2", ... }`. (The tests in build-prompt.test.ts operate on hand-constructed context objects, not real playbook data, so key strings here are arbitrary non-empty strings.)

- [ ] **Step 2: Update prompt templates to use stable keys**

Edit `backend/lib/prompts/templates/*.ts`. Check what strings are in `evidence_keys` arrays. They currently match playbook `item` text. After WIN-40 they must match the corresponding stable keys from Task 3. This keeps `buildSectionsBlock` (build-prompt.ts line 46) matching uploaded files against template evidence_keys via the new stable-key namespace.

Run:

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run lib/prompts
```

Read the failure output. For each `(not uploaded)` assertion that references a label string, update both the template file's `evidence_keys` entry AND the assertion to use the corresponding stable key. The mapping is the same Task 3 table.

- [ ] **Step 3: Update assemble-evidence tests**

Edit `backend/lib/disputes/assemble-evidence.test.ts`. The test fixtures on lines 100, 124, 125, 156, 157, 182, 183 use invented `checklist_item_key` values like `"Delivery"`, `"Email"`, `"A"`, `"B"`. These only need to match the keys of the invented playbook fixtures in the same file. Search for the mock playbook definitions in this file and ensure each `item.key` matches the `checklist_item_key` used in the corresponding `evidence_files` rows. (The test fixtures build their own mini-playbooks; they do not reference real data.)

Run:

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run lib/disputes/assemble-evidence.test.ts
```

Expected: green after fixtures are aligned.

- [ ] **Step 4: Update submission-guard tests**

Edit `backend/lib/disputes/submission-guard.test.ts`. Same pattern — wherever a test creates a playbook with a mandatory item and an evidence_files array, make the item's `key` match the row's `checklist_item_key`. Example line 41 `evidenceFiles: [{ checklist_item_key: "Mandatory A" }]` — find the corresponding fake playbook item nearby and set `key: "Mandatory A"` on it (or rename both to a tidier identifier).

Run:

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run lib/disputes/submission-guard.test.ts
```

Expected: green.

- [ ] **Step 5: Update narrative generation and hallucination tests**

Edit `backend/lib/narratives/__tests__/generate-background.test.ts` lines 123-124 — change the fixture keys from labels to the stable keys (`service_terms`, `delivery_receipt` are already tidy identifiers; leave them but make sure they match the test's fake playbook items). Edit `backend/lib/narratives/__tests__/validate-hallucinations.test.ts` lines 19, 41, 64 — `tracking_number` is already a key-shaped string; if the surrounding test fixture has a playbook item, add `key: "tracking_number"`.

Run:

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run lib/narratives
```

Expected: green.

- [ ] **Step 6: Update smoke-test-narrative and route tests**

Edit `backend/scripts/smoke-test-narrative.ts` lines 43, 47, 85 — swap legacy label strings for the corresponding stable keys from Task 3:
- `"Carrier tracking confirmation with delivery scan"` → `"tracking_delivery_scan"`
- `"Signed delivery confirmation or proof of delivery"` → `"signed_delivery"`
- `"Customer correspondence or email communication"` → `"delivery_communication"`

Edit `backend/app/api/disputes/[disputeId]/evidence-files/__tests__/route.test.ts` — every `checklist_item_key: "receipt"` already looks key-shaped; verify the corresponding playbook item fixtures use `key: "receipt"` matching, or pick a real key from a loaded playbook if that's what the test uses.

Edit `backend/app/api/disputes/[disputeId]/submit/__tests__/route.test.ts` — same check for the `checklist_item_key: "receipt"` entries.

Run:

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run app/api/disputes lib
```

Expected: all green.

- [ ] **Step 7: Update integration test fixtures**

Edit `backend/__tests__/integration/fixtures.ts:14-15`:

```typescript
// The checklist item key we upload evidence under. Matches the stable key
// `delivery_to_billing_address` defined in the visa-10.4 playbook (WIN-40).
export const TEST_CHECKLIST_ITEM_KEY = "delivery_to_billing_address";
```

Also update the narrative text in `CANNED_NARRATIVE_OUTPUT` (lines 92-97) — it embeds `TEST_CHECKLIST_ITEM_KEY` into the narrative body. Since the stable key is opaque (`delivery_to_billing_address` doesn't read well), swap in a human phrase:

```typescript
export const CANNED_NARRATIVE_OUTPUT: NarrativeOutput = {
  narrative:
    `**Delivery Confirmation**\n` +
    `We have uploaded the delivery confirmation document ` +
    `showing the order was delivered to the cardholder's verified billing address.\n\n` +
    `**Summary**\n` +
    `This transaction is legitimate and should not be treated as fraud.`,
  annotations: [
    {
      section: "Delivery Confirmation",
      reasoning:
        "References the uploaded evidence file for the verified billing address delivery.",
    },
  ],
};
```

Edit `backend/__tests__/integration/dispute-wizard-flow.test.ts:504-507`. Those `ITEM_KEY_A` / `ITEM_KEY_B` are labels. Replace with the new stable keys from visa-13.1:

```typescript
    // visa-13.1 has two checklist items that both map to the
    // customer_communication slot: delivery_communication and digital_delivery_email.
    const ITEM_KEY_A = "delivery_communication";
    const ITEM_KEY_B = "digital_delivery_email";
```

- [ ] **Step 8: Run the integration test**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm run test:integration
```

Expected: green in ~3 seconds. If a dev-DB row still has a label-keyed entry left over from earlier testing, `cleanupTestData` in `beforeAll`/`afterAll` should clear it; if not, manually delete the TEST_ACCOUNT_ID merchant row via Supabase SQL before re-running.

- [ ] **Step 9: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add backend/lib backend/scripts backend/app backend/__tests__
git commit -m "test(WIN-40): update unit + integration fixtures to use stable keys"
```

---

## Task 8: Add a regression test proving label renames don't orphan files

**Files:**
- Modify: `backend/lib/playbooks/__tests__/types.test.ts` (append)

This test is the durable guard for AC #4 ("Renaming `item` in a playbook does not orphan uploaded files"). It's a pure unit test — no DB — that exercises the assemble-evidence matching layer with a clone of a real playbook whose display labels have been munged, and confirms files keyed by stable key still resolve.

- [ ] **Step 1: Write the regression test**

Append to `backend/lib/playbooks/__tests__/types.test.ts`:

```typescript
describe("WIN-40 regression: stable keys survive label renames", () => {
  it("assembleEvidence finds files after every display label is rewritten", async () => {
    const { assembleEvidence } = await import("../../disputes/assemble-evidence");
    const visa104 = ALL_PLAYBOOKS.find(
      (p) => p.network === "visa" && p.reason_code === "10.4",
    );
    if (!visa104) throw new Error("visa-10.4 playbook not loaded");

    // Clone the playbook and rewrite every display label. Keys are preserved.
    const mutated = {
      ...visa104,
      evidence_checklist: visa104.evidence_checklist.map((item) => ({
        ...item,
        item: `!!! RENAMED: ${item.item} !!!`,
      })),
    };

    const fakeCharge = {
      id: "ch_test",
      payment_method_details: { card: { checks: {} } },
      billing_details: { name: "Test", address: null },
      refunds: { data: [] },
    } as unknown as import("stripe").default.Charge;

    // Upload a file keyed to a slot-bearing item's stable key.
    const slotItem = visa104.evidence_checklist.find(
      (i) => i.stripe_evidence_field === "shipping_documentation",
    );
    if (!slotItem) throw new Error("no shipping_documentation item in visa-10.4");

    const result = await assembleEvidence({
      charge: fakeCharge,
      playbook: mutated,
      evidenceFiles: [
        {
          id: "ef1",
          checklist_item_key: slotItem.key,
          stripe_file_id: "file_test_abc",
          file_name: "tracking.pdf",
          file_size: 1000,
          mime_type: "application/pdf",
        },
      ],
      narrativeText: null,
      stripeClient: {
        downloadStripeFile: async () => Buffer.from([]),
        uploadCombinedEvidence: async () => "file_combined",
      },
    });

    // The uploaded file must have landed in its Stripe slot, proving label drift
    // did not orphan it.
    expect(result.evidence[slotItem.stripe_evidence_field!]).toBe("file_test_abc");
  });
});
```

- [ ] **Step 2: Run the regression test**

```bash
cd /Users/joeb/Projects/WinBack/backend
npx vitest run lib/playbooks/__tests__/types.test.ts
```

Expected: green. A failure here means the backend is still matching on label somewhere — fix that before proceeding.

- [ ] **Step 3: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add backend/lib/playbooks/__tests__/types.test.ts
git commit -m "test(WIN-40): regression test proving stable keys survive label renames"
```

---

## Task 9: Apply migration, reseed, full test pass, manual smoke

**Files:** none (ops)

- [ ] **Step 1: Reseed playbooks to dev Supabase**

```bash
cd /Users/joeb/Projects/WinBack/backend
set -a && source .env.local && set +a && npm run seed:playbooks
```

Expected: seeds 7 playbooks without error. The `playbooks` table JSONB now includes `key` on every evidence_checklist item.

- [ ] **Step 2: Apply migration 011 against dev Supabase**

Use the Supabase MCP (or Supabase dashboard SQL editor) to run the contents of `backend/supabase/migrations/011_stable_checklist_keys.sql` against WinBack's dev project. Sanity-check after:

```sql
SELECT checklist_item_key, COUNT(*)
FROM evidence_files
GROUP BY checklist_item_key
ORDER BY 1;
```

Expected: all rows have stable-key values (no label strings). Any remaining label-shaped value indicates an unmapped legacy label — investigate whether that row still matters or drop it manually.

- [ ] **Step 3: Run all backend tests**

```bash
cd /Users/joeb/Projects/WinBack/backend
npm test
npm run test:integration
```

Expected: all green.

- [ ] **Step 4: Run frontend typecheck + stripe-app build**

```bash
cd /Users/joeb/Projects/WinBack/stripe-app
npx tsc --noEmit
npm run build
```

Expected: 0 type errors, build succeeds.

- [ ] **Step 5: Manual smoke test — rename a label and confirm files still match**

1. In `backend/lib/playbooks/data/visa-10.4.ts`, temporarily change the CVC item's `item` field from `"Security code (CVV) verification result"` to `"CVC verification (temporary test rename)"`. DO NOT change its `key` (`cvc_verification`).
2. Reseed: `cd backend && set -a && source .env.local && set +a && npm run seed:playbooks`.
3. Run the integration test: `cd backend && npm run test:integration`. Expected: passes. This is the end-to-end proof — the display label moved, the stable key did not, and the flow still resolves.
4. Revert the file change: `git checkout backend/lib/playbooks/data/visa-10.4.ts`.
5. Reseed once more to restore the original label in the `playbooks` table: `cd backend && npm run seed:playbooks`.

- [ ] **Step 6: Push the branch and open a PR**

```bash
cd /Users/joeb/Projects/WinBack
git push -u origin joebenscoter/win-40-stable-checklist-keys
gh pr create --title "fix(WIN-40): stable keys for evidence checklist items" --body "$(cat <<'EOF'
## Summary
- Adds a stable `key` field to every evidence checklist item in the playbook schema and populates keys across all 7 playbooks.
- Rewrites runtime identifiers (`evidence_files.checklist_item_key`, `disputes.checklist_state`, `disputes.checklist_notes`) to use the stable key instead of the display label.
- Display labels (`item`) can now be rewritten freely without orphaning uploaded files, checklist state, or merchant notes.

## Test plan
- [x] Unit: `vitest run` (backend, stripe-app)
- [x] Integration: `npm run test:integration` (backend)
- [x] Regression: new test in `types.test.ts` mutates every display label and confirms file slots still resolve
- [x] Manual: temporarily rename a playbook label, reseed, run integration test — passes; revert + reseed

Fixes WIN-40.
EOF
)"
```

---

## Self-Review Checklist

Run through these before marking the plan executed:

1. **Spec coverage** — every AC in the Linear issue maps to a task:
   - AC1 "stable `key` field distinct from `item`" → Tasks 1, 3
   - AC2 "DB migration converts existing `checklist_item_key`" → Task 4
   - AC3 "Evidence upload, Checklist, Narrative pre-gen use `item.key`" → Tasks 5, 6
   - AC4 "renaming label does not orphan files" → Task 8 (unit regression) + Task 9 Step 5 (manual smoke)
2. **Placeholders** — scan plan for "TBD", "handle edge cases", "etc." outside explicit per-file edit tables.
3. **Type consistency** — `EvidenceChecklistItem.key` is added in Task 1, consumed in every task after. `NarrativeOnlyItem` gains `key: string` in Task 5 Step 3 and is consumed by Task 5 Steps 4-5.

---

## Known follow-ups out of scope for WIN-40

- `stripe-app/src/lib/types.ts` `EvidenceChecklistItem` still does not mirror `stripe_evidence_field` from the backend type. Unrelated pre-existing drift; leave for a separate cleanup.
- The `narrative_fallback` field on the backend type is also not on the frontend type; see above.
- Migration 011 does not drop-and-rebuild indexes -- the `uq_evidence_files_dispute_item` unique constraint on `(dispute_id, checklist_item_key)` is still valid post-migration because the update rewrites values, not rows.

---

## Post-execution notes (2026-04-16)

### Rules of playbook edits, post-WIN-40

For future editors of `backend/lib/playbooks/data/*.ts`:

| What you change | Reseed suffices | Notes |
|---|---|---|
| `item` (display label) | YES | Point of WIN-40. Edit freely. |
| `why_matters`, `where_to_find` | YES | Pure copy. |
| `narrative_fallback` | YES | Per-playbook canned assertion. |
| All non-checklist copy (coach_*, pro_tips, common_mistakes, narrative_template, etc.) | YES | Copy-only. |
| `key` | **NO** | Orphans every row keyed to the old value. Never change. |
| `stripe_field` / `stripe_evidence_field` / `narrative_only` | NO | Changes assembly behavior for existing uploads. |
| Adding a new checklist item | YES | Future uploads work; existing disputes won't have it populated. |
| Removing a checklist item | NO (orphans) | Files stay in Stripe; `evidence_files` rows become unreachable from the UI. Run a manual cleanup + migration if you need to remove. |

### Migration 011 run against dev Supabase

- Pre-flight collision check returned empty -- no visa-10.4 legacy-label collisions in dev data.
- 31 `evidence_files` rows updated from label to stable key.
- 0 rows lost, 0 collisions.
- `disputes.checklist_state` and `disputes.checklist_notes` rebuild ran on a small number of rows with test data; no ghost keys surfaced.

### Coverage debt found during Task 7 review (pre-existing, not fixed here)

Several playbook items don't have corresponding sections in their prompt templates (`backend/lib/prompts/templates/*.ts`). Files uploaded under these keys will appear in the prompt as uploaded evidence but won't be associated with a named narrative section:

- `visa-13.2`: `customer_email_subscription`, `installment_plan_proof`
- `visa-13.3`: `service_agreement`, `service_delivery_proof`, `client_signoff`
- `mastercard-4808`: `renewed_payment_approval`, `charge_before_expiry_timestamp`
- `mastercard-4853`: `signed_scope_of_work`, `service_delivery_proof`, `milestone_signoffs`

Not blocking -- the LLM still receives the file reference -- but worth a follow-up to improve narrative quality on disputes that use these items.

### Improvement flagged during Task 5 review

`backend/lib/disputes/assemble-evidence.ts` silently `continue`s when `itemByKey.get(file.checklist_item_key)` returns `undefined`. Pre-existing (existed before WIN-40), but now more visible because a typo in `key` on a new playbook item would cause files to silently drop from the Stripe submission. Worth adding a warning in `assembly.warnings` for files that don't map to any playbook item. Follow-up.

### Env setup gotcha

When running `npm run test:integration` locally, Node's `process.loadEnvFile` does not overwrite existing env vars. If your shell has an empty `ANTHROPIC_API_KEY` set (easy to accidentally inherit), the integration test fails with "Missing ANTHROPIC_API_KEY" despite the key being correctly set in `.env.local`. Workaround: `unset ANTHROPIC_API_KEY && npm run test:integration`. Unrelated to WIN-40 but cost 15 minutes to diagnose.

### Files in Stripe vs. metadata in our backend

For the record: the actual evidence file bytes flow directly from the merchant's browser to Stripe via `StripeFileUploader` in the iframe. They never touch Vercel. What WIN-40 fixed is the *linking metadata* in our backend (`evidence_files.checklist_item_key`, `disputes.checklist_state` and `checklist_notes` JSONB keys) that associates Stripe file IDs with playbook items. Renaming a label no longer breaks that association.
