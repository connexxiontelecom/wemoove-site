import { Icon } from "@/components/ui/Icon";

export type Faq = { q: string; a: string };

type FaqSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  items: readonly Faq[];
};

/** FAQ section with a native <details> accordion: works without JavaScript and with the keyboard. */
export function FaqSection({ id, eyebrow, title, items }: FaqSectionProps) {
  return (
    <section aria-labelledby={id} className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_2fr] lg:px-8 lg:py-28">
        <div>
          <p className="font-bold text-muted">{eyebrow}</p>
          <h2 id={id} className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="grid gap-3">
          {items.map((item, i) => (
            <details key={item.q} open={i === 0} className="group rounded-2xl border border-line bg-white open:shadow-sm">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper transition-transform group-open:rotate-180">
                  <Icon name="chevronDown" className="h-4 w-4" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
