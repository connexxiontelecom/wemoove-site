import { Icon } from "@/components/ui/Icon";
import { about } from "@/content/about";

const { values } = about;

/** Mission and vision as two bold panels, then the principles behind every ride. */
export function AboutValues() {
  return (
    <section aria-labelledby="values-title" className="bg-night text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <p id="values-title" className="font-bold text-brand">
          {values.eyebrow}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-brand p-8 text-ink sm:p-10">
            <h2 className="text-sm font-bold uppercase tracking-wider">{values.mission.title}</h2>
            <p className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">{values.mission.body}</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand">{values.vision.title}</h2>
            <p className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">{values.vision.body}</p>
          </div>
        </div>

        <ul className="mt-12 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-3">
          {values.principles.map((p) => (
            <li key={p.title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-brand">
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-1 text-white/80">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
