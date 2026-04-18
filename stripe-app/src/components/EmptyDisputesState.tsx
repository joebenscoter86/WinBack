// stripe-app/src/components/EmptyDisputesState.tsx
//
// WIN-25: Zero-disputes view for the disputes tab. Composes:
//   - A persistent reassurance banner ("we'll alert you when disputes arrive")
//     that stays visible regardless of onboarding state.
//   - An optional OnboardingPanel, shown only when the merchant has not yet
//     dismissed the first-run guide.
//
// Distinct from src/components/EmptyState.tsx, which remains a generic
// one-liner used for things like "no disputes match this filter".

import { Banner, Box } from '@stripe/ui-extension-sdk/ui';
import OnboardingPanel from './OnboardingPanel';

interface EmptyDisputesStateProps {
  onboardingCompleted: boolean;
  onDismissOnboarding: () => Promise<void>;
}

const EmptyDisputesState = ({
  onboardingCompleted,
  onDismissOnboarding,
}: EmptyDisputesStateProps) => {
  return (
    <Box css={{ stack: 'y', gap: 'medium', padding: 'small' }}>
      <Banner
        type="default"
        title="You're all set"
        description="When a new dispute arrives, you'll see it here with an alert. No setup needed."
      />
      {!onboardingCompleted && (
        <OnboardingPanel onDismiss={onDismissOnboarding} />
      )}
    </Box>
  );
};

export default EmptyDisputesState;
