import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  /** "lg" is about 300×620 on desktop (240×496 on mobile); "md" is a little smaller everywhere. */
  size?: "lg" | "md";
  className?: string;
};

const sizes = {
  lg: "h-[496px] w-[240px] md:h-[620px] md:w-[300px]",
  md: "h-[464px] w-[224px] lg:h-[540px] lg:w-[262px]",
};

/** Pure CSS phone: dark bezel, rounded corners, a notch. No image files. */
export function PhoneFrame({ children, size = "lg", className = "" }: PhoneFrameProps) {
  return (
    <div
      className={`relative shrink-0 rounded-[44px] bg-night p-2.5 shadow-2xl shadow-ink/40 ring-1 ring-ink/40 ${sizes[size]} ${className}`}
    >
      <div className="absolute left-1/2 top-4 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-night" aria-hidden="true" />
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-map">{children}</div>
    </div>
  );
}
