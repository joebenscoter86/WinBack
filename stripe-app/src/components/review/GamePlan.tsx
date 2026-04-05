import { Box, Icon, Inline } from '@stripe/ui-extension-sdk/ui';
import type { PlaybookData } from '../../lib/types';

interface GamePlanProps {
  playbook: PlaybookData;
}

const GamePlan = ({ playbook }: GamePlanProps) => {
  const mandatoryCount = playbook.evidence_checklist.filter(
    (item) => item.category === 'mandatory'
  ).length;
  const recommendedCount = playbook.evidence_checklist.filter(
    (item) => item.category === 'recommended'
  ).length;

  return (
    <Box css={{ stack: 'y', gap: 'medium' }}>
      <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
        Game plan
      </Inline>

      <Inline css={{ font: 'body' }}>
        {mandatoryCount} mandatory, {recommendedCount} recommended evidence items
      </Inline>

      {playbook.pro_tips.length > 0 && (
        <Box css={{ stack: 'y', gap: 'small' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            Pro tips
          </Inline>
          {playbook.pro_tips.map((tip, index) => (
            <Box key={index} css={{ stack: 'x', gap: 'small', alignY: 'top' }}>
              <Icon name="info" size="small" />
              <Inline css={{ font: 'body' }}>{tip.tip}</Inline>
            </Box>
          ))}
        </Box>
      )}

      {playbook.common_mistakes.length > 0 && (
        <Box css={{ stack: 'y', gap: 'small' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            Common mistakes to avoid
          </Inline>
          {playbook.common_mistakes.map((mistake, index) => (
            <Box key={index} css={{ stack: 'x', gap: 'small', alignY: 'top' }}>
              <Icon name="warning" size="small" />
              <Box css={{ stack: 'y', gap: 'xxsmall' }}>
                <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
                  {mistake.mistake}
                </Inline>
                <Inline css={{ font: 'body', color: 'secondary' }}>
                  {mistake.explanation}
                </Inline>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default GamePlan;
