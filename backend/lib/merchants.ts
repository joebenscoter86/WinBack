import { supabase } from "@/lib/supabase";

export async function ensureMerchant(
  accountId: string,
  userId: string,
): Promise<void> {
  try {
    const { error } = await supabase.from("merchants").upsert(
      {
        stripe_account_id: accountId,
        stripe_user_id: userId,
        last_seen_at: new Date().toISOString(),
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
