import Image from "next/image";
import Link from "next/link";
import { SafetyFeatureCard } from "@/components/home/SafetyFeatureCard";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { home } from "@/content/home";

const { safety } = home;

export function Safety() {
  return (
    <section id="safety" aria-labelledby="safety-title" className="bg-night text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-28">
        <div>
          <p data-reveal className="font-bold text-brand">{safety.eyebrow}</p>
          <h2 id="safety-title" data-reveal className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight md:text-5xl">
            {safety.title}
          </h2>
          <p data-reveal className="mt-4 max-w-xl text-lg text-white/80">{safety.body}</p>

          <ul data-reveal-stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {safety.features.map((feature, i) => (
              <SafetyFeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </ul>

          <Link href="/safety/passengers" className="mt-8 inline-flex min-h-11 items-center font-bold text-white underline underline-offset-4">
            {safety.link} →
          </Link>
        </div>

        {/* [APP_SCREENSHOT] slots. Set `src` in src/content/home.ts to show a real screenshot. */}
        <div data-reveal="zoom" className="flex justify-center gap-4">
          {safety.screenshots.map((shot, i) => (
            <PhoneFrame key={shot.alt} size="md" className={i === 1 ? "mt-16 hidden sm:block" : ""}>
              {shot.src ? (
                <Image src={shot.src} alt={shot.alt} fill sizes="262px" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm font-semibold text-muted">
                  [APP_SCREENSHOT]
                </div>
              )}
            </PhoneFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
