import { supabase } from "@/lib/supabase";
import { notifyNewInstall } from "@/lib/install-notifier";

/**
 * Upserts a merchant row keyed by Stripe account ID. Idempotent.
 *
 * **MUST be awaited.** Every caller should `await ensureMerchant(...)` --
 * never fire-and-forget. The previous convention of skipping `await` in
 * routes that "don't depend on the merchant row existing right away" was
 * too easy to get wrong: WIN-19 QA found a race where the narrative
 * generate route's SELECT raced against an un-awaited upsert and returned
 * "Merchant not found" on first use. WIN-42 cleaned up the pattern by
 * making "always await" the only rule.
 *
 * On the first observed call for a given account, fires a one-shot owner
 * notification via `notifyNewInstall`. Stripe Apps does not emit an
 * `app.installed` webhook event, so first-touch backend authentication is
 * the canonical install signal -- it actually catches first *engagement*
 * (someone opened the app), not silent installs that never run code.
 *
 * Note: this function intentionally updates `updated_at` on the touch path
 * so the row's last-seen timestamp stays fresh, while preserving any fields
 * that have been set previously (email, business_name, subscription_*, etc.).
 */
export async function ensureMerchant(
  accountId: string,
  _userId: string,
): Promise<void> {
  try {
    const { data: existing, error: selectErr } = await supabase
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", accountId)
      .maybeSingle();

    if (selectErr) {
      console.error("ensureMerchant select failed:", selectErr.message);
      return;
    }

    if (existing) {
      const { error: updateErr } = await supabase
        .from("merchants")
        .update({ updated_at: new Date().toISOString() })
        .eq("stripe_account_id", accountId);
      if (updateErr) {
        console.error("ensureMerchant update failed:", updateErr.message);
      }
      return;
    }

    const { error: insertErr } = await supabase.from("merchants").insert({
      stripe_account_id: accountId,
    });

    if (insertErr) {
      // 23505 = unique_violation. Two concurrent first-touches raced past
      // the SELECT and both tried to INSERT; one wins, the other lands here.
      // Treat as "row already existed" -- do not notify, do not error.
      if (insertErr.code === "23505") return;
      console.error("ensureMerchant insert failed:", insertErr.message);
      return;
    }

    // Genuine first install. Fire-and-forget so the notification can never
    // block the request that triggered it -- if Resend is slow or down, the
    // user still sees a fast iframe load.
    notifyNewInstall(accountId).catch((err) => {
      console.error("notifyNewInstall failed:", err);
    });
  } catch (err) {
    console.error("ensureMerchant unexpected error:", err);
  }
}
