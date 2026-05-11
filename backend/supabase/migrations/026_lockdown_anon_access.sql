-- WIN-82: Defense-in-depth lockdown of the Supabase anon-key access path.
--
-- Today the anon key is not shipped to any client (verified: no SUPABASE_ANON_KEY
-- or NEXT_PUBLIC_SUPABASE in stripe-app/src or backend client-shipped code; the
-- backend uses SUPABASE_SERVICE_ROLE_KEY exclusively, see backend/lib/supabase.ts:13).
-- This migration is defense-in-depth: it converts the latent misconfigurations
-- below into hard "deny by default" so the surface stays safe if the anon key
-- ever reaches a browser, a future migration enables an `authenticated` role,
-- or browser-direct Supabase access is added.
--
-- Three issues addressed:
--
-- 1. Header-trust RLS policies on merchants / disputes / evidence_files /
--    dispute_submissions used
--      USING (... = current_setting('request.headers', true)::json->>'x-stripe-account-id')
--    PostgREST forwards arbitrary client headers into request.headers, so the
--    "tenant id" was attacker-controlled. Drop the policies; service role
--    bypasses RLS, and that is the only intended access path.
--
-- 2. narrative_generations (008), webhook_events (013), waitlist (20260325)
--    were never given ENABLE ROW LEVEL SECURITY. With Supabase's default
--    grants to anon/authenticated, anon-key access yielded full reads (and
--    INSERTs into webhook_events could poison the dedup cache).
--
-- 3. increment_narrative_generations_count (012) is plpgsql / caller privileges,
--    but Postgres defaults function EXECUTE to PUBLIC. Revoking only from
--    anon/authenticated leaves the RPC anon-callable via PUBLIC. We revoke
--    from PUBLIC explicitly to close that path.
--
-- Service role bypasses every change here, so backend behavior is unchanged.
-- If browser-direct Supabase access is ever added, gate it on auth.jwt() claims
-- minted by the backend after Stripe-App-signature verification, never on
-- request.headers.

BEGIN;

-- 1. Revoke default Supabase grants from anon, authenticated, and PUBLIC.
-- Run REVOKE on ALL ... to catch tables/functions/sequences created in earlier
-- migrations that received the default grants at create time.
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon, authenticated, PUBLIC;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;

-- Belt-and-suspenders for future objects: alter default privileges so any
-- table/function/sequence created by a future migration is not auto-granted
-- back to these roles (which would silently re-open the hole).
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM anon, authenticated, PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;

-- 2. Enable RLS on the three tables that never had it. No policies attached;
-- service role bypasses RLS, and there is no other intended access path.
ALTER TABLE narrative_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 3. Drop the header-trust SELECT policies. They were inert today (anon never
-- talks to the DB), but would become live HIGH-severity cross-tenant reads
-- the moment the anon key reached a client.
DROP POLICY IF EXISTS "Merchants can read own record" ON merchants;
DROP POLICY IF EXISTS "Merchants can read own disputes" ON disputes;
DROP POLICY IF EXISTS "Merchants can read own evidence files" ON evidence_files;
DROP POLICY IF EXISTS "merchant_read_own" ON dispute_submissions;

-- The "Playbooks are readable by all authenticated users" policy from
-- 002_enable_rls_and_policies.sql:8 is intentionally left in place as
-- documentation of intent. The REVOKE above removes the underlying SELECT
-- grant, so the policy is currently inert -- but the intent statement is
-- worth preserving for whoever next considers browser-direct read access
-- to non-sensitive data.

-- The "service_role_all" policy on dispute_submissions (009:23) is also
-- left in place. Service role bypasses RLS regardless, so it is redundant,
-- but it documents the intended access pattern for future maintainers.

COMMIT;
