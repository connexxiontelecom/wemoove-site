import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { ride } from "@/content/ride";

const { hero } = ride;

export function RideHero() {
  return (
    <section aria-labelledby="ride-page-title" className="bg-dot-grid overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-bold">
            <Icon name="car" className="h-4 w-4" />
            {hero.eyebrow}
          </p>
          <h1 id="ride-page-title" className="mt-5 max-w-xl text-4xl font-extrabold tracking-tight md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">{hero.body}</p>
          <StoreBadges className="mt-8" />
          <a
            href={hero.secondary.href}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold underline-offset-4 hover:underline"
          >
            {hero.secondary.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="relative aspect-[4/3] rotate-1 overflow-hidden rounded-[32px] shadow-2xl shadow-ink/20 ring-4 ring-white">
            <Image src={hero.photo.src} alt={hero.photo.alt} fill preload sizes="(min-width: 1024px) 540px, 100vw" className="animate-settle object-cover" />
          </div>
          {hero.chips.map((chip, i) => (
            <p
              key={chip.label}
              className={`absolute flex animate-float-in items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm font-bold shadow-xl shadow-ink/15 ${
                i === 0 ? "-bottom-5 left-4 sm:-left-8" : "-top-4 right-4 [animation-delay:0.6s] sm:-right-6"
              }`}
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-full ${i === 0 ? "bg-brand text-ink" : "bg-save text-white"}`}>
                <Icon name={chip.icon} className="h-4 w-4" />
              </span>
              {chip.label}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
