"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles } from "lucide-react";

const conversation = [
  { text: "Dispute filed: Visa 13.1 - Merchandise Not Received", isUser: true },
  {
    text: "Analyzing evidence... Found: tracking number, delivery confirmation, signed proof of delivery.",
    isUser: false,
  },
  { text: "Generate narrative for this dispute", isUser: true },
];

export function NarrativeDemo() {
  const [visibleMessages, setVisibleMessages] = useState<
    { text: string; isUser: boolean }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    cancelledRef.current = false;

    function runSequence() {
      if (cancelledRef.current) return;

      setVisibleMessages([]);
      setIsTyping(false);

      let delay = 600;

      conversation.forEach((msg, i) => {
        // Show typing
        addTimeout(() => {
          if (cancelledRef.current) return;
          setIsTyping(true);
        }, delay);

        delay += 1500;

        // Show message
        addTimeout(() => {
          if (cancelledRef.current) return;
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, msg]);
        }, delay);

        delay += 1200;
      });

      // Restart after pause
      addTimeout(() => {
        if (cancelledRef.current) return;
        clearAllTimeouts();
        runSequence();
      }, delay + 3000);
    }

    runSequence();

    return () => {
      cancelledRef.current = true;
      clearAllTimeouts();
    };
  }, [addTimeout, clearAllTimeouts]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleMessages, isTyping]);

  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden border border-white/5 flex flex-col"
      style={{ backgroundColor: "#151b2d" }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2 shrink-0">
        <Sparkles className="h-3.5 w-3.5 text-primary-container" />
        <span className="text-xs font-medium text-slate-300 font-[family-name:var(--font-inter)] uppercase tracking-widest">
          Narrative AI
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {visibleMessages.map((msg, i) => (
          <div
            key={`${i}-${msg.text.slice(0, 10)}`}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-narrativeFadeIn`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
                msg.isUser
                  ? "bg-primary-container/20 text-primary rounded-tr-none"
                  : "bg-surface-high/60 text-slate-300 rounded-tl-none border border-white/5"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-narrativeFadeIn">
            <div className="px-3 py-2 rounded-xl rounded-tl-none bg-surface-high/60 border border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes narrativeFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-narrativeFadeIn {
          animation: narrativeFadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
