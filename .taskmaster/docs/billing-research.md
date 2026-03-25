# Stripe App Marketplace Billing Research

**Date:** 2026-03-25
**Status:** Complete
**Decision:** Use self-managed Stripe Billing (Option B)

---

## Executive Summary

The Stripe App Marketplace **does not offer built-in billing/subscription management** for app developers. There is no "marketplace billing" analogous to the Apple App Store or Shopify App Store where Stripe handles subscriptions and takes a revenue share. All Stripe Apps that charge users must implement their own billing using Stripe Billing, Stripe Checkout, or equivalent — running on the developer's own infrastructure.

This means WinBack must self-manage its $29/month subscription billing.

---

## Question 1: Does Stripe App Marketplace support flat-rate monthly subscriptions?

**No — not natively.** The Stripe App Marketplace is a distribution channel only, not a billing platform. It handles:
- App discovery and listing
- Installation/uninstallation
- App review and approval

It does **not** handle:
- Subscription billing
- Payment collection from merchants
- Revenue distribution to developers
- Free trial management

Developers must build their own billing flow. The marketplace listing page requires you to "provide a link to a pricing page that explains your pricing model" and states you must not "advertise your service as free and then require users to pay after they've installed the app."

**Source:** [Stripe Apps: Publish your app](https://docs.stripe.com/stripe-apps/publish-app), [Stripe Insiders: Billing for Stripe Apps](https://insiders.stripe.dev/t/billing-for-stripe-apps/1522)

---

## Question 2: What is Stripe's revenue share for marketplace billing?

**There is no revenue share** because there is no marketplace billing. Stripe does not take a cut of your app's subscription revenue beyond standard Stripe processing fees (2.9% + $0.30 per transaction) and Stripe Billing fees (0.7% of billing volume).

This is actually favorable compared to:
- Apple App Store: 15-30% revenue share
- Google Play: 15-30% revenue share
- Shopify App Store: 15-20% revenue share (was historically higher)

**For WinBack at $29/month per merchant:**
- Stripe processing fee: ~$1.14 (2.9% + $0.30)
- Stripe Billing fee: ~$0.20 (0.7% of $29)
- **Total Stripe fees: ~$1.34/month per subscriber (~4.6%)**
- **Net revenue: ~$27.66/month per subscriber**

---

## Question 3: Does marketplace billing support free trials?

Since there's no marketplace billing, you implement free trials yourself via Stripe Billing. Stripe Billing has robust free trial support:

- Trial periods up to 730 days (2 years)
- Can collect payment method upfront or not
- Zero-dollar invoice generated during trial
- Automatic billing when trial ends
- Configurable behavior if no payment method at trial end (cancel or pause)
- Trial period does not count toward MRR

**Gotcha:** If a customer modifies their subscription during trial via the Customer Portal, the trial ends immediately and billing begins.

**Source:** [Stripe: Use trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials)

---

## Question 4: How does billing work from a developer perspective?

Since there is no marketplace billing, developers have two main patterns:

### Pattern A: In-App Settings Page + API
1. User installs the app from the marketplace (free install)
2. App detects no active subscription and shows a paywall/onboarding
3. App settings page collects payment details or redirects to Stripe Checkout
4. Backend creates a Stripe Customer and Subscription via the Billing API
5. App checks subscription status on each load via backend API
6. Webhooks handle subscription lifecycle events (payment failed, canceled, etc.)

**Pros:** Seamless UX, stays in Stripe Dashboard
**Cons:** Must build payment collection UI, handle PCI considerations

### Pattern B: External Pricing Page + Checkout
1. User installs the app from the marketplace (free install)
2. App detects no active subscription and shows paywall with link to external pricing page
3. User clicks link, goes to your website, completes Stripe Checkout
4. Webhook links the Stripe Customer to the Stripe Account ID
5. App checks subscription status on each load

**Pros:** Simpler payment flow (Stripe Checkout handles everything), no PCI concerns
**Cons:** User leaves the Stripe Dashboard, friction in the flow

### Key Implementation Details
- Use `account.application.authorized` webhook to detect new installs
- Use `account.application.deauthorized` webhook to detect uninstalls
- Store mapping of `stripe_account_id` -> `subscription_id` in your database
- Verify subscription status on every API request from the app
- Use `fetchStripeSignature()` to authenticate requests from the Stripe App to your backend

**Source:** [Stripe Apps: Server-side logic](https://docs.stripe.com/stripe-apps/build-backend), [Stripe Insiders: Billing for Stripe Apps](https://insiders.stripe.dev/t/billing-for-stripe-apps/1522)

---

## Question 5: Self-managed Stripe Billing — how does it compare?

There is no "marketplace billing" to compare against. Self-managed Stripe Billing IS the only option. Here's what it costs and how it works:

### Stripe Billing Pricing (as of 2025-2026)
- **0.7% of recurring billing volume** (increased from 0.5% in July 2024)
- Plus standard Stripe processing fees (2.9% + $0.30 per successful card charge)
- No monthly platform fee
- No per-seat fee

### What Stripe Billing Provides
- Subscription lifecycle management (create, update, cancel, pause)
- Invoice generation
- Automatic payment retries (Smart Retries)
- Dunning management (failed payment emails)
- Customer Portal (self-service subscription management)
- Proration handling
- Webhook events for all subscription state changes
- Free trial support
- Multiple pricing models (flat rate, per-seat, usage-based, tiered)

### Cost Analysis for WinBack

| Subscribers | Gross MRR | Stripe Processing (2.9%+$0.30) | Stripe Billing (0.7%) | Total Fees | Net MRR | Effective Rate |
|------------|-----------|-------------------------------|----------------------|-----------|---------|---------------|
| 10 | $290 | $11.41 | $2.03 | $13.44 | $276.56 | 4.6% |
| 50 | $1,450 | $57.05 | $10.15 | $67.20 | $1,382.80 | 4.6% |
| 100 | $2,900 | $114.10 | $20.30 | $134.40 | $2,765.60 | 4.6% |
| 500 | $14,500 | $570.50 | $101.50 | $672.00 | $13,828.00 | 4.6% |

**Source:** [Stripe Billing Pricing](https://stripe.com/billing/pricing), [Stripe Billing Price Increase Analysis](https://www.wingback.com/blog/stripe-billing-price-increase)

---

## Question 6: Gotchas and Limitations

### Stripe App Marketplace Gotchas
1. **No built-in billing = more dev work.** You must build subscription management, paywall UI, payment collection, and webhook handling yourself.
2. **Account ID linking is manual.** When a user installs your app, you get their `stripe_account_id` but must separately link it to a billing customer. There's no automatic association.
3. **Free apps look the same as paid apps in the marketplace.** Users install first, then discover the paywall. This can cause frustration and negative reviews if not communicated clearly on the listing page.
4. **Review takes 4-8 weeks.** Stripe manually reviews every app. Budget this into your timeline.
5. **No marketplace analytics.** Limited visibility into install/uninstall rates from the marketplace itself.
6. **Iframe constraints.** You cannot open Stripe Checkout inside the Stripe Dashboard iframe. You must either use the Stripe Apps SDK components to collect payment info, or redirect users to an external page.

### Stripe Billing Gotchas
1. **0.7% billing fee is on top of processing fees.** Total effective rate is ~4.6% for a $29 subscription.
2. **Customer Portal modifications end trials.** If a customer uses the self-service portal to modify their subscription during a trial, the trial ends immediately.
3. **No native way to bill a Stripe Account.** Stripe Billing creates Customers, not Account-linked subscriptions. You must maintain the mapping yourself.
4. **Webhook reliability.** Webhooks can be delayed or duplicated. Implement idempotency.
5. **Failed payment recovery.** Smart Retries help, but you still need to handle dunning logic and decide when to restrict access.

---

## Recommendation for WinBack

### Use: Self-managed Stripe Billing with Pattern B (External Checkout)

**Rationale:**
1. **It's the only option** — there is no marketplace billing to choose.
2. **Pattern B (external Stripe Checkout) is simpler and safer** for a solo developer:
   - Stripe Checkout handles PCI compliance, payment method collection, and SCA
   - No need to build custom payment forms inside the Stripe App iframe
   - Stripe Checkout supports free trials natively with `subscription_data.trial_period_days`
3. **The ~4.6% effective fee rate is excellent** compared to any app store (15-30%).
4. **Stripe Billing handles the hard parts** — retries, dunning, invoices, customer portal.

### Recommended Implementation Flow
1. User finds WinBack on Stripe App Marketplace and installs (free)
2. App opens in Stripe Dashboard, detects no subscription, shows onboarding/paywall
3. Paywall includes clear pricing ($29/month) and a "Start Free Trial" button
4. Button opens a link to your Vercel-hosted checkout page (passes `stripe_account_id` as a parameter)
5. Checkout page creates a Stripe Checkout Session with 14-day trial and redirects
6. On success, webhook creates the subscription record in Supabase, linked to the `stripe_account_id`
7. App reloads, detects active subscription, unlocks full functionality
8. Ongoing: webhooks handle payment failures, cancellations, renewals

### Timeline Impact
- Research: Done (this document)
- Implementation (billing backend + paywall UI): ~8-10 hours
- This is less work than if marketplace billing existed, since Stripe Checkout does the heavy lifting

---

## Sources

- [Stripe Apps Documentation](https://docs.stripe.com/stripe-apps)
- [Stripe Apps: Publish your app](https://docs.stripe.com/stripe-apps/publish-app)
- [Stripe Apps: Distribution options](https://docs.stripe.com/stripe-apps/distribution-options)
- [Stripe Apps: Server-side logic](https://docs.stripe.com/stripe-apps/build-backend)
- [Stripe Apps: Onboarding](https://docs.stripe.com/stripe-apps/onboarding)
- [Stripe Insiders: Billing for Stripe Apps](https://insiders.stripe.dev/t/billing-for-stripe-apps/1522)
- [Stripe Billing Pricing](https://stripe.com/billing/pricing)
- [Stripe Billing Price Increase (July 2024)](https://www.wingback.com/blog/stripe-billing-price-increase)
- [Stripe: Use trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials)
- [Stripe: Design a subscriptions integration](https://docs.stripe.com/billing/subscriptions/design-an-integration)
- [Stripe: Configure free trials](https://docs.stripe.com/payments/checkout/free-trials)
