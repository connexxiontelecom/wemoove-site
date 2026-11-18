import { SafetyHelp } from "@/components/safety/SafetyHelp";
import { SafetyHero } from "@/components/safety/SafetyHero";
import { SafetyJourney } from "@/components/safety/SafetyJourney";
import { SafetySOS } from "@/components/safety/SafetySOS";
import { SafetyShared } from "@/components/safety/SafetyShared";
import { SafetyTips } from "@/components/safety/SafetyTips";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLink } from "@/components/ui/SectionLink";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { safetySections, type SafetyPageContent } from "@/content/safety";

/** One safety page (passengers or drivers): same sections, each with its audience's content. */
export function SafetyPage({ content }: { content: SafetyPageContent }) {
  const other = safetySections.find((s) => s.href !== content.path)!;
  return (
    <>
      <SafetyHero content={content} />
      <SafetyJourney content={content} />
      <SafetySOS content={content} />
      {content.shared && <SafetyShared shared={content.shared} />}
      <SafetyTips content={content} />
      <SafetyHelp content={content} />
      <section aria-labelledby="safety-cta-title" className="bg-brand">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
          <h2 id="safety-cta-title" data-reveal className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {content.cta.title}
          </h2>
          <p data-reveal className="mt-3 text-lg text-ink/80">{content.cta.body}</p>
          <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <StoreBadges tone="brand" />
            {content.cta.link && (
              <ButtonLink href={content.cta.link.href} variant="dark">
                {content.cta.link.label}
              </ButtonLink>
            )}
          </div>
          <p data-reveal className="mt-8 text-sm font-semibold">
            <SectionLink href={other.href} className="underline underline-offset-4">
              Safety {other.label.toLowerCase()} →
            </SectionLink>
          </p>
        </div>
      </section>
    </>
  );
}
