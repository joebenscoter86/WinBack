import { describe, it, expect } from "vitest";
import { buildWaitlistWelcomeEmail } from "../waitlist-welcome";

describe("buildWaitlistWelcomeEmail", () => {
  it("returns an object with subject and html", () => {
    const result = buildWaitlistWelcomeEmail();
    expect(result).toHaveProperty("subject");
    expect(result).toHaveProperty("html");
    expect(typeof result.subject).toBe("string");
    expect(typeof result.html).toBe("string");
  });

  it("includes WinBack branding in html", () => {
    const { html } = buildWaitlistWelcomeEmail();
    expect(html).toContain("WinBack");
    expect(html).toContain("You're on the list");
  });

  it("includes the value prop", () => {
    const { html } = buildWaitlistWelcomeEmail();
    expect(html).toContain("15%");
    expect(html).toContain("$79/month");
  });

  it("does not contain em dashes", () => {
    const { html } = buildWaitlistWelcomeEmail();
    expect(html).not.toContain("\u2014");
  });
});
