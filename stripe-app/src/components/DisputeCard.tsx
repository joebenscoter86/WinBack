import { Box, Badge, Button, Inline } from '@stripe/ui-extension-sdk/ui';
import type { Dispute } from '../lib/types';
import {
  getStatusBadge,
  getUrgencyBadge,
  getReasonCodeLabel,
  isDisputeExpired,
} from '../lib/utils';

interface DisputeCardProps {
  dispute: Dispute;
  onSelect: (disputeId: string) => void;
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

const DisputeCard = ({ dispute, onSelect }: DisputeCardProps) => {
  const expired = isDisputeExpired(dispute.due_by, dispute.status);
  // Hide the "Needs Response" status badge for expired disputes -- the
  // red "Expired" urgency badge already tells the merchant what state
  // they're in, and showing both is contradictory (WIN-48).
  const statusBadge = expired ? null : getStatusBadge(dispute.status);
  const urgencyBadge = getUrgencyBadge(dispute.due_by, dispute.status);
  const reasonLabel = getReasonCodeLabel(dispute.network, dispute.reason_code);

  return (
    <Button
      type="secondary"
      css={{ width: 'fill' }}
      onPress={() => onSelect(dispute.id)}
    >
      <Box
        css={{
          stack: 'y',
          gap: 'xsmall',
          width: 'fill',
          padding: 'small',
        }}
      >
        <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between', alignY: 'center' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            {formatAmount(dispute.amount, dispute.currency)}
          </Inline>
          <Box css={{ stack: 'x', gap: 'xsmall' }}>
            {statusBadge && (
              <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
            )}
            {urgencyBadge && (
              <Badge type={urgencyBadge.type}>{urgencyBadge.label}</Badge>
            )}
          </Box>
        </Box>
        <Inline css={{ font: 'caption' }}>
          {dispute.customer_name || 'Unknown customer'}
        </Inline>
        {reasonLabel && (
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {reasonLabel}
          </Inline>
        )}
        <Box css={{ stack: 'x', gap: 'small' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {dispute.network.charAt(0).toUpperCase() + dispute.network.slice(1)} {dispute.reason_code}
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {dispute.id.slice(0, 12)}...
          </Inline>
        </Box>
      </Box>
    </Button>
  );
};

export default DisputeCard;
