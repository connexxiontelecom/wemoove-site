/** Abuja backdrop shared by the "More ways to move" scenes (480×300): sun, Aso Rock, skyline, road. */
export function SceneBackdrop() {
  return (
    <g>
      <circle cx="392" cy="70" r="34" className="fill-brand" opacity={0.45} />
      {/* Aso Rock */}
      <path d="M250 214 C262 150 300 112 342 108 C384 104 420 138 438 214 Z" className="fill-night" opacity={0.1} />
      <path d="M300 214 C312 170 336 146 360 146 C384 146 404 172 414 214 Z" className="fill-night" opacity={0.08} />
      {/* City skyline */}
      <g className="fill-night" opacity={0.12}>
        <rect x="22" y="150" width="34" height="64" rx="3" />
        <rect x="62" y="120" width="26" height="94" rx="3" />
        <rect x="94" y="164" width="40" height="50" rx="3" />
        <rect x="140" y="136" width="22" height="78" rx="3" />
        {/* National Mosque style dome and minaret */}
        <path d="M172 214 V184 a26 26 0 0 1 52 0 V214 Z" />
        <rect x="230" y="128" width="6" height="86" rx="3" />
        <circle cx="233" cy="126" r="5" />
      </g>
      {/* Road */}
      <rect x="0" y="236" width="480" height="64" className="fill-night" />
      <path d="M0 268 H480" className="stroke-white" strokeWidth={3} strokeDasharray="22 18" opacity={0.6} />
      <rect x="0" y="230" width="480" height="8" className="fill-night" opacity={0.25} />
    </g>
  );
}
