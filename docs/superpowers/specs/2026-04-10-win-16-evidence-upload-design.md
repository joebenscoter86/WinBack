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

Accepted file types and 10MB limit are enforced by the Stripe Files API. Confirmed working: PDF, PNG, JPG, JPEG. Stripe rejects TXT for `dispute_evidence` purpose (and likely CSV). GIF untested but listed in Stripe's bucket config.

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

Add a `deleteBackend` helper that sends a POST (not DELETE) to the removal endpoint. Uses POST because Stripe App signature verification requires a body, and some proxies strip DELETE bodies.

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

**POST (remove)** -- Remove evidence file association

Location: `backend/app/api/disputes/[disputeId]/evidence-files/[fileId]/route.ts`

- Uses POST (not DELETE) because Stripe App signature verification requires a body
- Delete the `evidence_files` record by ID, verify row was removed (404 if not found)
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

## Implementation Learnings

Discoveries from building and smoke-testing WIN-16 that future work should account for:

### All routes must use POST (not GET or DELETE)

The Stripe Apps SDK authenticates via `fetchStripeSignature()`, which produces a signature over a JSON body containing `user_id` and `account_id`. The `withStripeAuth` middleware consumes `request.text()` to verify this signature. This means:

1. **No GET requests from the frontend.** `fetchBackend` always sends POST with a signed body. The backend handles "list" vs "upsert" by checking whether file fields are present in the body.
2. **No DELETE requests.** Some proxies/CDNs strip bodies from DELETE requests, and the Stripe iframe context can have issues with DELETE method bodies. All "delete" operations use POST to a `/[fileId]` sub-route instead.
3. **Never re-read `request.text()` in a handler.** `withStripeAuth` already consumed the body stream. Use the `body` object from `{ identity, body }` that the middleware passes through. Re-reading via `request.clone().text()` returns empty and causes silent 400 errors.

### Stripe Files API accepted types for dispute_evidence

Stripe's documentation is vague on which MIME types are accepted for `purpose: 'dispute_evidence'`. Through testing:

- **Confirmed working:** PDF, PNG, JPG/JPEG
- **Rejected:** TXT (plain text files)
- **Untested:** GIF, CSV, WEBP

The `StripeFileUploader` component does not pre-filter by file type. Rejection happens server-side after upload, surfaced via the `onError` callback. The helper text in `FileUploadSection` lists only confirmed types.

### StripeFileUploader exists but is undocumented

The SDK constraints research initially said "No native file upload component." This was wrong. `StripeFileUploader` is exported from `@stripe/ui-extension-sdk/ui` with full TypeScript types (found at `ui/index.d.ts:1375`). It handles the native file picker, multipart upload to Stripe, and returns the complete File object. The component is not mentioned in Stripe's public SDK documentation or component gallery, only discoverable via the type definitions.

### Replace/remove UX with orphaned Stripe files

When a merchant replaces a file, the old Stripe File object (`file_xxx`) becomes orphaned. Stripe's Files API has no delete endpoint. Stripe manages cleanup of unused files on their end. Our `evidence_files` table only ever has one record per `(dispute_id, checklist_item_key)` due to the unique constraint and upsert semantics, so the DB stays clean.

## Competitive Context

No dispute management competitor (Chargeflow, Disputifier, CertNode, Chargebacks911, Justt) provides a merchant-facing file upload UX. They all rely on automated API integrations that miss evidence not stored in connected platforms. WinBack's structured, per-checklist-item upload is a genuine differentiator.
