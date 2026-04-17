import { useState } from 'react';
import {
  Badge,
  Banner,
  Box,
  Button,
  Divider,
  Inline,
  Link,
  TextArea,
} from '@stripe/ui-extension-sdk/ui';
import type { Dispute, PlaybookData, EvidenceFile } from '../../lib/types';
import { MAX_GENERATIONS } from '../../lib/narrative-types';
import { getStripeFieldResult } from '../../lib/stripe-field-status';

interface NarrativePreGenerationProps {
  dispute: Dispute;
  playbook: PlaybookData | null;
  evidenceFiles: EvidenceFile[];
  generationNumber: number;
  onGenerate: (merchantFeedback: string) => void;
  onNavigateBack: () => void;
}

const NarrativePreGeneration = ({
  dispute,
  playbook,
  evidenceFiles,
  generationNumber,
  onGenerate,
  onNavigateBack,
}: NarrativePreGenerationProps) => {
  const [feedback, setFeedback] = useState('');

  const remaining = MAX_GENERATIONS - generationNumber;
  const limitReached = remaining <= 0;

  // Build a lookup map: checklist_item_key -> EvidenceFile
  const filesByKey = new Map<string, EvidenceFile>();
  for (const file of evidenceFiles) {
    filesByKey.set(file.checklist_item_key, file);
  }

  // Compute per-item satisfaction. Three categories of "satisfied":
  //   - A (stripe_field): satisfied when auto-pull returns a positive value
  //   - Slot (stripe_evidence_field): satisfied when a file is uploaded
  //   - T (narrative_only): always satisfied -- either the merchant typed
  //     a note or the per-playbook fallback fills it in at narrative time.
  //     (WIN-49)
  const checklistNotes = dispute.checklist_notes ?? {};
  const checklistItems = playbook?.evidence_checklist ?? [];
  const itemStatuses = checklistItems.map((item) => {
    const matchedFile = filesByKey.get(item.key);
    const stripeField = getStripeFieldResult(item, dispute);
    const autoFilled = stripeField?.status === 'positive';
    const hasMerchantNote = !!(checklistNotes[item.key]?.trim());
    const isNarrativeOnly = !!item.narrative_only;
    const satisfied = !!matchedFile || autoFilled || isNarrativeOnly;
    let statusLabel: string;
    if (matchedFile) {
      statusLabel = 'Uploaded';
    } else if (autoFilled) {
      statusLabel = 'From Stripe';
    } else if (isNarrativeOnly) {
      statusLabel = hasMerchantNote ? 'Notes added' : 'In narrative';
    } else {
      statusLabel = 'Not uploaded';
    }
    return {
      item,
      matchedFile,
      stripeField,
      autoFilled,
      isNarrativeOnly,
      hasMerchantNote,
      satisfied,
      statusLabel,
    };
  });
  const satisfiedCount = itemStatuses.filter((s) => s.satisfied).length;
  const totalItems = itemStatuses.length;
  const hasNoEvidence = satisfiedCount === 0;

  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'large' }}>
      {/* Coach header: introduces the narrative step */}
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
          Ready to write your narrative
        </Inline>
        <Inline css={{ font: 'body', color: 'secondary' }}>
          WinBack will use your uploaded evidence and the details Stripe has
          on this transaction to draft a response tailored to this dispute.
          Review what the AI will work with below, then generate your draft.
        </Inline>
      </Box>

      {/* Evidence summary card */}
      {playbook ? (
        <Box
          css={{
            stack: 'y',
            gap: 'medium',
            backgroundColor: 'container',
            padding: 'medium',
            borderRadius: 'medium',
          }}
        >
          <Box css={{ stack: 'x', distribute: 'space-between', alignY: 'center' }}>
            <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
              Evidence summary
            </Inline>
            <Inline css={{ font: 'caption', color: 'secondary' }}>
              {satisfiedCount} of {totalItems} covered
            </Inline>
          </Box>

          {hasNoEvidence && (
            <Banner
              type="caution"
              title="No evidence available"
              description="The AI can still generate a narrative, but your chances of winning are much lower without supporting evidence."
            />
          )}

          <Box css={{ stack: 'y', gap: 0 }}>
            {itemStatuses.map(({ item, satisfied }, index) => {
              const isFirst = index === 0;
              return (
                <Box key={item.key} css={{ stack: 'y', gap: 0 }}>
                  {!isFirst && <Divider />}
                  <Box
                    css={{
                      stack: 'x',
                      gap: 'small',
                      alignY: 'center',
                      distribute: 'space-between',
                      paddingY: 'small',
                    }}
                  >
                    <Box
                      css={{
                        stack: 'x',
                        gap: 'small',
                        alignY: 'center',
                        width: '3/4',
                      }}
                    >
                      <Inline
                        css={{
                          font: 'body',
                          color: satisfied ? 'success' : 'disabled',
                        }}
                      >
                        {satisfied ? '\u2713' : '\u25CB'}
                      </Inline>
                      <Inline
                        css={{
                          font: 'caption',
                          color: satisfied ? 'primary' : 'secondary',
                        }}
                      >
                        {item.item}
                      </Inline>
                    </Box>
                    <Inline
                      css={{
                        font: 'caption',
                        fontWeight: 'semibold',
                        color: satisfied ? 'success' : 'disabled',
                      }}
                    >
                      {itemStatuses[index].statusLabel}
                    </Inline>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Link onPress={onNavigateBack}>
            <Inline css={{ font: 'caption', color: 'info' }}>
              {'\u2190 Go back to add more evidence'}
            </Inline>
          </Link>
        </Box>
      ) : (
        <Banner
          type="caution"
          title="Playbook not available"
          description="No playbook was found for this dispute type. The AI will generate a general narrative based on the dispute details."
        />
      )}

      {/* Merchant feedback card */}
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
          Anything else the AI should know?
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          Optional. Add any context the evidence files don't already capture.
        </Inline>
        <TextArea
          label=""
          placeholder="e.g. Customer confirmed receipt by phone on March 20th"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
        />
      </Box>

      {/* Generate button or limit banner */}
      {limitReached ? (
        <Banner
          type="caution"
          title="Generation limit reached"
          description={`You have used all ${MAX_GENERATIONS} narrative generations for this dispute. Review and edit the existing narrative, or use it as-is for your submission.`}
        />
      ) : (
        <Box css={{ stack: 'x', gap: 'medium', alignY: 'center', distribute: 'space-between' }}>
          <Button
            type="primary"
            onPress={() => onGenerate(feedback)}
          >
            Generate Narrative
          </Button>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {remaining} of {MAX_GENERATIONS} generation{remaining === 1 ? '' : 's'} remaining
          </Inline>
        </Box>
      )}
    </Box>
  );
};

export default NarrativePreGeneration;
