"use client";

import { Check, Upload, FileText, ChevronRight } from "lucide-react";

const steps = ["Review", "Evidence", "Narrative", "Submit"];
const currentStep = 1; // 0-indexed, "Evidence" is active

export function HeroWidget() {
  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-primary-container/10 blur-[100px] rounded-full" />

      <div className="relative ethereal-blur glass-border-light p-1 rounded-2xl shadow-[0_40px_80px_rgba(7,13,31,0.6)] border border-white/5">
        <div className="bg-surface-low rounded-xl overflow-hidden border border-white/5">
          {/* Window chrome */}
          <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center bg-surface-high/40">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-error/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
            </div>
            <span className="text-[10px] font-[family-name:var(--font-inter)] uppercase tracking-widest text-slate-400">
              WinBack — Dispute Guide
            </span>
          </div>

          {/* Step progress */}
          <div className="px-6 pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        i < currentStep
                          ? "bg-primary-container text-on-primary-container"
                          : i === currentStep
                            ? "bg-primary-container/20 text-primary-container border border-primary-container/50"
                            : "bg-surface-high/60 text-slate-500"
                      }`}
                    >
                      {i < currentStep ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={`text-[9px] mt-1.5 font-[family-name:var(--font-inter)] tracking-wider uppercase ${
                        i <= currentStep ? "text-primary" : "text-slate-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-10 h-px mx-1.5 mb-5 ${
                        i < currentStep
                          ? "bg-primary-container"
                          : "bg-surface-high"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dispute context bar */}
          <div className="mx-6 px-4 py-3 rounded-lg bg-primary-container/5 border border-primary-container/10 flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-slate-400 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                Visa 13.1 — Merchandise Not Received
              </p>
              <p className="text-sm font-semibold text-white mt-0.5">
                $1,240.00
              </p>
            </div>
            <div className="bg-primary-container/15 text-primary-container px-2.5 py-1 rounded text-[9px] font-bold tracking-widest uppercase">
              12 days left
            </div>
          </div>

          {/* Evidence checklist */}
          <div className="px-6 pb-2">
            <p className="text-[10px] text-slate-400 font-[family-name:var(--font-inter)] uppercase tracking-widest mb-3">
              Required Evidence
            </p>

            <div className="space-y-2.5">
              {/* Completed items */}
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-high/30">
                <div className="w-5 h-5 rounded bg-primary-container/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-container" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-slate-300 font-medium">
                    Transaction details
                  </p>
                </div>
                <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-semibold">
                  Done
                </span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-high/30">
                <div className="w-5 h-5 rounded bg-primary-container/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-container" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-slate-300 font-medium">
                    Shipping confirmation
                  </p>
                </div>
                <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-semibold">
                  Done
                </span>
              </div>

              {/* Active upload item */}
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-container/5 border border-primary-container/20">
                <div className="w-5 h-5 rounded bg-surface-high/60 flex items-center justify-center">
                  <Upload className="h-3 w-3 text-primary-container" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-white font-medium">
                    Delivery confirmation
                  </p>
                  <p className="text-[9px] text-slate-400 mt-0.5">
                    Signed POD or carrier screenshot
                  </p>
                </div>
                <span className="text-[9px] text-primary-container uppercase tracking-wider font-semibold">
                  Upload
                </span>
              </div>

              {/* Pending item */}
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-high/20">
                <div className="w-5 h-5 rounded bg-surface-high/40 flex items-center justify-center">
                  <FileText className="h-3 w-3 text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-slate-500 font-medium">
                    Refund policy
                  </p>
                </div>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                  Pending
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 py-5">
            <div className="primary-cta-gradient rounded-lg py-3 flex items-center justify-center gap-2 cursor-default">
              <span className="text-on-primary-container font-[family-name:var(--font-plus-jakarta)] font-bold text-sm tracking-tight">
                Continue to Narrative
              </span>
              <ChevronRight className="h-4 w-4 text-on-primary-container" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
