import { EarningsCalculator } from "@/components/drive/EarningsCalculator";
import { drive } from "@/content/drive";

const { earnings } = drive;

export function DriveEarnings() {
  return (
    <section id="earnings" aria-labelledby="earnings-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p className="font-bold text-muted">{earnings.eyebrow}</p>
          <h2 id="earnings-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {earnings.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg text-muted">{earnings.body}</p>
        </div>
        <EarningsCalculator className="shadow-xl shadow-ink/5" />
      </div>
    </section>
  );
}
