import { useState } from 'react';
import { Box, Banner, Badge, Inline, Link, Icon, StripeFileUploader } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { EvidenceFile } from '../../lib/types';
import { fetchBackend, deleteBackend } from '../../lib/apiClient';

interface FileUploadSectionProps {
  disputeId: string;
  checklistItemKey: string;
  existingFile: EvidenceFile | null;
  context: ExtensionContextValue;
  onFileChange: (file: EvidenceFile | null) => void;
  submitted?: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const EXTENSION_TO_MIME: Record<string, string> = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  csv: 'text/csv',
  txt: 'text/plain',
  heic: 'image/heic',
  heif: 'image/heif',
};

/**
 * The Stripe uploader's fileObject.type can be a full MIME type
 * ("application/pdf") or a bare extension ("pdf") depending on how the SDK
 * resolves it. Downstream assembly code in the backend wants real MIME types,
 * so normalize here before persisting to evidence_files.
 */
function normalizeMimeType(type: string | undefined, filename: string | undefined): string {
  const t = (type ?? '').toLowerCase().trim();
  if (t.includes('/')) return t;
  if (t && EXTENSION_TO_MIME[t]) return EXTENSION_TO_MIME[t];
  const name = (filename ?? '').toLowerCase();
  const dot = name.lastIndexOf('.');
  if (dot >= 0) {
    const ext = name.slice(dot + 1);
    if (EXTENSION_TO_MIME[ext]) return EXTENSION_TO_MIME[ext];
  }
  return 'application/octet-stream';
}

function getMimeLabel(mimeType: string): string {
  const map: Record<string, string> = {
    'application/pdf': 'PDF',
    'image/png': 'PNG',
    'image/jpeg': 'JPG',
    'image/gif': 'GIF',
    'text/csv': 'CSV',
    'text/plain': 'TXT',
  };
  return map[mimeType] ?? 'FILE';
}

const FileUploadSection = ({
  disputeId,
  checklistItemKey,
  existingFile,
  context,
  onFileChange,
  submitted,
}: FileUploadSectionProps) => {
  const [error, setError] = useState<string | null>(null);
  const [showReplace, setShowReplace] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUploadComplete = async (fileObject: {
    id: string;
    filename?: string;
    size: number;
    type?: string;
  }) => {
    setError(null);

    const normalizedMime = normalizeMimeType(fileObject.type, fileObject.filename);
    if (normalizedMime === 'image/heic' || normalizedMime === 'image/heif') {
      setError(
        "HEIC photos aren't supported. Open the file in Preview or your photo app, export it as JPEG or PNG, and try again.",
      );
      return;
    }

    setSaving(true);

    try {
      const result = await fetchBackend<{ data: EvidenceFile }>(
        `/api/disputes/${disputeId}/evidence-files`,
        context,
        {
          checklist_item_key: checklistItemKey,
          stripe_file_id: fileObject.id,
          file_name: fileObject.filename ?? 'untitled',
          file_size: fileObject.size,
          mime_type: normalizedMime,
        },
      );
      onFileChange(result.data);
      setShowReplace(false);
    } catch (err) {
      setError('Failed to save file record. The file was uploaded to Stripe but we could not link it. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadError = () => {
    setError('Upload failed. Check your file is under 10MB and a supported type (PDF, PNG, JPG, GIF, CSV, TXT).');
  };

  const handleRemove = async () => {
    if (!existingFile) return;
    setError(null);

    try {
      await deleteBackend(
        `/api/disputes/${disputeId}/evidence-files/${existingFile.id}`,
        context,
      );
      onFileChange(null);
    } catch (err) {
      setError('Failed to remove file. Try again.');
    }
  };

  // Read-only mode post-submission
  if (submitted) {
    if (existingFile) {
      return (
        <Box css={{ stack: 'x', gap: 'xsmall', alignY: 'center', wrap: 'wrap' }}>
          <Icon name="check" size="xsmall" />
          <Inline css={{ font: 'caption', fontWeight: 'semibold' }}>
            {existingFile.file_name}
          </Inline>
          <Badge type="info">{getMimeLabel(existingFile.mime_type)}</Badge>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {formatFileSize(existingFile.file_size)}
          </Inline>
        </Box>
      );
    }
    return (
      <Inline css={{ font: 'caption', color: 'secondary' }}>
        No file attached
      </Inline>
    );
  }

  return (
    <Box css={{ stack: 'y', gap: 'xsmall' }}>
      {error && (
        <Banner
          type="critical"
          title="Upload issue"
          description={error}
          onDismiss={() => setError(null)}
        />
      )}

      {existingFile && !showReplace ? (
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Box css={{ stack: 'x', gap: 'xsmall', alignY: 'center', wrap: 'wrap' }}>
            <Icon name="check" size="xsmall" />
            <Inline css={{ font: 'caption', fontWeight: 'semibold' }}>
              {existingFile.file_name}
            </Inline>
            <Badge type="info">{getMimeLabel(existingFile.mime_type)}</Badge>
            <Inline css={{ font: 'caption', color: 'secondary' }}>
              {formatFileSize(existingFile.file_size)}
            </Inline>
          </Box>
          <Box css={{ stack: 'x', gap: 'small' }}>
            <Link onPress={() => setShowReplace(true)}>
              <Inline css={{ font: 'caption', color: 'info' }}>Replace</Inline>
            </Link>
            <Link onPress={handleRemove}>
              <Inline css={{ font: 'caption', color: 'critical' }}>Remove</Inline>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          {showReplace && (
            <Link onPress={() => setShowReplace(false)}>
              <Inline css={{ font: 'caption', color: 'secondary' }}>Cancel replace</Inline>
            </Link>
          )}
          <StripeFileUploader
            label={saving ? 'Saving...' : 'Choose file'}
            purpose="dispute_evidence"
            onComplete={handleUploadComplete}
            onError={handleUploadError}
          />
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            PDF, PNG, JPG, or GIF. Max 10MB.
          </Inline>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadSection;
