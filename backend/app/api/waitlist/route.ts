import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";
import { buildWaitlistWelcomeEmail } from "@/lib/email/waitlist-welcome";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "hello@winbackpay.com";
const NOTIFY_EMAIL = process.env.WAITLIST_NOTIFY_EMAIL;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 }
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

  // Best-effort owner notification
  if (NOTIFY_EMAIL) {
    try {
      await getResend().emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `New waitlist signup: ${email}`,
        html: `<p><strong>${email}</strong> just joined the WinBack waitlist.</p>`,
      });
    } catch (err) {
      console.error("Failed to send waitlist notification:", err);
    }
  }

  return NextResponse.json({ success: true });
}
