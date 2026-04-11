import { Box, Inline, Spinner } from '@stripe/ui-extension-sdk/ui';
import { Dispute } from '../../lib/types';

interface NarrativeGeneratingProps {
  dispute: Dispute;
}

const NarrativeGenerating = ({ dispute }: NarrativeGeneratingProps) => {
  return (
    <Box
      css={{
        padding: 'xlarge',
        alignX: 'center',
        stack: 'y',
        gap: 'medium',
      }}
    >
      <Spinner size="large" />
      <Inline css={{ fontWeight: 'bold' }}>Generating your narrative...</Inline>
      <Inline>
        WinBack is analyzing your evidence and building a response tailored to{' '}
        {dispute.network} reason code {dispute.reason_code}. This usually takes
        5-10 seconds.
      </Inline>
    </Box>
  );
};

export default NarrativeGenerating;
