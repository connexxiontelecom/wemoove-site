import { Icon } from "@/components/ui/Icon";
import { careers } from "@/content/careers";

const { why, values } = careers;

export function CareersWhy() {
  return (
    <section aria-labelledby="why-title" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="font-bold text-muted">{why.eyebrow}</p>
          <h2 id="why-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {why.title}
          </h2>
        </div>
        <ul data-reveal-stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {why.items.map((item) => (
            <li key={item.title} className="rounded-3xl border border-line bg-paper p-6 sm:p-7 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-ink">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
              <p className="mt-1.5 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <figure data-reveal="zoom" className="mt-16 rounded-3xl bg-night p-8 text-white sm:p-12">
          <p className="text-sm font-bold uppercase tracking-wider text-brand">{values.eyebrow}</p>
          <blockquote className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">{values.body}</blockquote>
        </figure>
      </div>
    </section>
  );
}
