import React from "react";
import FAQHeadingSection from "@/components/faq/faqHeadingSection";
import FAQListSection from "@/components/faq/faqListSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/footer/footer";
import Scan from "@/components/scan/scan";

const Page = () => {
  return (
    <div>
      <div className="md:max-w-[613px] mx-auto">
        <FAQHeadingSection />
        <FAQListSection />
        <section className="hidden flex-col w-full items-start gap-6 relative mt-[180px]">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Archivo',Helvetica] font-medium text-black text-base tracking-[0] leading-8">
            Do you have more questions?
          </h2>

          <Input
            className="h-[52px] px-4 py-5 bg-[#efeeec1a] border-[0.2px] border-solid border-[#666462]/20 [font-family:'Archivo',Helvetica] font-light text-[#676563] text-base tracking-[0] leading-[19.2px]"
            placeholder="Enter your email here"
            type="email"
          />

          <Textarea
            className="h-48 px-4 py-5 bg-[#efeeec1a] border-[0.2px] border-solid border-[#666462]/20 [font-family:'Archivo',Helvetica] font-light text-[#676563] text-base tracking-[0] leading-[19.2px] resize-none"
            placeholder="Type your question here"
          />
        </section>
      </div>
      {/* scan */}
      <div id="scan" className="md:pb-[157px] pb-[96px]"></div>
      <div className="bg-[#f0efed] md:pb-[50px]">
        <section className="md:w-[78%] max-w-[1300px] mx-auto">
          <div className="md:px-0 px-[24px]">
            <Scan />
          </div>
        </section>
      </div>
      <section className="bg-[#0a0704]">
        <div className="md:px-0 px-[24px]">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Page;
