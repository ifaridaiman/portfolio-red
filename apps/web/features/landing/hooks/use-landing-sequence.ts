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
  const [animatedStage, setAnimatedStage] = useState<LandingStage>("arrival");

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timers = STAGES.map((nextStage) =>
      window.setTimeout(
        () => setAnimatedStage(nextStage),
        STAGE_DELAYS[nextStage],
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion]);

  const stage: LandingStage = prefersReducedMotion ? "cta" : animatedStage;

  const isAtLeast = (target: LandingStage) =>
    stageIndex(stage) >= stageIndex(target);

  return { stage, isAtLeast, prefersReducedMotion };
}
