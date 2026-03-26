import { useState, useEffect, useCallback } from 'react';
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
import EmptyState from '../components/EmptyState';
import ErrorBanner from '../components/ErrorBanner';
import { fetchBackend, ApiError } from '../lib/apiClient';
import { isResolved } from '../lib/utils';
import type { Dispute } from '../lib/types';

type ViewState = 'loading' | 'error' | 'ready';
type StatusFilter = 'all' | 'needs_response' | 'under_review' | 'resolved';

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All disputes' },
  { value: 'needs_response', label: 'Needs response' },
  { value: 'under_review', label: 'Under review' },
  { value: 'resolved', label: 'Resolved' },
];

function matchesFilter(dispute: Dispute, filter: StatusFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'needs_response':
      return dispute.status === 'needs_response' || dispute.status === 'warning_needs_response';
    case 'under_review':
      return dispute.status === 'under_review' || dispute.status === 'warning_under_review';
    case 'resolved':
      return isResolved(dispute.status);
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
    default:
      return `${count} ${noun}`;
  }
}

const DisputeListView = ({ environment, userContext }: ExtensionContextValue) => {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const loadDisputes = useCallback(async () => {
    setViewState('loading');
    try {
      const result = await fetchBackend<{ data: Dispute[] }>('/api/disputes', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      setDisputes(result.data);
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

  const handleSelectDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setShowWorkflow(true);
  };

  const handleCloseWorkflow = (shown: boolean) => {
    setShowWorkflow(shown);
    if (!shown) setSelectedDisputeId(null);
  };

  // Sort by deadline (soonest first)
  const sortedDisputes = [...disputes].sort(
    (a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime(),
  );

  const filteredDisputes = sortedDisputes.filter((d) => matchesFilter(d, statusFilter));

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
                {disputes.length === 0 ? (
                  <EmptyState
                    title="No disputes yet"
                    description="When a dispute comes in, we'll walk you through exactly what to do."
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
                          onSelect={handleSelectDispute}
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

      {selectedDisputeId && (
        <DisputeWorkflow
          disputeId={selectedDisputeId}
          shown={showWorkflow}
          setShown={handleCloseWorkflow}
        />
      )}
    </ContextView>
  );
};

export default DisputeListView;
