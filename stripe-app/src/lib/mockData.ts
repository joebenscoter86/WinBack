import type { Dispute } from './types';

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'dp_mock_1',
    amount: 14900,
    currency: 'usd',
    reason: 'product_not_received',
    status: 'needs_response',
    due_by: '2026-03-28',
    reason_code: '13.1',
    network: 'visa',
    payment_intent: 'pi_mock_1',
  },
  {
    id: 'dp_mock_2',
    amount: 8999,
    currency: 'usd',
    reason: 'product_unacceptable',
    status: 'needs_response',
    due_by: '2026-04-06',
    reason_code: '4853',
    network: 'mastercard',
    payment_intent: 'pi_mock_2',
  },
  {
    id: 'dp_mock_3',
    amount: 23450,
    currency: 'usd',
    reason: 'fraudulent',
    status: 'needs_response',
    due_by: '2026-04-12',
    reason_code: '10.4',
    network: 'visa',
    payment_intent: 'pi_mock_3',
  },
];
