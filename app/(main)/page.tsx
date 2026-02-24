"use client";

import {PropsWithChildren, useEffect} from "react";
import Link from "next/link";
import {ChevronUp} from "lucide-react";

import {useAppDispatch} from "@/lib/redux/hooks";
import {setOnScroll, setPage} from "@/lib/redux/slices/onSrcollSlice";

import {PassengerHeroContent} from "@/components/hero";
import WhatWeAreAbout from "@/components/whatWeAreAbout/whatWeAreAbout";
import PriceComparison from "@/components/priceComparison/priceComparison";
import HowItWorks from "@/components/howItWorks/howItWorks";
import IsSafe from "@/components/isSafe/isSafe";
import Scan from "@/components/scan/scan";
import Footer from "@/components/footer/footer";
import UserCampaign from "@/components/campaign/UserCampaign";

type Props = PropsWithChildren<{
    className?: string;
    id?: string;
}>;


// Reusable Layout Wrapper to ensure consistent spacing and width
const SectionWrapper = ({children, className, id}: Props) => (
    <section id={id} className={`max-w-[1120px] mx-auto md:w-[78%] px-6 md:px-0 ${className}`}>
        {children}
    </section>
);

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPage("home"));
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            dispatch(setOnScroll(window.scrollY));
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, [dispatch]);

    return (
        <div className="relative scroll-smooth" id="top">
            {/* Scroll to Top Button */}
            <Link
                href="#top"
                className="fixed bottom-8 right-6 z-50 flex items-center justify-center h-12 w-12 bg-white/20 backdrop-blur-md border border-white/20 shadow-lg rounded-full md:hidden transition-all hover:bg-white/30"
            >
                <ChevronUp className="h-8 w-8 text-current"/>
            </Link>

            {/* Hero Section */}
            <SectionWrapper className="mt-[60px]">
                <PassengerHeroContent/>
            </SectionWrapper>

            {/* About Section */}
            <SectionWrapper className="mt-24 md:mt-32">
                <WhatWeAreAbout/>
            </SectionWrapper>

            {/* Price Comparison */}
            <SectionWrapper id="price-comparison" className="mt-24 md:mt-32">
                <PriceComparison/>
            </SectionWrapper>

            {/* How It Works */}
            <SectionWrapper className="mt-24 md:mt-32">
                <HowItWorks/>
            </SectionWrapper>

            {/* Campaign Section - Full width variation if needed, otherwise use wrapper */}
            <SectionWrapper className="mt-24 md:mt-48">
                <UserCampaign/>
            </SectionWrapper>

            {/* Safety Section */}
            <SectionWrapper className="mt-24 md:mt-32">
                <IsSafe/>
            </SectionWrapper>

            {/* Scan Section */}
            <div id="scan" className="mt-24 md:mt-32 bg-[#f0efed] py-20">
                <SectionWrapper>
                    <Scan/>
                </SectionWrapper>
            </div>

            {/* Footer */}
            <footer className="bg-[#0a0704] pt-16 pb-8">
                <Footer/>
            </footer>
        </div>
    );
};

export default Home;