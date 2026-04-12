import { useState, useEffect, useRef } from 'react';
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
import type { WizardStep, Dispute, PlaybookData, EvidenceFile } from '../lib/types';
import { WIZARD_STEPS, WIZARD_STEP_LABELS } from '../lib/types';
import { fetchBackend, ApiError } from '../lib/apiClient';
import { getDaysRemaining, isResolved } from '../lib/utils';
import ErrorBanner from './ErrorBanner';
import DeadlineTimer from './DeadlineTimer';
import DisputeOverview from './review/DisputeOverview';
import CoachHeader from './review/CoachHeader';
import QuickActions from './review/QuickActions';
import LearnMore from './review/LearnMore';
import EvidenceChecklist from './evidence/EvidenceChecklist';
import NarrativePanel from './narrative/NarrativePanel';
import SubmitView from './submit/SubmitView';
import SubmissionConfirmation from './submit/SubmissionConfirmation';

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
  const [editedNarrative, setEditedNarrative] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);

  // Ref to avoid context reference identity changes triggering re-fetches
  const contextRef = useRef(context);
  contextRef.current = context;

  useEffect(() => {
    if (!shown) return;

    const fetchData = async () => {
      setLoading({ dispute: true, playbook: true });
      setErrors({ dispute: null, playbook: null });

      // Fetch enriched dispute and playbook in parallel
      // Skip playbook fetch if reason_code is empty (test disputes, unknown codes)
      const shouldFetchPlaybook = !!initialDispute.reason_code;
      const [disputeResult, playbookResult] = await Promise.allSettled([
        fetchBackend<{ data: Dispute }>(`/api/disputes/${initialDispute.id}`, contextRef.current),
        shouldFetchPlaybook
          ? fetchBackend<{ data: PlaybookData }>('/api/playbooks', contextRef.current, {
              network: initialDispute.network,
              reason_code: initialDispute.reason_code,
            })
          : Promise.reject(new ApiError('No reason code', 404)),
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

      // Fetch evidence files for narrative tab
      try {
        const filesResult = await fetchBackend<{ data: EvidenceFile[] }>(
          `/api/disputes/${initialDispute.id}/evidence-files`,
          contextRef.current,
        );
        setEvidenceFiles(filesResult.data);
      } catch (err) {
        console.error('Failed to fetch evidence files:', err);
        setEvidenceFiles([]);
      }
    };

    fetchData();
  }, [shown, initialDispute.id, initialDispute.network, initialDispute.reason_code]);

  // Re-fetch evidence files whenever the user enters the narrative step.
  // The Evidence tab owns its own upload state, so DisputeWorkflow's copy
  // goes stale as soon as the merchant uploads a file. Refreshing on tab
  // entry keeps the narrative pre-generation view in sync without lifting
  // upload state across the whole workflow.
  useEffect(() => {
    if (currentStep !== 'narrative') return;
    fetchBackend<{ data: EvidenceFile[] }>(
      `/api/disputes/${initialDispute.id}/evidence-files`,
      contextRef.current,
    )
      .then((result) => setEvidenceFiles(result.data))
      .catch((err) => console.error('Failed to refresh evidence files:', err));
  }, [currentStep, initialDispute.id]);

  const submitted = Boolean(dispute.evidence_submitted_at);

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
      <Box css={{ padding: 'medium', stack: 'y', gap: 'large' }}>
        {errors.dispute && <ErrorBanner message={errors.dispute} />}

        {isLoadingPlaybook ? (
          <Box css={{ alignX: 'center', padding: 'medium', stack: 'y', gap: 'small' }}>
            <Spinner size="medium" />
            <Inline css={{ font: 'caption', color: 'secondary' }}>Loading playbook...</Inline>
          </Box>
        ) : errors.playbook ? (
          <ErrorBanner message={errors.playbook} />
        ) : playbook ? (
          <>
            <CoachHeader
              headline={playbook.coach_headline}
              summary={playbook.coach_summary}
              urgencyMode={isUrgent}
              daysRemaining={daysRemaining}
            />
            <QuickActions playbook={playbook} urgencyMode={isUrgent} />
          </>
        ) : (
          <Banner
            type="default"
            title="No playbook available"
            description="We don't have a specific playbook for this reason code yet. Use the general evidence guidelines to build your response."
          />
        )}

        <DisputeOverview dispute={dispute} loading={loading.dispute} />

        {playbook && (
          <LearnMore
            issuerSummary={playbook.coach_issuer_summary}
            acquirerSummary={playbook.coach_acquirer_summary}
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
      <Box css={{ stack: 'y' }}>
        <Box css={{ padding: 'medium', paddingBottom: 'small', stack: 'y', gap: 'small' }}>
          {submitted && (
            <Banner
              type="default"
              title="Evidence submitted"
              description="Your evidence has been submitted to Stripe. This dispute is now read-only."
            />
          )}
          <DeadlineTimer dueBy={dispute.due_by} status={dispute.status} />
        </Box>
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
              <EvidenceChecklist
                dispute={dispute}
                playbook={playbook}
                context={contextRef.current}
                isUrgent={isUrgent}
                daysRemaining={daysRemaining}
                submitted={submitted}
              />
            </TabPanel>
            <TabPanel id="narrative">
              <NarrativePanel
                dispute={dispute}
                playbook={playbook}
                evidenceFiles={evidenceFiles}
                context={contextRef.current}
                editedNarrative={editedNarrative}
                onEditedNarrativeChange={setEditedNarrative}
                onApprove={(text) => {
                  setEditedNarrative(text);
                  setCurrentStep('submit');
                }}
                onNavigateBack={() => setCurrentStep('evidence')}
                submitted={submitted}
              />
            </TabPanel>
            <TabPanel id="submit">
              {submitted && dispute.evidence_submitted_at ? (
                <SubmissionConfirmation
                  response={{
                    submission_id: '',
                    submitted_at: dispute.evidence_submitted_at,
                    dispute_status: 'evidence_submitted',
                    warnings: [],
                  }}
                />
              ) : playbook ? (
                <SubmitView
                  dispute={dispute}
                  playbook={playbook}
                  evidenceFiles={evidenceFiles}
                  narrativeText={editedNarrative}
                  context={contextRef.current}
                  onSubmitted={(response) => {
                    setDispute({
                      ...dispute,
                      evidence_submitted_at: response.submitted_at,
                    });
                  }}
                />
              ) : (
                <Box css={{ padding: 'medium', alignX: 'center' }}>
                  <Spinner size="medium" />
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </FocusView>
  );
};

export default DisputeWorkflow;
