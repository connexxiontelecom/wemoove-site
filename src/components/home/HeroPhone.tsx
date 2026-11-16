"use client";

import { m, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";
import { RideMap } from "@/components/home/RideMap";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import type { Area } from "@/content/areas";
import { home } from "@/content/home";
import type { RideMode } from "@/lib/ride";

type HeroPhoneProps = {
  pickup: Area;
  destination: Area;
  mode: RideMode;
  /** Tag along trip with a second pickup on the way (see RideMap). */
  via?: Area;
  progress?: MotionValue<number>;
  viaPassed?: boolean;
  tags?: { pickup?: string; via?: string; dropoff?: string };
  /** Address bar text, when it differs from the map's start and end. */
  address?: [string, string];
  /** Replaces the "Choose your ride" sheet. */
  sheet?: ReactNode;
  /** Replaces the screen-reader description. */
  label?: string;
  size?: "lg" | "md";
};

const copy = home.hero.phone;

/** Phone mockup for tablet and desktop: app status bar, address bar, live map and a "Choose your ride" sheet. */
export function HeroPhone({
  pickup,
  destination,
  mode,
  via,
  progress,
  viaPassed,
  tags,
  address,
  sheet,
  label: labelOverride,
  size = "lg",
}: HeroPhoneProps) {
  const reduceMotion = useReducedMotion();
  const hasRoute = pickup !== destination;
  const shared = mode === "shared" && hasRoute;

  const label = labelOverride ?? (hasRoute
    ? `App preview: ${copy.rideName} ${shared ? copy.shared : copy.solo} ride from ${pickup} to ${destination}${shared ? `, ${copy.sharedSeats}` : ""}.`
    : `App preview: pickup at ${pickup}.`);

  return (
    <div {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
      <PhoneFrame size={size}>
        <div className="absolute inset-0">
          <RideMap
            pickup={pickup}
            destination={destination}
            mode={mode}
            variant="phone"
            via={via}
            progress={progress}
            viaPassed={viaPassed}
            tags={tags}
          />
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
            <span className="truncate">{address ? address[0] : pickup}</span>
            <span className="text-pin">→</span>
            <span className="truncate">{address ? address[1] : hasRoute ? destination : copy.sameArea}</span>
          </div>
        </div>

        {sheet ?? (
        /* Bottom sheet, styled like "Choose your ride" */
        <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-3xl bg-white px-4 pb-5 pt-2 shadow-[0_-8px_24px_-6px] shadow-ink/15" aria-hidden="true">
          <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-line" />
          <div className="space-y-1.5">
            {(["solo", "shared"] as const).map((value) => {
              const selected = (value === "shared") === shared;
              return (
                <div
                  key={value}
                  className={`relative flex items-center gap-2 rounded-xl border-2 p-1.5 transition-colors duration-300 md:gap-2.5 md:p-2 ${
                    selected ? "border-brand bg-paper" : "border-transparent"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/40 text-ink">
                    <Icon name={value === "shared" ? "share" : "car"} className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate whitespace-nowrap text-[12px] font-bold leading-tight text-ink md:text-[13px]">
                      {value === "shared" ? copy.shared : copy.solo}
                    </span>
                    <span className="block truncate whitespace-nowrap text-[10px] text-muted md:text-[11px]">
                      {value === "shared" ? copy.sharedSeats : copy.soloSeats}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-extrabold ${
                      value === "shared" ? "bg-save/10 text-save" : "bg-ink text-white"
                    }`}
                  >
                    {value === "shared" ? copy.sharedBadge : copy.soloBadge}
                  </span>
                  {selected && !reduceMotion && (
                    <m.span
                      key={`${value}-pop`}
                      className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-brand"
                      initial={{ opacity: 0.9, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-2.5 rounded-xl bg-brand py-2.5 text-center text-[13px] font-bold text-ink">
            {copy.choose} {shared ? copy.shared : copy.solo}
          </div>
        </div>
        )}
      </PhoneFrame>
    </div>
  );
}
