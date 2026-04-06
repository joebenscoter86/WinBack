import { Box, Checkbox, Badge, Inline, Link, Icon, TextArea } from '@stripe/ui-extension-sdk/ui';
import type { EvidenceChecklistItem } from '../../lib/types';

export type ExpandedSection = 'why' | 'where' | 'notes';

interface ChecklistItemProps {
  item: EvidenceChecklistItem;
  checked: boolean;
  autoPopulated: boolean;
  expandedSections: Set<ExpandedSection>;
  notes: string;
  onToggle: () => void;
  onSectionToggle: (section: ExpandedSection) => void;
  onNotesChange: (value: string) => void;
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
  onToggle,
  onSectionToggle,
  onNotesChange,
}: ChecklistItemProps) => {
  const whyExpanded = expandedSections.has('why');
  const whereExpanded = expandedSections.has('where');
  const notesExpanded = expandedSections.has('notes');

  return (
    <Box css={{ stack: 'y', gap: 'xsmall', padding: 'small', borderRadius: 'medium' }}>
      <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
        <Checkbox
          label=""
          checked={checked}
          onChange={onToggle}
          aria-label={item.item}
        />
        <Box css={{ stack: 'y', gap: 'xxsmall', width: 'fill' }}>
          <Box css={{ stack: 'x', gap: 'xsmall', alignY: 'center', wrap: 'wrap' }}>
            <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
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
    </Box>
  );
};

export default ChecklistItem;
