import type { CardNetwork, DisputeStatus } from './types';

const REASON_CODE_LABELS: Record<string, string> = {
  'visa:10.4': 'Fraud -- Card Not Present',
  'visa:13.1': 'Merchandise / Services Not Received',
  'visa:13.2': 'Cancelled Recurring Transaction',
  'visa:13.3': 'Not as Described or Defective',
  'visa:13.6': 'Credit Not Processed',
  'mastercard:4808': 'Authorization-Related Dispute',
  'mastercard:4853': 'Not as Described / Defective',
};

export function getReasonCodeLabel(network: CardNetwork, reasonCode: string): string | null {
  return REASON_CODE_LABELS[`${network}:${reasonCode}`] ?? null;
}

const RESOLVED_STATUSES: DisputeStatus[] = ['won', 'lost', 'warning_closed', 'charge_refunded'];

export function isResolved(status: string): boolean {
  return RESOLVED_STATUSES.includes(status as DisputeStatus);
}

/**
 * Stripe inquiries (status prefixed `warning_`) are pre-dispute warnings.
 * Funds are not held. Responding can prevent escalation to a chargeback.
 * The frontend uses this for stage-aware copy and the "Inquiry" pill on
 * the dispute card.
 */
export function isInquiry(status: string): boolean {
  return status.startsWith('warning_');
}

/**
 * A dispute is "expired" when the deadline has passed but Stripe still
 * reports it as needs_response. Authoritative source for the backend is
 * stripeDispute.status; the UI uses due_by as a leading indicator before
 * Stripe flips the status.
 */
export function isDisputeExpired(dueBy: string, status: string): boolean {
  if (status !== 'needs_response' && status !== 'warning_needs_response') {
    return false;
  }
  return getTimeRemaining(dueBy).isExpired;
}

export function getStatusBadge(status: string): {
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
      return { label: 'Lost', type: 'negative' };
    case 'warning_closed':
      // Inquiries close without telling us the outcome. Don't claim "Lost".
      return { label: 'Inquiry closed', type: 'info' };
    case 'charge_refunded':
      return { label: 'Refunded', type: 'info' };
    default:
      return { label: status, type: 'info' };
  }
}

export function getDaysRemaining(dueBy: string): number {
  const now = new Date();
  const due = new Date(dueBy);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export interface TimeRemaining {
  days: number;
  hours: number;
  isExpired: boolean;
}

export function getTimeRemaining(dueBy: string): TimeRemaining {
  const totalMs = new Date(dueBy).getTime() - Date.now();
  if (totalMs <= 0) return { days: 0, hours: 0, isExpired: true };
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
  return {
    days: Math.floor(totalHours / 24),
    hours: totalHours % 24,
    isExpired: false,
  };
}

export type UrgencyTier = 'urgent' | 'warning' | 'positive';

export function getUrgencyTier(days: number): UrgencyTier {
  if (days < 5) return 'urgent';
  if (days <= 13) return 'warning';
  return 'positive';
}

export function getUrgencyBadge(
  dueBy: string,
  status: string,
): { label: string; type: UrgencyTier } | null {
  if (isResolved(status)) return null;

  const time = getTimeRemaining(dueBy);
  const tier = getUrgencyTier(time.days);

  if (time.isExpired) return { label: 'Expired', type: 'urgent' };
  if (time.days < 5) return { label: `${time.days}d ${time.hours}h left`, type: tier };
  return { label: `${time.days}d left`, type: tier };
}
