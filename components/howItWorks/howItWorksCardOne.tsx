import Image from "next/image";
import { cn } from "@/app/utils";
import { ChevronRight } from "lucide-react";
import { HowItWorksProps } from "./howItWorks";
import React, { useState } from "react";
import Link from "next/link";

const HowItWorksCardOne = ({
  data: { headerText, description, imageSrc, button_text },
}: {
  data: HowItWorksProps;
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <div
      className={cn(
        "bg-[#fafafa] pb-[32px] group border-[8px] border-[#fafafa] max-h-[650px] relative overflow-hidden"
      )}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {/* desktop */}
      <div className="md:block hidden group-hover:translate-y-[-88px] translate-y-0 transition-all duration-[300ms] ease-in-out">
        <div className="mb-[32px] bg-[#ffffff]">
          <div className="relative w-full h-[388px]">
            <Image
              src={isMouseOver ? "/images/iphone1_bg.svg" : imageSrc}
              alt={`how it works image 1`}
              width={1000}
              height={1000}
              className={cn("w-full h-[388px]")}
            />
            <div className="absolute bottom-[12px] w-full">
              <Image
                src="/images/iphone1.png"
                alt={`how it works image 1`}
                width={1000}
                height={1000}
                className={cn(
                  "w-[46.5%] h-auto mx-auto group-hover:scale-y-[160%] group-hover:scale-x-[180%] group-hover:translate-y-[-24%] transition-all duration-[300ms] ease-in-out"
                )}
              />
            </div>
          </div>
        </div>
        <div className="px-[24px] mb-[100px]">
          <h2 className="font-bold text-[20px] leading-[1.8] mb-[32px] text-secondary">
            {headerText}
          </h2>
          <p className="text-[16px] leading-[1.8] text-secondary max-w-[496px]">
            {description}
          </p>
        </div>
        <Link href="#scan">
          <button className="px-[24px]  flex group-hover:translate-y-[-80px] translate-y-[30px] transition-all duration-[300ms] ease-in-out text-tertiary font-medium text-[16px] py-[12px] pr-[24px] rounded-[36px] mt-[5px] items-center mb-[50px]">
            <span className="underline decoration-tertiary/50">
              {button_text}
            </span>
            <span className="ml-[5px]">
              <ChevronRight className="h-[15px]" />
            </span>
          </button>
        </Link>
      </div>
      {/* mobile */}
      <div className="md:hidden block ">
        <div className="mb-[32px] bg-[#ffffff]">
          <div className="relative w-full h-full">
            <Image
              src={"/images/iphone1_bg.svg"}
              alt={`how it works image 1`}
              width={1000}
              height={1000}
              className={cn("w-full")}
            />
            <div className="absolute bottom-[30px] w-full">
              <Image
                src="/images/iphone1.png"
                alt={`how it works image 1`}
                width={1000}
                height={1000}
                className={cn(
                  "w-[46.5%] h-auto mx-auto scale-y-[190%] scale-x-[180%] translate-y-[-24%]"
                )}
              />
            </div>
          </div>
        </div>
        <div className="px-[24px] md:mb-[100px]">
          <h2 className="font-bold text-[20px] leading-[1.8] mb-[32px] text-secondary">
            {headerText}
          </h2>
          <p className="text-[16px] leading-[1.8] text-secondary max-w-[496px]">
            {description}
          </p>
        </div>
        <Link href="#scan">
          <button className="px-[24px]  md:flex hidden group-hover:translate-y-[-80px] translate-y-[30px] transition-all duration-[300ms] ease-in-out text-tertiary font-medium text-[16px] py-[12px] pr-[24px] rounded-[36px] mt-[5px] items-center mb-[50px]">
            <span className="underline decoration-tertiary/50">
              {button_text}
            </span>
            <span className="ml-[5px]">
              <ChevronRight className="h-[15px]" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HowItWorksCardOne;
