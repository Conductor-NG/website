import React from "react";
import HeroCard from "./heroCard";

const DriverHeroContent = () => {
  return (
    <>
      <HeroCard
        role="Drivers"
        heading="Turn Empty seats to Extra cash!"
        content="Are you a driver? Join Conductor.ng, connect with passengers going your way and turn your daily route into an earnig opportunity."
      />
      <div className="mt-[64px] w-full h-full rounded-[16px]">
        <video
          src="/videos/hero_desktop.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block mx-auto w-full rounded-[15px]"
        />
        <video
          src="/videos/hero_mobile.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="block md:hidden mx-auto w-full rounded-[15px]"
        />
      </div>
    </>
  );
};

export default DriverHeroContent;
