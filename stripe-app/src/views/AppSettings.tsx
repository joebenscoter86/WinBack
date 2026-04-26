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
  has_payment_method: boolean;
  payment_method_prompt_dismissed_at: string | null;
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
  // Pre-fetched signed URLs for the /upgrade and /setup-billing handoff
  // pages, plus the Stripe Customer Portal session URL for Pro merchants.
  // Stripe Apps run in a sandboxed iframe where window.open() is silently
  // blocked, so we cannot mint these URLs on click and then navigate.
  // Instead we mint them on mount and render the buttons as <Link
  // target="_blank"> components, which the parent Stripe Dashboard is
  // allowed to open as new tabs.
  const [upgradeUrl, setUpgradeUrl] = useState<string | null>(null);
  const [setupUrl, setSetupUrl] = useState<string | null>(null);
  const [portalUrl, setPortalUrl] = useState<string | null>(null);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);
  const [settingUpError, setSettingUpError] = useState<string | null>(null);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [dismissing, setDismissing] = useState(false);

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

  // Pre-fetch the upgrade-link URL once billing data is loaded and we know
  // the merchant is on Pay-Per-Win. Tokens have a 15-min TTL, more than
  // enough for the user to read the page and click. If the user lingers
  // past the TTL, clicking the link will land them on /upgrade with an
  // expired-token state that links back to the Stripe Dashboard.
  useEffect(() => {
    if (!billing || billing.tier !== 'usage') {
      setUpgradeUrl(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchBackend<{ url: string }>(
          '/api/billing/upgrade-link',
          contextRef.current,
        );
        if (!cancelled) setUpgradeUrl(result.url);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof ApiError ? err.message : 'Failed to prepare upgrade link';
        setUpgradeError(msg);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [billing?.tier]);

  // Same pattern for the setup-billing link, gated on tier=usage AND no PM.
  useEffect(() => {
    if (!billing || billing.tier !== 'usage' || billing.has_payment_method) {
      setSetupUrl(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchBackend<{ url: string }>(
          '/api/billing/setup-link',
          contextRef.current,
        );
        if (!cancelled) setSetupUrl(result.url);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof ApiError ? err.message : 'Failed to prepare setup link';
        setSettingUpError(msg);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [billing?.tier, billing?.has_payment_method]);

  // Stripe Customer Portal session for Pro merchants — used for cancel,
  // payment-method update, invoice history. Session URLs are short-lived
  // (a few hours) but are signed by Stripe directly, so no extra token
  // wrapping is needed on our side.
  useEffect(() => {
    if (!billing || billing.tier !== 'pro') {
      setPortalUrl(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchBackend<{ url: string }>(
          '/api/billing/portal-link',
          contextRef.current,
        );
        if (!cancelled) setPortalUrl(result.url);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof ApiError ? err.message : 'Failed to prepare billing portal';
        setPortalError(msg);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [billing?.tier]);

  const handleDismissPmBanner = async () => {
    setDismissing(true);
    try {
      await fetchBackend('/api/billing/dismiss-payment-method-prompt', contextRef.current, {});
      if (billing) {
        setBilling({
          ...billing,
          payment_method_prompt_dismissed_at: new Date().toISOString(),
        });
      }
    } finally {
      setDismissing(false);
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

        {shouldShowPmBanner(billing) && (
          <Banner
            type="default"
            title="Add a payment method"
            description="Add a card so WinBack can settle the 15% success fee instantly when you win. You won't be charged today."
            actions={
              <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
                {setupUrl ? (
                  <Link href={setupUrl} target="_blank" type="primary">
                    Add payment method
                  </Link>
                ) : (
                  <Inline css={{ font: 'caption', color: 'secondary' }}>
                    Preparing setup link…
                  </Inline>
                )}
                <Button type="secondary" onPress={handleDismissPmBanner} disabled={dismissing}>
                  Not now
                </Button>
              </Box>
            }
          />
        )}
        {settingUpError && (
          <Banner type="critical" title="Could not start setup" description={settingUpError} />
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
                {upgradeUrl ? (
                  <Link href={upgradeUrl} target="_blank" type="primary">
                    Upgrade to Pro
                  </Link>
                ) : (
                  <Inline css={{ font: 'caption', color: 'secondary' }}>
                    Preparing upgrade link…
                  </Inline>
                )}
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Opens winbackpay.com in a new tab
                </Inline>
              </Box>
            </Box>
          </>
        )}

        {isPro && (
          <>
            <Divider />
            <Box css={{ stack: 'y', gap: 'small' }}>
              <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
                Manage subscription
              </Inline>
              <Inline css={{ font: 'caption' }}>
                Update your payment method, view invoices, or cancel.
                Canceling reverts you to Pay-Per-Win at period end.
              </Inline>
              {portalError && (
                <Banner
                  type="critical"
                  title="Could not open billing portal"
                  description={portalError}
                />
              )}
              <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
                {portalUrl ? (
                  <Link href={portalUrl} target="_blank" type="primary">
                    Manage subscription
                  </Link>
                ) : (
                  <Inline css={{ font: 'caption', color: 'secondary' }}>
                    Preparing billing portal…
                  </Inline>
                )}
                <Inline css={{ font: 'caption', color: 'secondary' }}>
                  Opens Stripe billing portal in a new tab
                </Inline>
              </Box>
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

function shouldShowPmBanner(b: BillingStatus | null): boolean {
  if (!b) return false;
  if (b.tier === 'pro') return false;
  if (b.has_payment_method) return false;
  const dismissed = b.payment_method_prompt_dismissed_at;
  if (!dismissed) return true;
  const dismissedAt = new Date(dismissed).getTime();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  return Date.now() - dismissedAt > thirtyDaysMs;
}

export default AppSettings;
