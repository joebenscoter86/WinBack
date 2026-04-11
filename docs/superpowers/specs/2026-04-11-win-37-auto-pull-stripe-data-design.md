# WIN-37: Auto-Pull Stripe Transaction Data into Evidence Checklist

## Problem

Merchants see checklist items like "AVS result" and "CVV verification result" and don't know what those are or where to find them. But we already have this data from the Stripe API. We should pull it in automatically, show the actual values, and carry it through to evidence submission so the merchant never has to touch it.

This is the "TurboTax pre-fills from your W-2" moment for WinBack.

## Scope

- **Phase 1 (implement now):** Auto-pull data from Stripe, display in checklist with values and badges
- **Phase 2 (design now, implement with WIN-20):** Pre-populate Stripe Disputes API evidence payload from auto-pulled data

## Dependencies

- WIN-14 (evidence checklist) -- done
- WIN-20 (evidence submission) -- Phase 2 depends on this

---

## Phase 1: Auto-Pull + Display

### 1. New fields on `WinBackDispute`

Extend `normalizeDispute()` in `backend/lib/stripe/normalize.ts` to extract these fields from the Stripe Charge and PaymentIntent:

| New field | Type | Stripe source |
|---|---|---|
| `avs_address_check` | `string \| undefined` | `payment_method_details.card.checks.address_line1_check` |
| `avs_zip_check` | `string \| undefined` | `payment_method_details.card.checks.address_postal_code_check` |
| `cvc_check` | `string \| undefined` | `payment_method_details.card.checks.cvc_check` |
| `three_d_secure_result` | `string \| undefined` | `payment_intent.payment_method_options.card.three_d_secure.result` |
| `three_d_secure_version` | `string \| undefined` | `payment_intent.payment_method_options.card.three_d_secure.version` |
| `authorization_code` | `string \| undefined` | `charge.payment_method_details.card.authorization_code` or `charge.outcome.seller_message` |
| `network_status` | `string \| undefined` | `charge.outcome.network_status` |
| `refunds` | `Array<{amount: number; created: number; status: string}> \| undefined` | `charge.refunds.data` (mapped to minimal shape) |

**Implementation notes:**
- `payment_method_details.card.checks` is already partially accessed (we read `brand` and `last4` from `card`). The `checks` sub-object is on the same card object.
- For 3DS: the PaymentIntent needs expanding. The detail route currently expands `charge.customer`. Add `payment_intent` to the expand list so we get `payment_intent.payment_method_options`.
- For refunds: `charge.refunds` is a list object on the charge. May need `charge.refunds` in the expand list, or it may be included by default.

### 2. Type updates

Add the same 8 fields to:
- `WinBackDispute` interface in `backend/lib/stripe/normalize.ts`
- `Dispute` interface in `stripe-app/src/lib/types.ts`

### 3. Playbook `stripe_field` mapping

Add an optional `stripe_field` property to `EvidenceChecklistItem`:

```typescript
interface EvidenceChecklistItem {
  // ... existing fields
  stripe_field?: string;  // Key mapping this item to a WinBackDispute field
}
```

Update both type definitions:
- `backend/lib/playbooks/types.ts` (or wherever PlaybookData types live)
- `stripe-app/src/lib/types.ts`

#### Field assignments across all playbooks

**visa-10.4 (Fraud -- Card Not Present):**
| Item | `stripe_field` |
|---|---|
| Transaction authorization record | `authorization` |
| Address verification result | `avs_result` |
| Security code (CVV) verification result | `cvc_check` |
| Bank verification (3D Secure) authentication proof | `three_d_secure` |

**visa-13.2 (Subscription Canceled):**
| Item | `stripe_field` |
|---|---|
| Customer email address tied to the subscription | `customer_email` |

**visa-13.6 (Credit Not Processed):**
| Item | `stripe_field` |
|---|---|
| Refund confirmation / transaction record | `refund_data` |
| Refund amount and date matching the dispute | `refund_data` |

**mastercard-4808 (Authorization-Related):**
| Item | `stripe_field` |
|---|---|
| Original authorization record with transaction approval number and timestamp | `authorization` |
| Transaction approval number | `authorization` |

**All other playbooks:** No `stripe_field` assignments. Their items require merchant-provided evidence (photos, screenshots, communications, etc.).

### 4. Auto-populate resolver

Replace the string-matching `isAutoPopulated()` function in `EvidenceChecklist.tsx` with a field-based resolver:

```typescript
function getAutoPopulatedValue(
  item: EvidenceChecklistItem,
  dispute: Dispute
): string | null {
  if (!item.stripe_field) return null;
  // Look up the stripe_field and return formatted value, or null
}
```

**Formatter map** -- translates raw Stripe values to merchant-friendly strings:

| `stripe_field` | Raw value | Display string |
|---|---|---|
| `avs_result` | `pass`/`pass` | "Address: match, ZIP: match" |
| `avs_result` | `pass`/`fail` | "Address: match, ZIP: no match" |
| `avs_result` | `fail`/`fail` | "Address: no match, ZIP: no match" |
| `avs_result` | `unavailable`/`unavailable` | "Not checked" |
| `cvc_check` | `pass` | "CVV verified" |
| `cvc_check` | `fail` | "CVV: no match" |
| `cvc_check` | `unavailable` | "CVV not checked" |
| `three_d_secure` | `authenticated` | "Verified by bank (3DS)" |
| `three_d_secure` | `attempt_acknowledged` | "Bank verification attempted" |
| `three_d_secure` | null/undefined | null (not auto-populated) |
| `authorization` | code + `approved_by_network` | "Approved (auth code: ABC123)" |
| `customer_email` | email string | Shows the email directly |
| `billing_address` | address string | Shows the address directly |
| `transaction_date` | unix timestamp | Formatted date string |
| `receipt_url` | URL string | "Receipt available" |
| `refund_data` | refund array | "Refund of $X.XX on [date]" |

### 5. Frontend display changes

In `ChecklistItem.tsx`, when an item is auto-populated:

1. **Badge** (existing): `FROM STRIPE` badge already renders via the `autoPopulated` prop
2. **Inline value** (new): Show the formatted value on a new line below the item name, in `caption` font with `secondary` color
3. **Reassuring "where to find"** (new): When auto-populated, the "Where to find this" expandable section shows: "We pulled this from your transaction -- you're covered here." instead of the generic Stripe Dashboard instructions
4. **Override support**: Checkbox remains toggleable. Merchant can uncheck to indicate they want to provide different evidence. The auto-populated value still displays as reference.

### 6. Expand parameter changes

The dispute detail API route (`backend/app/api/disputes/[disputeId]/route.ts`) currently expands `charge.customer`. Update to also expand `payment_intent` for 3DS data:

```typescript
const dispute = await getDispute(accountId, disputeId, [
  "charge.customer",
  "payment_intent",
]);
```

The list route (`backend/app/api/disputes/route.ts`) expands `data.charge.customer`. For the list view, we do NOT need the extra fields (they're only shown in the detail/evidence view). No change needed to the list route.

---

## Phase 2: Auto-Populate Evidence Submission (Design Only)

When WIN-20 builds the evidence submission flow, auto-pulled data should pre-populate the Stripe Disputes API evidence payload.

### Evidence field mapping

| Auto-pulled field | Stripe `dispute.evidence` field | Notes |
|---|---|---|
| `receipt_url` | `evidence.receipt` | Stripe auto-attaches if available |
| `customer_email` | `evidence.customer_email_address` | String field |
| `billing_address` | `evidence.billing_address` | String field |
| `transaction_date` | `evidence.service_date` | For subscription disputes |
| 3DS proof | `evidence.uncategorized_text` | Include as narrative text: "Transaction was authenticated via 3D Secure (result: authenticated)" |
| AVS/CVC results | N/A | Stripe automatically includes these in the evidence package. No manual mapping needed. |
| `authorization_code` | `evidence.uncategorized_text` | Include in narrative |
| `refund_data` | `evidence.refund_policy_disclosure` context | Reference in narrative |

### Pre-population behavior

- When the merchant reaches the submission step, any evidence fields with auto-pulled data are pre-filled
- Pre-filled fields are visually distinct (similar to Phase 1's auto-populate treatment)
- Merchant can edit or clear any pre-filled value
- The submission payload merges auto-pulled + merchant-provided evidence

---

## Files to modify (Phase 1)

| File | Change |
|---|---|
| `backend/lib/stripe/normalize.ts` | Add 8 new fields to `WinBackDispute`, extract in `normalizeDispute()` |
| `backend/app/api/disputes/[disputeId]/route.ts` | Add `payment_intent` to expand list |
| `stripe-app/src/lib/types.ts` | Add 8 new fields to `Dispute`, add `stripe_field` to `EvidenceChecklistItem` |
| `backend/lib/playbooks/types.ts` | Add `stripe_field` to `EvidenceChecklistItem` type |
| `backend/lib/playbooks/data/visa-10.4.ts` | Add `stripe_field` to 4 items |
| `backend/lib/playbooks/data/visa-13.2.ts` | Add `stripe_field` to 1 item |
| `backend/lib/playbooks/data/visa-13.6.ts` | Add `stripe_field` to 2 items |
| `backend/lib/playbooks/data/mastercard-4808.ts` | Add `stripe_field` to 2 items |
| `stripe-app/src/components/evidence/EvidenceChecklist.tsx` | Replace `isAutoPopulated()` with `getAutoPopulatedValue()` |
| `stripe-app/src/components/evidence/ChecklistItem.tsx` | Add inline value display, update "where to find" for auto-populated items |

## Verification

1. **Unit test**: `normalizeDispute()` extracts AVS, CVC, 3DS, auth code, refunds from a mock Stripe dispute
2. **Integration test**: Load a visa-10.4 dispute in the Stripe App, verify AVS/CVV/3DS items show "FROM STRIPE" badge with actual values
3. **Manual QA in Stripe test mode**: Create a dispute in test mode, open WinBack, verify auto-populated items display correctly with formatted values
4. **Regression check**: Existing auto-populated items (receipt, email, address, date) still work correctly with the new `stripe_field` approach
5. **Override test**: Uncheck an auto-populated item, verify it saves correctly and doesn't re-auto-check on reload (saved state overrides auto-populate)
