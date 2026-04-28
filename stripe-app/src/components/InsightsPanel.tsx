// stripe-app/src/components/InsightsPanel.tsx
//
// WIN-22 + WIN-23: Insights tab. Shows the merchant's overall and per-reason
// dispute win rate, plus pattern alerts when 3+ disputes share a reason in
// the last 90 days. Data comes from the /api/insights backend route which
// aggregates the disputes table for this merchant.

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Banner,
  Box,
  Button,
  Inline,
  Spinner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import { fetchBackend, ApiError } from '../lib/apiClient';

interface OverallStats {
  won: number;
  lost: number;
  total_resolved: number;
  total_disputes: number;
  win_rate: number | null;
}

interface ReasonStats {
  reason_code: string;
  label: string;
  won: number;
  lost: number;
  total_resolved: number;
  win_rate: number;
}

interface Pattern {
  reason_code: string;
  label: string;
  count: number;
  window_days: number;
  prevention_tip: string;
}

interface InsightsResponse {
  overall: OverallStats;
  by_reason: ReasonStats[];
  patterns: Pattern[];
}

type ViewState = 'loading' | 'error' | 'ready';

interface InsightsPanelProps {
  context: ExtensionContextValue;
}

function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

const InsightsPanel = ({ context }: InsightsPanelProps) => {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [data, setData] = useState<InsightsResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Pin context behind a ref so re-renders of the parent (which create a new
  // context object every time) don't retrigger the fetch effect. Mirrors the
  // pattern used in DisputeListView's loadDisputes.
  const contextRef = useRef(context);
  contextRef.current = context;

  const load = useCallback(async () => {
    setViewState('loading');
    try {
      const result = await fetchBackend<InsightsResponse>(
        '/api/insights',
        contextRef.current,
      );
      setData(result);
      setViewState('ready');
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'We could not load your insights. Try again in a moment.';
      setErrorMessage(message);
      setViewState('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (viewState === 'loading') {
    return (
      <Box css={{ padding: 'medium', alignX: 'center' }}>
        <Spinner />
      </Box>
    );
  }

  if (viewState === 'error') {
    return (
      <Box css={{ padding: 'medium', stack: 'y', gap: 'small' }}>
        <Banner type="critical" title="Could not load insights" description={errorMessage} />
        <Button type="secondary" onPress={load}>
          Try again
        </Button>
      </Box>
    );
  }

  if (!data) return null;

  const { overall, by_reason, patterns } = data;
  const hasResolved = overall.total_resolved > 0;
  const hasAnyDisputes = overall.total_disputes > 0;

  return (
    <Box css={{ padding: 'medium', stack: 'y', gap: 'large' }}>
      <Box css={{ stack: 'y', gap: 'small' }}>
        {hasResolved ? (
          <>
            <Inline css={{ font: 'heading' }}>
              Win rate: {formatPercent(overall.win_rate ?? 0)}
            </Inline>
            <Inline css={{ font: 'caption', color: 'secondary' }}>
              {overall.won} of {overall.total_resolved} resolved disputes won
              {overall.lost > 0 && ` · ${overall.lost} lost`}
            </Inline>
          </>
        ) : hasAnyDisputes ? (
          <Banner
            type="default"
            title="No resolved disputes yet"
            description="Your disputes are still in flight. Your win rate will appear here once Stripe closes them."
          />
        ) : (
          <Banner
            type="default"
            title="No disputes yet"
            description="When Stripe closes a dispute, your win rate and patterns will show up here."
          />
        )}
      </Box>

      {by_reason.length > 0 && (
        <Box css={{ stack: 'y', gap: 'small' }}>
          <Inline css={{ font: 'subheading' }}>By reason</Inline>
          {by_reason.map((row) => (
            <Box
              key={row.reason_code}
              css={{
                stack: 'x',
                distribute: 'space-between',
                alignY: 'center',
                paddingY: 'small',
              }}
            >
              <Inline css={{ font: 'body' }}>{row.label}</Inline>
              <Inline css={{ font: 'caption', color: 'secondary' }}>
                {row.won}/{row.total_resolved} won ({formatPercent(row.win_rate)})
              </Inline>
            </Box>
          ))}
        </Box>
      )}

      {patterns.length > 0 && (
        <Box css={{ stack: 'y', gap: 'small' }}>
          <Inline css={{ font: 'subheading' }}>Patterns to watch</Inline>
          {patterns.map((pattern) => (
            <Banner
              key={pattern.reason_code}
              type="caution"
              title={`${pattern.count} ${pattern.label} disputes in the last ${pattern.window_days} days`}
              description={pattern.prevention_tip}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default InsightsPanel;
