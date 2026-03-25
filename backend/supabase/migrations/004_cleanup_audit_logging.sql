-- WIN-33: Add audit logging and error handling to evidence cleanup

-- Audit log for evidence cleanup
CREATE TABLE cleanup_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evidence_file_id UUID NOT NULL,
  dispute_id UUID,
  file_path TEXT NOT NULL,
  file_name TEXT,
  deleted_at TIMESTAMPTZ DEFAULT NOW(),
  storage_deleted BOOLEAN DEFAULT false,
  db_deleted BOOLEAN DEFAULT false,
  error_message TEXT
);

CREATE INDEX idx_cleanup_log_deleted_at ON cleanup_log(deleted_at);

-- Replace cleanup function with audit-logging version
CREATE OR REPLACE FUNCTION cleanup_expired_evidence()
RETURNS void AS $$
DECLARE
  expired_record RECORD;
  storage_ok BOOLEAN;
BEGIN
  FOR expired_record IN
    SELECT id, dispute_id, file_path, file_name
    FROM evidence_files
    WHERE expires_at < NOW()
  LOOP
    storage_ok := false;

    -- Delete from storage first
    BEGIN
      DELETE FROM storage.objects
      WHERE bucket_id = 'evidence'
      AND name = expired_record.file_path;

      storage_ok := true;
    EXCEPTION WHEN OTHERS THEN
      -- Log storage failure but continue — file may already be gone
      INSERT INTO cleanup_log (evidence_file_id, dispute_id, file_path, file_name, storage_deleted, db_deleted, error_message)
      VALUES (expired_record.id, expired_record.dispute_id, expired_record.file_path, expired_record.file_name, false, false, SQLERRM);
      -- Still delete the DB record — orphaned storage objects are less harmful than
      -- evidence_files rows that re-trigger failed deletes every day
    END;

    -- Delete DB record
    DELETE FROM evidence_files WHERE id = expired_record.id;

    -- Log successful cleanup
    INSERT INTO cleanup_log (evidence_file_id, dispute_id, file_path, file_name, storage_deleted, db_deleted)
    VALUES (expired_record.id, expired_record.dispute_id, expired_record.file_path, expired_record.file_name, storage_ok, true);
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-purge cleanup_log entries older than 90 days (keep logs lean)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM cleanup_log WHERE deleted_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule log cleanup weekly on Sundays at 4am UTC
SELECT cron.schedule(
  'cleanup-old-audit-logs',
  '0 4 * * 0',
  'SELECT cleanup_old_audit_logs()'
);
