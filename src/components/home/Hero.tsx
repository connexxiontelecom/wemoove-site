"use client";

import Link from "next/link";
import { useState } from "react";
import { FareEstimator } from "@/components/home/FareEstimator";
import { HeroPhone } from "@/components/home/HeroPhone";
import { RideMap } from "@/components/home/RideMap";
import { StoreBadges } from "@/components/ui/StoreBadges";
import type { Area } from "@/content/areas";
import { home } from "@/content/home";
import type { RideMode } from "@/lib/pricing";

const { hero } = home;

/** Entrance: CSS only, so text is visible before JavaScript finishes loading. 80ms stagger. */
const rise = (i: number) => ({
  className: "motion-safe:animate-rise",
  style: { animationDelay: `${i * 80}ms` },
});

export function Hero() {
  // State lives here so the estimator and the phone mockup stay in sync.
  const [pickup, setPickup] = useState<Area>(hero.estimator.defaultPickup);
  const [destination, setDestination] = useState<Area>(hero.estimator.defaultDestination);
  const [mode, setMode] = useState<RideMode>("shared");

  return (
    <section id="hero" className="bg-dot-grid relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2 md:py-16 lg:gap-16 lg:px-8">
        <div>
          <p {...rise(0)}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-ink ring-1 ring-line">
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              {hero.eyebrow}
            </span>
          </p>
          <h1
            className={`${rise(1).className} mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl`}
            style={rise(1).style}
          >
            {hero.titleStart}{" "}
            <span className="box-decoration-clone bg-[linear-gradient(transparent_64%,var(--color-brand)_64%,var(--color-brand)_90%,transparent_90%)]">
              {hero.titleEnd}
            </span>
          </h1>
          <p className={`${rise(2).className} mt-5 max-w-xl text-lg text-muted`} style={rise(2).style}>
            {hero.subtitle}
          </p>

          <div className={`${rise(3).className} mt-8`} style={rise(3).style}>
            <FareEstimator
              pickup={pickup}
              destination={destination}
              mode={mode}
              onPickupChange={setPickup}
              onDestinationChange={setDestination}
              onModeChange={setMode}
              header={
                // Phones only: the live map sits inside the card so it reacts right where people tap.
                <div
                  role="img"
                  aria-label={`${hero.estimator.mapLabel}: ${pickup} to ${destination}${mode === "shared" ? ", shared ride" : ""}.`}
                  className="relative aspect-[16/10] bg-map md:hidden"
                >
                  <RideMap pickup={pickup} destination={destination} mode={mode} variant="card" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-route motion-safe:animate-pulse" aria-hidden="true" />
                    {hero.estimator.mapLabel}
                  </span>
                </div>
              }
            />
          </div>

          <div
            className={`${rise(4).className} mt-8 flex flex-wrap items-center gap-x-6 gap-y-4`}
            style={rise(4).style}
          >
            <StoreBadges />
            <Link href="/#drive" className="inline-flex min-h-11 items-center font-bold text-ink underline-offset-4 hover:underline">
              {hero.driveLink}
            </Link>
          </div>
        </div>

        <div className="hidden justify-center motion-safe:animate-float-in md:flex md:justify-end lg:justify-center">
          <HeroPhone pickup={pickup} destination={destination} mode={mode} />
        </div>
      </div>
    </section>
  );
}
