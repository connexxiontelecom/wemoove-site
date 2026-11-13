import { StepScreen } from "@/components/home/StepScreen";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { home } from "@/content/home";

export function Download() {
  const { download } = home;
  return (
    <section id="download" aria-labelledby="download-title" className="overflow-hidden bg-brand">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-20 md:grid-cols-[1.3fr_1fr] md:py-20 lg:px-8">
        <div className="text-center md:text-left">
          <h2 id="download-title" className="text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            {download.title}
          </h2>
          <p className="mt-4 text-lg font-medium text-ink">{download.body}</p>
          <StoreBadges tone="brand" className="mt-8 justify-center md:justify-start" />
        </div>
        <div className="flex justify-center md:-mb-40">
          <PhoneFrame size="md" className="translate-y-10 md:translate-y-0">
            <StepScreen step={0} />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
