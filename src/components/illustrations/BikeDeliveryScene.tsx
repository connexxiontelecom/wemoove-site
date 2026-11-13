import { Wheel } from "@/components/illustrations/Wheel";

/** A WeMoove rider in an amber jacket and helmet on a delivery bike with a branded box. */
export function BikeDeliveryScene() {
  return (
    <g>
      <ellipse cx="225" cy="262" rx="120" ry="8" className="fill-ink" opacity={0.35} />
      {/* Delivery box */}
      <rect x="92" y="122" width="88" height="74" rx="8" className="fill-brand stroke-ink" strokeWidth={3} />
      <rect x="92" y="122" width="88" height="16" rx="6" className="fill-ink" opacity={0.12} />
      <image href="/brand/01_Logo/Horizontal/WeMoove_Logo_Horizontal_Black.svg" x="99" y="146" width="74" height="27" />
      <rect x="120" y="196" width="34" height="10" className="fill-ink" />

      {/* Bike frame */}
      <path d="M150 226 L196 226 L232 196 L292 196 L318 232" fill="none" className="stroke-ink" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M176 210 H270 a14 14 0 0 1 0 22 H196 Z" className="fill-night" />
      <path d="M300 160 L326 232" className="stroke-ink" strokeWidth={8} strokeLinecap="round" />
      <path d="M288 156 H316" className="stroke-ink" strokeWidth={7} strokeLinecap="round" />
      <circle cx="324" cy="196" r="7" className="fill-brand stroke-ink" strokeWidth={2} />

      {/* Rider: legs */}
      <path d="M214 196 L252 206 L246 238" fill="none" className="stroke-ink" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M238 240 H260" className="stroke-ink" strokeWidth={9} strokeLinecap="round" />
      {/* Rider: amber WeMoove jacket */}
      <path d="M198 200 C196 168 208 140 236 134 C258 130 270 150 266 176 L258 204 Z" className="fill-brand stroke-ink" strokeWidth={3} strokeLinejoin="round" />
      <path d="M214 170 H252" className="stroke-ink" strokeWidth={3} opacity={0.35} />
      <text x="233" y="190" textAnchor="middle" className="fill-ink text-[11px] font-extrabold">
        W
      </text>
      {/* Arm to the handlebar */}
      <path d="M252 150 L284 160 L300 158" fill="none" className="stroke-brand" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M252 150 L284 160 L300 158" fill="none" className="stroke-ink" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.4} />
      <circle cx="302" cy="158" r="6" className="fill-ink" />
      {/* Helmet */}
      <circle cx="244" cy="112" r="22" className="fill-brand stroke-ink" strokeWidth={3} />
      <path d="M248 104 H266 a4 4 0 0 1 0 14 H252 Z" className="fill-ink" />
      <path d="M226 102 a22 22 0 0 1 30 -10" fill="none" className="stroke-white" strokeWidth={3} opacity={0.6} strokeLinecap="round" />

      <Wheel cx={176} cy={240} r={26} />
      <Wheel cx={326} cy={240} r={26} />
    </g>
  );
}
