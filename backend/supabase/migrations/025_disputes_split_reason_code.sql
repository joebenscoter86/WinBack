-- 025_disputes_split_reason_code.sql
-- WIN-78: Split disputes.reason_code into a coarse Stripe reason
-- ("fraudulent") and a network reason code ("10.4"). Pre-migration
-- writers overloaded a single column with both meanings, racing and
-- breaking submit when the webhook ran last.
--
-- After this migration:
--   reason_code         = always Stripe's coarse d.reason
--   network_reason_code = always the network code (10.4, 4853, etc.) or NULL
--
-- The webhook + view-backfill code is updated in the same PR; this
-- migration just makes the column available and seeds it for rows that
-- were already on the "view-backfill ran last" side of the race.
--
-- Backfill regex coverage (intentional gaps):
--   * Visa decimal codes (10.4, 13.1, 13.2, 13.3, 13.6) -- backfilled.
--   * Mastercard 4-digit codes (4808, 4853, 4837, 4855) -- backfilled.
--   * Amex alphanumeric (A01, F10, FR2, C02) -- NOT backfilled.
--   * Visa compliance (C028, C0135) -- NOT backfilled.
--   * Discover 4-digit -- backfilled by the Mastercard branch incidentally.
--
-- WinBack does not currently ship Amex/Discover/Visa-compliance playbooks
-- (see backend/lib/playbooks/data/), so leaving those rows with NULL is
-- safe in practice. Submit's self-heal path (WIN-78 Task 4) re-fetches
-- from Stripe and persists the network code on first submit attempt for
-- any row this regex misses. If/when WinBack adds those playbooks, expand
-- the regex in a follow-up migration.

ALTER TABLE disputes
  ADD COLUMN IF NOT EXISTS network_reason_code text;

UPDATE disputes
   SET network_reason_code = reason_code
 WHERE network_reason_code IS NULL
   AND reason_code IS NOT NULL
   AND (
     reason_code ~ '^[0-9]+\.[0-9]+$'   -- Visa (e.g. 10.4, 13.1)
     OR reason_code ~ '^[0-9]{4}$'      -- Mastercard / Discover (e.g. 4853)
   );

COMMENT ON COLUMN disputes.network_reason_code IS
  'Network reason code (e.g. 10.4 for Visa, 4853 for Mastercard). Used for playbook lookup. Populated by webhook (lib/disputes/to-row.ts), view-backfill (api/disputes/[disputeId]/route.ts), and submit self-heal (api/disputes/[disputeId]/submit/route.ts) -- see WIN-78. reason_code is Stripe coarse; this is the network code.';
