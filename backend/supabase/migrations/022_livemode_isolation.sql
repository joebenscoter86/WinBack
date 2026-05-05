-- Live/Test mode data isolation.
--
-- Stripe rejected v1.1.6 because the app showed test mode disputes when the
-- merchant had the dashboard in live mode. Root cause: the backend used a
-- single STRIPE_SECRET_KEY (test) for all merchants regardless of which
-- dashboard mode they were viewing. The fix is per-request mode selection,
-- which means we need to record mode on every mode-bearing row so SELECTs
-- can filter and INSERTs can persist the source mode.
--
-- All existing rows in this database came from test mode keys (the dev
-- Supabase has only ever been pointed at sk_test_*), so the backfill is
-- livemode=false universally.

-- 1. disputes table -----------------------------------------------------------

ALTER TABLE disputes
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN NOT NULL DEFAULT false;

-- Composite index supports the dominant query pattern: list by merchant
-- and mode, ordered by created. stripe_dispute_id is already unique
-- across modes (Stripe never reuses an id), so no separate uniqueness
-- index needs livemode.
CREATE INDEX IF NOT EXISTS idx_disputes_merchant_livemode
  ON disputes(merchant_id, livemode, created_at DESC);

-- 2. webhook_events -----------------------------------------------------------

ALTER TABLE webhook_events
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN;

-- Existing rows can stay null. They predate the column and we don't
-- need to retroactively classify them. Future inserts MUST populate it
-- (enforced at the handler layer).

-- 3. dispute_submissions ------------------------------------------------------

ALTER TABLE dispute_submissions
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN NOT NULL DEFAULT false;

-- 4. narrative_generations ----------------------------------------------------

ALTER TABLE narrative_generations
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN NOT NULL DEFAULT false;

-- 5. evidence_files -----------------------------------------------------------
--
-- evidence_files joins through disputes(dispute_id), so a livemode filter
-- can be applied via that join. We still add the column to enable
-- per-mode aggregations (e.g. how many evidence files were uploaded in
-- live mode this month) and to give us a defense-in-depth check.
-- Queries that read evidence_files directly without the join still get
-- mode isolation.
ALTER TABLE evidence_files
  ADD COLUMN IF NOT EXISTS livemode BOOLEAN NOT NULL DEFAULT false;

-- After this migration runs:
--   - disputes.livemode is required on every row (default false).
--   - INSERTs from the webhook handler must explicitly set livemode from
--     event.livemode. The DEFAULT false is a safety net only.
--   - SELECTs from app routes must filter by livemode = $1 where $1 is
--     the request's verified livemode.
