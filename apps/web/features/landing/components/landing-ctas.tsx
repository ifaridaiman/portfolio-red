"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { fadeBlurUp, staggerContainer } from "../lib/motion-presets";

type LandingCtasProps = {
  visible: boolean;
};

export function LandingCtas({ visible }: LandingCtasProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex w-full max-w-sm flex-col items-stretch gap-2.5 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-3"
      variants={staggerContainer(0.15, 0)}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      <motion.div
        variants={prefersReducedMotion ? undefined : fadeBlurUp}
        className="w-full sm:w-auto"
      >
        <Button
          nativeButton={false}
          render={<Link href="/portfolio" />}
          size="lg"
          className="h-11 w-full sm:h-10 sm:min-w-[200px] sm:w-auto"
        >
          Explore Portfolio
          <ArrowRight data-icon="inline-end" />
        </Button>
      </motion.div>
      <motion.div
        variants={prefersReducedMotion ? undefined : fadeBlurUp}
        className="w-full sm:w-auto"
      >
        <Button
          nativeButton={false}
          render={<Link href="/contact" />}
          variant="outline"
          size="lg"
          className="h-11 w-full sm:h-10 sm:min-w-[200px] sm:w-auto"
        >
          <MessageSquare data-icon="inline-start" />
          <span className="truncate">Get in Touch</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
