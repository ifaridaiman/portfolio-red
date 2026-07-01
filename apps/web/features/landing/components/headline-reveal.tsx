"use client";

import { motion, useReducedMotion } from "motion/react";
import { headlineLine, SOFT_EASE, staggerContainer } from "../lib/motion-presets";

const HEADLINE_LINES = [
  { id: "hello", content: <>Hello.</> },
  { id: "name", content: <>I&apos;m Farid.</> },
  {
    id: "role",
    content: (
      <>
        Forward Deployed
        <br className="sm:hidden" /> Engineer.
      </>
    ),
  },
  {
    id: "mission",
    content: (
      <>
        Building AI-powered
        <br className="sm:hidden" /> enterprise software.
      </>
    ),
    className: "text-[0.82em] font-normal text-muted-foreground/90 sm:text-[0.88em]",
  },
] as const;

type HeadlineRevealProps = {
  active: boolean;
};

export function HeadlineReveal({ active }: HeadlineRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-[1.65rem] leading-[1.15] font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Hello.
          <br />
          I&apos;m Farid.
        </h1>
        <p className="mx-auto max-w-md px-1 text-[0.9rem] leading-relaxed text-muted-foreground sm:max-w-lg sm:text-base">
          Forward Deployed Engineer building AI-powered enterprise software
          that ships where it matters—in production, with the teams who use it.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 text-center sm:space-y-4" aria-live="polite">
      <motion.h1
        className="font-heading text-[1.65rem] leading-[1.2] font-medium tracking-tight text-foreground sm:text-4xl sm:leading-[1.15] md:text-5xl"
        variants={staggerContainer(0.95, 0)}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        {HEADLINE_LINES.map((line) => (
          <motion.span
            key={line.id}
            variants={headlineLine}
            className={`block ${"className" in line ? line.className : ""}`}
          >
            {line.content}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="mx-auto max-w-md px-1 text-[0.9rem] leading-relaxed text-muted-foreground sm:max-w-lg sm:text-base"
        initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
        animate={
          active
            ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  delay: HEADLINE_LINES.length * 0.95 + 0.5,
                  duration: 1.1,
                  ease: SOFT_EASE,
                },
              }
            : { opacity: 0, y: 4, filter: "blur(4px)" }
        }
      >
        I embed with stakeholders, ship production systems on-site, and turn
        complex requirements into software that lasts.
      </motion.p>
    </div>
  );
}
