"use client";

import * as React from "react";

interface AiLoaderProps {
  size?: number;
  text?: string;
}

export const AiLoader: React.FC<AiLoaderProps> = ({
  size = 120,
  text = "Generating",
}) => {
  const letters = text.split("");

  return (
    <div
      className="flex items-center justify-center w-full h-full overflow-hidden rounded-xl"
      style={{ backgroundColor: "#151b2d" }}
    >
      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block text-white opacity-40 animate-loaderLetter font-[family-name:var(--font-inter)] text-sm tracking-wide"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}

        <div className="absolute inset-0 rounded-full animate-loaderCircle" />
      </div>

      <style jsx>{`
        @keyframes loaderCircle {
          0% {
            transform: rotate(90deg);
            box-shadow:
              0 6px 12px 0 #4cd6ff inset,
              0 12px 18px 0 #00d1ff inset,
              0 36px 36px 0 #006383 inset,
              0 0 3px 1.2px rgba(76, 214, 255, 0.15),
              0 0 6px 1.8px rgba(0, 209, 255, 0.1);
          }
          50% {
            transform: rotate(270deg);
            box-shadow:
              0 6px 12px 0 #a4e6ff inset,
              0 12px 6px 0 #008394 inset,
              0 24px 36px 0 #00d1ff inset,
              0 0 3px 1.2px rgba(76, 214, 255, 0.15),
              0 0 6px 1.8px rgba(0, 209, 255, 0.1);
          }
          100% {
            transform: rotate(450deg);
            box-shadow:
              0 6px 12px 0 #4cd6ff inset,
              0 12px 18px 0 #00d1ff inset,
              0 36px 36px 0 #006383 inset,
              0 0 3px 1.2px rgba(76, 214, 255, 0.15),
              0 0 6px 1.8px rgba(0, 209, 255, 0.1);
          }
        }

        @keyframes loaderLetter {
          0%,
          100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.15);
          }
          40% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }

        .animate-loaderCircle {
          animation: loaderCircle 5s linear infinite;
        }

        .animate-loaderLetter {
          animation: loaderLetter 3s infinite;
        }
      `}</style>
    </div>
  );
};
