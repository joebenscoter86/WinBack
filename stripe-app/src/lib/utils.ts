import type { DisputeStatus } from './types';

const RESOLVED_STATUSES: DisputeStatus[] = ['won', 'lost', 'warning_closed', 'charge_refunded'];

export function isResolved(status: string): boolean {
  return RESOLVED_STATUSES.includes(status as DisputeStatus);
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
    case 'warning_closed':
      return { label: 'Lost', type: 'negative' };
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

export function getUrgencyBadge(
  dueBy: string,
  status: string,
): { label: string; type: 'urgent' | 'warning' | 'positive' } | null {
  if (isResolved(status)) return null;

  const days = getDaysRemaining(dueBy);
  if (days < 5) return { label: `${days}d left`, type: 'urgent' };
  if (days <= 13) return { label: `${days}d left`, type: 'warning' };
  return { label: `${days}d left`, type: 'positive' };
}
