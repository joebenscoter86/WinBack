import { useEffect } from 'react';
import {
  Badge,
  Banner,
  Box,
  Button,
  Inline,
  TextArea,
} from '@stripe/ui-extension-sdk/ui';
import type { Dispute, PlaybookData } from '../../lib/types';
import { interpolateTemplate } from '../../lib/narrative-utils';

interface NarrativeErrorProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  errorMessage: string | null;
  editedNarrative: string;
  isGenerationLimit: boolean;
  onEditChange: (text: string) => void;
  onContinue: () => void;
  onRetry: () => void;
}

const NarrativeError = ({
  dispute,
  playbook,
  errorMessage,
  editedNarrative,
  isGenerationLimit,
  onEditChange,
  onContinue,
  onRetry,
}: NarrativeErrorProps) => {
  const templateText =
    playbook?.narrative_template
      ? interpolateTemplate(playbook.narrative_template, dispute)
      : '';

  // On mount only: seed parent state with the template if the narrative is empty
  useEffect(() => {
    if (!editedNarrative && templateText) {
      onEditChange(templateText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayText = editedNarrative || templateText;
  const hasTemplate = Boolean(templateText);

  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'large' }}>
      {/* Coach header explaining the fallback */}
      <Box
        css={{
          stack: 'y',
          gap: 'small',
          backgroundColor: 'container',
          padding: 'medium',
          borderRadius: 'medium',
        }}
      >
        <Badge type="info">AI Coach</Badge>
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          {isGenerationLimit
            ? 'Generation limit reached'
            : 'AI generation unavailable'}
        </Inline>
        <Inline css={{ font: 'body', color: 'secondary' }}>
          {isGenerationLimit
            ? 'You have used all available AI narrative generations for this dispute. You can still edit the template below and submit it as your manual narrative.'
            : 'We could not reach the AI this time. You can edit the reason-code-specific template below and submit it manually, or try again in a moment. Your deadline is not affected.'}
        </Inline>
      </Box>

      {/* Inline error detail (only for non-limit errors) */}
      {errorMessage && !isGenerationLimit && (
        <Banner
          type="critical"
          title="Details"
          description={errorMessage}
        />
      )}

      {/* Edit card */}
      <Box
        css={{
          stack: 'y',
          gap: 'small',
          backgroundColor: 'container',
          padding: 'medium',
          borderRadius: 'medium',
        }}
      >
        <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
          {hasTemplate ? 'Edit the template' : 'Write your narrative'}
        </Inline>
        {hasTemplate ? (
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Fill in the [bracketed sections] with your specific details.
            Stripe-verified fields (AVS, CVV, 3DS) are already filled in.
          </Inline>
        ) : (
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Describe what happened, why this charge was legitimate, and the
            evidence that supports your case.
          </Inline>
        )}
        <TextArea
          label=""
          value={displayText}
          onChange={(e) => onEditChange(e.target.value)}
          rows={14}
          placeholder={
            hasTemplate
              ? undefined
              : 'Describe what happened, why this charge was legitimate, and any supporting details...'
          }
        />
      </Box>

      {/* Action buttons */}
      <Box css={{ stack: 'x', gap: 'small' }}>
        <Button type="primary" onPress={onContinue}>
          Continue with Manual Narrative
        </Button>
        {!isGenerationLimit && (
          <Button type="secondary" onPress={onRetry}>
            Try Again
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NarrativeError;
