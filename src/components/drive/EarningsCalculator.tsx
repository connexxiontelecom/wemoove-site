"use client";

import { AnimatePresence, m } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { useId, useState } from "react";
import { Card } from "@/components/ui/Card";
import { drive } from "@/content/drive";
import { weeklyEarnings } from "@/lib/earnings";
import { formatNaira } from "@/lib/format";

const copy = drive.earnings.calculator;

/** Hours × days sliders with an animated weekly estimate. Used on /drive only (no estimates on the home page). */
export function EarningsCalculator({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const id = useId();
  const [hours, setHours] = useState<number>(copy.defaultHours);
  const [days, setDays] = useState<number>(copy.defaultDays);
  const total = formatNaira(weeklyEarnings(hours, days));

  const sliders = [
    { key: "hours", label: copy.hoursLabel, value: hours, set: setHours, max: 12 },
    { key: "days", label: copy.daysLabel, value: days, set: setDays, max: 7 },
  ];

  return (
    <Card className={`p-6 sm:p-8 ${className}`}>
      <div className="space-y-6">
        {sliders.map((s) => (
          <div key={s.key}>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${id}-${s.key}`} className="font-semibold">
                {s.label}
              </label>
              <output htmlFor={`${id}-${s.key}`} className="text-lg font-extrabold tabular-nums">
                {s.value}
              </output>
            </div>
            <input
              id={`${id}-${s.key}`}
              type="range"
              min={1}
              max={s.max}
              step={1}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="mt-2 h-11 w-full cursor-pointer accent-ink"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-brand/20 p-5">
        <p className="text-sm font-semibold text-muted">{copy.resultLabel}</p>
        <div className="mt-1 flex h-12 items-end overflow-hidden" aria-hidden="true">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.p
              key={total}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="text-4xl font-extrabold leading-none tabular-nums"
            >
              ≈ {total}
              <span className="text-xl font-bold">{copy.resultSuffix}</span>
            </m.p>
          </AnimatePresence>
        </div>
        <p className="sr-only" aria-live="polite">
          {`${copy.resultLabel}: about ${total} per week.`}
        </p>
        <p className="mt-3 text-sm text-muted">{copy.disclaimer}</p>
      </div>
    </Card>
  );
}
