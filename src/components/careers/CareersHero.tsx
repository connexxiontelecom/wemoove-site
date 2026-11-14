import { Icon } from "@/components/ui/Icon";
import { careers } from "@/content/careers";
import { careersMailto } from "@/lib/careers";

const { hero, values } = careers;

export function CareersHero() {
  return (
    <section aria-labelledby="careers-title" className="relative isolate overflow-hidden bg-brand">
      {/* Oversized brand pin as a background mark */}
      <svg
        viewBox="0 0 24 24"
        className="absolute -right-24 -top-10 -z-10 h-[520px] w-[520px] text-ink/[0.06] md:-right-10"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 22s-7.5-6.4-7.5-12.5a7.5 7.5 0 0 1 15 0C19.5 15.6 12 22 12 22zm0-9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="max-w-3xl animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-brand">
            <Icon name="briefcase" className="h-4 w-4" />
            {hero.eyebrow}
          </p>
          <h1 id="careers-title" className="mt-5 text-5xl font-extrabold tracking-tight md:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/85">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={hero.primary.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-night"
            >
              {hero.primary.label}
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <a
              href={careersMailto()}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink px-6 font-semibold text-ink transition-colors hover:bg-ink/10"
            >
              <Icon name="mail" className="h-4 w-4" />
              {hero.secondary}
            </a>
          </div>
        </div>

        <ul className="mt-14 flex flex-wrap gap-2" aria-label={values.eyebrow}>
          {values.items.map((v) => (
            <li key={v} className="rounded-full border border-ink/20 bg-white/40 px-4 py-2 text-sm font-bold">
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
