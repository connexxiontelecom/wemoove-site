"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Toggle";
import { home } from "@/content/home";
import { useReducedMotion } from "@/lib/motion";
import type { RideMode } from "@/lib/ride";

const { howItWorks } = home;
const other = (mode: RideMode): RideMode => (mode === "solo" ? "shared" : "solo");

/** Four steps on a route line, switchable between Solo and Tag along. */
export function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<RideMode>("shared");
  const current = howItWorks.modes[mode];
  const shared = mode === "shared";

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p data-reveal className="font-bold text-muted">{howItWorks.eyebrow}</p>
            <h2 id="how-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
              {howItWorks.title}
            </h2>
          </div>
          <div data-reveal className="w-full max-w-xs">
            <Toggle
              id="how-mode"
              label={howItWorks.toggleLabel}
              options={[
                { value: "solo", label: howItWorks.modes.solo.label },
                { value: "shared", label: howItWorks.modes.shared.label },
              ]}
              value={mode}
              onChange={setMode}
            />
          </div>
        </div>

        <p className="mt-5 min-h-14 text-lg font-semibold sm:min-h-7" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={mode}
              className="inline-block"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              {current.summary}
            </m.span>
          </AnimatePresence>
        </p>

        <ol data-reveal-stagger className="relative mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-8 lg:mt-10 lg:grid-cols-4">
          {/* Route line from step 1 to step 4 (desktop) */}
          <span
            aria-hidden="true"
            className={`absolute left-6 right-[calc(25%-2.625rem)] top-6 hidden h-1 rounded-full transition-colors duration-500 lg:block ${
              shared ? "bg-route" : "bg-ink"
            }`}
          />
          {/* On Tag along, riders join along the route */}
          <AnimatePresence>
            {shared &&
              // Column gap is 1.5rem, so step n's number sits at n×(100% + 1.5rem)/4 + 1.5rem.
              // Two riders join on the stretch between "Get matched" (3) and "Ride together" (4).
              ["calc(58.333% + 2.375rem)", "calc(66.667% + 2.5rem)"].map((left, i) => (
                <m.span
                  key={left}
                  aria-hidden="true"
                  className="absolute top-6 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-route ring-[3px] ring-route lg:flex"
                  style={{ left }}
                  initial={reduceMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18, delay: reduceMotion ? 0 : 0.15 + i * 0.12 }}
                >
                  <Icon name="user" className="h-4 w-4" />
                </m.span>
              ))}
          </AnimatePresence>

          {current.steps.map((step, i) => {
            const changed = howItWorks.modes[other(mode)].steps[i].title !== step.title;
            return (
              <li key={i} className="relative flex gap-4 lg:block">
                {/* Phones: vertical route line down to the next step */}
                {i < current.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-5 left-[1.375rem] top-12 w-1 rounded-full transition-colors duration-500 sm:hidden ${shared ? "bg-route" : "bg-ink"}`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ring-8 ring-white transition-colors duration-300 ${
                    changed ? "bg-brand text-ink" : "bg-ink text-white"
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={step.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10, transition: { duration: 0.15 } }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : i * 0.04 }}
                    className={`min-w-0 flex-1 rounded-3xl border p-5 sm:p-6 lg:mt-5 lg:h-[calc(100%-4.25rem)] ${
                      changed ? "border-brand bg-brand/10" : "border-line bg-paper"
                    }`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink shadow-sm ring-1 ring-line">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-xl font-bold">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-muted">{step.body}</p>
                  </m.div>
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
