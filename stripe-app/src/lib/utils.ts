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
