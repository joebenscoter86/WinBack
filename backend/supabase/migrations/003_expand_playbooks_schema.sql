-- Expand playbooks table with richer columns for WIN-13
-- Adds: category, legacy_code, response_deadline_days, filing_window_days,
--        acquirer_prereview, key_differences

ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS legacy_code TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS response_deadline_days INTEGER;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS filing_window_days INTEGER;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS acquirer_prereview TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS key_differences TEXT;
