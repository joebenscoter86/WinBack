// stripe-app/src/components/ErrorBanner.tsx

import { Banner, Box, Button } from '@stripe/ui-extension-sdk/ui';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => {
  return (
    <Box css={{ padding: 'medium' }}>
      <Banner
        type="critical"
        title="Something went wrong"
        description={message}
        actions={
          onRetry ? (
            <Button onPress={onRetry}>Retry</Button>
          ) : undefined
        }
      />
    </Box>
  );
};

export default ErrorBanner;
