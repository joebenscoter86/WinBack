import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Badge,
  Button,
  ContextView,
  Inline,
  Spinner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import DisputeWorkflow from '../components/DisputeWorkflow';
import { fetchBackend, ApiError } from '../lib/apiClient';
import type { Dispute } from '../lib/types';
import { getStatusBadge } from '../lib/utils';

type ViewState = 'loading' | 'no_dispute' | 'error' | 'ready';

const PaymentDisputeView = (context: ExtensionContextValue) => {
  const { environment } = context;
  const paymentIntentId = environment?.objectContext?.id;

  const [viewState, setViewState] = useState<ViewState>('loading');
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const loadDispute = useCallback(async () => {
    if (!paymentIntentId) {
      setViewState('no_dispute');
      return;
    }

    setViewState('loading');
    try {
      const result = await fetchBackend<{ data: Dispute }>(
        `/api/disputes/by-payment-intent/${paymentIntentId}`,
        context,
      );
      setDispute(result.data);
      setViewState('ready');
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setViewState('no_dispute');
      } else {
        setViewState('error');
      }
    }
  }, [paymentIntentId, context]);

  useEffect(() => {
    loadDispute();
  }, [loadDispute]);

  if (viewState === 'loading') {
    return (
      <ContextView title="WinBack">
        <Box css={{ padding: 'medium', alignX: 'center' }}>
          <Spinner size="large" />
        </Box>
      </ContextView>
    );
  }

  if (viewState === 'no_dispute' || viewState === 'error' || !dispute) {
    return (
      <ContextView title="WinBack">
        <Box css={{ padding: 'medium', alignX: 'center' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            No dispute on this payment.
          </Inline>
        </Box>
      </ContextView>
    );
  }

  const statusBadge = getStatusBadge(dispute.status);

  return (
    <ContextView title="WinBack">
      <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
        <Box
          css={{
            stack: 'x',
            gap: 'small',
            distribute: 'space-between',
            alignY: 'center',
          }}
        >
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Dispute
          </Inline>
          <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
        </Box>

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'body' }}>
            {dispute.network.charAt(0).toUpperCase() +
              dispute.network.slice(1)}{' '}
            {dispute.reason_code}
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {dispute.reason.replace(/_/g, ' ')}
          </Inline>
        </Box>

        {(dispute.status === 'needs_response' ||
          dispute.status === 'warning_needs_response') && (
          <Button
            type="primary"
            css={{ width: 'fill' }}
            onPress={() => setShowWorkflow(true)}
          >
            Open in WinBack
          </Button>
        )}
      </Box>

      <DisputeWorkflow
        disputeId={dispute.id}
        shown={showWorkflow}
        setShown={setShowWorkflow}
      />
    </ContextView>
  );
};

export default PaymentDisputeView;
