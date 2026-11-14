import { AboutCompany } from "@/components/about/AboutCompany";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutServices } from "@/components/about/AboutServices";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: about.pageName,
  description: about.meta.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutServices />
      <AboutCompany />
      <section aria-labelledby="about-cta-title" className="bg-brand">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
          <h2 id="about-cta-title" className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {about.cta.title}
          </h2>
          <p className="mt-3 text-lg text-ink/80">{about.cta.body}</p>
          <StoreBadges tone="brand" className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}
