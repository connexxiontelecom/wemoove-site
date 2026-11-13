import { PageBanner } from "@/components/layout/PageBanner";
import { StepList } from "@/components/ui/StepList";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { howItWorks } from "@/content/howItWorks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: howItWorks.pageName,
  description: howItWorks.meta.description,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const { intro, riders, drivers, cta } = howItWorks;
  return (
    <>
      <PageBanner title={howItWorks.pageName} />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <section className="max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{intro.title}</h2>
          {intro.paragraphs.map((p) => (
            <p key={p} className="mb-4 text-lg text-muted">
              {p}
            </p>
          ))}
        </section>

        <StepList title={riders.title} steps={riders.steps} />
        <StepList title={drivers.title} steps={drivers.steps} />

        <section className="mx-auto mt-20 max-w-2xl text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">{cta.title}</h2>
          <p className="mb-8 text-lg text-muted">{cta.body}</p>
          <StoreBadges className="justify-center" />
        </section>
      </div>
    </>
  );
}
