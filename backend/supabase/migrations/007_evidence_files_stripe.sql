-- WIN-16: Add stripe_file_id column and unique constraint for one-file-per-item
ALTER TABLE evidence_files
  ADD COLUMN stripe_file_id TEXT;

ALTER TABLE evidence_files
  ADD CONSTRAINT uq_evidence_files_dispute_item
  UNIQUE (dispute_id, checklist_item_key);
