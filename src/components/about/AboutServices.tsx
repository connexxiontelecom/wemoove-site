import Image from "next/image";
import { SectionLink } from "@/components/ui/SectionLink";
import { about } from "@/content/about";

const { services } = about;

/** A photo strip of every WeMoove service. Scrolls sideways on phones. */
export function AboutServices() {
  return (
    <section aria-labelledby="services-title" className="overflow-hidden bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p data-reveal className="font-bold text-muted">{services.eyebrow}</p>
            <h2 id="services-title" data-reveal className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">
              {services.title}
            </h2>
          </div>
          <SectionLink href={services.href} className="inline-flex min-h-11 items-center font-bold underline-offset-4 hover:underline">
            {services.link} →
          </SectionLink>
        </div>

        <ul data-reveal-stagger className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {services.items.map((item) => (
            <li
              key={item.name}
              className="relative aspect-[3/4] w-[62vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-3xl bg-night lg:w-auto lg:max-w-none"
            >
              <Image src={item.photo} alt="" fill sizes="(min-width: 1024px) 240px, 62vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" aria-hidden="true" />
              <p className="absolute inset-x-0 bottom-0 p-5 text-lg font-bold text-white">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
