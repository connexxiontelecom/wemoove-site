"use client";

import { SectionLink } from "@/components/ui/SectionLink";
import { HeroPhone } from "@/components/home/HeroPhone";
import { RideChooser } from "@/components/home/RideChooser";
import { RideMap } from "@/components/home/RideMap";
import { SharedTripPhones } from "@/components/home/SharedTripPhones";
import { AnimatePresence, m } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { home } from "@/content/home";
import { useAutoMode, useShowcaseRoute } from "@/lib/ride";

const { hero } = home;

/** Entrance: CSS only, so text is visible before JavaScript finishes loading. 80ms stagger. */
const rise = (i: number) => ({
  className: "motion-safe:animate-rise",
  style: { animationDelay: `${i * 80}ms` },
});

export function Hero() {
  // State lives here so the chooser and the phone mockup stay in sync. The map tours sample Abuja trips.
  const reduceMotion = useReducedMotion();
  const { mode, choose, autoplaying, pauseProps } = useAutoMode();
  const { pickup, destination } = useShowcaseRoute();

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
            <span className="relative inline-block whitespace-nowrap">
              {hero.titleEnd}
              {/* Hand-drawn swoosh that draws itself in after the headline rises */}
              <svg
                viewBox="0 0 200 24"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full overflow-visible sm:-bottom-4"
                aria-hidden="true"
              >
                <path
                  d="M4 16 C 45 6, 95 3, 135 8 S 185 17, 196 9"
                  pathLength={1}
                  className="fill-none stroke-brand motion-safe:animate-draw"
                  strokeWidth={7}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h1>
          <p className={`${rise(2).className} mt-5 max-w-xl text-lg text-muted`} style={rise(2).style}>
            {hero.subtitle}
          </p>

          <div className={`${rise(3).className} mt-8`} style={rise(3).style} {...pauseProps}>
            <RideChooser
              mode={mode}
              onModeChange={choose}
              autoplaying={autoplaying}
              header={
                // Phones only: the live map sits inside the card so it reacts right where people tap.
                <div
                  role="img"
                  aria-label={`${hero.chooser.mapLabel}: ${pickup} to ${destination}${mode === "shared" ? ", shared ride" : ""}.`}
                  className="relative aspect-[16/10] bg-map md:hidden"
                >
                  <RideMap pickup={pickup} destination={destination} mode={mode} variant="card" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-route motion-safe:animate-pulse" aria-hidden="true" />
                    {hero.chooser.mapLabel}
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
            <SectionLink href="/drive" className="inline-flex min-h-11 items-center font-bold text-ink underline-offset-4 hover:underline">
              {hero.driveLink}
            </SectionLink>
          </div>
        </div>

        {/* Solo: one phone, straight there. Tag along: two riders' phones, one shared car. */}
        <div className="hidden justify-center motion-safe:animate-float-in md:flex md:justify-end lg:justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={mode}
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {mode === "shared" ? (
                <SharedTripPhones active />
              ) : (
                <HeroPhone pickup={pickup} destination={destination} mode={mode} />
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
