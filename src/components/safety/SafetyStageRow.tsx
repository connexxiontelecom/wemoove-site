import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import type { SafetyStage } from "@/content/safety";

type SafetyStageRowProps = { stage: SafetyStage; index: number };

/** One stage of the trip: copy and safety points beside the matching app screen. Alternates sides on desktop. */
export function SafetyStageRow({ stage, index }: SafetyStageRowProps) {
  const flip = index % 2 === 1;
  return (
    <li id={stage.id} className="grid scroll-mt-24 items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
      <div className={flip ? "md:order-2" : ""}>
        <p className="flex items-center gap-3 font-bold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-extrabold">{index + 1}</span>
          {stage.step}
        </p>
        <h3 className="mt-4 text-2xl font-extrabold tracking-tight md:text-4xl">{stage.title}</h3>
        <p className="mt-3 max-w-xl text-lg text-muted">{stage.body}</p>

        <ul className="mt-8 grid gap-3">
          {stage.points.map((point) => (
            <li key={point.title} className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-ink">
                <Icon name={point.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-bold">{point.title}</span>
                <span className="mt-0.5 block text-muted">{point.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`relative mx-auto ${flip ? "md:order-1" : ""}`}>
        <div className="absolute inset-6 -z-10 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
        <PhoneFrame size="md">
          <Image src={stage.screenshot.src} alt={stage.screenshot.alt} fill sizes="262px" className="object-cover object-top" />
        </PhoneFrame>
      </div>
    </li>
  );
}
