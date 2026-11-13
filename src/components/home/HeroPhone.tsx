"use client";

import { AnimatePresence, animate, m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { MapTag } from "@/components/home/MapTag";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { AREAS, type Area } from "@/content/areas";
import { home } from "@/content/home";
import { DECOR_ROADS, EDGES, NODES, edgePoints, findRoute, pointAt, toPath } from "@/lib/abujaMap";
import { formatNaira, getQuote, type RideMode } from "@/lib/pricing";

type HeroPhoneProps = {
  pickup: Area;
  destination: Area;
  mode: RideMode;
};

const copy = home.hero.phone;
const RIDER_STOPS = [0.36, 0.68];
const ROADS = [
  ...DECOR_ROADS.map((pts) => ({ d: toPath(pts), major: false })),
  ...EDGES.map((e) => ({ d: toPath(edgePoints(e)), major: e.major })),
];

/** Rough in-app ETA for the mockup only. */
const etaMinutes = (km: number) => Math.round(km * 1.6 + 3);

export function HeroPhone({ pickup, destination, mode }: HeroPhoneProps) {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const inView = useInView(svgRef);

  const quote = getQuote(pickup, destination);
  const hasRoute = quote !== null;
  const shared = mode === "shared" && hasRoute;
  const route = useMemo(() => findRoute(pickup, destination), [pickup, destination]);
  const d = toPath(route);
  const from = NODES[pickup];
  const to = NODES[destination];
  const mid = pointAt(route, 0.5);
  // Drop-off tag goes below the pin when the destination is near the top, so it never hides under the address bar.
  const dropBelow = to.y < 110;

  // The car drives the route on a loop. Paused off screen; parked at pickup for reduced motion.
  useEffect(() => {
    const car = carRef.current;
    if (!car || !hasRoute) return;
    const place = (t: number) => {
      const pt = pointAt(route, t);
      car.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${pt.angle})`);
    };
    place(0);
    if (reduceMotion || !inView) return;
    const controls = animate(0, 1, {
      duration: 5,
      delay: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.8,
      onUpdate: place,
    });
    return () => controls.stop();
  }, [route, hasRoute, reduceMotion, inView]);

  const label = hasRoute
    ? `App preview: ${copy.rideName} ${shared ? copy.shared : copy.solo} ride from ${pickup} to ${destination}${shared ? `, ${copy.sharedSeats}` : ""}.`
    : `App preview: pickup at ${pickup}.`;

  return (
    <div role="img" aria-label={label}>
      <PhoneFrame>
        <div className="absolute inset-0" aria-hidden="true">
          <svg ref={svgRef} viewBox="0 0 240 500" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
            <defs>
              <pattern id="streets" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-16)">
                <path d="M0 0H9M0 0V9" className="stroke-road-edge" strokeWidth={0.6} fill="none" />
              </pattern>
            </defs>

            {/* Land, street texture, parks and water */}
            <rect width="240" height="500" className="fill-map" />
            <rect width="240" height="500" fill="url(#streets)" opacity={0.7} />
            <path d="M0 150 C25 160 30 230 0 260 Z" className="fill-park" />
            <path d="M206 168 C232 160 248 200 240 236 C226 232 214 214 206 168 Z" className="fill-park" />
            <ellipse cx="190" cy="205" rx="13" ry="8" className="fill-park" />
            <ellipse cx="206" cy="234" rx="8" ry="6" className="fill-park" />
            <path d="M8 40 C30 30 22 10 0 14 Z" className="fill-park" />
            <ellipse cx="80" cy="198" rx="9" ry="5" className="fill-water" />
            <path d="M0 420 C40 410 80 440 120 430 C160 420 200 440 240 432" className="stroke-water" strokeWidth={5} fill="none" />

            {/* Roads: edge colour first, white on top */}
            {ROADS.map(
              ({ d: road, major }, i) => (
                <path
                  key={`edge-${i}`}
                  d={road}
                  fill="none"
                  className="stroke-road-edge"
                  strokeWidth={major ? 8 : 5.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ),
            )}
            {ROADS.map(
              ({ d: road, major }, i) => (
                <path
                  key={`road-${i}`}
                  d={road}
                  fill="none"
                  className="stroke-white"
                  strokeWidth={major ? 6 : 3.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ),
            )}

            {hasRoute && (
              <g key={d}>
                <m.path
                  d={d}
                  fill="none"
                  className="stroke-white"
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <m.path
                  d={d}
                  fill="none"
                  className="stroke-route"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </g>
            )}

            {/* District names */}
            {AREAS.map((name) => (
              <text
                key={name}
                x={NODES[name].x}
                y={NODES[name].y + 14}
                textAnchor="middle"
                className="fill-map-label stroke-map text-[6.5px] font-bold uppercase tracking-[0.12em]"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                {name}
              </text>
            ))}

            {/* Co-riders on Shared */}
            <AnimatePresence>
              {shared &&
                RIDER_STOPS.map((t) => {
                  const pt = pointAt(route, t);
                  return (
                    <m.g
                      key={`${d}-${t}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 18, delay: reduceMotion ? 0 : 0.5 + t * 0.5 }}
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    >
                      <circle cx={pt.x} cy={pt.y} r={7} className="fill-white stroke-brand" strokeWidth={2.5} />
                      <circle cx={pt.x} cy={pt.y - 1.6} r={1.9} className="fill-ink" />
                      <path d={`M${pt.x - 3.2} ${pt.y + 3.6}a3.2 3.2 0 0 1 6.4 0`} className="fill-ink" />
                    </m.g>
                  );
                })}
            </AnimatePresence>

            {/* ETA chip */}
            {hasRoute && (
              <g transform={`translate(${Math.min(Math.max(mid.x + 8, 6), 186)} ${mid.y - 10})`}>
                <rect width="48" height="20" rx="4" className="fill-white stroke-road-edge" strokeWidth={0.8} />
                <text x="6" y="9" className="fill-ink text-[7px] font-bold">
                  {etaMinutes(quote.km)} {copy.minutes}
                </text>
                <text x="6" y="16.5" className="fill-map-label text-[5.5px] font-semibold">
                  {quote.km} km
                </text>
              </g>
            )}

            {/* Pickup: pulsing location dot */}
            {!reduceMotion && (
              <m.circle
                cx={from.x}
                cy={from.y}
                className="fill-route"
                initial={{ r: 4, opacity: 0.35 }}
                animate={{ r: 13, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <circle cx={from.x} cy={from.y} r={4.5} className="fill-white stroke-route" strokeWidth={2.5} />
            <MapTag at={from} label={copy.pickupTag} below={from.y < 110} />

            {hasRoute && (
              <g>
                <circle cx={to.x} cy={to.y} r={4.5} className="fill-ink stroke-white" strokeWidth={1.5} />
                <MapTag at={to} label={copy.dropoffTag} below={dropBelow} />
              </g>
            )}

            {/* Car, seen from above */}
            {hasRoute && (
              <g ref={carRef} transform={`translate(${from.x} ${from.y})`}>
                <rect x={-8} y={-4.5} width={16} height={9} rx={3} className="fill-brand stroke-ink" strokeWidth={0.9} />
                <rect x={1.5} y={-3.4} width={3.2} height={6.8} rx={1} className="fill-ink" opacity={0.75} />
                <rect x={-6} y={-3.4} width={2.2} height={6.8} rx={0.8} className="fill-ink" opacity={0.5} />
              </g>
            )}
          </svg>
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
