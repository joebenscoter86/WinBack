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
    <Box css={{ stack: 'y', gap: 'medium' }}>
      <Banner
        type="caution"
        title={`${daysRemaining} day${daysRemaining === 1 ? '' : 's'} left to respond`}
        description="Focus on the essentials below to maximize your chances."
      />
      <Box css={{ stack: 'y', gap: 'small' }}>
        <Inline css={{ font: 'body', color: 'secondary' }}>{essentials.summary}</Inline>
        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          {essentials.ordered_items.map((item, index) => (
            <Box
              key={index}
              css={{
                stack: 'x',
                gap: 'small',
                alignY: 'center',
                backgroundColor: 'surface',
                padding: 'small',
                borderRadius: 'small',
              }}
            >
              <Inline css={{ font: 'caption', fontWeight: 'bold', color: 'secondary' }}>
                {index + 1}.
              </Inline>
              <Inline css={{ font: 'body' }}>{item}</Inline>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UrgencyBanner;
