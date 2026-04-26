import { useEffect, useState } from 'react';
import {
  Banner,
  Box,
  Button,
  Inline,
  Link,
} from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import { fetchBackend } from '../lib/apiClient';

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
  // Pre-fetched signed URL for /upgrade. Stripe Apps run in a sandboxed
  // iframe where window.open() is silently blocked, so we must mint the
  // URL up front and render the action as a <Link target="_blank">, which
  // is the only externally-navigable primitive available.
  const [upgradeUrl, setUpgradeUrl] = useState<string | null>(null);

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

  // Pre-fetch the upgrade-link URL once we know the merchant qualifies.
  // Token has 15-min TTL, plenty for the user to read the banner and click.
  useEffect(() => {
    if (
      !billing ||
      billing.tier !== 'usage' ||
      billing.ytd_success_fees_cents <= 0 ||
      dismissed
    ) {
      setUpgradeUrl(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchBackend<{ url: string }>(
          '/api/billing/upgrade-link',
          context,
        );
        if (!cancelled) setUpgradeUrl(result.url);
      } catch {
        // Banner is non-critical — silent failure is fine here.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [
    billing?.tier,
    billing?.ytd_success_fees_cents,
    dismissed,
    context,
  ]);

  if (
    !billing ||
    billing.tier !== 'usage' ||
    billing.ytd_success_fees_cents <= 0 ||
    dismissed
  ) {
    return null;
  }

  const saved = `$${(billing.ytd_success_fees_cents / 100).toFixed(2)}`;

  return (
    <Box css={{ marginBottom: 'medium' }}>
      <Banner
        type="default"
        title="Keep 100% of your next win"
        description={`You've paid ${saved} in success fees this year. At $79/month on Pro, you'd keep all of it.`}
        actions={
          <Box css={{ stack: 'x', gap: 'small', alignY: 'center' }}>
            {upgradeUrl ? (
              <Link href={upgradeUrl} target="_blank" type="primary">
                Upgrade to Pro
              </Link>
            ) : (
              <Inline css={{ font: 'caption', color: 'secondary' }}>
                Preparing link…
              </Inline>
            )}
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
