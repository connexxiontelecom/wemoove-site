"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * next/link that also handles "/#section" links on the page they point to.
 * Next ignores a click when the URL already matches (e.g. clicking "Drive & Earn" twice),
 * so we scroll to the section ourselves and move focus there for keyboard and screen reader users.
 */
export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const [path, id] = href.split("#");
    if (!id || (path || "/") !== window.location.pathname) return;
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    if (window.location.hash !== `#${id}`) window.history.pushState(window.history.state, "", `#${id}`);
    // Wait a frame so anything the click closes (like the mobile menu) is gone before we scroll.
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
