"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { weeklyEarnings } from "@/lib/earnings";
import { formatNaira } from "@/lib/pricing";

const copy = home.driveEarn;

export function DriveEarn() {
  const reduceMotion = useReducedMotion();
  const [hours, setHours] = useState<number>(copy.defaultHours);
  const [days, setDays] = useState<number>(copy.defaultDays);
  const total = formatNaira(weeklyEarnings(hours, days));

  return (
    <section id="drive" aria-labelledby="drive-title" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p className="font-bold text-muted">{copy.eyebrow}</p>
          <h2 id="drive-title" className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight md:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{copy.body}</p>
          <ButtonLink href={site.driverSignupUrl} variant="dark" className="mt-8">
            {copy.cta}
          </ButtonLink>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="drive-hours" className="font-semibold">
                  {copy.hoursLabel}
                </label>
                <output htmlFor="drive-hours" className="text-lg font-extrabold tabular-nums">
                  {hours}
                </output>
              </div>
              <input
                id="drive-hours"
                type="range"
                min={1}
                max={12}
                step={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="mt-2 h-11 w-full cursor-pointer accent-ink"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="drive-days" className="font-semibold">
                  {copy.daysLabel}
                </label>
                <output htmlFor="drive-days" className="text-lg font-extrabold tabular-nums">
                  {days}
                </output>
              </div>
              <input
                id="drive-days"
                type="range"
                min={1}
                max={7}
                step={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-2 h-11 w-full cursor-pointer accent-ink"
              />
            </div>
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
      </div>
    </section>
  );
}
