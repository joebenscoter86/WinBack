-- WIN-20: add concat_receipts column to dispute_submissions
-- Captures per-slot assembly diagnostics: which files were merged into each
-- slot, their order, and the resulting combined file_id. Nullable and
-- additive — no impact on existing rows.

ALTER TABLE dispute_submissions
  ADD COLUMN concat_receipts JSONB;

COMMENT ON COLUMN dispute_submissions.concat_receipts IS
  'Per-slot concat diagnostics. Shape: { [slot_name]: { input_file_ids: string[], combined_file_id: string } }. Consumed by future narrative enumeration logic.';
