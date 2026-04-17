import { useEffect, useState } from 'react';
import {
  Banner,
  Box,
  Button,
  Inline,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import { fetchBackend, ApiError } from '../lib/apiClient';

type BillingStatus = {
  tier: 'usage' | 'pro';
  subscription_status: string | null;
  ytd_success_fees_cents: number;
};

/**
 * WIN-24: Upgrade prompt shown at the top of DisputeListView after a merchant
 * has won at least one dispute on the usage tier. Disappears once they upgrade.
 *
 * The "first won" trigger is approximated by "YTD success fees > 0" — good
 * enough for now; a more precise trigger (dismissed-once, sticky state) can
 * come later.
 */
type Props = {
  context: ExtensionContextValue;
};

const UpgradePromptBanner = ({ context }: Props) => {
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const result = await fetchBackend<BillingStatus>(
          '/api/billing/status',
          context,
        );
        if (!cancelled) setBilling(result);
      } catch {
        // Silent failure — the banner is non-critical UI.
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [context]);

  if (
    !billing ||
    billing.tier !== 'usage' ||
    billing.ytd_success_fees_cents <= 0 ||
    dismissed
  ) {
    return null;
  }

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const returnUrl = 'https://dashboard.stripe.com/settings/apps';
      const result = await fetchBackend<{ url: string }>(
        '/api/billing/checkout',
        context,
        { success_url: returnUrl, cancel_url: returnUrl },
      );
      if (typeof window !== 'undefined') {
        window.open(result.url, '_blank', 'noopener');
      }
    } catch {
      // Errors surface on the Settings view's upgrade flow; keep the banner
      // quiet here to avoid noise on the list.
    } finally {
      setUpgrading(false);
    }
  };

  const saved = `$${(billing.ytd_success_fees_cents / 100).toFixed(2)}`;

  return (
    <Box css={{ marginBottom: 'medium' }}>
      <Banner
        type="default"
        title="Keep 100% of your next win"
        description={`You've paid ${saved} in success fees this year. At $79/month on Pro, you'd keep all of it.`}
        actions={
          <Box css={{ stack: 'x', gap: 'small' }}>
            <Button type="primary" onPress={handleUpgrade} disabled={upgrading}>
              {upgrading ? 'Opening…' : 'Upgrade to Pro'}
            </Button>
            <Button type="secondary" onPress={() => setDismissed(true)}>
              Not now
            </Button>
          </Box>
        }
      />
    </Box>
  );
};

export default UpgradePromptBanner;
