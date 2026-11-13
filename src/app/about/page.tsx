import { PageBanner } from "@/components/layout/PageBanner";
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
      <PageBanner title={about.pageName} />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <section className="max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{about.story.title}</h2>
          {about.story.paragraphs.map((p) => (
            <p key={p} className="mb-4 text-lg text-muted">
              {p}
            </p>
          ))}
        </section>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 text-3xl font-bold">{about.owner.title}</h2>
            <p className="mb-4 text-lg font-semibold">{about.owner.lead}</p>
            {about.owner.paragraphs.map((p) => (
              <p key={p} className="mb-4 text-muted">
                {p}
              </p>
            ))}
            <a
              href={about.owner.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center rounded-full bg-brand px-6 font-semibold text-ink hover:bg-brand-strong"
            >
              {about.owner.cta.label}
              <span className="sr-only"> about Connexxion Telecom (opens in a new tab)</span>
            </a>
          </section>
          <div className="space-y-6">
            {about.values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-white p-8 shadow-sm">
                <h3 className="mb-1 text-xl font-bold">{v.title}</h3>
                <p className="text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
