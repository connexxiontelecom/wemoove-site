import { Icon } from "@/components/ui/Icon";
import { offerings } from "@/content/offerings";

const { coming } = offerings;

/** Interstate and Business: what's broken today and what WeMoove is building. */
export function OfferingsComing() {
  return (
    <section aria-labelledby="coming-title" className="bg-night text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <p className="font-bold text-brand">{coming.eyebrow}</p>
        <h2 id="coming-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          {coming.title}
        </h2>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {coming.items.map((item) => (
            <li key={item.name} className="flex flex-col rounded-3xl border border-dashed border-white/25 bg-white/5 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-ink">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                  {coming.label}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-extrabold">{item.name}</h3>
              <p className="mt-1 text-lg font-semibold text-white/90">{item.tagline}</p>
              <dl className="mt-6 grid gap-4 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-sm font-bold uppercase tracking-wider text-white/60">{coming.problemLabel}</dt>
                  <dd className="mt-1 text-white/80">{item.problem}</dd>
                </div>
                <div>
                  <dt className="text-sm font-bold uppercase tracking-wider text-brand">{coming.promiseLabel}</dt>
                  <dd className="mt-1 text-white/90">{item.promise}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
