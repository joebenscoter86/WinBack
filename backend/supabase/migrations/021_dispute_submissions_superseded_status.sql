-- Inquiry → chargeback escalation: allow marking prior submissions as superseded.
--
-- When a Stripe inquiry (status warning_*) escalates to a chargeback (needs_response),
-- the merchant must submit evidence again — the inquiry response and chargeback
-- response are separate submissions per Stripe rules. The webhook handler clears
-- evidence_submitted_at on the disputes row, but the submit route's idempotent
-- replay cache (selects active dispute_submissions WHERE status IN ('pending',
-- 'succeeded')) would still find the inquiry-stage row and silently return its
-- cached result on the next submit attempt, never calling Stripe again.
--
-- Adding 'superseded' as a fourth allowed status lets the webhook escalation path
-- mark the prior inquiry-stage row as superseded, taking it out of the active set.
-- The existing partial unique index idx_submissions_active_unique already filters
-- on status IN ('pending', 'succeeded'), so it naturally excludes superseded rows.
-- The route's lookup at backend/app/api/disputes/[disputeId]/submit/route.ts:241-247
-- uses the same filter and so will not see superseded rows.

ALTER TABLE dispute_submissions
  DROP CONSTRAINT dispute_submissions_status_check;

ALTER TABLE dispute_submissions
  ADD CONSTRAINT dispute_submissions_status_check
  CHECK (status IN ('pending', 'succeeded', 'failed', 'superseded'));
