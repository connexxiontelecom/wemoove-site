import { EarningsCalculator } from "@/components/drive/EarningsCalculator";
import { ButtonLink } from "@/components/ui/Button";
import { home } from "@/content/home";

const copy = home.driveEarn;

export function DriveEarn() {
  return (
    <section id="drive" aria-labelledby="drive-title" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p data-reveal className="font-bold text-muted">{copy.eyebrow}</p>
          <h2 id="drive-title" data-reveal className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight md:text-5xl">
            {copy.title}
          </h2>
          <p data-reveal className="mt-4 max-w-xl text-lg text-muted">{copy.body}</p>
          <ButtonLink href="/drive" variant="dark" className="mt-8">
            {copy.cta}
          </ButtonLink>
        </div>
        <div data-reveal="right">
          <EarningsCalculator />
        </div>
      </div>
    </section>
  );
}
