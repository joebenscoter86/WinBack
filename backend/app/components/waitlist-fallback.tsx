// backend/app/components/waitlist-fallback.tsx

import { WaitlistForm } from "./waitlist-form";

export function WaitlistFallback() {
  return (
    <section
      id="waitlist"
      className="max-w-2xl mx-auto px-6 py-12 md:py-16 text-center"
    >
      <h3 className="text-xl md:text-2xl font-[family-name:var(--font-plus-jakarta)] font-bold text-white mb-2">
        Not on Stripe yet?
      </h3>
      <p className="text-on-surface-variant text-sm mb-6">
        Get a heads up when we add general signup.
      </p>
      <div className="flex justify-center">
        <WaitlistForm
          submitLabel="Get notified"
          placeholder="Enter your email"
          successTitle="We'll let you know."
          successBody="You're on the list for general signup."
        />
      </div>
    </section>
  );
}
