-- Add checklist_notes JSONB to disputes for WIN-14
-- Stores merchant's per-item evidence notes as { "item_name": "note text" }
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_notes JSONB DEFAULT '{}';
