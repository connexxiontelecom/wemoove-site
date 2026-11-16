"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Toggle";
import { home } from "@/content/home";
import { useReducedMotion } from "@/lib/motion";
import type { RideMode } from "@/lib/ride";

const { howItWorks } = home;
const STEP_MS = 2600;
/** Where riders wait on the road (0 = step 1, 1 = step 4): between "Get matched" and "Ride together". */
const RIDER_STOPS = [0.78, 0.9];
const other = (mode: RideMode): RideMode => (mode === "solo" ? "shared" : "solo");

/*
  Desktop geometry: 4 columns with a 1.5rem gap, so column i's centre is
  i×25% + i×0.375rem + 12.5% − 0.5625rem. The road runs from column 1's centre to column 4's.
*/
const ROAD_START = "12.5% - 0.5625rem";
const ROAD_SPAN = "75% + 1.125rem";
const along = (t: number) => `calc(${ROAD_START} + ${t} * (${ROAD_SPAN}))`;

/** Four steps on a road the WeMoove car drives along, switchable between Solo and Tag along. */
export function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<RideMode>("shared");
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { amount: 0.4 });
  const current = howItWorks.modes[mode];
  const shared = mode === "shared";
  const last = current.steps.length - 1;
  const progress = active / last;

  // The car drives itself from step to step while the section is on screen.
  useEffect(() => {
    if (reduceMotion || hovering || !inView) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % (last + 1)), active === last ? STEP_MS * 1.6 : STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, hovering, inView, reduceMotion, last]);

  const switchMode = (next: RideMode) => {
    setMode(next);
    setActive(0);
  };

  const ridersAboard = shared && active === last;

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative overflow-hidden bg-night text-white">
      {/* Soft glow that follows the mode colour */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl transition-colors duration-700 ${
          shared ? "bg-route/30" : "bg-brand/20"
        }`}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p data-reveal className="font-bold text-brand">{howItWorks.eyebrow}</p>
            <h2 id="how-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
              {howItWorks.title}
            </h2>
          </div>
          <div data-reveal className="w-full max-w-xs text-ink">
            <Toggle
              id="how-mode"
              label={howItWorks.toggleLabel}
              options={[
                { value: "solo", label: howItWorks.modes.solo.label },
                { value: "shared", label: howItWorks.modes.shared.label },
              ]}
              value={mode}
              onChange={switchMode}
            />
          </div>
        </div>

        <p className="mt-5 min-h-14 text-lg font-semibold text-white/85 sm:min-h-7" aria-live="polite">
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

        <ol
          ref={listRef}
          onMouseLeave={() => setHovering(false)}
          className="relative mt-10 grid gap-x-6 gap-y-4 lg:mt-12 lg:grid-cols-4 lg:pt-24"
        >
          {/* Road (desktop) */}
          <li aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-16 list-none lg:block">
            <span
              className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full bg-white/10"
              style={{ left: along(0), width: `calc(${ROAD_SPAN})` }}
            />
            <span
              className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.25)_0_12px,transparent_12px_24px)]"
              style={{ left: along(0), width: `calc(${ROAD_SPAN})` }}
            />
            {/* Distance driven */}
            <span
              className={`absolute top-1/2 h-3 -translate-y-1/2 rounded-full transition-[width,background-color] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                shared ? "bg-route" : "bg-brand"
              }`}
              style={{ left: along(0), width: `calc(${progress} * (${ROAD_SPAN}))` }}
            />
            {/* Step stops */}
            {current.steps.map((_, i) => (
              <span
                key={i}
                className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-night transition-colors duration-500 ${
                  i <= active ? (shared ? "bg-route" : "bg-brand") : "bg-white/25"
                }`}
                style={{ left: along(i / last) }}
              />
            ))}
            {/* Riders waiting for a Tag along pickup; they hop in as the car passes */}
            <AnimatePresence>
              {shared &&
                RIDER_STOPS.map((t, i) =>
                  progress < t ? (
                    <m.span
                      key={t}
                      className="absolute top-1/2 -translate-x-1/2"
                      style={{ left: along(t), marginTop: "-3.4rem" }}
                      initial={reduceMotion ? false : { scale: 0, y: 8 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0, y: 20, transition: { duration: 0.25, delay: reduceMotion ? 0 : 0.25 + i * 0.2 } }}
                      transition={{ type: "spring", stiffness: 420, damping: 18, delay: reduceMotion ? 0 : i * 0.12 }}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-route shadow-lg ring-[3px] ring-route motion-safe:animate-bounce">
                        <Icon name="user" className="h-4 w-4" />
                      </span>
                    </m.span>
                  ) : null,
                )}
            </AnimatePresence>
            {/* The car */}
            <span
              className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ left: along(progress) }}
            >
              <span
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-ink ring-[6px] ring-night transition-shadow duration-500 ${
                  shared ? "shadow-[0_10px_34px_-2px] shadow-route/70" : "shadow-[0_10px_34px_-2px] shadow-brand/60"
                }`}
              >
                <Icon name="car" className="h-7 w-7" />
                <AnimatePresence>
                  {ridersAboard && (
                    <m.span
                      className="absolute -right-2.5 -top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-route px-1.5 text-xs font-extrabold text-white ring-2 ring-night"
                      initial={reduceMotion ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 16, delay: reduceMotion ? 0 : 0.65 }}
                    >
                      +2
                    </m.span>
                  )}
                </AnimatePresence>
              </span>
            </span>
          </li>

          {/* Steps */}
          {current.steps.map((step, i) => {
            const changed = howItWorks.modes[other(mode)].steps[i].title !== step.title;
            const isActive = i === active;
            const reached = i <= active;
            return (
              <li
                key={i}
                className="relative flex gap-4 lg:block"
                onMouseEnter={() => {
                  setHovering(true);
                  setActive(i);
                }}
              >
                {/* Phones and tablets: number + vertical road */}
                <span className="relative flex w-12 shrink-0 flex-col items-center lg:hidden" aria-hidden="true">
                  <span
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold transition-colors duration-500 ${
                      reached ? (shared ? "bg-route text-white" : "bg-brand text-ink") : "bg-white/10 text-white"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {i < last && (
                    <span className="relative -mb-4 mt-1 w-1 flex-1 overflow-hidden rounded-full bg-white/10">
                      <span
                        className={`absolute inset-x-0 top-0 rounded-full transition-[height] duration-700 ${shared ? "bg-route" : "bg-brand"}`}
                        style={{ height: i < active ? "100%" : "0%" }}
                      />
                    </span>
                  )}
                </span>

                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={step.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -12, transition: { duration: 0.15 } }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative min-w-0 flex-1 overflow-hidden rounded-3xl p-6 transition-[background-color,color,translate,box-shadow] duration-500 lg:h-full lg:p-7 ${
                      isActive ? "bg-white text-ink shadow-2xl shadow-black/40 lg:-translate-y-2" : "bg-white/[0.06] text-white ring-1 ring-white/10"
                    }`}
                  >
                    {/* Big ghost number */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-1 -top-5 select-none text-[7rem] font-extrabold leading-none tracking-tighter transition-colors duration-500 ${
                        isActive ? "text-ink/[0.07]" : "text-white/[0.05]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative flex flex-wrap items-center gap-3">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-500 ${
                          isActive ? (shared ? "bg-route text-white" : "bg-brand text-ink") : "bg-white/10 text-white"
                        }`}
                      >
                        <Icon name={step.icon} className="h-6 w-6" />
                      </span>
                      {changed && (
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-extrabold transition-colors duration-500 ${
                            isActive
                              ? shared
                                ? "bg-route/10 text-route"
                                : "bg-brand/25 text-ink"
                              : shared
                                ? "bg-route/40 text-white"
                                : "bg-brand/20 text-brand"
                          }`}
                        >
                          {current.label}
                        </span>
                      )}
                    </span>
                    <h3 className="relative mt-5 text-xl font-bold lg:text-2xl">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className={`relative mt-2 transition-colors duration-500 ${isActive ? "text-muted" : "text-white/70"}`}>{step.body}</p>
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
