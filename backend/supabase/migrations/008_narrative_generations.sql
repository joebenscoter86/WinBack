-- Narrative generation tracking for async Claude API calls (WIN-18)

CREATE TABLE narrative_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  narrative_output JSONB,
  error TEXT,
  generation_number INTEGER NOT NULL,
  merchant_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_narrative_gen_dispute ON narrative_generations(dispute_id);
CREATE INDEX idx_narrative_gen_status ON narrative_generations(status);

CREATE TRIGGER narrative_generations_updated_at BEFORE UPDATE ON narrative_generations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
