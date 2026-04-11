# WIN-16: Evidence Upload Component

## Summary

Per-checklist-item file upload using the Stripe Apps SDK's native `StripeFileUploader` component. Files upload directly to Stripe's Files API -- no Supabase Storage, no backend upload proxy. Our database stores metadata only (Stripe file ID, filename, size, type).

## Key Decisions

### Stripe-only file storage (no Supabase Storage)

Files upload directly to Stripe via `StripeFileUploader` with `purpose: 'dispute_evidence'`. The `evidence_files` table stores metadata and the Stripe `file_xxx` ID. No copies in Supabase Storage.

**Why:** Storing merchant evidence files in an external database creates data custodian liability (GDPR, breach notification, potential PCI scope), and would likely complicate Stripe App Marketplace review. The `StripeFileUploader` component exists precisely so apps keep sensitive data within Stripe's ecosystem. This also eliminates the need for the pg_cron evidence cleanup job -- Stripe manages file lifecycle.

### One file per checklist item

Each checklist item accepts a single file. Replace overwrites the record. No multi-file-per-item support.

**Why:** Stripe's Disputes API evidence fields each accept a single file ID. Multi-file would require PDF merging on the backend. If merchants have multiple documents for one item, the "Where to find this" coaching can suggest combining into a single PDF before uploading. Multi-file can be added later if merchants request it.

### Fourth expandable section in ChecklistItem

Upload UI lives in an "Attach file" expandable section, same pattern as "Why this matters" / "Where to find" / "Notes".

**Why:** Keeps the checklist scannable. Playbooks can have 10+ items. Merchants expand the upload section only when ready to attach evidence for that specific item.

## Architecture

```
Merchant clicks "Attach file"
  -> StripeFileUploader opens native file picker
  -> SDK uploads to Stripe Files API (purpose: 'dispute_evidence')
  -> onComplete returns { id: 'file_xxx', filename, size, ... }
  -> Frontend POSTs metadata to backend
  -> Backend upserts evidence_files record in Supabase
```

## Frontend

### New component: `FileUploadSection`

Location: `stripe-app/src/components/evidence/FileUploadSection.tsx`

A self-contained component rendered inside `ChecklistItem` as a fourth expandable section.

**Props:**
```typescript
interface FileUploadSectionProps {
  disputeId: string;
  checklistItemKey: string;
  existingFile: EvidenceFile | null;
  context: ExtensionContextValue;
  onFileChange: (file: EvidenceFile | null) => void;
}
```

**States:**

| State | What renders |
|-------|-------------|
| No file, collapsed | Toggle label: "Attach file" |
| No file, expanded | `StripeFileUploader` with label "Choose file" |
| Uploading | `StripeFileUploader` handles progress internally |
| Upload error | `Banner` with error message and retry guidance |
| File attached, collapsed | Toggle label: filename (truncated) with checkmark icon |
| File attached, expanded | File info (name, size, type badge) + "Replace" and "Remove" links. "Replace" reveals `StripeFileUploader` below the file info. |

**StripeFileUploader usage:**
```tsx
import { StripeFileUploader } from '@stripe/ui-extension-sdk/ui';

<StripeFileUploader
  label="Choose file"
  purpose="dispute_evidence"
  onComplete={(file) => {
    // file.id = 'file_xxx'
    // Save metadata to backend, update local state
  }}
  onError={(err) => {
    // Show error banner
  }}
/>
```

Accepted file types and 10MB limit are enforced by the Stripe Files API and the storage bucket config. Supported types: PDF, PNG, JPG, JPEG, GIF, CSV, TXT.

### Changes to `ChecklistItem`

Add a fourth `ExpandedSection` type: `'file'`.

Add `FileUploadSection` rendering when the file section is expanded, same pattern as the existing why/where/notes sections.

New prop: `existingFile: EvidenceFile | null` to pass current file state down.

### Changes to `EvidenceChecklist`

- Fetch evidence files for the dispute on mount (GET `/api/disputes/{id}/evidence-files`)
- Maintain a `filesState: Record<string, EvidenceFile | null>` keyed by checklist item key
- Pass file state and change handler down to each `ChecklistItem`

### New type: `EvidenceFile`

Added to `stripe-app/src/lib/types.ts`:

```typescript
export interface EvidenceFile {
  id: string;              // evidence_files.id (UUID)
  stripe_file_id: string;  // Stripe file_xxx ID
  file_name: string;
  file_size: number;       // bytes
  mime_type: string;
  uploaded_at: string;     // ISO timestamp
}
```

### Changes to `apiClient.ts`

Add a `deleteBackend` helper following the same pattern as `fetchBackend` and `patchBackend`, for the file removal endpoint.

## Backend

### New API routes

Location: `backend/app/api/disputes/[disputeId]/evidence-files/route.ts`

**GET** -- List evidence files for a dispute

- Query `evidence_files` where dispute matches the Stripe dispute ID (join through disputes table)
- Return `{ data: EvidenceFile[] }`

**POST** -- Create or replace evidence file for a checklist item

- Body: `{ checklist_item_key, stripe_file_id, file_name, file_size, mime_type }`
- Upsert on `(dispute_id, checklist_item_key)` -- enforces one file per item
- If dispute row doesn't exist yet, create it (same pattern as the PATCH route's upsert)
- Return `{ data: EvidenceFile }`

**DELETE** -- Remove evidence file association

Location: `backend/app/api/disputes/[disputeId]/evidence-files/[fileId]/route.ts`

- Delete the `evidence_files` record by ID
- Verify the file belongs to a dispute owned by the authenticated merchant
- Does NOT delete the file from Stripe (Files API doesn't support deletion)
- Return `{ success: true }`

All routes protected by `withStripeAuth`.

## Database Changes

### Migration: add unique constraint

```sql
ALTER TABLE evidence_files
  ADD CONSTRAINT uq_evidence_files_dispute_item
  UNIQUE (dispute_id, checklist_item_key);
```

This enforces one file per checklist item at the DB level. The POST route uses upsert (`ON CONFLICT ... DO UPDATE`) to handle replacements cleanly.

### Schema note

Add a `stripe_file_id` column to `evidence_files` for clarity. The existing `file_path` column was designed for Supabase Storage paths; repurposing it would be confusing. The migration adds the new column alongside the unique constraint:

```sql
ALTER TABLE evidence_files
  ADD COLUMN stripe_file_id TEXT;

ALTER TABLE evidence_files
  ADD CONSTRAINT uq_evidence_files_dispute_item
  UNIQUE (dispute_id, checklist_item_key);
```

Backend routes use `stripe_file_id` for all reads/writes. The `file_path` column is left in place (no data to migrate) and can be dropped in a future cleanup.

## Cleanup Opportunities (not in scope for WIN-16)

- Migration 003's Supabase Storage bucket, RLS policies, and pg_cron cleanup job for evidence are no longer needed
- The `expires_at` column on `evidence_files` is no longer load-bearing (Stripe manages file lifecycle)
- These can be cleaned up in a separate chore task

## What This Does Not Cover

- **Mapping checklist items to Stripe evidence field names** -- that's WIN-20 (evidence submission)
- **File preview/thumbnails** -- not needed; filename + size + type badge is sufficient
- **Drag-and-drop** -- SDK doesn't support it; `StripeFileUploader` opens a native file picker
- **Multi-file per checklist item** -- deferred; can be added later if merchants request it

## Competitive Context

No dispute management competitor (Chargeflow, Disputifier, CertNode, Chargebacks911, Justt) provides a merchant-facing file upload UX. They all rely on automated API integrations that miss evidence not stored in connected platforms. WinBack's structured, per-checklist-item upload is a genuine differentiator.
