import { Icon } from "@/components/ui/Icon";
import { home } from "@/content/home";

const { rideModes } = home;

/** Hover, tap or keyboard focus lifts a card and fills it with its colour. CSS only, no JavaScript. */
const highlight = {
  solo: "hover:bg-ink hover:text-white focus-within:bg-ink focus-within:text-white active:bg-ink active:text-white",
  shared: "hover:bg-brand focus-within:bg-brand active:bg-brand",
};
const subtle = {
  solo: "group-hover:text-white/80 group-focus-within:text-white/80 group-active:text-white/80",
  shared: "",
};
const ctaStyle = {
  solo: "bg-ink text-white group-hover:bg-brand group-hover:text-ink group-focus-within:bg-brand group-focus-within:text-ink",
  shared: "bg-brand text-ink group-hover:bg-ink group-hover:text-white group-focus-within:bg-ink group-focus-within:text-white",
};

export function RideModes() {
  return (
    <section id="ride-modes" aria-labelledby="modes-title" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <p className="font-bold text-muted">{rideModes.eyebrow}</p>
        <h2 id="modes-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          {rideModes.title}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {rideModes.modes.map((mode) => (
            <article
              key={mode.id}
              className={`group rounded-2xl border border-line bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/15 focus-within:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none ${highlight[mode.id]}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink">
                  <Icon name={mode.id === "solo" ? "car" : "share"} className="h-6 w-6" />
                </span>
                <h3 className="text-3xl font-extrabold">{mode.name}</h3>
              </div>
              <p className={`mt-4 text-lg font-semibold ${subtle[mode.id]}`}>{mode.tagline}</p>

              <dl className="mt-6 divide-y divide-current/15 border-y border-current/15">
                {mode.rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                    <dt className={`font-semibold text-muted ${subtle[mode.id]} ${mode.id === "shared" ? "group-hover:text-ink group-focus-within:text-ink group-active:text-ink" : ""}`}>
                      {row.label}
                    </dt>
                    <dd className="font-bold">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href="#download"
                className={`mt-8 inline-flex min-h-11 items-center rounded-full px-6 font-semibold transition-colors ${ctaStyle[mode.id]}`}
              >
                {rideModes.cta}
                <span className="sr-only"> to ride {mode.name}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
