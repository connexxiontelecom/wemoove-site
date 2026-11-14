import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { about } from "@/content/about";

const { hero } = about;

/** Headline beside a tilted three-photo collage of real WeMoove drivers and riders. */
export function AboutHero() {
  const [main, second, third] = hero.photos;
  return (
    <section aria-labelledby="about-title" className="bg-dot-grid overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-bold">
            <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 id="about-title" className="mt-5 max-w-xl text-4xl font-extrabold tracking-tight md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">{hero.body}</p>
        </div>

        <div className="relative mx-auto h-[340px] w-full max-w-[520px] sm:h-[440px]">
          <div className="absolute left-0 top-0 h-[72%] w-[78%] -rotate-2 overflow-hidden rounded-3xl shadow-2xl shadow-ink/20 ring-4 ring-white">
            <Image src={main.src} alt={main.alt} fill preload sizes="(min-width: 1024px) 400px, 78vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-[46%] w-[52%] rotate-3 overflow-hidden rounded-3xl shadow-2xl shadow-ink/20 ring-4 ring-white">
            <Image src={second.src} alt={second.alt} fill sizes="(min-width: 1024px) 270px, 52vw" className="object-cover" />
          </div>
          <div className="absolute bottom-[6%] left-[6%] hidden h-[30%] w-[34%] -rotate-3 overflow-hidden rounded-2xl shadow-xl shadow-ink/20 ring-4 ring-white sm:block">
            <Image src={third.src} alt={third.alt} fill sizes="180px" className="object-cover" />
          </div>
          <p className="absolute right-2 top-6 flex animate-float-in items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl shadow-ink/15 sm:-right-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-ink">
              <Icon name="pin" className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold">{hero.badge.title}</span>
              <span className="block text-xs text-muted">{hero.badge.body}</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
