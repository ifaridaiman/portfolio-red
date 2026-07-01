"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type LandingStage =
  | "arrival"
  | "character"
  | "headline"
  | "tags"
  | "cta";

/** Softer pacing — longer pauses let each beat breathe */
const STAGE_DELAYS: Record<LandingStage, number> = {
  arrival: 0,
  character: 400,
  headline: 1600,
  tags: 7200,
  cta: 8000,
};

const STAGES: LandingStage[] = [
  "arrival",
  "character",
  "headline",
  "tags",
  "cta",
];

function stageIndex(stage: LandingStage): number {
  return STAGES.indexOf(stage);
}

export function useLandingSequence() {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<LandingStage>(
    prefersReducedMotion ? "cta" : "arrival",
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage("cta");
      return;
    }

    const timers = STAGES.map((nextStage) =>
      window.setTimeout(() => setStage(nextStage), STAGE_DELAYS[nextStage]),
    );

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion]);

  const isAtLeast = (target: LandingStage) =>
    stageIndex(stage) >= stageIndex(target);

  return { stage, isAtLeast, prefersReducedMotion };
}
