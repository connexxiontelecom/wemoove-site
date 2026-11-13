import { Wheel } from "@/components/illustrations/Wheel";

/** A WeMoove delivery truck with a crew member in an amber vest carrying a parcel. */
export function TruckDeliveryScene() {
  return (
    <g>
      <ellipse cx="270" cy="262" rx="170" ry="8" className="fill-ink" opacity={0.35} />
      {/* Cargo box */}
      <rect x="140" y="104" width="214" height="128" rx="8" className="fill-white stroke-ink" strokeWidth={3} />
      <rect x="140" y="196" width="214" height="22" className="fill-brand" />
      <image href="/brand/01_Logo/Horizontal/WeMoove_Logo_Horizontal_Color.svg" x="172" y="118" width="150" height="55" />
      <text x="247" y="190" textAnchor="middle" className="fill-muted text-[11px] font-bold tracking-[0.2em]">
        TRUCK DELIVERY
      </text>
      {/* Cab */}
      <path d="M354 140 H404 L438 184 V232 H354 Z" className="fill-brand stroke-ink" strokeWidth={3} strokeLinejoin="round" />
      <path d="M366 152 H400 L424 184 H366 Z" className="fill-ink" opacity={0.75} />
      <circle cx="386" cy="170" r="7" className="fill-skin" />
      <rect x="430" y="206" width="12" height="8" rx="2" className="fill-white stroke-ink" strokeWidth={1.5} />
      <rect x="140" y="230" width="300" height="8" className="fill-ink" />

      <Wheel cx={190} cy={242} r={22} />
      <Wheel cx={300} cy={242} r={22} />
      <Wheel cx={398} cy={242} r={22} />

      {/* Crew member carrying a parcel */}
      <path d="M78 238 L84 200 M100 238 L96 200" className="stroke-ink" strokeWidth={11} strokeLinecap="round" />
      <path d="M68 202 C66 172 74 150 90 148 C106 150 114 172 112 202 Z" className="fill-ink" />
      <path d="M72 200 C70 176 76 156 90 154 C104 156 110 176 108 200 L98 200 L94 170 H86 L82 200 Z" className="fill-brand stroke-ink" strokeWidth={2} strokeLinejoin="round" />
      <path d="M76 186 H104" className="stroke-white" strokeWidth={3} opacity={0.8} />
      <circle cx="90" cy="132" r="13" className="fill-skin" />
      <path d="M77 128 a13 13 0 0 1 26 0 Z" className="fill-brand stroke-ink" strokeWidth={2} />
      <rect x="96" y="158" width="40" height="32" rx="3" className="fill-cardboard stroke-ink" strokeWidth={2} />
      <path d="M96 168 H136" className="stroke-ink" strokeWidth={1.5} opacity={0.4} />
      <path d="M104 166 L118 172" className="stroke-skin" strokeWidth={8} strokeLinecap="round" />
    </g>
  );
}
