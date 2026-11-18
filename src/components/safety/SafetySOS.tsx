import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { SafetyPageContent } from "@/content/safety";

/** Panic button for one audience: what happens, step by step, beside the app's own screens. */
export function SafetySOS({ content }: { content: SafetyPageContent }) {
  const { sos } = content;
  return (
    <section id="sos" aria-labelledby="sos-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p data-reveal className="inline-flex items-center gap-2 font-bold text-pin">
            <Icon name="sos" className="h-5 w-5" />
            {sos.eyebrow}
          </p>
          <h2 id="sos-title" data-reveal className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight md:text-5xl">
            {sos.title}
          </h2>
          <p data-reveal className="mt-4 max-w-xl text-lg text-muted">{sos.body}</p>

          <ol data-reveal-stagger className="mt-10 space-y-3">
            {sos.steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4 rounded-2xl border border-line p-5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${i === 0 ? "bg-pin text-white" : "bg-paper text-ink"}`}
                >
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </span>
                  <span className="mt-0.5 block text-muted">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* The app's own screens; scroll sideways on phones */}
        <ul data-reveal="zoom" className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          {sos.screens.map((screen) => (
            <li key={screen.src} className="w-[176px] shrink-0 snap-start xl:w-[196px]">
              <div className="rounded-[28px] bg-night p-1.5 shadow-xl shadow-ink/15">
                <div className="relative aspect-[375/812] overflow-hidden rounded-[23px] bg-map">
                  <Image src={screen.src} alt={screen.alt} fill sizes="196px" className="object-cover" />
                </div>
              </div>
              <p className="mt-2.5 text-center text-sm font-semibold text-muted">{screen.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
