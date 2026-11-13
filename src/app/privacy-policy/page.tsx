import { PageBanner } from "@/components/layout/PageBanner";
import { PolicyBlockView } from "@/components/ui/PolicyBlockView";
import { privacyPolicy } from "@/content/privacyPolicy";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: privacyPolicy.pageName,
  description: privacyPolicy.meta.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner title={privacyPolicy.pageName} />
      <article className="mx-auto max-w-3xl px-6 py-16 text-muted lg:px-8 lg:py-24">
        <p className="mb-6">
          <strong className="text-ink">Last updated:</strong> {privacyPolicy.lastUpdated}
        </p>
        <p className="mb-4 text-lg">{privacyPolicy.intro}</p>

        {privacyPolicy.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 mt-12 text-2xl font-bold text-ink">{section.title}</h2>
            {section.blocks.map((block, i) => (
              <PolicyBlockView key={i} block={block} />
            ))}
          </section>
        ))}

        <section>
          <h2 className="mb-3 mt-12 text-2xl font-bold text-ink">{privacyPolicy.contactTitle}</h2>
          <p className="mb-4">{privacyPolicy.contactIntro}</p>
          <address className="not-italic">
            {site.company} ({site.name})
            <br />
            No. 2A Iller Crescent, Maitama, Abuja, Nigeria
            <br />
            Email:{" "}
            <a href={`mailto:${site.contact.email}`} className="font-semibold text-ink underline">
              {site.contact.email}
            </a>
            <br />
            Phone: {site.contact.phone}
          </address>
        </section>
      </article>
    </>
  );
}
