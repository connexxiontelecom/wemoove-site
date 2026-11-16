"use client";

import { useState } from "react";
import { RideChooser } from "@/components/home/RideChooser";
import { RideMap } from "@/components/home/RideMap";
import { home } from "@/content/home";
import { ride } from "@/content/ride";
import { useShowcaseRoute, type RideMode } from "@/lib/ride";

const { planner } = ride;
const chooser = home.hero.chooser;

/** Solo/Shared chooser beside a large map touring sample Abuja trips. No prices. */
export function RidePlanner() {
  const [mode, setMode] = useState<RideMode>("shared");
  const { pickup, destination } = useShowcaseRoute();

  return (
    <section id="plan" aria-labelledby="plan-title" className="scroll-mt-24 bg-night text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="font-bold text-brand">{planner.eyebrow}</p>
          <h2 id="plan-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {planner.title}
          </h2>
          <p data-reveal className="mt-4 text-lg text-white/80">{planner.body}</p>
        </div>

        <div data-reveal-stagger className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,28rem)_1fr]">
          <div className="order-2 text-ink lg:order-1">
            <RideChooser mode={mode} onModeChange={setMode} headingLevel="h3" />
          </div>
          <div
            role="img"
            aria-label={`${chooser.mapLabel}: ${pickup} to ${destination}${mode === "shared" ? ", shared ride" : ""}.`}
            className="relative order-1 aspect-[16/10] overflow-hidden rounded-3xl bg-map shadow-2xl shadow-ink/50 ring-1 ring-white/10 lg:order-2"
          >
            <RideMap pickup={pickup} destination={destination} mode={mode} variant="card" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-ink shadow-sm">
              <span className="h-2 w-2 rounded-full bg-route motion-safe:animate-pulse" aria-hidden="true" />
              {chooser.mapLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
