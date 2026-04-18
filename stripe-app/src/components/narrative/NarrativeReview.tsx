import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Badge,
  Banner,
  Box,
  Button,
  Divider,
  Inline,
  TextArea,
} from '@stripe/ui-extension-sdk/ui';
import {
  NarrativeAnnotation,
  MAX_GENERATIONS,
  FEEDBACK_TAGS,
  FeedbackTag,
} from '../../lib/narrative-types';

interface NarrativeReviewProps {
  narrative: string;
  annotations: NarrativeAnnotation[];
  editedNarrative: string;
  generationNumber: number;
  onEditChange: (text: string) => void;
  onApprove: () => void;
  onRegenerate: (merchantFeedback: string, tags: FeedbackTag[]) => void;
  submitted?: boolean;
}

const NarrativeReview = ({
  narrative,
  annotations,
  editedNarrative,
  generationNumber,
  onEditChange,
  onApprove,
  onRegenerate,
  submitted,
}: NarrativeReviewProps) => {
  const [showRegenConfirm, setShowRegenConfirm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedTags, setSelectedTags] = useState<FeedbackTag[]>([]);

  const remaining = MAX_GENERATIONS - generationNumber;
  const limitReached = remaining <= 0;
  const hasEdits = editedNarrative !== narrative;

  const toggleTag = (tag: FeedbackTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleRegenerateClick = () => {
    if (hasEdits) {
      setShowRegenConfirm(true);
    } else {
      onRegenerate(feedback, selectedTags);
    }
  };

  const handleConfirmRegenerate = () => {
    setShowRegenConfirm(false);
    onRegenerate(feedback, selectedTags);
  };

  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'large' }}>
      {/* Coach header card */}
      <Box
        css={{
          stack: 'y',
          gap: 'small',
          backgroundColor: 'container',
          padding: 'medium',
          borderRadius: 'medium',
        }}
      >
        <Box css={{ stack: 'x', distribute: 'space-between', alignY: 'center' }}>
          <Badge type="info">AI Coach</Badge>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Generation {generationNumber} of {MAX_GENERATIONS}
          </Inline>
        </Box>
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          Your dispute narrative
        </Inline>
        <Inline css={{ font: 'body', color: 'secondary' }}>
          Review the AI's reasoning, then edit the narrative below. This is
          the text that will be submitted to Stripe.
        </Inline>
      </Box>

      {/* AI Strategy & Reasoning accordion */}
      {annotations.length > 0 && (
        <Accordion>
          <AccordionItem
            title="AI Strategy & Reasoning"
            subtitle={`${annotations.length} section${annotations.length === 1 ? '' : 's'} analyzed`}
            defaultOpen
          >
            <Box css={{ stack: 'y', gap: 'medium' }}>
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
        <Box css={{ stack: 'x', distribute: 'space-between', alignY: 'center' }}>
          <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
            {submitted ? 'Submitted narrative' : 'Edit your narrative'}
          </Inline>
          {!submitted && hasEdits && (
            <Inline css={{ font: 'caption', color: 'success' }}>
              {'\u2713'} Auto-saved
            </Inline>
          )}
        </Box>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          {submitted
            ? 'This narrative was submitted to Stripe and cannot be changed.'
            : 'Edits are saved locally and travel forward to the Submit step.'}
        </Inline>
        <TextArea
          label=""
          value={editedNarrative}
          onChange={(e) => onEditChange(e.target.value)}
          rows={12}
          disabled={submitted}
        />
      </Box>

      {/* Regeneration confirm banner — hidden when submitted */}
      {!submitted && showRegenConfirm && (
        <Banner
          type="caution"
          title="Regenerating will replace your edits. Continue?"
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

      {/* Feedback card for regeneration — hidden when submitted */}
      {!submitted && !limitReached && !showRegenConfirm && (
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
            What would you like to change?
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Optional. Pick one or more, add notes, or skip and click Regenerate.
          </Inline>
          <Box css={{ stack: 'x', gap: 'small', wrap: 'wrap' }}>
            {FEEDBACK_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <Button
                  key={tag.id}
                  type={isSelected ? 'primary' : 'secondary'}
                  size="small"
                  onPress={() => toggleTag(tag.id)}
                >
                  {tag.label}
                </Button>
              );
            })}
          </Box>
          <TextArea
            label=""
            placeholder="Anything specific? e.g. Emphasize the delivery tracking more"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={2}
          />
        </Box>
      )}

      <Divider />

      {/* Action buttons — hidden when submitted */}
      {!submitted && (
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
      )}
    </Box>
  );
};

export default NarrativeReview;
