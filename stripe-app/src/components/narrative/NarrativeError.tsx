import { useEffect } from 'react';
import { Box, Button, Banner, Inline, TextArea } from '@stripe/ui-extension-sdk/ui';
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
    <Box css={{ stack: 'y', gap: 'medium' }}>
      {/* Status banner */}
      <Banner
        type="caution"
        title={isGenerationLimit ? 'Generation limit reached' : 'AI generation unavailable'}
        description={
          isGenerationLimit
            ? 'You have used all available AI narrative generations for this dispute. Edit the template below and continue with your manual narrative.'
            : 'AI generation failed. You can edit the playbook template below and submit it as your narrative, or try again.'
        }
      />

      {/* Inline error detail (only for non-limit errors) */}
      {errorMessage && !isGenerationLimit && (
        <Inline css={{ font: 'caption', color: 'critical' }}>{errorMessage}</Inline>
      )}

      {/* Edit section */}
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
          {hasTemplate ? 'Edit the template below' : 'Write your narrative'}
        </Inline>
        {hasTemplate && (
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Fill in the [bracketed sections] with your specific details.
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
