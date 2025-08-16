import React from "react";
import HeroCard from "./heroCard";

const PassengerHeroContent = () => {
  return (
    <>
      <HeroCard
        role="Passengers"
        heading="Relax! we've made comfort affordable for you"
        content="Whether it's your workplace or a weekend spot, Conductor.ng gets you there quickly in comfort and without breaking the bank"
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

export default PassengerHeroContent;
