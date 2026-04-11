import { useState } from 'react';
import { Box, Button, Banner, Inline, Link, TextArea } from '@stripe/ui-extension-sdk/ui';
import type { Dispute, PlaybookData, EvidenceFile } from '../../lib/types';
import { MAX_GENERATIONS } from '../../lib/narrative-types';

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

  return (
    <Box css={{ stack: 'y', gap: 'medium' }}>
      {/* Evidence summary section */}
      {playbook ? (
        <Box css={{ stack: 'y', gap: 'small' }}>
          <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
            Evidence summary
          </Inline>

          {evidenceFiles.length === 0 && (
            <Banner
              type="caution"
              title="No evidence uploaded"
              description="The AI will generate a narrative, but without supporting evidence your chances of winning are lower. Consider going back to upload files."
            />
          )}

          <Box css={{ stack: 'y', gap: 'xsmall' }}>
            {playbook.evidence_checklist.map((checklistItem) => {
              const key = checklistItem.item;
              const matchedFile = filesByKey.get(key);
              const isMandatoryMissing =
                checklistItem.required && !matchedFile;

              return (
                <Box
                  key={key}
                  css={{
                    stack: 'x',
                    gap: 'xsmall',
                    alignY: 'center',
                    padding: 'xsmall',
                  }}
                >
                  {matchedFile ? (
                    <Inline css={{ font: 'caption', color: 'success' }}>
                      {'\u2713'}
                    </Inline>
                  ) : (
                    <Inline
                      css={{
                        font: 'caption',
                        color: isMandatoryMissing ? 'attention' : 'secondary',
                      }}
                    >
                      {'\u2022'}
                    </Inline>
                  )}
                  <Inline
                    css={{
                      font: 'caption',
                      color: matchedFile
                        ? 'secondary'
                        : isMandatoryMissing
                        ? 'attention'
                        : 'secondary',
                    }}
                  >
                    {checklistItem.item}
                    {matchedFile
                      ? ` \u2014 ${matchedFile.file_name}`
                      : ' \u2014 not uploaded'}
                  </Inline>
                </Box>
              );
            })}
          </Box>

          <Link onPress={onNavigateBack}>
            <Inline css={{ font: 'caption', color: 'info' }}>
              {'\u2190'} Go back to add more evidence
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

      {/* Merchant feedback textarea */}
      <TextArea
        label="Anything else the AI should know? (optional)"
        placeholder="e.g. Customer confirmed receipt by phone on March 20th"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={3}
      />

      {/* Generate button or limit banner */}
      {limitReached ? (
        <Banner
          type="caution"
          title="Generation limit reached"
          description={`You have used all ${MAX_GENERATIONS} narrative generations for this dispute. Review and edit the existing narrative, or use it as-is for your submission.`}
        />
      ) : (
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
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
