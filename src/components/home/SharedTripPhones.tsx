"use client";

import { AnimatePresence, m } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import { HeroPhone } from "@/components/home/HeroPhone";
import { Icon } from "@/components/ui/Icon";
import { home } from "@/content/home";
import { findRouteVia } from "@/lib/abujaMap";
import { useReducedMotion } from "@/lib/motion";
import { useTripClock, type TripPhase } from "@/lib/ride";

const trip = home.hero.trip;

/** Status line that slides when it changes. */
function Status({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className="relative block h-4 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={text}
          className="block truncate text-[11px] text-muted"
          initial={reduceMotion ? false : { y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: -10, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          {text}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function Sheet({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-3xl bg-white px-4 pb-5 pt-2 shadow-[0_-8px_24px_-6px] shadow-ink/15" aria-hidden="true">
      <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-line" />
      {children}
    </div>
  );
}

/** Rider's phone: the shared ride they asked to join. */
function RiderSheet({ phase }: { phase: TripPhase }) {
  const copy = trip.rider;
  const button = { requested: copy.buttonRequested, booked: copy.buttonBooked, aboard: copy.buttonAboard }[phase];
  return (
    <Sheet>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/40 text-ink">
          <Icon name="share" className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="text-[13px] font-bold leading-tight text-ink">{copy.title}</span>
            <span className="shrink-0 text-[10px] font-semibold text-muted">{trip.leaves}</span>
          </span>
          <Status text={copy[phase]} />
        </span>
      </div>
      <div
        className={`mt-3 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-bold transition-colors duration-300 ${
          phase === "requested" ? "bg-line text-muted" : phase === "booked" ? "bg-ink text-white" : "bg-brand text-ink"
        }`}
      >
        {phase !== "requested" && <Icon name="check" className="h-3.5 w-3.5" />}
        {button}
      </div>
    </Sheet>
  );
}

/** Driver's phone: the incoming seat request, accepted. */
function DriverSheet({ phase }: { phase: TripPhase }) {
  const reduceMotion = useReducedMotion();
  const copy = trip.driver;
  const waiting = phase === "requested";
  return (
    <Sheet>
      <p className="text-[13px] font-bold text-ink">{copy.title}</p>
      <div className="mt-2 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-route text-white">
          <Icon name="user" className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-bold leading-tight text-ink">{copy.who}</span>
          <Status text={copy[phase]} />
        </span>
      </div>
      <div className="mt-3 grid grid-cols-[auto_1fr] gap-2">
        <span
          className={`rounded-xl px-3 py-2.5 text-[12px] font-bold transition-opacity duration-300 ${waiting ? "text-muted" : "text-transparent"}`}
        >
          {copy.counter}
        </span>
        <span className="relative">
          <span
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-bold transition-colors duration-300 ${
              waiting ? "bg-brand text-ink" : "bg-save/10 text-save"
            }`}
          >
            {!waiting && <Icon name="check" className="h-3.5 w-3.5" />}
            {waiting ? copy.accept : copy.accepted}
          </span>
          {/* A "tap" on Accept just before the driver accepts */}
          {waiting && !reduceMotion && (
            <m.span
              className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/25"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 0, 1.4], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2.6, times: [0, 0.8, 1], ease: "easeOut" }}
            />
          )}
        </span>
      </div>
    </Sheet>
  );
}

/**
 * Tag along on two phones, following the app: a rider requests a seat on a driver's shared ride,
 * the driver accepts, then the car sets off and picks the rider up on the way. One clock drives both
 * maps so they stay in sync. The whole scene links to the app download.
 */
export function SharedTripPhones({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const { viaT } = useMemo(() => findRouteVia(trip.start, trip.pickup, trip.destination), []);
  const { progress, phase } = useTripClock(active, viaT);

  const map = {
    pickup: trip.start,
    via: trip.pickup,
    destination: trip.destination,
    mode: "shared" as const,
    progress,
    viaPassed: phase === "aboard",
    size: "md" as const,
    label: "",
  };

  return (
    <a
      href="#download"
      aria-label={`${trip.linkLabel}. ${trip.preview}`}
      className="group relative flex items-start justify-center gap-5 rounded-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand"
    >
      <div className="transition-transform duration-300 group-hover:-translate-y-1">
        <HeroPhone
          {...map}
          tags={{ pickup: trip.tags.start, via: trip.tags.you }}
          address={[trip.pickup, trip.destination]}
          sheet={<RiderSheet phase={phase} />}
        />
      </div>
      <div className="mt-16 hidden transition-transform delay-75 duration-300 group-hover:-translate-y-1 lg:block">
        <HeroPhone
          {...map}
          tags={{ pickup: trip.tags.you, via: trip.tags.rider }}
          address={[trip.start, trip.destination]}
          sheet={<DriverSheet phase={phase} />}
        />
      </div>

      {/* Status badge between the phones */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={phase}
            initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold shadow-xl ${
              phase === "requested" ? "bg-white text-ink shadow-ink/15 ring-1 ring-line" : "bg-ink text-white shadow-ink/30"
            }`}
          >
            {phase === "requested" ? (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/60 motion-safe:animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </span>
            ) : (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-ink">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
            )}
            {trip.badge[phase]}
          </m.span>
        </AnimatePresence>
      </span>
    </a>
  );
}
