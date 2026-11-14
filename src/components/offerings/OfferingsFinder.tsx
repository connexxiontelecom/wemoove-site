import { Icon } from "@/components/ui/Icon";
import { SectionLink } from "@/components/ui/SectionLink";
import { offerings } from "@/content/offerings";

const { finder } = offerings;

/** "I want to…" → the right WeMoove option, as a list of links. */
export function OfferingsFinder() {
  return (
    <section aria-labelledby="finder-title" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.6fr] lg:px-8 lg:py-28">
        <div>
          <p className="font-bold text-muted">{finder.eyebrow}</p>
          <h2 id="finder-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {finder.title}
          </h2>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {finder.needs.map((n) => (
            <li key={n.need}>
              <SectionLink
                href={n.href}
                className="group flex min-h-16 items-center gap-4 py-4 transition-colors hover:text-ink"
              >
                <span className="flex-1">
                  <span className="text-sm font-semibold text-muted">I want to…</span>
                  <span className="block text-lg font-bold">{n.need}</span>
                </span>
                <span className="shrink-0 rounded-full bg-brand/20 px-3 py-1.5 text-sm font-bold transition-colors group-hover:bg-brand">
                  {n.pick}
                </span>
                <Icon name="arrowRight" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </SectionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
