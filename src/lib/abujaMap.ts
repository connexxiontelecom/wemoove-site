import type { Area } from "@/content/areas";

/**
 * Stylised Abuja map for the hero phone (240×500 units, north up, not to scale).
 * Routes follow the road graph below, so they bend along real-looking roads.
 */

export type Point = { x: number; y: number };
type NodeId = Area | "LifeCamp" | "AirportJn";

export const NODES: Record<NodeId, Point> = {
  Kubwa: { x: 38, y: 72 },
  Gwarinpa: { x: 60, y: 120 },
  LifeCamp: { x: 92, y: 172 },
  Jabi: { x: 98, y: 190 },
  Maitama: { x: 165, y: 150 },
  Wuse: { x: 138, y: 205 },
  CBD: { x: 172, y: 238 },
  Asokoro: { x: 210, y: 255 },
  Garki: { x: 146, y: 272 },
  AirportJn: { x: 90, y: 305 },
  Lugbe: { x: 40, y: 330 },
};

type Edge = { from: NodeId; to: NodeId; via: Point[]; major: boolean };

const p = (x: number, y: number): Point => ({ x, y });

/** Routable roads. `via` holds the bends between the two ends. */
export const EDGES: Edge[] = [
  { from: "Kubwa", to: "Gwarinpa", via: [p(46, 96)], major: true }, // Kubwa Expressway
  { from: "Gwarinpa", to: "LifeCamp", via: [p(74, 148)], major: true },
  { from: "LifeCamp", to: "Jabi", via: [], major: false },
  { from: "Jabi", to: "Wuse", via: [p(118, 197)], major: false },
  { from: "Gwarinpa", to: "Maitama", via: [p(100, 126), p(136, 136)], major: true }, // Outer Northern Expressway
  { from: "Maitama", to: "Wuse", via: [p(150, 176)], major: false },
  { from: "Maitama", to: "Asokoro", via: [p(192, 182), p(212, 218)], major: true },
  { from: "Wuse", to: "CBD", via: [p(156, 222)], major: false },
  { from: "CBD", to: "Asokoro", via: [p(192, 248)], major: false },
  { from: "Wuse", to: "Garki", via: [p(141, 240)], major: false },
  { from: "CBD", to: "Garki", via: [p(158, 256)], major: false },
  { from: "Garki", to: "Asokoro", via: [p(180, 274)], major: false },
  { from: "Garki", to: "AirportJn", via: [p(118, 290)], major: true }, // Airport Road
  { from: "AirportJn", to: "Lugbe", via: [p(64, 318)], major: true },
  { from: "Jabi", to: "AirportJn", via: [p(100, 250)], major: false },
];

/** Background roads that are drawn but never routed on. */
export const DECOR_ROADS: Point[][] = [
  [p(-140, 120), p(0, 100), p(38, 72), p(70, 40), p(150, -60)],
  [p(380, 110), p(240, 120), p(200, 140), p(165, 150)],
  [p(380, 330), p(240, 300), p(210, 255)],
  [p(-140, 380), p(0, 360), p(40, 330)],
  [p(90, 305), p(110, 360), p(140, 520)],
  [p(146, 272), p(152, 340), p(170, 520)],
  [p(-140, 214), p(0, 210), p(60, 205), p(98, 190)],
  [p(165, 150), p(170, 100), p(200, -60)],
];

export function edgePoints(e: Edge): Point[] {
  return [NODES[e.from], ...e.via, NODES[e.to]];
}

export function routeLength(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return total;
}

/** Shortest road route between two areas (Dijkstra over the road graph). */
export function findRoute(from: Area, to: Area): Point[] {
  const dist = new Map<NodeId, number>();
  const prev = new Map<NodeId, { node: NodeId; points: Point[] }>();
  const unvisited = new Set<NodeId>(Object.keys(NODES) as NodeId[]);
  for (const n of unvisited) dist.set(n, Infinity);
  dist.set(from, 0);

  while (unvisited.size) {
    let current: NodeId | null = null;
    for (const n of unvisited) if (current === null || dist.get(n)! < dist.get(current)!) current = n;
    if (current === null || dist.get(current) === Infinity || current === to) break;
    unvisited.delete(current);
    for (const e of EDGES) {
      if (e.from !== current && e.to !== current) continue;
      const next = e.from === current ? e.to : e.from;
      if (!unvisited.has(next)) continue;
      const pts = e.from === current ? edgePoints(e) : [...edgePoints(e)].reverse();
      const d = dist.get(current)! + routeLength(pts);
      if (d < dist.get(next)!) {
        dist.set(next, d);
        prev.set(next, { node: current, points: pts });
      }
    }
  }

  const route: Point[] = [];
  let node: NodeId = to;
  while (node !== from) {
    const step = prev.get(node);
    if (!step) return [NODES[from], NODES[to]];
    route.unshift(...step.points.slice(1));
    node = step.node;
  }
  return [NODES[from], ...route];
}

/** Position and heading (degrees) at fraction t (0–1) along a polyline. */
export function pointAt(points: Point[], t: number): { x: number; y: number; angle: number } {
  const total = routeLength(points) || 1;
  let remaining = Math.min(Math.max(t, 0), 1) * total;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len === 0) continue;
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    if (remaining <= len || i === points.length - 1) {
      const k = Math.min(remaining / len, 1);
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, angle };
    }
    remaining -= len;
  }
  return { ...points[0], angle: 0 };
}

export function toPath(points: Point[]): string {
  return `M${points.map((pt) => `${pt.x} ${pt.y}`).join(" L")}`;
}

export type ViewBox = { x: number; y: number; w: number; h: number };

/**
 * A viewBox that frames the whole trip (route, tags and ETA chip) at the given aspect ratio,
 * used by the compact mobile map. Never zooms in further than `minWidth` units.
 */
export function fitViewBox(points: Point[], aspect: number, minWidth = 130): ViewBox {
  const xs = points.map((pt) => pt.x);
  const ys = points.map((pt) => pt.y);
  const pad = 14;
  const minX = Math.min(...xs) - pad;
  const maxX = Math.max(...xs) + pad;
  const minY = Math.min(...ys) - pad;
  const maxY = Math.max(...ys) + pad;
  const w = Math.max(maxX - minX, (maxY - minY) * aspect, minWidth);
  const h = w / aspect;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

/** Route from `from` to `to` that stops at `via` on the way, plus how far along (0–1) the stop is. */
export function findRouteVia(from: Area, via: Area, to: Area): { route: Point[]; viaT: number } {
  const first = findRoute(from, via);
  const second = findRoute(via, to);
  const route = [...first, ...second.slice(1)];
  return { route, viaT: routeLength(first) / (routeLength(route) || 1) };
}
