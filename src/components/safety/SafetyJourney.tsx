import { SafetyStageRow } from "@/components/safety/SafetyStageRow";
import { Icon } from "@/components/ui/Icon";
import type { SafetyPageContent } from "@/content/safety";

export function SafetyJourney({ content }: { content: SafetyPageContent }) {
  const { journey } = content;
  return (
    <section aria-labelledby="journey-title" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="font-bold text-muted">{journey.eyebrow}</p>
          <h2 id="journey-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {journey.title}
          </h2>
        </div>
        {journey.stages.some((stage) => stage.screenshot) ? (
          <ol className="mt-16 grid gap-24 lg:gap-32">
            {journey.stages.map((stage, i) => (
              <SafetyStageRow key={stage.id} stage={stage} index={i} />
            ))}
          </ol>
        ) : (
          <ol data-reveal-stagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {journey.stages.map((stage, i) => (
              <li key={stage.id} id={stage.id} className="scroll-mt-24 rounded-3xl border border-line bg-white p-6 sm:p-8">
                <p className="flex items-center gap-3 font-bold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-extrabold">{i + 1}</span>
                  {stage.step}
                </p>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight">{stage.title}</h3>
                <p className="mt-2 text-muted">{stage.body}</p>
                <ul className="mt-6 space-y-4 border-t border-line pt-6">
                  {stage.points.map((point) => (
                    <li key={point.title} className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-ink">
                        <Icon name={point.icon} className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block font-bold">{point.title}</span>
                        <span className="mt-0.5 block text-sm text-muted">{point.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
