"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SOFT_EASE } from "../lib/motion-presets";

type ScrollIndicatorProps = {
  visible: boolean;
  targetId?: string;
};

export function ScrollIndicator({
  visible,
  targetId = "explore",
}: ScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to learn more"
      className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-0.5 text-muted-foreground/80 transition-colors hover:text-foreground"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
      animate={
        visible
          ? {
              opacity: 1,
              y: 0,
              transition: { delay: 0.6, duration: 1, ease: SOFT_EASE },
            }
          : { opacity: 0, y: 4 }
      }
    >
      <span className="text-[9px] font-medium tracking-[0.22em] uppercase sm:text-[10px]">
        Scroll
      </span>
      <motion.span
        animate={
          prefersReducedMotion || !visible ? undefined : { y: [0, 3, 0] }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
        }}
      >
        <ChevronDown className="size-3.5 sm:size-4" aria-hidden="true" />
      </motion.span>
    </motion.button>
  );
}
