import React from "react";
import { cn } from "@/app/utils";
import { Roboto } from "next/font/google";
import { useAppSelector } from "@/lib/redux/hooks";
import HowItWorksCardOne from "./howItWorksCardOne";
import HowItWorksCardTwo from "./howItWorksCardTwo";
import HowItWorksCardThree from "./howItWorksCardThree";
import HowItWorksCardFour from "./howItWorksCardFour";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "800"],
});

export type HowItWorksProps = {
  headerText: string;
  description: string;
  imageSrc: string;
  button_text: string;
  index?: number;
};
const data: Record<"passenger" | "driver", HowItWorksProps[]> = {
  passenger: [
    {
      headerText: "1. The Driver Creates a Trip",
      description:
        "Mr. Toba drives from Agege to Ikeja every day for work. To cover his fuel and car maintenance costs, he joins Conductor.ng and creates a trip listing with his available seats and schedule.",
      imageSrc: "/images/how_it_works1.svg",
      button_text: "Experience it!",
    },
    {
      headerText: "2. The Passengers Book a Ride",
      description:
        "Ms. Ebube and Mr. Ahmed both commute along the same route daily for work and classes. Looking for an affordable and comfortable ride, they join Conductor.ng and book seats on Mr. Toba’s trip.",
      imageSrc: "/images/iphone_2.png",
      button_text: "Get Started!",
    },
    {
      headerText: "3. They Discuss Pickup Details via Chat",
      description:
        "Using the Conductor.ng in-app chat, Mr. Toba and the passengers discuss and agree on the best pickup points and time that works for everyone.",
      imageSrc: "/images/chat_before_crp.png",
      button_text: "Get Started!",
    },
    {
      headerText: "4. They Ride Together",
      description:
        "On the day of the trip, Mr. Toba picks them up at the agreed locations. They enjoy a smooth, comfortable, and affordable ride to their destinations.",
      imageSrc: "/images/ride_together_1.png",
      button_text: "Download Now!",
    },
  ],
  driver: [
    {
      headerText: "1. You create a trip",
      description:
        "Mr. Toba drives from Agege to Ikeja every day for work. To cover his fuel and car maintenance costs, he joins Conductor.ng and creates a trip listing with his available seats and schedule.",
      imageSrc: "/images/how_it_works1.svg",
      button_text: "Experience it!",
    },
    {
      headerText: "2. You Accepts Ride Request From Passengers",
      description:
        "Mr. Toba receives ride requests from passengers heading in the same direction. He reviews their profiles and ratings, then accepts the ones he’s comfortable traveling with.",
      imageSrc: "/images/driver_screen_two.png",
      button_text: "Get Started!",
    },
    {
      headerText: "3. They Discuss Further Details via Chat",
      description:
        "Using Conductor.ng’s in-app chat, Mr. Toba and the passengers coordinate ride details, including the exact pickup point and a mutually convenient waiting time.",
      imageSrc: "/images/chat_before_crp.png",
      button_text: "Get Started!",
    },
    {
      headerText: "4. They Ride Together",
      description:
        "On the day of the trip, Mr. Toba picks them up at the agreed locations. They enjoy a smooth, comfortable, and affordable ride to their destinations.",
      imageSrc: "/images/ride_together_1.png",
      button_text: "Download Now!",
    },
  ],
};
const HowItWorks = () => {
  const currentPage = useAppSelector((state) => state.onScrollSlice.page);
  return (
    <div>
      <div>
        <span
          className={cn(
            `${roboto.className}`,
            "text-white inline-block bg-secondary font-normal text-[16px] py-[8px] px-[16px] rounded-[36px] mb-[32px]"
          )}
        >
          How it Works
        </span>
        <h2 className="font-medium md:text-[40px] text-[24px] text-secondary mb-[40px]">
          How does it Actually work?
        </h2>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[32px]">
        {currentPage === "home" && (
          <>
            {data.passenger
              .slice(0, 1)
              .map((item: HowItWorksProps, index: number) => (
                <HowItWorksCardOne key={index} data={{ ...item, index }} />
              ))}
            {data.passenger
              .slice(1, 2)
              .map((item: HowItWorksProps, index: number) => (
                <HowItWorksCardTwo key={index} data={{ ...item, index }} />
              ))}
            {data.passenger
              .slice(2, 3)
              .map((item: HowItWorksProps, index: number) => (
                <HowItWorksCardThree key={index} data={{ ...item, index }} />
              ))}
            {data.passenger
              .slice(3, 4)
              .map((item: HowItWorksProps, index: number) => (
                <HowItWorksCardFour key={index} data={{ ...item, index }} />
              ))}{" "}
          </>
        )}
        {currentPage === "driver" && (
          <>
            {data.driver
              .slice(0, 1)
              .map((item: HowItWorksProps, index: number) => (
                <HowItWorksCardOne key={index} data={{ ...item, index }} />
              ))}
            {data.driver
              .slice(1, 2)
              .map((item: HowItWorksProps, index: number) => (
                <HowItWorksCardTwo key={index} data={{ ...item, index }} />
              ))}
            {data.driver
              .slice(2, 3)
              .map((item: HowItWorksProps, index: number) => (
                <HowItWorksCardThree key={index} data={{ ...item, index }} />
              ))}
            {data.driver
              .slice(3, 4)
              .map((item: HowItWorksProps, index: number) => (
                <HowItWorksCardFour key={index} data={{ ...item, index }} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HowItWorks;
