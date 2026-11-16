import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { home } from "@/content/home";

const copy = home.driveEarn;

/** Driver pitch for the home page. No earnings figures here: the estimate lives on /drive. */
export function DriveEarn() {
  return (
    <section id="drive" aria-labelledby="drive-title" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p data-reveal className="font-bold text-muted">{copy.eyebrow}</p>
          <h2 id="drive-title" data-reveal className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight md:text-5xl">
            {copy.title}
          </h2>
          <p data-reveal className="mt-4 max-w-xl text-lg text-muted">{copy.body}</p>

          <ul data-reveal-stagger className="mt-8 divide-y divide-line border-y border-line">
            {copy.points.map((p) => (
              <li key={p.title} className="flex items-start gap-4 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper text-ink">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold">{p.title}</span>
                  <span className="block text-muted">{p.body}</span>
                </span>
              </li>
            ))}
          </ul>

          <ButtonLink href="/drive" variant="dark" className="mt-8">
            {copy.cta}
          </ButtonLink>
        </div>

        <div data-reveal="zoom" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-paper sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={copy.photo.src}
              alt={copy.photo.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-5 shadow-xl shadow-ink/15 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-72">
            <p className="font-bold">{copy.startTitle}</p>
            <ol className="mt-3 space-y-2.5">
              {copy.startSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm font-semibold">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-ink">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
