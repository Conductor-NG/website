import { useEffect, useRef, useState } from "react";
import { cn } from "@/app/utils";
import { Roboto } from "next/font/google";
import Image from "next/image";
import gsap from "gsap";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "800"],
});
const optionsArray = [
  { state: "nin", image: "/images/nin.png", text: "NIN Verification" },
  { state: "tracking", image: "/images/tracking.png", text: "Live Tracking" },
  {
    state: "ride-share",
    image: "/images/ride_share.png",
    text: "Share Ride With Family",
  },
];

const IsSafe = () => {
  const [currentDisplay, setCurrentDisplay] = useState("nin");
  const boxRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Set up GSAP animation
  useEffect(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    tlRef.current = gsap.timeline({ paused: true });
    tlRef.current.fromTo(
      boxRef.current,
      { width: "0%" },
      { width: "100%", duration: 5, ease: "power1.inOut" }
    );

    const timeout = setTimeout(() => {
      if (tlRef.current) {
        tlRef.current.restart();
      }
      if (currentDisplay === "nin") {
        setCurrentDisplay("tracking");
      }
      if (currentDisplay === "tracking") {
        setCurrentDisplay("ride-share");
      }
      if (currentDisplay === "ride-share") {
        setCurrentDisplay("nin");
      }
    }, 5000);

    // Start animation immediately on mount/change
    if (tlRef.current) {
      tlRef.current.restart();
    }

    return () => {
      clearTimeout(timeout);
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [currentDisplay]);

  return (
    <div className="w-full">
      <div className="w-[fit-content] mx-auto">
        <span
          className={cn(
            `${roboto.className}`,
            "text-white block bg-secondary w-[fit-content] mx-auto font-normal text-[16px] py-[8px] px-[16px] rounded-[36px] mb-[32px]"
          )}
        >
          Is it Safe?
        </span>
        <h2 className="font-medium md:text-[40px] text-[24px] text-secondary mb-[32px] text-center">
          Safety That Grows With You
        </h2>
        <p className="font-normal text-[16px] leading-[1.8] text-center">
          From NIN verified identities to live tracking, your peace of mind
          comes first.
        </p>
      </div>
      <div className="mt-[40px] max-w-[746px] mx-auto">
        <div className="flex mb-[24px]">
          <div
            className={cn(
              "flex items-center justify-center gap-[12px] w-[248px] py-[8px] h-40px] relative ",
              `${
                currentDisplay === "nin" ? "text-[#292928]" : "text-[#676563]"
              }`
            )}
          >
            <div
              ref={currentDisplay === "nin" ? boxRef : noRef}
              style={{ width: "0%" }}
              className={cn(
                "border-b-tertiary border-b-[3px] absolute bottom-0 left-0"
              )}
            />
            <span>
              <Image
                className="w-[16px] h-[16px]"
                src="/images/verified.svg"
                alt="verified logo"
                width={16}
                height={16}
                priority
              />
            </span>
            <span className="md:text-[14px] text-[11px] font-normal">
              NIN Verification
            </span>
          </div>
          <div
            className={cn(
              "flex items-center justify-center gap-[12px] w-[248px] py-[8px] h-40px] relative ",
              `${
                currentDisplay === "tracking"
                  ? "text-[#292928]"
                  : "text-[#676563]"
              }`
            )}
          >
            <div
              ref={currentDisplay === "tracking" ? boxRef : noRef}
              style={{
                width: "0%",
              }}
              className={cn(
                "border-b-tertiary border-b-[3px] absolute bottom-0 left-0"
              )}
            />
            <span>
              <Image
                className="w-[16px] h-[16px]"
                src="/images/Address.svg"
                alt="address logo"
                width={16}
                height={16}
                priority
              />
            </span>
            <span className="md:text-[14px] text-[11px] font-normal">
              Live Tracking
            </span>
          </div>
          <div
            className={cn(
              "flex items-center justify-center gap-[12px] w-[248px] py-[8px] h-40px] relative ",
              `${
                currentDisplay === "ride-share"
                  ? "text-[#292928]"
                  : "text-[#676563]"
              }`
            )}
          >
            <div
              ref={currentDisplay === "ride-share" ? boxRef : noRef}
              style={{
                width: "0%",
              }}
              className={cn(
                "border-b-tertiary border-b-[3px] absolute bottom-0 left-0"
              )}
            />
            <span>
              <Image
                className="w-[16px] h-[16px]"
                src="/images/share.svg"
                alt="share logo"
                width={16}
                height={16}
                priority
              />
            </span>
            <span className="md:text-[14px] text-[11px] font-normal">
              Share Ride With Family
            </span>
          </div>
        </div>
        <div className="overflow-hidden bg-black rounded-[8px]">
          <div
            className={cn(
              "flex hover:translate-x-[-100%] transition-transform duration-300 py-[5px] px-[5px]",
              `${currentDisplay === "nin" ? "translate-x-[0%]" : ""}`,
              `${currentDisplay === "tracking" ? "translate-x-[-100%]" : ""}`,
              `${currentDisplay === "ride-share" ? "translate-x-[-200%]" : ""}`
            )}
          >
            {optionsArray.map((option, idx) => (
              <div
                key={idx}
                className="bg-black min-w-[100%] md:h-[396px] relative"
              >
                <Image
                  className="w-full h-full absolute top-0"
                  src={option.image}
                  alt={option.text}
                  width={746}
                  height={396}
                  priority
                />
                <Image
                  className="w-full h-full mx-auto"
                  src="/images/safe_grid.png"
                  alt={`${option.text} background grid`}
                  width={746}
                  height={396}
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsSafe;
