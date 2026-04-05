import { Box, Checkbox, Badge, Inline, Link, Icon } from '@stripe/ui-extension-sdk/ui';
import type { EvidenceChecklistItem } from '../../lib/types';

interface ChecklistItemProps {
  item: EvidenceChecklistItem;
  checked: boolean;
  autoPopulated: boolean;
  expanded: boolean;
  onToggle: () => void;
  onExpandToggle: () => void;
}

function getCategoryBadge(category: EvidenceChecklistItem['category']) {
  switch (category) {
    case 'mandatory':
      return <Badge type="critical">REQUIRED</Badge>;
    case 'recommended':
      return <Badge type="warning">HELPFUL</Badge>;
    case 'situational':
      return <Badge type="default">IF APPLICABLE</Badge>;
  }
}

const ChecklistItem = ({
  item,
  checked,
  autoPopulated,
  expanded,
  onToggle,
  onExpandToggle,
}: ChecklistItemProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'xsmall', padding: 'small', background: 'surface', borderRadius: 'medium' }}>
      <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
        <Checkbox
          label=""
          checked={checked}
          onChange={onToggle}
          aria-label={item.item}
        />
        <Box css={{ stack: 'y', gap: 'xxsmall', width: 'fill' }}>
          <Box css={{ stack: 'x', gap: 'xsmall', alignY: 'center', wrap: 'wrap' }}>
            <Inline css={{ font: 'body', fontWeight: 'medium' }}>
              {item.item}
            </Inline>
            {autoPopulated && <Badge type="info">FROM STRIPE</Badge>}
            {getCategoryBadge(item.category)}
          </Box>
          <Link onPress={onExpandToggle}>
            <Box css={{ stack: 'x', gap: 'xxsmall', alignY: 'center' }}>
              <Inline css={{ font: 'caption', color: 'info' }}>
                Why this matters
              </Inline>
              <Icon name={expanded ? 'chevronUp' : 'chevronDown'} size="xsmall" />
            </Box>
          </Link>
        </Box>
      </Box>
      {expanded && (
        <Box css={{ marginLeft: 'xlarge', padding: 'small', background: 'container', borderRadius: 'small' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {item.why_matters}
          </Inline>
        </Box>
      )}
    </Box>
  );
};

export default ChecklistItem;
