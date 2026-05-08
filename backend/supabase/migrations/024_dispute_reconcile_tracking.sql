-- Reconciliation bookkeeping per merchant per livemode.
--
-- Why: the daily reconcile cron used a hardcoded 7-day created-date window,
-- but Insights aggregates over a 90-day window. Disputes 8-90 days old that
-- were not webhook-delivered (e.g. created before merchant install, or
-- delivered during a deploy/cold-start gap) were silently invisible to
-- Insights. QA caught it as "Patterns says 3 fraudulent disputes; Stripe
-- shows 5" + "No resolved disputes yet" while two of the disputes were
-- already lost.
--
-- This migration adds two pairs of columns to the merchants table:
--
--   last_reconciled_at_{test,live}
--     The most recent successful reconcile pass for this merchant in this
--     mode. The reconcile job uses this as the lower bound for the
--     created-date filter so a long uptime gap (or a deploy that drops
--     webhooks) is recovered on the next pass without rescanning all of
--     history.
--
--   disputes_backfilled_at_{test,live}
--     Set the first time the merchant opens the disputes list AFTER
--     install, when we run a one-time 90-day backfill so Insights has
--     real data to aggregate immediately. NULL means backfill has not run
--     for this (merchant, mode) pair yet.
--
-- All four columns are nullable: existing merchants pre-date the column
-- and are treated as "needs backfill" / "no prior reconcile" on the next
-- request that touches them. The reconcile cron and the disputes list
-- route are responsible for setting them.

ALTER TABLE merchants
  ADD COLUMN IF NOT EXISTS last_reconciled_at_test TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_reconciled_at_live TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS disputes_backfilled_at_test TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS disputes_backfilled_at_live TIMESTAMPTZ;
