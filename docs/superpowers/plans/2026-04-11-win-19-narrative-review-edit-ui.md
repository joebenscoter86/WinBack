# WIN-19: Narrative Review/Edit UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder Narrative tab with a 4-phase UI (idle, generating, review, error) that lets merchants generate AI narratives, review reasoning annotations, edit the text, and approve before submission.

**Architecture:** State machine in `NarrativePanel` orchestrates 4 sub-components. Generation is async (POST returns generation_id, client polls for completion). Annotations display in a collapsible Accordion. Edits auto-save to parent state. Playbook `narrative_template` provides static fallback when AI is unavailable.

**Tech Stack:** Stripe Apps SDK (React), TypeScript, Stripe UI components (Box, Button, TextArea, Banner, Accordion, AccordionItem, Spinner, Inline, Link)

---

## File Structure

### New files

| File | Responsibility |
|------|---------------|
| `stripe-app/src/lib/narrative-types.ts` | Types for narrative phase, generation response, annotations, template interpolation |
| `stripe-app/src/lib/narrative-utils.ts` | `interpolateTemplate()` helper that replaces `{{field}}` placeholders with dispute data |
| `stripe-app/src/components/narrative/NarrativePanel.tsx` | State machine orchestrator, phase transitions, API calls |
| `stripe-app/src/components/narrative/NarrativePreGeneration.tsx` | Evidence summary, feedback field, generate button |
| `stripe-app/src/components/narrative/NarrativeGenerating.tsx` | Spinner with context message |
| `stripe-app/src/components/narrative/NarrativeReview.tsx` | Collapsible annotations accordion + editable TextArea + approve/regenerate |
| `stripe-app/src/components/narrative/NarrativeError.tsx` | Caution banner + pre-filled template fallback |

### Modified files

| File | Changes |
|------|---------|
| `stripe-app/src/lib/types.ts` | Export `EvidenceFile` (already exported), no changes needed |
| `stripe-app/src/components/DisputeWorkflow.tsx` | Add `editedNarrative` + `evidenceFiles` lifted state, pass to `NarrativePanel`, replace placeholder |

---

### Task 1: Add Narrative Types

**Files:**
- Create: `stripe-app/src/lib/narrative-types.ts`

- [ ] **Step 1: Create the narrative types file**

```typescript
// stripe-app/src/lib/narrative-types.ts

export type NarrativePhase = 'idle' | 'generating' | 'review' | 'error';

export interface NarrativeAnnotation {
  section: string;
  reasoning: string;
}

/** Response from POST /api/narratives/generate (202) */
export interface GenerateResponse {
  generation_id: string;
  status: 'pending';
}

/** Response from POST /api/narratives/{generationId}/status */
export type StatusResponse =
  | { status: 'pending' }
  | { status: 'completed'; narrative: string; annotations: NarrativeAnnotation[] }
  | { status: 'failed'; error: string };

/** Error response with code field from backend */
export interface ApiErrorResponse {
  error: string;
  code: string;
}

export const MAX_GENERATIONS = 5;
export const POLL_INTERVAL_MS = 3000;
export const MAX_POLL_DURATION_MS = 60000;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit --pretty 2>&1 | tail -5`
Expected: No errors related to `narrative-types.ts`

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/narrative-types.ts
git commit -m "feat(stripe-app): add narrative types for WIN-19"
```

---

### Task 2: Add Template Interpolation Utility

**Files:**
- Create: `stripe-app/src/lib/narrative-utils.ts`

The playbook `narrative_template` contains `{{field_name}}` placeholders (e.g. `{{avs_address_check}}`) that should be replaced with actual dispute data. Bracketed `[instructions]` are left for the merchant to fill in.

- [ ] **Step 1: Create the utility file**

```typescript
// stripe-app/src/lib/narrative-utils.ts

import type { Dispute } from './types';

/**
 * Map of template placeholder names to dispute field accessors.
 * These match the {{placeholder}} patterns in playbook narrative_templates.
 */
const TEMPLATE_FIELD_MAP: Record<string, (d: Dispute) => string | undefined> = {
  avs_address_check: (d) => d.avs_address_check,
  avs_zip_check: (d) => d.avs_zip_check,
  cvc_check: (d) => d.cvc_check,
  three_d_secure_result: (d) => d.three_d_secure_result,
  three_d_secure_version: (d) => d.three_d_secure_version,
  authorization_code: (d) => d.authorization_code,
  network_status: (d) => d.network_status,
  customer_email: (d) => d.customer_email,
  customer_name: (d) => d.customer_name,
  billing_address: (d) => d.billing_address,
  charge_description: (d) => d.charge_description,
};

/**
 * Replaces {{field}} placeholders in a narrative template with actual dispute data.
 * Unknown fields or missing data are replaced with "N/A".
 */
export function interpolateTemplate(template: string, dispute: Dispute): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, field: string) => {
    const accessor = TEMPLATE_FIELD_MAP[field];
    if (!accessor) return 'N/A';
    return accessor(dispute) ?? 'N/A';
  });
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit --pretty 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/lib/narrative-utils.ts
git commit -m "feat(stripe-app): add template interpolation utility for WIN-19"
```

---

### Task 3: Build NarrativePreGeneration Component

**Files:**
- Create: `stripe-app/src/components/narrative/NarrativePreGeneration.tsx`

This is the idle-phase screen showing evidence summary, feedback field, and generate button.

- [ ] **Step 1: Create the component**

```typescript
// stripe-app/src/components/narrative/NarrativePreGeneration.tsx

import { useState } from 'react';
import {
  Box,
  Button,
  Banner,
  Inline,
  Link,
  TextArea,
  Icon,
} from '@stripe/ui-extension-sdk/ui';
import type { Dispute, PlaybookData, EvidenceFile } from '../../lib/types';
import { MAX_GENERATIONS } from '../../lib/narrative-types';

interface NarrativePreGenerationProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  evidenceFiles: EvidenceFile[];
  generationNumber: number;
  onGenerate: (merchantFeedback: string) => void;
  onNavigateBack: () => void;
}

const NarrativePreGeneration = ({
  dispute,
  playbook,
  evidenceFiles,
  generationNumber,
  onGenerate,
  onNavigateBack,
}: NarrativePreGenerationProps) => {
  const [feedback, setFeedback] = useState('');
  const remaining = MAX_GENERATIONS - generationNumber;
  const limitReached = remaining <= 0;

  // Build evidence summary from playbook checklist
  const checklistItems = playbook?.evidence_checklist ?? [];

  // Map evidence files by checklist_item_key for quick lookup
  const filesByKey: Record<string, EvidenceFile> = {};
  for (const file of evidenceFiles) {
    filesByKey[file.checklist_item_key] = file;
  }

  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'large' }}>
      {/* Evidence summary */}
      {playbook && checklistItems.length > 0 ? (
        <Box css={{ stack: 'y', gap: 'small' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            Your narrative will be based on:
          </Inline>
          <Box css={{ stack: 'y', gap: 'xsmall' }}>
            {checklistItems.map((item) => {
              const file = filesByKey[item.item];
              const hasFile = !!file;
              const isMandatory = item.category === 'mandatory';
              return (
                <Inline key={item.item} css={{ font: 'caption', color: hasFile ? 'primary' : (isMandatory ? 'warning' : 'secondary') }}>
                  {hasFile ? '\u2713 ' : '\u2022 '}
                  {item.item}
                  {hasFile ? ` (${file.file_name})` : ' -- not uploaded'}
                </Inline>
              );
            })}
          </Box>
          <Link onPress={onNavigateBack}>
            <Inline css={{ font: 'caption', color: 'info' }}>
              {'\u2190 Go back to add more evidence'}
            </Inline>
          </Link>
        </Box>
      ) : (
        <Banner
          type="default"
          title="Ready to generate"
          description="The AI will generate a narrative based on your dispute details and any uploaded evidence."
        />
      )}

      {/* No evidence warning */}
      {evidenceFiles.length === 0 && (
        <Banner
          type="caution"
          title="No evidence uploaded yet"
          description="The AI can still generate a narrative, but it will be stronger with supporting evidence."
        />
      )}

      {/* Feedback field */}
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <TextArea
          label="Anything else the AI should know? (optional)"
          placeholder="e.g. Customer confirmed receipt by phone on March 20th"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
        />
      </Box>

      {/* Generate button + counter */}
      {limitReached ? (
        <Banner
          type="default"
          title="Generation limit reached"
          description="You've used all 5 generations for this dispute. You can still edit the current narrative manually."
        />
      ) : (
        <Box css={{ distribute: 'space-between', alignY: 'center' }}>
          <Button
            type="primary"
            onPress={() => onGenerate(feedback)}
            disabled={limitReached}
          >
            Generate Narrative
          </Button>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {remaining} generation{remaining !== 1 ? 's' : ''} available
          </Inline>
        </Box>
      )}
    </Box>
  );
};

export default NarrativePreGeneration;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit --pretty 2>&1 | tail -5`
Expected: No errors (component not yet wired up, but types should resolve)

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/narrative/NarrativePreGeneration.tsx
git commit -m "feat(stripe-app): add NarrativePreGeneration component (WIN-19)"
```

---

### Task 4: Build NarrativeGenerating Component

**Files:**
- Create: `stripe-app/src/components/narrative/NarrativeGenerating.tsx`

Simple spinner with contextual message shown during polling.

- [ ] **Step 1: Create the component**

```typescript
// stripe-app/src/components/narrative/NarrativeGenerating.tsx

import { Box, Inline, Spinner } from '@stripe/ui-extension-sdk/ui';
import type { Dispute } from '../../lib/types';

interface NarrativeGeneratingProps {
  dispute: Dispute;
}

const NarrativeGenerating = ({ dispute }: NarrativeGeneratingProps) => {
  return (
    <Box css={{ padding: 'xlarge', alignX: 'center', stack: 'y', gap: 'medium' }}>
      <Box css={{ alignX: 'center' }}>
        <Spinner size="large" />
      </Box>
      <Inline css={{ font: 'body', fontWeight: 'semibold', textAlign: 'center' }}>
        Generating your narrative...
      </Inline>
      <Inline css={{ font: 'caption', color: 'secondary', textAlign: 'center' }}>
        WinBack is analyzing your evidence and building a response tailored to{' '}
        {dispute.network} reason code {dispute.reason_code}.{' '}
        This usually takes 5-10 seconds.
      </Inline>
    </Box>
  );
};

export default NarrativeGenerating;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit --pretty 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/narrative/NarrativeGenerating.tsx
git commit -m "feat(stripe-app): add NarrativeGenerating component (WIN-19)"
```

---

### Task 5: Build NarrativeReview Component

**Files:**
- Create: `stripe-app/src/components/narrative/NarrativeReview.tsx`

This is the main review phase: collapsible AI Strategy accordion at top, editable TextArea below, approve/regenerate buttons.

- [ ] **Step 1: Create the component**

```typescript
// stripe-app/src/components/narrative/NarrativeReview.tsx

import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Box,
  Button,
  Banner,
  Inline,
  TextArea,
} from '@stripe/ui-extension-sdk/ui';
import type { NarrativeAnnotation } from '../../lib/narrative-types';
import { MAX_GENERATIONS } from '../../lib/narrative-types';

interface NarrativeReviewProps {
  narrative: string;
  annotations: NarrativeAnnotation[];
  editedNarrative: string;
  generationNumber: number;
  onEditChange: (text: string) => void;
  onApprove: () => void;
  onRegenerate: (merchantFeedback: string) => void;
}

const NarrativeReview = ({
  narrative,
  annotations,
  editedNarrative,
  generationNumber,
  onEditChange,
  onApprove,
  onRegenerate,
}: NarrativeReviewProps) => {
  const [showRegenConfirm, setShowRegenConfirm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const remaining = MAX_GENERATIONS - generationNumber;
  const limitReached = remaining <= 0;
  const hasEdits = editedNarrative !== narrative;

  const handleRegenerateClick = () => {
    if (hasEdits) {
      setShowRegenConfirm(true);
    } else {
      onRegenerate(feedback);
    }
  };

  const confirmRegenerate = () => {
    setShowRegenConfirm(false);
    onRegenerate(feedback);
  };

  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
      {/* Header with generation counter */}
      <Box css={{ distribute: 'space-between', alignY: 'center' }}>
        <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
          Your Dispute Narrative
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          Generation {generationNumber} of {MAX_GENERATIONS}
        </Inline>
      </Box>

      {/* Collapsible AI Strategy accordion */}
      {annotations.length > 0 && (
        <Accordion>
          <AccordionItem
            title="AI Strategy & Reasoning"
            subtitle={`${annotations.length} section${annotations.length !== 1 ? 's' : ''} analyzed`}
          >
            <Box css={{ stack: 'y', gap: 'medium' }}>
              {annotations.map((annotation) => (
                <Box key={annotation.section} css={{ stack: 'y', gap: 'xsmall' }}>
                  <Inline css={{ font: 'caption', fontWeight: 'bold', color: 'secondary', textTransform: 'uppercase' }}>
                    {annotation.section}
                  </Inline>
                  <Inline css={{ font: 'caption', color: 'info' }}>
                    {annotation.reasoning}
                  </Inline>
                </Box>
              ))}
            </Box>
          </AccordionItem>
        </Accordion>
      )}

      {/* Editable narrative */}
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Box css={{ distribute: 'space-between', alignY: 'center' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            Edit Your Narrative
          </Inline>
          {hasEdits && (
            <Inline css={{ font: 'caption', color: 'success' }}>
              {'\u2713'} Auto-saved
            </Inline>
          )}
        </Box>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          This is the text that will be submitted to Stripe. Edit freely.
        </Inline>
        <TextArea
          label=""
          value={editedNarrative}
          onChange={(e) => onEditChange(e.target.value)}
          rows={12}
        />
      </Box>

      {/* Regeneration confirmation */}
      {showRegenConfirm && (
        <Banner
          type="caution"
          title="Regenerating will replace your edits"
          description="You've made manual changes to the narrative. Generating a new one will discard those changes."
          actions={
            <Box css={{ stack: 'x', gap: 'small' }}>
              <Button type="destructive" onPress={confirmRegenerate}>
                Yes, regenerate
              </Button>
              <Button onPress={() => setShowRegenConfirm(false)}>
                Keep editing
              </Button>
            </Box>
          }
        />
      )}

      {/* Feedback field for regeneration */}
      {!limitReached && !showRegenConfirm && (
        <TextArea
          label="Feedback for regeneration (optional)"
          placeholder="e.g. Emphasize the delivery tracking more"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={2}
        />
      )}

      {/* Action buttons */}
      <Box css={{ distribute: 'space-between', alignY: 'center' }}>
        <Box css={{ stack: 'x', gap: 'small' }}>
          <Button type="primary" onPress={onApprove}>
            Approve & Continue
          </Button>
          {!showRegenConfirm && (
            <Button
              onPress={handleRegenerateClick}
              disabled={limitReached}
            >
              Regenerate
            </Button>
          )}
        </Box>
        {limitReached ? (
          <Inline css={{ font: 'caption', color: 'warning' }}>
            No generations remaining
          </Inline>
        ) : (
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {remaining} remaining
          </Inline>
        )}
      </Box>
    </Box>
  );
};

export default NarrativeReview;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit --pretty 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/narrative/NarrativeReview.tsx
git commit -m "feat(stripe-app): add NarrativeReview component (WIN-19)"
```

---

### Task 6: Build NarrativeError Component

**Files:**
- Create: `stripe-app/src/components/narrative/NarrativeError.tsx`

Fallback UI when generation fails. Pre-fills TextArea with playbook `narrative_template` (with `{{field}}` placeholders replaced by dispute data).

- [ ] **Step 1: Create the component**

```typescript
// stripe-app/src/components/narrative/NarrativeError.tsx

import { useEffect } from 'react';
import {
  Box,
  Button,
  Banner,
  Inline,
  TextArea,
} from '@stripe/ui-extension-sdk/ui';
import type { Dispute, PlaybookData } from '../../lib/types';
import { interpolateTemplate } from '../../lib/narrative-utils';

interface NarrativeErrorProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  errorMessage: string | null;
  editedNarrative: string;
  isGenerationLimit: boolean;
  onEditChange: (text: string) => void;
  onContinue: () => void;
  onRetry: () => void;
}

const NarrativeError = ({
  dispute,
  playbook,
  errorMessage,
  editedNarrative,
  isGenerationLimit,
  onEditChange,
  onContinue,
  onRetry,
}: NarrativeErrorProps) => {
  // On first render, if editedNarrative is empty, pre-fill with template
  const templateText = playbook?.narrative_template
    ? interpolateTemplate(playbook.narrative_template, dispute)
    : '';

  // Initialize parent state with template if editedNarrative is empty
  useEffect(() => {
    if (!editedNarrative && templateText) {
      onEditChange(templateText);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- intentional mount-only

  // Use editedNarrative if it has content, otherwise use the template
  const displayText = editedNarrative || templateText;

  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
      <Banner
        type="caution"
        title={isGenerationLimit
          ? "Generation limit reached"
          : "AI generation unavailable"}
        description={isGenerationLimit
          ? "You've used all 5 generations for this dispute. You can edit the current narrative manually below."
          : "You can write your narrative manually, or try again later. Your dispute deadline is not affected."}
      />

      {errorMessage && !isGenerationLimit && (
        <Inline css={{ font: 'caption', color: 'critical' }}>
          {errorMessage}
        </Inline>
      )}

      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
          {playbook?.narrative_template ? 'Edit the template below' : 'Write your narrative'}
        </Inline>
        {playbook?.narrative_template && (
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Fill in the [bracketed sections] with your specific details.
          </Inline>
        )}
        <TextArea
          label=""
          value={displayText}
          onChange={(e) => onEditChange(e.target.value)}
          placeholder="Describe what happened with this transaction and why the dispute should be resolved in your favor..."
          rows={14}
        />
      </Box>

      <Box css={{ stack: 'x', gap: 'small' }}>
        <Button type="primary" onPress={onContinue}>
          Continue with Manual Narrative
        </Button>
        {!isGenerationLimit && (
          <Button onPress={onRetry}>
            Try Again
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NarrativeError;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit --pretty 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/narrative/NarrativeError.tsx
git commit -m "feat(stripe-app): add NarrativeError fallback component (WIN-19)"
```

---

### Task 7: Build NarrativePanel Orchestrator

**Files:**
- Create: `stripe-app/src/components/narrative/NarrativePanel.tsx`

This is the main component: state machine, API calls, polling logic. Renders the correct sub-component based on phase.

- [ ] **Step 1: Create the component**

```typescript
// stripe-app/src/components/narrative/NarrativePanel.tsx

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { Dispute, PlaybookData, EvidenceFile } from '../../lib/types';
import type { NarrativePhase, NarrativeAnnotation, StatusResponse } from '../../lib/narrative-types';
import { POLL_INTERVAL_MS, MAX_POLL_DURATION_MS } from '../../lib/narrative-types';
import { fetchBackend, ApiError } from '../../lib/apiClient';
import NarrativePreGeneration from './NarrativePreGeneration';
import NarrativeGenerating from './NarrativeGenerating';
import NarrativeReview from './NarrativeReview';
import NarrativeError from './NarrativeError';

interface NarrativePanelProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  evidenceFiles: EvidenceFile[];
  context: ExtensionContextValue;
  editedNarrative: string;
  onEditedNarrativeChange: (text: string) => void;
  onApprove: (narrativeText: string) => void;
  onNavigateBack: () => void;
}

const NarrativePanel = ({
  dispute,
  playbook,
  evidenceFiles,
  context,
  editedNarrative,
  onEditedNarrativeChange,
  onApprove,
  onNavigateBack,
}: NarrativePanelProps) => {
  const [phase, setPhase] = useState<NarrativePhase>('idle');
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [narrative, setNarrative] = useState('');
  const [annotations, setAnnotations] = useState<NarrativeAnnotation[]>([]);
  const [generationNumber, setGenerationNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGenerationLimit, setIsGenerationLimit] = useState(false);

  const contextRef = useRef(context);
  contextRef.current = context;
  const pollStartRef = useRef<number>(0);
  const pollRetryCountRef = useRef<number>(0);

  // Polling effect
  useEffect(() => {
    if (phase !== 'generating' || !generationId) return;

    pollStartRef.current = Date.now();
    pollRetryCountRef.current = 0;

    const interval = setInterval(async () => {
      // Safety net: stop polling after max duration
      if (Date.now() - pollStartRef.current > MAX_POLL_DURATION_MS) {
        clearInterval(interval);
        setErrorMessage('Generation timed out. Please try again.');
        setPhase('error');
        return;
      }

      try {
        const result = await fetchBackend<StatusResponse>(
          `/api/narratives/${generationId}/status`,
          contextRef.current,
        );

        pollRetryCountRef.current = 0; // reset on success

        if (result.status === 'completed') {
          clearInterval(interval);
          const completed = result as { status: 'completed'; narrative: string; annotations: NarrativeAnnotation[] };
          setNarrative(completed.narrative);
          setAnnotations(completed.annotations);
          onEditedNarrativeChange(completed.narrative);
          setPhase('review');
        } else if (result.status === 'failed') {
          clearInterval(interval);
          const failed = result as { status: 'failed'; error: string };
          setErrorMessage(failed.error);
          setPhase('error');
        }
        // status === 'pending' -> continue polling
      } catch (err) {
        pollRetryCountRef.current += 1;
        if (pollRetryCountRef.current >= 3) {
          clearInterval(interval);
          setErrorMessage(
            err instanceof ApiError
              ? err.message
              : 'Lost connection while generating. Please try again.',
          );
          setPhase('error');
        }
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [phase, generationId, onEditedNarrativeChange]);

  const handleGenerate = useCallback(async (merchantFeedback: string) => {
    setPhase('generating');
    setErrorMessage(null);
    setIsGenerationLimit(false);

    try {
      const result = await fetchBackend<{ generation_id: string; status: string }>(
        '/api/narratives/generate',
        contextRef.current,
        {
          dispute_id: dispute.id,
          reason_code: dispute.reason_code,
          network: dispute.network,
          merchant_feedback: merchantFeedback || undefined,
        },
      );

      setGenerationId(result.generation_id);
      setGenerationNumber((prev) => prev + 1);
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setIsGenerationLimit(true);
        setErrorMessage('You\'ve used all 5 narrative generations for this dispute.');
      } else {
        setErrorMessage(
          err instanceof ApiError ? err.message : 'Failed to start generation. Please try again.',
        );
      }
      setPhase('error');
    }
  }, [dispute.id, dispute.reason_code, dispute.network]);

  const handleApprove = useCallback(() => {
    onApprove(editedNarrative);
  }, [editedNarrative, onApprove]);

  const handleRegenerate = useCallback((merchantFeedback: string) => {
    handleGenerate(merchantFeedback);
  }, [handleGenerate]);

  const handleRetry = useCallback(() => {
    setPhase('idle');
    setErrorMessage(null);
  }, []);

  const handleErrorContinue = useCallback(() => {
    onApprove(editedNarrative);
  }, [editedNarrative, onApprove]);

  switch (phase) {
    case 'idle':
      return (
        <NarrativePreGeneration
          dispute={dispute}
          playbook={playbook}
          evidenceFiles={evidenceFiles}
          generationNumber={generationNumber}
          onGenerate={handleGenerate}
          onNavigateBack={onNavigateBack}
        />
      );

    case 'generating':
      return <NarrativeGenerating dispute={dispute} />;

    case 'review':
      return (
        <NarrativeReview
          narrative={narrative}
          annotations={annotations}
          editedNarrative={editedNarrative}
          generationNumber={generationNumber}
          onEditChange={onEditedNarrativeChange}
          onApprove={handleApprove}
          onRegenerate={handleRegenerate}
        />
      );

    case 'error':
      return (
        <NarrativeError
          dispute={dispute}
          playbook={playbook}
          errorMessage={errorMessage}
          editedNarrative={editedNarrative}
          isGenerationLimit={isGenerationLimit}
          onEditChange={onEditedNarrativeChange}
          onContinue={handleErrorContinue}
          onRetry={handleRetry}
        />
      );
  }
};

export default NarrativePanel;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit --pretty 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add stripe-app/src/components/narrative/NarrativePanel.tsx
git commit -m "feat(stripe-app): add NarrativePanel orchestrator with polling (WIN-19)"
```

---

### Task 8: Wire NarrativePanel into DisputeWorkflow

**Files:**
- Modify: `stripe-app/src/components/DisputeWorkflow.tsx:1-258`

Replace the placeholder Narrative tab content with `NarrativePanel`. Add lifted state for `editedNarrative` and `evidenceFiles`. The evidence files are already fetched in `EvidenceChecklist` -- we need to lift that fetch to the parent so both tabs can access it.

- [ ] **Step 1: Add imports and lifted state to DisputeWorkflow**

At the top of `DisputeWorkflow.tsx`, add the new import:

```typescript
import NarrativePanel from './narrative/NarrativePanel';
```

Add to the existing imports from `'../lib/types'`:

```typescript
import type { WizardStep, Dispute, PlaybookData, EvidenceFile } from '../lib/types';
```

Inside the component, after the existing `useState` calls (around line 38), add:

```typescript
const [editedNarrative, setEditedNarrative] = useState('');
const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
```

- [ ] **Step 2: Add evidence files fetch to DisputeWorkflow**

Inside the existing `useEffect` that runs on `shown` (around line 52), add an evidence files fetch alongside the existing dispute and playbook fetches. After the playbook result handling (around line 96), add:

```typescript
// Fetch evidence files for narrative tab
try {
  const filesResult = await fetchBackend<{ data: EvidenceFile[] }>(
    `/api/disputes/${initialDispute.id}/evidence-files`,
    contextRef.current,
  );
  setEvidenceFiles(filesResult.data);
} catch (err) {
  console.error('Failed to fetch evidence files:', err);
  setEvidenceFiles([]);
}
```

- [ ] **Step 3: Replace the Narrative tab placeholder**

Replace lines 227-237 (the placeholder `TabPanel` content for "narrative"):

```typescript
{/* OLD: */}
<TabPanel id="narrative">
  <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
    <Banner
      type="default"
      title="Step 3: AI Narrative"
      description="Generate a compelling narrative based on your evidence. Review, edit, and approve before submission."
    />
    <Inline css={{ font: 'caption', color: 'secondary' }}>
      AI narrative generation and editing will be built in WIN-18 and WIN-19.
    </Inline>
  </Box>
</TabPanel>
```

With:

```typescript
{/* NEW: */}
<TabPanel id="narrative">
  <NarrativePanel
    dispute={dispute}
    playbook={playbook}
    evidenceFiles={evidenceFiles}
    context={contextRef.current}
    editedNarrative={editedNarrative}
    onEditedNarrativeChange={setEditedNarrative}
    onApprove={(text) => {
      setEditedNarrative(text);
      setCurrentStep('submit');
    }}
    onNavigateBack={() => setCurrentStep('evidence')}
  />
</TabPanel>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && npx tsc --noEmit --pretty 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add stripe-app/src/components/DisputeWorkflow.tsx
git commit -m "feat(stripe-app): wire NarrativePanel into dispute workflow (WIN-19)"
```

---

### Task 9: Manual QA in Stripe Test Mode

**Files:** None (testing only)

- [ ] **Step 1: Start the backend**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm run dev`
Expected: Next.js dev server starts on port 3000

- [ ] **Step 2: Start the Stripe App**

Run: `cd /Users/joeb/Projects/WinBack/stripe-app && stripe apps start`
Expected: Stripe App dev server starts and connects to the dashboard

- [ ] **Step 3: Test pre-generation state**

1. Open a test dispute in Stripe Dashboard
2. Click into the dispute workflow (FocusView)
3. Navigate to the Narrative tab
4. Verify: evidence summary shows with correct checkmarks/missing indicators
5. Verify: "Go back to add more evidence" link switches to Evidence tab
6. Verify: feedback field is present and editable
7. Verify: generation counter shows "5 generations available"

- [ ] **Step 4: Test generation flow**

1. Type optional feedback in the field
2. Click "Generate Narrative"
3. Verify: spinner appears with context message mentioning the network and reason code
4. Verify: after 5-15 seconds, narrative appears with annotations
5. Verify: accordion "AI Strategy & Reasoning" is expanded showing section analysis
6. Verify: TextArea is pre-filled with the narrative text
7. Verify: generation counter shows "Generation 1 of 5"

- [ ] **Step 5: Test edit and approve**

1. Edit the narrative text in the TextArea
2. Verify: "Auto-saved" indicator appears
3. Switch to Evidence tab and back to Narrative tab
4. Verify: edits are preserved
5. Click "Approve & Continue"
6. Verify: wizard advances to Submit tab

- [ ] **Step 6: Test regeneration**

1. Generate a narrative, then edit it
2. Click "Regenerate"
3. Verify: confirmation banner appears warning about losing edits
4. Click "Keep editing" -- verify banner dismisses
5. Click "Regenerate" again, then "Yes, regenerate"
6. Verify: new generation starts, counter updates

- [ ] **Step 7: Test error fallback**

1. Stop the backend server to simulate API unavailability
2. Try to generate a narrative
3. Verify: error banner appears with caution message
4. Verify: TextArea is pre-filled with the playbook's narrative template (with `{{fields}}` replaced by real data, `[brackets]` left for merchant)
5. Verify: "Try Again" and "Continue with Manual Narrative" buttons work
6. Restart the backend, verify "Try Again" works

- [ ] **Step 8: Fix any issues found during QA**

Address any TypeScript errors, rendering issues, or broken interactions discovered during manual testing. Run `npx tsc --noEmit` after each fix.

- [ ] **Step 9: Final commit**

```bash
git add -A
git commit -m "fix(stripe-app): QA fixes for narrative review/edit UI (WIN-19)"
```

Only create this commit if there were fixes. Skip if everything worked on first pass.

---

## Post-QA Notes (shipping — 2026-04-12)

This section captures everything that was discovered during manual QA of WIN-19, what was fixed in-scope, and what was deliberately deferred. If this feature ever needs rework, start here before reading the original spec — the plan above describes the intended design, this section describes the reality that shipped.

### What WIN-19 actually delivered

The review/edit UI works end-to-end: idle → generating → review → approve, plus the error branch with manual fallback. The polling loop, hallucination validator, card-based UI, generation-limit guardrail, and Stripe App signature auth are all wired and tested against a real Visa 10.4 dispute in Docket sandbox.

The UI is the shippable artifact. The *content* of the narratives that this UI presents has known gaps, documented below.

### Bugs fixed in-scope during QA (landed on main)

These surfaced during the WIN-19 QA session but turned out to be latent bugs in code paths WIN-19 exercised for the first time. They were fixed as prerequisites for WIN-19 to function at all. All commits on `main`, unmerged to any PR branch as of the end of QA.

| Commit | Problem | Fix |
|---|---|---|
| `f5a3984` | `ensureMerchant` was writing `stripe_user_id` / `last_seen_at` — neither column exists. Every insert silently errored against real Supabase; merchants table had been empty in dev for weeks. | Rewrote insert to match real schema. |
| `f119aff` | Narrative route called `ensureMerchant` fire-and-forget, then immediately `SELECT merchant.id`. First-ever generation for a merchant raced the upsert and returned "Merchant not found". | Awaited the upsert in the narrative route specifically. Broader pattern fix tracked in WIN-42. |
| `7948325` | `GET /api/disputes/[id]` was a pure Stripe proxy — it never wrote a row to our `disputes` table. Narrative generation fails for any dispute where the merchant opens Narrative before touching Evidence, because the narrative route reads from Supabase, not Stripe. | Route now upserts a real row with Stripe data on every GET. |
| (this commit) | `DisputeWorkflow.evidenceFiles` was fetched once on mount. Evidence tab uploads files into its own local state; parent never refreshed. Merchant uploads 3 files, advances to Narrative, sees zero. | Added a second useEffect that refetches `/api/disputes/{id}/evidence-files` whenever `currentStep` becomes `'narrative'`. |
| (this commit) | `generate-background.ts` caught errors, ran them through `classifyError`, and wrote the sanitized string to the DB. Real error messages (including "missing ANTHROPIC_API_KEY") never surfaced in logs. | Added `console.error(err)` before `markFailed`. Raw error with stack now hits backend stdout. |

### Blocking bug that turned out to be config

Very first QA attempt failed with "Generation failed unexpectedly. Please try again." Root cause: `ANTHROPIC_API_KEY` was never added to `backend/.env.local`. The Claude client's lazy Proxy threw on first access, was caught by the generic `classifyError`, and the real message was swallowed. **Added to `.env.local` locally — NOT committed. Any fresh clone or new deploy environment must set this.** Documented in `backend/.env.example` since WIN-14.

### Known limitations shipping with WIN-19 (tracked elsewhere)

These are real gaps, but they are either (a) not what WIN-19 was chartered to solve, or (b) latent bugs in adjacent systems that WIN-19 exposed but doesn't own. Each has a Linear ticket. **Do not reopen WIN-19 for any of these** — they have their own tickets.

**WIN-44 (Urgent) — Stripe transaction data not in the narrative prompt.**
`runBackgroundGeneration` passes a `PromptContext` object to `buildPrompt` that's missing every `avs_*`, `cvc_check`, `three_d_secure_*`, `authorization_code`, `network_status`, `card_brand`, `card_last4`, `billing_address`, `charge_description`, and `refunds` field. `buildPrompt` dutifully writes a "STRIPE TRANSACTION DATA (verified by payment network)" section where every line reads "not available". On generations with evidence files uploaded, Claude silently omits the authentication section instead of flagging the gap — the narratives look fine but are missing the strongest evidence in every fraud dispute (10.4, 13.x). The `disputes` DB table also has no columns to store this data, but the fix doesn't require a migration — WIN-44 re-fetches from Stripe inside the background job. **This is the single most important follow-up. Ship WIN-19 aware that the narratives are incomplete until WIN-44 lands.**

**WIN-40 (High) — checklist_item_key uses display label, not a stable key.**
`evidence_files.checklist_item_key` stores the full label text ("Two prior undisputed transactions from the same cardholder (120-365 days before disputed transaction)"). Any time a playbook item's label gets reworded, every previously-uploaded file under the old text becomes orphaned. Already caught one instance during WIN-19 QA where two files for dispute `du_1TIx1JEQYvM3XwRzZDZKVVcb` were invisible because CVV and 3DS labels had been reworded. Manually patched in dev; will reoccur the next time anyone edits a playbook label.

**WIN-41 (High) — evidence upload creates zombie dispute rows.**
`POST /api/disputes/[id]/evidence-files` upserts a disputes row with `amount: 0, reason_code: ""` if one doesn't exist. Partially neutralized by `7948325` (the GET route now backfills real data first, and the Review tab always runs before Evidence), but the upload route itself still has the zero-value fallback. Evidence PATCH route (`[disputeId]/route.ts:132-178`) has the same problem.

**WIN-42 (Medium) — merchant-scoped query patterns.**
Every route that needs merchant-scoped data does a 2-step lookup: get merchant UUID by stripe_account_id, then scope the next query. `ensureMerchant` is fire-and-forget in some routes and awaited in others — the convention is "fire-and-forget unless you need the row on the next line", which is easy to get wrong. Fix is to always await it and add a `getDisputeForAccount(stripeDisputeId, stripeAccountId)` helper.

**WIN-43 (High) — no integration test for the wizard flow.**
Every route has unit tests with mocked Supabase. Three of the four "in-scope fixes" above would have been caught by a single end-to-end test walking list → detail → playbook → evidence upload → checklist toggle → narrative generate → status poll against a real (or realistic) Supabase. WIN-43 tracks adding that test. **Consider expanding its scope to also assert on the args passed to the mocked Anthropic call** — that single assertion would have caught WIN-44.

**WIN-45 (Low) — `evidence_files.file_path` column is dead weight.**
`file_path` and `stripe_file_id` hold identical values on every row. The former's name implies local/Supabase storage, which is the opposite of our architecture (evidence bytes live at Stripe, never in our infra, deliberately to avoid PCI scope). Cosmetic cleanup only.

### Deferred UI observations (no ticket yet)

**Checklist item checkboxes don't persist to the narrative pre-generation summary.**
Observed during the final QA pass: the checkmarks next to items on the Narrative pre-generation screen don't reflect the Evidence tab's toggle state. Likely the same stale-parent-state pattern we just fixed for `evidenceFiles` — `DisputeWorkflow` reads `dispute.checklist_state` once and doesn't refresh when the merchant advances tabs. Could also be a distinct persistence bug. Joe is handling this in the final UI pass / QA; not tracked in Linear yet. If it turns out to be nontrivial, file it as a new ticket; don't fold it into WIN-19.

### Dev harness left in repo

`backend/scripts/smoke-narrative.ts` — a throwaway tsx script that resets a known dispute's generation counter and directly invokes `runBackgroundGeneration`, bypassing the Stripe App UI. Useful for iterating on narrative prompt changes (WIN-44 in particular) without clicking through the wizard for every attempt. Reads `backend/.env.local` via tsx's `--env-file` flag. No secrets embedded. Kept in the repo intentionally as a dev tool, not a production path.

```
cd backend && ./node_modules/.bin/tsx --env-file=.env.local scripts/smoke-narrative.ts
```

### What a future maintainer should read first

If you're back in this code because something broke or because you're picking up WIN-44:

1. This section (Post-QA Notes) for the shipping-day context.
2. `backend/lib/narratives/generate-background.ts` — the actual orchestrator. The `PromptContext` construction (lines ~108-121) is where WIN-44 lives.
3. `backend/lib/prompts/types.ts` — what the prompt *could* receive. Compare against what generate-background.ts actually sets to see the gap.
4. `backend/lib/prompts/build-prompt.ts` — what the prompt *does* produce. Search for `formatStripeField` to find every field that falls back to "not available".
5. `stripe-app/src/components/narrative/NarrativePanel.tsx` and sibling components — the review/edit UI. This part is solid and shouldn't need rework for WIN-44.
6. `stripe-app/src/components/DisputeWorkflow.tsx` — parent workflow. Note the two separate `useEffect`s for evidence files (one on mount, one on narrative-step entry). If checklist_state has a similar staleness bug, the fix pattern is right there.

