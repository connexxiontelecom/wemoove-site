import { Icon } from "@/components/ui/Icon";
import { safety } from "@/content/safety";

const { shared } = safety;
const RIDERS = [
  { x: 70, y: 98 },
  { x: 182, y: 58 },
  { x: 290, y: 92 },
];

/** Shared rides callout with a small route diagram: one car, riders picked up along the way. */
export function SafetyShared() {
  return (
    <section aria-labelledby="shared-title" className="bg-brand/15">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="font-bold text-muted">{shared.eyebrow}</p>
          <h2 id="shared-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            {shared.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{shared.body}</p>
          <ul className="mt-6 grid gap-2.5">
            {shared.points.map((point) => (
              <li key={point} className="flex items-start gap-3 font-semibold">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-save text-white">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-ink/5">
          <svg viewBox="0 0 360 150" className="w-full" aria-hidden="true">
            <path d="M20 120 C70 98 110 60 182 58 S290 92 340 40" fill="none" className="stroke-line" strokeWidth={14} strokeLinecap="round" />
            <path
              d="M20 120 C70 98 110 60 182 58 S290 92 340 40"
              fill="none"
              className="stroke-route"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="2 9"
            />
            {RIDERS.map(({ x, y }) => (
              <g key={x}>
                <circle cx={x} cy={y} r={15} className="fill-white stroke-brand" strokeWidth={3.5} />
                <circle cx={x} cy={y - 3.5} r={4} className="fill-ink" />
                <path d={`M${x - 7} ${y + 8}a7 7 0 0 1 14 0`} className="fill-ink" />
              </g>
            ))}
            <circle cx={340} cy={40} r={9} className="fill-ink stroke-white" strokeWidth={3} />
          </svg>
          <p className="mt-2 flex items-center justify-between text-sm font-semibold text-muted">
            <span>Every rider booked in the app</span>
            <span className="text-save">Driver verified</span>
          </p>
        </div>
      </div>
    </section>
  );
}
