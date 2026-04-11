import { useState, useEffect } from 'react';
import { Box, Badge, Inline } from '@stripe/ui-extension-sdk/ui';
import { getTimeRemaining, getUrgencyTier, isResolved } from '../lib/utils';

interface DeadlineTimerProps {
  dueBy: string;
  status: string;
}

const DeadlineTimer = ({ dueBy, status }: DeadlineTimerProps) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, [dueBy]);

  if (!dueBy || isResolved(status)) return null;

  const time = getTimeRemaining(dueBy);
  const tier = getUrgencyTier(time.days);
  const isUrgent = time.days < 5 && !time.isExpired;

  const label = time.isExpired
    ? 'Deadline passed'
    : time.days === 0
      ? `${time.hours}h remaining`
      : `${time.days}d ${time.hours}h remaining`;

  return (
    <Box
      css={{
        stack: 'x',
        gap: 'small',
        distribute: 'space-between',
        alignY: 'center',
        backgroundColor: 'container',
        padding: 'small',
        borderRadius: 'medium',
      }}
    >
      <Inline css={{ font: 'caption', fontWeight: 'semibold', color: isUrgent ? 'critical' : 'secondary' }}>
        {isUrgent ? 'Respond now' : 'Response deadline'}
      </Inline>
      <Badge type={time.isExpired ? 'urgent' : tier}>{label}</Badge>
    </Box>
  );
};

export default DeadlineTimer;
