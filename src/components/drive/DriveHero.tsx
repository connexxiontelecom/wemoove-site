import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { drive } from "@/content/drive";

const { hero } = drive;

export function DriveHero() {
  return (
    <section aria-labelledby="drive-page-title" className="relative isolate overflow-hidden bg-night text-white">
      <div
        className="absolute -left-40 top-0 -z-10 h-[460px] w-[460px] rounded-full bg-brand/15 blur-[120px]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-bold text-brand">
            <Icon name="car" className="h-4 w-4" />
            {hero.eyebrow}
          </p>
          <h1 id="drive-page-title" className="mt-5 max-w-xl text-4xl font-extrabold tracking-tight md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">{hero.body}</p>
          <StoreBadges tone="dark" className="mt-8" />
          <a
            href={hero.secondary.href}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-white underline-offset-4 hover:underline"
          >
            {hero.secondary.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-2xl shadow-ink/50 ring-1 ring-white/10">
            <Image src={hero.photo.src} alt={hero.photo.alt} fill preload sizes="(min-width: 1024px) 520px, 100vw" className="animate-settle object-cover" />
          </div>

          {/* Mock trip request card */}
          <div
            className="absolute -bottom-8 left-4 w-[260px] animate-float-in rounded-2xl bg-white p-4 text-ink shadow-2xl shadow-ink/40 sm:-left-10"
            aria-hidden="true"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">{hero.request.label}</p>
              <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold">{hero.request.mode}</span>
            </div>
            <p className="mt-2 text-lg font-extrabold">{hero.request.route}</p>
            <p className="text-sm text-muted">{hero.request.riders}</p>
            <div className="mt-3 flex gap-2">
              <span className="flex h-9 flex-1 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">Accept</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper ring-1 ring-line">
                <Icon name="close" className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
