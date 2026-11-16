import { SafetyHelp } from "@/components/safety/SafetyHelp";
import { SafetyHero } from "@/components/safety/SafetyHero";
import { SafetyJourney } from "@/components/safety/SafetyJourney";
import { SafetySOS } from "@/components/safety/SafetySOS";
import { SafetyShared } from "@/components/safety/SafetyShared";
import { SafetyTips } from "@/components/safety/SafetyTips";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { safety } from "@/content/safety";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: safety.pageName,
  description: safety.meta.description,
  path: "/safety",
});

export default function SafetyPage() {
  return (
    <>
      <SafetyHero />
      <SafetyJourney />
      <SafetySOS />
      <SafetyShared />
      <SafetyTips />
      <SafetyHelp />
      <section aria-labelledby="safety-cta-title" className="bg-brand">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
          <h2 id="safety-cta-title" data-reveal className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {safety.cta.title}
          </h2>
          <p data-reveal className="mt-3 text-lg text-ink/80">{safety.cta.body}</p>
          <StoreBadges tone="brand" className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}
