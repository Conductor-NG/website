import React from "react";
import Image from "next/image";
import {Roboto} from "next/font/google";
import {ChevronRight} from "lucide-react";
import {cn} from "@/app/utils";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "400", "500", "700", "800"],
});

const DriverCampaign = () => {
    return (
        <section className="flex flex-col items-center w-full px-6 md:px-0">
            {/* Badge */}
            <span
                className={cn(roboto.className, "bg-secondary text-white text-base font-normal py-2 px-4 rounded-full mb-8")}>
                Campaign
            </span>

            {/* Header & Description */}
            <div className="text-center max-w-2xl">
                <h2 className="text-secondary text-2xl md:text-4xl font-medium mb-3">
                    Turn Your Daily Commute Into Earnings
                </h2>
                <p className="text-secondary font-light md:text-lg leading-relaxed">
                    Enter your route, see potential earnings, and learn how drivers make money without changing their
                    daily schedule.
                </p>
            </div>

            {/* Action Button */}
            <div className="mt-6">
                <a
                    href='/campaign/driver'
                    className="group flex items-center gap-1 text-tertiary font-medium text-sm md:text-base transition-all hover:opacity-80">
                    <span>Join the Campaign</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                </a>
            </div>

            {/* Hero Image Container */}
            <div className="mt-12 w-full max-w-[1120px]">
                <Image
                    className="w-full h-auto object-cover rounded-2xl shadow-sm"
                    src="/images/campaign.driver.png"
                    width={1134}
                    height={578}
                    alt="User Campaign Illustration"
                    priority
                />
            </div>
        </section>
    );
};

export default DriverCampaign;