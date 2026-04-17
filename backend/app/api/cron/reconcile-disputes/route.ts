import { NextRequest, NextResponse } from "next/server";
import { reconcileDisputes } from "@/lib/webhooks/reconcile-disputes";
import { captureRouteError } from "@/lib/sentry";

/**
 * WIN-21: Daily reconciliation cron. Triggered by Vercel Cron via vercel.json.
 *
 * Vercel cron requests carry an `Authorization: Bearer ${CRON_SECRET}` header
 * when CRON_SECRET is set in env. Without that env var the route is open —
 * fine for dev, must be set in prod.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await reconcileDisputes();
    console.log("[WIN-21] reconcile-disputes complete", result);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    captureRouteError(err, { route: "cron.reconcile_disputes" });
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
