"use client";

import { m, useReducedMotion } from "framer-motion";

type WheelProps = { cx: number; cy: number; r: number };

/** A wheel with spokes that spins (stays still for reduced motion). */
export function Wheel({ cx, cy, r }: WheelProps) {
  const reduceMotion = useReducedMotion();
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="fill-ink" />
      <circle cx={cx} cy={cy} r={r * 0.58} className="fill-line" />
      <m.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      >
        <circle cx={cx} cy={cy} r={r * 0.58} fill="none" />
        {[0, 60, 120].map((a) => {
          const rad = (a * Math.PI) / 180;
          const dx = Math.cos(rad) * r * 0.5;
          const dy = Math.sin(rad) * r * 0.5;
          return (
            <line key={a} x1={cx - dx} y1={cy - dy} x2={cx + dx} y2={cy + dy} className="stroke-muted" strokeWidth={2.5} strokeLinecap="round" />
          );
        })}
      </m.g>
      <circle cx={cx} cy={cy} r={r * 0.16} className="fill-ink" />
    </g>
  );
}
