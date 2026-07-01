"use client";

import { Building2, Cpu, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeBlurUp,
  SOFT_EASE,
  staggerContainer,
} from "../lib/motion-presets";

const PROOF_POINTS = [
  {
    icon: Users,
    title: "Embedded with teams",
    description:
      "I work alongside product owners and engineers on-site—translating policy, process, and pain points into shippable software.",
  },
  {
    icon: Cpu,
    title: "AI that survives production",
    description:
      "From prototypes to governed deployments: retrieval pipelines, agent workflows, and integrations built for enterprise constraints.",
  },
  {
    icon: Building2,
    title: "Outcomes over demos",
    description:
      "Government and enterprise environments demand reliability, auditability, and adoption—not slide decks.",
  },
] as const;

export function ExploreSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="explore"
      className="scroll-mt-6 border-t border-border/50 bg-muted/15 px-4 py-16 sm:scroll-mt-8 sm:px-6 sm:py-24 md:px-8 md:py-28"
      aria-labelledby="explore-heading"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-10 max-w-2xl sm:mb-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: SOFT_EASE }}
        >
          <p className="mb-2.5 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:mb-3 sm:text-[11px]">
            Why this portfolio
          </p>
          <h2
            id="explore-heading"
            className="font-heading text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl md:text-3xl"
          >
            Engineering at the point of impact
          </h2>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            This isn&apos;t a résumé on a page—it&apos;s a workspace. Explore
            shipped work, system thinking, and an AI assistant that knows how I
            build.
          </p>
        </motion.div>

        <motion.ul
          className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          variants={staggerContainer(0.14, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PROOF_POINTS.map(({ icon: Icon, title, description }) => (
            <motion.li
              key={title}
              variants={prefersReducedMotion ? undefined : fadeBlurUp}
              className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm sm:p-6"
            >
              <div className="mb-3.5 inline-flex size-8 items-center justify-center rounded-lg border border-border/70 bg-muted/40 text-muted-foreground sm:mb-4 sm:size-9">
                <Icon className="size-3.5 sm:size-4" aria-hidden="true" />
              </div>
              <h3 className="mb-1.5 text-sm font-medium text-foreground sm:mb-2">
                {title}
              </h3>
              <p className="text-[0.875rem] leading-relaxed text-muted-foreground sm:text-sm">
                {description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
