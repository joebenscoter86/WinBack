// stripe-app/src/components/EmptyDisputesState.tsx
//
// WIN-25: Reassurance banner shown when the merchant has zero active disputes.
// The onboarding panel is now rendered separately at the top of the disputes
// tab (for all new merchants, not just empty ones), so this component is
// just the "you're all set" reassurance.

import { Banner, Box } from '@stripe/ui-extension-sdk/ui';

const EmptyDisputesState = () => {
  return (
    <Box css={{ padding: 'small' }}>
      <Banner
        type="default"
        title="You're all set"
        description="When a new dispute arrives, you'll see it here with an alert. No setup needed."
      />
    </Box>
  );
};

export default EmptyDisputesState;
