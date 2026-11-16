import type { Faq } from "@/components/ui/FaqSection";

/** Ride page copy. Ride types, photos and Solo / Shared details are shared with the home page. */
export const ride = {
  pageName: "Ride with WeMoove",
  meta: {
    description:
      "Book a ride across Abuja with WeMoove. Choose Standard, Premium or Executive, ride Solo or Shared, and see your fare before you book.",
  },

  hero: {
    eyebrow: "Ride",
    title: "Get there your way, across Abuja.",
    body: "Have the car to yourself, tag along with riders heading your way and pay less, or step up to Premium or Executive. Your fare is always shown before you book.",
    secondary: { label: "Solo or Shared?", href: "#plan" },
    photo: {
      src: "/assets/img/services/standard.jpg",
      alt: "A smiling WeMoove driver with his arm on the open window of a silver Toyota Corolla on a tree-lined street in Abuja",
    },
    chips: [
      { label: "Fare shown upfront", icon: "wallet" },
      { label: "Verified drivers", icon: "shieldCheck" },
    ],
  },

  options: {
    eyebrow: "Ride options",
    title: "A ride for every kind of trip.",
    standardModes: ["Solo", "Shared"],
  },

  planner: {
    eyebrow: "Plan your trip",
    title: "Your ride, your way.",
    body: "Have the car to yourself, or tag along with riders heading your way and pay less. Pick Solo or Tag along to see who rides with you.",
  },

  safety: {
    title: "Safe on every ride, Solo or Shared.",
    link: "More about safety",
    href: "/safety",
    points: [
      { icon: "user", title: "Know your driver", body: "Name, photo, rating, car and plate number before pickup." },
      { icon: "share", title: "Share your trip", body: "Let someone you trust follow your ride live." },
      { icon: "flag", title: "Report a ride", body: "Flag anything that feels wrong, right from the trip screen." },
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Rider FAQs",
    items: [
      {
        q: "How do I book a ride?",
        a: "Open the app, enter your destination in the “Where to” box and choose your ride. Your fare is shown before you confirm, then we match you with a nearby driver.",
      },
      {
        q: "What's the difference between Solo and Shared?",
        a: "On a Standard ride, Solo gives you the whole car. Shared matches you with riders heading your way, so you split the trip and pay a lower fare. Pickup can take a little longer on Shared while we match riders.",
      },
      {
        q: "How is my fare worked out?",
        a: "The app shows your fare before you book, based on your trip and the ride you choose. It's fixed: no haggling with the driver.",
      },
      {
        q: "How can I pay?",
        a: "Pay by card or from your WeMoove wallet, right in the app.",
      },
      {
        q: "Will I know who's driving?",
        a: "Yes. Before your driver arrives you'll see their name, photo, rating, car and plate number, and you can call or chat with them in the app.",
      },
      {
        q: "Where does WeMoove operate?",
        a: "We're launching in Abuja, covering areas including Wuse, Maitama, Garki, CBD, Gwarinpa, Lugbe, Jabi, Kubwa and Asokoro.",
      },
    ] satisfies Faq[],
  },

  cta: {
    title: "Where to next?",
    body: "Download WeMoove and book your first ride in minutes.",
  },
} as const;
