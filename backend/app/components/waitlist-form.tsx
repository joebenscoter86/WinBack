"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setFormState("success");
      } else {
        setFormState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (formState === "success") {
    return (
      <div className="text-center w-full">
        <p className="text-primary text-lg font-semibold font-[family-name:var(--font-plus-jakarta)]">
          You&apos;re on the list.
        </p>
        <p className="text-on-surface-variant text-sm mt-2">
          We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your work email"
          required
          className="flex-1 bg-surface-highest/40 border border-outline-variant/30 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="primary-cta-gradient text-on-primary-container px-8 py-4 rounded-xl font-[family-name:var(--font-plus-jakarta)] font-bold tracking-tight hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
        >
          {formState === "submitting" ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Joining...
            </span>
          ) : (
            "Join Waitlist"
          )}
        </button>
      </div>
      {formState === "error" && (
        <p className="text-error text-sm mt-3">{errorMessage}</p>
      )}
    </form>
  );
}
