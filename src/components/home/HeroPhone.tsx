"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { RideMap, etaMinutes } from "@/components/home/RideMap";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import type { Area } from "@/content/areas";
import { home } from "@/content/home";
import { formatNaira, getQuote, type RideMode } from "@/lib/pricing";

type HeroPhoneProps = {
  pickup: Area;
  destination: Area;
  mode: RideMode;
};

const copy = home.hero.phone;

/** Phone mockup for tablet and desktop: app status bar, address bar, live map and a "Choose your ride" sheet. */
export function HeroPhone({ pickup, destination, mode }: HeroPhoneProps) {
  const reduceMotion = useReducedMotion();
  const quote = getQuote(pickup, destination);
  const hasRoute = quote !== null;
  const shared = mode === "shared" && hasRoute;

  const label = hasRoute
    ? `App preview: ${copy.rideName} ${shared ? copy.shared : copy.solo} ride from ${pickup} to ${destination}${shared ? `, ${copy.sharedSeats}` : ""}.`
    : `App preview: pickup at ${pickup}.`;

  return (
    <div role="img" aria-label={label}>
      <PhoneFrame>
        <div className="absolute inset-0">
          <RideMap pickup={pickup} destination={destination} mode={mode} variant="phone" />
        </div>

        {/* Status bar and address bar, like the app */}
        <div className="absolute inset-x-0 top-0 z-10" aria-hidden="true">
          <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-bold text-ink">
            <span>{copy.time}</span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 18 10" className="h-2.5 w-[18px] fill-ink">
                <rect x="0" y="6" width="3" height="4" rx="0.6" />
                <rect x="5" y="4" width="3" height="6" rx="0.6" />
                <rect x="10" y="2" width="3" height="8" rx="0.6" />
                <rect x="15" y="0" width="3" height="10" rx="0.6" />
              </svg>
              <span className="h-2.5 w-5 rounded-[3px] border border-ink p-[1px]">
                <span className="block h-full w-3/4 rounded-[1px] bg-ink" />
              </span>
            </span>
          </div>
          <div className="mx-3 mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-ink shadow-md shadow-ink/10">
            <span className="truncate">{pickup}</span>
            <span className="text-pin">→</span>
            <span className="truncate">{hasRoute ? destination : "Where to?"}</span>
          </div>
        </div>

        {/* Bottom sheet, styled like "Choose your ride" */}
        <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-3xl bg-white px-4 pb-5 pt-2 shadow-[0_-8px_24px_-6px] shadow-ink/15" aria-hidden="true">
          <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-line" />
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={hasRoute ? mode : "none"}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: reduceMotion ? 0 : 0.15 } }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
            >
              {hasRoute ? (
                <div className="flex items-center gap-2 rounded-xl border-2 border-brand bg-paper p-2 md:gap-3 md:p-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/40 text-ink md:h-9 md:w-9">
                    <Icon name={shared ? "share" : "car"} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate whitespace-nowrap text-[12px] font-bold leading-tight text-ink md:text-[13px]">
                      <span className="hidden md:inline">{copy.rideName} · </span>
                      {shared ? copy.shared : copy.solo}
                    </span>
                    <span className="block truncate whitespace-nowrap text-[10px] text-muted md:text-[11px]">
                      {shared ? copy.sharedSeats : copy.soloSeats}
                      <span className="hidden md:inline">
                        {" "}
                        · {etaMinutes(quote.km)} {copy.minutes}
                      </span>
                    </span>
                  </span>
                  <span className="text-right leading-tight">
                    {shared && (
                      <span className="block text-[10px] text-muted line-through">{formatNaira(quote.solo)}</span>
                    )}
                    <span className={`block text-sm font-extrabold tabular-nums ${shared ? "text-save" : "text-ink"}`}>
                      {formatNaira(shared ? quote.shared : quote.solo)}
                    </span>
                  </span>
                </div>
              ) : (
                <p className="py-3 text-center text-sm font-bold text-ink">{home.hero.estimator.sameArea}</p>
              )}
            </m.div>
          </AnimatePresence>
          <div className={`mt-3 rounded-xl py-2.5 text-center text-[13px] font-bold ${hasRoute ? "bg-brand text-ink" : "bg-line text-muted"}`}>
            {copy.select}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
