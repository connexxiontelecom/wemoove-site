"use client";

import { AnimatePresence, animate, m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Icon } from "@/components/ui/Icon";
import type { Area } from "@/content/areas";
import { home } from "@/content/home";
import { formatNaira, getQuote, type RideMode } from "@/lib/pricing";

type HeroPhoneProps = {
  pickup: Area;
  destination: Area;
  mode: RideMode;
};

type Point = { x: number; y: number };

/** Stylised (not to scale) positions of each area on the 240×500 phone map. */
const AREA_POINTS: Record<Area, Point> = {
  Kubwa: { x: 36, y: 70 },
  Gwarinpa: { x: 72, y: 128 },
  Maitama: { x: 176, y: 128 },
  Jabi: { x: 104, y: 190 },
  Wuse: { x: 140, y: 224 },
  CBD: { x: 176, y: 262 },
  Garki: { x: 140, y: 316 },
  Asokoro: { x: 212, y: 316 },
  Lugbe: { x: 36, y: 372 },
};

const ROAD_X = [...new Set(Object.values(AREA_POINTS).map((p) => p.x))];
const ROAD_Y = [...new Set(Object.values(AREA_POINTS).map((p) => p.y))];
const MINOR_ROADS = [20, 88, 122, 158, 194, 228];

/** Route follows the road grid: across, then up/down. */
function routePoints(a: Point, b: Point): Point[] {
  return [a, { x: b.x, y: a.y }, b];
}

function pointAt(points: Point[], t: number): { x: number; y: number; angle: number } {
  const segments = points.slice(1).map((p, i) => {
    const from = points[i];
    return { from, to: p, len: Math.hypot(p.x - from.x, p.y - from.y) };
  });
  const total = segments.reduce((sum, s) => sum + s.len, 0) || 1;
  let remaining = Math.min(Math.max(t, 0), 1) * total;
  let last = segments[segments.length - 1];
  for (const s of segments) {
    if (s.len === 0) continue;
    last = s;
    if (remaining <= s.len) {
      const k = remaining / s.len;
      return {
        x: s.from.x + (s.to.x - s.from.x) * k,
        y: s.from.y + (s.to.y - s.from.y) * k,
        angle: (Math.atan2(s.to.y - s.from.y, s.to.x - s.from.x) * 180) / Math.PI,
      };
    }
    remaining -= s.len;
  }
  return {
    x: last.to.x,
    y: last.to.y,
    angle: (Math.atan2(last.to.y - last.from.y, last.to.x - last.from.x) * 180) / Math.PI,
  };
}

const RIDER_STOPS = [0.38, 0.7];

export function HeroPhone({ pickup, destination, mode }: HeroPhoneProps) {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const inView = useInView(svgRef);

  const quote = getQuote(pickup, destination);
  const from = AREA_POINTS[pickup];
  const to = AREA_POINTS[destination];
  const points = useMemo(() => routePoints(from, to), [from, to]);
  const d = `M${points.map((p) => `${p.x} ${p.y}`).join(" L")}`;
  const hasRoute = quote !== null;
  const shared = mode === "shared" && hasRoute;

  // Car loops along the route. Paused when off screen; parked at pickup for reduced motion.
  useEffect(() => {
    const car = carRef.current;
    if (!car || !hasRoute) return;
    const place = (t: number) => {
      const p = pointAt(points, t);
      car.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${p.angle})`);
    };
    place(0);
    if (reduceMotion || !inView) return;
    const controls = animate(0, 1, {
      duration: 3.4,
      delay: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.8,
      onUpdate: place,
    });
    return () => controls.stop();
  }, [points, hasRoute, reduceMotion, inView]);

  const label = quote
    ? `App preview: ${shared ? "Shared" : "Solo"} ride from ${pickup} to ${destination}${shared ? " with 3 riders" : ""}.`
    : `App preview: pickup at ${pickup}.`;

  return (
    <div role="img" aria-label={label}>
      <PhoneFrame>
        <svg
          ref={svgRef}
          viewBox="0 0 240 500"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          {/* Roads */}
          {MINOR_ROADS.map((v) => (
            <g key={`minor-${v}`} className="stroke-line" strokeWidth={1.5}>
              <line x1={v} y1={0} x2={v} y2={500} />
              <line x1={0} y1={v * 2} x2={240} y2={v * 2} />
            </g>
          ))}
          {ROAD_X.map((x) => (
            <line key={`x-${x}`} x1={x} y1={0} x2={x} y2={500} className="stroke-white" strokeWidth={7} />
          ))}
          {ROAD_Y.map((y) => (
            <line key={`y-${y}`} x1={0} y1={y} x2={240} y2={y} className="stroke-white" strokeWidth={7} />
          ))}

          {quote && (
            <m.path
              key={d}
              d={d}
              fill="none"
              className="stroke-ink"
              strokeWidth={4.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}

          {/* Co-riders on Shared */}
          <AnimatePresence>
            {shared &&
              RIDER_STOPS.map((t) => {
                const p = pointAt(points, t);
                return (
                  <m.g
                    key={`${d}-${t}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 18, delay: reduceMotion ? 0 : t * 0.4 }}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  >
                    <circle cx={p.x} cy={p.y} r={9} className="fill-brand stroke-white" strokeWidth={3} />
                    <circle cx={p.x} cy={p.y - 2} r={2.6} className="fill-ink" />
                    <path d={`M${p.x - 4.2} ${p.y + 4.6}a4.2 4.2 0 0 1 8.4 0`} className="fill-ink" />
                  </m.g>
                );
              })}
          </AnimatePresence>

          {/* Pins */}
          <circle cx={from.x} cy={from.y} r={7} className="fill-white stroke-ink" strokeWidth={3.5} />
          {quote && (
            <g>
              <circle cx={to.x} cy={to.y} r={9} className="fill-ink" />
              <circle cx={to.x} cy={to.y} r={3.5} className="fill-brand" />
            </g>
          )}
          {[{ p: from, name: pickup }, ...(quote ? [{ p: to, name: destination }] : [])].map(({ p, name }) => (
            <text
              key={name}
              x={p.x}
              y={p.y - 15}
              textAnchor="middle"
              className="fill-ink stroke-map text-[11px] font-bold"
              strokeWidth={4}
              paintOrder="stroke"
            >
              {name}
            </text>
          ))}

          {/* Car */}
          {quote && (
            <g ref={carRef} transform={`translate(${from.x} ${from.y})`}>
              <rect x={-11} y={-7} width={22} height={14} rx={4.5} className="fill-brand stroke-ink" strokeWidth={2} />
              <rect x={1} y={-4.5} width={6} height={9} rx={1.5} className="fill-ink" />
            </g>
          )}
        </svg>

        {/* Mini trip card */}
        <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl bg-white p-3.5 shadow-lg shadow-ink/10" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={quote ? mode : "none"}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: reduceMotion ? 0 : 0.15 } }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                <Icon name={shared ? "share" : "car"} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ink">
                  {quote ? (shared ? home.hero.phone.shared : home.hero.phone.solo) : home.hero.estimator.sameArea}
                </span>
                <span className="block truncate text-xs text-muted">
                  {quote ? `${pickup} → ${destination}` : pickup}
                </span>
              </span>
              {quote && (
                <span className="text-sm font-extrabold text-ink tabular-nums">
                  {formatNaira(shared ? quote.shared : quote.solo)}
                </span>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </PhoneFrame>
    </div>
  );
}
