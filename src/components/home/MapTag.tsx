import type { Point } from "@/lib/abujaMap";

type MapTagProps = {
  at: Point;
  label: string;
  /** Place the tag under the point instead of above it. */
  below?: boolean;
  /** Size multiplier, so tags stay the same size on screen when the map zooms. */
  scale?: number;
};

/** Orange "Pickup" / "Drop-off" label pinned to a map point, like the app. */
export function MapTag({ at, label, below = false, scale = 1 }: MapTagProps) {
  const w = label.length * 4.6 + 12;
  const y = below ? at.y + 9 : at.y - 24;
  const pointer = below
    ? `M${at.x - 4} ${y} L${at.x} ${y - 4} L${at.x + 4} ${y}z`
    : `M${at.x - 4} ${y + 15} L${at.x} ${y + 19} L${at.x + 4} ${y + 15}z`;
  return (
    <g transform={scale === 1 ? undefined : `translate(${at.x} ${at.y}) scale(${scale}) translate(${-at.x} ${-at.y})`}>
      <rect x={at.x - w / 2} y={y} width={w} height={15} rx={4} className="fill-pin" />
      <path d={pointer} className="fill-pin" />
      <text x={at.x} y={y + 10.5} textAnchor="middle" className="fill-white text-[7.5px] font-bold">
        {label}
      </text>
    </g>
  );
}
