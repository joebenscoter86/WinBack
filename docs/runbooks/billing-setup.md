# Billing setup runbook

Standing up or re-verifying billing in a given Stripe mode (test or live)
in the WinBack platform Stripe sub-account under JB Technology LLC.

## Prerequisites

- You have the Stripe Dashboard open and are signed in to the WinBack sub-account under JB Technology LLC.
- You know which mode you are operating in (test or live). The page toggle in the top bar controls this.
- You have `STRIPE_SECRET_KEY` for that mode available locally.

## Steps

1. **Provision resources.** From the repo root:

   ```bash
   cd backend
   export STRIPE_SECRET_KEY=sk_test_... # or sk_live_
   npm run provision:billing
   ```

   Copy the printed `STRIPE_PRICE_PRO_MONTHLY` and `STRIPE_PRICE_USAGE_FEE`. The script is idempotent — re-running it finds existing resources by `lookup_key` and short-circuits.

2. **Register the billing webhook endpoint.** In Stripe Dashboard → Developers → Webhooks → Add endpoint:

   - URL: `https://winbackpay.com/api/webhooks/stripe-billing`
   - Events:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `setup_intent.succeeded`
   - Click "Reveal signing secret" → copy the `whsec_...` value → this is `STRIPE_BILLING_WEBHOOK_SECRET`.

3. **Verify the Connect dispute webhook exists** at `https://winbackpay.com/api/webhooks/stripe` with events `charge.dispute.created`, `charge.dispute.updated`, `charge.dispute.closed`. The signing secret is `STRIPE_WEBHOOK_SECRET`.

4. **Generate `UPGRADE_LINK_SECRET`:**

   ```bash
   openssl rand -hex 32
   ```

5. **Set Vercel env vars** for the target environment (production or preview):

   - `STRIPE_PRICE_PRO_MONTHLY`
   - `STRIPE_PRICE_USAGE_FEE`
   - `STRIPE_BILLING_WEBHOOK_SECRET`
   - `UPGRADE_LINK_SECRET`

   Confirm the existing vars are correct for this mode:

   - `STRIPE_SECRET_KEY`
   - `STRIPE_APP_SECRET`
   - `STRIPE_WEBHOOK_SECRET`
   - `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`

6. **Deploy.** Merge the billing-lockdown branch to main, let Vercel deploy.

7. **Preflight.** After deploy succeeds:

   ```bash
   curl https://winbackpay.com/api/preflight
   ```

   Expect `{"ok":true}`. A 500 here means a Vercel env var is missing — read the error message, fix, redeploy.

8. **Run the verification script** against the deployed backend:

   ```bash
   cd backend && set -a && source .env.local && set +a
   npm run verify:billing -- --base=https://winbackpay.com
   ```

   Expect exit 0 and "[verify] PASS". Any failure means the flow it names is broken on the deployed backend — do not proceed to the next step.

9. **Manual smoke test.** Install the Stripe App in a test Dashboard, click Settings → "Upgrade to Pro". Expect a new tab opening to `/upgrade`, a plan summary, a Continue button that redirects to Stripe Checkout. Complete checkout with test card `4242 4242 4242 4242`. Expect:

   - Redirect to `/upgrade/success`.
   - Within 30 seconds, the Settings view shows "Pro · $79/mo".

10. **Live-mode-only extras.** For the live-mode flip at launch:

    - On a real merchant account you own, close a test dispute as won (via Stripe's dispute simulation or a real dispute), confirm the success fee line appears on the next invoice.
    - Cross-check `/api/billing/status` `ytd_success_fees_cents` against the Stripe invoice total — a wide gap means our local reconstruction is drifting; investigate before launch.

## Rollback

If anything in step 8 or 9 fails and you cannot fix quickly:

- Revert the billing-lockdown deploy via Vercel dashboard (redeploy the previous known-good commit).
- The iframe will try to call `/api/billing/upgrade-link` which 404s — but no merchant is worse off than they were before the deploy (the button is in an error state rather than producing a broken flow). If you need the pre-lockdown behavior back, the rollback deploy restores it.
