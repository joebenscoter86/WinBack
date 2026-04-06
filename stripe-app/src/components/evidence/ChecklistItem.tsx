import { Box, Checkbox, Badge, Inline, Link, Icon, TextArea } from '@stripe/ui-extension-sdk/ui';
import type { EvidenceChecklistItem } from '../../lib/types';

interface ChecklistItemProps {
  item: EvidenceChecklistItem;
  checked: boolean;
  autoPopulated: boolean;
  expanded: boolean;
  notes: string;
  onToggle: () => void;
  onExpandToggle: () => void;
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

const ChecklistItem = ({
  item,
  checked,
  autoPopulated,
  expanded,
  notes,
  onToggle,
  onExpandToggle,
  onNotesChange,
}: ChecklistItemProps) => {
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
          <Link onPress={onExpandToggle}>
            <Box css={{ stack: 'x', gap: 'xxsmall', alignY: 'center' }}>
              <Inline css={{ font: 'caption', color: 'info' }}>
                {expanded ? 'Hide details' : 'Why this matters'}
              </Inline>
              <Icon name={expanded ? 'chevronUp' : 'chevronDown'} size="xsmall" />
            </Box>
          </Link>
        </Box>
      </Box>
      {expanded && (
        <Box css={{ marginLeft: 'xlarge', stack: 'y', gap: 'small' }}>
          <Box css={{ padding: 'small', borderRadius: 'small' }}>
            <Inline css={{ font: 'caption', color: 'secondary' }}>
              {item.why_matters}
            </Inline>
          </Box>
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
