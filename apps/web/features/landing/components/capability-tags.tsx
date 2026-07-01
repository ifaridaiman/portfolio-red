"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  fadeBlurUpSubtle,
  staggerContainer,
} from "../lib/motion-presets";

const CAPABILITIES = [
  "AI Systems",
  "Full-Stack",
  "System Design",
  "Enterprise Delivery",
] as const;

type CapabilityTagsProps = {
  visible: boolean;
};

export function CapabilityTags({ visible }: CapabilityTagsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.ul
      className="flex max-w-sm flex-wrap items-center justify-center gap-1.5 sm:max-w-none sm:gap-2"
      aria-label="Core capabilities"
      variants={staggerContainer(0.12, 0)}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      {CAPABILITIES.map((tag) => (
        <motion.li
          key={tag}
          variants={prefersReducedMotion ? undefined : fadeBlurUpSubtle}
        >
          <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted-foreground uppercase backdrop-blur-sm sm:px-3 sm:text-[11px]">
            {tag}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
