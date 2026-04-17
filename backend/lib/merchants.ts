import { supabase } from "@/lib/supabase";

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
 * Note: this function intentionally updates `updated_at` on conflict so
 * that the row's touch timestamp stays fresh, while preserving any fields
 * that have been set previously (email, business_name, subscription_*, etc.).
 */
export async function ensureMerchant(
  accountId: string,
  _userId: string,
): Promise<void> {
  try {
    const { error } = await supabase.from("merchants").upsert(
      {
        stripe_account_id: accountId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "stripe_account_id" },
    );

    if (error) {
      console.error("ensureMerchant upsert failed:", error.message);
    }
  } catch (err) {
    console.error("ensureMerchant unexpected error:", err);
  }
}
