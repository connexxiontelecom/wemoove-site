"use client";

import { AnimatePresence, animate, m, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MapTag } from "@/components/home/MapTag";
import { AREAS, type Area } from "@/content/areas";
import { home } from "@/content/home";
import { DECOR_ROADS, EDGES, NODES, edgePoints, findRoute, fitViewBox, pointAt, toPath, type Point } from "@/lib/abujaMap";
import type { RideMode } from "@/lib/ride";

type RideMapProps = {
  pickup: Area;
  destination: Area;
  mode: RideMode;
  /**
   * "phone": the full 240×500 map behind the phone mockup's status bar and bottom sheet.
   * "card": a compact 16:10 map that pans and zooms to fit each trip (mobile hero).
   */
  variant: "phone" | "card";
};

const copy = home.hero.phone;
const RIDER_STOPS = [0.36, 0.68];
const CARD_ASPECT = 16 / 10;
/** Never zoom the card map in closer than this many map units across. */
const MIN_CARD_WIDTH = 200;
/** Card width (in map units) at which markers are drawn at their natural size. */
const CARD_REFERENCE_WIDTH = 290;
/** On-screen card width (px) the numbers above are tuned for. Wider cards show more of the map. */
const CARD_BASE_PX = 340;
const ROADS = [
  ...DECOR_ROADS.map((pts) => ({ d: toPath(pts), major: false })),
  ...EDGES.map((e) => ({ d: toPath(edgePoints(e)), major: e.major })),
];

/** Scale an element about its own anchor point. */
const scaleAt = (x: number, y: number, k: number) => `translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})`;

export function RideMap({ pickup, destination, mode, variant }: RideMapProps) {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const inView = useInView(svgRef);
  const patternId = `streets-${useId().replace(/:/g, "")}`;
  const isCard = variant === "card";

  // Card: wider than a phone card → show more of the city (and let markers grow a little, not 1:1 with width).
  const [cardScale, setCardScale] = useState(1);
  useEffect(() => {
    const svg = svgRef.current;
    if (!isCard || !svg) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.max(1, Math.round((entry.contentRect.width / CARD_BASE_PX) ** 0.6 * 4) / 4);
      setCardScale((prev) => (prev === next ? prev : next));
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, [isCard]);

  const hasRoute = pickup !== destination;
  const shared = mode === "shared" && hasRoute;
  const route = useMemo(() => findRoute(pickup, destination), [pickup, destination]);
  const d = toPath(route);
  const from = NODES[pickup];
  const to = NODES[destination];
  const mid = pointAt(route, 0.5);

  // Card: frame the trip and keep markers the same size on screen at every zoom (k = marker scale).
  const { viewBox, k } = useMemo(() => {
    if (!isCard) return { viewBox: "0 0 240 500", k: 1 };
    const framed = (scale: number) => {
      const pts: Point[] = hasRoute
        ? [
            ...route,
            { x: from.x - 24 * scale, y: from.y - 26 * scale },
            { x: from.x + 24 * scale, y: from.y + 22 * scale },
            { x: to.x - 24 * scale, y: to.y - 26 * scale },
            { x: to.x + 24 * scale, y: to.y + 34 * scale },
            { x: mid.x + 60 * scale, y: mid.y + 12 * scale },
          ]
        : [
            { x: from.x - 70 * scale, y: from.y - 40 * scale },
            { x: from.x + 70 * scale, y: from.y + 30 * scale },
          ];
      // Reserve ~44px of headroom for the "Live route preview" label.
      const minWidth = MIN_CARD_WIDTH * cardScale;
      const first = fitViewBox(pts, CARD_ASPECT, minWidth);
      const topY = Math.min(...pts.map((pt) => pt.y));
      return fitViewBox([...pts, { x: first.x + first.w / 2, y: topY - 44 * (first.w / (CARD_BASE_PX * cardScale)) }], CARD_ASPECT, minWidth);
    };
    // Two passes: marker size depends on zoom, and zoom depends on marker size.
    const reference = CARD_REFERENCE_WIDTH * cardScale;
    const pass1 = framed(1);
    const vb = framed(pass1.w / reference);
    return {
      viewBox: `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`,
      k: vb.w / reference,
    };
  }, [isCard, hasRoute, route, from, to, mid, cardScale]);

  // Phone: tags flip below pins near the top so they never hide under the address bar.
  // Card: on short trips (ends under ~110px apart) the drop-off tag goes below and the chip moves left.
  const pxPerUnit = isCard ? CARD_BASE_PX / (k * CARD_REFERENCE_WIDTH) : 1;
  const close = isCard && Math.hypot(to.x - from.x, to.y - from.y) * pxPerUnit < 110;
  const pickupBelow = !isCard && from.y < 110;
  const dropBelow = isCard ? close : to.y < 110;
  const chipX = isCard ? (close ? mid.x - 56 * k : mid.x + 8 * k) : Math.min(Math.max(mid.x + 8, 6), 186);
  const chipY = mid.y - 10 * k;

  // The car drives the route on a loop. Paused off screen; parked at pickup for reduced motion.
  useEffect(() => {
    const car = carRef.current;
    if (!car || !hasRoute) return;
    const place = (t: number) => {
      const pt = pointAt(route, t);
      car.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${pt.angle}) scale(${k})`);
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
  }, [route, hasRoute, reduceMotion, inView, k]);

  return (
    <m.svg
      ref={svgRef}
      viewBox={viewBox}
      initial={false}
      animate={{ viewBox }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.4, 0, 0.2, 1] }}
      preserveAspectRatio={isCard ? "xMidYMid slice" : "xMidYMin slice"}
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-16)">
          <path d="M0 0H9M0 0V9" className="stroke-road-edge" strokeWidth={0.6} fill="none" />
        </pattern>
      </defs>

      {/* Land, street texture, parks and water (extends past the edges for the zoomed card view) */}
      <rect x="-300" y="-200" width="840" height="900" className="fill-map" />
      <rect x="-300" y="-200" width="840" height="900" fill={`url(#${patternId})`} opacity={0.7} />
      <path d="M-140 140 C10 148 30 230 -140 270 Z" className="fill-park" />
      <path d="M206 168 C232 160 248 200 260 236 C226 232 214 214 206 168 Z" className="fill-park" />
      <ellipse cx="190" cy="205" rx="13" ry="8" className="fill-park" />
      <ellipse cx="206" cy="234" rx="8" ry="6" className="fill-park" />
      <path d="M8 40 C30 30 22 10 -40 14 Z" className="fill-park" />
      <ellipse cx="80" cy="198" rx="9" ry="5" className="fill-water" />
      <path d="M-140 425 C-40 412 40 410 80 440 C120 430 160 420 200 440 C260 436 320 428 380 432" className="stroke-water" strokeWidth={5} fill="none" />

      {/* Roads: edge colour first, white on top */}
      {ROADS.map(({ d: road, major }, i) => (
        <path key={`edge-${i}`} d={road} fill="none" className="stroke-road-edge" strokeWidth={major ? 8 : 5.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {ROADS.map(({ d: road, major }, i) => (
        <path key={`road-${i}`} d={road} fill="none" className="stroke-white" strokeWidth={major ? 6 : 3.8} strokeLinecap="round" strokeLinejoin="round" />
      ))}

      {hasRoute && (
        <g key={d}>
          {[
            { cls: "stroke-white", w: 7 },
            { cls: "stroke-route", w: 4 },
          ].map(({ cls, w }) => (
            <m.path
              key={cls}
              d={d}
              fill="none"
              className={cls}
              strokeWidth={w * k}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: isCard && !reduceMotion ? 0.35 : 0 }}
            />
          ))}
        </g>
      )}

      {/* District names */}
      {AREAS.map((name) => (
        <text
          key={name}
          x={NODES[name].x}
          y={NODES[name].y + 14 * k}
          textAnchor="middle"
          className="fill-map-label stroke-map font-bold uppercase tracking-[0.12em]"
          style={{ fontSize: `${6.5 * k}px` }}
          strokeWidth={2.5 * k}
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
              <g key={`${d}-${t}`} transform={scaleAt(pt.x, pt.y, k)}>
                <m.g
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
              </g>
            );
          })}
      </AnimatePresence>

      {/* Ride chip: which ride is on the map (no prices or ETAs, they depend on live conditions) */}
      {hasRoute && (
        <g transform={`translate(${chipX} ${chipY}) scale(${k})`}>
          <rect width="48" height="20" rx="4" className="fill-white stroke-road-edge" strokeWidth={0.8} />
          <text x="6" y="9" className="fill-ink text-[7px] font-bold">
            {copy.rideName}
          </text>
          <text x="6" y="16.5" className="fill-map-label text-[5.5px] font-semibold">
            {shared ? copy.shared : copy.solo}
          </text>
        </g>
      )}

      {/* Pickup: pulsing location dot */}
      <g transform={scaleAt(from.x, from.y, k)}>
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
      </g>
      <MapTag at={from} label={copy.pickupTag} below={pickupBelow} scale={k} />

      {hasRoute && (
        <g>
          <circle cx={to.x} cy={to.y} r={4.5 * k} className="fill-ink stroke-white" strokeWidth={1.5 * k} />
          <MapTag at={to} label={copy.dropoffTag} below={dropBelow} scale={k} />
        </g>
      )}

      {/* Car, seen from above */}
      {hasRoute && (
        <g ref={carRef} transform={`translate(${from.x} ${from.y}) scale(${k})`}>
          <rect x={-8} y={-4.5} width={16} height={9} rx={3} className="fill-brand stroke-ink" strokeWidth={0.9} />
          <rect x={1.5} y={-3.4} width={3.2} height={6.8} rx={1} className="fill-ink" opacity={0.75} />
          <rect x={-6} y={-3.4} width={2.2} height={6.8} rx={0.8} className="fill-ink" opacity={0.5} />
        </g>
      )}
    </m.svg>
  );
}
