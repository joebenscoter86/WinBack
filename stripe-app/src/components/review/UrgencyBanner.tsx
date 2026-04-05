// stripe-app/src/components/review/UrgencyBanner.tsx

import { Banner, Box, Inline } from '@stripe/ui-extension-sdk/ui';

interface UrgencyBannerProps {
  daysRemaining: number;
  essentials: {
    summary: string;
    ordered_items: string[];
  };
}

const UrgencyBanner = ({ daysRemaining, essentials }: UrgencyBannerProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Banner
        type="caution"
        title={`${daysRemaining} day${daysRemaining === 1 ? '' : 's'} left to respond`}
        description="Focus on the essentials below to maximize your chances."
      />
      <Box css={{ stack: 'y', gap: 'small' }}>
        <Box>{essentials.summary}</Box>
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          {essentials.ordered_items.map((item, index) => (
            <Inline key={index} css={{ stack: 'x', gap: 'xsmall' }}>
              <Box>{index + 1}.</Box>
              <Box>{item}</Box>
            </Inline>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UrgencyBanner;
