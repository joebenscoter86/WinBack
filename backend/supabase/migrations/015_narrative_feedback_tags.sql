-- Structured feedback tags on narrative regeneration (WIN-35).
--
-- narrative_generations.merchant_feedback already stores the free-text
-- feedback string sent to Claude. This column adds the structured chip
-- selections (e.g. {"too_formal", "too_long"}) so feedback patterns are
-- queryable across merchants without parsing free text.
--
-- NULL means no tags (legacy rows, or regenerations with only free text).
-- Empty array means the merchant explicitly submitted with no chips.

ALTER TABLE narrative_generations
  ADD COLUMN merchant_feedback_tags TEXT[];

COMMENT ON COLUMN narrative_generations.merchant_feedback_tags IS
  'Structured chip selections from the regeneration feedback UI (WIN-35). Allowed values: too_formal, missing_evidence, inaccurate, too_long, other.';
