# Stripe webhooks (WIN-21)

WinBack listens for Stripe dispute events to keep `disputes` rows in sync with
Stripe's authoritative state, plus a daily reconciliation cron that catches
events the webhook missed (cold starts, deploys, etc.).

## Architecture

```
Stripe Connect events → POST /api/webhooks/stripe → handleDisputeEvent → upsert disputes
                                ↓
                       webhook_events (dedupe)

Vercel cron 03:00 UTC → GET /api/cron/reconcile-disputes → list disputes per merchant → handleDisputeEvent
```

The webhook route and the cron both call the same `handleDisputeEvent` function,
so the persistence rules (status mapping, outcome_at logic, network inference)
can't drift between paths.

## Stripe Dashboard setup

1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. **URL:** `https://<your-vercel-domain>/api/webhooks/stripe`
3. **Listen to:** Events on Connected accounts (this is Connect — `event.account` must be set)
4. **Events to send:**
   - `charge.dispute.created`
   - `charge.dispute.updated`
   - `charge.dispute.closed`
5. Copy the signing secret → set `STRIPE_WEBHOOK_SECRET` in Vercel for Production + Preview.

## Vercel env vars

- `STRIPE_WEBHOOK_SECRET=whsec_...` — required, gates signature verification
- `CRON_SECRET=<long random string>` — required in prod; Vercel sends it as
  `Authorization: Bearer ${CRON_SECRET}` on cron-triggered requests

Without `CRON_SECRET` the cron route is open to anyone who knows the URL — set it.

## Idempotency

`webhook_events` table has `event_id` as the PK. The handler inserts the event
id at the start; on conflict (`23505`), it returns 200 immediately and skips
the side effect. Stripe retries failed deliveries with the same event id, so
this is the right boundary.

## Reconciliation scope

Daily cron lists disputes created in the last 7 days per merchant. Closed
disputes older than 7 days don't change again, so we don't bother. If a
webhook is missed for a dispute older than 7 days, it'll surface the next time
the merchant opens the iframe (the iframe always reads live Stripe data).

## Failure modes

- **Signature mismatch** → 400, captured in Sentry as `webhooks.stripe.signature`.
- **Missing event.account** → 200 (don't make Stripe retry forever) but logged
  and captured in Sentry. Indicates a misconfigured webhook subscribing to
  account-level events instead of Connect events.
- **Handler throws** → 500, row marked `failed`, captured in Sentry. Stripe
  will retry with backoff.
- **Duplicate delivery** → 200 with `deduped: true`, no side effect.

## Testing locally

Use the Stripe CLI to forward live events to localhost:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe \
  --events charge.dispute.created,charge.dispute.updated,charge.dispute.closed
```

The CLI prints a `whsec_...` for the local session — paste into `.env.local`
as `STRIPE_WEBHOOK_SECRET`.

Then trigger a test event:

```bash
stripe trigger charge.dispute.created
```
