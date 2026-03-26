# WIN-10: Stripe API Client & Backend Routes

**Date:** 2026-03-25
**Status:** Approved
**Linear:** WIN-10

---

## Summary

Build the Stripe API client and backend routes that let the WinBack frontend fetch real dispute, charge, and customer data from the merchant's Stripe account. No OAuth flow needed -- Stripe Apps authorize via installation, and we already have signature-based auth (`fetchStripeSignature` + `withStripeAuth`).

## Auth Model

Stripe Apps use **signature-based authentication**, not OAuth:

1. Merchant installs WinBack from the Stripe App Marketplace -- this grants the permissions declared in `stripe-app.json`
2. Frontend calls `fetchStripeSignature()` which signs `{ user_id, account_id }`
3. Backend verifies the signature via `withStripeAuth` (already built in WIN-31)
4. Backend uses its own `STRIPE_SECRET_KEY` + the `stripeAccount` header (merchant's `account_id`) to make Stripe API calls scoped to that merchant

No tokens to store, no refresh flows, no OAuth redirects.

---

## 1. Stripe API Client

**File:** `backend/lib/stripe/client.ts`

Thin wrapper around the `stripe` Node SDK. Every method takes `accountId` and passes it as the `stripeAccount` option.

```typescript
// Lazy-init (same pattern as supabase.ts)
function getStripe(): Stripe

// Disputes
listDisputes(accountId: string, params?: Stripe.DisputeListParams): Promise<Stripe.Dispute[]>
getDispute(accountId: string, disputeId: string): Promise<Stripe.Dispute>

// Supporting data
getCharge(accountId: string, chargeId: string): Promise<Stripe.Charge>
getCustomer(accountId: string, customerId: string): Promise<Stripe.Customer>
getPaymentIntent(accountId: string, piId: string): Promise<Stripe.PaymentIntent>
```

### Error Handling

Catch Stripe errors, classify into structured codes:

| Stripe Error Type | Code | HTTP Status |
|---|---|---|
| `StripeRateLimitError` | `rate_limit` | 429 |
| `StripeInvalidRequestError` (resource_missing) | `not_found` | 404 |
| `StripeAuthenticationError` | `auth_error` | 403 |
| All other `StripeError` | `stripe_error` | 502 |

No custom retry logic for MVP -- Stripe's SDK handles transient network errors internally.

---

## 2. Backend API Routes

All routes wrapped with `withStripeAuth`. All are `POST` handlers (signature verification requires reading the request body containing the signed `{ user_id, account_id }` payload).

### `POST /api/disputes`

List merchant's active disputes.

- Calls `listDisputes(accountId, { limit: 100 })`
- Enriches each dispute with charge data (customer name, transaction date) via parallel `getCharge` calls
- Upserts merchant record on first call (fire-and-forget)
- Returns normalized `Dispute[]` in WinBack's frontend type shape

### `POST /api/disputes/[disputeId]`

Single dispute with full detail.

- Calls `getDispute(accountId, disputeId)` with `expand: ['charge.customer']`
- Returns full dispute + charge + customer data
- 404 if dispute not found or doesn't belong to the account

### `POST /api/disputes/by-payment-intent/[piId]`

Lookup dispute by PaymentIntent ID (used by `PaymentDisputeView`).

- Calls `listDisputes(accountId, { payment_intent: piId, limit: 1 })`
- Returns the dispute if found
- 404 if no dispute exists on this payment

### Response Shapes

**Success:** `{ data: T }` with HTTP 200

**Error:** `{ error: string, code: string }` with appropriate HTTP status

---

## 3. Merchant Upsert

On every API call, upsert the merchant record. Not a separate endpoint -- a helper called by routes.

```typescript
ensureMerchant(accountId: string, userId: string): Promise<void>
```

- `supabase.from('merchants').upsert({ stripe_account_id, stripe_user_id, last_seen_at }, { onConflict: 'stripe_account_id' })`
- `stripe_account_id` is the unique key
- `last_seen_at` updates on every call (useful for churn detection later)
- Fire-and-forget: don't block the response, don't fail the request on error
- Log errors but never break the merchant's request

No signup flow. First API call = merchant exists.

---

## 4. Frontend Wiring

### DisputeListView

- Replace `MOCK_DISPUTES` with `fetchBackend<{ data: Dispute[] }>('/api/disputes')` on mount
- Drive `viewState` from the fetch: `loading` -> `ready` or `error`
- Existing loading/error/empty state UI handles all cases already

### PaymentDisputeView

- Replace mock lookup with `fetchBackend('/api/disputes/by-payment-intent/${paymentIntentId}')`
- On 404, show existing "No dispute on this payment" empty state
- Remove mock data fallback

### Type Updates (`types.ts`)

Expand `Dispute` interface to include real Stripe data:

```typescript
export interface Dispute {
  id: string;
  amount: number;
  currency: string;
  reason: string;
  status: DisputeStatus;
  due_by: string;           // ISO date string (YYYY-MM-DD) for display, derived from evidence_details.due_by
  reason_code: string;      // network_reason_code
  network: CardNetwork;     // from charge.payment_method_details.card.network
  payment_intent?: string;
  // New fields from real Stripe data
  charge_id: string;
  customer_name?: string;   // from expanded charge.customer.name
  customer_email?: string;  // from expanded charge.customer.email
  created: number;          // Unix timestamp of dispute creation
  evidence_due_by: number;  // Unix timestamp for precise countdown (WIN-15)
}
```

The backend normalizes raw `Stripe.Dispute` into this shape. Frontend never touches raw Stripe types.

### No Changes Needed

`DisputeCard`, `DisputeWorkflow`, `EmptyState`, `ErrorBanner` -- accept the right props already. `apiClient.ts` -- `fetchBackend` works as-is.

---

## Files Changed

| File | Action |
|---|---|
| `backend/lib/stripe/client.ts` | **New** -- Stripe API client |
| `backend/lib/stripe/errors.ts` | **New** -- error classification |
| `backend/lib/stripe/index.ts` | **New** -- barrel export |
| `backend/lib/merchants.ts` | **New** -- ensureMerchant helper |
| `backend/app/api/disputes/route.ts` | **New** -- list disputes |
| `backend/app/api/disputes/[disputeId]/route.ts` | **New** -- get dispute detail |
| `backend/app/api/disputes/by-payment-intent/[piId]/route.ts` | **New** -- lookup by PI |
| `stripe-app/src/lib/types.ts` | **Edit** -- expand Dispute interface |
| `stripe-app/src/views/DisputeListView.tsx` | **Edit** -- real API calls |
| `stripe-app/src/views/PaymentDisputeView.tsx` | **Edit** -- real API calls |
| `stripe-app/src/lib/mockData.ts` | **Delete** (or keep for tests) |

## Dependencies

- WIN-1 (project init) -- Done
- WIN-9 (app shell) -- Done
- WIN-31 (auth middleware) -- Done

## Out of Scope

- Dispute detail enrichment with playbook data (WIN-13/WIN-14)
- Evidence upload (WIN-16)
- Webhook-based dispute sync (WIN-21)
- Rate limiting beyond Stripe's built-in handling
