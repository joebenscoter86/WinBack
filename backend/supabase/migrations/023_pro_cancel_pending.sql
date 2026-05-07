-- WIN: Track pending Pro cancellations so the app can show
-- "Pro - cancels on YYYY-MM-DD" instead of just "Pro" for merchants who
-- have cancelled via the Stripe Customer Portal but are still inside the
-- paid period. Stripe's portal does cancel-at-period-end by default --
-- the subscription stays `active` until `cancel_at`, then a
-- subscription.deleted event fires. Without these columns the billing
-- handler had no way to surface the pending state.

ALTER TABLE merchants
  ADD COLUMN cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN cancel_at TIMESTAMPTZ;
