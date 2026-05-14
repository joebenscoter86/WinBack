// backend/app/components/faq.tsx
"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "../content/faq";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-16 md:py-32">
      <div className="text-center mb-10 md:mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white tracking-tighter">
          Common questions.
        </h2>
      </div>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          return (
            <div
              key={item.question}
              className="bg-surface-low rounded-2xl border border-white/5 overflow-hidden"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-white font-[family-name:var(--font-plus-jakarta)] font-semibold"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`text-on-surface-variant transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div
                  id={panelId}
                  className="px-6 pb-6 text-on-surface-variant"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
