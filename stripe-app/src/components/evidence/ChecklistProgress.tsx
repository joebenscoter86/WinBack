import { Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface ChecklistProgressProps {
  completed: number;
  total: number;
}

type FractionWidth = '1/12' | '2/12' | '3/12' | '4/12' | '5/12' | '6/12' | '7/12' | '8/12' | '9/12' | '10/12' | '11/12' | 'fill';

function getProgressWidth(completed: number, total: number): FractionWidth | null {
  if (total === 0 || completed === 0) return null;
  if (completed >= total) return 'fill';
  const twelfths = Math.max(1, Math.round((completed / total) * 12));
  return `${twelfths}/12` as FractionWidth;
}

const ChecklistProgress = ({ completed, total }: ChecklistProgressProps) => {
  const progressWidth = getProgressWidth(completed, total);

  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Box css={{ stack: 'x', distribute: 'space-between' }}>
        <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
          Evidence Progress
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          {completed} of {total} completed
        </Inline>
      </Box>
      <Box css={{ backgroundColor: 'container', borderRadius: 'rounded', overflow: 'hidden' }}>
        {progressWidth ? (
          <Box
            css={{
              backgroundColor: 'surface',
              borderRadius: 'rounded',
              width: progressWidth,
              padding: 'xxsmall',
            }}
          >
            <Inline>{' '}</Inline>
          </Box>
        ) : (
          <Box css={{ padding: 'xxsmall' }}>
            <Inline>{' '}</Inline>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChecklistProgress;
