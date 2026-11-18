import { Icon } from "@/components/ui/Icon";
import type { SafetyPageContent } from "@/content/safety";

export function SafetyTips({ content }: { content: SafetyPageContent }) {
  const { tips } = content;
  return (
    <section id="tips" aria-labelledby="tips-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="font-bold text-muted">{tips.eyebrow}</p>
          <h2 id="tips-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {tips.title}
          </h2>
        </div>

        <div data-reveal-stagger className={`mt-12 grid gap-6 ${tips.groups.length > 1 ? "md:grid-cols-2" : ""}`}>
          {tips.groups.map((group, g) => (
            <div key={group.title} className={`rounded-3xl p-6 sm:p-8 ${g === 0 ? "bg-night text-white" : "border border-line bg-paper"}`}>
              <h3 className="flex items-center gap-3 text-xl font-bold">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full ${g === 0 ? "bg-brand text-ink" : "bg-ink text-white"}`}>
                  <Icon name={group.icon} className="h-5 w-5" />
                </span>
                {group.title}
              </h3>
              <ol className={`mt-6 grid gap-4 ${tips.groups.length === 1 ? "md:grid-cols-2 md:gap-x-10" : ""}`}>
                {group.tips.map((tip, i) => (
                  <li key={tip} className="flex gap-4">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                        g === 0 ? "bg-white/10 text-brand" : "bg-brand/25 text-ink"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={g === 0 ? "text-white/90" : "text-ink"}>{tip}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
