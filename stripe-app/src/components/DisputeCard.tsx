import { Box, Badge, Button, Inline } from '@stripe/ui-extension-sdk/ui';
import type { Dispute } from '../lib/types';

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

function getDaysRemaining(dueBy: string): number {
  const now = new Date();
  const due = new Date(dueBy);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getUrgencyBadge(dueBy: string): { label: string; type: 'urgent' | 'warning' | 'positive' } {
  const days = getDaysRemaining(dueBy);
  if (days <= 3) return { label: `${days}d left`, type: 'urgent' };
  if (days <= 7) return { label: `${days}d left`, type: 'warning' };
  return { label: `${days}d left`, type: 'positive' };
}

const DisputeCard = ({ dispute, onSelect }: DisputeCardProps) => {
  const urgency = getUrgencyBadge(dispute.due_by);

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
          <Badge type={urgency.type}>{urgency.label}</Badge>
        </Box>
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
