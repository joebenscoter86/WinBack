-- WIN-26: Track when the merchant first opened a dispute in WinBack, so the
-- list view can badge newly-arrived disputes as "New" until the merchant
-- acknowledges them by opening the workflow. NULL = unseen.
--
-- Backfill existing rows with created_at so we don't badge every historical
-- dispute on first deploy -- only disputes that arrive after this migration
-- will be considered "new".

ALTER TABLE disputes
  ADD COLUMN viewed_at TIMESTAMPTZ;

UPDATE disputes
  SET viewed_at = created_at
  WHERE viewed_at IS NULL;
