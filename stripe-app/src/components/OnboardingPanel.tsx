// stripe-app/src/components/OnboardingPanel.tsx
//
// WIN-25: First-run onboarding block shown in the disputes tab when a merchant
// has zero disputes AND has not yet dismissed the guide. Explains what WinBack
// does, how it works, and what happens when a dispute arrives.

import { useState } from 'react';
import { Box, Button, Divider, Inline } from '@stripe/ui-extension-sdk/ui';

interface OnboardingPanelProps {
  onDismiss: () => Promise<void>;
}

const STEPS: { title: string; description: string }[] = [
  {
    title: '1. A new dispute arrives',
    description:
      'When a customer disputes a charge, it shows up here with an alert. No email rules or Slack integrations to configure.',
  },
  {
    title: '2. We walk you through the evidence',
    description:
      'WinBack gives you a reason-code-specific checklist of exactly what to gather: receipts, shipping records, customer communication, whatever fits that dispute type.',
  },
  {
    title: '3. AI drafts your response',
    description:
      'Once your evidence is in, we draft a narrative that ties it all together. You review, edit, and submit when ready.',
  },
];

const OnboardingPanel = ({ onDismiss }: OnboardingPanelProps) => {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = async () => {
    setDismissing(true);
    try {
      await onDismiss();
    } finally {
      setDismissing(false);
    }
  };

  return (
    <Box
      css={{
        padding: 'large',
        stack: 'y',
        gap: 'medium',
      }}
    >
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          How WinBack works
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          Guided dispute resolution for Stripe merchants.
        </Inline>
      </Box>

      <Divider />

      {STEPS.map((step) => (
        <Box key={step.title} css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            {step.title}
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            {step.description}
          </Inline>
        </Box>
      ))}

      <Box css={{ stack: 'x', alignX: 'end' }}>
        <Button
          type="secondary"
          onPress={handleDismiss}
          disabled={dismissing}
        >
          {dismissing ? 'Saving...' : 'Got it'}
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingPanel;
