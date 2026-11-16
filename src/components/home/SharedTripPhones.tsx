"use client";

import { AnimatePresence, m } from "framer-motion";
import { useMemo } from "react";
import { HeroPhone } from "@/components/home/HeroPhone";
import { Icon } from "@/components/ui/Icon";
import { home } from "@/content/home";
import { findRouteVia } from "@/lib/abujaMap";
import { useReducedMotion } from "@/lib/motion";
import { useTripClock } from "@/lib/ride";

const trip = home.hero.trip;

type RiderSheetProps = { you: "rider1" | "rider2"; passed: boolean };

/** Bottom sheet for one rider: who's in the car and what's happening now. */
function RiderSheet({ you, passed }: RiderSheetProps) {
  const reduceMotion = useReducedMotion();
  const status = trip[you][passed ? "after" : "before"];
  // Rider 1 is always aboard; Rider 2 joins at the second pickup.
  const aboard = passed ? 2 : 1;

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-3xl bg-white px-4 pb-5 pt-2 shadow-[0_-8px_24px_-6px] shadow-ink/15" aria-hidden="true">
      <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-line" />
      <div className="flex items-center gap-2.5">
        {/* Seats: filled as riders get in */}
        <span className="flex -space-x-2">
          {[0, 1].map((i) => (
            <span
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white transition-colors duration-500 ${
                i < aboard ? (i === (you === "rider1" ? 0 : 1) ? "bg-brand text-ink" : "bg-route text-white") : "bg-line text-muted"
              }`}
            >
              <Icon name="user" className="h-4 w-4" />
            </span>
          ))}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold leading-tight text-ink">{trip.title}</span>
          <span className="relative block h-4 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={status}
                className="block truncate text-[11px] text-muted"
                initial={reduceMotion ? false : { y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { y: -10, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
              >
                {status}
              </m.span>
            </AnimatePresence>
          </span>
        </span>
      </div>
      <div className="mt-3 rounded-xl bg-brand py-2.5 text-center text-[13px] font-bold text-ink">{trip.cta}</div>
    </div>
  );
}

/**
 * Tag along on two phones: two riders, one car. Rider 1 is picked up in Wuse, the car collects
 * Rider 2 in Jabi, and both ride on to Gwarinpa. One clock drives both maps so they stay in sync.
 * The whole scene links to the app download.
 */
export function SharedTripPhones({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const { viaT } = useMemo(() => findRouteVia(trip.pickup1, trip.pickup2, trip.destination), []);
  const { progress, passed } = useTripClock(active, viaT);

  const shared = {
    pickup: trip.pickup1,
    via: trip.pickup2,
    destination: trip.destination,
    mode: "shared" as const,
    progress,
    viaPassed: passed,
    size: "md" as const,
  };

  return (
    <a
      href="#download"
      aria-label={`${trip.linkLabel}. App preview: two riders matched into one shared car, from ${trip.pickup1} and ${trip.pickup2} to ${trip.destination}.`}
      className="group relative flex items-start justify-center gap-5 rounded-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand"
    >
      <div className="transition-transform duration-300 group-hover:-translate-y-1">
        <HeroPhone
          {...shared}
          tags={{ pickup: trip.you, via: trip.rider2Tag }}
          address={[trip.pickup1, trip.destination]}
          sheet={<RiderSheet you="rider1" passed={passed} />}
          label=""
        />
      </div>
      <div className="mt-16 hidden transition-transform delay-75 duration-300 group-hover:-translate-y-1 lg:block">
        <HeroPhone
          {...shared}
          tags={{ pickup: trip.rider1Tag, via: trip.you }}
          address={[trip.pickup2, trip.destination]}
          sheet={<RiderSheet you="rider2" passed={passed} />}
          label=""
        />
      </div>

      {/* Matched badge between the phones */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={passed ? "matched" : "matching"}
            initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold shadow-xl ${
              passed ? "bg-ink text-white shadow-ink/30" : "bg-white text-ink shadow-ink/15 ring-1 ring-line"
            }`}
          >
            {passed ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-ink">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
            ) : (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-ink/60 motion-safe:animate-pulse"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </span>
            )}
            {passed ? trip.matchedAfter : trip.matchedBefore}
          </m.span>
        </AnimatePresence>
      </span>
    </a>
  );
}
