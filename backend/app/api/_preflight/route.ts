import { NextResponse } from "next/server";
import { readEnv } from "@/lib/env";

/**
 * Health probe that also confirms all required env vars are present.
 * Hitting this after a deploy surfaces env misconfiguration immediately,
 * rather than waiting for a user action to trigger a 500.
 */
export async function GET(): Promise<NextResponse> {
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
