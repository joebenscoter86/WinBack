-- Evidence storage bucket (10MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'evidence',
  'evidence',
  false,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'text/csv']
);

-- Storage RLS policies
CREATE POLICY "Evidence files readable by owner"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'evidence');

CREATE POLICY "Service role can insert evidence"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'evidence');

CREATE POLICY "Service role can delete evidence"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'evidence');

-- Enable pg_cron for scheduled cleanup
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Cleanup function: deletes expired evidence from both DB and storage
CREATE OR REPLACE FUNCTION cleanup_expired_evidence()
RETURNS void AS $$
DECLARE
  expired_record RECORD;
BEGIN
  FOR expired_record IN
    SELECT id, file_path FROM evidence_files WHERE expires_at < NOW()
  LOOP
    DELETE FROM storage.objects
    WHERE bucket_id = 'evidence'
    AND name = expired_record.file_path;

    DELETE FROM evidence_files WHERE id = expired_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Run daily at 3am UTC
SELECT cron.schedule(
  'cleanup-expired-evidence',
  '0 3 * * *',
  'SELECT cleanup_expired_evidence()'
);
