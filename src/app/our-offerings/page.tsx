import { PageBanner } from "@/components/layout/PageBanner";
import { Icon } from "@/components/ui/Icon";
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
      <PageBanner title={offerings.pageName} />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:px-8 lg:py-24">
        {offerings.items.map((item) => (
          <section key={item.title}>
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/20 text-ink">
              <Icon name={item.icon} className="h-7 w-7" />
            </span>
            <h2 className="mb-2 flex flex-wrap items-center gap-2 text-2xl font-bold">
              {item.title}
              {item.comingSoon && (
                <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-semibold text-white">
                  Coming soon
                </span>
              )}
            </h2>
            {item.paragraphs.map((p) => (
              <p key={p} className="mb-3 text-muted">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
