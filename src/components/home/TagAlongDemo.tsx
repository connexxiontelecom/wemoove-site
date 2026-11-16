"use client";

import { AnimatePresence, animate, m, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { RideMap } from "@/components/home/RideMap";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { home } from "@/content/home";
import { findRouteVia } from "@/lib/abujaMap";
import { useReducedMotion } from "@/lib/motion";

const demo = home.hero.demo;

/*
  Timeline (seconds). One clock drives both phones so the rider's tap and the driver's request line up.
*/
const STEPS = [
  { id: "list", at: 0 },
  { id: "listTap", at: 1.5 },
  { id: "details", at: 2.2 },
  { id: "bookTap", at: 3.8 },
  { id: "sent", at: 4.4 },
  { id: "acceptTap", at: 5.8 },
  { id: "accepted", at: 6.4 },
  { id: "drive", at: 7.6 },
] as const;
type Step = (typeof STEPS)[number]["id"];
const LOOP = 15.5;
const DRIVE = { start: 8.0, reachPickup: 10.6, leavePickup: 11.4, arrive: 14.6 };
/** Reduced motion: one still frame, the car just past the pickup. */
const STILL_AT = 11.6;

const stepAt = (time: number): Step => {
  let current: Step = "list";
  for (const s of STEPS) if (time >= s.at) current = s.id;
  return current;
};
const isAfter = (step: Step, id: Step) => STEPS.findIndex((s) => s.id === step) >= STEPS.findIndex((s) => s.id === id);

/** A finger tap: dot that presses and fades, shown over the thing being tapped. */
function Tap({ className = "" }: { className?: string }) {
  return (
    <m.span
      aria-hidden="true"
      className={`pointer-events-none absolute z-30 h-9 w-9 rounded-full bg-ink/30 ring-4 ring-ink/10 ${className}`}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: [0.4, 1, 0.85], opacity: [0, 1, 0] }}
      transition={{ duration: 0.7, times: [0, 0.4, 1] }}
    />
  );
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-6 pt-3 text-[11px] font-bold ${dark ? "text-white" : "text-ink"}`}>
      <span>{home.hero.phone.time}</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 18 10" className={`h-2.5 w-[18px] ${dark ? "fill-white" : "fill-ink"}`}>
          <rect x="0" y="6" width="3" height="4" rx="0.6" />
          <rect x="5" y="4" width="3" height="6" rx="0.6" />
          <rect x="10" y="2" width="3" height="8" rx="0.6" />
          <rect x="15" y="0" width="3" height="10" rx="0.6" />
        </svg>
        <span className={`h-2.5 w-5 rounded-[3px] border p-[1px] ${dark ? "border-white" : "border-ink"}`}>
          <span className={`block h-full w-3/4 rounded-[1px] ${dark ? "bg-white" : "bg-ink"}`} />
        </span>
      </span>
    </div>
  );
}

/** Slides one app screen out and the next in. */
function Screen({ id, children }: { id: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      key={id}
      className="absolute inset-0 flex flex-col bg-white"
      initial={reduceMotion ? false : { x: "30%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { x: "-20%", opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

function Header({ title, back = true }: { title: string; back?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-4 pb-3 pt-5">
      {back && <Icon name="arrowRight" className="h-4 w-4 rotate-180" />}
      <p className="text-[15px] font-extrabold tracking-tight">{title}</p>
    </div>
  );
}

/* ── Rider screens ─────────────────────────────── */

function RideList({ tapping }: { tapping: boolean }) {
  return (
    <>
      <StatusBar />
      <Header title={demo.list.title} />
      <div className="mx-4 flex items-center gap-2 rounded-lg bg-paper px-3 py-2 text-[10px] text-muted ring-1 ring-line">
        <Icon name="search" className="h-3.5 w-3.5" />
        {demo.list.search}
      </div>
      <ul className="mt-2 px-4">
        {demo.list.rides.map((r, i) => (
          <li
            key={`${r.to}-${r.time}`}
            className={`relative -mx-2 flex items-center gap-2.5 rounded-lg border-b border-line px-2 py-2.5 transition-colors ${
              i === 0 && tapping ? "bg-brand/15" : ""
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/40 text-ink">
              <Icon name="car" className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1 whitespace-nowrap text-[11.5px] font-semibold text-ink">
                {r.from} <span className="text-brand-strong">→</span> {r.to}
              </span>
              <span className="mt-1 flex items-center gap-1">
                <span className="inline-flex items-center gap-0.5 rounded border border-line px-1 py-px text-[7.5px] text-muted">
                  <Icon name="clock" className="h-2.5 w-2.5 text-brand-strong" />
                  {demo.list.takeoff}: {r.time}
                </span>
                {r.stop && <span className="rounded border border-brand px-1 py-px text-[7.5px] text-ink">{r.stop}</span>}
              </span>
            </span>
            <span className="shrink-0 text-[10px] font-bold text-ink">{r.seats}</span>
            {i === 0 && tapping && <Tap className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
          </li>
        ))}
      </ul>
    </>
  );
}

function RideDetails({ step }: { step: Step }) {
  const d = demo.details;
  const sent = isAfter(step, "sent");
  const accepted = isAfter(step, "accepted");
  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-4 pb-2 pt-5">
        <p className="text-[15px] font-extrabold tracking-tight">{d.title}</p>
        <Icon name="close" className="h-4 w-4" />
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-night text-white">
            <Icon name="user" className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-[11.5px] font-bold">{d.driver}</span>
            <span className="flex items-center gap-0.5 text-[9px] text-muted">
              <Icon name="star" className="h-2.5 w-2.5 text-brand-strong" /> {d.rating}
            </span>
          </span>
        </span>
        <span className="flex min-w-0 items-center gap-2 pl-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/40">
            <Icon name="car" className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-bold">{d.plate}</span>
            <span className="block truncate text-[8.5px] text-muted">{d.car}</span>
          </span>
        </span>
      </div>
      <div className="mx-4 mt-1 rounded-lg bg-paper py-2 text-center text-[10.5px] font-semibold ring-1 ring-line">
        {demo.start} <span className="text-brand-strong">→</span> {demo.destination}
      </div>
      <div className="space-y-2.5 px-4 pt-3 text-[10.5px]">
        <p className="flex items-center gap-2">
          <Icon name="clock" className="h-3.5 w-3.5 text-route" />
          {d.departure}
        </p>
        <p className="flex items-center gap-2">
          <Icon name="pin" className="h-3.5 w-3.5 text-route" />
          {d.pickupLabel}
        </p>
        <div>
          <p className="flex items-center gap-2">
            <Icon name="check" className="h-3.5 w-3.5 text-save" />
            {d.dropoffs}
          </p>
          <span className="mt-1.5 flex flex-wrap gap-1">
            {d.stops.map((stop) => (
              <span
                key={stop}
                className={`rounded border px-1.5 py-0.5 text-[8.5px] ${stop === demo.destination ? "border-brand text-ink" : "border-line text-muted"}`}
              >
                {stop}
              </span>
            ))}
          </span>
        </div>
        <p className="flex items-center gap-2 border-t border-line pt-2.5">
          <Icon name="seat" className="h-3.5 w-3.5 text-route" />
          {d.seatsLabel}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-line text-[13px]">−</span>
          <span className="text-[12px] font-semibold">1</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-line text-[13px]">+</span>
        </div>
      </div>
      <div className="mt-auto px-4 pb-4">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={accepted ? "accepted" : sent ? "sent" : "book"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`relative flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12.5px] font-bold ${
              accepted ? "bg-save text-white" : sent ? "bg-line text-muted" : "bg-brand text-ink"
            }`}
          >
            {accepted && <Icon name="check" className="h-3.5 w-3.5" />}
            {accepted ? d.accepted : sent ? d.sent : d.book}
            {step === "bookTap" && <Tap className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
          </m.div>
        </AnimatePresence>
        <p className={`mt-2 text-center text-[11px] font-bold text-brand-strong transition-opacity ${sent ? "opacity-0" : ""}`}>{d.offer}</p>
      </div>
    </>
  );
}

/* ── Driver screens ─────────────────────────────── */

function DriverRequests({ step }: { step: Step }) {
  const d = demo.driver;
  const incoming = isAfter(step, "sent");
  const accepted = isAfter(step, "accepted");
  return (
    <>
      <StatusBar />
      <Header title={d.title} />
      <p className="mx-4 rounded-lg bg-paper px-3 py-3 text-[10px] text-muted ring-1 ring-line">{d.empty}</p>

      {/* Incoming request sheet */}
      <AnimatePresence>
        {incoming && (
          <>
            <m.div className="absolute inset-0 bg-ink/25" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <m.div
              className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white pb-4 shadow-[0_-8px_24px_-6px] shadow-ink/20"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="h-1 rounded-t-2xl bg-brand" />
              <p className="border-b border-line px-4 py-3 text-[13px] font-extrabold">{d.incoming}</p>
              <div className="mx-4 mt-3 rounded-lg bg-paper py-2 text-center text-[10.5px] font-semibold ring-1 ring-line">
                {demo.pickup} <span className="text-brand-strong">→</span> {demo.destination}
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-route text-white">
                    <Icon name="user" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[11.5px] font-bold">{d.rider}</span>
                    <span className="flex items-center gap-0.5 text-[9px] text-muted">
                      <Icon name="star" className="h-2.5 w-2.5 text-brand-strong" /> {d.rating}
                    </span>
                  </span>
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold">
                  <Icon name="seat" className="h-3.5 w-3.5 text-route" /> {d.seats}
                </span>
              </div>
              <div className="px-4">
                <div
                  className={`relative flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12.5px] font-bold transition-colors duration-300 ${
                    accepted ? "bg-save text-white" : "bg-brand text-ink"
                  }`}
                >
                  {accepted && <Icon name="check" className="h-3.5 w-3.5" />}
                  {accepted ? d.accepted : d.accept}
                  {step === "acceptTap" && <Tap className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
                </div>
                <p className={`mt-2 text-center text-[11px] font-bold text-brand-strong transition-opacity ${accepted ? "opacity-0" : ""}`}>{d.counter}</p>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Shared map screen (both phones once the seat is booked) ─────────────────────────────── */

function TripMap({
  who,
  progress,
  aboard,
}: {
  who: "rider" | "driver";
  progress: MotionValue<number>;
  aboard: boolean;
}) {
  const t = demo.trip;
  const rider = who === "rider";
  const status = rider ? (aboard ? t.riderAboard : t.riderOnWay) : aboard ? t.driverAboard : t.driverOnWay;
  return (
    <>
      <div className="absolute inset-0">
        <RideMap
          pickup={demo.start}
          via={demo.pickup}
          destination={demo.destination}
          mode="shared"
          variant="phone"
          progress={progress}
          viaPassed={aboard}
          tags={rider ? { pickup: t.start, via: t.you } : { pickup: t.start, via: t.rider }}
        />
      </div>
      <div className="absolute inset-x-0 top-0 z-10">
        <StatusBar />
        <div className="mx-3 mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-ink shadow-md shadow-ink/10">
          <span>{rider ? demo.pickup : demo.start}</span>
          <span className="text-pin">→</span>
          <span>{demo.destination}</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-3xl bg-white px-4 pb-5 pt-2 shadow-[0_-8px_24px_-6px] shadow-ink/15">
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-line" />
        <div className="flex items-center gap-2.5">
          <span className={`flex h-9 w-9 items-center justify-center rounded-full ${rider ? "bg-night text-white" : "bg-route text-white"}`}>
            <Icon name="user" className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-bold">{rider ? demo.details.driver : demo.driver.rider}</span>
            <span className="relative block h-4 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={status}
                  className="block truncate text-[10.5px] text-muted"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {status}
                </m.span>
              </AnimatePresence>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

/**
 * Tag along, as it works in the app, on two phones. Rider: available shared rides → ride details →
 * Book ride. Driver: the request comes in → Accept. Then both phones follow the same car to the
 * rider's pickup and on to the drop-off. The whole scene links to the app download.
 */
export function TagAlongDemo() {
  const reduceMotion = useReducedMotion();
  const clock = useMotionValue(reduceMotion ? STILL_AT : 0);
  const [step, setStep] = useState<Step>(reduceMotion ? "drive" : "list");
  const { viaT } = useMemo(() => findRouteVia(demo.start, demo.pickup, demo.destination), []);
  const progress = useTransform(
    clock,
    [DRIVE.start, DRIVE.reachPickup, DRIVE.leavePickup, DRIVE.arrive],
    [0, viaT, viaT, 1],
    { clamp: true },
  );
  const [aboard, setAboard] = useState(false);

  useMotionValueEvent(clock, "change", (v) => {
    const next = stepAt(v);
    setStep((s) => (s === next ? s : next));
    const on = v >= DRIVE.leavePickup - 0.2;
    setAboard((a) => (a === on ? a : on));
  });

  useEffect(() => {
    if (reduceMotion) {
      clock.set(STILL_AT);
      return;
    }
    clock.set(0);
    const controls = animate(clock, LOOP, { duration: LOOP, ease: "linear", repeat: Infinity });
    return () => controls.stop();
  }, [reduceMotion, clock]);

  const riderScreen = step === "list" || step === "listTap" ? "list" : step === "drive" ? "map" : "details";
  const driverScreen = step === "drive" ? "map" : "requests";
  const badge =
    step === "drive"
      ? aboard
        ? demo.badge.aboard
        : demo.badge.booked
      : isAfter(step, "accepted")
        ? demo.badge.booked
        : isAfter(step, "sent")
          ? demo.badge.sent
          : isAfter(step, "details")
            ? demo.badge.pick
            : demo.badge.browse;
  const done = isAfter(step, "accepted");
  // Small phones show the driver's app while the request comes in and is accepted.
  const mobileWho: "rider" | "driver" = step === "sent" || step === "acceptTap" || step === "accepted" ? "driver" : "rider";
  const mobileScreen = mobileWho === "driver" ? driverScreen : riderScreen;

  return (
    <a
      href="#download"
      aria-label={`${demo.linkLabel}. ${demo.preview}`}
      className="group relative flex items-start justify-center gap-5 rounded-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand"
    >
      {/* Small phones: one phone that cuts between the rider's and the driver's app */}
      <div className="flex flex-col items-center gap-3 md:hidden" aria-hidden="true">
        <PhoneFrame size="md">
          <AnimatePresence initial={false}>
            <Screen key={`${mobileWho}-${mobileScreen}`} id={`${mobileWho}-${mobileScreen}`}>
              {mobileWho === "driver" ? (
                <DriverRequests step={step} />
              ) : mobileScreen === "list" ? (
                <RideList tapping={step === "listTap"} />
              ) : mobileScreen === "details" ? (
                <RideDetails step={step} />
              ) : (
                <TripMap who="rider" progress={progress} aboard={aboard} />
              )}
            </Screen>
          </AnimatePresence>
        </PhoneFrame>
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={badge}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-sm text-muted"
          >
            <span className="font-bold text-ink">{demo.labels[mobileWho]}</span>
            <span aria-hidden="true">·</span>
            {done && <Icon name="check" className="h-3.5 w-3.5 text-save" />}
            {badge}
          </m.span>
        </AnimatePresence>
      </div>

      {/* Rider */}
      <div className="hidden flex-col items-center gap-3 transition-transform duration-300 group-hover:-translate-y-1 md:flex" aria-hidden="true">
        <PhoneFrame size="md">
          <AnimatePresence initial={false}>
            <Screen key={riderScreen} id={riderScreen}>
              {riderScreen === "list" && <RideList tapping={step === "listTap"} />}
              {riderScreen === "details" && <RideDetails step={step} />}
              {riderScreen === "map" && <TripMap who="rider" progress={progress} aboard={aboard} />}
            </Screen>
          </AnimatePresence>
        </PhoneFrame>
        <span className="text-xs font-bold text-muted">{demo.labels.rider}</span>
      </div>

      {/* Driver */}
      <div className="mt-16 hidden flex-col items-center gap-3 transition-transform delay-75 duration-300 group-hover:-translate-y-1 md:flex" aria-hidden="true">
        <PhoneFrame size="md">
          <AnimatePresence initial={false}>
            <Screen key={driverScreen} id={driverScreen}>
              {driverScreen === "requests" && <DriverRequests step={step} />}
              {driverScreen === "map" && <TripMap who="driver" progress={progress} aboard={aboard} />}
            </Screen>
          </AnimatePresence>
        </PhoneFrame>
        <span className="text-xs font-bold text-muted">{demo.labels.driver}</span>
      </div>

      {/* Status badge between the phones */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={badge}
            initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold shadow-xl ${
              done ? "bg-ink text-white shadow-ink/30" : "bg-white text-ink shadow-ink/15 ring-1 ring-line"
            }`}
          >
            {done ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-ink">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
            ) : (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/60 motion-safe:animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </span>
            )}
            {badge}
          </m.span>
        </AnimatePresence>
      </span>
    </a>
  );
}
