"use client";
import { cn } from "@/app/utils";
import { Roboto } from "next/font/google";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import Link from "next/link";
import Scan from "@/components/scan/scan";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "800"],
});
const listOfPolicies: {
  title: string;
  linkAddress: string;
}[] = [
  {
    title: "What Information We May Collect From You",
    linkAddress: "policy-1",
  },
  { title: "How Do We Collect Information From You?", linkAddress: "policy-2" },
  { title: "How We Use Your Information", linkAddress: "policy-3" },
  { title: "Marketing Material", linkAddress: "policy-4" },
  {
    title: "Digital Marketing and Online Advertising",
    linkAddress: "policy-5",
  },
  { title: "Disclosure of Your Information", linkAddress: "policy-6" },
  { title: "How Long We Keep Your Information", linkAddress: "policy-7" },
  {
    title: "How We Store and Secure Your Information",
    linkAddress: "policy-8",
  },
  { title: "Sensitive Personal Information", linkAddress: "policy-9" },
  {
    title: "Accessing and Correcting Your Information",
    linkAddress: "policy-10",
  },
  { title: "Erasing Your Information", linkAddress: "policy-11" },
  { title: "Changes to This Policy", linkAddress: "policy-12" },
  { title: "Contacting Us and Complaints", linkAddress: "policy-13" },
];
const PrivacyPolicy = () => {
  const [focus, setFocused] = useState<string>("");
  return (
    <div className={cn(`${roboto.className}`)} id="top">
      <Link
        href="#top"
        className="fixed bottom-[30px] right-[24px] bg-white/20 backdrop-blur-md border border-white/20 shadow-md rounded-full z-50"
      >
        <ChevronUp className="h-[40px] w-[40px]" />
      </Link>
      <section className="md:mt-[131px] mt-[96px] md:mb-[29x] max-w-[1300px] mx-auto md:pb-[100px]">
        <div className="md:px-0 px-[24px]">
          {/* top */}
          <div className="flex md:flex-row flex-col-reverse mb-[80px]">
            <div className="max-w-[287px] md:mx-0 mx-auto">
              <Image
                src="/images/privacy-policy.png"
                alt="Privacy Policy"
                width={287}
                height={287}
                className="w-full h-auto"
              />
            </div>
            <div className="max-w-[620px] ml-auto md:text-end">
              <h1 className="md:text-5xl text-[32px] font-medium md:mb-6 mb-3">
                Our privacy policy
              </h1>
              <p className="md:mb-10 mb-5 text-[#ACA9A6] text-[16px] font-normal">{`Last updated: ${new Date().toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}`}</p>
              <p className="md:font-light font-normal text-[16px] text-[#292928] leading-[200%]">
                Conductor.ng (&quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                protect your personal information when you visit and interact
                with our website.
              </p>
            </div>
          </div>
          {/* content */}
          <div className="grid md:grid-cols-[1fr_2fr] grid-cols-[1fr] gap-4">
            {/* left side */}
            <div className="text-[#ACA9A6] md:mt-[64px] mt-0">
              <p>List of policies</p>
              <ol className="list-decimal pl-5 mt-2">
                {listOfPolicies.map((policy, index) => (
                  <li key={index} className="my-1">
                    <Link
                      href={`#${policy.linkAddress}`}
                      onClick={() => setFocused(policy.linkAddress)}
                      className={cn(
                        "leading-[200%] text-[14px] font-normal hover:underline",
                        `${
                          focus === policy.linkAddress
                            ? "text-primary underline"
                            : ""
                        }`
                      )}
                    >
                      {policy.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            {/* right side */}
            <div>
              <div
                id="policy-1"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-1" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-1")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  1.&nbsp;What Information We May Collect From You
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    We may collect the following types of information:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>
                      Full name, email address, phone number, and physical
                      address
                    </li>
                    <li>
                      Billing and payment information (excluding full credit
                      card numbers, which are handled by secure payment
                      gateways)
                    </li>
                    <li>Order history and product preferences</li>
                    <li>IP address, browser type, and device information</li>
                    <li>
                      Interaction data (e.g. clicks, pages visited, and time
                      spent on pages)
                    </li>
                  </ul>
                </div>
              </div>

              <div
                id="policy-2"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-2" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-2")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  2.&nbsp;How Do We Collect Information From You?
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">Information is collected through:</p>
                  <ul className="list-disc pl-5">
                    <li>Website forms (checkout, sign-up, contact forms)</li>
                    <li>Account registration and order placement</li>
                    <li>Cookies and tracking tools (for analytics and ads)</li>
                    <li>Direct communications (e.g., email, phone)</li>
                    <li>
                      Third-party services (e.g., Google Analytics, Facebook
                      Pixel)
                    </li>
                  </ul>
                </div>
              </div>
              <div
                id="policy-3"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-3" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-3")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  3.&nbsp;How We Use Your Information
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">We use your personal information to:</p>
                  <ul className="list-disc pl-5">
                    <li>Process orders and deliver products</li>
                    <li>Provide customer support</li>
                    <li>Improve our website, products, and services</li>
                    <li>Manage your account</li>
                    <li>Detect fraud and ensure compliance with laws</li>
                  </ul>
                </div>
              </div>
              <div
                id="policy-4"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-4" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-4")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  4.&nbsp;Marketing Material
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    We may send promotional emails and newsletters with your
                    consent. You can unsubscribe at any time using the
                    “unsubscribe” link in our emails or by contacting us
                    directly.
                  </p>
                </div>
              </div>
              <div
                id="policy-5"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-5" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-5")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  5.&nbsp;Digital Marketing and Online Advertising
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-5">
                    We use tools like Google Ads, Meta (Facebook/Instagram) Ads,
                    and other third-party platforms to show relevant ads to
                    users. These platforms may use cookies or tracking pixels to
                    tailor ads based on your behavior on our site.
                  </p>
                  <p className="mb-1">
                    You can adjust ad preferences via your browser or device
                    settings.
                  </p>
                </div>
              </div>
              <div
                id="policy-6"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-6" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-6")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  6.&nbsp;Disclosure of Your Information
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">We may share your information with:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Service Providers who help us deliver our services (e.g.,
                      payment processors, couriers, marketing platforms)
                    </li>
                    <li>
                      Overseas Service Providers, including those based outside
                      Nigeria, where necessary for service delivery. We ensure
                      all third-party providers comply with data protection
                      standards.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                id="policy-7"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-7" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-7")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  7.&nbsp;How Long We Keep Your Information
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    We retain your information for as long as needed to fulfill
                    the purposes outlined in this policy, including legal and
                    accounting obligations, or until you request its erasure.
                  </p>
                </div>
              </div>
              <div
                id="policy-8"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-8" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-8")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  8.&nbsp;How We Store and Secure Your Information
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    Your data is stored on secure servers and protected using
                    industry-standard security measures, including:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>HTTPS encryption</li>
                    <li>Secure WordPress plugins</li>
                    <li>Limited administrative access</li>
                  </ul>
                  <p className="mb-1">
                    Despite these efforts, no system can guarantee 100%
                    security. We advise users to keep passwords secure.
                  </p>
                </div>
              </div>
              <div
                id="policy-9"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-9" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-9")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  9.&nbsp;Sensitive Personal Information
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    We do not intentionally collect sensitive personal
                    information such as biometric data or health records. If you
                    voluntarily provide such information, you consent to our
                    processing of it in accordance with this policy.
                  </p>
                </div>
              </div>
              <div
                id="policy-10"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-10" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-10")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  10.&nbsp;Accessing and Correcting Your Information
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    You may request to access or update the personal information
                    we hold about you by contacting us at the email below.
                  </p>
                </div>
              </div>
              <div
                id="policy-11"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-11" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-11")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  11.&nbsp;Erasing Your Information
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    You can request that we delete your data at any time,
                    subject to legal or contractual obligations requiring
                    retention.
                  </p>
                </div>
              </div>
              <div
                id="policy-12"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-12" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-12")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  12.&nbsp;Changes to This Policy
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    We may update this Privacy Policy from time to time. When we
                    do, we will post the updated version on this page with a
                    revised “Effective Date.” Continued use of the website
                    constitutes acceptance of the updated policy.
                  </p>
                </div>
              </div>
              <div
                id="policy-13"
                className={cn(
                  "mb-[27px] border-[#ACA9A6] border-[0.5px] p-6",
                  `${focus === "policy-13" ? "border-[#E88D0E]" : ""}`
                )}
                tabIndex={0}
                onFocus={() => setFocused("policy-13")}
                onBlur={() => setFocused("")}
              >
                <h3 className="mb-[32px] font-normal text-[20px]">
                  13.&nbsp;Contacting Us and Complaints
                </h3>
                <div className="font-light text-[16px] text-[#292928] leading-[200%]">
                  <p className="mb-1">
                    If you have any questions or concerns about this Privacy
                    Policy or how your data is handled, please contact:
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* scan */}
      <section className="bg-[#f0efed]">
        <div className="md:px-0 px-[24px] pt-[24px]" id="scan">
          <Scan text="privacy-policy" />
        </div>
      </section>
      {/* footer */}
      <section className="bg-[#0a0704]">
        <div className="md:px-0 px-[24px]">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
