# Billing setup runbook

Standing up or re-verifying billing in a given Stripe mode (test or live) in the WinBack platform Stripe sub-account under JB Technology LLC.

This is the operational complement to `docs/superpowers/specs/2026-04-24-billing-lockdown-design.md` — that doc explains the design and post-implementation surprises; this doc is the cookbook for executing the steps.

## Prerequisites

- You are signed in to the **WinBack sub-account** under JB Technology LLC, not Docket. Receipt branding lives on the platform account; mixing products on one sub-account means customers receive the wrong-branded receipts.
- You know which mode (test or live) you are operating in. Verify before running anything: `stripe config --list` shows the account and mode the CLI is currently authed for.
- `STRIPE_SECRET_KEY` for the target mode is available locally (Dashboard → Developers → API keys).

## Steps

### 1. Provision resources (Pro price + Meter + Usage price)

```bash
cd backend
export STRIPE_SECRET_KEY=sk_test_... # or sk_live_
npm run provision:billing
```

The script is idempotent — re-running finds existing resources by `lookup_key` and short-circuits. Copy the printed values:

```
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_USAGE_FEE=price_...
```

### 2. Register both webhook endpoints

The original v1 of this runbook had this as a manual Dashboard step. In practice the Stripe API returns the signing secret in the create response, so a script captures it. Use this inline tsx command:

```bash
STRIPE_SECRET_KEY=sk_test_... npx tsx -e '
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
(async () => {
  // Billing webhook (platform events: subscriptions, invoices, setup intents)
  const billingUrl = "https://winbackpay.com/api/webhooks/stripe-billing";
  const billingEvents = [
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "invoice.payment_succeeded",
    "invoice.payment_failed",
    "setup_intent.succeeded",
  ];
  // Connect webhook (events from connected merchant accounts: dispute lifecycle)
  const connectUrl = "https://winbackpay.com/api/webhooks/stripe";
  const connectEvents = [
    "charge.dispute.created",
    "charge.dispute.updated",
    "charge.dispute.closed",
  ];

  const existing = await stripe.webhookEndpoints.list({ limit: 100 });
  const billing = existing.data.find((e) => e.url === billingUrl);
  if (!billing) {
    const ep = await stripe.webhookEndpoints.create({
      url: billingUrl,
      enabled_events: billingEvents as any,
      description: "WinBack billing lifecycle",
    });
    console.log(`STRIPE_BILLING_WEBHOOK_SECRET=${ep.secret}`);
  } else {
    console.log(`Existing billing webhook: ${billing.id} (secret already issued; recreate if rotation needed)`);
  }
  const connect = existing.data.find((e) => e.url === connectUrl);
  if (!connect) {
    const ep = await stripe.webhookEndpoints.create({
      url: connectUrl,
      enabled_events: connectEvents as any,
      connect: true,
      description: "WinBack Connect dispute events",
    });
    console.log(`STRIPE_WEBHOOK_SECRET=${ep.secret}`);
  } else {
    console.log(`Existing Connect webhook: ${connect.id} (secret already issued)`);
  }
})();
'
```

Note: the secret is **only viewable at creation** when going via the Dashboard, but the API create response includes it. If a webhook already exists and you don't have its secret, delete and recreate it (or rotate via the Dashboard) to get a fresh secret. Idempotency is by URL, so the existing-endpoint branch above is just informational.

### 3. Configure the Stripe Customer Portal

Pro merchants self-manage their subscription via the portal (cancel, update payment, view invoices). One-time configuration per Stripe account:

```bash
STRIPE_SECRET_KEY=sk_test_... npx tsx -e '
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
(async () => {
  const existing = await stripe.billingPortal.configurations.list({ limit: 100 });
  const isDefault = existing.data.find((c) => c.is_default);
  const opts = {
    features: {
      customer_update: {
        enabled: true,
        allowed_updates: ["email", "address", "phone", "tax_id"],
      },
      invoice_history: { enabled: true },
      payment_method_update: { enabled: true },
      subscription_cancel: {
        enabled: true,
        mode: "at_period_end",
        proration_behavior: "none",
        cancellation_reason: {
          enabled: true,
          options: [
            "too_expensive", "missing_features", "switched_service",
            "unused", "customer_service", "too_complex", "low_quality", "other",
          ],
        },
      },
    },
    business_profile: {
      headline: "Manage your WinBack subscription",
      privacy_policy_url: "https://winbackpay.com/privacy",
      terms_of_service_url: "https://winbackpay.com/terms",
    },
    default_return_url: "https://dashboard.stripe.com/settings/apps",
  } as any;
  if (isDefault) {
    const updated = await stripe.billingPortal.configurations.update(isDefault.id, opts);
    console.log(`Updated portal config: ${updated.id}`);
  } else {
    const created = await stripe.billingPortal.configurations.create(opts);
    console.log(`Created portal config: ${created.id}`);
  }
})();
'
```

Idempotent: updates the default config if one exists, creates a new default otherwise.

### 4. Generate `UPGRADE_LINK_SECRET`

```bash
openssl rand -hex 32
```

Save the output. It rotates on a staged deploy with up to 15-min overlap (the token TTL).

### 5. Set Vercel env vars

For the target environment (`production` for live launch, or `preview` for branch-specific testing):

```bash
cd backend
# Replace existing keys with WinBack-specific values from the steps above
vercel env rm STRIPE_SECRET_KEY production -y
printf "sk_..." | vercel env add STRIPE_SECRET_KEY production
vercel env rm STRIPE_WEBHOOK_SECRET production -y
printf "whsec_..." | vercel env add STRIPE_WEBHOOK_SECRET production
# New vars
printf "whsec_..." | vercel env add STRIPE_BILLING_WEBHOOK_SECRET production
printf "price_..." | vercel env add STRIPE_PRICE_PRO_MONTHLY production
printf "price_..." | vercel env add STRIPE_PRICE_USAGE_FEE production
printf "<openssl-output>" | vercel env add UPGRADE_LINK_SECRET production
```

Confirm the existing vars are correct for the target mode (these are not changed by this runbook unless the underlying account changed):

- `STRIPE_APP_SECRET` (per-app-per-account; if you re-uploaded the app to a different account, this changed too)
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`

### 6. Deploy

Merge to `main` (Vercel auto-deploys). If you only changed env vars (not code), force a redeploy with an empty commit:

```bash
git commit --allow-empty -m "chore: trigger redeploy to pick up env"
git push origin main
```

Wait for the new deploy to reach `Ready`:

```bash
vercel ls --scope <team-slug> win-back | head -3
```

### 7. Preflight check

After the new deploy is `Ready`:

```bash
curl https://winbackpay.com/api/preflight
```

Expect `{"ok":true}`. A 500 means a required env var is missing — the response body lists exactly which one. Fix and redeploy.

### 8. Run the end-to-end verification script

```bash
cd backend && set -a && source .env.local && set +a
STRIPE_SECRET_KEY=sk_... \
STRIPE_PRICE_PRO_MONTHLY=price_... \
STRIPE_PRICE_USAGE_FEE=price_... \
STRIPE_BILLING_WEBHOOK_SECRET=whsec_... \
UPGRADE_LINK_SECRET=<openssl-output> \
npm run verify:billing -- --base=https://winbackpay.com
```

Expect exit 0 and `[verify] PASS`. Any failure names which check broke; do not proceed without resolving.

### 9. Manual smoke test in real iframe

Install the Stripe App on a test merchant account from the developer dashboard. Then exercise each flow:

- **Pro upgrade**: Settings → "Upgrade to Pro" link → opens `/upgrade` page in a new tab → Continue → Stripe Checkout → pay with `4242 4242 4242 4242` → land on `/upgrade/success` → return to iframe → Settings shows "Pro · $79/mo" within ~30 s.
- **Manage subscription**: Settings (as Pro merchant) → "Manage subscription" link → opens Stripe Customer Portal → cancel-at-period-end → return to iframe (still Pro until period end). For QA, force immediate cancel: `stripe subscriptions cancel sub_xxx` → tier reverts to usage.
- **Add payment method**: Settings (usage tier, no PM) → banner shows → "Add payment method" link → `/setup-billing` page → Continue → setup-mode Checkout → enter `4242` → land on success → return to iframe → banner gone.

If any link button shows "Preparing link…" indefinitely, check Sentry for the corresponding `/api/billing/{upgrade,setup,portal}-link` route — it likely 401'd from `STRIPE_APP_SECRET` mismatch or 500'd from a missing env var.

### 10. Live-mode launch extras

For the live-mode flip (when ready to take real merchants):

- Re-run steps 1-3 with the live-mode `STRIPE_SECRET_KEY`. Resources are mode-specific; live mode starts empty.
- Repeat step 5 with live-mode values pointing at the production Vercel environment.
- On a real merchant account you own, close a test dispute as won (via Stripe's dispute simulation or a real dispute) and confirm the 15% success-fee line appears on the next invoice.
- Cross-check `/api/billing/status` `ytd_success_fees_cents` against the Stripe invoice totals; large gaps mean the local reconstruction in the status route is drifting and needs investigation before launch.

## Rollback

If step 8 or 9 fails and the fix isn't quick:

- Revert the deploy via Vercel dashboard (redeploy the previous known-good commit).
- All iframe billing buttons fall back to the "Preparing link…" state. No merchant is worse off than before — the button just doesn't navigate.
- For env-var-related issues, the simpler fix is usually editing the var in Vercel and re-running step 6 (empty commit redeploy) rather than rolling code back.

## Common gotchas

- **`/api/preflight` returns 404 in production** but the file exists locally. You used `_preflight` (private dir, App Router excludes it) instead of `preflight`. Rename and redeploy.
- **Iframe button presses do nothing**. `window.open` is blocked by the Stripe Apps iframe sandbox. The button must be a `<Link target="_blank">` with the URL pre-fetched on mount, not a `Button` with an `onPress` that calls `window.open`. See spec post-implementation note 2.
- **App upload prompts for a different version**. The `version` field in `stripe-app/stripe-app.json` was already used. Bump the patch number and re-run.
- **CLI says "upload your app to <wrong account>"**. `stripe login` is authed for a different sub-account than you intend. Re-auth with `stripe login` and pick the right one in the browser flow.
- **`vercel deploy --prod` fails with "backend/backend does not exist"**. Project Root Directory is `backend/`, so running from that dir compounds the path. Run from repo root or push an empty commit instead.
- **App ID conflict on re-upload**. App IDs are unique per Stripe account. If a draft sits on another sub-account (e.g., a previous failed submission), pick a new ID rather than trying to delete the orphan — the dashboard rarely offers self-serve deletion.
- **Receipt branding shows the wrong product name**. Stripe receipt branding is per-account, not per-customer. New product = new sub-account.
