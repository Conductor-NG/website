import React from "react";
import { Roboto } from "next/font/google";
import {
  ArrowRight,
  MapPin,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { cn } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "800"],
});
const PriceComparison = () => {
  const currentPage = useAppSelector((state) => state.onScrollSlice.page);
  return (
    <div>
      <div className="ml-auto w-fit">
        <span
          className={cn(
            `${roboto.className}`,
            "md:ml-0 ml-auto  text-white md:inline-block block max-w-fit bg-secondary font-normal text-[16px] py-[8px] px-[16px] rounded-[36px] mb-[32px]"
          )}
        >
          {currentPage === "driver" ? "Your Earnings" : "Price Comparison"}
        </span>
        <h2 className="font-medium md:text-[40px] text-[24px] text-secondary md:mb-[40px] mb-[16px]">
          {currentPage === "driver"
            ? "How much will you make?"
            : "How much would it cost?"}
        </h2>
        <div className="flex font-normal mb-[40px] gap-x-[24px]">
          <span className="min-w-[96px] h-[40px]flex text-secondary text-center border-b-[4px] border-solid border-tertiary">
            {currentPage === "driver" ? "3 Passengers" : "Daily"}
          </span>
          <span className=" flex min-w-[96px] text-secondary/50 text-center">
            {currentPage === "driver" ? "2 Passengers" : "Weekly"}
          </span>
          <span className="flex min-w-[96px] text-secondary/50 text-center">
            {currentPage === "driver" ? "1 Passenger" : "Monthly"}
          </span>
        </div>
      </div>
      <div>
        {/* desktop */}
        {currentPage === "home" && (
          <div className="md:grid hidden grid-cols-4">
            <div className="flex flex-col justify-between ml-auto relative">
              <div>
                <div className="mb-[40px]">
                  <span className="font-normal text-[14px] text-[#454442]">
                    From
                  </span>
                  <div className="flex text-secondary font-normal justify-between py-[14px] px-[12px] w-[278px] bg-[#EFEEEC] mt-2">
                    <span>Ikeja bus stop, Under Bridge</span>{" "}
                    <ArrowRight className="text-gray-600" />
                  </div>
                </div>
                <div>
                  <span className="font-normal text-[14px] text-[#454442]">
                    To
                  </span>
                  <div className="flex text-secondary font-normal justify-between py-[14px] px-[12px] w-[278px] bg-[#EFEEEC] mt-2">
                    <span>Agege bus stop, The bridge</span>{" "}
                    <MapPin className="text-gray-600" />
                  </div>
                </div>
              </div>
              <div className="hidden  gap-x-[16px] items-center ml-auto">
                <span className="text-[#ACA9A6] text-[14px] leading-[24px]">
                  check other locations
                </span>
                <span className="relative">
                  <Image
                    src="/images/up_sketch.svg"
                    alt="up arrow"
                    width={500}
                    height={300}
                    className={cn("w-full h-auto")}
                  />
                  <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                    <ChevronUp />
                  </span>
                </span>
                <span className="relative">
                  <Image
                    src="/images/up_sketch.svg"
                    alt="up arrow"
                    width={500}
                    height={300}
                    className={cn("w-full h-auto")}
                  />
                  <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                    <ChevronDown />
                  </span>
                </span>
              </div>
            </div>
            {/* Bus Transition */}
            <div className="group w-[276px] h-[269px] ml-auto relative">
              <div className="bg-[#FAE8CF] h-full w-[239px] mx-auto ">
                <span className="block mx-auto w-fit pt-[32px] font-normal text-[16px] text-secondary">
                  Bus/Danfo
                </span>
                <span className="block mx-auto w-fit mt-[8px] font-extrabold text-[40px] text-secondary">
                  N1,000
                </span>
              </div>
              <div className="bg-white absolute bottom-[-100px] z-10 h-[100px] w-full ml-auto "></div>
              <div className="bg-white absolute top-0 right-0 z-10 h-full w-[20px] ml-auto "></div>
              <div className="w-full h-full absolute right-0 bottom-[-100px]">
                <Image
                  src="/images/bus.svg"
                  alt="Hero Image"
                  width={1000}
                  height={1000}
                  className={cn(
                    "w-[700px] h-auto transform scale-50 group-hover:scale-110 transition-all translate-y-5 duration-300 ease-in-out"
                  )}
                />
              </div>
            </div>
            {/* Car Transition */}
            <div className="group w-[276px] h-[269px] ml-auto relative">
              <div className="bg-[#FAE8CF] h-full w-[239px] mx-auto ">
                <span className="block mx-auto w-fit pt-[32px] font-normal text-[16px] text-secondary">
                  Ride Services
                </span>
                <span className="block mx-auto w-fit mt-[8px] font-extrabold text-[40px] text-secondary">
                  N5,000
                </span>
              </div>
              <div className="bg-white absolute bottom-[-100px] z-10 h-[100px] w-full ml-auto "></div>
              <div className="w-full h-full absolute right-0 bottom-[-135px]">
                <Image
                  src="/images/car.svg"
                  alt="Hero Image"
                  width={1000}
                  height={1000}
                  className={cn(
                    "w-[300px] h-auto transform scale-[.55] group-hover:scale-[2.0] group-hover:translate-y-[50px] transition-all translate-y-5 duration-300 ease-in-out"
                  )}
                />
              </div>
            </div>
            {/* People Transistion */}
            <div className="group w-[276px] h-[269px] ml-auto overflow-hidden relative">
              <div className="absolute top-0 left-0 bottom-0 right-0 flex z-10 justify-center items-center">
                <div className="flex min-w-1/2 bg-[#ffffff] flex-col justify-center items-center gap-y-[2px] p-[16px]">
                  <span className="text-secondary text-[16px] font-normal">
                    Conductor.ng
                  </span>
                  <span className="text-secondary text-[40px] font-bold">
                    N1,200
                  </span>
                </div>
              </div>
              <div className="w-[476px]  h-[269px] transform group-hover:translate-x-[-200px] transition-all duration-[700ms] ease-in-out">
                <Image
                  src="/images/people.jpg"
                  alt="Hero Image"
                  width={1000}
                  height={1000}
                  className={cn("w-full h-[269px]")}
                />
              </div>
            </div>
          </div>
        )}
        {currentPage === "driver" && (
          <div className="md:grid hidden grid-cols-4">
            <div className="flex flex-col justify-between ml-auto relative">
              <div>
                <div className="mb-[40px]">
                  <span className="font-normal text-[14px] text-[#454442]">
                    From
                  </span>
                  <div className="flex text-secondary font-normal justify-between py-[14px] px-[12px] w-[278px] bg-[#EFEEEC] mt-2">
                    <span>Ikeja bus stop, Under Bridge</span>{" "}
                    <ArrowRight className="text-gray-600" />
                  </div>
                </div>
                <div>
                  <span className="font-normal text-[14px] text-[#454442]">
                    To
                  </span>
                  <div className="flex text-secondary font-normal justify-between py-[14px] px-[12px] w-[278px] bg-[#EFEEEC] mt-2">
                    <span>Agege bus stop, The bridge</span>{" "}
                    <MapPin className="text-gray-600" />
                  </div>
                </div>
              </div>
              <div className="hidden  gap-x-[16px] items-center ml-auto">
                <span className="text-[#ACA9A6] text-[14px] leading-[24px]">
                  check other locations
                </span>
                <span className="relative">
                  <Image
                    src="/images/up_sketch.svg"
                    alt="up arrow"
                    width={500}
                    height={300}
                    className={cn("w-full h-auto")}
                  />
                  <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                    <ChevronUp />
                  </span>
                </span>
                <span className="relative">
                  <Image
                    src="/images/up_sketch.svg"
                    alt="up arrow"
                    width={500}
                    height={300}
                    className={cn("w-full h-auto")}
                  />
                  <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                    <ChevronDown />
                  </span>
                </span>
              </div>
            </div>
            {/* step one */}
            <div className="w-[276px] h-[269px] ml-auto relative">
              <div
                className=" h-full w-[239px] mx-auto "
                style={{
                  background: "url(/images/daily.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <span className="block mx-auto w-fit pt-[32px] font-normal text-[16px] text-secondary">
                  Daily Earnings
                </span>
                <span className="block mx-auto w-fit mt-[8px] font-extrabold text-[40px] text-secondary">
                  N1,000
                </span>
              </div>
            </div>
            {/* step two */}
            <div className="group w-[276px] h-[269px] ml-auto relative">
              <div
                className=" h-full w-[239px] mx-auto "
                style={{
                  background: "url(/images/daily2.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <span className="block mx-auto w-fit pt-[32px] font-normal text-[16px] text-secondary">
                  Weekly Earnings
                </span>
                <span className="block mx-auto w-fit mt-[8px] font-extrabold text-[40px] text-secondary">
                  N5,000
                </span>
              </div>
            </div>
            {/* step three */}
            <div className="group w-[276px] h-[269px] ml-auto relative">
              <div
                className=" h-full w-[239px] mx-auto "
                style={{
                  background: "url(/images/daily2.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <span className="block mx-auto w-fit pt-[32px] font-normal text-[16px] text-secondary">
                  Monthly Earnings
                </span>
                <span className="block mx-auto w-fit mt-[8px] font-extrabold text-[40px] text-secondary">
                  N20,000
                </span>
              </div>
            </div>
          </div>
        )}
        {/* mobile */}
        <div className="md:hidden grid grid-cols-1">
          <div className="relative">
            <div className="h-fit">
              <div className="mb-[40px]">
                <span className="font-normal text-[14px] text-[#454442]">
                  From
                </span>
                <div className="flex text-secondary font-normal justify-between py-[14px] px-[12px] md:w-[278px] w-full bg-[#EFEEEC] mt-2">
                  <span>Ikeja bus stop, Under Bridge</span>{" "}
                  <ArrowRight className="text-gray-600" />
                </div>
              </div>
              <div className="mb-[48px]">
                <span className="font-normal text-[14px] text-[#454442]">
                  To
                </span>
                <div className="flex text-secondary font-normal justify-between py-[14px] px-[12px] md:w-[278px] w-full bg-[#EFEEEC] mt-2">
                  <span>Agege bus stop, The bridge</span>{" "}
                  <MapPin className="text-gray-600" />
                </div>
              </div>
            </div>
            <div className="hidden gap-x-[16px] items-center ml-auto  mt-[24px] mb-[48px]">
              <span className=" block ml-auto" />
              <span className="text-[#ACA9A6] text-[14px] leading-[24px]">
                check other locations
              </span>
              <span className="relative">
                <Image
                  src="/images/up_sketch.svg"
                  alt="up arrow"
                  width={500}
                  height={300}
                  className={cn("w-full h-auto")}
                />
                <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                  <ChevronUp />
                </span>
              </span>
              <span className="relative">
                <Image
                  src="/images/up_sketch.svg"
                  alt="up arrow"
                  width={500}
                  height={300}
                  className={cn("w-full h-auto")}
                />
                <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                  <ChevronDown />
                </span>
              </span>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="min-w-fit flex">
              {/* Bus Transition */}
              <div className="group w-[276px] h-[269px] ml-auto relative">
                <div className="bg-[#FAE8CF] h-full w-[239px] mx-auto ">
                  <span className="block mx-auto w-fit pt-[32px] font-normal text-[16px] text-secondary">
                    Bus/Danfo
                  </span>
                  <span className="block mx-auto w-fit mt-[8px] font-extrabold text-[40px] text-secondary">
                    N1,000
                  </span>
                </div>
                <div className="bg-white absolute bottom-[-100px] z-10 h-[100px] w-full ml-auto "></div>
                <div className="bg-white absolute top-0 right-0 z-10 h-full w-[20px] ml-auto "></div>
                <div className="w-full h-full absolute right-0 bottom-[-100px]">
                  <Image
                    src="/images/bus.svg"
                    alt="Hero Image"
                    width={1000}
                    height={1000}
                    className={cn(
                      "w-[700px] h-auto transform scale-50 group-hover:scale-110 transition-all translate-y-5 duration-300 ease-in-out"
                    )}
                  />
                </div>
              </div>
              {/* Car Transition */}
              <div className="group w-[276px] h-[269px] ml-auto relative">
                <div className="bg-[#FAE8CF] h-full w-[239px] mx-auto ">
                  <span className="block mx-auto w-fit pt-[32px] font-normal text-[16px] text-secondary">
                    Ride Services
                  </span>
                  <span className="block mx-auto w-fit mt-[8px] font-extrabold text-[40px] text-secondary">
                    N5,000
                  </span>
                </div>
                <div className="bg-white absolute bottom-[-100px] z-10 h-[100px] w-full ml-auto "></div>
                <div className="w-full h-full absolute right-0 bottom-[-135px]">
                  <Image
                    src="/images/car.svg"
                    alt="Hero Image"
                    width={1000}
                    height={1000}
                    className={cn(
                      "w-[300px] h-auto transform scale-[.55] group-hover:scale-[2.0] group-hover:translate-y-[50px] transition-all translate-y-5 duration-300 ease-in-out"
                    )}
                  />
                </div>
              </div>
              {/* People Transistion */}
              <div className="group w-[276px] h-[269px] ml-auto overflow-hidden relative">
                <div className="absolute top-0 left-0 bottom-0 right-0 flex z-10 justify-center items-center">
                  <div className="flex min-w-1/2 bg-[#ffffff] flex-col justify-center items-center gap-y-[2px] p-[16px]">
                    <span className="text-secondary text-[16px] font-normal">
                      Conductor.ng
                    </span>
                    <span className="text-secondary text-[40px] font-bold">
                      N1,200
                    </span>
                  </div>
                </div>
                <div className="w-[476px]  h-[269px] transform group-hover:translate-x-[-200px] transition-all duration-[700ms] ease-in-out">
                  <Image
                    src="/images/people.jpg"
                    alt="Hero Image"
                    width={1000}
                    height={1000}
                    className={cn("w-full h-[269px]")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href="#scan">
          <button className="ml-auto mt-2 md:flex hidden items-center space-x-[10px] py-[15px] px-[29px] font-medium text-tertiary text-16px]">
            <span className="underline decoration-tertiary/50">
              {currentPage === "home"
                ? "95% OFF on your next trip"
                : "How do i benefit?"}
            </span>{" "}
            <ChevronRight className="h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PriceComparison;
