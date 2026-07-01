import type { Transition, Variants } from "motion/react";

/** Gentle ease-out — soft landing, no snap */
export const SOFT_EASE = [0.16, 1, 0.3, 1] as const;

/** Slow ambient fade for backgrounds */
export const AMBIENT_TRANSITION: Transition = {
  duration: 2,
  ease: [0.25, 0.1, 0.25, 1],
};

/** Standard element reveal */
export const REVEAL_TRANSITION: Transition = {
  duration: 1.15,
  ease: SOFT_EASE,
};

export const fadeBlurUp: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: REVEAL_TRANSITION,
  },
};

export const fadeBlurUpSubtle: Variants = {
  hidden: {
    opacity: 0,
    y: 4,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: SOFT_EASE,
    },
  },
};

export const staggerContainer = (stagger = 0.22, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const headlineLine: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: SOFT_EASE,
    },
  },
};
