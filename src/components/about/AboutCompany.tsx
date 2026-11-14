import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { about } from "@/content/about";
import { site } from "@/content/site";

const { company } = about;

/** Who owns WeMoove: Connexxion Telecom, with the office address and partnership contact. */
export function AboutCompany() {
  return (
    <section aria-labelledby="company-title" className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-28">
        <div>
          <p className="font-bold text-muted">{company.eyebrow}</p>
          <h2 id="company-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            {company.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{company.body}</p>
          <a
            href={company.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-night"
          >
            {company.cta.label}
            <Icon name="arrowRight" className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl border border-line bg-paper">
          <div className="flex items-center gap-4 bg-brand p-6">
            <Image src="/brand/03_Icon/WeMoove_Icon_Color.svg" alt="" width={56} height={56} unoptimized className="h-14 w-14 rounded-2xl bg-white p-1.5" />
            <p>
              <span className="block text-lg font-extrabold">{site.name}</span>
              <span className="block text-sm font-semibold text-ink/80">by {site.company}</span>
            </p>
          </div>
          <dl className="grid gap-5 p-6">
            <div className="flex gap-4">
              <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-line">
                <Icon name="pin" className="h-5 w-5" />
                <span className="sr-only">{company.addressLabel}</span>
              </dt>
              <dd>
                <span className="block font-bold">{site.contact.address}</span>
                <span className="block text-sm text-muted">{company.landmark}</span>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-line">
                <Icon name="mail" className="h-5 w-5" />
                <span className="sr-only">{company.partnerLabel}</span>
              </dt>
              <dd>
                <a href={`mailto:${site.contact.email}`} className="block font-bold underline-offset-4 hover:underline">
                  {site.contact.email}
                </a>
                <span className="block text-sm text-muted">{company.partnerLabel}</span>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-line">
                <Icon name="phone" className="h-5 w-5" />
                <span className="sr-only">Phone</span>
              </dt>
              <dd className="flex items-center">
                <a href={site.contact.phoneHref} className="font-bold underline-offset-4 hover:underline">
                  {site.contact.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
