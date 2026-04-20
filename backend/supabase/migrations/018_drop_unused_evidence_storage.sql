-- WIN-28 follow-up: tear down unused evidence storage infrastructure.
--
-- The 'evidence' Supabase Storage bucket and the daily cleanup cron were
-- built (migrations 003/004, originally tracked by WIN-33) before the
-- architecture pivoted to direct browser-to-Stripe uploads. Nothing in the
-- app ever writes to the bucket; the evidence_files table only stores the
-- Stripe file ID returned from the client-side upload. The bucket has been
-- empty in dev and never existed in prod.
--
-- This migration removes the dead infrastructure so the schema matches
-- reality and so we do not accidentally start using it.

-- 1. Unschedule the cron jobs if they exist.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'cleanup-expired-evidence') THEN
    PERFORM cron.unschedule('cleanup-expired-evidence');
  END IF;
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'cleanup-old-audit-logs') THEN
    PERFORM cron.unschedule('cleanup-old-audit-logs');
  END IF;
END $$;

-- 2. Drop the cleanup functions.
DROP FUNCTION IF EXISTS cleanup_expired_evidence();
DROP FUNCTION IF EXISTS cleanup_old_audit_logs();

-- 3. Drop the audit log table (only ever written by the dropped function).
DROP TABLE IF EXISTS cleanup_log;

-- 4. Drop the storage RLS policies that scoped the unused bucket.
DROP POLICY IF EXISTS "Evidence files readable by owner" ON storage.objects;
DROP POLICY IF EXISTS "Service role can insert evidence" ON storage.objects;
DROP POLICY IF EXISTS "Service role can delete evidence" ON storage.objects;

-- 5. Drop the unused expires_at column from evidence_files. The original
-- 30-day TTL was meant to drive bucket cleanup; since nothing reads or sets
-- this column at runtime, it is dead schema.
ALTER TABLE evidence_files DROP COLUMN IF EXISTS expires_at;

-- 6. The 'evidence' Supabase Storage bucket itself is NOT removed in this
-- migration. Supabase's storage.protect_delete() trigger blocks direct SQL
-- deletes against storage.objects / storage.buckets. Remove the empty
-- bucket manually via the Supabase Dashboard (Storage > evidence > Delete)
-- or via the Storage API. Leaving the bucket in place is harmless: nothing
-- writes to it, and the RLS policies that scoped it are gone.

-- Note: pg_cron and pg_net extensions are intentionally left enabled.
-- They are general-purpose and may be used by future scheduled work.
