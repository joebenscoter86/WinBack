import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service_role key.
 * Bypasses RLS — use only in API routes after Stripe signature verification.
 * Lazy-initialized to avoid crashes during Next.js build when env vars aren't set.
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !key) {
        throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      }
      _supabase = createClient(url, key);
    }
    return Reflect.get(_supabase as unknown as object, prop);
  },
});
