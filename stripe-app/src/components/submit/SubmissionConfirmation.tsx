import { Box, Banner, Button, Inline } from '@stripe/ui-extension-sdk/ui';
import type { SubmissionResponse } from '../../lib/types';

interface SubmissionConfirmationProps {
  response: SubmissionResponse;
  onBackToList?: () => void;
}

export default function SubmissionConfirmation({ response, onBackToList }: SubmissionConfirmationProps) {
  const submittedAt = new Date(response.submitted_at).toLocaleString();

  return (
    <Box css={{ stack: 'y', gap: 'large', padding: 'large' }}>
      <Banner
        type="default"
        title="Evidence submitted"
        description="Your rebuttal is on its way to the card issuer."
      />

      <Box css={{ stack: 'y', gap: 'small' }}>
        <Inline css={{ font: 'heading' }}>What happens next</Inline>
        <Box>
          The bank typically takes 60-75 days to issue a decision. You will be
          notified in Stripe when the dispute is resolved.
        </Box>
        <Box css={{ stack: 'y', gap: 'xxsmall' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>Submitted at</Inline>
          <Inline css={{ font: 'caption' }}>{submittedAt}</Inline>
        </Box>
      </Box>

      {onBackToList && (
        <Button type="secondary" onPress={onBackToList}>
          Back to disputes
        </Button>
      )}
    </Box>
  );
}
