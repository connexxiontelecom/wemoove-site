"use client";

import { SectionLink } from "@/components/ui/SectionLink";
import { HeroPhone } from "@/components/home/HeroPhone";
import { RideChooser } from "@/components/home/RideChooser";
import { TagAlongDemo } from "@/components/home/TagAlongDemo";
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
      {/*
        Desktop: intro and cards on the left, phones on the right.
        Phones and tablets: intro, then the phones, then the cards (so the demo is seen first).
      */}
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-10 px-6 py-12 md:py-16 lg:min-h-[calc(100vh-72px)] lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:px-8">
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-end">
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
        </div>

        <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
          <div className={rise(3).className} style={rise(3).style} {...pauseProps}>
            <RideChooser mode={mode} onModeChange={choose} autoplaying={autoplaying} />
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

        {/* Solo: one phone, straight there. Tag along: the rider's and driver's apps (one phone that cuts between them on small screens). */}
        <div className="order-2 flex min-h-[600px] justify-center motion-safe:animate-float-in lg:order-none md:min-h-[640px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-0 lg:items-center">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={mode}
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {mode === "shared" ? (
                <TagAlongDemo />
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
