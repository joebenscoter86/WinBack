import { Badge, Box, Inline, Spinner } from '@stripe/ui-extension-sdk/ui';
import type { Dispute } from '../../lib/types';

interface NarrativeGeneratingProps {
  dispute: Dispute;
}

const NarrativeGenerating = ({ dispute }: NarrativeGeneratingProps) => {
  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'large' }}>
      <Box
        css={{
          stack: 'y',
          gap: 'medium',
          alignX: 'center',
          backgroundColor: 'container',
          padding: 'xlarge',
          borderRadius: 'medium',
        }}
      >
        <Badge type="info">AI Coach</Badge>
        <Spinner size="large" />
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          Generating your narrative...
        </Inline>
        <Inline css={{ font: 'body', color: 'secondary' }}>
          WinBack is analyzing your evidence and building a response tailored to{' '}
          {dispute.network} reason code {dispute.reason_code}. This usually takes
          5-10 seconds.
        </Inline>
      </Box>
    </Box>
  );
};

export default NarrativeGenerating;
