"use client";

import { useState } from "react";
import { FareEstimator } from "@/components/home/FareEstimator";
import { RideMap } from "@/components/home/RideMap";
import type { Area } from "@/content/areas";
import { home } from "@/content/home";
import { ride } from "@/content/ride";
import type { RideMode } from "@/lib/pricing";

const { planner } = ride;
const estimator = home.hero.estimator;

/** Fare estimator beside a large live route map that follows every change. */
export function RidePlanner() {
  const [pickup, setPickup] = useState<Area>(estimator.defaultPickup);
  const [destination, setDestination] = useState<Area>(estimator.defaultDestination);
  const [mode, setMode] = useState<RideMode>("shared");

  return (
    <section id="plan" aria-labelledby="plan-title" className="scroll-mt-24 bg-night text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-bold text-brand">{planner.eyebrow}</p>
          <h2 id="plan-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {planner.title}
          </h2>
          <p className="mt-4 text-lg text-white/80">{planner.body}</p>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,28rem)_1fr]">
          <div className="order-2 text-ink lg:order-1">
            <FareEstimator
              pickup={pickup}
              destination={destination}
              mode={mode}
              onPickupChange={setPickup}
              onDestinationChange={setDestination}
              onModeChange={setMode}
            />
          </div>
          <div
            role="img"
            aria-label={`${estimator.mapLabel}: ${pickup} to ${destination}${mode === "shared" ? ", shared ride" : ""}.`}
            className="relative order-1 aspect-[16/10] overflow-hidden rounded-3xl bg-map shadow-2xl shadow-ink/50 ring-1 ring-white/10 lg:order-2"
          >
            <RideMap pickup={pickup} destination={destination} mode={mode} variant="card" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-ink shadow-sm">
              <span className="h-2 w-2 rounded-full bg-route motion-safe:animate-pulse" aria-hidden="true" />
              {estimator.mapLabel}
            </span>
          </div>
        </div>
        <p className="mt-6 text-sm text-white/70">{planner.note}</p>
      </div>
    </section>
  );
}
