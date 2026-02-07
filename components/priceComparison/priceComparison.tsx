"use client";

import React from "react";
import { Roboto } from "next/font/google";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { cn } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const PriceComparison = () => {
    const currentPage = useAppSelector((state) => state.onScrollSlice.page);
    const isDriver = currentPage === "driver";

    // Data Configuration to avoid duplication
    const tabs = isDriver
        ? ["3 Passengers", "2 Passengers", "1 Passenger"]
        : ["Daily", "Weekly", "Monthly"];

    const locations = [
        { label: "From", value: "Ikeja bus stop, Under Bridge", icon: ArrowRight },
        { label: "To", value: "Agege bus stop, The bridge", icon: MapPin },
    ];

    return (
        <section className="w-full py-10">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col items-end text-right mb-10 md:mb-16">
        <span className={cn(
            roboto.className,
            "bg-secondary text-white text-sm md:text-base py-2 px-5 rounded-full mb-4 inline-block shadow-sm"
        )}>
          {isDriver ? "Your Earnings" : "Price Comparison"}
        </span>

                <h2 className="text-secondary text-2xl md:text-[40px] font-medium leading-tight mb-8">
                    {isDriver ? "How much will you make?" : "How much would it cost?"}
                </h2>

                {/* Dynamic Tabs */}
                <div className="flex gap-6 border-b border-gray-100 w-full justify-end">
                    {tabs.map((tab, idx) => (
                        <div
                            key={tab}
                            className={cn(
                                "pb-3 px-2 text-sm md:text-base transition-all cursor-pointer whitespace-nowrap",
                                idx === 0
                                    ? "text-secondary border-b-[3px] border-tertiary font-medium"
                                    : "text-secondary/40 hover:text-secondary/70"
                            )}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left: Location Selectors */}
                <div className="flex flex-col gap-6 order-1 lg:order-none">
                    {locations.map((loc) => (
                        <div key={loc.label} className="w-full">
                            <label className="text-xs md:text-sm font-normal text-[#454442] mb-2 block">
                                {loc.label}
                            </label>
                            <div className="flex items-center justify-between bg-[#EFEEEC] p-4 rounded-sm">
                <span className="text-secondary text-sm md:text-base truncate mr-2">
                  {loc.value}
                </span>
                                <loc.icon className="text-gray-500 w-4 h-4 shrink-0" />
                            </div>
                        </div>
                    ))}
                    {/* Mobile Benefit Link (Hidden on Desktop) */}
                    <Link href="#scan" className="lg:hidden mt-2 text-tertiary flex items-center gap-1 group">
             <span className="underline underline-offset-4 text-sm font-medium">
               {isDriver ? "How do I benefit?" : "95% OFF on your next trip"}
             </span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Right: Price Cards (Mobile: Horizontal Scroll / Desktop: Grid) */}
                <div className="lg:col-span-3 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
                    <div className="flex lg:grid lg:grid-cols-3 gap-5 min-w-max lg:min-w-full">

                        {!isDriver ? (
                            // PASSENGER CARDS
                            <>
                                <IllustrationCard
                                    title="Bus/Danfo"
                                    price="N1,000"
                                    imgSrc="/images/bus.svg"
                                    imgClass="w-[180px] group-hover:scale-110"
                                />
                                <IllustrationCard
                                    title="Ride Services"
                                    price="N5,000"
                                    imgSrc="/images/car.svg"
                                    imgClass="w-[140px] group-hover:scale-[1.8] group-hover:translate-y-6"
                                />
                                <div className="group w-[280px] h-[270px] lg:w-full relative overflow-hidden rounded-sm bg-gray-200">
                                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                                        <div className="bg-white/95 backdrop-blur-sm p-6 text-center shadow-lg border border-white/20">
                                            <p className="text-secondary text-sm uppercase tracking-wider mb-1">Conductor.ng</p>
                                            <p className="text-secondary text-4xl font-bold">N1,200</p>
                                        </div>
                                    </div>
                                    <Image
                                        src="/images/people.jpg"
                                        alt="Community"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </>
                        ) : (
                            // DRIVER CARDS
                            <>
                                <DriverEarningsCard title="Daily Earnings" price="N1,000" bgImg="/images/daily.png" />
                                <DriverEarningsCard title="Weekly Earnings" price="N5,000" bgImg="/images/daily2.png" />
                                <DriverEarningsCard title="Monthly Earnings" price="N20,000" bgImg="/images/daily3.png" />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* --- FOOTER LINK (Desktop Only) --- */}
            <div className="hidden lg:flex justify-end mt-10">
                <Link href="#scan" className="group flex items-center gap-2 text-tertiary transition-all">
          <span className="underline decoration-tertiary/30 underline-offset-8 font-medium text-lg">
            {isDriver ? "How do I benefit?" : "95% OFF on your next trip"}
          </span>
                    <div className="bg-tertiary/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </Link>
            </div>
        </section>
    );
};

// --- SUB-COMPONENTS TO KEEP THINGS DRY ---

const IllustrationCard = ({ title, price, imgSrc, imgClass }:{ title: string, price: string, imgSrc: string, imgClass: string }) => (
    <div className="group w-[280px] h-[270px] lg:w-full bg-[#FAE8CF] rounded-sm relative flex flex-col items-center pt-10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <span className="text-secondary text-base font-normal z-10">{title}</span>
        <span className="text-secondary text-4xl font-extrabold mt-2 z-10">{price}</span>
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <div className="relative w-full h-1/2 flex justify-center translate-y-4">
                <Image
                    src={imgSrc}
                    alt={title}
                    width={300}
                    height={200}
                    className={cn("h-auto transition-all duration-500 ease-out object-contain", imgClass)}
                />
            </div>
        </div>
    </div>
);

const DriverEarningsCard = ({ title, price, bgImg }: { title: string, price: string, bgImg: string  }) => (
    <div
        className="group w-[280px] h-[270px] lg:w-full rounded-sm relative flex flex-col items-center pt-10 overflow-hidden bg-cover bg-center transition-all duration-300 hover:brightness-110"
        style={{ backgroundImage: `url(${bgImg})` }}
    >
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        <span className="text-secondary text-base font-normal z-10">{title}</span>
        <span className="text-secondary text-4xl font-extrabold mt-2 z-10">{price}</span>
    </div>
);

export default PriceComparison;