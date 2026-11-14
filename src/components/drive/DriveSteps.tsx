import { drive } from "@/content/drive";

const { steps } = drive;

/** Four sign-up steps on a connected track (horizontal on desktop, vertical on phones). */
export function DriveSteps() {
  return (
    <section aria-labelledby="steps-title" className="bg-night text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="font-bold text-brand">{steps.eyebrow}</p>
          <h2 id="steps-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {steps.title}
          </h2>
        </div>
        <ol data-reveal-stagger className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.items.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:block">
              {/* Connector to the next step: down on phones, across on desktop */}
              {i < steps.items.length - 1 && (
                <span
                  className="absolute -bottom-10 left-6 top-12 w-0.5 bg-white/15 md:bottom-auto md:left-12 md:-right-6 md:top-6 md:h-0.5 md:w-auto"
                  aria-hidden="true"
                />
              )}
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-ink ring-8 ring-night">
                {i + 1}
              </span>
              <div className="md:mt-6">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 text-white/80">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
