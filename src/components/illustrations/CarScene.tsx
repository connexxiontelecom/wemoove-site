import { Wheel } from "@/components/illustrations/Wheel";

type CarSceneProps = {
  /** "executive" is a long black saloon, "premium" a slate saloon, "standard" an amber WeMoove car. */
  variant: "standard" | "executive" | "premium";
};

/** Side view of a WeMoove car with a driver and a WeMoove door sticker. */
export function CarScene({ variant }: CarSceneProps) {
  const body = variant === "executive" ? "fill-ink" : variant === "premium" ? "fill-premium" : "fill-brand stroke-ink";
  const long = variant === "executive";
  const x0 = long ? 84 : 104;
  const x1 = long ? 412 : 392;
  return (
    <g>
      <ellipse cx="248" cy="262" rx={long ? 175 : 155} ry="8" className="fill-ink" opacity={0.35} />
      {/* Body */}
      <path
        d={`M${x0} 232 C${x0 - 6} 208 ${x0 + 2} 192 ${x0 + 30} 188 L${x0 + 92} 182 C${x0 + 118} 150 ${x0 + 148} 136 ${x0 + 188} 136 L${x1 - 112} 136 C${x1 - 82} 136 ${x1 - 62} 156 ${x1 - 44} 182 L${x1 - 14} 190 C${x1} 194 ${x1 + 6} 212 ${x1} 232 Z`}
        className={body}
        strokeWidth={3}
      />
      {/* Windows */}
      <path
        d={`M${x0 + 104} 182 C${x0 + 124} 158 ${x0 + 148} 148 ${x0 + 178} 148 L${x0 + 178} 182 Z`}
        className="fill-map"
        opacity={0.85}
      />
      <path
        d={`M${x0 + 190} 148 L${x1 - 114} 148 C${x1 - 92} 148 ${x1 - 76} 164 ${x1 - 62} 182 L${x0 + 190} 182 Z`}
        className="fill-map"
        opacity={0.85}
      />
      {/* Driver */}
      <circle cx={x1 - 100} cy="162" r="9" className="fill-skin" />
      <path d={`M${x1 - 114} 182 a14 12 0 0 1 28 0 Z`} className="fill-ink" />
      {/* Door line, handle, WeMoove sticker */}
      <path d={`M${x0 + 184} 148 V226`} className="stroke-white" strokeWidth={1.5} opacity={0.25} />
      <rect x={x0 + 118} y="196" width="18" height="4" rx="2" className="fill-white" opacity={0.5} />
      <rect x={x0 + 198} y="196" width="18" height="4" rx="2" className="fill-white" opacity={0.5} />
      <rect x={x0 + 112} y="206" width="76" height="16" rx="8" className="fill-white stroke-brand" strokeWidth={2} />
      <image href="/brand/01_Logo/Horizontal/WeMoove_Logo_Horizontal_Color.svg" x={x0 + 130} y="207" width="40" height="15" />
      {/* Lights */}
      <rect x={x1 - 14} y="196" width="14" height="8" rx="3" className="fill-brand" />
      <rect x={x0 - 2} y="198" width="10" height="7" rx="3" className="fill-pin" />

      <Wheel cx={x0 + 62} cy={234} r={25} />
      <Wheel cx={x1 - 66} cy={234} r={25} />
    </g>
  );
}
