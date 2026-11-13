import { Icon } from "@/components/ui/Icon";

/** Simplified app screens for each How It Works step. Decorative, so hidden from screen readers. */
export function StepScreen({ step }: { step: number }) {
  return (
    <div className="bg-dot-grid flex h-full w-full flex-col justify-end gap-3 p-4 pt-12 text-ink" aria-hidden="true">
      {step === 0 && (
        <>
          <span className="block h-3 rounded-full bg-line w-1/2" />
          <div className="space-y-2 rounded-2xl bg-white p-3 shadow-sm">
            <span className="flex items-center gap-2 rounded-xl bg-paper px-3 py-2 text-sm font-semibold">
              <Icon name="pin" className="h-4 w-4" /> Pickup
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-paper px-3 py-2 text-sm font-semibold">
              <Icon name="map" className="h-4 w-4" /> Destination
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-sm font-bold">
            <span className="rounded-full bg-white py-2 ring-1 ring-line">Solo</span>
            <span className="rounded-full bg-brand py-2">Shared</span>
          </div>
          <span className="rounded-full bg-ink py-2.5 text-center text-sm font-semibold text-white">Confirm</span>
        </>
      )}
      {step === 1 && (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
              <Icon name="user" className="h-6 w-6" />
            </span>
            <span className="flex-1 space-y-1.5">
              <span className="block h-3 rounded-full bg-line w-3/4" />
              <span className="block h-3 rounded-full bg-line w-1/2" />
            </span>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-sm font-bold">
            <Icon name="shieldCheck" className="h-5 w-5" /> Verified driver
          </p>
          <div className="mt-3 flex gap-2">
            <span className="block h-8 w-1/2 rounded-full bg-line" />
            <span className="block h-8 w-1/2 rounded-full bg-line" />
          </div>
        </div>
      )}
      {step === 2 && (
        <>
          <svg viewBox="0 0 200 160" className="w-full flex-1">
            <path d="M0 50h200M0 110h200M50 0v160M140 0v160" className="stroke-white" strokeWidth={8} />
            <path d="M50 130V50h90V20" fill="none" className="stroke-ink" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={50} cy={130} r={6} className="fill-white stroke-ink" strokeWidth={3} />
            <rect x={130} y={10} width={20} height={20} rx={10} className="fill-ink" />
            <rect x={40} y={84} width={20} height={13} rx={4} className="fill-brand stroke-ink" strokeWidth={2} />
          </svg>
          <p className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-bold shadow-sm">
            <Icon name="share" className="h-5 w-5" /> Trip shared live
          </p>
        </>
      )}
      {step === 3 && (
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand">
            <Icon name="check" className="h-6 w-6" />
          </span>
          <p className="mt-3 font-bold">Trip complete</p>
          <div className="mt-2 flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" className="h-5 w-5 fill-brand" />
            ))}
          </div>
          <span className="block h-3 rounded-full bg-line mx-auto mt-3 w-2/3" />
        </div>
      )}
    </div>
  );
}

