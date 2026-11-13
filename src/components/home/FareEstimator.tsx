"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { AREAS, type Area } from "@/content/areas";
import { home } from "@/content/home";
import { formatNaira, getQuote, type RideMode } from "@/lib/pricing";

type FareEstimatorProps = {
  pickup: Area;
  destination: Area;
  mode: RideMode;
  onPickupChange: (area: Area) => void;
  onDestinationChange: (area: Area) => void;
  onModeChange: (mode: RideMode) => void;
};

const copy = home.hero.estimator;
const selectClass =
  "mt-1.5 block min-h-12 w-full rounded-xl border border-line bg-white px-3 font-semibold text-ink focus-visible:border-ink";

function isArea(value: string): value is Area {
  return (AREAS as readonly string[]).includes(value);
}

export function FareEstimator({
  pickup,
  destination,
  mode,
  onPickupChange,
  onDestinationChange,
  onModeChange,
}: FareEstimatorProps) {
  const reduceMotion = useReducedMotion();
  const quote = getQuote(pickup, destination);
  const price = quote ? (mode === "solo" ? quote.solo : quote.shared) : null;
  const display = price === null ? copy.sameArea : formatNaira(price);
  const showSavings = quote !== null && mode === "shared";
  const announcement =
    price === null
      ? copy.sameArea
      : `Estimated ${mode} fare from ${pickup} to ${destination}: ${display}.` +
        (showSavings ? ` ${copy.savingsPrefix} ${formatNaira(quote.savings)}.` : "");

  return (
    <Card className="w-full max-w-md p-5 sm:p-6">
      <h2 className="text-lg font-bold">{copy.title}</h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="fare-pickup" className="text-sm font-semibold text-muted">
            {copy.pickupLabel}
          </label>
          <select
            id="fare-pickup"
            value={pickup}
            onChange={(e) => isArea(e.target.value) && onPickupChange(e.target.value)}
            className={selectClass}
          >
            {AREAS.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fare-destination" className="text-sm font-semibold text-muted">
            {copy.destinationLabel}
          </label>
          <select
            id="fare-destination"
            value={destination}
            onChange={(e) => isArea(e.target.value) && onDestinationChange(e.target.value)}
            className={selectClass}
          >
            {AREAS.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <Toggle
          id="ride-mode"
          label="Ride type"
          options={[
            { value: "solo", label: copy.solo },
            { value: "shared", label: copy.shared },
          ]}
          value={mode}
          onChange={onModeChange}
          disabled={quote === null}
        />
      </div>

      {/* Fixed heights below keep the card from shifting as values change. */}
      <div className="mt-5 flex h-14 items-end overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.p
            key={display}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className={
              price === null
                ? "text-xl font-bold text-ink"
                : "text-5xl font-extrabold leading-none tracking-tight tabular-nums"
            }
          >
            {display}
          </m.p>
        </AnimatePresence>
      </div>
      <p className="mt-2 h-6 font-semibold text-save" aria-hidden="true">
        {showSavings && `${copy.savingsPrefix} ${formatNaira(quote.savings)} ${copy.savingsSuffix}`}
      </p>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <a
        href="#download"
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-night"
      >
        {copy.cta}
      </a>
    </Card>
  );
}
