-- Add checklist_state JSONB to disputes for WIN-14
-- Stores merchant's evidence checklist progress as { "item_name": true/false }
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS checklist_state JSONB DEFAULT '{}';
