import React from "react";
import { Roboto } from "next/font/google";
import { useAppSelector } from "@/lib/redux/hooks";
import WhatWeAreAboutCard from "./whatWeAreAboutCard";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "800"],
});

const content = {
  passenger: [
    {
      span: "What are about?",
      title: "Improving your daily commute experience",
      description:
        "We make it easy to plan your weekly rides, choose a pickup spot that works for you, and enjoy a reliable trip to work every day.",
      buttonText: "Give it a Try!",
      imgSrc: "/images/what_we_are_about_one.png",
    },
    {
      title: "Just Like Your Usual Ride , Only Cheaper",
      description:
        "No price hikes during rush hour, bad weather, or weekends. Enjoy consistent, affordable fares every day of the week.",
      buttonText: "I am interested",
      imgSrc: "/images/what_we_are_about_two.png",
    },
  ],
  driver: [
    {
      span: "What are about?",
      title: "Just like giving a co-worker a lift",
      description:
        "Your daily drive can do more. Share your empty seat with someone going your way",
      buttonText: "Give it a Try!",
      imgSrc: "/images/co-worker_lift.png",
    },
    {
      title: "But now your time and empty seat pay off.",
      description:
        "As a driver, you can create your weekly ride schedule, pick up people going your way, and earn extra all without changing your daily route.",
      buttonText: "I am interested",
      imgSrc: "/images/empty_seat.png",
    },
  ],
};

const WhatWeAreAbout = () => {
  const currentPage = useAppSelector((state) => state.onScrollSlice.page);
  return (
    <>
      {currentPage === "home"
        ? content.passenger.map((item, idx) => (
            <WhatWeAreAboutCard
              roboto={idx === 0 ? roboto.className : ""}
              position={idx + 1}
              key={idx}
              span={item.span}
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              imgSrc={item.imgSrc}
            />
          ))
        : content.driver.map((item, idx) => (
            <WhatWeAreAboutCard
              roboto={idx === 0 ? roboto.className : ""}
              position={idx + 1}
              key={idx}
              span={item.span}
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              imgSrc={item.imgSrc}
            />
          ))}
    </>
  );
};

export default WhatWeAreAbout;
