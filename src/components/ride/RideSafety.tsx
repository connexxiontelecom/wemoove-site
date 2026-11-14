import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ride } from "@/content/ride";

const { safety } = ride;

/** Compact safety strip for riders, linking to the full Safety page. */
export function RideSafety() {
  return (
    <section aria-labelledby="ride-safety-title" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="ride-safety-title" data-reveal className="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">
            {safety.title}
          </h2>
          <Link href={safety.href} className="inline-flex min-h-11 items-center gap-2 font-bold underline-offset-4 hover:underline">
            {safety.link}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <ul data-reveal-stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {safety.points.map((p) => (
            <li key={p.title} className="flex gap-4 rounded-3xl border border-line bg-paper p-6 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-lg font-bold">{p.title}</span>
                <span className="mt-1 block text-muted">{p.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
