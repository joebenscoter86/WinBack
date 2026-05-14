// @vitest-environment jsdom
// backend/app/components/__tests__/waitlist-form.test.tsx

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WaitlistForm } from "../waitlist-form";

// Per-file jsdom override. The Vitest default for this repo is Node — the
// 30+ existing server-side tests (middleware, Stripe auth, dispute submit,
// webhooks) need Node and must NOT be switched to jsdom.
//
// NEXT_PUBLIC_TURNSTILE_SITE_KEY is captured at module load in waitlist-form.tsx
// (`const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY`),
// so vi.stubEnv after import would be a no-op. Vitest does not load .env.local
// by default, so the constant is undefined here, the Turnstile widget does not
// render, and the assertions below run against a clean form.

describe("WaitlistForm", () => {
  it("renders default copy when no props are passed", () => {
    render(<WaitlistForm />);
    expect(
      screen.getByRole("button", { name: /join waitlist/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your work email/i)
    ).toBeInTheDocument();
  });

  it("renders override copy when props are passed", () => {
    render(
      <WaitlistForm
        submitLabel="Get notified"
        placeholder="Enter your email"
        successTitle="We'll let you know."
        successBody="You're on the list for general signup."
      />
    );
    expect(
      screen.getByRole("button", { name: /get notified/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/^enter your email$/i)
    ).toBeInTheDocument();
  });
});
