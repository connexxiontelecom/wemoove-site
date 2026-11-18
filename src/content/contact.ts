import type { IconName } from "@/components/ui/Icon";

/** Contact page copy. Phone, email and address come from src/content/site.ts. */

export type ContactTopic = { id: string; label: string; icon: IconName; title: string; body: string; link?: { label: string; href: string } };

export const contact = {
  pageName: "Contact us",
  meta: {
    description:
      "Contact WeMoove: call or email our round-the-clock support, reach us about driving or partnerships, or visit our office in Maitama, Abuja.",
  },

  hero: {
    eyebrow: "Contact",
    title: "We're here to help.",
    body: "Questions about a trip, driving with WeMoove or working together? Reach our round-the-clock support team, or drop by our office in Maitama.",
  },

  channels: {
    call: { label: "Call us", note: "Round-the-clock support" },
    email: { label: "Email us", note: "We reply as soon as we can" },
    visit: { label: "Visit us", note: "Close to the Inspector General of Police's house" },
    instagram: { label: "Follow us", note: "@wemoove_cnx" },
  },

  topics: {
    eyebrow: "What can we help with?",
    title: "Find the fastest way to an answer.",
    items: [
      {
        id: "trip",
        label: "Rider",
        icon: "car",
        title: "A trip or a lost item",
        body: "Report a ride from the trip screen in the app, or email us with your trip date, pickup and destination. Left something behind? Get in touch with your trip details and we'll help you reach your driver.",
      },
      {
        id: "driver",
        label: "Driver",
        icon: "user",
        title: "Driving with WeMoove",
        body: "Signing up, adding your car or getting verified. Most answers are on our driver page.",
        link: { label: "Drive with WeMoove", href: "/drive" },
      },
      {
        id: "partner",
        label: "Business",
        icon: "briefcase",
        title: "Partnerships and deals",
        body: "Our Maitama office is your home office for partnerships, deals and business enquiries. Email us and tell us what you have in mind.",
      },
      {
        id: "safety",
        label: "Safety",
        icon: "shieldCheck",
        title: "A safety concern",
        body: "Report the ride in the app so we can act. See how we keep every trip safe.",
        link: { label: "Safety at WeMoove", href: "/safety" },
      },
    ] satisfies ContactTopic[],
  },

  form: {
    eyebrow: "Send a message",
    title: "Write to us.",
    body: "Fill this in and we'll open your email app with your message ready to send to our team.",
    nameLabel: "Your name",
    topicLabel: "Topic",
    messageLabel: "Message",
    messagePlaceholder: "Tell us how we can help. For a trip, include the date, pickup and destination.",
    topics: ["Rider support", "Lost item", "Driving with WeMoove", "Partnerships and business", "Safety concern", "Something else"],
    submit: "Open in my email app",
    note: "Nothing is stored on this website. Your message is sent from your own email.",
  },

  office: {
    eyebrow: "Our office",
    title: "Come say hello.",
    mapLabel: "Open in Google Maps",
    company: "WeMoove by Connexxion Telecom",
  },
} as const;
