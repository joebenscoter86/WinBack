import { Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface CoachHeaderProps {
  headline: string;
  summary: string;
  urgencyMode: boolean;
  daysRemaining?: number;
}

const CoachHeader = ({ headline, summary, urgencyMode, daysRemaining }: CoachHeaderProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
        {headline}
      </Inline>
      <Inline css={{ font: 'body', color: 'secondary' }}>
        {urgencyMode && daysRemaining !== undefined
          ? `You have ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}. Focus on the essentials below.`
          : summary}
      </Inline>
    </Box>
  );
};

export default CoachHeader;
