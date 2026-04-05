import { Box, Icon, Inline } from '@stripe/ui-extension-sdk/ui';
import type { PlaybookData } from '../../lib/types';

interface QuickActionsProps {
  playbook: PlaybookData;
  urgencyMode: boolean;
}

function deriveActions(playbook: PlaybookData): string[] {
  const actions: string[] = [];

  const mandatoryItems = playbook.evidence_checklist
    .filter((item) => item.category === 'mandatory' && item.context === 'all')
    .slice(0, 3);
  for (const item of mandatoryItems) {
    actions.push(`Confirm you have: ${item.item.toLowerCase()}`);
  }

  const topMistakes = playbook.common_mistakes.slice(0, 2);
  for (const mistake of topMistakes) {
    const reframed = mistake.mistake.startsWith('Not ')
      ? `Make sure you're ${mistake.mistake.slice(4).toLowerCase()}`
      : mistake.mistake.startsWith('Skipping ')
        ? `Make sure you're using ${mistake.mistake.slice(9).toLowerCase()}`
        : `Check: ${mistake.mistake.toLowerCase()}`;
    actions.push(reframed);
  }

  return actions.slice(0, 5);
}

const QuickActions = ({ playbook, urgencyMode }: QuickActionsProps) => {
  const items = urgencyMode
    ? playbook.urgency_essentials.ordered_items
    : deriveActions(playbook);

  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
        {urgencyMode ? 'Focus on these essentials' : 'Your next steps'}
      </Inline>
      {items.map((text, index) => (
        <Box key={index} css={{ stack: 'x', gap: 'small', alignY: 'top' }}>
          <Icon name="info" size="xsmall" />
          <Inline css={{ font: 'body' }}>{text}</Inline>
        </Box>
      ))}
    </Box>
  );
};

export default QuickActions;
