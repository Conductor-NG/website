import Image from "next/image";
import { cn } from "@/app/utils";
import { ChevronRight } from "lucide-react";
import { HowItWorksProps } from "./howItWorks";
import React, { useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";

const HowItWorksCardTwo = ({
  data: { headerText, description, imageSrc, button_text },
}: {
  data: HowItWorksProps;
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const currentPage = useAppSelector((state) => state.onScrollSlice.page);
  return (
    <div
      className={cn(
        "bg-[#fafafa] pb-[32px] group border-[8px] border-[#fafafa] md:max-h-[650px] max-h-[580px] relative overflow-hidden md:top-[128px]"
      )}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {/* desktop */}
      <div className="md:block hidden group-hover:translate-y-[-88px] translate-y-0 transition-all duration-[300ms] ease-in-out">
        <div className="mb-[32px] bg-[#ffffff]">
          <div
            className={cn(
              "relative w-full max-h-[388px] overflow-hidden bg-cover bg-center"
            )}
            style={{
              backgroundImage: isMouseOver
                ? "url(/images/iphone_2_bg.png)"
                : "",
            }}
          >
            <Image
              src={imageSrc}
              alt={`how it works image 1`}
              width={1000}
              height={1000}
              className={cn(
                "w-full h-[388px] group-hover:translate-y-[188px] transition-all duration-[300ms] ease-in-out"
              )}
            />
            {currentPage === "driver" && (
              <div className="absolute bottom-[11px] w-full">
                <Image
                  src="/images/pass_two.png"
                  alt={`how it works image 1`}
                  width={1000}
                  height={1000}
                  className={cn(
                    "w-[31%] h-[166px] mx-auto group-hover:scale-y-[160%] group-hover:scale-x-[180%] group-hover:translate-y-[-24%] hidden group-hover:block transition-all duration-[300ms] ease-in-out"
                  )}
                />
              </div>
            )}
            {currentPage === "passenger" && (
              <div className="absolute bottom-[11px] w-full">
                <Image
                  src="/images/trip.svg"
                  alt={`how it works image 1`}
                  width={1000}
                  height={1000}
                  className={cn(
                    "w-[51%] h-[166px] mx-auto group-hover:scale-y-[160%] group-hover:scale-x-[180%] group-hover:translate-y-[-24%] transition-all duration-[300ms] ease-in-out"
                  )}
                />
              </div>
            )}
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
      <div className="md:hidden block translate-y-[-88px] ">
        <div className="mb-[32px] bg-[#ffffff]">
          <div
            className={cn(
              "relative w-full h-full overflow-hidden bg-cover bg-center"
            )}
            style={{
              backgroundImage: "url(/images/iphone_2_bg.png)",
            }}
          >
            <Image
              src={imageSrc}
              alt={`how it works image 1`}
              width={1000}
              height={1000}
              className={cn("w-full h-[388px] translate-y-[188px]")}
            />
            <div className="absolute bottom-[11px] w-full">
              <Image
                src="/images/trip.svg"
                alt={`how it works image 1`}
                width={1500}
                height={1500}
                className={cn("w-[85%] h-auto mx-auto  translate-y-[-58px]")}
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
          <button className="px-[24px]  md:flex hidden  text-tertiary font-medium text-[16px] py-[12px] pr-[24px] rounded-[36px] mt-[5px] items-center mb-[50px]">
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
