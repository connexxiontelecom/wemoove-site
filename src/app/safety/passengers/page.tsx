import { SafetyPage } from "@/components/safety/SafetyPage";
import { safetyPassengers } from "@/content/safety";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: safetyPassengers.pageName,
  description: safetyPassengers.meta.description,
  path: safetyPassengers.path,
});

export default function SafetyPassengersPage() {
  return <SafetyPage content={safetyPassengers} />;
}
