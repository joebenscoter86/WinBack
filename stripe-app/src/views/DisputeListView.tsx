import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  ContextView,
  Inline,
  Select,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Banner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import DisputeCard from '../components/DisputeCard';
import DisputeWorkflow from '../components/DisputeWorkflow';
import EmptyDisputesState from '../components/EmptyDisputesState';
import ErrorBanner from '../components/ErrorBanner';
import UpgradePromptBanner from '../components/UpgradePromptBanner';
import { fetchBackend, ApiError } from '../lib/apiClient';
import { isResolved, isDisputeExpired } from '../lib/utils';
import type { Dispute } from '../lib/types';

type ViewState = 'loading' | 'error' | 'ready';
type StatusFilter = 'all' | 'needs_response' | 'under_review' | 'resolved' | 'expired';

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All disputes' },
  { value: 'needs_response', label: 'Needs response' },
  { value: 'under_review', label: 'Under review' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'expired', label: 'Expired' },
];

function matchesFilter(dispute: Dispute, filter: StatusFilter): boolean {
  const expired = isDisputeExpired(dispute.due_by, dispute.status);
  switch (filter) {
    case 'all':
      return true;
    case 'needs_response':
      // Exclude expired disputes -- they are not actionable even though
      // Stripe still reports status=needs_response (WIN-48).
      return (
        (dispute.status === 'needs_response' || dispute.status === 'warning_needs_response') &&
        !expired
      );
    case 'under_review':
      return dispute.status === 'under_review' || dispute.status === 'warning_under_review';
    case 'resolved':
      return isResolved(dispute.status);
    case 'expired':
      return expired;
    default:
      return true;
  }
}

function getCountText(count: number, filter: StatusFilter): string {
  const noun = count === 1 ? 'dispute' : 'disputes';
  switch (filter) {
    case 'all':
      return `${count} ${noun}`;
    case 'needs_response':
      return `${count} needing response`;
    case 'under_review':
      return `${count} under review`;
    case 'resolved':
      return `${count} resolved`;
    case 'expired':
      return `${count} expired`;
    default:
      return `${count} ${noun}`;
  }
}

const DisputeListView = (context: ExtensionContextValue) => {
  const { environment, userContext } = context;
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('needs_response');
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(true);

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  // Ref to avoid context reference identity changes triggering re-fetches
  const contextRef = useRef(context);
  contextRef.current = context;

  const loadDisputes = useCallback(async () => {
    setViewState('loading');
    try {
      const [disputesResult, onboardingResult] = await Promise.all([
        fetchBackend<{ data: Dispute[] }>('/api/disputes', contextRef.current),
        fetchBackend<{ completed: boolean; completed_at: string | null }>(
          '/api/merchant/onboarding',
          contextRef.current,
        ),
      ]);
      setDisputes(disputesResult.data);
      setOnboardingCompleted(onboardingResult.completed);
      setViewState('ready');
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to load disputes. Please try again.';
      setErrorMessage(message);
      setViewState('error');
    }
  }, []);

  useEffect(() => {
    loadDisputes();
  }, [loadDisputes]);

  const handleSelectDispute = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setShowWorkflow(true);
  };

  const handleCloseWorkflow = (shown: boolean) => {
    setShowWorkflow(shown);
    if (!shown) setSelectedDispute(null);
  };

  // Sort by deadline (soonest first), but push expired disputes to the
  // bottom regardless of how overdue they are -- they're no longer actionable
  // so they shouldn't jump to the top of the list just because they're the
  // "most overdue" (WIN-48).
  const sortedDisputes = [...disputes].sort((a, b) => {
    const aExpired = isDisputeExpired(a.due_by, a.status);
    const bExpired = isDisputeExpired(b.due_by, b.status);
    if (aExpired !== bExpired) return aExpired ? 1 : -1;
    return new Date(a.due_by).getTime() - new Date(b.due_by).getTime();
  });

  const filteredDisputes = sortedDisputes.filter((d) => matchesFilter(d, statusFilter));

  const handleDismissOnboarding = async () => {
    // Optimistic: hide the panel immediately. If the backend call fails we
    // will rehydrate on next mount, which is fine; worst case the merchant
    // sees it once more.
    setOnboardingCompleted(true);
    try {
      await fetchBackend('/api/merchant/onboarding/update', contextRef.current, {
        completed: true,
      });
    } catch {
      // Swallow: the next load will correct state.
    }
  };

  return (
    <ContextView title="WinBack" description="Guided dispute resolution">
      {viewState === 'loading' && (
        <Box
          css={{
            padding: 'xlarge',
            alignX: 'center',
            alignY: 'center',
          }}
        >
          <Spinner size="large" />
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Loading disputes...
          </Inline>
        </Box>
      )}

      {viewState === 'error' && (
        <ErrorBanner message={errorMessage} />
      )}

      {viewState === 'ready' && (
        <Tabs fitted size="medium">
          <TabList>
            <Tab id="disputes">Disputes</Tab>
            <Tab id="insights">Insights</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="disputes">
              <Box css={{ padding: 'small', stack: 'y', gap: 'small' }}>
                <UpgradePromptBanner context={contextRef.current} />
                {disputes.length === 0 ? (
                  <EmptyDisputesState
                    onboardingCompleted={onboardingCompleted}
                    onDismissOnboarding={handleDismissOnboarding}
                  />
                ) : (
                  <>
                    <Select
                      label="Filter"
                      hiddenElements={['label']}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    >
                      {FILTER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Select>

                    <Box css={{ paddingTop: 'small', paddingBottom: 'small' }}>
                      <Inline css={{ font: 'caption', color: 'secondary' }}>
                        {getCountText(filteredDisputes.length, statusFilter)}
                      </Inline>
                    </Box>

                    {filteredDisputes.length === 0 ? (
                      <Box css={{ padding: 'medium', alignX: 'center' }}>
                        <Inline css={{ font: 'caption', color: 'secondary' }}>
                          No {FILTER_OPTIONS.find((o) => o.value === statusFilter)?.label.toLowerCase()} disputes.
                        </Inline>
                      </Box>
                    ) : (
                      filteredDisputes.map((dispute) => (
                        <DisputeCard
                          key={dispute.id}
                          dispute={dispute}
                          onSelect={() => handleSelectDispute(dispute)}
                        />
                      ))
                    )}
                  </>
                )}
              </Box>
            </TabPanel>
            <TabPanel id="insights">
              <Box css={{ padding: 'medium' }}>
                <Banner
                  type="default"
                  title="Insights"
                  description="Win rate analytics and dispute patterns will appear here."
                />
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Coming in WIN-22 and WIN-23.
                </Inline>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {selectedDispute && (
        <DisputeWorkflow
          dispute={selectedDispute}
          context={context}
          shown={showWorkflow}
          setShown={handleCloseWorkflow}
        />
      )}
    </ContextView>
  );
};

export default DisputeListView;
