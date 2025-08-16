"use client";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ChevronUp } from "lucide-react";
import { setOnScroll, setPage } from "@/lib/redux/slices/onSrcollSlice";
import { DriverHeroContent } from "@/components/hero";
import WhatWeAreAbout from "@/components/whatWeAreAbout/whatWeAreAbout";
import PriceComparison from "@/components/priceComparison/priceComparison";
import HowItWorks from "@/components/howItWorks/howItWorks";
import IsSafe from "@/components/isSafe/isSafe";
import Scan from "@/components/scan/scan";
import Footer from "@/components/footer/footer";
import { useEffect } from "react";
import Link from "next/link";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPage("driver"));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setOnScroll(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <div className="relative" id="top">
      <Link
        href="#top"
        className="md:hidden fixed bottom-[30px] right-[24px] bg-white/20 backdrop-blur-md border border-white/20 shadow-md rounded-full z-50"
      >
        <ChevronUp className="h-[40px] w-[40px]" />
      </Link>
      <section className="mt-[62px] max-w-[1300px] mx-auto">
        <div className="md:px-0 px-[24px]">
          <DriverHeroContent />
        </div>
      </section>
      {/* What we are about */}
      <section className="md:mt-[160px] mt-[96px] max-w-[1300px] mx-auto">
        <div className="md:px-0 px-[24px]">
          <WhatWeAreAbout />
        </div>
      </section>
      {/* Price Comparison */}
      <section
        className="md:mt-[131px] mt-[96px] md:mb-[29x] max-w-[1300px] mx-auto md:pb-[100px]"
        id="price-comparison"
      >
        <div className="md:px-0 px-[24px]">
          <PriceComparison />
        </div>
      </section>
      {/* How it works */}
      <section className="md:mt-[131px] mt-[96px] max-w-[1300px] mx-auto">
        <div className="md:px-0 px-[24px]">
          <HowItWorks />
        </div>
      </section>
      {/* Is It Safe */}
      <section className="md:mt-[288px] mt-[120px]  max-w-[1300px] mx-auto md:pb-[157px] pb-[96px]">
        <div className="md:px-0 px-[24px]">
          <IsSafe />
        </div>
      </section>

      {/* scan */}
      <section className="bg-[#f0efed]">
        <div className="md:px-0 px-[24px]" id="scan">
          <Scan />
        </div>
      </section>
      <section className="bg-[#0a0704]">
        <div className="md:px-0 px-[24px]">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Home;
