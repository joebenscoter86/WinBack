import { useState, useRef } from 'react';
import {
  Box,
  Button,
  Banner,
  Checkbox,
  Inline,
  Spinner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type {
  Dispute,
  EvidenceFile,
  PlaybookData,
  SubmissionResponse,
  SubmissionWarning,
} from '../../lib/types';
import { fetchBackend, ApiError } from '../../lib/apiClient';
import SubmissionConfirmation from './SubmissionConfirmation';

interface SubmitViewProps {
  dispute: Dispute;
  playbook: PlaybookData;
  evidenceFiles: EvidenceFile[];
  narrativeText: string;
  context: ExtensionContextValue;
  onSubmitted: (response: SubmissionResponse) => void;
}

type State =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; response: SubmissionResponse }
  | {
      kind: 'error';
      code: string;
      message: string;
      terminal: boolean;
      warnings: SubmissionWarning[];
    };

const TERMINAL_CODES = new Set([
  'dispute_not_submittable',
  'validation_failed',
]);

function countMandatoryAttached(
  playbook: PlaybookData,
  evidenceFiles: EvidenceFile[],
): { attached: number; total: number } {
  // Counter mirrors what actually gets submitted. A mandatory item counts as
  // attached if any of the three submission paths is covered: autofilled from
  // Stripe (stripe_field), covered by the narrative (narrative_only), or has
  // a real uploaded file.
  const mandatory = playbook.evidence_checklist.filter(
    (i) => i.category === 'mandatory',
  );
  const filed = new Set(evidenceFiles.map((f) => f.checklist_item_key));
  const attached = mandatory.filter(
    (i) => i.stripe_field || i.narrative_only || filed.has(i.item),
  ).length;
  return { attached, total: mandatory.length };
}

export default function SubmitView({
  dispute,
  playbook,
  evidenceFiles,
  narrativeText,
  context,
  onSubmitted,
}: SubmitViewProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [state, setState] = useState<State>({ kind: 'idle' });
  const contextRef = useRef(context);
  contextRef.current = context;

  const { attached, total } = countMandatoryAttached(playbook, evidenceFiles);
  const narrativeWords = narrativeText.trim().split(/\s+/).filter(Boolean).length;

  async function handleSubmit() {
    setState({ kind: 'submitting' });
    try {
      const response = await fetchBackend<{ data: SubmissionResponse }>(
        `/api/disputes/${dispute.id}/submit`,
        contextRef.current,
      );
      setState({ kind: 'success', response: response.data });
      onSubmitted(response.data);
    } catch (err) {
      if (err instanceof ApiError) {
        const code = err.code ?? 'internal_error';
        setState({
          kind: 'error',
          code,
          message: err.message,
          terminal: TERMINAL_CODES.has(code),
          // ApiError does not expose the response body, so warnings are
          // not available from the catch. Surface them via the message only.
          warnings: [],
        });
      } else {
        setState({
          kind: 'error',
          code: 'internal_error',
          message: 'Something went wrong. Your submission was NOT sent.',
          terminal: false,
          warnings: [],
        });
      }
    }
  }

  if (state.kind === 'success') {
    return <SubmissionConfirmation response={state.response} />;
  }

  const isSubmitting = state.kind === 'submitting';
  const isTerminalError = state.kind === 'error' && state.terminal;
  const submitDisabled = !acknowledged || isSubmitting || isTerminalError;

  return (
    <Box css={{ stack: 'y', gap: 'large', padding: 'large' }}>
      <Inline css={{ font: 'heading' }}>Submit evidence</Inline>

      <Box css={{ stack: 'y', gap: 'xsmall', padding: 'medium', backgroundColor: 'container', borderRadius: 'medium' }}>
        <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>Dispute</Inline>
          <Inline css={{ font: 'caption' }}>{dispute.id}</Inline>
        </Box>
        <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>Reason</Inline>
          <Inline css={{ font: 'caption' }}>{playbook.display_name}</Inline>
        </Box>
        <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>Mandatory evidence</Inline>
          <Inline css={{ font: 'caption' }}>{attached} of {total} attached</Inline>
        </Box>
        <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>Narrative</Inline>
          <Inline css={{ font: 'caption' }}>{narrativeWords} words</Inline>
        </Box>
      </Box>

      {state.kind === 'error' && (
        <Banner
          type={state.terminal ? 'critical' : 'caution'}
          title={state.terminal ? "Can't submit" : 'Submission failed'}
          description={state.message}
        />
      )}

      {attached < total && !isTerminalError && (
        <Banner
          type="caution"
          title="Missing mandatory evidence"
          description={`${total - attached} mandatory item${total - attached === 1 ? '' : 's'} not attached. You can still submit, but your chances improve with more evidence.`}
        />
      )}

      {!isTerminalError && (
        <Banner
          type="caution"
          title="Submission is final"
          description="Once you submit, your evidence is final and cannot be changed or recalled. Stripe will send it directly to the card issuer."
        />
      )}

      <Checkbox
        label="I understand this submission is final."
        checked={acknowledged}
        onChange={() => setAcknowledged((prev) => !prev)}
        disabled={isSubmitting || isTerminalError}
      />

      <Box>
        <Button
          type="primary"
          disabled={submitDisabled}
          onPress={handleSubmit}
        >
          {isSubmitting ? (
            <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
              <Spinner />
              <Inline>Submitting evidence...</Inline>
            </Box>
          ) : (
            'Submit to Stripe'
          )}
        </Button>
      </Box>
    </Box>
  );
}
