import { Box, Badge, Inline, Link, Spinner } from '@stripe/ui-extension-sdk/ui';
import type { Dispute } from '../../lib/types';
import { getStatusBadge, getUrgencyBadge, getDaysRemaining } from '../../lib/utils';

interface DisputeOverviewProps {
  dispute: Dispute;
  loading: boolean;
}

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between', alignY: 'center' }}>
      <Inline css={{ font: 'caption', color: 'secondary' }}>{label}</Inline>
      <Inline css={{ font: 'caption' }}>{value}</Inline>
    </Box>
  );
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const DisputeOverview = ({ dispute, loading }: DisputeOverviewProps) => {
  const statusBadge = getStatusBadge(dispute.status);
  const urgencyBadge = getUrgencyBadge(dispute.due_by, dispute.status);
  const daysRemaining = dispute.due_by ? getDaysRemaining(dispute.due_by) : null;

  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      {/* Header: amount + badges */}
      <Box css={{ stack: 'x', gap: 'small', distribute: 'space-between', alignY: 'center' }}>
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          {formatAmount(dispute.amount, dispute.currency)}
        </Inline>
        <Box css={{ stack: 'x', gap: 'xsmall' }}>
          <Badge type={statusBadge.type}>{statusBadge.label}</Badge>
          {urgencyBadge && (
            <Badge type={urgencyBadge.type}>{urgencyBadge.label}</Badge>
          )}
        </Box>
      </Box>

      {/* Countdown */}
      {daysRemaining !== null && daysRemaining > 0 && (
        <Inline css={{ font: 'body', color: 'secondary' }}>
          {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} to respond
        </Inline>
      )}

      {/* Customer info */}
      {dispute.customer_name && (
        <InfoRow label="Customer" value={dispute.customer_name} />
      )}
      {dispute.customer_email && (
        <InfoRow label="Email" value={dispute.customer_email} />
      )}

      {/* Enriched section */}
      {loading ? (
        <Box css={{ padding: 'small' }}>
          <Spinner />
        </Box>
      ) : (
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          {dispute.card_brand && dispute.card_last4 && (
            <InfoRow
              label="Card"
              value={`${dispute.card_brand.charAt(0).toUpperCase() + dispute.card_brand.slice(1)} ending in ${dispute.card_last4}`}
            />
          )}
          {dispute.transaction_date && (
            <InfoRow label="Transaction date" value={formatDate(dispute.transaction_date)} />
          )}
          {dispute.charge_description && (
            <InfoRow label="Description" value={dispute.charge_description} />
          )}
          {dispute.billing_address && (
            <InfoRow label="Billing address" value={dispute.billing_address} />
          )}
          {dispute.receipt_url && (
            <InfoRow
              label="Receipt"
              value={<Link href={dispute.receipt_url} target="_blank">View receipt</Link>}
            />
          )}
          {dispute.metadata && Object.keys(dispute.metadata).length > 0 && (
            <>
              {Object.entries(dispute.metadata).map(([key, val]) => (
                <InfoRow key={key} label={key} value={val} />
              ))}
            </>
          )}
        </Box>
      )}

      {/* Footer: IDs */}
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Inline css={{ font: 'caption', color: 'secondary' }}>Dispute: {dispute.id}</Inline>
        {dispute.charge_id && (
          <Inline css={{ font: 'caption', color: 'secondary' }}>Charge: {dispute.charge_id}</Inline>
        )}
      </Box>
    </Box>
  );
};

export default DisputeOverview;
