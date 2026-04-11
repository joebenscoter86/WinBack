# WIN-16: Evidence Upload Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-checklist-item file upload to the evidence tab, using the Stripe Apps SDK's native `StripeFileUploader` component with metadata stored in Supabase.

**Architecture:** Files upload directly to Stripe via `StripeFileUploader` (purpose: `dispute_evidence`). The frontend sends file metadata (Stripe file ID, name, size, type) to our backend, which stores it in the existing `evidence_files` table. No Supabase Storage needed. The upload UI is a fourth expandable section ("Attach file") inside each `ChecklistItem`, consistent with the existing "Why this matters" / "Where to find" / "Notes" pattern.

**Tech Stack:** Stripe Apps SDK (`StripeFileUploader`), Next.js App Router (API routes), Supabase (PostgreSQL), Vitest

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `backend/supabase/migrations/007_evidence_files_stripe.sql` | Add `stripe_file_id` column + unique constraint |
| Create | `backend/app/api/disputes/[disputeId]/evidence-files/route.ts` | GET (list) + POST (upsert) evidence file records |
| Create | `backend/app/api/disputes/[disputeId]/evidence-files/[fileId]/route.ts` | DELETE evidence file record |
| Create | `backend/app/api/disputes/[disputeId]/evidence-files/__tests__/route.test.ts` | Tests for GET/POST/DELETE routes |
| Modify | `stripe-app/src/lib/types.ts` | Add `EvidenceFile` type, add `'file'` to `ExpandedSection` usage |
| Modify | `stripe-app/src/lib/apiClient.ts` | Add `deleteBackend` helper |
| Create | `stripe-app/src/components/evidence/FileUploadSection.tsx` | File upload UI per checklist item |
| Modify | `stripe-app/src/components/evidence/ChecklistItem.tsx` | Add `'file'` section type, render `FileUploadSection` |
| Modify | `stripe-app/src/components/evidence/EvidenceChecklist.tsx` | Fetch evidence files, manage files state, pass to children |

---

### Task 1: Database Migration

**Files:**
- Create: `backend/supabase/migrations/007_evidence_files_stripe.sql`

- [ ] **Step 1: Write the migration**

Create `backend/supabase/migrations/007_evidence_files_stripe.sql`:

```sql
-- WIN-16: Add stripe_file_id column and unique constraint for one-file-per-item
ALTER TABLE evidence_files
  ADD COLUMN stripe_file_id TEXT;

ALTER TABLE evidence_files
  ADD CONSTRAINT uq_evidence_files_dispute_item
  UNIQUE (dispute_id, checklist_item_key);
```

- [ ] **Step 2: Apply migration to Supabase**

Run against the WinBack Supabase project. Use the Supabase MCP `apply_migration` tool or run via the dashboard SQL editor. Verify:
- `stripe_file_id` column exists on `evidence_files`
- Unique constraint `uq_evidence_files_dispute_item` is active

- [ ] **Step 3: Commit**

```bash
git add backend/supabase/migrations/007_evidence_files_stripe.sql
git commit -m "feat(backend): add stripe_file_id column and unique constraint to evidence_files (WIN-16)"
```

---

### Task 2: Backend API Routes -- Evidence Files

**Files:**
- Create: `backend/app/api/disputes/[disputeId]/evidence-files/route.ts`
- Create: `backend/app/api/disputes/[disputeId]/evidence-files/[fileId]/route.ts`

- [ ] **Step 1: Write the GET + POST route**

Create `backend/app/api/disputes/[disputeId]/evidence-files/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";

function getDisputeId(request: NextRequest): string | null {
  // URL: /api/disputes/[disputeId]/evidence-files
  const segments = request.nextUrl.pathname.split("/");
  const evidenceIdx = segments.indexOf("evidence-files");
  return evidenceIdx >= 2 ? segments[evidenceIdx - 1] : null;
}

export const GET = withStripeAuth(async (request, { identity }) => {
  const { accountId, userId } = identity;
  const disputeId = getDisputeId(request);

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  const { data, error } = await supabase
    .from("evidence_files")
    .select("id, dispute_id, checklist_item_key, stripe_file_id, file_name, file_size, mime_type, uploaded_at")
    .eq("dispute_id", (
      await supabase
        .from("disputes")
        .select("id")
        .eq("stripe_dispute_id", disputeId)
        .single()
    ).data?.id)
    .order("uploaded_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch evidence files:", error);
    return NextResponse.json(
      { error: "Failed to fetch evidence files", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: data ?? [] });
});

export const POST = withStripeAuth(async (request, { identity, body }) => {
  const { accountId, userId } = identity;
  const disputeId = getDisputeId(request);

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  const { checklist_item_key, stripe_file_id, file_name, file_size, mime_type } = body as {
    checklist_item_key?: string;
    stripe_file_id?: string;
    file_name?: string;
    file_size?: number;
    mime_type?: string;
  };

  if (!checklist_item_key || !stripe_file_id || !file_name) {
    return NextResponse.json(
      { error: "Missing required fields: checklist_item_key, stripe_file_id, file_name", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  // Resolve or create the dispute row
  let { data: dispute } = await supabase
    .from("disputes")
    .select("id")
    .eq("stripe_dispute_id", disputeId)
    .single();

  if (!dispute) {
    const { data: merchant } = await supabase
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", accountId)
      .single();

    const { data: inserted, error: insertError } = await supabase
      .from("disputes")
      .upsert(
        {
          stripe_dispute_id: disputeId,
          merchant_id: merchant?.id,
          amount: 0,
          reason_code: "",
        },
        { onConflict: "stripe_dispute_id" },
      )
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to create dispute row:", insertError);
      return NextResponse.json(
        { error: "Failed to create dispute record", code: "db_error" },
        { status: 500 },
      );
    }
    dispute = inserted;
  }

  // Upsert evidence file (one per checklist item)
  const { data, error } = await supabase
    .from("evidence_files")
    .upsert(
      {
        dispute_id: dispute!.id,
        checklist_item_key,
        stripe_file_id,
        file_name,
        file_size: file_size ?? 0,
        mime_type: mime_type ?? "application/octet-stream",
        file_path: stripe_file_id, // legacy column, store file ID here too
        uploaded_at: new Date().toISOString(),
      },
      { onConflict: "dispute_id,checklist_item_key" },
    )
    .select("id, dispute_id, checklist_item_key, stripe_file_id, file_name, file_size, mime_type, uploaded_at")
    .single();

  if (error) {
    console.error("Failed to upsert evidence file:", error);
    return NextResponse.json(
      { error: "Failed to save evidence file", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ data });
});
```

- [ ] **Step 2: Write the DELETE route**

Create `backend/app/api/disputes/[disputeId]/evidence-files/[fileId]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";

function getFileId(request: NextRequest): string | null {
  // URL: /api/disputes/[disputeId]/evidence-files/[fileId]
  const segments = request.nextUrl.pathname.split("/");
  return segments.at(-1) || null;
}

function getDisputeId(request: NextRequest): string | null {
  const segments = request.nextUrl.pathname.split("/");
  const evidenceIdx = segments.indexOf("evidence-files");
  return evidenceIdx >= 2 ? segments[evidenceIdx - 1] : null;
}

export const DELETE = withStripeAuth(async (request, { identity }) => {
  const { accountId, userId } = identity;
  const disputeId = getDisputeId(request);
  const fileId = getFileId(request);

  if (!disputeId || !fileId) {
    return NextResponse.json(
      { error: "Missing dispute ID or file ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  // Verify the file belongs to a dispute owned by this merchant
  const { data: dispute } = await supabase
    .from("disputes")
    .select("id, merchant_id, merchants!inner(stripe_account_id)")
    .eq("stripe_dispute_id", disputeId)
    .single();

  if (!dispute) {
    return NextResponse.json(
      { error: "Dispute not found", code: "not_found" },
      { status: 404 },
    );
  }

  const { error } = await supabase
    .from("evidence_files")
    .delete()
    .eq("id", fileId)
    .eq("dispute_id", dispute.id);

  if (error) {
    console.error("Failed to delete evidence file:", error);
    return NextResponse.json(
      { error: "Failed to delete evidence file", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
});
```

- [ ] **Step 3: Commit**

```bash
git add backend/app/api/disputes/\[disputeId\]/evidence-files/
git commit -m "feat(backend): add evidence file GET/POST/DELETE routes (WIN-16)"
```

---

### Task 3: Backend Route Tests

**Files:**
- Create: `backend/app/api/disputes/[disputeId]/evidence-files/__tests__/route.test.ts`

- [ ] **Step 1: Write the tests**

Create `backend/app/api/disputes/[disputeId]/evidence-files/__tests__/route.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock stripe-auth to bypass signature verification
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    const body = await req.clone().json().catch(() => ({}));
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(),
}));

// Mock supabase with chainable query builder
const mockSupabase = {
  from: vi.fn(),
};

vi.mock("@/lib/supabase", () => ({
  supabase: new Proxy({}, {
    get: (_target: any, prop: string) => (mockSupabase as any)[prop],
  }),
}));

function makeRequest(
  url: string,
  method: string,
  body?: unknown,
): NextRequest {
  return new NextRequest(`http://localhost${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

// Helper to build a chainable mock that resolves at the end of the chain
function mockChain(result: { data?: unknown; error?: unknown }) {
  const chain: any = {};
  for (const method of ["select", "eq", "order", "single", "upsert", "delete"]) {
    chain[method] = vi.fn().mockReturnValue(chain);
  }
  // The last call in any chain returns the result
  chain.single.mockResolvedValue(result);
  chain.order.mockResolvedValue(result);
  chain.select.mockReturnValue(chain);
  return chain;
}

describe("GET /api/disputes/[disputeId]/evidence-files", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns evidence files for a dispute", async () => {
    const disputeChain = mockChain({ data: { id: "uuid-1" } });
    const filesChain = mockChain({
      data: [
        {
          id: "ef-1",
          dispute_id: "uuid-1",
          checklist_item_key: "Receipt",
          stripe_file_id: "file_abc",
          file_name: "receipt.pdf",
          file_size: 12345,
          mime_type: "application/pdf",
          uploaded_at: "2026-04-10T00:00:00Z",
        },
      ],
    });

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === "disputes") return disputeChain;
      if (table === "evidence_files") return filesChain;
      return mockChain({ data: null });
    });

    const { GET } = await import("../route");
    const res = await GET(
      makeRequest("/api/disputes/dp_test123/evidence-files", "GET"),
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].stripe_file_id).toBe("file_abc");
  });

  it("returns 400 when dispute ID is missing", async () => {
    const { GET } = await import("../route");
    const res = await GET(makeRequest("/api/disputes//evidence-files", "GET"));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.code).toBe("invalid_request");
  });
});

describe("POST /api/disputes/[disputeId]/evidence-files", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates an evidence file record", async () => {
    const disputeChain = mockChain({ data: { id: "uuid-1" } });
    const upsertChain = mockChain({
      data: {
        id: "ef-new",
        dispute_id: "uuid-1",
        checklist_item_key: "Shipping proof",
        stripe_file_id: "file_xyz",
        file_name: "tracking.pdf",
        file_size: 5000,
        mime_type: "application/pdf",
        uploaded_at: "2026-04-10T00:00:00Z",
      },
    });

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === "disputes") return disputeChain;
      if (table === "evidence_files") return upsertChain;
      return mockChain({ data: null });
    });

    const { POST } = await import("../route");
    const res = await POST(
      makeRequest("/api/disputes/dp_test123/evidence-files", "POST", {
        checklist_item_key: "Shipping proof",
        stripe_file_id: "file_xyz",
        file_name: "tracking.pdf",
        file_size: 5000,
        mime_type: "application/pdf",
      }),
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.stripe_file_id).toBe("file_xyz");
  });

  it("returns 400 when required fields are missing", async () => {
    const { POST } = await import("../route");
    const res = await POST(
      makeRequest("/api/disputes/dp_test123/evidence-files", "POST", {
        checklist_item_key: "Receipt",
        // missing stripe_file_id and file_name
      }),
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.code).toBe("invalid_request");
  });
});

describe("DELETE /api/disputes/[disputeId]/evidence-files/[fileId]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes an evidence file record", async () => {
    const disputeChain = mockChain({
      data: { id: "uuid-1", merchant_id: "m-1", merchants: { stripe_account_id: "acct_test" } },
    });
    const deleteChain = mockChain({ data: null, error: null });

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === "disputes") return disputeChain;
      if (table === "evidence_files") return deleteChain;
      return mockChain({ data: null });
    });

    const { DELETE: deleteFn } = await import("../../[fileId]/route");
    const res = await deleteFn(
      makeRequest("/api/disputes/dp_test123/evidence-files/ef-1", "DELETE"),
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run the tests**

```bash
cd backend && npx vitest run app/api/disputes/\[disputeId\]/evidence-files/__tests__/route.test.ts
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add backend/app/api/disputes/\[disputeId\]/evidence-files/__tests__/
git commit -m "test(backend): add evidence file route tests (WIN-16)"
```

---

### Task 4: Frontend Types and API Client

**Files:**
- Modify: `stripe-app/src/lib/types.ts:56-65` (add `EvidenceFile` interface)
- Modify: `stripe-app/src/lib/apiClient.ts` (add `deleteBackend` helper)

- [ ] **Step 1: Add `EvidenceFile` type**

In `stripe-app/src/lib/types.ts`, add after the `PlaybookData` interface (after line 85):

```typescript
export interface EvidenceFile {
  id: string;
  stripe_file_id: string;
  checklist_item_key: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}
```

- [ ] **Step 2: Add `deleteBackend` to apiClient**

In `stripe-app/src/lib/apiClient.ts`, add after the `patchBackend` function (after line 92):

```typescript
/**
 * Makes an authenticated DELETE request to the WinBack backend.
 */
export async function deleteBackend<T = unknown>(
  path: string,
  context: ExtensionContextValue,
): Promise<T> {
  const signature = await fetchStripeSignature();

  const body = JSON.stringify({
    user_id: context.userContext?.id,
    account_id: context.userContext?.account.id,
  });

  const response = await fetch(`${BACKEND_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': signature,
    },
    body,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new ApiError(
      error.message || error.error || `API error: ${response.status}`,
      response.status,
    );
  }
  return response.json() as Promise<T>;
}
```

- [ ] **Step 3: Commit**

```bash
cd stripe-app && git add src/lib/types.ts src/lib/apiClient.ts
git commit -m "feat(stripe-app): add EvidenceFile type and deleteBackend helper (WIN-16)"
```

---

### Task 5: FileUploadSection Component

**Files:**
- Create: `stripe-app/src/components/evidence/FileUploadSection.tsx`

- [ ] **Step 1: Create the component**

Create `stripe-app/src/components/evidence/FileUploadSection.tsx`:

```tsx
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
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
          mime_type: fileObject.type ?? 'application/octet-stream',
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
            PDF, PNG, JPG, GIF, CSV, or TXT. Max 10MB.
          </Inline>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadSection;
```

- [ ] **Step 2: Commit**

```bash
cd stripe-app && git add src/components/evidence/FileUploadSection.tsx
git commit -m "feat(stripe-app): add FileUploadSection component (WIN-16)"
```

---

### Task 6: Integrate Upload Into ChecklistItem

**Files:**
- Modify: `stripe-app/src/components/evidence/ChecklistItem.tsx`

- [ ] **Step 1: Add 'file' to ExpandedSection type and add props**

In `stripe-app/src/components/evidence/ChecklistItem.tsx`, update the `ExpandedSection` type on line 4:

```typescript
export type ExpandedSection = 'why' | 'where' | 'notes' | 'file';
```

Add imports at the top (after existing imports):

```typescript
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { EvidenceFile } from '../../lib/types';
import FileUploadSection from './FileUploadSection';
```

Update `ChecklistItemProps` to add new props:

```typescript
interface ChecklistItemProps {
  item: EvidenceChecklistItem;
  checked: boolean;
  autoPopulated: boolean;
  expandedSections: Set<ExpandedSection>;
  notes: string;
  existingFile: EvidenceFile | null;
  disputeId: string;
  context: ExtensionContextValue;
  onToggle: () => void;
  onSectionToggle: (section: ExpandedSection) => void;
  onNotesChange: (value: string) => void;
  onFileChange: (file: EvidenceFile | null) => void;
}
```

- [ ] **Step 2: Destructure new props and add file section rendering**

Update the component destructuring to include the new props:

```typescript
const ChecklistItem = ({
  item,
  checked,
  autoPopulated,
  expandedSections,
  notes,
  existingFile,
  disputeId,
  context,
  onToggle,
  onSectionToggle,
  onNotesChange,
  onFileChange,
}: ChecklistItemProps) => {
  const whyExpanded = expandedSections.has('why');
  const whereExpanded = expandedSections.has('where');
  const notesExpanded = expandedSections.has('notes');
  const fileExpanded = expandedSections.has('file');
```

Add the "Attach file" toggle in the `<Box css={{ stack: 'x', gap: 'small', wrap: 'wrap' }}>` section, after the "Add notes" toggle (after line 93):

```tsx
<SectionToggle
  label={existingFile ? existingFile.file_name : 'Attach file'}
  expanded={fileExpanded}
  onPress={() => onSectionToggle('file')}
/>
```

Add the file section rendering after the notes expanded section (after line 125 in the original, after the `notesExpanded` block):

```tsx
{fileExpanded && (
  <Box css={{ marginLeft: 'xlarge' }}>
    <FileUploadSection
      disputeId={disputeId}
      checklistItemKey={item.item}
      existingFile={existingFile}
      context={context}
      onFileChange={onFileChange}
    />
  </Box>
)}
```

- [ ] **Step 3: Commit**

```bash
cd stripe-app && git add src/components/evidence/ChecklistItem.tsx
git commit -m "feat(stripe-app): integrate FileUploadSection into ChecklistItem (WIN-16)"
```

---

### Task 7: Wire Up EvidenceChecklist to Fetch and Manage Files

**Files:**
- Modify: `stripe-app/src/components/evidence/EvidenceChecklist.tsx`

- [ ] **Step 1: Add file fetching and state management**

Add imports at the top of `EvidenceChecklist.tsx`:

```typescript
import type { EvidenceFile } from '../../lib/types';
import { fetchBackend } from '../../lib/apiClient';
```

Note: `fetchBackend` is already imported -- just add the `EvidenceFile` import.

Add a new state for files and a fetch effect. After the existing `notesState` declaration (around line 81-82):

```typescript
const [filesState, setFilesState] = useState<Record<string, EvidenceFile | null>>({});
```

Add a useEffect to fetch evidence files when the component mounts. After the existing `useEffect` that rebuilds state (after line 97):

```typescript
useEffect(() => {
  const fetchFiles = async () => {
    try {
      const result = await fetchBackend<{ data: EvidenceFile[] }>(
        `/api/disputes/${dispute.id}/evidence-files`,
        contextRef.current,
      );
      const fileMap: Record<string, EvidenceFile | null> = {};
      for (const file of result.data) {
        fileMap[file.checklist_item_key] = file;
      }
      setFilesState(fileMap);
    } catch (err) {
      console.error('Failed to fetch evidence files:', err);
    }
  };
  fetchFiles();
}, [dispute.id]);
```

Add a file change handler. After the `handleNotesChange` callback:

```typescript
const handleFileChange = useCallback((itemName: string, file: EvidenceFile | null) => {
  setFilesState((prev) => ({ ...prev, [itemName]: file }));
}, []);
```

- [ ] **Step 2: Pass file props to ChecklistItem**

Update the `ChecklistItem` usage in the render section (around line 226) to include the new props:

```tsx
<ChecklistItem
  key={item.item}
  item={item}
  checked={!!checklistState[item.item]}
  autoPopulated={isAutoPopulated(item, dispute)}
  expandedSections={expandedSections.get(item.item) ?? new Set()}
  notes={notesState[item.item] ?? ''}
  existingFile={filesState[item.item] ?? null}
  disputeId={dispute.id}
  context={contextRef.current}
  onToggle={() => handleToggle(item.item)}
  onSectionToggle={(section) => handleSectionToggle(item.item, section)}
  onNotesChange={(value) => handleNotesChange(item.item, value)}
  onFileChange={(file) => handleFileChange(item.item, file)}
/>
```

- [ ] **Step 3: Commit**

```bash
cd stripe-app && git add src/components/evidence/EvidenceChecklist.tsx
git commit -m "feat(stripe-app): wire evidence file state into EvidenceChecklist (WIN-16)"
```

---

### Task 8: Update SDK Constraints Doc

**Files:**
- Modify: `.taskmaster/docs/sdk-constraints.md:121-126`

- [ ] **Step 1: Correct the file upload section**

In `.taskmaster/docs/sdk-constraints.md`, replace the "File Upload" section (lines 121-126) with:

```markdown
### 8. File Upload
- The SDK provides `StripeFileUploader` component for native file uploads
- Uploads directly to Stripe Files API (`POST https://files.stripe.com/v1/files`)
- The app has `file_read` and `file_write` permissions configured
- `onComplete` callback returns the Stripe File object (including `file.id`)
- No drag-and-drop, but `StripeFileUploader` opens a native file picker dialog
- Evidence files: Upload with `purpose: 'dispute_evidence'`, store `file_xxx` ID for submission
```

Also update the UX mapping table row for "Evidence file upload" (line 143):

```markdown
| Evidence file upload | StripeFileUploader with purpose='dispute_evidence' | Yes (native file picker, no drag-and-drop) |
```

And update the "Blockers & Workarounds" table row for file upload (line 157):

```markdown
| No drag-and-drop file upload | Can't do drag-and-drop attachment | StripeFileUploader provides native file picker dialog |
```

- [ ] **Step 2: Commit**

```bash
git add .taskmaster/docs/sdk-constraints.md
git commit -m "docs: correct SDK constraints doc -- StripeFileUploader exists (WIN-16)"
```

---

### Task 9: Smoke Test

- [ ] **Step 1: Start the backend**

```bash
cd backend && npm run dev
```

- [ ] **Step 2: Start the Stripe App**

```bash
cd stripe-app && stripe apps start
```

- [ ] **Step 3: Test the upload flow**

In the Stripe Dashboard (test mode):
1. Navigate to a payment with a dispute
2. Open the WinBack app, click into the dispute workflow
3. Go to the Evidence tab
4. Expand a checklist item's "Attach file" section
5. Upload a test PDF via the file picker
6. Verify: file name, size, and type badge appear after upload
7. Verify: "Replace" and "Remove" links are visible
8. Click "Replace", upload a different file -- verify it updates
9. Click "Remove" -- verify the file info clears
10. Collapse and re-expand "Attach file" -- verify the file state persists (fetched from backend)
11. Navigate away and back to the Evidence tab -- verify files are still shown

- [ ] **Step 4: Verify backend data**

Check Supabase `evidence_files` table:
- Record exists with correct `stripe_file_id`, `file_name`, `file_size`, `mime_type`
- After replace: old record updated (not duplicated) thanks to unique constraint
- After remove: record deleted

- [ ] **Step 5: Final commit (if any fixes needed)**

```bash
git add -A && git commit -m "fix(stripe-app): smoke test fixes for evidence upload (WIN-16)"
```
