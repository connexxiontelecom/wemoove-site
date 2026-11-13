import type { IconName } from "@/components/ui/Icon";

/** Our Offerings copy. */
export type Offering = {
  title: string;
  icon: IconName;
  comingSoon: boolean;
  paragraphs: string[];
};

export const offerings = {
  pageName: "Our Offerings",
  meta: {
    description:
      "WeMoove Ride, Drive & Earn, and what's coming next: WeMoove Deliveries, Business and Interstate.",
  },
  items: [
    {
      title: "WeMoove Ride",
      icon: "car",
      comingSoon: false,
      paragraphs: [
        "WeMoove offers you a convenient ride sharing platform popularly known as “ALONG” in Nigerian pidgin parlance. Instead of walking to a bus stop and struggling for a ride, you book from where you are.",
        "Choose Standard and ride Solo with the car to yourself, or Shared to split the fare with riders going your way. For more comfort, choose Premium or Executive.",
      ],
    },
    {
      title: "WeMoove Drive & Earn",
      icon: "wallet",
      comingSoon: false,
      paragraphs: [
        "With WeMoove Drive & Earn, you decide when you drive and how much time you put in. It lets private car owners who want a side income earn from trips they are already making, away from the discomfort and hassle of city touts.",
      ],
    },
    {
      title: "WeMoove Deliveries",
      icon: "truck",
      comingSoon: false,
      paragraphs: [
        "Send items across Abuja from the same app. Choose Bike Delivery for small parcels and documents, or Truck Delivery for bigger and heavier loads, and track them from sender to receiver.",
      ],
    },
    {
      title: "WeMoove Business",
      icon: "briefcase",
      comingSoon: true,
      paragraphs: [
        "WeMoove Business is designed to help businesses find pocket friendly ways to move their employees to and from locations. It will be a dedicated corporate solution for Nigerian start-ups and established firms looking to cut the cost of mobility.",
      ],
    },
    {
      title: "WeMoove Interstate",
      icon: "map",
      comingSoon: true,
      paragraphs: [
        "You will understand the need for a regulated, interstate ride-sharing platform if you have ever found buses at recognised stations full, leaving you with unknown and unregistered vehicles and drivers beckoning you to join them.",
        "Travelling in an unknown or unregistered vehicle is a real risk. Some of those vehicles abandon their passengers midway, and if you travel regularly you will have seen stranded travellers on expressways needing a lift to somewhere safe.",
        "WeMoove is putting finishing touches to a solution for travellers who want to travel in comfort in a private vehicle, with the assurance of reaching their destination.",
      ],
    },
  ] satisfies Offering[],
} as const;
