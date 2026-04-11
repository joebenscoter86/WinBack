# WIN-18: Claude API Integration Backend Route Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Vercel API routes that call Claude to generate dispute response narratives with background processing, hallucination validation, and a 5-generation limit.

**Architecture:** POST `/api/narratives/generate` accepts a request, inserts a pending row in `narrative_generations`, returns a `generation_id` immediately (202), then runs Claude in the background via `waitUntil()`. GET `/api/narratives/[generationId]/status` lets the client poll for results. A hallucination validator strips fabricated evidence references before storing the output.

**Tech Stack:** Next.js 15 App Router, Anthropic SDK (`@anthropic-ai/sdk`), Supabase (PostgreSQL), Vitest

---

## File Structure

| File | Responsibility |
|------|---------------|
| `backend/supabase/migrations/008_narrative_generations.sql` | New table for tracking generation attempts |
| `backend/lib/claude.ts` | Anthropic client wrapper, `generateNarrative()` |
| `backend/lib/narratives/validate-hallucinations.ts` | Post-generation evidence validation |
| `backend/lib/narratives/generate-background.ts` | Orchestrator: prompt -> Claude -> validate -> save |
| `backend/app/api/narratives/generate/route.ts` | POST handler (accepts request, kicks off background) |
| `backend/app/api/narratives/[generationId]/status/route.ts` | GET handler (polling endpoint) |
| `backend/lib/narratives/__tests__/validate-hallucinations.test.ts` | Hallucination validator tests |
| `backend/lib/narratives/__tests__/generate-background.test.ts` | Background orchestrator tests |
| `backend/app/api/narratives/__tests__/generate.test.ts` | POST route tests |
| `backend/app/api/narratives/__tests__/status.test.ts` | GET polling route tests |

---

### Task 1: Database Migration

**Files:**
- Create: `backend/supabase/migrations/008_narrative_generations.sql`

- [ ] **Step 1: Write the migration**

```sql
-- Narrative generation tracking for async Claude API calls (WIN-18)

CREATE TABLE narrative_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  narrative_output JSONB,
  error TEXT,
  generation_number INTEGER NOT NULL,
  merchant_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_narrative_gen_dispute ON narrative_generations(dispute_id);
CREATE INDEX idx_narrative_gen_status ON narrative_generations(status);

CREATE TRIGGER narrative_generations_updated_at BEFORE UPDATE ON narrative_generations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

- [ ] **Step 2: Apply the migration**

Run from `backend/`:
```bash
npx supabase db push
```

Or apply manually via Supabase dashboard SQL editor if not using the CLI locally.

- [ ] **Step 3: Commit**

```bash
git add backend/supabase/migrations/008_narrative_generations.sql
git commit -m "feat(backend): add narrative_generations table (WIN-18)"
```

---

### Task 2: Claude API Client Wrapper

**Files:**
- Test: `backend/lib/__tests__/claude.test.ts`
- Create: `backend/lib/claude.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/lib/__tests__/claude.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@anthropic-ai/sdk", () => {
  const mockCreate = vi.fn();
  return {
    default: vi.fn().mockImplementation(() => ({
      messages: { create: mockCreate },
    })),
    __mockCreate: mockCreate,
  };
});

import Anthropic from "@anthropic-ai/sdk";

// Access the mock's create fn
const mockCreate = (await import("@anthropic-ai/sdk") as any).__mockCreate;

describe("generateNarrative", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ANTHROPIC_API_KEY = "sk-ant-test-key";
  });

  it("returns parsed NarrativeOutput on success", async () => {
    const mockOutput = {
      narrative: "**Transaction Authentication**\nThe CVC check passed.",
      annotations: [
        { section: "Transaction Authentication", reasoning: "Proves cardholder had the card" },
      ],
    };
    mockCreate.mockResolvedValue({
      content: [{ type: "text", text: JSON.stringify(mockOutput) }],
    });

    const { generateNarrative } = await import("../claude");
    const result = await generateNarrative({
      system: "You are a dispute writer.",
      user: "Generate a narrative for Visa 10.4.",
    });

    expect(result).toEqual(mockOutput);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: "You are a dispute writer.",
        messages: [{ role: "user", content: "Generate a narrative for Visa 10.4." }],
      }),
    );
  });

  it("throws on invalid JSON response", async () => {
    mockCreate.mockResolvedValue({
      content: [{ type: "text", text: "not json" }],
    });

    const { generateNarrative } = await import("../claude");
    await expect(
      generateNarrative({ system: "sys", user: "usr" }),
    ).rejects.toThrow("Invalid JSON");
  });

  it("throws on missing narrative field", async () => {
    mockCreate.mockResolvedValue({
      content: [{ type: "text", text: JSON.stringify({ annotations: [] }) }],
    });

    const { generateNarrative } = await import("../claude");
    await expect(
      generateNarrative({ system: "sys", user: "usr" }),
    ).rejects.toThrow("missing narrative");
  });

  it("throws when ANTHROPIC_API_KEY is missing", async () => {
    delete process.env.ANTHROPIC_API_KEY;

    // Force re-import to pick up missing key
    vi.resetModules();
    vi.mock("@anthropic-ai/sdk", () => {
      return {
        default: vi.fn().mockImplementation(() => {
          throw new Error("Missing API key");
        }),
      };
    });

    const mod = await import("../claude");
    await expect(
      mod.generateNarrative({ system: "sys", user: "usr" }),
    ).rejects.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run lib/__tests__/claude.test.ts`
Expected: FAIL -- `generateNarrative` does not exist.

- [ ] **Step 3: Write the implementation**

Create `backend/lib/claude.ts`:

```typescript
import Anthropic from "@anthropic-ai/sdk";
import type { NarrativeOutput } from "@/lib/prompts/types";
import type { PromptResult } from "@/lib/prompts/build-prompt";

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      throw new Error("Missing ANTHROPIC_API_KEY");
    }
    _client = new Anthropic({ apiKey: key });
  }
  return _client;
}

export async function generateNarrative(
  prompt: PromptResult,
): Promise<NarrativeOutput> {
  if (!prompt.user) {
    throw new Error("No user prompt -- template not found for this reason code");
  }

  const response = await getClient().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: prompt.system,
    messages: [{ role: "user", content: prompt.user }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in Claude response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch {
    throw new Error("Invalid JSON in Claude response");
  }

  if (
    !parsed ||
    typeof parsed !== "object" ||
    !("narrative" in parsed) ||
    typeof (parsed as any).narrative !== "string"
  ) {
    throw new Error("Claude response missing narrative field");
  }

  const output = parsed as NarrativeOutput;
  if (!Array.isArray(output.annotations)) {
    output.annotations = [];
  }

  return output;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx vitest run lib/__tests__/claude.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/lib/claude.ts backend/lib/__tests__/claude.test.ts
git commit -m "feat(backend): Claude API client wrapper (WIN-18)"
```

---

### Task 3: Hallucination Validator

**Files:**
- Test: `backend/lib/narratives/__tests__/validate-hallucinations.test.ts`
- Create: `backend/lib/narratives/validate-hallucinations.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/lib/narratives/__tests__/validate-hallucinations.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { validateHallucinations } from "../validate-hallucinations";
import type { NarrativeOutput, EvidenceFileRef } from "@/lib/prompts/types";

const baseNarrative: NarrativeOutput = {
  narrative: [
    '**Delivery Confirmation**',
    'The tracking number shows delivery on March 18.',
    '',
    '**Address Verification**',
    'AVS check confirms the billing address matches.',
  ].join('\n'),
  annotations: [
    { section: "Delivery Confirmation", reasoning: "Proves delivery" },
    { section: "Address Verification", reasoning: "Confirms address" },
  ],
};

describe("validateHallucinations", () => {
  it("returns narrative unchanged when all evidence keys are present", () => {
    const evidenceFiles: EvidenceFileRef[] = [
      { checklist_item_key: "tracking_number", file_name: "tracking.pdf" },
      { checklist_item_key: "delivery_confirmation", file_name: "delivery.png" },
    ];

    const result = validateHallucinations(baseNarrative, evidenceFiles);

    expect(result.narrative).toEqual(baseNarrative);
    expect(result.strippedReferences).toEqual([]);
  });

  it("strips references to evidence keys not in uploaded files", () => {
    const narrative: NarrativeOutput = {
      narrative: [
        '**Delivery Confirmation**',
        'The tracking number (uploaded as "tracking_number") shows delivery.',
        '',
        '**Refund Records**',
        'The refund receipt (uploaded as "refund_receipt") confirms no refund was issued.',
      ].join('\n'),
      annotations: [
        { section: "Delivery Confirmation", reasoning: "Proves delivery" },
        { section: "Refund Records", reasoning: "No refund" },
      ],
    };

    // Only tracking_number was uploaded, NOT refund_receipt
    const evidenceFiles: EvidenceFileRef[] = [
      { checklist_item_key: "tracking_number", file_name: "tracking.pdf" },
    ];

    const result = validateHallucinations(narrative, evidenceFiles);

    expect(result.narrative.narrative).toContain("tracking_number");
    expect(result.narrative.narrative).not.toContain("refund_receipt");
    expect(result.strippedReferences).toContain("refund_receipt");
  });

  it("handles narrative with no evidence key references", () => {
    const narrative: NarrativeOutput = {
      narrative: "The transaction was properly authenticated with a passing CVC check.",
      annotations: [],
    };

    const result = validateHallucinations(narrative, []);

    expect(result.narrative).toEqual(narrative);
    expect(result.strippedReferences).toEqual([]);
  });

  it("handles empty evidence files list", () => {
    const narrative: NarrativeOutput = {
      narrative: 'The document (uploaded as "invoice_copy") shows the charge.',
      annotations: [],
    };

    const result = validateHallucinations(narrative, []);

    expect(result.narrative.narrative).not.toContain("invoice_copy");
    expect(result.strippedReferences).toContain("invoice_copy");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run lib/narratives/__tests__/validate-hallucinations.test.ts`
Expected: FAIL -- module not found.

- [ ] **Step 3: Write the implementation**

Create `backend/lib/narratives/validate-hallucinations.ts`:

```typescript
import type { NarrativeOutput, EvidenceFileRef } from "@/lib/prompts/types";

export interface ValidationResult {
  narrative: NarrativeOutput;
  strippedReferences: string[];
}

/**
 * Post-generation hallucination check.
 * Scans narrative for quoted evidence key references (e.g., "tracking_number")
 * and strips any that don't correspond to actually uploaded evidence files.
 */
export function validateHallucinations(
  output: NarrativeOutput,
  evidenceFiles: EvidenceFileRef[],
): ValidationResult {
  const uploadedKeys = new Set(evidenceFiles.map((f) => f.checklist_item_key));

  // Find all quoted evidence key references in the narrative:
  // matches patterns like "some_evidence_key" (quoted with double quotes)
  const keyPattern = /"([a-z][a-z0-9_]+)"/g;
  const referencedKeys: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = keyPattern.exec(output.narrative)) !== null) {
    referencedKeys.push(match[1]);
  }

  // Find keys that are referenced but not uploaded
  const hallucinated = referencedKeys.filter((key) => !uploadedKeys.has(key));

  if (hallucinated.length === 0) {
    return { narrative: output, strippedReferences: [] };
  }

  // Strip sentences containing hallucinated references
  let cleaned = output.narrative;
  for (const key of hallucinated) {
    // Remove sentences that reference the hallucinated key
    // A sentence ends with a period, exclamation, or newline
    const sentencePattern = new RegExp(
      `[^.!\\n]*"${key}"[^.!\\n]*[.!]?\\s*`,
      "g",
    );
    cleaned = cleaned.replace(sentencePattern, "");
  }

  // Clean up any double newlines left behind
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").trim();

  // Remove annotations for sections that were fully stripped
  const cleanedAnnotations = output.annotations.filter((a) => {
    const sectionHeader = `**${a.section}**`;
    return cleaned.includes(sectionHeader);
  });

  return {
    narrative: { narrative: cleaned, annotations: cleanedAnnotations },
    strippedReferences: hallucinated,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx vitest run lib/narratives/__tests__/validate-hallucinations.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/lib/narratives/validate-hallucinations.ts backend/lib/narratives/__tests__/validate-hallucinations.test.ts
git commit -m "feat(backend): hallucination validator for narrative output (WIN-18)"
```

---

### Task 4: Background Generation Orchestrator

**Files:**
- Test: `backend/lib/narratives/__tests__/generate-background.test.ts`
- Create: `backend/lib/narratives/generate-background.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/lib/narratives/__tests__/generate-background.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/claude", () => ({
  generateNarrative: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: {}, error: null }),
  },
}));

vi.mock("@/lib/playbooks", () => ({
  getPlaybook: vi.fn(),
}));

import { generateNarrative } from "@/lib/claude";
import { supabase } from "@/lib/supabase";
import { getPlaybook } from "@/lib/playbooks";
import type { NarrativeOutput } from "@/lib/prompts/types";

describe("runBackgroundGeneration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("generates narrative, validates, and saves to DB", async () => {
    const mockOutput: NarrativeOutput = {
      narrative: "**Transaction Authentication**\nCVC passed.",
      annotations: [{ section: "Transaction Authentication", reasoning: "Proves card present" }],
    };
    vi.mocked(generateNarrative).mockResolvedValue(mockOutput);
    vi.mocked(getPlaybook).mockResolvedValue({
      issuer_evaluation: "Check if cardholder authorized.",
      evidence_checklist: [],
    });

    const { runBackgroundGeneration } = await import("../generate-background");

    await runBackgroundGeneration({
      generationId: "gen-uuid-1",
      disputeId: "dp_test123",
      stripeDisputeId: "dp_test123",
      reasonCode: "10.4",
      network: "visa",
      merchantFeedback: undefined,
    });

    // Should update narrative_generations to completed
    expect(supabase.from).toHaveBeenCalledWith("narrative_generations");
    // Should update disputes.narrative_text
    expect(supabase.from).toHaveBeenCalledWith("disputes");
  });

  it("marks generation as failed on Claude error", async () => {
    vi.mocked(generateNarrative).mockRejectedValue(new Error("Claude timeout"));
    vi.mocked(getPlaybook).mockResolvedValue({
      issuer_evaluation: "Check auth.",
      evidence_checklist: [],
    });

    const { runBackgroundGeneration } = await import("../generate-background");

    // Should not throw -- errors are caught and stored
    await runBackgroundGeneration({
      generationId: "gen-uuid-2",
      disputeId: "dp_test456",
      stripeDisputeId: "dp_test456",
      reasonCode: "10.4",
      network: "visa",
      merchantFeedback: undefined,
    });

    expect(supabase.from).toHaveBeenCalledWith("narrative_generations");
  });

  it("marks generation as failed when playbook not found", async () => {
    vi.mocked(getPlaybook).mockResolvedValue(null);

    const { runBackgroundGeneration } = await import("../generate-background");

    await runBackgroundGeneration({
      generationId: "gen-uuid-3",
      disputeId: "dp_test789",
      stripeDisputeId: "dp_test789",
      reasonCode: "99.9",
      network: "visa",
      merchantFeedback: undefined,
    });

    expect(supabase.from).toHaveBeenCalledWith("narrative_generations");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run lib/narratives/__tests__/generate-background.test.ts`
Expected: FAIL -- module not found.

- [ ] **Step 3: Write the implementation**

Create `backend/lib/narratives/generate-background.ts`:

```typescript
import { generateNarrative } from "@/lib/claude";
import { buildPrompt } from "@/lib/prompts";
import type { PromptContext, EvidenceFileRef } from "@/lib/prompts/types";
import { validateHallucinations } from "./validate-hallucinations";
import { getPlaybook } from "@/lib/playbooks";
import { supabase } from "@/lib/supabase";

export interface BackgroundGenerationParams {
  generationId: string;
  disputeId: string;       // internal UUID
  stripeDisputeId: string; // dp_xxx
  reasonCode: string;
  network: string;
  merchantFeedback?: string;
}

/**
 * Runs the full narrative generation pipeline in the background.
 * Called from waitUntil() -- never throws, always writes result to DB.
 */
export async function runBackgroundGeneration(
  params: BackgroundGenerationParams,
): Promise<void> {
  const { generationId, disputeId, stripeDisputeId, reasonCode, network, merchantFeedback } = params;

  try {
    // 1. Fetch playbook
    const playbook = await getPlaybook(network, reasonCode);
    if (!playbook) {
      await markFailed(generationId, "Playbook not found for this reason code");
      return;
    }

    // 2. Fetch dispute data from Supabase
    const { data: dispute, error: disputeError } = await supabase
      .from("disputes")
      .select("*")
      .eq("id", disputeId)
      .single();

    if (disputeError || !dispute) {
      await markFailed(generationId, "Dispute not found in database");
      return;
    }

    // 3. Fetch evidence files
    const { data: evidenceFiles } = await supabase
      .from("evidence_files")
      .select("checklist_item_key, file_name")
      .eq("dispute_id", disputeId);

    const files: EvidenceFileRef[] = (evidenceFiles ?? []).map((f: any) => ({
      checklist_item_key: f.checklist_item_key,
      file_name: f.file_name,
    }));

    // 4. Build prompt context
    const context: PromptContext = {
      reason_code: reasonCode,
      network,
      display_name: (playbook as any).display_name ?? "",
      amount: dispute.amount ?? 0,
      currency: dispute.currency ?? "usd",
      transaction_date: dispute.transaction_date
        ? Math.floor(new Date(dispute.transaction_date).getTime() / 1000)
        : undefined,
      customer_name: dispute.customer_name ?? undefined,
      customer_email: undefined,
      evidence_files: files,
      checklist_notes: dispute.checklist_notes ?? {},
      issuer_evaluation: (playbook as any).issuer_evaluation ?? "",
      merchant_feedback: merchantFeedback,
    };

    // 5. Build prompt and call Claude
    const prompt = buildPrompt(context);
    if (!prompt.user) {
      await markFailed(generationId, "No prompt template for this reason code");
      return;
    }

    const rawOutput = await generateNarrative(prompt);

    // 6. Validate hallucinations
    const { narrative: validatedOutput, strippedReferences } =
      validateHallucinations(rawOutput, files);

    if (strippedReferences.length > 0) {
      console.warn(
        `[WIN-18] Stripped ${strippedReferences.length} hallucinated references from generation ${generationId}:`,
        strippedReferences,
      );
    }

    // 7. Save completed generation
    await supabase
      .from("narrative_generations")
      .update({
        status: "completed",
        narrative_output: validatedOutput,
        completed_at: new Date().toISOString(),
      })
      .eq("id", generationId);

    // 8. Write narrative to disputes table for downstream consumers
    await supabase
      .from("disputes")
      .update({ narrative_text: validatedOutput.narrative })
      .eq("id", disputeId);

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[WIN-18] Background generation failed for ${generationId}:`, err);
    await markFailed(generationId, classifyError(message));
  }
}

function classifyError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("timeout") || lower.includes("timed out")) {
    return "Narrative generation timed out. Please try again.";
  }
  if (lower.includes("rate limit") || lower.includes("429")) {
    return "AI service is busy. Please try again in a moment.";
  }
  if (lower.includes("refus") || lower.includes("content policy")) {
    return "Unable to generate narrative for this dispute. You can write one manually.";
  }
  return "Generation failed unexpectedly. Please try again.";
}

async function markFailed(generationId: string, error: string): Promise<void> {
  await supabase
    .from("narrative_generations")
    .update({
      status: "failed",
      error,
      completed_at: new Date().toISOString(),
    })
    .eq("id", generationId);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx vitest run lib/narratives/__tests__/generate-background.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/lib/narratives/generate-background.ts backend/lib/narratives/__tests__/generate-background.test.ts
git commit -m "feat(backend): background generation orchestrator (WIN-18)"
```

---

### Task 5: POST `/api/narratives/generate` Route

**Files:**
- Test: `backend/app/api/narratives/__tests__/generate.test.ts`
- Create: `backend/app/api/narratives/generate/route.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/app/api/narratives/__tests__/generate.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    const body = await req.clone().json();
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(),
}));

const mockFrom = vi.fn();
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: (...args: any[]) => mockFrom(...args),
  },
}));

vi.mock("@/lib/narratives/generate-background", () => ({
  runBackgroundGeneration: vi.fn(),
}));

describe("POST /api/narratives/generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function makeRequest(body: unknown): NextRequest {
    return new NextRequest("http://localhost/api/narratives/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  it("returns 400 when required fields are missing", async () => {
    const { POST } = await import("../generate/route");
    const res = await POST(makeRequest({ network: "visa" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.code).toBe("invalid_request");
  });

  it("returns 404 when dispute not found for this merchant", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { id: "m-uuid" }, error: null }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: () => Promise.resolve({ data: null, error: { code: "PGRST116" } }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const { POST } = await import("../generate/route");
    const res = await POST(
      makeRequest({ dispute_id: "dp_notfound", reason_code: "13.1", network: "visa" }),
    );
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.code).toBe("not_found");
  });

  it("returns 429 when generation limit reached", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { id: "m-uuid" }, error: null }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: () =>
                  Promise.resolve({
                    data: { id: "d-uuid", narrative_generations_count: 5 },
                    error: null,
                  }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const { POST } = await import("../generate/route");
    const res = await POST(
      makeRequest({ dispute_id: "dp_test", reason_code: "13.1", network: "visa" }),
    );
    const json = await res.json();

    expect(res.status).toBe(429);
    expect(json.code).toBe("generation_limit");
  });

  it("returns 202 with generation_id on success", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { id: "m-uuid" }, error: null }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: () =>
                  Promise.resolve({
                    data: { id: "d-uuid", narrative_generations_count: 2 },
                    error: null,
                  }),
              }),
            }),
          }),
          update: () => ({
            eq: () => Promise.resolve({ error: null }),
          }),
        };
      }
      if (table === "narrative_generations") {
        return {
          insert: () => ({
            select: () => ({
              single: () =>
                Promise.resolve({
                  data: { id: "gen-uuid-123" },
                  error: null,
                }),
            }),
          }),
        };
      }
      return {};
    });

    const { POST } = await import("../generate/route");
    const res = await POST(
      makeRequest({ dispute_id: "dp_test", reason_code: "13.1", network: "visa" }),
    );
    const json = await res.json();

    expect(res.status).toBe(202);
    expect(json.generation_id).toBe("gen-uuid-123");
    expect(json.status).toBe("pending");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run app/api/narratives/__tests__/generate.test.ts`
Expected: FAIL -- module not found.

- [ ] **Step 3: Write the implementation**

Create `backend/app/api/narratives/generate/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { runBackgroundGeneration } from "@/lib/narratives/generate-background";

const MAX_GENERATIONS = 5;

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity, body },
) => {
  const { accountId, userId } = identity;
  const { dispute_id, reason_code, network, merchant_feedback } = body as {
    dispute_id?: string;
    reason_code?: string;
    network?: string;
    merchant_feedback?: string;
  };

  if (!dispute_id || !reason_code || !network) {
    return NextResponse.json(
      { error: "Missing dispute_id, reason_code, or network", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  // Look up merchant
  const { data: merchant } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .single();

  if (!merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  // Look up dispute, verify it belongs to this merchant
  const { data: dispute, error: disputeError } = await supabase
    .from("disputes")
    .select("id, narrative_generations_count")
    .eq("stripe_dispute_id", dispute_id)
    .eq("merchant_id", merchant.id)
    .single();

  if (disputeError || !dispute) {
    return NextResponse.json(
      { error: "Dispute not found", code: "not_found" },
      { status: 404 },
    );
  }

  // Check generation limit
  const count = dispute.narrative_generations_count ?? 0;
  if (count >= MAX_GENERATIONS) {
    return NextResponse.json(
      {
        error: "You've used all 5 narrative generations for this dispute. You can edit the current narrative manually.",
        code: "generation_limit",
      },
      { status: 429 },
    );
  }

  // Increment count and insert pending generation
  const newCount = count + 1;

  await supabase
    .from("disputes")
    .update({ narrative_generations_count: newCount })
    .eq("id", dispute.id);

  const { data: generation, error: insertError } = await supabase
    .from("narrative_generations")
    .insert({
      dispute_id: dispute.id,
      status: "pending",
      generation_number: newCount,
      merchant_feedback: merchant_feedback ?? null,
    })
    .select("id")
    .single();

  if (insertError || !generation) {
    return NextResponse.json(
      { error: "Failed to start generation", code: "db_error" },
      { status: 500 },
    );
  }

  // Fire background generation via waitUntil
  const backgroundPromise = runBackgroundGeneration({
    generationId: generation.id,
    disputeId: dispute.id,
    stripeDisputeId: dispute_id,
    reasonCode: reason_code,
    network,
    merchantFeedback: merchant_feedback,
  });

  // Use waitUntil if available (Vercel runtime), otherwise just fire-and-forget
  if (typeof (globalThis as any).waitUntil === "function") {
    (globalThis as any).waitUntil(backgroundPromise);
  } else {
    // Local dev: just run in background without awaiting
    backgroundPromise.catch((err) => {
      console.error("[WIN-18] Background generation error (dev mode):", err);
    });
  }

  return NextResponse.json(
    { generation_id: generation.id, status: "pending" },
    { status: 202 },
  );
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx vitest run app/api/narratives/__tests__/generate.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/narratives/generate/route.ts backend/app/api/narratives/__tests__/generate.test.ts
git commit -m "feat(backend): POST /api/narratives/generate route (WIN-18)"
```

---

### Task 6: GET `/api/narratives/[generationId]/status` Route

**Files:**
- Test: `backend/app/api/narratives/__tests__/status.test.ts`
- Create: `backend/app/api/narratives/[generationId]/status/route.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/app/api/narratives/__tests__/status.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    let body = {};
    try {
      body = await req.clone().json();
    } catch {
      // GET requests may have empty body
    }
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

const mockFrom = vi.fn();
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: (...args: any[]) => mockFrom(...args),
  },
}));

describe("POST /api/narratives/[generationId]/status", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function makeRequest(generationId: string): NextRequest {
    return new NextRequest(
      `http://localhost/api/narratives/${generationId}/status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      },
    );
  }

  it("returns pending status", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { id: "m-uuid" }, error: null }),
            }),
          }),
        };
      }
      if (table === "narrative_generations") {
        return {
          select: () => ({
            eq: () => ({
              single: () =>
                Promise.resolve({
                  data: {
                    id: "gen-uuid",
                    status: "pending",
                    dispute_id: "d-uuid",
                    narrative_output: null,
                    error: null,
                  },
                  error: null,
                }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: () => Promise.resolve({ data: { id: "d-uuid" }, error: null }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const { POST } = await import("../[generationId]/status/route");
    const res = await POST(makeRequest("gen-uuid"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.status).toBe("pending");
  });

  it("returns completed status with narrative and annotations", async () => {
    const output = {
      narrative: "**Auth**\nCVC passed.",
      annotations: [{ section: "Auth", reasoning: "Proves card" }],
    };

    mockFrom.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { id: "m-uuid" }, error: null }),
            }),
          }),
        };
      }
      if (table === "narrative_generations") {
        return {
          select: () => ({
            eq: () => ({
              single: () =>
                Promise.resolve({
                  data: {
                    id: "gen-uuid",
                    status: "completed",
                    dispute_id: "d-uuid",
                    narrative_output: output,
                    error: null,
                  },
                  error: null,
                }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: () => Promise.resolve({ data: { id: "d-uuid" }, error: null }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const { POST } = await import("../[generationId]/status/route");
    const res = await POST(makeRequest("gen-uuid"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.status).toBe("completed");
    expect(json.narrative).toBe(output.narrative);
    expect(json.annotations).toEqual(output.annotations);
  });

  it("returns failed status with error message", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { id: "m-uuid" }, error: null }),
            }),
          }),
        };
      }
      if (table === "narrative_generations") {
        return {
          select: () => ({
            eq: () => ({
              single: () =>
                Promise.resolve({
                  data: {
                    id: "gen-uuid",
                    status: "failed",
                    dispute_id: "d-uuid",
                    narrative_output: null,
                    error: "Claude timeout",
                  },
                  error: null,
                }),
            }),
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: () => Promise.resolve({ data: { id: "d-uuid" }, error: null }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const { POST } = await import("../[generationId]/status/route");
    const res = await POST(makeRequest("gen-uuid"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.status).toBe("failed");
    expect(json.error).toBe("Claude timeout");
  });

  it("returns 404 when generation not found", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { id: "m-uuid" }, error: null }),
            }),
          }),
        };
      }
      if (table === "narrative_generations") {
        return {
          select: () => ({
            eq: () => ({
              single: () =>
                Promise.resolve({ data: null, error: { code: "PGRST116" } }),
            }),
          }),
        };
      }
      return {};
    });

    const { POST } = await import("../[generationId]/status/route");
    const res = await POST(makeRequest("gen-nonexistent"));
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.code).toBe("not_found");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run app/api/narratives/__tests__/status.test.ts`
Expected: FAIL -- module not found.

- [ ] **Step 3: Write the implementation**

Create `backend/app/api/narratives/[generationId]/status/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { supabase } from "@/lib/supabase";

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId } = identity;

  // Extract generationId from URL path
  const segments = request.nextUrl.pathname.split("/");
  const statusIdx = segments.lastIndexOf("status");
  const generationId = statusIdx > 0 ? segments[statusIdx - 1] : null;

  if (!generationId) {
    return NextResponse.json(
      { error: "Missing generation ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  // Fetch generation
  const { data: generation, error: genError } = await supabase
    .from("narrative_generations")
    .select("id, status, dispute_id, narrative_output, error")
    .eq("id", generationId)
    .single();

  if (genError || !generation) {
    return NextResponse.json(
      { error: "Generation not found", code: "not_found" },
      { status: 404 },
    );
  }

  // Verify the dispute belongs to this merchant
  const { data: merchant } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .single();

  if (!merchant) {
    return NextResponse.json(
      { error: "Generation not found", code: "not_found" },
      { status: 404 },
    );
  }

  const { data: dispute } = await supabase
    .from("disputes")
    .select("id")
    .eq("id", generation.dispute_id)
    .eq("merchant_id", merchant.id)
    .single();

  if (!dispute) {
    return NextResponse.json(
      { error: "Generation not found", code: "not_found" },
      { status: 404 },
    );
  }

  // Return status-appropriate response
  if (generation.status === "pending") {
    return NextResponse.json({ status: "pending" });
  }

  if (generation.status === "completed" && generation.narrative_output) {
    const output = generation.narrative_output as {
      narrative: string;
      annotations: Array<{ section: string; reasoning: string }>;
    };
    return NextResponse.json({
      status: "completed",
      narrative: output.narrative,
      annotations: output.annotations,
    });
  }

  if (generation.status === "failed") {
    return NextResponse.json({
      status: "failed",
      error: generation.error ?? "Generation failed unexpectedly. Please try again.",
    });
  }

  // Shouldn't reach here, but handle gracefully
  return NextResponse.json({ status: generation.status });
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx vitest run app/api/narratives/__tests__/status.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/narratives/\[generationId\]/status/route.ts backend/app/api/narratives/__tests__/status.test.ts
git commit -m "feat(backend): GET /api/narratives/[generationId]/status polling route (WIN-18)"
```

---

### Task 7: Run Full Test Suite and Verify Build

**Files:**
- None (verification only)

- [ ] **Step 1: Run all tests**

Run: `cd backend && npx vitest run`
Expected: All tests pass, including existing tests and all new WIN-18 tests.

- [ ] **Step 2: Run the build**

Run: `cd backend && npm run build`
Expected: Build succeeds with no type errors.

- [ ] **Step 3: Fix any issues found**

If tests fail or build breaks, fix the issues and re-run.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(backend): address test/build issues from WIN-18"
```
