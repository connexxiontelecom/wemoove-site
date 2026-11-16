"use client";

import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";
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
  const hasRoute = pickup !== destination;

  const label =
    labelOverride ??
    (hasRoute
      ? `App preview: booking a ${copy.rideName} ${copy.solo} ride from ${pickup} to ${destination}, ${copy.soloSeats}.`
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
          /* Solo booking sheet: one ride, the car to yourself */
          <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-3xl bg-white px-4 pb-5 pt-2 shadow-[0_-8px_24px_-6px] shadow-ink/15" aria-hidden="true">
            <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-line" />
            <div className="flex items-center gap-2.5 rounded-xl border-2 border-brand bg-paper p-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/40 text-ink">
                <Icon name="car" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold leading-tight text-ink">
                  <span className="hidden lg:inline">{copy.rideName} · </span>
                  {copy.solo}
                </span>
                <span className="block truncate text-[11px] text-muted">{copy.soloSeats}</span>
              </span>
              <span className="hidden shrink-0 rounded-full bg-ink px-2 py-1 text-[10px] font-extrabold text-white lg:inline">{copy.soloBadge}</span>
            </div>
            <div className="mt-2.5 flex justify-between gap-1 whitespace-nowrap px-0.5 text-[9.5px] font-semibold text-muted lg:justify-around lg:text-[10.5px]">
              {copy.soloPerks.map((perk) => (
                <span key={perk} className="flex items-center gap-1">
                  <Icon name="check" className="h-3 w-3 text-ink" />
                  {perk}
                </span>
              ))}
            </div>
            <div className="mt-2.5 rounded-xl bg-brand py-2.5 text-center text-[13px] font-bold text-ink">{copy.bookSolo}</div>
          </div>
        )}
      </PhoneFrame>
    </div>
  );
}
