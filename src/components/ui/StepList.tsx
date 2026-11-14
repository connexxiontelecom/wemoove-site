import type { Step } from "@/content/howItWorks";

type StepListProps = {
  title: string;
  steps: readonly Step[];
};

/** Numbered 4-step process (was the theme's "process-wrapper"). */
export function StepList({ title, steps }: StepListProps) {
  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold md:text-4xl">{title}</h2>
      <ol data-reveal-stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title}>
            <span
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand font-bold text-ink"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mb-1 text-xl font-bold">{step.title}</h3>
            <p className="text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
