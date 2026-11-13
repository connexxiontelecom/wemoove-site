import { PageBanner } from "@/components/layout/PageBanner";
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
      <PageBanner title={safety.pageName} />
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        {safety.paragraphs.map((p) => (
          <p key={p} className="mb-4 text-lg text-muted">
            {p}
          </p>
        ))}
      </div>
    </>
  );
}
