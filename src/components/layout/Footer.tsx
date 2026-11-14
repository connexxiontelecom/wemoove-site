import Image from "next/image";
import { SectionLink } from "@/components/ui/SectionLink";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

/** Only accounts that exist (href set in site.ts). */
const socialLinks = site.social.flatMap((s) => (s.href ? [{ ...s, href: s.href }] : []));

const linkClass = "inline-flex min-h-11 items-center hover:text-white";

export function Footer() {
  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-3">
            <Image src="/brand/01_Logo/Horizontal/WeMoove_Logo_Horizontal_Reversed.svg" alt="WeMoove" width={1046} height={386} unoptimized className="h-16 w-auto" />
            <p className="mt-4 max-w-xs">{site.footer.blurb}</p>
          </div>

          {site.footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h2 className="mb-2 font-bold text-white">{col.title}</h2>
              <ul>
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      item.href.startsWith("/") ? (
                        <SectionLink href={item.href} className={linkClass}>
                          {item.label}
                        </SectionLink>
                      ) : (
                        <a href={item.href} className={linkClass}>
                          {item.label}
                        </a>
                      )
                    ) : (
                      <span className="flex min-h-11 flex-col items-start justify-center gap-1 py-1">
                        {item.label}
                        {item.comingSoon && (
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-white">
                            Coming soon
                          </span>
                        )}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className="mb-2 font-bold text-white">Contact</h2>
            <address className="not-italic">
              <p className="py-2">{site.contact.address}</p>
              <a href={`mailto:${site.contact.email}`} className={`${linkClass} break-all`}>
                {site.contact.email}
              </a>
              <br />
              <a href={site.contact.phoneHref} className={linkClass}>
                {site.contact.phone}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-2">
            {socialLinks.map((s) => (
              <li key={s.icon}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
                >
                  <Icon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
