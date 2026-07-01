"use client";

import { motion, useReducedMotion } from "motion/react";
import { CapabilityTags } from "./capability-tags";
import { CharacterIllustration } from "./character-illustration";
import { HeadlineReveal } from "./headline-reveal";
import { LandingCtas } from "./landing-ctas";
import { ScrollIndicator } from "./scroll-indicator";
import { useLandingSequence } from "../hooks/use-landing-sequence";
import { AMBIENT_TRANSITION } from "../lib/motion-presets";

export function LandingHero() {
  const { isAtLeast } = useLandingSequence();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[100svh] flex-col"
      aria-label="Introduction"
    >
      <div className="sr-only">
        <h1>Hello. I&apos;m Farid.</h1>
        <p>
          Forward Deployed Engineer building AI-powered enterprise software
          that ships where it matters—in production, with the teams who use it.
        </p>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={AMBIENT_TRANSITION}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-background" />
        <motion.div
          className="absolute top-[-10%] left-1/2 h-[min(480px,70vw)] w-[min(720px,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.28_0.02_250/0.16),transparent_68%)]"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.7, 1, 0.7], scale: [1, 1.03, 1] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] bottom-[-5%] h-[min(320px,50vw)] w-[min(420px,70vw)] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.32_0.03_43/0.1),transparent_68%)]"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.6, 0.9, 0.6], scale: [1, 1.04, 1] }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </motion.div>

      {/* Scrollable on short viewports; centered when space allows */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-4 pb-[max(4.5rem,env(safe-area-inset-bottom))] pt-1 sm:px-6 sm:pb-24 md:px-8">
        <div className="flex w-full max-w-2xl flex-col items-center gap-4 py-2 sm:gap-6 sm:py-4 md:gap-7">
          <CharacterIllustration visible={isAtLeast("character")} />
          <HeadlineReveal active={isAtLeast("headline")} />
          <CapabilityTags visible={isAtLeast("tags")} />
          <LandingCtas visible={isAtLeast("cta")} />
        </div>
      </div>

      <ScrollIndicator visible={isAtLeast("cta")} />
    </section>
  );
}
