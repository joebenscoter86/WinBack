import { Box, Checkbox, Badge, Inline, Link, Icon, TextArea } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { EvidenceChecklistItem, EvidenceFile } from '../../lib/types';
import FileUploadSection from './FileUploadSection';

export type ExpandedSection = 'why' | 'where' | 'notes' | 'file';

interface ChecklistItemProps {
  item: EvidenceChecklistItem;
  checked: boolean;
  autoPopulated: boolean;
  expandedSections: Set<ExpandedSection>;
  notes: string;
  existingFile: EvidenceFile | null;
  disputeId: string;
  context: ExtensionContextValue;
  onToggle: () => void;
  onSectionToggle: (section: ExpandedSection) => void;
  onNotesChange: (value: string) => void;
  onFileChange: (file: EvidenceFile | null) => void;
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
  autoPopulated,
  expandedSections,
  notes,
  existingFile,
  disputeId,
  context,
  onToggle,
  onSectionToggle,
  onNotesChange,
  onFileChange,
}: ChecklistItemProps) => {
  const whyExpanded = expandedSections.has('why');
  const whereExpanded = expandedSections.has('where');
  const notesExpanded = expandedSections.has('notes');
  const fileExpanded = expandedSections.has('file');

  return (
    <Box css={{ stack: 'y', gap: 'small', padding: 'small', borderRadius: 'medium', backgroundColor: 'container' }}>
      <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
        <Checkbox
          label=""
          checked={checked}
          onChange={onToggle}
          aria-label={item.item}
        />
        <Box css={{ stack: 'y', gap: 'xxsmall', width: 'fill' }}>
          <Box css={{ stack: 'x', gap: 'xsmall', alignY: 'center', wrap: 'wrap' }}>
            <Inline css={{ font: 'body', fontWeight: 'semibold', color: checked ? 'secondary' : undefined }}>
              {item.item}
            </Inline>
            {autoPopulated && <Badge type="info">FROM STRIPE</Badge>}
            {getCategoryBadge(item.category)}
          </Box>
          <Box css={{ stack: 'x', gap: 'small', wrap: 'wrap' }}>
            <SectionToggle
              label="Why this matters"
              expanded={whyExpanded}
              onPress={() => onSectionToggle('why')}
            />
            {item.where_to_find && (
              <SectionToggle
                label="Where to find this"
                expanded={whereExpanded}
                onPress={() => onSectionToggle('where')}
              />
            )}
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

      {whereExpanded && item.where_to_find && (
        <Box css={{ marginLeft: 'xlarge', padding: 'small', borderRadius: 'small' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {item.where_to_find}
          </Inline>
        </Box>
      )}

      {notesExpanded && (
        <Box css={{ marginLeft: 'xlarge' }}>
          <TextArea
            label="Your notes"
            placeholder="e.g. tracking #, file name, where to find this..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={2}
          />
        </Box>
      )}

      {fileExpanded && (
        <Box css={{ marginLeft: 'xlarge' }}>
          <FileUploadSection
            disputeId={disputeId}
            checklistItemKey={item.item}
            existingFile={existingFile}
            context={context}
            onFileChange={onFileChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default ChecklistItem;
