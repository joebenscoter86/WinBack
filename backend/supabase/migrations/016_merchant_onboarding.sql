-- WIN-25: First-run onboarding state.
-- NULL = merchant has not dismissed the onboarding panel yet (or reopened it
-- from Settings). A timestamp means the merchant has seen and dismissed the
-- "How WinBack works" panel. Keyed by stripe_account_id on the existing
-- merchants table from migration 001.

ALTER TABLE merchants
  ADD COLUMN onboarding_completed_at TIMESTAMPTZ;
