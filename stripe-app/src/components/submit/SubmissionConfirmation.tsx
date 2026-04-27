import { Box, Banner, Button, Inline } from '@stripe/ui-extension-sdk/ui';
import type { SubmissionResponse, SubmissionWarning } from '../../lib/types';

interface SubmissionConfirmationProps {
  response: SubmissionResponse;
  onBackToList?: () => void;
  isInquiry?: boolean;
}

function describeWarning(w: SubmissionWarning): string {
  switch (w.code) {
    case 'field_truncated':
      return `Your narrative was truncated from ${w.original_length} to ${w.truncated_length} characters before submission.`;
    case 'field_collision':
      return `"${w.losing_item}" collided with "${w.winning_item}" on ${w.field}; resolved by ${w.resolution === 'uncategorized_file' ? 'attaching as uncategorized file' : 'dropping the losing item'}.`;
    case 'missing_mandatory_items':
      return `Mandatory items were not attached: ${w.items.join(', ')}. Submitted without them.`;
    case 'deadline_passed':
      return `The response deadline has passed. Submitted late.`;
    case 'concat_skipped':
      return `"${w.file_name}" could not be merged into ${w.slot}: ${w.reason}. Submitted without it.`;
  }
}

export default function SubmissionConfirmation({ response, onBackToList, isInquiry = false }: SubmissionConfirmationProps) {
  const submittedAt = new Date(response.submitted_at).toLocaleString();
  const hasWarnings = response.warnings && response.warnings.length > 0;

  return (
    <Box css={{ stack: 'y', gap: 'large', padding: 'large' }}>
      {hasWarnings && (
        <Banner
          type="caution"
          title="Submitted with warnings"
          description={
            <Box css={{ stack: 'y', gap: 'xsmall' }}>
              {response.warnings.map((w, i) => (
                <Inline key={i} css={{ font: 'caption' }}>
                  • {describeWarning(w)}
                </Inline>
              ))}
            </Box>
          }
        />
      )}

      <Banner
        type="default"
        title={isInquiry ? 'Response sent' : 'Evidence submitted'}
        description={
          isInquiry
            ? 'Stripe will close the inquiry or notify you if it escalates to a chargeback.'
            : 'Your rebuttal is on its way to the card issuer.'
        }
      />

      <Box css={{ stack: 'y', gap: 'small' }}>
        <Inline css={{ font: 'heading' }}>What happens next</Inline>
        <Box>
          {isInquiry
            ? 'The card issuer reviews your response. If it satisfies the inquiry, the case closes. If not, it can escalate to a chargeback -- you will be notified in Stripe and asked to submit again.'
            : 'The bank typically takes 60-75 days to issue a decision. You will be notified in Stripe when the dispute is resolved.'}
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
