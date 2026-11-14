import { Icon } from "@/components/ui/Icon";
import { about } from "@/content/about";

const { story } = about;

/** The founding story as three connected beats, then a pull quote. */
export function AboutStory() {
  return (
    <section aria-labelledby="story-title" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-bold text-muted">{story.eyebrow}</p>
          <h2 id="story-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {story.title}
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          {/* Connecting line behind the step icons on desktop */}
          <div className="absolute left-8 right-8 top-[52px] hidden h-0.5 bg-line md:block" aria-hidden="true" />
          {story.beats.map((beat, i) => {
            const last = i === story.beats.length - 1;
            return (
              <li
                key={beat.label}
                className={`relative rounded-3xl p-6 sm:p-8 ${last ? "bg-night text-white" : "border border-line bg-paper"}`}
              >
                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full ${last ? "bg-brand text-ink" : "bg-white text-ink ring-1 ring-line"}`}
                >
                  <Icon name={beat.icon} className="h-5 w-5" />
                </span>
                <p className={`mt-6 text-sm font-bold uppercase tracking-wider ${last ? "text-brand" : "text-muted"}`}>
                  {i + 1}. {beat.label}
                </p>
                <h3 className="mt-2 text-xl font-bold">{beat.title}</h3>
                <p className={`mt-3 ${last ? "text-white/85" : "text-muted"}`}>{beat.body}</p>
              </li>
            );
          })}
        </ol>

        <blockquote className="mx-auto mt-20 max-w-3xl text-center">
          <span className="block text-6xl font-extrabold leading-none text-brand" aria-hidden="true">
            “
          </span>
          <p className="text-2xl font-extrabold tracking-tight md:text-4xl">{story.quote}</p>
        </blockquote>
      </div>
    </section>
  );
}
