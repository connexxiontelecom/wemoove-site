import Image from "next/image";
import { StepScreen } from "@/components/home/StepScreen";
import type { HowStep } from "@/content/home";

type StepVisualProps = {
  step: HowStep;
  index: number;
  /** "phone" fills the desktop phone frame; "card" is the short mobile illustration. */
  variant: "phone" | "card";
};

/** A real app screenshot when the step has one, otherwise the coded illustration. */
export function StepVisual({ step, index, variant }: StepVisualProps) {
  if (!step.screenshot) return <StepScreen step={index} />;
  // Phone: the screen fills the frame. Card: a crop chosen per screenshot in src/content/home.ts.
  return (
    <div className="absolute inset-0 bg-white">
      <Image
        src={step.screenshot.src}
        alt={step.screenshot.alt}
        fill
        sizes={variant === "phone" ? "262px" : "320px"}
        className="object-cover"
        style={variant === "card" ? { objectPosition: step.screenshot.cardFocus ?? "center top" } : undefined}
      />
    </div>
  );
}
