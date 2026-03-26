// stripe-app/src/components/EmptyState.tsx

import { Box, Icon, Inline } from '@stripe/ui-extension-sdk/ui';

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <Box
      css={{
        padding: 'xlarge',
        stack: 'y',
        gap: 'small',
        alignX: 'center',
        alignY: 'center',
      }}
    >
      <Icon name="info" size="large" />
      <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
        {title}
      </Inline>
      <Inline css={{ font: 'caption', color: 'secondary' }}>
        {description}
      </Inline>
    </Box>
  );
};

export default EmptyState;
