import { SafetyStageRow } from "@/components/safety/SafetyStageRow";
import { safety } from "@/content/safety";

const { journey } = safety;

export function SafetyJourney() {
  return (
    <section aria-labelledby="journey-title" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-bold text-muted">{journey.eyebrow}</p>
          <h2 id="journey-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {journey.title}
          </h2>
        </div>
        <ol className="mt-16 grid gap-24 lg:gap-32">
          {journey.stages.map((stage, i) => (
            <SafetyStageRow key={stage.id} stage={stage} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
