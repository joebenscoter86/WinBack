import { Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface ChecklistProgressProps {
  completed: number;
  total: number;
}

const ChecklistProgress = ({ completed, total }: ChecklistProgressProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Box css={{ stack: 'y', gap: 'xsmall' }}>
      <Box css={{ stack: 'x', distribute: 'space-between' }}>
        <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
          Evidence Progress
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          {completed} of {total} completed
        </Inline>
      </Box>
      <Box
        css={{
          background: 'container',
          borderRadius: 'small',
          height: 'xxsmall',
          overflow: 'hidden',
        }}
      >
        <Box
          css={{
            background: 'info',
            borderRadius: 'small',
            height: 'xxsmall',
            width: `${percentage}%` as any,
          }}
        />
      </Box>
    </Box>
  );
};

export default ChecklistProgress;
