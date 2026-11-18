import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import type { SafetyPageContent } from "@/content/safety";

export function SafetyHero({ content }: { content: SafetyPageContent }) {
  const { hero } = content;
  return (
    <section aria-labelledby="safety-title" className="relative isolate overflow-hidden bg-night text-white">
      {/* Soft amber glow behind the phone */}
      <div
        className="absolute right-[8%] top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:pb-24 lg:pt-20">
        <div className="min-w-0 animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-bold text-brand">
            <Icon name="shieldCheck" className="h-4 w-4" />
            {hero.eyebrow}
          </p>
          <h1 id="safety-title" className="mt-5 max-w-xl text-4xl font-extrabold tracking-tight md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">{hero.body}</p>

          <nav aria-label={hero.jumpLabel} className="-mx-6 mt-8 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0">
            <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              {hero.jumps.map((jump) => (
                <li key={jump.href}>
                  <a
                    href={jump.href}
                    className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition-colors hover:border-brand hover:bg-brand hover:text-ink"
                  >
                    {jump.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {hero.screenshot ? (
          <div className="relative mx-auto">
            <PhoneFrame size="md" className="rotate-2">
              <Image src={hero.screenshot.src} alt={hero.screenshot.alt} fill preload sizes="262px" className="object-cover object-top" />
            </PhoneFrame>
            {hero.badges.map((badge, i) => (
              <p
                key={badge.label}
                className={`absolute flex animate-float-in items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm font-bold text-ink shadow-xl shadow-ink/30 ${
                  i === 0 ? "-left-10 top-16 sm:-left-20" : "-right-6 bottom-24 [animation-delay:0.6s] sm:-right-16"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-save text-white">
                  <Icon name={badge.icon} className="h-4 w-4" />
                </span>
                {badge.label}
              </p>
            ))}
          </div>
        ) : (
          <ul className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-sm lg:grid-cols-1 lg:justify-self-center">
            {hero.badges.map((badge, i) => (
              <li
                key={badge.label}
                className="flex animate-float-in items-center gap-3 rounded-2xl bg-white px-5 py-4 font-bold text-ink shadow-xl shadow-black/30"
                style={{ animationDelay: `${0.2 + i * 0.12}s` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-ink">
                  <Icon name={badge.icon} className="h-5 w-5" />
                </span>
                {badge.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
