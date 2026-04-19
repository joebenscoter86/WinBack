// stripe-app/src/components/OnboardingPanel.tsx
//
// WIN-25: First-run onboarding block shown at the top of the disputes tab
// for every new merchant, regardless of whether they currently have disputes.
// Each section renders as its own tile so the eye lands on one idea at a
// time as the merchant scans down the panel.

import { useState } from 'react';
import { Box, Button, Icon, Inline } from '@stripe/ui-extension-sdk/ui';

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

const tileCss = {
  padding: 'large',
  backgroundColor: 'container',
  borderRadius: 'medium',
  stack: 'y',
  gap: 'small',
} as const;

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
    <Box css={{ stack: 'y', gap: 'small' }}>
      <Box css={tileCss}>
        <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
          Welcome to WinBack
        </Inline>
        <Inline css={{ font: 'caption', color: 'secondary' }}>
          We'll handle disputes with you, step by step. Here's what to expect.
        </Inline>
      </Box>

      {STEPS.map((step, idx) => (
        <Box key={step.title} css={tileCss}>
          <Box css={{ stack: 'x', gap: 'medium', alignY: 'center' }}>
            <Icon name={step.icon} size="small" css={{ fill: 'brand' }} />
            <Inline css={{ font: 'caption', color: 'secondary', fontWeight: 'semibold' }}>
              Step {idx + 1}
            </Inline>
          </Box>
          <Inline css={{ font: 'subheading', fontWeight: 'semibold' }}>
            {step.title}
          </Inline>
          <Inline css={{ font: 'body', color: 'secondary' }}>
            {step.description}
          </Inline>
        </Box>
      ))}

      <Box css={{ stack: 'x', alignX: 'end', paddingTop: 'small' }}>
        <Button type="primary" onPress={handleDismiss} disabled={dismissing}>
          {dismissing ? 'Saving...' : "Got it, let's go"}
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingPanel;
