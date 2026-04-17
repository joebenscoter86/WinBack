import { useState } from 'react';
import { Box, Button, Checkbox, Badge, Inline, Link, Icon, TextArea } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { EvidenceChecklistItem, EvidenceFile } from '../../lib/types';
import type { StripeFieldResult } from './EvidenceChecklist';
import FileUploadSection from './FileUploadSection';

export type ExpandedSection = 'why' | 'where' | 'notes' | 'file';

interface ChecklistItemProps {
  item: EvidenceChecklistItem;
  checked: boolean;
  stripeFieldResult?: StripeFieldResult;
  expandedSections: Set<ExpandedSection>;
  notes: string;
  existingFile: EvidenceFile | null;
  disputeId: string;
  context: ExtensionContextValue;
  onToggle: () => void;
  onSectionToggle: (section: ExpandedSection) => void;
  onNotesChange: (value: string) => void;
  onSaveNotes?: () => void;
  onFileChange: (file: EvidenceFile | null) => void;
  submitted?: boolean;
}

function getCategoryBadge(category: EvidenceChecklistItem['category']) {
  switch (category) {
    case 'mandatory':
      return <Badge type="negative">REQUIRED</Badge>;
    case 'recommended':
      return <Badge type="warning">HELPFUL</Badge>;
    case 'situational':
      return <Badge type="neutral">IF APPLICABLE</Badge>;
  }
}

function getStripeStatusBadge(result: StripeFieldResult) {
  switch (result.status) {
    case 'positive':
      return <Badge type="info">FROM STRIPE</Badge>;
    case 'unavailable':
      return <Badge type="neutral">NOT AVAILABLE</Badge>;
    case 'negative':
      return <Badge type="warning">HEADS UP</Badge>;
  }
}

interface SectionToggleProps {
  label: string;
  expanded: boolean;
  onPress: () => void;
}

const SectionToggle = ({ label, expanded, onPress }: SectionToggleProps) => (
  <Link onPress={onPress}>
    <Box css={{ stack: 'x', gap: 'xxsmall', alignY: 'center' }}>
      <Inline css={{ font: 'caption', color: 'info' }}>
        {label}
      </Inline>
      <Icon name={expanded ? 'chevronUp' : 'chevronDown'} size="xsmall" />
    </Box>
  </Link>
);

const ChecklistItem = ({
  item,
  checked,
  stripeFieldResult,
  expandedSections,
  notes,
  existingFile,
  disputeId,
  context,
  onToggle,
  onSectionToggle,
  onNotesChange,
  onSaveNotes,
  onFileChange,
  submitted,
}: ChecklistItemProps) => {
  const whyExpanded = expandedSections.has('why');
  const whereExpanded = expandedSections.has('where');
  const notesExpanded = expandedSections.has('notes');
  const fileExpanded = expandedSections.has('file');

  // Flash a "Saved" confirmation for 2s after the merchant explicitly clicks
  // Save, so they have visual confirmation the content persisted. (WIN-49)
  const [justSaved, setJustSaved] = useState(false);
  const handleSaveClick = () => {
    if (onSaveNotes) onSaveNotes();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const isUnavailable = stripeFieldResult?.status === 'unavailable';
  const isNegative = stripeFieldResult?.status === 'negative';
  const isPositive = stripeFieldResult?.status === 'positive';

  return (
    <Box css={{
      stack: 'y',
      gap: 'small',
      padding: 'small',
      borderRadius: 'medium',
      backgroundColor: 'container',
    }}>
      <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
        <Checkbox
          label=""
          checked={checked}
          onChange={onToggle}
          disabled={isUnavailable || isPositive || submitted}
          aria-label={item.item}
        />
        <Box css={{ stack: 'y', gap: 'xxsmall', width: 'fill' }}>
          <Box css={{ stack: 'x', gap: 'xsmall', alignY: 'center', wrap: 'wrap' }}>
            <Inline css={{
              font: 'body',
              fontWeight: 'semibold',
              color: isUnavailable ? 'disabled' : checked ? 'secondary' : undefined,
            }}>
              {item.item}
            </Inline>
            {stripeFieldResult && getStripeStatusBadge(stripeFieldResult)}
            {getCategoryBadge(item.category)}
          </Box>
          {stripeFieldResult && (
            <Inline css={{
              font: 'caption',
              color: isNegative ? 'attention' : 'secondary',
            }}>
              {stripeFieldResult.value}
            </Inline>
          )}
          <Box css={{ stack: 'x', gap: 'small', wrap: 'wrap' }}>
            <SectionToggle
              label="Why this matters"
              expanded={whyExpanded}
              onPress={() => onSectionToggle('why')}
            />
            {(item.where_to_find || stripeFieldResult) && (
              <SectionToggle
                label={stripeFieldResult ? 'Details' : 'Where to find this'}
                expanded={whereExpanded}
                onPress={() => onSectionToggle('where')}
              />
            )}
            {item.narrative_only && !submitted ? (
              <SectionToggle
                label={notes ? 'Your notes' : 'Add detail'}
                expanded={notesExpanded}
                onPress={() => onSectionToggle('notes')}
              />
            ) : !isUnavailable && !isPositive && !submitted ? (
              <>
                <SectionToggle
                  label={notes ? 'Your notes' : 'Add notes'}
                  expanded={notesExpanded}
                  onPress={() => onSectionToggle('notes')}
                />
                <SectionToggle
                  label={existingFile ? existingFile.file_name : 'Attach file'}
                  expanded={fileExpanded}
                  onPress={() => onSectionToggle('file')}
                />
              </>
            ) : null}
            {submitted && existingFile && (
              <SectionToggle
                label={existingFile.file_name}
                expanded={fileExpanded}
                onPress={() => onSectionToggle('file')}
              />
            )}
          </Box>
        </Box>
      </Box>

      {whyExpanded && (
        <Box css={{ marginLeft: 'xlarge', padding: 'small', borderRadius: 'small' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {item.why_matters}
          </Inline>
        </Box>
      )}

      {whereExpanded && (item.where_to_find || stripeFieldResult) && (
        <Box css={{ marginLeft: 'xlarge', padding: 'small', borderRadius: 'small' }}>
          <Inline css={{ font: 'caption', color: isNegative ? 'attention' : 'secondary' }}>
            {stripeFieldResult
              ? stripeFieldResult.guidance
              : item.where_to_find}
          </Inline>
        </Box>
      )}

      {notesExpanded && !isUnavailable && !submitted && (
        <Box css={{ marginLeft: 'xlarge', stack: 'y', gap: 'xsmall' }}>
          <TextArea
            label={item.narrative_only ? 'Add detail (optional)' : 'Your notes'}
            placeholder={
              item.narrative_only
                ? 'In your own words, what should the narrative say about this?'
                : 'e.g. tracking #, file name, where to find this...'
            }
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={2}
          />
          <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
            {onSaveNotes && (
              <Button type="secondary" size="small" onPress={handleSaveClick}>
                Save
              </Button>
            )}
            {justSaved && (
              <Inline css={{ font: 'caption', color: 'success' }}>
                Saved
              </Inline>
            )}
          </Box>
          {item.narrative_only && (
            <Inline css={{ font: 'caption', color: 'secondary' }}>
              Optional. Add detail to strengthen this point. If left blank, your narrative will note this generally.
            </Inline>
          )}
        </Box>
      )}

      {fileExpanded && !isUnavailable && !item.narrative_only && (
        <Box css={{ marginLeft: 'xlarge' }}>
          <FileUploadSection
            disputeId={disputeId}
            checklistItemKey={item.key}
            existingFile={existingFile}
            context={context}
            onFileChange={onFileChange}
            submitted={submitted}
          />
        </Box>
      )}
    </Box>
  );
};

export default ChecklistItem;
