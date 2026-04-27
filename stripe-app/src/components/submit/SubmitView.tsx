import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Banner,
  Checkbox,
  FocusView,
  Inline,
  Link,
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
import { isInquiry } from '../../lib/utils';
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
    (i) => i.stripe_field || i.narrative_only || filed.has(i.key),
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
  const [billing, setBilling] = useState<{
    tier: 'usage' | 'pro';
    has_payment_method: boolean;
  } | null>(null);
  const [pmGateOpen, setPmGateOpen] = useState(false);
  const [pmGateError, setPmGateError] = useState<string | null>(null);
  // Pre-fetched signed URL for /setup-billing. Stripe Apps run in a
  // sandboxed iframe where window.open() is silently blocked, so the
  // gate modal renders the action as a <Link target="_blank"> instead
  // of a Button with onPress.
  const [pmSetupUrl, setPmSetupUrl] = useState<string | null>(null);
  const contextRef = useRef(context);
  contextRef.current = context;

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchBackend<{
          tier: 'usage' | 'pro';
          has_payment_method: boolean;
        }>('/api/billing/status', contextRef.current);
        setBilling({ tier: result.tier, has_payment_method: result.has_payment_method });
      } catch {
        // If billing status fails, fall through and let submit proceed without gating.
      }
    };
    load();
  }, []);

  // Pre-fetch the setup-billing link if the merchant qualifies (usage tier
  // without a PM). Token is minted up front because the gate modal will
  // need a navigable URL the moment it opens.
  useEffect(() => {
    if (!billing || billing.tier !== 'usage' || billing.has_payment_method) {
      setPmSetupUrl(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchBackend<{ url: string }>(
          '/api/billing/setup-link',
          contextRef.current,
        );
        if (!cancelled) setPmSetupUrl(result.url);
      } catch (err) {
        if (cancelled) return;
        setPmGateError(err instanceof ApiError ? err.message : 'Failed to prepare setup link');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [billing?.tier, billing?.has_payment_method]);

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

  const attemptSubmit = async () => {
    if (billing && billing.tier === 'usage' && !billing.has_payment_method) {
      setPmGateOpen(true);
      return;
    }
    await handleSubmit();
  };

  if (state.kind === 'success') {
    return <SubmissionConfirmation response={state.response} />;
  }

  const stageIsInquiry = isInquiry(dispute.status);
  const isSubmitting = state.kind === 'submitting';
  const isTerminalError = state.kind === 'error' && state.terminal;
  const submitDisabled = !acknowledged || isSubmitting || isTerminalError;

  return (
    <Box css={{ stack: 'y', gap: 'large', padding: 'large' }}>
      <Inline css={{ font: 'heading' }}>
        {stageIsInquiry ? 'Respond to prevent a chargeback' : 'Submit evidence'}
      </Inline>

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
          onPress={attemptSubmit}
        >
          {isSubmitting ? (
            <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
              <Spinner />
              <Inline>{stageIsInquiry ? 'Submitting response...' : 'Submitting evidence...'}</Inline>
            </Box>
          ) : (
            stageIsInquiry ? 'Submit response' : 'Submit to Stripe'
          )}
        </Button>
      </Box>

      {pmGateOpen && (
        <FocusView
          title="Add a payment method before submitting"
          setShown={(open) => { if (!open) setPmGateOpen(false); }}
          primaryAction={
            pmSetupUrl ? (
              <Link href={pmSetupUrl} target="_blank" type="primary">
                Add payment method
              </Link>
            ) : (
              <Button type="primary" disabled>
                Preparing setup link…
              </Button>
            )
          }
          secondaryAction={
            <Button type="secondary" onPress={() => setPmGateOpen(false)}>
              Cancel
            </Button>
          }
        >
          <Box css={{ stack: 'y', gap: 'small' }}>
            <Inline css={{ font: 'body' }}>
              WinBack's Pay-Per-Win plan charges 15% only when you win. Add a card
              now so we can settle instantly if this dispute is resolved in your
              favor. You won't be charged anything today.
            </Inline>
            {pmGateError && (
              <Banner type="critical" title="Could not start setup" description={pmGateError} />
            )}
          </Box>
        </FocusView>
      )}
    </Box>
  );
}
