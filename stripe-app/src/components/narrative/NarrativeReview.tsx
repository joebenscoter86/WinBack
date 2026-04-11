import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Box,
  Button,
  Banner,
  Inline,
  TextArea,
} from '@stripe/ui-extension-sdk/ui';
import { NarrativeAnnotation, MAX_GENERATIONS } from '../../lib/narrative-types';

interface NarrativeReviewProps {
  narrative: string;
  annotations: NarrativeAnnotation[];
  editedNarrative: string;
  generationNumber: number;
  onEditChange: (text: string) => void;
  onApprove: () => void;
  onRegenerate: (merchantFeedback: string) => void;
}

const NarrativeReview = ({
  narrative,
  annotations,
  editedNarrative,
  generationNumber,
  onEditChange,
  onApprove,
  onRegenerate,
}: NarrativeReviewProps) => {
  const [showRegenConfirm, setShowRegenConfirm] = useState(false);
  const [feedback, setFeedback] = useState('');

  const remaining = MAX_GENERATIONS - generationNumber;
  const limitReached = remaining <= 0;
  const hasEdits = editedNarrative !== narrative;

  const handleRegenerateClick = () => {
    if (hasEdits) {
      setShowRegenConfirm(true);
    } else {
      onRegenerate(feedback);
    }
  };

  const handleConfirmRegenerate = () => {
    setShowRegenConfirm(false);
    onRegenerate(feedback);
  };

  return (
    <Box css={{ stack: 'y', gap: 'medium' }}>
      {/* Header row */}
      <Box css={{ stack: 'x', distribute: 'space-between', alignY: 'center' }}>
        <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
          Your Dispute Narrative
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          Generation {generationNumber} of {MAX_GENERATIONS}
        </Inline>
      </Box>

      {/* AI Strategy & Reasoning accordion */}
      <Accordion>
        <AccordionItem
          title="AI Strategy & Reasoning"
          subtitle={`${annotations.length} section${annotations.length === 1 ? '' : 's'} analyzed`}
        >
          <Box css={{ stack: 'y', gap: 'small' }}>
            {annotations.map((annotation, index) => (
              <Box key={index} css={{ stack: 'y', gap: 'xsmall' }}>
                <Inline
                  css={{
                    font: 'caption',
                    fontWeight: 'semibold',
                    color: 'secondary',
                    textTransform: 'uppercase',
                  }}
                >
                  {annotation.section}
                </Inline>
                <Inline css={{ font: 'caption', color: 'info' }}>
                  {annotation.reasoning}
                </Inline>
              </Box>
            ))}
          </Box>
        </AccordionItem>
      </Accordion>

      {/* Edit section */}
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Box css={{ stack: 'x', distribute: 'space-between', alignY: 'center' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            Edit Your Narrative
          </Inline>
          {hasEdits && (
            <Inline css={{ font: 'caption', color: 'success' }}>
              {'\u2713'} Auto-saved
            </Inline>
          )}
        </Box>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          This is the text that will be submitted to Stripe. Edit freely.
        </Inline>
        <TextArea
          label=""
          value={editedNarrative}
          onChange={(e) => onEditChange(e.target.value)}
          rows={12}
        />
      </Box>

      {/* Regeneration confirm banner */}
      {showRegenConfirm && (
        <Banner
          type="caution"
          title="Regenerating will replace your edits"
          actions={
            <Box css={{ stack: 'x', gap: 'small' }}>
              <Button type="destructive" onPress={handleConfirmRegenerate}>
                Yes, regenerate
              </Button>
              <Button onPress={() => setShowRegenConfirm(false)}>
                Keep editing
              </Button>
            </Box>
          }
        />
      )}

      {/* Feedback textarea for regeneration */}
      {!limitReached && !showRegenConfirm && (
        <TextArea
          label="Feedback for regeneration (optional)"
          placeholder="e.g. Emphasize the delivery tracking more"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={2}
        />
      )}

      {/* Action buttons */}
      <Box css={{ stack: 'x', distribute: 'space-between', alignY: 'center' }}>
        <Box css={{ stack: 'x', gap: 'small' }}>
          <Button type="primary" onPress={onApprove}>
            Approve &amp; Continue
          </Button>
          <Button
            onPress={handleRegenerateClick}
            disabled={limitReached}
          >
            Regenerate
          </Button>
        </Box>
        {limitReached ? (
          <Inline css={{ font: 'caption', color: 'attention' }}>
            No generations remaining
          </Inline>
        ) : (
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {remaining} generation{remaining === 1 ? '' : 's'} remaining
          </Inline>
        )}
      </Box>
    </Box>
  );
};

export default NarrativeReview;
