import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

/** White rounded-2xl surface with a soft shadow. */
export function Card({ children, className = "", as: Tag = "div" }: CardProps) {
  return (
    <Tag className={`rounded-2xl border border-line bg-white shadow-xl shadow-ink/10 ${className}`}>
      {children}
    </Tag>
  );
}
