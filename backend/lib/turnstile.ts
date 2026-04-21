// WIN-68: Cloudflare Turnstile server-side token verification.
//
// Turnstile is Cloudflare's privacy-friendly captcha alternative. The client
// mounts a widget (sitekey = NEXT_PUBLIC_TURNSTILE_SITE_KEY) which produces
// a short-lived token. This module verifies that token against Cloudflare's
// siteverify endpoint using TURNSTILE_SECRET_KEY.
//
// If TURNSTILE_SECRET_KEY is unset we treat the check as "skipped" and
// return true — keeps local dev friction-free while forcing production to
// configure the key.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileVerifyResult {
  success: boolean;
  /** `true` if verification was skipped because no secret key is configured. */
  skipped: boolean;
  errors?: string[];
}

export async function verifyTurnstileToken(
  token: string | undefined,
  clientIp?: string,
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { success: true, skipped: true };
  }

  if (!token) {
    return { success: false, skipped: false, errors: ["missing-input-response"] };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (clientIp && clientIp !== "anonymous") {
    body.set("remoteip", clientIp);
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    return {
      success: data.success === true,
      skipped: false,
      errors: data["error-codes"],
    };
  } catch (err) {
    return {
      success: false,
      skipped: false,
      errors: ["verify-network-error", err instanceof Error ? err.message : String(err)],
    };
  }
}
