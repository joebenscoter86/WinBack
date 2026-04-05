import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Banner,
  FocusView,
  Inline,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import type { WizardStep, Dispute, PlaybookData } from '../lib/types';
import { WIZARD_STEPS, WIZARD_STEP_LABELS } from '../lib/types';
import { fetchBackend, ApiError } from '../lib/apiClient';
import { getDaysRemaining, isResolved } from '../lib/utils';
import ErrorBanner from './ErrorBanner';
import DisputeOverview from './review/DisputeOverview';
import ReasonCodeBreakdown from './review/ReasonCodeBreakdown';
import GamePlan from './review/GamePlan';
import UrgencyBanner from './review/UrgencyBanner';

interface DisputeWorkflowProps {
  dispute: Dispute;
  context: ExtensionContextValue;
  shown: boolean;
  setShown: (shown: boolean) => void;
}

const DisputeWorkflow = ({ dispute: initialDispute, context, shown, setShown }: DisputeWorkflowProps) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('review');
  const [dispute, setDispute] = useState<Dispute>(initialDispute);
  const [playbook, setPlaybook] = useState<PlaybookData | null>(null);
  const [loading, setLoading] = useState<{ dispute: boolean; playbook: boolean }>({
    dispute: false,
    playbook: false,
  });
  const [errors, setErrors] = useState<{ dispute: string | null; playbook: string | null }>({
    dispute: null,
    playbook: null,
  });

  useEffect(() => {
    if (!shown) return;

    const fetchData = async () => {
      setLoading({ dispute: true, playbook: true });
      setErrors({ dispute: null, playbook: null });

      // Fetch enriched dispute and playbook in parallel
      const [disputeResult, playbookResult] = await Promise.allSettled([
        fetchBackend<{ data: Dispute }>(`/api/disputes/${initialDispute.id}`, context),
        fetchBackend<{ data: PlaybookData }>('/api/playbooks', context, {
          network: initialDispute.network,
          reason_code: initialDispute.reason_code,
        }),
      ]);

      if (disputeResult.status === 'fulfilled') {
        setDispute(disputeResult.value.data);
      } else {
        const err = disputeResult.reason;
        setErrors((prev) => ({
          ...prev,
          dispute: err instanceof ApiError ? err.message : 'Failed to load dispute details.',
        }));
      }
      setLoading((prev) => ({ ...prev, dispute: false }));

      if (playbookResult.status === 'fulfilled') {
        setPlaybook(playbookResult.value.data);
      } else {
        const err = playbookResult.reason;
        // 404 is not an error -- just means no playbook for this reason code
        if (!(err instanceof ApiError && err.status === 404)) {
          setErrors((prev) => ({
            ...prev,
            playbook: err instanceof ApiError ? err.message : 'Failed to load playbook.',
          }));
        }
        setPlaybook(null);
      }
      setLoading((prev) => ({ ...prev, playbook: false }));
    };

    fetchData();
  }, [shown, initialDispute.id, initialDispute.network, initialDispute.reason_code, context]);

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

  const daysRemaining = getDaysRemaining(dispute.due_by);
  const isUrgent = daysRemaining < 5 && !isResolved(dispute.status);

  const renderReviewTab = () => {
    const isLoadingPlaybook = loading.playbook;

    return (
      <Box css={{ padding: 'medium', stack: 'y', gap: 'medium' }}>
        {isUrgent && playbook && <UrgencyBanner daysRemaining={daysRemaining} essentials={playbook.urgency_essentials} />}

        {errors.dispute && <ErrorBanner message={errors.dispute} />}

        <DisputeOverview dispute={dispute} loading={loading.dispute} />

        {isLoadingPlaybook ? (
          <Box css={{ alignX: 'center', padding: 'medium' }}>
            <Spinner size="medium" />
            <Inline css={{ font: 'caption', color: 'secondary' }}>Loading playbook...</Inline>
          </Box>
        ) : errors.playbook ? (
          <ErrorBanner message={errors.playbook} />
        ) : playbook ? (
          <>
            <ReasonCodeBreakdown playbook={playbook} defaultExpanded={!isUrgent} />
            <GamePlan playbook={playbook} />
          </>
        ) : (
          <Banner
            type="default"
            title="No playbook available"
            description="We don't have a specific playbook for this reason code yet. Use the general evidence guidelines to build your response."
          />
        )}
      </Box>
    );
  };

  return (
    <FocusView
      title={`Dispute ${initialDispute.id.slice(0, 12)}...`}
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
              {renderReviewTab()}
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
