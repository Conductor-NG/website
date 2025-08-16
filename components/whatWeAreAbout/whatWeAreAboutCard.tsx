import React from "react";
import { cn } from "@/app/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type WhatWeAreAboutCardProps = {
  roboto?: string;
  position: number;
  span?: string;
  title: string;
  description: string;
  buttonText: string;
  imgSrc: string;
};

const WhatWeAreAboutCard = ({
  roboto,
  position,
  span,
  title,
  description,
  buttonText,
  imgSrc,
}: WhatWeAreAboutCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:mt-[160px]  justify-between",
        `${position % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`
      )}
    >
      <div className="mt-[72px] max-w-[542px]">
        {span ? (
          <span
            className={cn(
              roboto,
              "text-white inline-block bg-secondary font-normal text-[16px] py-[8px] px-[16px] rounded-[36px] mb-[32px]"
            )}
          >
            {span}
          </span>
        ) : null}
        <h2 className="font-medium md:text-[40px] text-[24px] text-secondary md:mb-[40px] mb-[24px]">
          {title}
        </h2>
        <p className="max-w-[452px] font-light text-secondary md:text-[16px] text-[14px] leading-[1.8]">
          {description}
        </p>
        <Link href="#scan">
          <button className="md:flex hidden mt-[24px] items-center bg-transparent py-[12px] underline decoration-tertiary/20 font-medium text-tertiary">
            <span>{buttonText}</span> <ChevronRight className="h-[14px]" />
          </button>
        </Link>
      </div>
      <div className="bg-[#D9D9D9] max-w-[453px] w-full md:h-[423px] h-auto md:mt-[0px] mt-[40px]">
        <Image
          src={imgSrc}
          alt="what we are about"
          width={500}
          height={300}
          className={cn("w-full h-auto")}
        />
      </div>

      <button className="flex md:hidden mt-[24px] items-center bg-transparent py-[12px] underline decoration-tertiary/20 font-medium text-tertiary">
        <span>{buttonText}</span> <ChevronRight className="h-[14px]" />
      </button>
    </div>
  );
};

export default WhatWeAreAboutCard;
