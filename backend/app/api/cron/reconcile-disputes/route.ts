import { NextRequest, NextResponse } from "next/server";
import { reconcileDisputes } from "@/lib/webhooks/reconcile-disputes";
import { captureRouteError } from "@/lib/sentry";
import { supabase } from "@/lib/supabase";

/**
 * WIN-21: Daily reconciliation cron. Triggered by Vercel Cron via vercel.json.
 *
 * Vercel cron requests carry an `Authorization: Bearer ${CRON_SECRET}` header.
 * WIN-64: if CRON_SECRET is unset we fail closed in production so a missing
 * env var can't silently expose the route to the internet. In dev/test we
 * still allow an open route to keep local iteration friction low.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "CRON_SECRET not configured" },
        { status: 500 },
      );
    }
    // Dev/test: open route — fall through.
  } else {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const { data: merchants, error: merchErr } = await supabase
      .from("merchants")
      .select("stripe_account_id");

    if (merchErr || !merchants) {
      throw new Error(
        `Failed to list merchants: ${merchErr?.message ?? "no data"}`,
      );
    }

    const aggregate = {
      merchant_count: 0,
      disputes_seen: 0,
      disputes_upserted: 0,
      status_refreshes: 0,
      truncated_merchants: 0,
      errors: [] as Array<{ merchant_id: string; message: string }>,
    };

    for (const m of merchants as Array<{ stripe_account_id: string }>) {
      aggregate.merchant_count += 1;
      for (const livemode of [true, false]) {
        const r = await reconcileDisputes(livemode, m.stripe_account_id);
        aggregate.disputes_seen += r.disputes_seen;
        aggregate.disputes_upserted += r.disputes_upserted;
        aggregate.status_refreshes += r.status_refreshes;
        if (r.truncated) aggregate.truncated_merchants += 1;
        aggregate.errors.push(...r.errors);
      }
    }

    console.log("[WIN-21] reconcile-disputes complete", aggregate);
    return NextResponse.json({ ok: true, ...aggregate });
  } catch (err) {
    captureRouteError(err, { route: "cron.reconcile_disputes" });
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
