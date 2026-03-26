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
      <div className="text-center">
        <p className="text-primary text-lg font-semibold font-[family-name:var(--font-space-grotesk)]">
          You're on the list!
        </p>
        <p className="text-on-surface-variant text-sm mt-2">
          We'll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-surface-highest rounded px-4 py-3.5 text-on-surface placeholder:text-outline text-sm outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
        />
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-7 py-3.5 rounded text-sm whitespace-nowrap transition-opacity disabled:opacity-50 hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
        >
          {formState === "submitting" ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Joining...
            </span>
          ) : (
            "Join Waitlist"
          )}
        </button>
      </div>
      {formState === "error" && (
        <p className="text-tertiary-container text-sm mt-3 text-center">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
