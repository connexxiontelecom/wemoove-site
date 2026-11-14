import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/contact";

const { topics } = contact;

export function ContactTopics() {
  return (
    <section aria-labelledby="topics-title" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p data-reveal className="font-bold text-muted">{topics.eyebrow}</p>
          <h2 id="topics-title" data-reveal className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {topics.title}
          </h2>
        </div>
        <ul data-reveal-stagger className="mt-12 grid gap-4 md:grid-cols-2">
          {topics.items.map((t) => (
            <li key={t.id} className="flex gap-5 rounded-3xl border border-line bg-paper p-6 sm:p-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                <Icon name={t.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-muted">{t.label}</p>
                <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
                <p className="mt-2 text-muted">{t.body}</p>
                {"link" in t && t.link && (
                  <Link href={t.link.href} className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold underline-offset-4 hover:underline">
                    {t.link.label}
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
