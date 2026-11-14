import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { drive } from "@/content/drive";
import { site } from "@/content/site";

const { requirements, safety } = drive;

/** What drivers need, beside a short "safety works both ways" panel. */
export function DriveRequirements() {
  return (
    <section aria-labelledby="requirements-title" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:px-8 lg:py-28">
        <div className="rounded-3xl border border-line bg-paper p-6 sm:p-10">
          <p className="font-bold text-muted">{requirements.eyebrow}</p>
          <h2 id="requirements-title" className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            {requirements.title}
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {requirements.items.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-save text-white">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-bold">{item.title}</span>
                  <span className="mt-0.5 block text-muted">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            {requirements.note}{" "}
            <a href={`mailto:${site.contact.email}`} className="font-semibold text-ink underline underline-offset-4">
              {site.contact.email}
            </a>
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-3xl bg-brand p-6 sm:p-10">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-brand">
              <Icon name="shieldCheck" className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-2xl font-extrabold tracking-tight md:text-3xl">{safety.title}</h2>
            <p className="mt-3 text-ink/85">{safety.body}</p>
          </div>
          <Link
            href={safety.href}
            className="mt-8 inline-flex min-h-11 items-center gap-2 self-start font-bold underline underline-offset-4"
          >
            {safety.link}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
