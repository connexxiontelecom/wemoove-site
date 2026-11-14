import { Icon, type IconName } from "@/components/ui/Icon";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const { hero, channels } = contact;
const instagram = site.social.find((s) => s.icon === "instagram")?.href ?? null;

type Channel = { icon: IconName; label: string; value: string; note: string; href: string | null; external?: boolean };

const items: Channel[] = [
  { icon: "phone", label: channels.call.label, value: site.contact.phone, note: channels.call.note, href: site.contact.phoneHref },
  { icon: "mail", label: channels.email.label, value: site.contact.email, note: channels.email.note, href: `mailto:${site.contact.email}` },
  { icon: "pin", label: channels.visit.label, value: site.contact.address, note: channels.visit.note, href: "#office" },
  { icon: "instagram", label: channels.instagram.label, value: "Instagram", note: channels.instagram.note, href: instagram, external: true },
];

/** Headline plus one card per way to reach us; each whole card is the link. */
export function ContactHero() {
  return (
    <section aria-labelledby="contact-title" className="bg-dot-grid bg-paper">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="grid animate-rise items-end gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-bold">
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 id="contact-title" className="mt-5 text-5xl font-extrabold tracking-tight md:text-7xl">
              {hero.title}
            </h1>
          </div>
          <p className="text-lg text-muted">{hero.body}</p>
        </div>

        <ul data-reveal-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items
            .filter((c) => c.href)
            .map((c, i) => (
              <li
                key={c.label}
                className={`group relative flex flex-col rounded-3xl p-6 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 ${
                  i === 0 ? "bg-ink text-white" : "border border-line bg-white"
                }`}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "bg-brand text-ink" : "bg-brand/20 text-ink"}`}>
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <p className={`mt-6 text-sm font-bold ${i === 0 ? "text-brand" : "text-muted"}`}>{c.label}</p>
                <a
                  href={c.href ?? undefined}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-1 break-words text-base font-bold after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none"
                >
                  {c.value}
                  {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
                <p className={`mt-1 text-sm ${i === 0 ? "text-white/75" : "text-muted"}`}>{c.note}</p>
                <Icon
                  name="arrowRight"
                  className="absolute right-6 top-7 h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                />
                <span className="pointer-events-none absolute inset-0 rounded-3xl ring-brand ring-offset-2 group-has-[:focus-visible]:ring-4" aria-hidden="true" />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
