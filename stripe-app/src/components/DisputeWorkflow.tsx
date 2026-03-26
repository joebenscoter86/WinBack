import { useState } from 'react';
import {
  Box,
  Button,
  FocusView,
  Inline,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Banner,
} from '@stripe/ui-extension-sdk/ui';
import { WIZARD_STEPS, WIZARD_STEP_LABELS } from '../lib/types';
import type { WizardStep } from '../lib/types';

interface DisputeWorkflowProps {
  disputeId: string;
  shown: boolean;
  setShown: (shown: boolean) => void;
}

const DisputeWorkflow = ({ disputeId, shown, setShown }: DisputeWorkflowProps) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('review');

  const currentIndex = WIZARD_STEPS.indexOf(currentStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === WIZARD_STEPS.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(WIZARD_STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(WIZARD_STEPS[currentIndex - 1]);
    }
  };

  return (
    <FocusView
      title={`Dispute ${disputeId.slice(0, 12)}...`}
      shown={shown}
      setShown={setShown}
      confirmCloseMessages={{
        title: 'Leave dispute workflow?',
        description: 'Your progress on this step will not be saved.',
        cancelAction: 'Stay',
        exitAction: 'Leave',
      }}
      primaryAction={
        isLastStep ? (
          <Button type="primary" onPress={() => setShown(false)}>
            Submit (placeholder)
          </Button>
        ) : (
          <Button type="primary" onPress={handleNext}>
            Next: {WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex + 1]]}
          </Button>
        )
      }
      secondaryAction={
        isFirstStep ? (
          <Button onPress={() => setShown(false)}>Cancel</Button>
        ) : (
          <Button onPress={handleBack}>
            Back: {WIZARD_STEP_LABELS[WIZARD_STEPS[currentIndex - 1]]}
          </Button>
        )
      }
    >
      <Box css={{ padding: 'medium' }}>
        <Tabs
          fitted
          size="medium"
          selectedKey={currentStep}
          onSelectionChange={(key) => setCurrentStep(key as WizardStep)}
        >
          <TabList>
            {WIZARD_STEPS.map((step) => (
              <Tab key={step} id={step}>
                {WIZARD_STEP_LABELS[step]}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel id="review">
              <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
                <Banner
                  type="default"
                  title="Step 1: Review Dispute"
                  description="Review the dispute details and understand the reason code. Playbook guidance will appear here."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Dispute ID: {disputeId} — Detailed dispute info, reason code breakdown, and playbook recommendations will be populated by WIN-12 and WIN-13.
                </Inline>
              </Box>
            </TabPanel>
            <TabPanel id="evidence">
              <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
                <Banner
                  type="default"
                  title="Step 2: Gather Evidence"
                  description="Check off required evidence items and upload supporting files."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Evidence checklist and file upload will be built in WIN-14 and WIN-16.
                </Inline>
              </Box>
            </TabPanel>
            <TabPanel id="narrative">
              <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
                <Banner
                  type="default"
                  title="Step 3: AI Narrative"
                  description="Generate a compelling narrative based on your evidence. Review, edit, and approve before submission."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  AI narrative generation and editing will be built in WIN-18 and WIN-19.
                </Inline>
              </Box>
            </TabPanel>
            <TabPanel id="submit">
              <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
                <Banner
                  type="caution"
                  title="Step 4: Submit Evidence"
                  description="Review everything one final time. Submission to Stripe is irrevocable."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Final review and Stripe submission will be built in WIN-20.
                </Inline>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </FocusView>
  );
};

export default DisputeWorkflow;
