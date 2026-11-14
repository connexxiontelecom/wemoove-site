import type { IconName } from "@/components/ui/Icon";

/** Our Offerings copy: an overview of every WeMoove service, live and coming next. */

export type OfferingTile = {
  id: string;
  name: string;
  kicker: string;
  body: string;
  tags: string[];
  photo: string;
  photoAlt: string;
  href: string;
  linkLabel: string;
};

export type Need = { need: string; pick: string; href: string };

export type ComingOffering = {
  name: string;
  icon: IconName;
  tagline: string;
  problem: string;
  promise: string;
};

export const offerings = {
  pageName: "Our Offerings",
  meta: {
    description:
      "Everything WeMoove does: rides (Standard Solo or Shared, Premium, Executive), Drive & Earn, Bike and Truck Delivery, and what's coming next: Business and Interstate.",
  },

  hero: {
    eyebrow: "Our offerings",
    title: "One app for every trip, every parcel and every driver.",
    body: "Book a ride, send something across Abuja, or earn with your car. Here's everything you can do on WeMoove today, and what's coming next.",
  },

  tiles: [
    {
      id: "ride",
      name: "WeMoove Ride",
      kicker: "Your “along”, without the bus stop",
      body: "Book from where you are instead of struggling for a ride. Ride Solo with the car to yourself, go Shared and pay less, or step up to Premium or Executive.",
      tags: ["Standard: Solo or Shared", "Premium", "Executive"],
      photo: "/assets/img/services/standard.jpg",
      photoAlt: "A WeMoove driver in a silver Toyota Corolla on a tree-lined street in Abuja",
      href: "/ride",
      linkLabel: "Explore rides",
    },
    {
      id: "drive",
      name: "Drive & Earn",
      kicker: "Earn from trips you already make",
      body: "Drive when it suits you and get Solo and Shared requests nearby, with fixed upfront fares and no touts.",
      tags: ["Flexible hours", "Fixed fares"],
      photo: "/assets/img/photos/bg-1.jpg",
      photoAlt: "A smiling driver checking the WeMoove app on his phone from the driver's seat",
      href: "/drive",
      linkLabel: "Start driving",
    },
    {
      id: "bike",
      name: "Bike Delivery",
      kicker: "Small parcels, fast",
      body: "Documents, food and small packages, picked up by a WeMoove rider and taken straight to the door.",
      tags: ["Documents", "Small parcels"],
      photo: "/assets/img/services/bike-delivery-v2.jpg",
      photoAlt: "A WeMoove rider in an amber WeMoove vest and helmet on a delivery motorbike",
      href: "/#more-rides",
      linkLabel: "See deliveries",
    },
    {
      id: "truck",
      name: "Truck Delivery",
      kicker: "Big loads, handled",
      body: "Furniture, stock and bulky items moved by truck, booked from the same app you ride with.",
      tags: ["Furniture", "Bulky items"],
      photo: "/assets/img/services/truck-delivery-v2.jpg",
      photoAlt: "A WeMoove truck with a worker in a WeMoove vest carrying a parcel to the door",
      href: "/#more-rides",
      linkLabel: "See deliveries",
    },
  ] satisfies OfferingTile[],

  finder: {
    eyebrow: "Not sure which to pick?",
    title: "Tell us what you need.",
    needs: [
      { need: "Get to work without overspending", pick: "Standard · Shared", href: "/ride" },
      { need: "Get somewhere fast, on my own", pick: "Standard · Solo", href: "/ride" },
      { need: "Ride in a comfier car on an everyday trip", pick: "Premium", href: "/ride" },
      { need: "Arrive in style for a meeting or event", pick: "Executive", href: "/ride" },
      { need: "Send documents or a small parcel", pick: "Bike Delivery", href: "/#more-rides" },
      { need: "Move furniture or bulky items", pick: "Truck Delivery", href: "/#more-rides" },
      { need: "Earn money with my car", pick: "Drive & Earn", href: "/drive" },
    ] satisfies Need[],
  },

  coming: {
    eyebrow: "Coming next",
    title: "What we're building now.",
    label: "Coming soon",
    problemLabel: "The problem",
    promiseLabel: "What's coming",
    items: [
      {
        name: "WeMoove Interstate",
        icon: "map",
        tagline: "Travel between cities in comfort, in a private vehicle.",
        problem:
          "Buses at recognised stations are often full, leaving travellers with unknown, unregistered vehicles. Some abandon passengers midway, and stranded travellers on expressways are a common sight.",
        promise:
          "A regulated way to travel between cities in a private vehicle, with the assurance of reaching your destination.",
      },
      {
        name: "WeMoove Business",
        icon: "briefcase",
        tagline: "Move your team for less.",
        problem: "Getting employees to and from work, meetings and sites is expensive and hard to manage.",
        promise:
          "A dedicated corporate solution for Nigerian start-ups and established firms, built to cut the cost of moving their people.",
      },
    ] satisfies ComingOffering[],
  },

  cta: {
    title: "Everything's in one app.",
    body: "Download WeMoove to ride, send and earn across Abuja.",
  },
} as const;
