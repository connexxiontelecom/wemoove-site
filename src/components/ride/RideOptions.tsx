import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { home } from "@/content/home";
import { ride } from "@/content/ride";

const { options } = ride;
// Same ride types, copy and photos as "More ways to move" on the home page.
// Ordered from everyday to top tier.
const ORDER = ["standard", "premium", "executive"];
const rides = home.moreWays.services
  .filter((s) => s.kind === "Ride")
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

/** Standard, Executive and Premium as tall photo cards with what each is best for. */
export function RideOptions() {
  return (
    <section aria-labelledby="options-title" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="font-bold text-muted">{options.eyebrow}</p>
          <h2 id="options-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {options.title}
          </h2>
        </div>

        <ul data-reveal-stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {rides.map((r) => {
            const standard = r.id === "standard";
            return (
              <li
                key={r.id}
                className={`flex flex-col overflow-hidden rounded-3xl border transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 ${standard ? "border-brand bg-brand/10 ring-2 ring-brand" : "border-line bg-paper"}`}
              >
                <div className="relative aspect-[16/10]">
                  {r.photo && (
                    <Image src={r.photo} alt={r.photoAlt ?? ""} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold shadow-sm">{r.short}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-2xl font-extrabold">{r.name}</h3>
                  <p className="mt-1 font-semibold">{r.tagline}</p>
                  <p className="mt-3 text-muted">{r.body}</p>
                  {standard && (
                    <p className="mt-4 flex gap-2">
                      {options.standardModes.map((mode) => (
                        <span key={mode} className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">
                          {mode}
                        </span>
                      ))}
                    </p>
                  )}
                  <ul className="mt-5 grid gap-2.5 border-t border-line pt-5">
                    {r.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm font-semibold">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-save text-white">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
