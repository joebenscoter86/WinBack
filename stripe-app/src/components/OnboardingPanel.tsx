// stripe-app/src/components/OnboardingPanel.tsx
//
// WIN-25: First-run onboarding block shown at the top of the disputes tab
// for every new merchant, regardless of whether they currently have disputes.
// Coach tone, scannable visual rhythm via leading icons.

import { useState } from 'react';
import { Box, Button, Divider, Icon, Inline } from '@stripe/ui-extension-sdk/ui';

interface OnboardingPanelProps {
  onDismiss: () => Promise<void>;
}

type IconName = 'notifications' | 'clipboardCheck' | 'sparkle';

const STEPS: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'notifications',
    title: 'A new dispute arrives',
    description: "You'll see it here the moment it lands. No setup, no configs.",
  },
  {
    icon: 'clipboardCheck',
    title: 'We walk you through the evidence',
    description: 'A reason-code-specific checklist, tailored to that dispute. No guessing.',
  },
  {
    icon: 'sparkle',
    title: 'AI drafts your response',
    description: 'We tie your evidence into a clean narrative. You review, edit, submit.',
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
        backgroundColor: 'container',
        borderRadius: 'medium',
      }}
    >
      <Box css={{ stack: 'y', gap: 'xsmall' }}>
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          Welcome to WinBack
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          We'll handle disputes with you, step by step. Here's what to expect.
        </Inline>
      </Box>

      <Divider />

      {STEPS.map((step) => (
        <Box key={step.title} css={{ stack: 'x', gap: 'medium', alignY: 'top' }}>
          <Box css={{ paddingTop: 'xxsmall' }}>
            <Icon name={step.icon} size="small" css={{ fill: 'brand' }} />
          </Box>
          <Box css={{ stack: 'y', gap: 'xxsmall' }}>
            <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
              {step.title}
            </Inline>
            <Inline css={{ font: 'caption', color: 'secondary' }}>
              {step.description}
            </Inline>
          </Box>
        </Box>
      ))}

      <Box css={{ stack: 'x', alignX: 'end' }}>
        <Button type="secondary" onPress={handleDismiss} disabled={dismissing}>
          {dismissing ? 'Saving...' : "Got it, let's go"}
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingPanel;
