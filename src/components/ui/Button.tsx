import { SectionLink } from "@/components/ui/SectionLink";
import type { ReactNode } from "react";

type Variant = "brand" | "dark" | "outline" | "outlineLight";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-ink hover:bg-brand-strong",
  dark: "bg-ink text-white hover:bg-night",
  outline: "border border-ink/20 text-ink hover:bg-ink/5",
  outlineLight: "border border-white/70 text-white hover:bg-white/10",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
};

/** A link styled as a rounded-full button. Internal paths use next/link (via SectionLink). */
export function ButtonLink({ href, children, variant = "brand", className = "", onClick }: ButtonLinkProps) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 font-semibold transition-colors ${variants[variant]} ${className}`;
  if (href.startsWith("/")) {
    return (
      <SectionLink href={href} className={classes} onClick={onClick}>
        {children}
      </SectionLink>
    );
  }
  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  );
}
