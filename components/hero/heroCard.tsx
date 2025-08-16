import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type HeroContent = { role: string; heading: string; content: string };
const HeroCard = ({ heading, content }: HeroContent) => {
  return (
    <div className="mx-auto max-w-[817px]">
      <div className="font-medium md:text-[48px] text-[32px] text-center leading-[1.2] text-secondary mt-[24px]">
        {heading}
      </div>
      <div className="max-w-[551px] mx-auto font-normal leading-[1.7] text-secondary text-center mt-[24px]">
        {content}
      </div>
      <div className="flex w-fit mx-auto mt-[32px]">
        <Link href="#scan">
          <button className="hover:rounded-none transition-all duration-300 bg-primary py-[12px] px-[24px] rounded-[36px] font-bold text-secondary">
            Download the App
          </button>
        </Link>
        <Link href="#price-comparison">
          <button className="md:flex hidden items-center mr-[12px] bg-transparent py-[12px] underline decoration-tertiary/20 px-[24px] font-medium text-tertiary">
            <span>See Price Estimate</span>{" "}
            <ChevronRight className="h-[14px]" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroCard;
