---
status: draft
linear: TBD (WinBack team, billing-lockdown)
last-updated: 2026-04-24
---

# Billing lockdown for Stripe Marketplace resubmit

## Problem

Stripe rejected WinBack 1.1.0 review. The billing feedback has two parts:

1. The Pro upgrade button returns a 500. Sentry shows `Missing STRIPE_PRICE_PRO_MONTHLY` at `backend/lib/billing.ts:35`. Root cause: no billing resources have been provisioned in the WinBack platform Stripe account, and the env vars the code expects are unset in Vercel production.
2. A new marketplace requirement buried in the feedback note: subscription checkout buttons in a Stripe App must route users to the publisher's own website for plan/cost details before entering Stripe Checkout. The current architecture (iframe button opens Checkout directly) is not compliant regardless of whether the 500 is fixed.

Beyond the immediate fix, the 15% Pay-Per-Win success fee has a silent gap: nowhere in the product do we collect a payment method from merchants on the default tier. On first win the invoice goes `past_due` and we have no in-app surface asking for a card.

This spec locks in the full billing surface end-to-end so the next review passes and so we do not ship a second class of billing bugs at live-mode launch.

## Goals

- Pro upgrade flow works end-to-end: iframe button → intermediate winbackpay.com page → Stripe Checkout → subscription webhook → merchant flips to Pro.
- 15% success fee collects reliably: every won dispute posts a meter event against a working Meter, and every merchant has a payment method on file before their first submit.
- A class of bug (missing billing env var silently 500-ing in prod) cannot recur.
- Full billing lifecycle is verifiable by a single script, runnable before any resubmit or live-mode flip.
- Same provisioning works in test mode (for the reviewer) and live mode (at launch) with no code changes.

## Non-goals

- Rewriting the existing meter-event posting logic, webhook handlers, or `billing.ts` helpers. They are correct; they fail today only because the Stripe resources and env vars they reference are missing.
- Icon fix (Stripe feedback #2) and About copy rewrite (Stripe feedback #3). Tracked as separate Linear tickets.
- Annual Pro pricing ($59/mo billed annually). Monthly only for v1.
- Automated trademark / legal review of the WinBack platform Stripe account setup.

## Context

Current billing code (WIN-24, shipped):

- `backend/lib/billing.ts` — platform Stripe client, success fee calc, lazy customer/usage-sub creation, Pro Checkout session creation, usage-sub cancellation on upgrade.
- `backend/app/api/billing/checkout/route.ts` — Stripe-App-signed POST that creates a Pro Checkout session. **This is the route Stripe hit and got a 500 from.** It will be deleted in this spec.
- `backend/app/api/billing/status/route.ts` — returns tier, subscription_status, pro_since_at, next_billing_at, YTD success fees for the Settings view.
- `backend/app/api/webhooks/stripe-billing/route.ts` + `backend/lib/webhooks/handle-billing-event.ts` — processes `customer.subscription.*` and `invoice.payment_*` on the platform account.
- `backend/lib/webhooks/handle-dispute-event.ts` calls `reportDisputeWonFee` on `charge.dispute.closed / status=won`.

Stripe account: JB Technology LLC org has an existing Docket sub-account used for dev/QA. A new WinBack sub-account exists under the same org and is live-payments-ready but has zero billing resources configured. The Stripe App `com.jkbtech.winback` was submitted pointing at `https://winbackpay.com/api/` (Vercel production).

---

## Section 1 — Stripe account strategy

All billing resources (Products, Prices, Meter, webhook endpoint) live in the **WinBack platform sub-account** under JB Technology LLC. Not the Docket sub-account.

Test mode of that account carries billing for the current review cycle. Live mode is populated via the same provisioning script at launch. Vercel production's `STRIPE_SECRET_KEY` points at WinBack test mode during review, swapped to live-mode key at launch. A Vercel preview environment can point at WinBack test mode too if we want preview-environment checkout flows.

No migration from Docket is required because no billing resources were ever created in Docket's account — only dispute test data for dev/QA, which stays where it is.

## Section 2 — Upgrade landing page and signed handoff

### Flow

```
iframe "Upgrade to Pro" button
  → POST /api/billing/upgrade-link  (Stripe-App-signed)
  → { url: "https://winbackpay.com/upgrade?t=<token>" }
  → window.open in new tab

/upgrade page (public)
  → server-side verifies token, fetches merchant + tier
  → renders plan summary, CTA "Continue to Stripe Checkout"

CTA click
  → POST /api/billing/checkout-from-token  (public, token-gated)
  → creates Checkout session via existing createProCheckoutSession
  → { url: "https://checkout.stripe.com/..." }
  → window.location redirect
```

### Token format

JWT-style compact: `base64url(header).base64url(payload).base64url(sig)` where payload = `{ merchant_id, iat, exp, kind: "upgrade" | "setup" }`. Signature is HMAC-SHA256 over header+payload using `UPGRADE_LINK_SECRET`. Expiry 15 minutes. One secret covers both the Pro upgrade and the setup-billing flow (Section 7), differentiated by the `kind` claim.

A custom compact HMAC token is preferred over pulling in a JWT library because the payload is trivial, there is no key rotation need, and we want zero new npm dependencies for this.

### New files

- `backend/app/upgrade/page.tsx` — public Next.js page. Reads `t` query param. In a Server Component, verifies token, fetches merchant `{ business_name, billing_tier }`. Renders:
  - Heading: "Upgrade {business_name} to WinBack Pro"
  - Plan summary: $79/month, unlimited disputes, 0% success fee, monthly billing, cancel anytime
  - Recap: "You're currently on Pay-Per-Win (15% success fee)"
  - CTA button: "Continue to Stripe Checkout"
  - Fallback states: expired token, already Pro, merchant not found — each with explanatory copy and a link back to Stripe Dashboard
- `backend/app/api/billing/upgrade-link/route.ts` — Stripe-App-signed. Resolves merchant from identity, mints `kind=upgrade` token, returns `{ url }`.
- `backend/app/api/billing/checkout-from-token/route.ts` — public. Verifies token (must be `kind=upgrade`, unexpired, signature valid). Resolves merchant_id from token. Refuses if merchant already on Pro (409). Otherwise calls existing `createProCheckoutSession` with success/cancel URLs back to `winbackpay.com/upgrade/success` and `winbackpay.com/upgrade/cancelled` (new stub pages — short factual confirmation, link back to Stripe Dashboard).
- `backend/lib/upgrade-token.ts` — `signToken(payload)` / `verifyToken(tokenString)` helpers. Pure functions, no Stripe or Supabase dependencies, fully unit-testable.

### Iframe change

`stripe-app/src/components/AppSettings.tsx` (or wherever the upgrade button lives — confirm at implementation time): replace direct call to `/api/billing/checkout` with call to `/api/billing/upgrade-link`. On response, use the Stripe Apps SDK's external-link helper (or `window.open` fallback) to open the returned URL in a new tab. Button shows spinner until link returns; on error, banner with the existing error copy.

### Removed

- `backend/app/api/billing/checkout/route.ts` and its test file. No compatibility shim.

### Why this matches Stripe's requirement

Stripe's feedback requires the user to land on the publisher's own site to learn cost/plan details before entering Checkout. The `/upgrade` page is that surface. The signed token is the security mechanism that makes the intermediate step safe (a public URL that can create a $79/mo subscription for an arbitrary merchant is a trivial abuse vector otherwise).

---

## Section 3 — Stripe resource provisioning script

One TypeScript script: `backend/scripts/provision-billing.ts`. Reads `STRIPE_SECRET_KEY` from env. Runs against whichever mode the key is in (test or live). Idempotent via `lookup_key` on each resource.

Creates:

1. **Pro product + price.**
   - Product: `name="WinBack Pro"`, `metadata.tier="pro"`
   - Price: `unit_amount=7900`, `currency=usd`, `recurring.interval=month`, `lookup_key="winback_pro_monthly_v1"`, `metadata.tier="pro"`
2. **Meter.**
   - `event_name="dispute_won_fee"`, `default_aggregation.formula="sum"`, `customer_mapping.event_payload_key="stripe_customer_id"`, `customer_mapping.type="by_id"`, `display_name="Dispute won success fee (cents)"`
3. **Usage product + metered price.**
   - Product: `name="WinBack success fee"`, `metadata.tier="usage"`
   - Price: linked to the meter, `recurring.usage_type="metered"`, `recurring.interval="month"`, `billing_scheme="per_unit"`, `unit_amount=1`, `currency=usd`, `lookup_key="winback_usage_fee_v1"`, `metadata.tier="usage"`. Unit amount of 1 cent × value-in-cents posted by meter events yields the intended dollar amount (e.g., meter event value=1500 → invoice line = $15.00).

Script output (stdout, human-readable):

```
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_USAGE_FEE=price_...
# Meter id: mtr_... (informational, not used by code)
```

Re-running the script detects existing resources by `lookup_key` (or event_name for the Meter) and short-circuits. Safe to run any number of times. No `--force` / mutation flags — if a resource needs to change, we bump the `_v2` suffix on the `lookup_key` and keep the old one archived.

The billing webhook endpoint registration (URL + event list + signing secret) stays a one-time Stripe Dashboard action, documented in the runbook (Section 6). Stripe does not expose webhook endpoint management via API in a way that would let us idempotently reconcile it, and the signing secret is only viewable once at creation — scripting it creates more failure modes than it solves.

## Section 4 — Preflight env validator

New file: `backend/lib/env.ts`. Declares required env vars and throws at module import time if any are missing:

```ts
export const env = {
  STRIPE_SECRET_KEY: req("STRIPE_SECRET_KEY"),
  STRIPE_APP_SECRET: req("STRIPE_APP_SECRET"),
  STRIPE_WEBHOOK_SECRET: req("STRIPE_WEBHOOK_SECRET"),
  STRIPE_BILLING_WEBHOOK_SECRET: req("STRIPE_BILLING_WEBHOOK_SECRET"),
  STRIPE_PRICE_PRO_MONTHLY: req("STRIPE_PRICE_PRO_MONTHLY"),
  STRIPE_PRICE_USAGE_FEE: req("STRIPE_PRICE_USAGE_FEE"),
  UPGRADE_LINK_SECRET: req("UPGRADE_LINK_SECRET"),
  SUPABASE_URL: req("SUPABASE_URL"),
  SUPABASE_SERVICE_ROLE_KEY: req("SUPABASE_SERVICE_ROLE_KEY"),
  ANTHROPIC_API_KEY: req("ANTHROPIC_API_KEY"),
  SENTRY_DSN: opt("SENTRY_DSN"), // optional — app still boots without it
};
```

`req` throws `Error("Missing required env var: X")` if absent or empty-string. `opt` returns `string | undefined`.

Imported from each billing route file and from a small `app/api/_preflight/route.ts` health endpoint. On Vercel, because Next.js cold-starts routes on first request, a missing var crashes the first hit after deploy with a clear message in Sentry and a 500 to the caller. Subsequent deploys that would silently 500 on user action now fail loudly at the boundary instead.

CI addition: `npm run check:env -- --schema prod` that validates Vercel's `production` environment has every required key set (via `vercel env ls` parsed output, or equivalent). Runs in the deploy workflow.

Replaces the ad-hoc `requireEnv` inline helpers in `backend/lib/billing.ts`, `backend/lib/webhooks/handle-billing-event.ts`, and `backend/app/api/webhooks/stripe-billing/route.ts` — those get deleted in favor of reading from `env.*`.

## Section 5 — End-to-end verification script

`backend/scripts/verify-billing.ts`. Runs against whichever mode `STRIPE_SECRET_KEY` is in. Exits 0 on full pass, non-zero on first failure with descriptive message.

Steps:

1. **Setup**: insert throwaway merchant row in Supabase with fake `stripe_account_id` and a unique marker suffix (so a crashed prior run leaves cleanup breadcrumbs).
2. **Upgrade link → Checkout**: call `/api/billing/upgrade-link` (with a signed stub identity), verify token URL returned, parse token, call `/api/billing/checkout-from-token`, assert Stripe Checkout session URL returned and session ID resolves via Stripe API.
3. **Pro subscription lifecycle**: directly fire `customer.subscription.created` and `customer.subscription.updated` events at the billing webhook (constructed + signed with the webhook secret, same as a real Stripe delivery). Assert merchant row updates: `billing_tier='pro'`, `pro_since_at` set, `stripe_subscription_id` recorded, usage subscription (if any) cancel-at-period-end.
4. **Success fee posting**: without upgrading, call `reportDisputeWonFee` directly with known amount. Assert Stripe Customer created, usage Subscription created, Meter Event posted via `billing.meterEvents.list` (or equivalent lookup). Assert posted value = 15% of amount in cents. Replay the same call with the same `disputeId`; assert no duplicate meter event (idempotency).
5. **Past-due scenario**: simulate a won dispute for a merchant with no payment method. Assert meter event still posts, assert subsequent `invoice.payment_failed` webhook flips `subscription_status='past_due'` in our DB.
6. **Payment method capture** (Section 7): mint setup-kind token, call `/api/billing/setup-session-from-token`, assert Stripe setup-mode Checkout session returned.
7. **Downgrade**: fire `customer.subscription.deleted` for the Pro sub. Assert merchant reverts to `billing_tier='usage'`, `pro_since_at` cleared.
8. **Cleanup**: delete the throwaway merchant row; optionally leave Stripe-side artifacts (Customer, cancelled subs) because they cost nothing and archiving them manually is fine.

Run cadence: required after provisioning, after any change to `lib/billing.ts` or billing routes, before every `stripe apps upload` for marketplace resubmit, before the live-mode env-var flip.

## Section 6 — Runbook

New file: `docs/runbooks/billing-setup.md`. The sequence to stand up billing in a fresh Stripe mode (test or live):

1. Confirm you're logged into the WinBack platform sub-account in Stripe Dashboard. Select the correct mode (test or live).
2. Note the API key: `STRIPE_SECRET_KEY` for this mode.
3. Run `backend/scripts/provision-billing.ts` with that key in env. Copy the printed `STRIPE_PRICE_PRO_MONTHLY` and `STRIPE_PRICE_USAGE_FEE`.
4. In Stripe Dashboard → Developers → Webhooks, add endpoint: URL = `https://winbackpay.com/api/webhooks/stripe-billing`, events = `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`. Copy the signing secret → `STRIPE_BILLING_WEBHOOK_SECRET`.
5. Verify the Connect webhook (for dispute events) already exists at `/api/webhooks/stripe` — this is not new but re-verify the signing secret is current (`STRIPE_WEBHOOK_SECRET`).
6. Generate `UPGRADE_LINK_SECRET`: `openssl rand -hex 32`.
7. Add the billing-specific vars to Vercel for the target environment (production or preview): `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_USAGE_FEE`, `STRIPE_BILLING_WEBHOOK_SECRET`, `UPGRADE_LINK_SECRET`. Confirm the existing vars (`STRIPE_SECRET_KEY`, `STRIPE_APP_SECRET`, `STRIPE_WEBHOOK_SECRET`) are set and valid for this mode. Deploy.
8. Hit `https://winbackpay.com/api/_preflight` — expect 200 with `{ ok: true }`. A 500 here means a var is missing or wrong.
9. Run `backend/scripts/verify-billing.ts` pointed at the deployed backend. Expect exit 0.
10. Manual smoke test: install the app in a Stripe test Dashboard, click "Upgrade to Pro" in Settings, verify you land on `/upgrade`, continue to Checkout, complete with test card, assert merchant row flips to Pro.
11. For live-mode launch only: also run the script against a merchant you own on live Stripe, submit a real won dispute (or use Stripe's dispute simulation in live), and confirm the success-fee invoice appears.

## Section 7 — Payment method capture (Option D: soft at install, hard at first submit)

### Surface 1: Settings banner (soft)

On the iframe Settings view, after install: a dismissable banner rendered when `/api/billing/status` returns `tier='usage'` AND `has_payment_method=false`:

> "Add a payment method to enable WinBack billing. You'll only be charged the 15% success fee when a dispute is won."
> **Button**: "Add payment method" — opens setup-billing flow

Adds `has_payment_method: boolean` to the `/api/billing/status` response, resolved by checking `customer.invoice_settings.default_payment_method` (or falling back to listing payment methods on the customer). Costs one extra Stripe API call per status fetch, which is fine.

Dismissing the banner stores a timestamp in `merchants.payment_method_prompt_dismissed_at`. Re-surfaces after 30 days if still unresolved. (Database migration adds this column.)

### Surface 2: Pre-submit gate (hard)

In `stripe-app/src/components/submit/SubmitView.tsx`, before firing the final submit: if merchant is on usage tier and has no payment method, block submit and show a modal (`FocusView`):

> "Add a payment method before submitting"
> "WinBack's Pay-Per-Win plan charges 15% only when you win. Add a card now so we can settle instantly if this dispute is resolved in your favor — you won't be charged anything today."
> **Primary**: "Add payment method" (opens setup-billing flow)
> **Secondary**: "Cancel" (closes modal, returns to submit view)

Pro-tier merchants bypass this entirely (their card was collected at Checkout, no gate needed).

This is a one-time friction — once a PM is attached, subsequent submits skip the modal. We expose `has_payment_method` on `/api/billing/status` which the Submit view reads.

### Setup-billing flow

Architecturally identical to the Pro upgrade flow — same signed-token handoff, same pattern.

- `POST /api/billing/setup-link` (Stripe-App-signed): resolves merchant, mints `kind=setup` token, returns `{ url: "https://winbackpay.com/setup-billing?t=<token>" }`.
- `app/setup-billing/page.tsx`: verifies token, shows explanatory page:
  - Heading: "Add a payment method for {business_name}"
  - Copy: "WinBack charges the 15% success fee only when a dispute is won. Adding a card now doesn't charge you anything — it just lets us settle future wins instantly."
  - CTA: "Continue"
- `POST /api/billing/setup-session-from-token` (public, token-gated): verifies token is `kind=setup`, creates Stripe Checkout session in `mode=setup` for the merchant's customer, returns URL.
- Stripe Checkout in setup mode collects card details and attaches PaymentMethod to Customer, sets it as `invoice_settings.default_payment_method` via the `setup_intent_data.payment_method_options` + a post-setup webhook handler.
- Success page: `/setup-billing/success` — "Payment method added. Close this tab and return to Stripe Dashboard."

### Webhook addition

Subscribe the billing webhook to `setup_intent.succeeded` (added to the existing endpoint in Section 6). Handler pulls the `payment_method` from the SetupIntent and calls `stripe.customers.update(customer_id, { invoice_settings: { default_payment_method } })`. This ensures the collected PM is the one used to settle future invoices, not just attached.

---

## Stripe feedback ↔ spec section mapping

Explicit trace of each requirement in Stripe's rejection to the section(s) that address it:

| Stripe feedback element | Section(s) addressing it | Mechanism |
|---|---|---|
| 500 on `/api/billing/checkout` (missing env var) | §3, §4 | §3 creates the missing Stripe resources so env vars have something real to point at. §4 makes missing-var failures crash at boot, not user click. |
| "Successfully generate a valid Stripe Checkout session" | §1, §2, §3 | §1 pins the account, §2 rebuilds the flow correctly, §3 ensures the price resource exists. |
| NOTE: "Direct users from your Stripe App to your platform before navigating to Stripe Checkout" | §2 | New `/upgrade` page with plan details between iframe button and Checkout. Signed token makes the intermediate page safe. |
| "All core features... including billing and subscription management flows, must be fully functional" | §5 | E2E script exercises full lifecycle: upgrade, Pro webhook, success fee metering, past-due, downgrade. Single exit code = pass/fail. |
| Implicit: re-review must find a working flow | §4, §5, §6 | §6 runbook is the pre-resubmit checklist. §5 proves the system works. §4 prevents recurrence of this specific bug class. |
| Implicit: 15% success fee must actually collect | §3, §5, §7 | §3 provisions the Meter and usage Price. §5 verifies meter events post correctly. §7 ensures merchants have a PM on file so invoices don't bounce. |

---

## Risks and open items

1. **Stripe Meter API stability.** Meters are a relatively new Stripe surface. If the SDK or API shape changes meaningfully between now and launch, §3 provisioning and §5 verification may need revisions. Mitigation: provisioning script uses `stripe.billing.meters.create` against a pinned SDK version; any upgrade triggers a regression run of §5.
2. **Checkout setup-mode PM attachment.** Stripe does not always auto-set the collected PM as `default_payment_method`. We handle this via the `setup_intent.succeeded` webhook explicitly attaching it. Verified in §5 step 6.
3. **Marketplace review on re-submit might surface additional billing feedback.** Stripe sometimes flags secondary issues on later passes. This spec addresses every item in the current rejection report; new items become new tickets.
4. **Live-mode Stripe account verification state.** The WinBack sub-account is live and ready per Joe, but Stripe sometimes puts new accounts into review before allowing certain subscription actions. If that trips during the live-mode flip, it's an external blocker not addressed by this spec.
5. **`window.open` in Stripe Apps.** Opening external URLs from the iframe must go through the Stripe Apps SDK's allowed mechanism; a naive `window.open` may be blocked by iframe sandboxing. Implementation will use the SDK's approved pattern (confirmed in Stripe Apps docs).

## Out of scope (separate Linear tickets)

- **Icon mismatch fix** (Stripe feedback #2): Choose one bleed-square 1:1 icon with no embedded text, use it for both the manifest (`stripe-app.json` `icon` field) and the marketplace listing asset. Update `stripe-app/src/assets/winback_logo.png` and re-upload to the listing dashboard.
- **About copy rewrite** (Stripe feedback #3): Rewrite the marketplace About section in `docs/marketplace/listing.md` to remove "win more chargebacks," "Built on 10+ years of issuer and acquirer side experience," "compelling rebuttal," and similar phrases. Keep strictly factual: guided evidence collection, reason-code guidance, dispute response draft generation. Update the listing in Stripe's developer dashboard to match.

---

## Deliverables checklist

- [ ] `backend/scripts/provision-billing.ts` + smoke test
- [ ] `backend/lib/env.ts` + unit tests
- [ ] `backend/lib/upgrade-token.ts` + unit tests
- [ ] `backend/app/upgrade/page.tsx`, `/success`, `/cancelled` stubs
- [ ] `backend/app/setup-billing/page.tsx`, `/success` stub
- [ ] `backend/app/api/billing/upgrade-link/route.ts`
- [ ] `backend/app/api/billing/checkout-from-token/route.ts`
- [ ] `backend/app/api/billing/setup-link/route.ts`
- [ ] `backend/app/api/billing/setup-session-from-token/route.ts`
- [ ] `backend/app/api/_preflight/route.ts`
- [ ] Delete `backend/app/api/billing/checkout/route.ts` + test
- [ ] Update `backend/app/api/billing/status/route.ts` to include `has_payment_method`
- [ ] Update `backend/lib/webhooks/handle-billing-event.ts` to handle `setup_intent.succeeded` and attach default PM
- [ ] Update `backend/lib/billing.ts` to read from `env` module instead of inline `requireEnv`
- [ ] Migration: `merchants.payment_method_prompt_dismissed_at` column
- [ ] Iframe: Settings view upgrade button swap + PM banner + dismiss wiring
- [ ] Iframe: Submit view pre-submit PM gate modal
- [ ] `backend/scripts/verify-billing.ts` + CI wiring
- [ ] CI: `check:env` step against Vercel production environment
- [ ] `docs/runbooks/billing-setup.md`
- [ ] Run through runbook against WinBack test-mode, resubmit marketplace version

---

## Decision log

- **2026-04-24**: Chose Option D for payment-method capture (soft at install, hard at first submit) over A (at install) to preserve the Pay-Per-Win "$0 unless you win" pitch, and over C (reactive at first win) to avoid trying to collect after the merchant has already received value.
- **2026-04-24**: Chose WinBack platform sub-account (not Docket) as the billing source of truth, and decided to go straight from WinBack test-mode to WinBack live-mode without a Docket intermediate step.
- **2026-04-24**: Chose a custom HMAC compact token over introducing a JWT library dependency. Single secret covers both upgrade and setup flows, differentiated by `kind` claim.
- **2026-04-24**: Chose to delete `/api/billing/checkout` rather than keep a compatibility shim. No external callers; the iframe is the only client and it moves to the token flow in the same release.
