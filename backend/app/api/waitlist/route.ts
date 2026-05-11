import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";
import { buildWaitlistWelcomeEmail } from "@/lib/email/waitlist-welcome";
import { checkWaitlistRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// RFC 5321 §4.5.3.1.3: 254 is the practical maximum for an email path.
const EMAIL_MAX_LENGTH = 254;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "hello@winbackpay.com";

// EMAIL_REGEX permits <, >, ", ', & in the local-part. The admin notification
// interpolates the submitted email into an HTML body, so any sink that lands
// untrusted text in HTML must escape first (WIN-80).
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // WIN-68: rate limit before any expensive work (DB insert, Resend sends).
  // Keyed on client IP. If Upstash isn't configured (dev), this always
  // allows; production deploys must set UPSTASH_REDIS_REST_URL/TOKEN.
  const clientIp = getClientIp(request);
  const rl = await checkWaitlistRateLimit(clientIp);
  if (!rl.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Try again shortly." },
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

  let body: { email?: string; turnstileToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();

  if (
    !email ||
    email.length > EMAIL_MAX_LENGTH ||
    !EMAIL_REGEX.test(email)
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  // WIN-68: verify the Turnstile token before we trust the request. If
  // TURNSTILE_SECRET_KEY is unset (dev) the verifier skips and returns ok.
  const captcha = await verifyTurnstileToken(body.turnstileToken, clientIp);
  if (!captcha.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Captcha verification failed. Please refresh and try again.",
      },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("waitlist").insert({
    email,
    source: "landing_page",
  });

  if (error?.code === "23505") {
    return NextResponse.json({ success: true });
  }

  if (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Best-effort welcome email -- never block signup
  try {
    const { subject, html } = buildWaitlistWelcomeEmail();
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
    });
  } catch (err) {
    console.error("Failed to send waitlist welcome email:", err);
  }

  // Best-effort owner notification. Read NOTIFY_EMAIL at call time so
  // tests can stub it per-case without re-importing the module.
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL;
  if (notifyEmail) {
    try {
      await getResend().emails.send({
        from: FROM_EMAIL,
        to: notifyEmail,
        // Subject is plain-text MIME, not HTML -- but the email goes into
        // the HTML body below, where it MUST be escaped (WIN-80).
        subject: `New waitlist signup: ${email}`,
        html: `<p><strong>${escapeHtml(email)}</strong> just joined the WinBack waitlist.</p>`,
      });
    } catch (err) {
      console.error("Failed to send waitlist notification:", err);
    }
  }

  return NextResponse.json({ success: true });
}
