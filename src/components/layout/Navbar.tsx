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
const socialLinks = site.social.flatMap((s) =>
  s.href ? [{ ...s, href: s.href }] : [],
);

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
      className={`nav-elevate sticky top-0 z-40 border-b bg-white transition-colors ${scrolled ? "border-line" : "border-transparent"}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-6 lg:px-8"
      >
        <SectionLink
          href="/"
          className="mr-auto flex min-h-11 items-center"
          onClick={close}
        >
          <Image
            src="/brand/01_Logo/Horizontal/WeMoove_Logo_Horizontal_Color.svg"
            alt="WeMoove home"
            width={1046}
            height={386}
            unoptimized
            preload
            fetchPriority="high"
            className="h-14 w-auto"
          />
        </SectionLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((link) =>
            "children" in link && link.children ? (
              <li key={link.href}>
                <NavDropdown
                  label={link.label}
                  section={link.href}
                  items={link.children}
                  pathname={pathname}
                />
              </li>
            ) : (
              <li key={link.href}>
                <SectionLink
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="inline-flex min-h-11 items-center rounded-full px-4 font-semibold text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {link.label}
                </SectionLink>
              </li>
            ),
          )}
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
            transition={{
              type: "tween",
              duration: 0.3,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col overflow-y-auto bg-white px-6 pb-10 pt-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {site.nav.map((link, i) => (
                <li key={link.href} className="border-b border-line">
                  {"children" in link && link.children ? (
                    <>
                      <p className="flex min-h-16 items-center text-2xl font-bold">
                        {link.label}
                      </p>
                      <ul className="-mt-2 pb-3">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <SectionLink
                              href={child.href}
                              onClick={close}
                              aria-current={
                                pathname === child.href ? "page" : undefined
                              }
                              className="flex min-h-12 items-center gap-3 pl-4 text-lg font-semibold text-muted aria-[current=page]:text-ink"
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-brand"
                                aria-hidden="true"
                              />
                              {child.label}
                            </SectionLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <SectionLink
                      ref={i === 0 ? firstLink : undefined}
                      href={link.href}
                      onClick={close}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="flex min-h-16 items-center text-2xl font-bold"
                    >
                      {link.label}
                    </SectionLink>
                  )}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={site.getApp.href}
              onClick={close}
              className="mt-8 min-h-12 w-full text-lg"
            >
              {site.getApp.label}
            </ButtonLink>
            <div className="mt-8 space-y-1 text-muted">
              <a
                href={`mailto:${site.contact.email}`}
                className="flex min-h-11 items-center font-semibold text-ink underline"
              >
                {site.contact.email}
              </a>
              <a
                href={site.contact.phoneHref}
                className="flex min-h-11 items-center"
              >
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

type DropdownProps = {
  label: string;
  /** The section the items live under, e.g. /safety (marks the button current on any child page). */
  section: string;
  items: { label: string; href: string; description?: string }[];
  pathname: string;
};

/** Desktop nav item with a small menu: opens on hover or click, closes on Escape, outside click or navigation. */
function NavDropdown({ label, section, items, pathname }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const menuId = `nav-menu-${section.replace(/\W/g, "")}`;
  const current = pathname === section || pathname.startsWith(`${section}/`);

  // Close when the page changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // A short delay so moving the mouse from the button to the menu doesn't close it.
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={wrapper}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!wrapper.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-h-11 items-center gap-1 rounded-full px-4 font-semibold transition-colors hover:text-ink ${
          current ? "text-ink" : "text-muted"
        }`}
      >
        {label}
        <Icon
          name="chevronDown"
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={menuId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2"
          >
            <ul className="rounded-2xl border border-line bg-white p-2 shadow-xl shadow-ink/10">
              {items.map((item) => (
                <li key={item.href}>
                  <SectionLink
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-paper aria-[current=page]:bg-brand/15"
                  >
                    <span className="font-bold text-ink">{item.label}</span>
                    {item.description && (
                      <span className="mt-0.5 text-sm text-muted">
                        {item.description}
                      </span>
                    )}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
