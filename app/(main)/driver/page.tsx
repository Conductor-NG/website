"use client";

import {useEffect, PropsWithChildren} from "react";
import Link from "next/link";
import {ChevronUp} from "lucide-react";

import {useAppDispatch} from "@/lib/redux/hooks";
import {setOnScroll, setPage} from "@/lib/redux/slices/onSrcollSlice";

import {DriverHeroContent} from "@/components/hero";
import WhatWeAreAbout from "@/components/whatWeAreAbout/whatWeAreAbout";
import PriceComparison from "@/components/priceComparison/priceComparison";
import HowItWorks from "@/components/howItWorks/howItWorks";
import IsSafe from "@/components/isSafe/isSafe";
import Scan from "@/components/scan/scan";
import Footer from "@/components/footer/footer";
import DriverCampaign from "@/components/campaign/DriverCampaign";


type Props = PropsWithChildren<{
    className?: string;
    id?: string;
}>;

// Consistent container for all sections
const SectionWrapper = ({children, className, id}: Props) => (
    <section id={id} className={`max-w-[1120px] mx-auto md:w-[78%] px-6 md:px-0 ${className}`}>
        {children}
    </section>
);

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPage("driver"));
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
            {/* Mobile Scroll-to-Top */}
            <Link
                href="#top"
                className="fixed bottom-8 right-6 z-50 flex items-center justify-center h-12 w-12 bg-white/20 backdrop-blur-md border border-white/20 shadow-lg rounded-full md:hidden transition-all hover:bg-white/30"
            >
                <ChevronUp className="h-8 w-8"/>
            </Link>

            {/* Hero Section */}
            <SectionWrapper className="mt-[60px]">
                <DriverHeroContent/>
            </SectionWrapper>

            {/* What We Are About */}
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

            {/*Campaign*/}
            <SectionWrapper className="mt-24 md:mt-48">
                <DriverCampaign/>
            </SectionWrapper>

            {/* Is It Safe - Normalized from 288px to match page rhythm */}
            <SectionWrapper className="mt-24 md:mt-32">
                <IsSafe/>
            </SectionWrapper>

            {/* Scan Section with Background */}
            <div id="scan" className="mt-24 md:mt-32 bg-[#f0efed] py-20">
                <SectionWrapper>
                    <Scan/>
                </SectionWrapper>
            </div>

            {/* Footer with Background */}
            <footer className="bg-[#0a0704] pt-16">
                <Footer/>
            </footer>
        </div>
    );
};

export default Home;