import { useState } from 'react';
import {
  Box,
  ContextView,
  Inline,
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
import { MOCK_DISPUTES } from '../lib/mockData';
import type { Dispute } from '../lib/types';

type ViewState = 'loading' | 'error' | 'ready';

const DisputeListView = ({ environment, userContext }: ExtensionContextValue) => {
  // In WIN-10+, these will come from API calls instead of mock data
  const [viewState] = useState<ViewState>('ready');
  const [disputes] = useState<Dispute[]>(MOCK_DISPUTES);
  const [errorMessage] = useState('');

  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const handleSelectDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setShowWorkflow(true);
  };

  const handleCloseWorkflow = (shown: boolean) => {
    setShowWorkflow(shown);
    if (!shown) setSelectedDisputeId(null);
  };

  // Sort disputes by deadline (soonest first)
  const sortedDisputes = [...disputes].sort(
    (a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime(),
  );

  const activeDisputes = sortedDisputes.filter(
    (d) => d.status === 'needs_response' || d.status === 'warning_needs_response',
  );

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
                {activeDisputes.length === 0 ? (
                  <EmptyState
                    title="No active disputes"
                    description="No disputes need your response right now. That's a good thing!"
                  />
                ) : (
                  <>
                    <Box css={{ paddingTop: 'small', paddingBottom: 'small' }}>
                      <Inline css={{ font: 'caption', color: 'secondary' }}>
                        {activeDisputes.length} dispute{activeDisputes.length !== 1 ? 's' : ''} need{activeDisputes.length === 1 ? 's' : ''} response
                      </Inline>
                    </Box>
                    {activeDisputes.map((dispute) => (
                      <DisputeCard
                        key={dispute.id}
                        dispute={dispute}
                        onSelect={handleSelectDispute}
                      />
                    ))}
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
