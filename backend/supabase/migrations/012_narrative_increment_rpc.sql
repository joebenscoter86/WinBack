-- WIN-42: atomic narrative generation counter
--
-- Replaces the read-then-UPDATE-with-WHERE-count-= dance in the
-- narratives/generate route. Returns the new count, or NULL when the
-- dispute is already at `p_max` (caller treats NULL as 429 "limit reached").

CREATE OR REPLACE FUNCTION increment_narrative_generations_count(
  p_dispute_id UUID,
  p_max INTEGER
) RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_new_count INTEGER;
BEGIN
  UPDATE disputes
  SET narrative_generations_count = narrative_generations_count + 1,
      updated_at = NOW()
  WHERE id = p_dispute_id
    AND narrative_generations_count < p_max
  RETURNING narrative_generations_count INTO v_new_count;

  RETURN v_new_count;
END;
$$;
