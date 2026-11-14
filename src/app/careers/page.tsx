import { CareersHero } from "@/components/careers/CareersHero";
import { CareersRoles } from "@/components/careers/CareersRoles";
import { CareersTeams } from "@/components/careers/CareersTeams";
import { CareersWhy } from "@/components/careers/CareersWhy";
import { careers } from "@/content/careers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: careers.pageName,
  description: careers.meta.description,
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersWhy />
      <CareersTeams />
      <CareersRoles />
    </>
  );
}
