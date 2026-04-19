// stripe-app/src/components/EmptyDisputesState.tsx
//
// WIN-25: Reassurance banner shown when the merchant has zero active disputes,
// plus a one-click way to reopen the onboarding guide without leaving the
// disputes view. Picture a merchant who installed the app a month ago and
// hasn't had a dispute since: they may want a refresher on why this app is
// even here without digging into Settings.

import { Banner, Box, Button, Inline } from '@stripe/ui-extension-sdk/ui';

interface EmptyDisputesStateProps {
  onboardingCompleted: boolean;
  onShowGuide: () => void;
}

const EmptyDisputesState = ({ onboardingCompleted, onShowGuide }: EmptyDisputesStateProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'small', padding: 'small' }}>
      <Banner
        type="default"
        title="You're all set"
        description="When a new dispute arrives, you'll see it here with an alert. No setup needed."
      />
      {onboardingCompleted && (
        <Box css={{ stack: 'x', gap: 'small', alignY: 'center', paddingTop: 'small' }}>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Need a refresher on how WinBack works?
          </Inline>
          <Button type="secondary" onPress={onShowGuide}>
            Show guide
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EmptyDisputesState;
