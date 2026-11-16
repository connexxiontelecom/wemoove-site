"use client";

import { AnimatePresence, m } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Toggle";
import { home } from "@/content/home";
import type { RideMode } from "@/lib/ride";

type RideChooserProps = {
  mode: RideMode;
  onModeChange: (mode: RideMode) => void;
  /** Optional full-bleed content above the card body (the live map on phones). */
  header?: ReactNode;
  /** Heading level: h2 in the home hero, h3 inside a titled section. */
  headingLevel?: "h2" | "h3";
};

const copy = home.hero.chooser;

/**
 * Solo vs Shared, sold on what you get rather than a price.
 * No fares here on purpose: prices depend on live conditions the site can't know.
 */
export function RideChooser({ mode, onModeChange, header, headingLevel: Heading = "h2" }: RideChooserProps) {
  const reduceMotion = useReducedMotion();
  const panel = copy.modes[mode];

  return (
    <Card className="w-full max-w-md overflow-hidden p-5 sm:p-6">
      {header && <div className="-mx-5 -mt-5 mb-5 sm:-mx-6 sm:-mt-6">{header}</div>}
      <Heading className="text-lg font-bold">{copy.title}</Heading>

      <div className="mt-4">
        <Toggle
          id="ride-mode"
          label={copy.toggleLabel}
          options={[
            { value: "solo", label: copy.solo },
            { value: "shared", label: copy.shared },
          ]}
          value={mode}
          onChange={onModeChange}
        />
      </div>

      {/* Fixed min-height keeps the card from jumping when the copy swaps. */}
      <div className="mt-5 min-h-[8.75rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={mode}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <p className="text-2xl font-extrabold tracking-tight">{panel.headline}</p>
            <ul className="mt-3 space-y-2">
              {panel.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </m.div>
        </AnimatePresence>
      </div>

      <a
        href="#download"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-[background-color,scale] hover:bg-night active:scale-[0.98]"
      >
        {copy.cta}
        <Icon name="arrowRight" className="h-4 w-4" />
      </a>
      <p className="mt-3 text-center text-sm text-muted">{copy.fareNote}</p>

    </Card>
  );
}
