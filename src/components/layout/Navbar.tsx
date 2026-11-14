"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { SectionLink } from "@/components/ui/SectionLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

/** Only accounts that exist (href set in site.ts). */
const socialLinks = site.social.flatMap((s) => (s.href ? [{ ...s, href: s.href }] : []));

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Subtle bottom border once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock page scroll, focus the first link, close on Escape.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      button?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white transition-colors ${scrolled ? "border-line" : "border-transparent"}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-6 lg:px-8">
        <SectionLink href="/" className="mr-auto flex min-h-11 items-center" onClick={close}>
          <Image src="/brand/01_Logo/Horizontal/WeMoove_Logo_Horizontal_Color.svg" alt="WeMoove home" width={1046} height={386} unoptimized preload fetchPriority="high" className="h-14 w-auto" />
        </SectionLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((link) => (
            <li key={link.href}>
              <SectionLink
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="inline-flex min-h-11 items-center rounded-full px-4 font-semibold text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="hidden sm:block lg:ml-4">
          <ButtonLink href={site.getApp.href}>{site.getApp.label}</ButtonLink>
        </div>

        <button
          ref={menuButton}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col overflow-y-auto bg-white px-6 pb-10 pt-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {site.nav.map((link, i) => (
                <li key={link.href} className="border-b border-line">
                  <SectionLink
                    ref={i === 0 ? firstLink : undefined}
                    href={link.href}
                    onClick={close}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="flex min-h-16 items-center text-2xl font-bold"
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
            <ButtonLink href={site.getApp.href} onClick={close} className="mt-8 min-h-12 w-full text-lg">
              {site.getApp.label}
            </ButtonLink>
            <div className="mt-8 space-y-1 text-muted">
              <a href={`mailto:${site.contact.email}`} className="flex min-h-11 items-center font-semibold text-ink underline">
                {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className="flex min-h-11 items-center">
                {site.contact.phone}
              </a>
            </div>
            <ul className="mt-4 flex gap-2">
              {socialLinks.map((s) => (
                <li key={s.icon}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink"
                  >
                    <Icon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
