import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

type Tone = "light" | "dark" | "brand";

type StoreBadgesProps = {
  /** Background the badges sit on: "light" (default), "dark" or "brand" (amber). */
  tone?: Tone;
  className?: string;
};

const styles: Record<Tone, { primary: string; secondary: string }> = {
  light: {
    primary: "bg-brand text-ink hover:bg-brand-strong",
    secondary: "bg-ink text-white hover:bg-night",
  },
  dark: {
    primary: "bg-brand text-ink hover:bg-brand-strong",
    secondary: "border border-white/70 text-white hover:bg-white/10",
  },
  brand: {
    primary: "bg-ink text-white hover:bg-night",
    secondary: "border-2 border-ink text-ink hover:bg-ink/10",
  },
};

export function StoreBadges({ tone = "light", className = "" }: StoreBadgesProps) {
  const base = "inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold transition-colors";
  const { appStore, playStore } = site.stores;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={playStore} className={`${base} ${styles[tone].primary}`}>
        <Icon name="googlePlay" />
        <span>
          <span className="sr-only">Get it on </span>Google Play
        </span>
      </a>
      {appStore ? (
        <a href={appStore} className={`${base} ${styles[tone].secondary}`}>
          <Icon name="apple" />
          <span>
            <span className="sr-only">Download on the </span>App Store
          </span>
        </a>
      ) : (
        <span className={`${base} cursor-default ${styles[tone].secondary.replace(/hover:\S+/g, "")}`}>
          <Icon name="apple" />
          App Store
          <span className="rounded-full bg-current/10 px-2 py-0.5 text-xs font-bold">Coming soon</span>
        </span>
      )}
    </div>
  );
}
