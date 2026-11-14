import type { IconName } from "@/components/ui/Icon";

/** About page copy. Story details come from WeMoove's original About page; no invented stats. */

export type StoryBeat = { label: string; title: string; body: string; icon: IconName };

export const about = {
  pageName: "About WeMoove",
  meta: {
    description:
      "Why we built WeMoove: safer, more convenient ride sharing for commuters in Nigeria. Meet the team at Connexxion Telecom in Maitama, Abuja.",
  },

  hero: {
    eyebrow: "About WeMoove",
    title: "Built in Abuja, for the way Abuja moves.",
    body: "WeMoove started with a simple question: why is getting from A to B so stressful, and so risky? So we built a ride app where you always know who is in the car.",
    photos: [
      {
        src: "/assets/img/photos/bg-1.jpg",
        alt: "A smiling driver in a white shirt checking the app on his phone through the open window of his car",
      },
      {
        src: "/assets/img/services/standard.jpg",
        alt: "A WeMoove driver in a silver Toyota Corolla on a tree-lined street in Abuja",
      },
      {
        src: "/assets/img/services/bike-delivery-v2.jpg",
        alt: "A WeMoove rider in an amber WeMoove vest and helmet on a delivery motorbike",
      },
    ],
    badge: { title: "Made in Maitama", body: "Abuja, Nigeria" },
  },

  story: {
    eyebrow: "Our story",
    title: "Why we built WeMoove.",
    beats: [
      {
        label: "The problem",
        title: "Moving around every day was exhausting.",
        body: "Struggling for vehicles at bus stops and waiting a long time for a convenient ride wore down the developers at Connexxion Group and many of our staff. It soon became clear this was a challenge faced by many Nigerians.",
        icon: "user",
      },
      {
        label: "What we heard",
        title: "Commuters told us they didn't feel safe.",
        body: "When we spoke to commuters at bus stops and in traffic, the same stories kept coming up: phones and valuables lost in transit with no way to get them back, and worse, robbery, kidnapping and assault on public transport.",
        icon: "chat",
      },
      {
        label: "What we built",
        title: "A ride where someone always knows who is beside you.",
        body: "WeMoove lets you ride alone or share the trip, knowing that you, your driver or WeMoove knows who is in the car. You can reach your driver, track what happened, and get back what you left behind.",
        icon: "shieldCheck",
      },
    ] satisfies StoryBeat[],
    quote: "Move swiftly and comfortably from point A to point B, without the stress or the risk.",
  },

  values: {
    eyebrow: "What drives us",
    mission: {
      title: "Our mission",
      body: "We bring innovation to life through technology and aim to revolutionise transportation and ride sharing.",
    },
    vision: {
      title: "Our vision",
      body: "To provide an unparalleled experience as the most trusted leader in transport across Nigeria and Africa.",
    },
    principles: [
      { icon: "shieldCheck" as IconName, title: "Safety first", body: "Verified drivers, shared trip details and in-app reporting on every ride." },
      { icon: "wallet" as IconName, title: "Fair, fixed fares", body: "You see the price before you book. No haggling at the roadside." },
      { icon: "share" as IconName, title: "Better together", body: "Tag along with riders going your way and pay less." },
    ],
  },

  services: {
    eyebrow: "One app",
    title: "Everything that moves you, in one place.",
    link: "Explore our rides",
    href: "/#more-rides",
    items: [
      { name: "Standard", photo: "/assets/img/services/standard.jpg" },
      { name: "Executive", photo: "/assets/img/services/executive.jpg" },
      { name: "Premium", photo: "/assets/img/services/premium.jpg" },
      { name: "Bike Delivery", photo: "/assets/img/services/bike-delivery-v2.jpg" },
      { name: "Truck Delivery", photo: "/assets/img/services/truck-delivery-v2.jpg" },
    ],
  },

  company: {
    eyebrow: "Who owns WeMoove?",
    title: "Owned and operated by Connexxion Telecom.",
    body: "We are a team of driven, innovative and result-oriented specialists with the passion and skills to run the best ride sharing service in Nigeria. Our office in Maitama, in the heart of Abuja, is your home office for partnerships and deals.",
    addressLabel: "Visit us",
    landmark: "Close to the Inspector General of Police's house",
    partnerLabel: "Partner with us",
    cta: { label: "About Connexxion Telecom", href: "https://connexxiontelecom.com" },
  },

  cta: {
    title: "Come move with us.",
    body: "Download WeMoove and ride Solo or Shared across Abuja.",
  },
} as const;
