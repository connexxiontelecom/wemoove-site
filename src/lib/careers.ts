import { careers } from "@/content/careers";
import { site } from "@/content/site";

/** mailto: link for applications, with the role (or a general subject) prefilled. */
export function careersMailto(role?: string): string {
  const subject = role ? `Application: ${role}` : careers.apply.subject;
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
}
