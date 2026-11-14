import { DriveBenefits } from "@/components/drive/DriveBenefits";
import { DriveEarnings } from "@/components/drive/DriveEarnings";
import { DriveFaq } from "@/components/drive/DriveFaq";
import { DriveHero } from "@/components/drive/DriveHero";
import { DriveRequirements } from "@/components/drive/DriveRequirements";
import { DriveSteps } from "@/components/drive/DriveSteps";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { drive } from "@/content/drive";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: drive.pageName,
  description: drive.meta.description,
  path: "/drive",
});

export default function DrivePage() {
  return (
    <>
      <DriveHero />
      <DriveBenefits />
      <DriveEarnings />
      <DriveSteps />
      <DriveRequirements />
      <DriveFaq />
      <section aria-labelledby="drive-cta-title" className="bg-brand">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
          <h2 id="drive-cta-title" className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {drive.cta.title}
          </h2>
          <p className="mt-3 text-lg text-ink/80">{drive.cta.body}</p>
          <StoreBadges tone="brand" className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}
