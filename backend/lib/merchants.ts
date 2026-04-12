import { supabase } from "@/lib/supabase";

/**
 * Upserts a merchant row keyed by Stripe account ID. Idempotent.
 *
 * Must be awaited by any route that depends on the merchant row existing
 * immediately after -- fire-and-forget is fragile and has caused races.
 * See WIN-42 for the broader cleanup of merchant-scoped query patterns.
 *
 * Note: this function intentionally updates `updated_at` on conflict so that
 * the row's touch timestamp stays fresh, while preserving any fields that
 * have been set previously (email, business_name, subscription_*, etc.).
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
