import Stripe from "stripe";
import { getResend } from "@/lib/resend";

/**
 * Best-effort owner notification fired the first time a Stripe account opens
 * the WinBack iframe. Stripe Apps does not expose an `app.installed` webhook
 * event, so install detection happens at the first authenticated backend call
 * (see `ensureMerchant`). If `WAITLIST_NOTIFY_EMAIL` is unset or Resend fails,
 * this silently returns -- never blocks the request that triggered it.
 */
export async function notifyNewInstall(accountId: string): Promise<void> {
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL;
  if (!notifyEmail) return;

  const fromEmail = process.env.RESEND_FROM_EMAIL || "hello@winbackpay.com";
  const enrichment = await fetchAccountEnrichment(accountId);

  const dashboardUrl = `https://dashboard.stripe.com/${accountId}`;
  const subjectName = enrichment?.businessName ?? accountId;

  const lines: string[] = [
    `<p>A new Stripe account just opened WinBack for the first time.</p>`,
    `<ul>`,
    `<li><strong>Account:</strong> ${escapeHtml(accountId)}</li>`,
  ];
  if (enrichment?.businessName) {
    lines.push(`<li><strong>Business:</strong> ${escapeHtml(enrichment.businessName)}</li>`);
  }
  if (enrichment?.country) {
    lines.push(`<li><strong>Country:</strong> ${escapeHtml(enrichment.country)}</li>`);
  }
  if (enrichment?.email) {
    lines.push(`<li><strong>Email:</strong> ${escapeHtml(enrichment.email)}</li>`);
  }
  lines.push(`<li><strong>Stripe dashboard:</strong> <a href="${dashboardUrl}">${dashboardUrl}</a></li>`);
  lines.push(`</ul>`);

  await getResend().emails.send({
    from: fromEmail,
    to: notifyEmail,
    subject: `New WinBack install: ${subjectName}`,
    html: lines.join(""),
  });
}

type Enrichment = {
  businessName: string | null;
  country: string | null;
  email: string | null;
};

/**
 * Try to fetch the connected account's display name + country to make the
 * notification more legible. Stripe Apps installs grant access via the app's
 * platform key. We try the live key first (post-launch the platform key IS
 * live), then fall back to the test key for test-mode installs. Returns null
 * on any error -- enrichment is purely cosmetic.
 */
async function fetchAccountEnrichment(accountId: string): Promise<Enrichment | null> {
  const candidates = [
    process.env.STRIPE_SECRET_KEY_LIVE,
    process.env.STRIPE_SECRET_KEY_TEST,
  ].filter((v): v is string => typeof v === "string" && v.length > 0);

  for (const key of candidates) {
    try {
      const stripe = new Stripe(key);
      const acct = await stripe.accounts.retrieve(accountId);
      const businessName =
        acct.business_profile?.name ??
        acct.settings?.dashboard?.display_name ??
        null;
      return {
        businessName,
        country: acct.country ?? null,
        email: acct.email ?? null,
      };
    } catch {
      // Wrong mode for this account, or no permission -- try the next key.
    }
  }
  return null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
