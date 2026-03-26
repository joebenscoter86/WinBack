"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductHighlightCardProps {
  className?: string;
  categoryIcon: React.ReactNode;
  category: string;
  title: string;
  description: string;
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  ({ className, categoryIcon, category, title, description }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 300], [8, -8]);
    const rotateY = useTransform(mouseX, [0, 300], [-8, 8]);

    const springConfig = { stiffness: 300, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const glowX = useTransform(mouseX, [0, 300], [0, 100]);
    const glowY = useTransform(mouseY, [0, 300], [0, 100]);
    const glowOpacity = useTransform(mouseX, [0, 300], [0, 0.5]);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-[350px] w-[350px] rounded-2xl bg-card shadow-lg transition-shadow duration-300 hover:shadow-2xl",
          className
        )}
      >
        <div
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          className="absolute inset-3 rounded-xl bg-card-foreground/5 shadow-inner overflow-hidden"
        >
          {/* Grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Mouse-following glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(60px at ${glowX}% ${glowY}%, hsl(var(--primary)), transparent 40%)`,
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-5">
            <div className="flex items-center space-x-2 text-card-foreground">
              {categoryIcon}
              <span className="text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-widest">
                {category}
              </span>
            </div>

            <div className="text-card-foreground">
              <h3 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-plus-jakarta)]">
                {title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
