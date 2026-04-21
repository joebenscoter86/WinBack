-- WIN-58, WIN-59: Fix double-submit race and stale-pending idempotency key reuse
--
-- Problem 1 (WIN-58): The SELECT-then-INSERT idempotency gate in the submit
-- route did not actually prevent concurrent double-submits. The only unique
-- constraint on dispute_submissions was on idempotency_key — a fresh UUID per
-- request, unique by construction — so the INSERT could never fail the race.
-- Two concurrent POSTs both saw "no active row", both inserted, both called
-- Stripe with different idempotency keys.
--
-- Problem 2 (WIN-59): On stale-pending retry the route minted a new UUID, so
-- if the original Stripe call was still in flight (network stall >60s, not a
-- true timeout), Stripe's idempotency dedup was bypassed and evidence could be
-- submitted twice with different payloads. This violates the irrevocability
-- invariant in CLAUDE.md.

-- Fix 1: enforce "at most one active submission per dispute" at the DB level.
-- Concurrent INSERTs now race at the index, loser gets a 23505 unique violation
-- which the route maps to a 409 submission_in_progress.
CREATE UNIQUE INDEX idx_submissions_active_unique
  ON dispute_submissions(dispute_id)
  WHERE status IN ('pending', 'succeeded');

-- Fix 2: drop global UNIQUE on idempotency_key so a stale-pending retry can
-- reuse the same key. Stripe-side dedup is what matters for irrevocability;
-- global uniqueness on our side was incidental. Multiple historical rows (e.g.
-- one failed + one succeeded) can now share a key, which is exactly the point.
ALTER TABLE dispute_submissions
  DROP CONSTRAINT IF EXISTS dispute_submissions_idempotency_key_key;

-- Keep a non-unique index for reverse lookups / debugging.
CREATE INDEX IF NOT EXISTS idx_submissions_idempotency_key
  ON dispute_submissions(idempotency_key);

-- The old non-unique partial index is fully subsumed by the new unique one.
DROP INDEX IF EXISTS idx_submissions_active;
