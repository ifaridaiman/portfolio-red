"use client";

import { motion, useReducedMotion } from "motion/react";
import { SOFT_EASE } from "../lib/motion-presets";

type CharacterIllustrationProps = {
  visible: boolean;
};

export function CharacterIllustration({ visible }: CharacterIllustrationProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[168px] sm:max-w-[220px] md:max-w-[260px]"
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, scale: 0.98, y: 8, filter: "blur(10px)" }
      }
      animate={
        visible
          ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.98, y: 8, filter: "blur(10px)" }
      }
      transition={{ duration: 1.4, ease: SOFT_EASE }}
    >
      <motion.div
        className="absolute inset-x-6 -bottom-1 h-6 rounded-full bg-foreground/6 blur-2xl sm:inset-x-8 sm:-bottom-2 sm:h-8"
        animate={
          visible && !prefersReducedMotion
            ? { opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.02, 0.95] }
            : { opacity: 0.5, scale: 1 }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-auto w-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="desk-top" x1="40" y1="180" x2="280" y2="220">
            <stop stopColor="oklch(0.32 0.01 43)" />
            <stop offset="1" stopColor="oklch(0.24 0.01 43)" />
          </linearGradient>
          <linearGradient id="screen-glow" x1="120" y1="90" x2="200" y2="150">
            <stop stopColor="oklch(0.72 0.08 250)" />
            <stop offset="1" stopColor="oklch(0.55 0.06 250)" />
          </linearGradient>
          <linearGradient id="shirt" x1="130" y1="120" x2="190" y2="180">
            <stop stopColor="oklch(0.88 0.02 67)" />
            <stop offset="1" stopColor="oklch(0.78 0.02 67)" />
          </linearGradient>
        </defs>

        <rect
          x="48"
          y="36"
          width="224"
          height="140"
          rx="12"
          fill="oklch(0.22 0.01 43)"
          stroke="oklch(1 0 0 / 8%)"
          strokeWidth="1"
        />
        <rect
          x="64"
          y="52"
          width="80"
          height="6"
          rx="3"
          fill="oklch(1 0 0 / 12%)"
        />
        <rect
          x="64"
          y="68"
          width="120"
          height="4"
          rx="2"
          fill="oklch(1 0 0 / 8%)"
        />
        <rect
          x="64"
          y="80"
          width="96"
          height="4"
          rx="2"
          fill="oklch(1 0 0 / 6%)"
        />

        <path
          d="M32 196 L160 168 L288 196 L160 224 Z"
          fill="url(#desk-top)"
          stroke="oklch(1 0 0 / 10%)"
          strokeWidth="1"
        />
        <path
          d="M32 196 L32 210 L160 238 L160 224 Z"
          fill="oklch(0.2 0.01 43)"
        />
        <path
          d="M288 196 L288 210 L160 238 L160 224 Z"
          fill="oklch(0.18 0.01 43)"
        />

        <path
          d="M108 178 L212 178 L218 188 L102 188 Z"
          fill="oklch(0.28 0.01 43)"
          stroke="oklch(1 0 0 / 12%)"
          strokeWidth="1"
        />
        <path
          d="M114 152 L206 152 L212 178 L108 178 Z"
          fill="oklch(0.16 0.01 43)"
          stroke="oklch(1 0 0 / 10%)"
          strokeWidth="1"
        />
        <rect
          x="122"
          y="158"
          width="76"
          height="44"
          rx="3"
          fill="url(#screen-glow)"
          opacity="0.9"
        />
        <rect
          x="128"
          y="164"
          width="28"
          height="3"
          rx="1.5"
          fill="oklch(1 0 0 / 35%)"
        />
        <rect
          x="128"
          y="172"
          width="48"
          height="2"
          rx="1"
          fill="oklch(1 0 0 / 20%)"
        />
        <rect
          x="128"
          y="178"
          width="40"
          height="2"
          rx="1"
          fill="oklch(1 0 0 / 15%)"
        />

        <ellipse cx="160" cy="118" rx="28" ry="30" fill="oklch(0.68 0.06 55)" />
        <path
          d="M136 108 C138 96 150 88 160 88 C170 88 182 96 184 108 C182 100 172 94 160 94 C148 94 138 100 136 108 Z"
          fill="oklch(0.22 0.02 43)"
        />
        <ellipse cx="152" cy="112" rx="2.5" ry="3" fill="oklch(0.18 0.02 43)" />
        <ellipse cx="168" cy="112" rx="2.5" ry="3" fill="oklch(0.18 0.02 43)" />
        <path
          d="M154 122 Q160 126 166 122"
          stroke="oklch(0.45 0.04 43)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M132 148 C132 132 188 132 188 148 L192 178 L128 178 Z"
          fill="url(#shirt)"
        />
        <path
          d="M148 148 L160 156 L172 148"
          stroke="oklch(0.65 0.02 67)"
          strokeWidth="1"
          fill="none"
        />

        <path
          d="M132 154 C118 162 110 172 108 178"
          stroke="oklch(0.68 0.06 55)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M188 154 C202 162 210 172 212 178"
          stroke="oklch(0.68 0.06 55)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        <rect
          x="228"
          y="168"
          width="16"
          height="18"
          rx="3"
          fill="oklch(0.55 0.03 43)"
          stroke="oklch(1 0 0 / 10%)"
        />
        <path
          d="M244 174 C250 174 252 178 252 182 C252 186 250 188 244 188"
          stroke="oklch(0.55 0.03 43)"
          strokeWidth="2"
          fill="none"
        />

        <ellipse cx="72" cy="172" rx="10" ry="4" fill="oklch(0.28 0.02 145)" />
        <path
          d="M72 172 C68 158 64 148 70 140 C74 148 72 158 72 172 Z"
          fill="oklch(0.42 0.08 145)"
        />
        <path
          d="M76 170 C80 156 86 150 82 142 C78 150 76 160 76 170 Z"
          fill="oklch(0.38 0.07 145)"
        />
      </svg>
    </motion.div>
  );
}
