"use client";

import { AnimatePresence, m } from "framer-motion";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { home } from "@/content/home";
import { RideModeScene } from "@/components/illustrations/RideModeScene";
import { useReducedMotion } from "@/lib/motion";
import { AUTO_MODE_MS, type RideMode } from "@/lib/ride";

type RideChooserProps = {
  mode: RideMode;
  onModeChange: (mode: RideMode) => void;
  /** Optional full-bleed content above the card body (the live map on phones). */
  header?: ReactNode;
  /** Heading level: h2 in the home hero, h3 inside a titled section. */
  headingLevel?: "h2" | "h3";
  /** Keeps radio names unique when more than one chooser is on a page. */
  id?: string;
  /** True while the chooser is flipping between the two cards on its own. */
  autoplaying?: boolean;
};

const copy = home.hero.chooser;
const MODES: RideMode[] = ["solo", "shared"];
/**
 * Solo vs Shared as two big picture cards, sold on what you get rather than a price.
 * No fares here on purpose: prices depend on live conditions the site can't know.
 */
export function RideChooser({ mode, onModeChange, header, headingLevel: Heading = "h2", id = "hero", autoplaying = false }: RideChooserProps) {
  const reduceMotion = useReducedMotion();
  const panel = copy.modes[mode];
  const name = `${id}-ride-mode`;

  return (
    <Card className="w-full max-w-md overflow-hidden p-5 sm:p-6">
      {header && <div className="-mx-5 -mt-5 mb-5 sm:-mx-6 sm:-mt-6">{header}</div>}
      <fieldset>
        <legend className="contents">
          <Heading className="text-lg font-bold">{copy.title}</Heading>
        </legend>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {MODES.map((value) => {
            const option = copy.options[value];
            const active = value === mode;
            return (
              <label
                key={value}
                className={`relative flex cursor-pointer flex-col rounded-2xl border-2 p-3 transition-[border-color,background-color,translate,box-shadow] duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/60 sm:p-4 ${
                  active ? "border-ink bg-brand/15 shadow-lg shadow-ink/10" : "border-line bg-white hover:-translate-y-0.5 hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name={name}
                  value={value}
                  checked={active}
                  onChange={() => onModeChange(value)}
                  className="sr-only"
                />
                <span
                  className={`absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                    active ? "border-ink bg-ink text-white" : "border-line bg-white text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  <Icon name="check" className="h-3 w-3" />
                </span>
                <span
                  className={`absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
                    value === "shared" ? "bg-save/10 text-save" : "bg-ink text-white"
                  }`}
                >
                  {option.badge}
                </span>
                <span className="-mx-1 pt-7">
                  <RideModeScene mode={value} active={active} youLabel={copy.legend.you} />
                </span>
                <span className="mt-2 text-lg font-extrabold leading-tight">{option.name}</span>
                <span className="text-sm leading-snug text-muted">{option.short}</span>
                {/* Countdown to the next card while auto-playing */}
                {active && autoplaying && (
                  <span className="absolute inset-x-3 bottom-1.5 h-1 overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
                    <span
                      key={mode}
                      className="block h-full origin-left rounded-full bg-ink animate-grow"
                      style={{ animationDuration: `${AUTO_MODE_MS}ms` }}
                    />
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Fixed min-height keeps the card from jumping when the copy swaps. */}
      <div className="mt-4 min-h-[6.75rem]" aria-live={autoplaying ? "off" : "polite"}>
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={mode}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="space-y-2"
          >
            {panel.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {point}
              </li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>

      <a
        href="#download"
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-[background-color,scale] hover:bg-night active:scale-[0.98]"
      >
        {mode === "solo" ? copy.ctaSolo : copy.ctaShared}
        <Icon name="arrowRight" className="h-4 w-4" />
      </a>
      <p className="mt-3 text-center text-sm text-muted">{copy.fareNote}</p>
    </Card>
  );
}
