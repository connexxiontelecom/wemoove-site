"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { RideModeScene } from "@/components/illustrations/RideModeScene";
import { Icon } from "@/components/ui/Icon";
import { home } from "@/content/home";
import { useReducedMotion } from "@/lib/motion";

const { rideModes } = home;
const NAMES = { solo: home.hero.chooser.options.solo.name, shared: home.hero.chooser.options.shared.name };

/** "Which ride fits this trip?": pick a moment, get a recommendation and a plain Solo vs Tag along table. */
export function RideModes() {
  const reduceMotion = useReducedMotion();
  const [momentId, setMomentId] = useState<string>(rideModes.moments[0].id);
  const moment = rideModes.moments.find((mo) => mo.id === momentId) ?? rideModes.moments[0];
  const pick = moment.pick;

  return (
    <section id="ride-modes" aria-labelledby="modes-title" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="font-bold text-muted">{rideModes.eyebrow}</p>
          <h2 id="modes-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {rideModes.title}
          </h2>
          <p data-reveal className="mt-4 text-lg text-muted">{rideModes.intro}</p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          {/* Moments */}
          <div data-reveal>
            <p id="moments-label" className="font-bold">
              {rideModes.momentsLabel}
            </p>
            <div role="group" aria-labelledby="moments-label" className="mt-4 grid grid-cols-2 gap-3">
              {rideModes.moments.map((mo) => {
                const selected = mo.id === momentId;
                return (
                  <button
                    key={mo.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setMomentId(mo.id)}
                    className={`flex min-h-14 items-center gap-3 rounded-2xl border px-4 py-3 text-left font-semibold transition-[background-color,border-color,color] duration-200 active:scale-[0.98] ${
                      selected ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/40"
                    }`}
                  >
                    <Icon name={mo.icon} className={`h-5 w-5 shrink-0 ${selected ? "text-brand" : "text-muted"}`} />
                    <span className="leading-snug">{mo.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommendation */}
          <div data-reveal className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <div className="grid items-center gap-6 sm:grid-cols-[1fr_10rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={moment.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6, transition: { duration: 0.12 } }}
                  transition={{ duration: reduceMotion ? 0 : 0.22 }}
                >
                  <p className="text-sm font-semibold text-muted">
                    {rideModes.bestPick} for “{moment.label.toLowerCase()}”
                  </p>
                  <p className="mt-1 text-4xl font-extrabold tracking-tight">{NAMES[pick]}</p>
                  <p className="mt-3 text-lg text-muted">{moment.reason}</p>
                </m.div>
              </AnimatePresence>
              <div className="mx-auto w-40 sm:w-full">
                <RideModeScene mode={pick} active youLabel={home.hero.chooser.legend.you} />
              </div>
            </div>

            {/* Solo vs Tag along */}
            <table className="mt-8 w-full border-collapse text-left text-sm sm:text-base">
              <caption className="sr-only">{rideModes.versusLabel}</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-20 pb-3 font-semibold text-muted sm:w-24">
                    <span className="sr-only">Compare</span>
                  </th>
                  {(["solo", "shared"] as const).map((mode) => (
                    <th key={mode} scope="col" className={`pb-3 pr-3 font-extrabold ${pick === mode ? "text-ink" : "text-muted"}`}>
                      {NAMES[mode]}
                      {pick === mode && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-brand align-middle" aria-hidden="true" />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rideModes.rows.map((row) => {
                  const key = moment.rows.includes(row.id);
                  return (
                    <tr key={row.id} className={`border-b border-line transition-colors duration-200 last:border-0 ${key ? "bg-brand/10" : ""}`}>
                      <th scope="row" className={`py-3.5 pl-3 font-semibold ${key ? "text-ink" : "text-muted"}`}>
                        <span className={`-ml-3 mr-2 inline-block h-4 w-[3px] rounded-full align-middle ${key ? "bg-brand" : "bg-transparent"}`} aria-hidden="true" />
                        {row.label}
                      </th>
                      <td className={`py-3.5 pr-3 ${pick === "solo" && key ? "font-bold text-ink" : "text-muted"}`}>{row.solo}</td>
                      <td className={`py-3.5 pr-3 ${pick === "shared" && key ? "font-bold text-ink" : "text-muted"}`}>{row.shared}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <a
              href="#download"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-[background-color,scale] hover:bg-night active:scale-[0.97]"
            >
              {rideModes.cta}
              <span className="sr-only"> to ride {NAMES[pick]}</span>
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
