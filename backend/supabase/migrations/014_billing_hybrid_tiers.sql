-- WIN-24: Hybrid billing (15% success fee + $79/mo Pro).
-- Every merchant starts on the `usage` tier with no paywall. Winning a dispute
-- on `usage` reports a 15% usage record to Stripe Billing. Upgrading to Pro
-- flips `billing_tier` and skips usage metering from `pro_since_at` onward.

-- Add new columns
ALTER TABLE merchants
  ADD COLUMN billing_tier TEXT NOT NULL DEFAULT 'usage'
    CHECK (billing_tier IN ('usage', 'pro')),
  ADD COLUMN stripe_billing_customer_id TEXT UNIQUE,
  ADD COLUMN stripe_usage_subscription_id TEXT,
  ADD COLUMN pro_since_at TIMESTAMPTZ,
  ADD COLUMN upgrade_prompted_at TIMESTAMPTZ;

-- Rename legacy `subscription_id` to the more explicit `stripe_subscription_id`.
-- The column was defined in 001 for the old $29 flat model; semantics carry
-- forward but the name now matches `stripe_billing_customer_id`.
ALTER TABLE merchants RENAME COLUMN subscription_id TO stripe_subscription_id;

-- `subscription_status` default was 'trial' from the old flat model. In the
-- hybrid model, usage-tier merchants have no subscription at all — drop the
-- default so new rows land as NULL until they upgrade.
ALTER TABLE merchants ALTER COLUMN subscription_status DROP DEFAULT;
UPDATE merchants SET subscription_status = NULL WHERE subscription_status = 'trial';

CREATE INDEX idx_merchants_billing_tier ON merchants(billing_tier);
