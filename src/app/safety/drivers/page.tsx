import { SafetyPage } from "@/components/safety/SafetyPage";
import { safetyDrivers } from "@/content/safety";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: safetyDrivers.pageName,
  description: safetyDrivers.meta.description,
  path: safetyDrivers.path,
});

export default function SafetyDriversPage() {
  return <SafetyPage content={safetyDrivers} />;
}
