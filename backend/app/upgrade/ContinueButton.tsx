"use client";

import { useState } from "react";

export function ContinueButton({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-semibold py-3 transition-colors"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setError(null);
          try {
            const res = await fetch("/api/billing/checkout-from-token", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ token }),
            });
            const body = await res.json();
            if (res.ok && body.url) {
              window.location.href = body.url;
              return;
            }
            setError(body.error ?? "Failed to start checkout");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Network error");
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading ? "Opening Stripe Checkout…" : "Continue to Stripe Checkout"}
      </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
