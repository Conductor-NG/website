import Image from "next/image";
import { cn } from "@/app/utils";
import { ChevronRight } from "lucide-react";
import { HowItWorksProps } from "./howItWorks";
import React, { useState } from "react";
import Link from "next/link";

const HowItWorksCardTwo = ({
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
          <div className={cn("relative w-full max-h-[388px] overflow-hidden")}>
            <div
              className={cn(
                "w-full sticky top-[0px] z-40 ",
                `${isMouseOver ? "top-[90px]" : ""}`
              )}
            >
              <Image
                src="/images/top_bar.png"
                alt={`how it works image 1`}
                width={1000}
                height={1000}
                className={cn("w-[100%] h-auto")}
              />
            </div>
            <div className=" group-hover:translate-y-[-55%] transition-all duration-[800ms] ease-in-out">
              <Image
                src={imageSrc}
                alt={`how it works image 1`}
                width={1000}
                height={1000}
                className={cn("w-full h-auto")}
              />
              <Image
                src="/images/chat_after_crp.png"
                alt={`how it works image 1`}
                width={1000}
                height={1000}
                className={cn("w-full h-auto")}
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
          <div className={cn("relative w-full max-h-fit overflow-hidden")}>
            <div className={cn("w-full sticky top-[0px] z-40 ")}>
              <Image
                src="/images/top_bar.png"
                alt={`how it works image 1`}
                width={1000}
                height={1000}
                className={cn("w-[100%] h-auto")}
              />
            </div>
            <div className=" translate-y-[-0%]">
              <Image
                src="/images/chat_after_crp.png"
                alt={`how it works image 1`}
                width={1000}
                height={1000}
                className={cn("w-full h-auto")}
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

export default HowItWorksCardTwo;
