# Stripe platform-account migration recovery

Last updated: 2026-04-28
Related code: [backend/lib/billing.ts](../../backend/lib/billing.ts), [backend/lib/stripe/client.ts](../../backend/lib/stripe/client.ts)
Related Linear: WIN-24 (original billing impl), WIN-72 (lockdown follow-ups)

## TL;DR

WinBack's billing infrastructure was migrated from a developer-sandbox Stripe account (Docket, `acct_1TCiPdEQYvM3XwRz`) to WinBack's own dedicated platform account (`acct_1TIwcOCbmbWLiv6V`) in April 2026. The migration left two classes of stale state in production:

1. **Stale Stripe object IDs cached in the `merchants` table.** Customer IDs, subscription IDs, etc., that were created in the old platform account no longer exist in the new one. Code that blindly trusted these cached IDs produced confusing 500 errors during checkout.
2. **Stripe Connect grants tied to the old platform.** Merchants who installed the WinBack app on the old platform still appear in Stripe's UI but the new platform key cannot make Connect-scoped API calls against them.

Class 1 is fixed in code (self-healing). Class 2 cannot be fixed server-side and requires the merchant to reinstall the current WinBack app.

## Symptoms

If any of these errors appear in Sentry, this runbook applies:

- `Error: No such customer: 'cus_xxx'` from `customers.retrieve`, `subscriptions.create`, or `meterEvents.create`
- `Error: No such subscription: 'sub_xxx'`
- `Error: The provided key 'sk_test_xxx' does not have access to account 'acct_xxx' (or that account does not exist). Application access may have been revoked.`
- User-facing iframe error "Failed to create checkout session" with route `/api/billing/checkout-from-token`

## Root cause analysis

### Class 1: stale cached Stripe object IDs

`merchants` rows hold these Stripe-side IDs:

- `stripe_billing_customer_id`
- `stripe_usage_subscription_id`
- `stripe_subscription_id`

Each of these references a Stripe object that lives on the platform account whose secret key was active at the time of creation. After the migration, the new platform key cannot retrieve any Stripe object created by the old key. The old key sees `cus_AAA`, the new key does not.

The original `getOrCreateBillingCustomer` and `getOrCreateUsageSubscription` short-circuited when the cached ID was present, returning it without verification. Downstream calls (`subscriptions.create`, `meterEvents.create`, `checkout.sessions.create`) then 404'd with `resource_missing`.

### Class 2: revoked Connect grants

When a merchant installs a Stripe App, Stripe issues a Connect grant tying their account to the app's platform. Our backend then calls Stripe API with `{ stripeAccount: <merchant_id> }` to act on their behalf. After a platform migration, those grants do not transfer. Even if the iframe still loads (signature verification can succeed against the new app secret), Connect-scoped API calls fail with `permission_denied` and message "Application access may have been revoked."

This is structural to Stripe Connect. Server-side code cannot grant itself access. The merchant must reinstall the current app version, which issues a fresh grant.

## The fix (Class 1)

Defensive validation added to [backend/lib/billing.ts](../../backend/lib/billing.ts):

### `getOrCreateBillingCustomer`

If a cached `stripe_billing_customer_id` is present, the function now calls `customers.retrieve` first. Three outcomes:

1. Retrieve succeeds and `deleted` is falsy: return the existing ID.
2. Retrieve throws with `code === "resource_missing"`: clear the stale ID (and any dependent subscription IDs) from `merchants`, fall through to create a fresh customer.
3. Retrieve returns a deleted customer: same as outcome 2.

### `getOrCreateUsageSubscription`

Mirrors the customer pattern: if a cached `stripe_usage_subscription_id` is present, validate via `subscriptions.retrieve`. If the subscription is missing or not in `active`/`trialing` state, clear the stale ID and create a fresh subscription. Without this, meter events would still post against the customer but have no active subscription to bill against, causing silent revenue leaks.

### What's NOT auto-validated (and why)

- **`stripe_subscription_id` (Pro)**: only set via the `customer.subscription.created` webhook from Stripe Billing. There is no `getOrCreatePro` path that needs to read it. If it gets stale, the merchant has to upgrade again, and the new webhook will overwrite the row.
- **`hasDefaultPaymentMethod`**: already calls `customers.retrieve` and tolerates `resource_missing` via existing try/catch. No change needed.

## Test coverage

[backend/lib/__tests__/billing.test.ts](../../backend/lib/__tests__/billing.test.ts) covers:

- `recovers when cached customer id no longer exists in Stripe (account migration)` (resource_missing path)
- `recovers when cached customer was deleted in Stripe` (deleted=true path)
- `reuses existing customer id when already set` (happy path with retrieve validation)
- All existing `reportDisputeWonFee`, `createProCheckoutSession`, `cancelUsageSubscription` tests now mock `customers.retrieve` since the validation runs in those code paths too.

Run via `cd backend && npm test -- --run lib/__tests__/billing.test`. 14 tests, all green as of 2026-04-28.

## Recovery procedure

If a similar Sentry error appears in the future and you suspect cached-ID staleness:

1. **Identify the affected merchant row.** Pull the bad ID from Sentry, then query Supabase:
   ```ts
   await supabase.from("merchants").select("*").eq("stripe_billing_customer_id", "cus_xxx");
   ```
2. **Confirm the ID is stale.** `stripe customers retrieve cus_xxx` against the current production key. If it returns `resource_missing`, the ID is dead.
3. **Decide on recovery path:**
   - **Trust the self-healing code:** do nothing. The next time the merchant hits a billing flow, `getOrCreateBillingCustomer` will detect the stale ID, clear it, and create a fresh customer. Adds one extra `customers.retrieve` call to the request (about 100ms).
   - **Force-clear the row:** for faster recovery (e.g., active reviewer waiting), update the row directly:
     ```ts
     await supabase.from("merchants").update({
       stripe_billing_customer_id: null,
       stripe_usage_subscription_id: null,
       stripe_subscription_id: null,
       subscription_status: null,
     }).eq("id", "<merchant_uuid>");
     ```
4. **Verify by triggering a Pro upgrade.** Use `node --env-file=.vercel/.env.production.local backend/scripts/_qa-prod-checkout.mjs` (recreate from this runbook if deleted; sample below) to hit `/api/billing/checkout-from-token` with a signed token for the affected merchant. Expect 200 + a `https://checkout.stripe.com/...` URL in the response.

## Recovery procedure (Class 2 — Connect grant)

This cannot be repaired server-side. The merchant must reinstall the current WinBack app on the affected account. Steps to give the merchant or reviewer:

1. In their Stripe Dashboard, navigate to the affected account.
2. Open Apps and find WinBack. If installed, uninstall first.
3. Visit the WinBack marketplace listing and install the current version.
4. Re-grant any permissions Stripe prompts for during install.
5. Reload the WinBack app from the Stripe Dashboard. The iframe should load and Connect-scoped API calls will now succeed against the freshly issued grant.

If you ship to Stripe reviewers and see this error, ask them to confirm the current app version is installed on the account they are testing from. The error trace will name the affected `acct_xxx`.

## Sample reproduction script

For verifying the fix end-to-end against production. Save as `backend/scripts/_qa-prod-checkout.mjs` (delete after use, do not commit):

```js
import { createHmac } from "node:crypto";

const merchantId = "<merchant_uuid>";
const base = "https://winbackpay.com";

function signToken(kind) {
  const secret = process.env.UPGRADE_LINK_SECRET;
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "UB" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ merchant_id: merchantId, kind, iat: now, exp: now + 900 }),
  ).toString("base64url");
  const sig = createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${sig}`;
}

const token = signToken("upgrade");
const res = await fetch(`${base}/api/billing/checkout-from-token`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ token }),
});
console.log(res.status, await res.text());
```

Run with: `node --env-file=.vercel/.env.production.local backend/scripts/_qa-prod-checkout.mjs`

Note: bash `source` mangles JWT-style env values. Always use Node's `--env-file` flag, not `set -a; source ...; set +a`. See the local-tooling note in [backend/lib/__tests__/billing.test.ts](../../backend/lib/__tests__/billing.test.ts) (the `setRequiredEnvVars` helper) for the test-side workaround.

## Open follow-ups

1. **Graceful 403 for revoked Connect grants.** Add catch-and-translate in [backend/lib/stripe/client.ts](../../backend/lib/stripe/client.ts) so `permission_denied` errors return a structured response the iframe can render as "please reinstall WinBack" instead of a generic 500. Ten lines of code, polish move, not blocking.
2. **Periodic stale-ID sweep.** Optional cron job that walks the `merchants` table once per day, validates each Stripe ID, and self-heals. Nice-to-have, the on-demand self-healing covers most cases.

## Why this matters for future agents

If you read this and are about to touch billing, payment-method handling, or any code that uses cached Stripe IDs from the database, ensure you preserve the self-healing pattern. Specifically:

- Any new wrapper around a Stripe object should validate the cached ID before using it.
- Catch `resource_missing` (StripeInvalidRequestError with `code === "resource_missing"`) and treat it as "recreate from scratch."
- Clear ALL dependent IDs when invalidating an upstream one (e.g., clearing `stripe_billing_customer_id` should also clear subscription IDs that referenced it).
- Add a unit test for the stale-ID path. The pattern is in `billing.test.ts`.
