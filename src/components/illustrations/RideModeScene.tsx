"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId } from "react";
import { useReducedMotion } from "@/lib/motion";
import type { RideMode } from "@/lib/ride";

type RideModeSceneProps = { mode: RideMode; active: boolean; youLabel: string };

type Person = { x: number; you?: boolean; skin: string; shirt: string };

/** Who's on the back seat, seen through the rear windscreen. */
const SEATS: Record<RideMode, Person[]> = {
  solo: [{ x: 100, you: true, skin: "fill-skin", shirt: "fill-pin" }],
  shared: [
    { x: 70, skin: "fill-skin-light", shirt: "fill-route" },
    { x: 100, you: true, skin: "fill-skin", shirt: "fill-pin" },
    { x: 130, skin: "fill-skin-dark", shirt: "fill-save" },
  ],
};

/**
 * The amber WeMoove car from behind, looking in at the back seat.
 * Solo: just you. Tag along: you between two riders going your way.
 */
export function RideModeScene({ mode, active, youLabel }: RideModeSceneProps) {
  const reduceMotion = useReducedMotion();
  const clipId = `rear-glass-${useId().replace(/:/g, "")}`;
  const people = SEATS[mode];
  const you = people.find((p) => p.you)!;
  const glass = "M45 66 L57 26 Q59 20 66 20 H134 Q141 20 143 26 L155 66 Z";

  return (
    <svg viewBox="0 -14 200 138" className="h-auto w-full" aria-hidden="true">
      {/* Ground shadow */}
      <ellipse cx="100" cy="118" rx="86" ry="5" className="fill-ink" opacity={0.15} />

      <m.g
        animate={active && !reduceMotion ? { y: [0, -1.5, 0] } : { y: 0 }}
        transition={{ duration: 0.7, repeat: active && !reduceMotion ? Infinity : 0, ease: "easeInOut" }}
      >
        {/* Tyres */}
        <rect x="24" y="100" width="24" height="17" rx="5" className="fill-ink" />
        <rect x="152" y="100" width="24" height="17" rx="5" className="fill-ink" />
        {/* Cabin and body */}
        <path d="M34 70 L48 22 Q51 12 62 12 H138 Q149 12 152 22 L166 70 Z" className="fill-brand stroke-ink" strokeWidth={2.5} strokeLinejoin="round" />
        <rect x="10" y="64" width="180" height="42" rx="14" className="fill-brand stroke-ink" strokeWidth={2.5} />
        {/* Rear glass with the back seat inside */}
        <clipPath id={clipId}>
          <path d={glass} />
        </clipPath>
        <path d={glass} className="fill-map" />
        <g clipPath={`url(#${clipId})`}>
          {/* Seat backs */}
          {[70, 100, 130].map((x) => (
            <rect key={x} x={x - 14} y={40} width={28} height={30} rx={8} className="fill-night" opacity={0.18} />
          ))}
          <AnimatePresence initial={false}>
            {people.map((p, i) => (
              <m.g
                key={`${mode}-${p.x}`}
                initial={reduceMotion ? false : { y: 30 }}
                animate={{ y: active ? 0 : 2 }}
                exit={{ y: 30 }}
                transition={{ type: "spring", stiffness: 360, damping: 16, delay: reduceMotion ? 0 : i * 0.07 }}
              >
                <path d={`M${p.x - 15} 70 C${p.x - 15} 56 ${p.x + 15} 56 ${p.x + 15} 70 Z`} className={p.shirt} />
                <circle cx={p.x} cy={43} r={10} className={p.skin} />
              </m.g>
            ))}
          </AnimatePresence>
        </g>
        {/* Tail lights, plate */}
        <rect x="16" y="72" width="22" height="10" rx="4" className="fill-pin" />
        <rect x="162" y="72" width="22" height="10" rx="4" className="fill-pin" />
        <rect x="72" y="82" width="56" height="16" rx="5" className="fill-white stroke-ink" strokeWidth={1.5} />
        <image href="/brand/01_Logo/Horizontal/WeMoove_Logo_Horizontal_Color.svg" x="80" y="83" width="40" height="14" />
      </m.g>

      {/* "You" tag */}
      <g transform={`translate(${you.x} 0)`}>
        <rect x="-21" y="-13" width="42" height="21" rx="10.5" className={active ? "fill-ink" : "fill-muted"} />
        <path d="M-5 7 L0 13 L5 7 Z" className={active ? "fill-ink" : "fill-muted"} />
        <text y="1.5" textAnchor="middle" className="fill-white text-[12px] font-extrabold">
          {youLabel}
        </text>
      </g>
    </svg>
  );
}
