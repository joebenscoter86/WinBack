interface WelcomeEmail {
  subject: string;
  html: string;
}

export function buildWaitlistWelcomeEmail(): WelcomeEmail {
  return {
    subject: "You're on the WinBack waitlist",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to WinBack</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c1324; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0c1324;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color: #191f31; border-radius: 16px; border: 1px solid rgba(164, 230, 255, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 24px 40px;">
              <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">WinBack</span>
            </td>
          </tr>
          <!-- Headline -->
          <tr>
            <td style="padding: 0 40px 16px 40px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #a4e6ff; letter-spacing: -0.5px;">You're on the list.</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 32px 40px; color: #bbc9cf; font-size: 16px; line-height: 26px;">
              <p style="margin: 0 0 16px 0;">
                WinBack is a Stripe App that gives you step-by-step playbooks to win payment disputes. Built on 10+ years of issuer-side experience.
              </p>
              <p style="margin: 0 0 16px 0;">
                Pay 15% only when you win, or go flat at $79/month and keep every dollar you recover.
              </p>
              <p style="margin: 0;">
                We'll reach out when your spot is ready.
              </p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background-color: rgba(164, 230, 255, 0.1);"></div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 40px 40px; color: #859399; font-size: 12px; line-height: 20px;">
              WinBack &bull; winbackpay.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}
