// WIN-68: IP-based rate limiting for unauthenticated endpoints.
//
// Backed by Upstash Ratelimit (sliding-window in Redis). The waitlist route
// is the first consumer. If UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
// are missing we fail open — that's fine for local development where abuse
// isn't a concern. Production deploys must set both.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const ALLOWED_WHEN_UNCONFIGURED: RateLimitResult = {
  success: true,
  limit: 0,
  remaining: 0,
  reset: 0,
};

let waitlistLimiter: Ratelimit | null = null;

function getWaitlistLimiter(): Ratelimit | null {
  if (waitlistLimiter) return waitlistLimiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  waitlistLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    // 5 requests per minute per key. Human form submitters stay well under;
    // scripted abuse gets throttled fast.
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: false,
    prefix: "ratelimit:waitlist",
  });
  return waitlistLimiter;
}

/**
 * Check and consume one token against the waitlist rate limiter.
 * `identifier` should be the client IP. Fails open if Upstash isn't
 * configured (dev/test).
 */
export async function checkWaitlistRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  const limiter = getWaitlistLimiter();
  if (!limiter) return ALLOWED_WHEN_UNCONFIGURED;

  const { success, limit, remaining, reset } = await limiter.limit(identifier);
  return { success, limit, remaining, reset };
}

/**
 * Extract the client IP from the request. Vercel and most reverse proxies
 * set `x-forwarded-for` with the client IP as the first comma-separated
 * entry. Falls back to "anonymous" so unconfigured edge cases still key
 * the limiter consistently (rather than hitting every caller with the
 * same synthetic key and rate-limiting legitimate users).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "anonymous";
}
