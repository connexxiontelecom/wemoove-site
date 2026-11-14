import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOffice } from "@/components/contact/ContactOffice";
import { ContactTopics } from "@/components/contact/ContactTopics";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: contact.pageName,
  description: contact.meta.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactTopics />
      <ContactForm />
      <ContactOffice />
    </>
  );
}
