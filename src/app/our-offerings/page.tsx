import { OfferingsComing } from "@/components/offerings/OfferingsComing";
import { OfferingsFinder } from "@/components/offerings/OfferingsFinder";
import { OfferingsHero } from "@/components/offerings/OfferingsHero";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { offerings } from "@/content/offerings";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: offerings.pageName,
  description: offerings.meta.description,
  path: "/our-offerings",
});

export default function OfferingsPage() {
  return (
    <>
      <OfferingsHero />
      <OfferingsFinder />
      <OfferingsComing />
      <section aria-labelledby="offerings-cta-title" className="bg-brand">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
          <h2 id="offerings-cta-title" data-reveal className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {offerings.cta.title}
          </h2>
          <p data-reveal className="mt-3 text-lg text-ink/80">{offerings.cta.body}</p>
          <StoreBadges tone="brand" className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}
