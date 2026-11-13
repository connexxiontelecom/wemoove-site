/**
 * How It Works copy.
 * Rewritten for the Solo / Shared model: fares are shown upfront, nobody negotiates a price.
 */
export type Step = { title: string; body: string };

export const howItWorks = {
  pageName: "How WeMoove Works",
  meta: {
    description:
      "How to book a Solo or Shared ride on WeMoove, and how to start driving and earning. Four simple steps for riders and drivers.",
  },
  intro: {
    title: "How to use the WeMoove app",
    paragraphs: [
      "WeMoove is a ride sharing app that gets you from your location to your destination without struggling for buses or taxis at bus stops, or risking your valuables on the way. It is built with safety features to keep you safe and comfortable.",
      "Ride Solo when you want the car to yourself, or ride Shared to tag along with people heading your way and split the fare. Either way, you see your fare before you book.",
      "WeMoove also gives private car owners an organised way to earn from their vehicle. Here is a quick guide for riders and drivers.",
    ],
  },
  riders: {
    title: "To Get A Ride",
    steps: [
      {
        title: "Set your trip",
        body: "Open the app, sign in and enter your destination in the “Where to” box. Your pickup is set from your location, or you can choose another pickup point.",
      },
      {
        title: "Choose your ride",
        body: "Pick Standard, Premium or Executive. On Standard, ride Solo with the car to yourself, or Shared to split the fare with riders going your way. Your fare is shown before you book, and you pay by card or from your WeMoove wallet.",
      },
      {
        title: "Meet your driver",
        body: "We match you with a nearby driver. You’ll see their name, photo, rating, car and plate number, and can call or chat with them in the app as they arrive.",
      },
      {
        title: "Ride & rate",
        body: "Share your trip with loved ones while you ride. When you arrive, rate your driver from 1 to 5 stars to help keep WeMoove safe for everyone.",
      },
    ] satisfies Step[],
  },
  drivers: {
    title: "To Drive",
    steps: [
      {
        title: "Register your car",
        body: "Switch from passenger mode to driver mode, tap My Cars, then Add New Car. Fill in your vehicle details and upload a photo of your car’s front view.",
      },
      {
        title: "Get verified",
        body: "We check your details and your vehicle before your first trip, so riders know who they are getting into a car with.",
      },
      {
        title: "Go online",
        body: "When you are ready to drive, go online to start receiving Solo and Shared trip requests near you. Drive when it suits you.",
      },
      {
        title: "Drive safely",
        body: "Pick up your riders at their pickup points and drive within the speed limit to each destination.",
      },
    ] satisfies Step[],
  },
  cta: {
    title: "Get Started Today",
    body: "Struggling to get a ride at bus stops shouldn’t be part of your everyday worries. Catch a safe ride easily without risking your valuables in a rush. Experience WeMoove ride sharing now.",
  },
} as const;
