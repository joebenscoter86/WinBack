import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-side Supabase client using the service_role key.
 * Bypasses RLS — use only in API routes after Stripe signature verification.
 */
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
