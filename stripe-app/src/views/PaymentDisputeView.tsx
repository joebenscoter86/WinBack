import { useState } from 'react';
import {
  Box,
  Badge,
  Button,
  ContextView,
  Inline,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import DisputeWorkflow from '../components/DisputeWorkflow';
import { MOCK_DISPUTES } from '../lib/mockData';
import type { Dispute } from '../lib/types';

function getStatusBadge(status: string): {
  label: string;
  type: 'urgent' | 'warning' | 'positive' | 'negative' | 'info';
} {
  switch (status) {
    case 'needs_response':
    case 'warning_needs_response':
      return { label: 'Needs Response', type: 'urgent' };
    case 'under_review':
    case 'warning_under_review':
      return { label: 'Under Review', type: 'info' };
    case 'won':
      return { label: 'Won', type: 'positive' };
    case 'lost':
    case 'warning_closed':
      return { label: 'Lost', type: 'negative' };
    default:
      return { label: status, type: 'info' };
  }
}

const PaymentDisputeView = ({ environment }: ExtensionContextValue) => {
  const paymentIntentId = environment?.objectContext?.id;

  // In WIN-10+, this will be a real API lookup by payment_intent ID
  const dispute: Dispute | undefined = MOCK_DISPUTES.find(
    (d) => d.payment_intent === paymentIntentId,
  );

  // For dev/demo: show first mock dispute if no match (real matching comes in WIN-10)
  const displayDispute = dispute ?? MOCK_DISPUTES[0];

  const [showWorkflow, setShowWorkflow] = useState(false);

  if (!displayDispute) {
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

  const statusBadge = getStatusBadge(displayDispute.status);

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
            {displayDispute.network.charAt(0).toUpperCase() +
              displayDispute.network.slice(1)}{' '}
            {displayDispute.reason_code}
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {displayDispute.reason.replace(/_/g, ' ')}
          </Inline>
        </Box>

        {(displayDispute.status === 'needs_response' ||
          displayDispute.status === 'warning_needs_response') && (
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
        disputeId={displayDispute.id}
        shown={showWorkflow}
        setShown={setShowWorkflow}
      />
    </ContextView>
  );
};

export default PaymentDisputeView;
