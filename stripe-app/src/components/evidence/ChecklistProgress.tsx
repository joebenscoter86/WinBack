import { Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface ChecklistProgressProps {
  completed: number;
  total: number;
}

const ChecklistProgress = ({ completed, total }: ChecklistProgressProps) => {
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
    </Box>
  );
};

export default ChecklistProgress;
