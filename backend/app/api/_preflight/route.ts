import { NextRequest, NextResponse } from "next/server";
import { readEnv } from "@/lib/env";
import { checkPreflightRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Health probe that also confirms all required env vars are present.
 * Hitting this after a deploy surfaces env misconfiguration immediately,
 * rather than waiting for a user action to trigger a 500.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Rate limit unauthenticated probes. More permissive than other public
  // routes because uptime monitors may legitimately poll this endpoint.
  const clientIp = getClientIp(request);
  const rl = await checkPreflightRateLimit(clientIp);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": Math.max(
            1,
            Math.ceil((rl.reset - Date.now()) / 1000),
          ).toString(),
        },
      },
    );
  }

  try {
    readEnv();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "env error",
      },
      { status: 500 },
    );
  }
}
