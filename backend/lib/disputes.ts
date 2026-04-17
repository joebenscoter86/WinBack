import { supabase } from "@/lib/supabase";

/**
 * Fetches a dispute row scoped to a Stripe-authenticated merchant in a single
 * query. Joins through `merchants` using Supabase's embedded-resource filter
 * pattern so callers don't have to round-trip through a separate merchant
 * lookup (which caused the WIN-19 race and generally creates fragile code
 * paths -- see WIN-42).
 *
 * The generic `columns` argument maps directly to a Supabase `.select()`
 * projection on the `disputes` row. The embedded `merchants!inner(...)` join
 * is appended automatically so callers don't have to remember it; callers
 * should never reference the merchants relation in `columns`.
 *
 * Returns `{ data, error }` mirroring Supabase's own shape. `data` is typed
 * as the caller's generic so routes can retain the narrow shape they use.
 */
export async function getDisputeForAccount<T>(
  stripeDisputeId: string,
  stripeAccountId: string,
  columns: string = "id",
): Promise<{ data: T | null; error: { message: string; code?: string } | null }> {
  const { data, error } = await supabase
    .from("disputes")
    .select(`${columns}, merchants!inner(stripe_account_id)`)
    .eq("stripe_dispute_id", stripeDisputeId)
    .eq("merchants.stripe_account_id", stripeAccountId)
    .maybeSingle();

  if (error) {
    return { data: null, error };
  }
  if (!data) {
    return { data: null, error: null };
  }

  // Strip the embedded merchants payload so callers get back just the
  // dispute columns they asked for. Cast through unknown because the
  // Supabase client infers types from the literal select() string and
  // can't statically resolve our dynamic `${columns}, merchants!inner(...)`.
  const row = { ...(data as unknown as Record<string, unknown>) };
  delete row.merchants;
  return { data: row as T, error: null };
}

/**
 * Atomically increments a dispute's `narrative_generations_count` up to
 * `maxCount`. Replaces the read-then-write-with-WHERE-count dance that lived
 * inline in the generate route (WIN-42).
 *
 * Returns the new count, or `null` if the dispute is already at the limit
 * (caller should treat this as a 429). Propagates unexpected errors.
 */
export async function incrementNarrativeGenerations(
  disputeId: string,
  maxCount: number,
): Promise<{ newCount: number | null; error: { message: string; code?: string } | null }> {
  const { data, error } = await supabase.rpc("increment_narrative_generations_count", {
    p_dispute_id: disputeId,
    p_max: maxCount,
  });

  if (error) {
    return { newCount: null, error };
  }
  // RPC returns int; null means WHERE excluded the row (at limit).
  return { newCount: (data as number | null) ?? null, error: null };
}
