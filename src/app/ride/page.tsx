import { RideModes } from "@/components/home/RideModes";
import { RideHero } from "@/components/ride/RideHero";
import { RideOptions } from "@/components/ride/RideOptions";
import { RidePlanner } from "@/components/ride/RidePlanner";
import { RideSafety } from "@/components/ride/RideSafety";
import { FaqSection } from "@/components/ui/FaqSection";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { ride } from "@/content/ride";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: ride.pageName,
  description: ride.meta.description,
  path: "/ride",
});

export default function RidePage() {
  return (
    <>
      <RideHero />
      <RideOptions />
      <RideModes />
      <RidePlanner />
      <RideSafety />
      <FaqSection id="ride-faq-title" eyebrow={ride.faq.eyebrow} title={ride.faq.title} items={ride.faq.items} />
      <section id="download" aria-labelledby="ride-cta-title" className="scroll-mt-24 bg-brand">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
          <h2 id="ride-cta-title" data-reveal className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {ride.cta.title}
          </h2>
          <p data-reveal className="mt-3 text-lg text-ink/80">{ride.cta.body}</p>
          <StoreBadges tone="brand" className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}
