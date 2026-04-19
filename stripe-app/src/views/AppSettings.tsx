import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Badge,
  Banner,
  Button,
  Divider,
  Inline,
  Link,
  SettingsView,
  Spinner,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import { fetchBackend, ApiError } from '../lib/apiClient';

type BillingStatus = {
  tier: 'usage' | 'pro';
  subscription_status: string | null;
  pro_since_at: string | null;
  upgrade_prompted_at: string | null;
  next_billing_at: string | null;
  ytd_success_fees_cents: number;
};

type ViewState = 'loading' | 'ready' | 'error';

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const AppSettings = (context: ExtensionContextValue) => {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  const [reopening, setReopening] = useState(false);
  const [reopenDone, setReopenDone] = useState(false);
  const [reopenError, setReopenError] = useState<string | null>(null);

  const contextRef = useRef(context);
  contextRef.current = context;

  const handleReopenOnboarding = async () => {
    setReopening(true);
    setReopenError(null);
    setReopenDone(false);
    try {
      await fetchBackend('/api/merchant/onboarding/update', contextRef.current, {
        completed: false,
      });
      setReopenDone(true);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Failed to reopen guide';
      setReopenError(msg);
    } finally {
      setReopening(false);
    }
  };

  useEffect(() => {
    const loadBilling = async () => {
      try {
        const result = await fetchBackend<BillingStatus>(
          '/api/billing/status',
          contextRef.current,
        );
        setBilling(result);
        setViewState('ready');
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : 'Failed to load billing status';
        setErrorMessage(msg);
        setViewState('error');
      }
    };
    loadBilling();
  }, []);

  const handleUpgrade = async () => {
    setUpgrading(true);
    setUpgradeError(null);
    try {
      // Dashboard is the natural "return here" destination — the iframe will
      // refresh when Stripe redirects back, and the billing webhook will have
      // flipped the tier by then.
      const returnUrl = 'https://dashboard.stripe.com/settings/apps';
      const result = await fetchBackend<{ url: string }>(
        '/api/billing/checkout',
        contextRef.current,
        { success_url: returnUrl, cancel_url: returnUrl },
      );
      // Open Checkout in a new tab — the Stripe Dashboard iframe blocks
      // Checkout from rendering inside it.
      if (typeof window !== 'undefined') {
        window.open(result.url, '_blank', 'noopener');
      }
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Failed to start upgrade';
      setUpgradeError(msg);
    } finally {
      setUpgrading(false);
    }
  };

  if (viewState === 'loading') {
    return (
      <SettingsView>
        <Box css={{ stack: 'x', gap: 'small', alignX: 'center', padding: 'medium' }}>
          <Spinner />
          <Inline>Loading billing status…</Inline>
        </Box>
      </SettingsView>
    );
  }

  if (viewState === 'error' || !billing) {
    return (
      <SettingsView>
        <Box css={{ padding: 'medium' }}>
          <Banner
            type="critical"
            title="Could not load billing status"
            description={errorMessage ?? 'Please try again.'}
          />
        </Box>
      </SettingsView>
    );
  }

  const isPastDue = billing.subscription_status === 'past_due';
  const isPro = billing.tier === 'pro';

  return (
    <SettingsView>
      <Box css={{ stack: 'y', gap: 'medium', padding: 'medium' }}>
        {isPastDue && (
          <Banner
            type="caution"
            title="Payment past due"
            description="Your Pro subscription has a payment issue. Update your payment method in Stripe to avoid interruption. You can still file and submit disputes."
          />
        )}

        <Box css={{ stack: 'y', gap: 'small' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Billing
          </Inline>

          <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
            <Inline css={{ font: 'body' }}>Plan:</Inline>
            {isPro ? (
              <Badge type="positive">Pro · $79/mo</Badge>
            ) : (
              <Badge type="info">Pay-Per-Win · 15% of recovered amount</Badge>
            )}
          </Box>

          {isPro ? (
            <>
              <Inline css={{ font: 'caption', color: 'secondary' }}>
                Unlimited disputes. Zero success fee.
              </Inline>
              <Inline css={{ font: 'caption' }}>
                Pro since {formatDate(billing.pro_since_at)} · Next billing{' '}
                {formatDate(billing.next_billing_at)}
              </Inline>
            </>
          ) : (
            <>
              <Inline css={{ font: 'caption', color: 'secondary' }}>
                You pay nothing until you win. We charge 15% of what you recover.
              </Inline>
              <Inline css={{ font: 'caption' }}>
                Success fees this year: {formatCents(billing.ytd_success_fees_cents)}
              </Inline>
            </>
          )}
        </Box>

        {!isPro && (
          <>
            <Divider />
            <Box css={{ stack: 'y', gap: 'small' }}>
              <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
                Upgrade to Pro
              </Inline>
              <Inline css={{ font: 'body' }}>
                $79/month, unlimited disputes, no success fee. Break-even after
                ~1 win/month at a $500 average dispute.
              </Inline>
              {upgradeError && (
                <Banner type="critical" title="Upgrade failed" description={upgradeError} />
              )}
              <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
                <Button type="primary" onPress={handleUpgrade} disabled={upgrading}>
                  {upgrading ? 'Opening Checkout…' : 'Upgrade to Pro'}
                </Button>
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Opens Stripe Checkout in a new tab
                </Inline>
              </Box>
            </Box>
          </>
        )}

        {isPro && (
          <>
            <Divider />
            <Box css={{ stack: 'y', gap: 'xsmall' }}>
              <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
                Manage subscription
              </Inline>
              <Inline css={{ font: 'caption' }}>
                Update your payment method or cancel from the{' '}
                <Link href="https://dashboard.stripe.com/settings/billing" target="_blank">
                  Stripe billing portal
                </Link>
                . Canceling reverts you to Pay-Per-Win at period end.
              </Inline>
            </Box>
          </>
        )}

        <Divider />

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Getting started guide
          </Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Show the "How WinBack works" guide again in the Disputes tab next time you have no active disputes.
          </Inline>
          {reopenError && (
            <Banner type="critical" title="Could not reopen guide" description={reopenError} />
          )}
          {reopenDone && !reopenError && (
            <Inline css={{ font: 'caption', color: 'secondary' }}>
              Done. The guide will appear the next time your disputes list is empty.
            </Inline>
          )}
          <Box css={{ stack: 'x', alignX: 'start' }}>
            <Button type="secondary" onPress={handleReopenOnboarding} disabled={reopening}>
              {reopening ? 'Reopening\u2026' : 'Show getting started guide'}
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box css={{ stack: 'y', gap: 'xsmall' }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            About WinBack
          </Inline>
          <Inline css={{ font: 'body' }}>Version 0.0.1</Inline>
          <Inline css={{ font: 'caption', color: 'secondary' }}>
            Guided dispute resolution for Stripe merchants. Built by JKB Tech.
          </Inline>
        </Box>
      </Box>
    </SettingsView>
  );
};

export default AppSettings;
