import { Download } from "@/components/home/Download";
import { DriveEarn } from "@/components/home/DriveEarn";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MobileGetAppBar } from "@/components/home/MobileGetAppBar";
import { MoreWays } from "@/components/home/MoreWays";
import { RideModes } from "@/components/home/RideModes";
import { Safety } from "@/components/home/Safety";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: home.meta.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <RideModes />
      <MoreWays />
      <Safety />
      <DriveEarn />
      <Download />
      <MobileGetAppBar />
    </>
  );
}
