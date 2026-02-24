"use client";

import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {useSearchParams} from "next/navigation";

import {satoshi} from "@/app/fonts/satoshi";
import {cn} from "@/app/utils";
import {
    CampaignVariant,
    CAMPAIGN_REFERRAL_STORAGE_KEY,
    verifyOTPNumber, resendOTPVerification, completeAndNavigateToStore, sendOTPVerification,
} from "@/lib/campaign";
import {Footer, SignupModal} from "@/components/campaign-page/CampaignPage";
import {Roboto} from "next/font/google";
import Link from "next/link";
import {useAppSelector} from "@/lib/redux/hooks";
import {CircleX, Menu} from "lucide-react";

type ModalState = "idle" | "signup";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "400", "500", "700", "800"],
});

export function Button({
                           href,
                           className,
                           children,
                       }: { href: string; className?: string; children: React.ReactNode }) {
    return (
        <Link
            type="button"
            href={href}
            className={cn(
                "rounded-xl px-6 py-3 text-sm font-bold text-center transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                className,
            )}
        >
            {children}
        </Link>
    );
}

const NavBar = ({onAction, variant, ref}: { variant: CampaignVariant; ref: string; onAction: () => void; }) => {
    const scrollY = useAppSelector((state) => state.onScrollSlice.value);
    const [toggleMenu, setToggleMenu] = useState(false);

    const otherVariant: CampaignVariant = variant === "driver" ? "passenger" : "driver";
    const href = `/downloads/${otherVariant}${ref.length === 0 ? '' : `?ref=${ref}`}`;

    return (
        <>
            <nav
                className={cn(
                    "sticky top-0 left-0 right-0 z-[200] min-h-[96px] py-[15px] ",
                    `${scrollY > 0 ? "border-b-[1px] border-gray-300" : ""}`
                )}
            >
                {/* Desktop */}
                <div
                    className="hidden md:flex justify-between max-w-[1120px] w-[78%]  items-center text-[16px] leading-[21px] font-medium text-black bg-white mx-[auto] h-[60px]">
                    <Link href="/">
                        <Image
                            className="w-[28px] h-[28px] md:w-[50px] md:h-[50px]"
                            src="/images/conductor.svg"
                            alt="Conductor logo"
                            width={48}
                            height={20}
                            priority
                        />
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link
                            href={href}
                            className="hidden rounded-full border border-[#e6e5e3] px-4 py-2 text-sm font-semibold text-tertiary hover:border-[#d7d5d2] md:inline-flex">
                            {variant === 'driver' ? "I'm a Passenger" : "I'm a Car Owner"}
                        </Link>

                        <button
                            type="button"
                            onClick={onAction}
                            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-[#d97f07]"
                        >
                            Download App
                        </button>
                    </div>
                </div>

                {/* Mobile */}
                <div
                    className={cn(
                        "md:hidden flex flex-col",
                        `${toggleMenu ? "h-screen w-screen fixed inset-0" : ""}`
                    )}
                >
                    <div
                        className={cn(
                            "flex  px-[24px] items-center text-[16px] leading-[21px] font-medium text-black bg-white w-full h-[88px] justify-between space-x-2",
                            `${toggleMenu ? "border-b-[1px] border-gray-300" : ""}`,
                            `${scrollY > 0 ? "border-b-[1px] border-gray-300" : ""}`
                        )}
                    >
                        <span className="hover:scale-[1.1] ">
                            <Link href="/">
                                <Image
                                    className="w-[28px] h-[28px] md:w-[50px] md:h-[50px]"
                                    src="/images/conductor.svg"
                                    alt="Conductor logo"
                                    width={40}
                                    height={32}
                                    priority
                                />
                            </Link>
                        </span>

                        <span onClick={() => setToggleMenu(!toggleMenu)}>
            {!toggleMenu && (
                <Menu
                    className={cn(
                        "w-[40px] rounded-full h-[40px] px-[8px] py-[8px]",
                        `${
                            scrollY > 0
                                ? "border-[1px] border-[#E6E5E3]"
                                : "bg-[#F8D9DE]"
                        }`
                    )}
                />
            )}
                            {toggleMenu && (
                                <span>
                <CircleX className="w-[40px] rounded-full h-[40px]"/>{" "}
              </span>
                            )}
          </span>
                    </div>
                    <div
                        className={cn(
                            " w-full flex-grow-[1] bg-white px-[24px]",
                            `${toggleMenu ? "" : "hidden"}`
                        )}
                    >
                        <ul className="flex space-y-[40px] flex-col">
                            <li className="ml-auto mt-[40px]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleMenu(false);
                                        onAction();
                                    }}
                                    className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-[#d97f07]"
                                >
                                    Download App
                                </button>
                            </li>
                            <li className="hover:underline decoration-gray-300  ml-auto mr-[16px]">
                                <Link href="/faq">FAQs</Link>
                            </li>
                            <li className="hover:underline decoration-gray-300  ml-auto mr-[16px]">
                                <Link
                                    href="https://x.com/conducterng?t=LW4ISF3V7VAGQ_I7p7Pvdw&s=08 "
                                    className="flex items-center gap-2 group px-[16px] py-[16px]"
                                >
                                    <Image
                                        src="/images/x.svg"
                                        alt="social button for x"
                                        width={500}
                                        height={300}
                                        className={cn("w-[16px] h-auto")}
                                    />
                                    <span className="group-hover:underline">X.com</span>
                                </Link>
                            </li>
                            <li className="hover:underline decoration-gray-300  ml-auto mr-[16px]">
                                <Link
                                    href="https://www.instagram.com/conductornaija?utm_source=ig_web_button_share_sheet&igsh=Z29vNGxscjBlYXJ4
"
                                    className="flex items-center gap-2 group px-[16px] py-[16px]"
                                >
                                    <Image
                                        src="/images/insta.svg"
                                        alt="social button for insta"
                                        width={500}
                                        height={300}
                                        className={cn("w-[16px] h-auto")}
                                    />
                                    <span className="group-hover:underline">Instagram</span>
                                </Link>
                            </li>
                            <li className="hover:underline decoration-gray-300  ml-auto mr-[16px]">
                                <Link
                                    href="https://www.facebook.com/profile.php?id=61574617154383"
                                    className="flex items-center gap-2 group px-[16px] py-[16px]"
                                >
                                    <Image
                                        src="/images/facebook.svg"
                                        alt="social button for facebook"
                                        width={500}
                                        height={300}
                                        className={cn("w-[16px] h-auto")}
                                    />
                                    <span className="group-hover:underline">Facebook</span>
                                </Link>
                            </li>
                            <li className="hover:underline decoration-gray-300  ml-auto mr-[16px]">
                                <Link
                                    href="mailto:admin@conductor.ng"
                                    className="flex items-center gap-2 group px-[16px] py-[16px]"
                                >
                                    <Image
                                        src="/images/email.svg"
                                        alt="social button for email"
                                        width={500}
                                        height={300}
                                        className={cn("w-[16px] h-auto")}
                                    />
                                    <span className="group-hover:underline">Email</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default function DownloadPage({
                                          variant,
                                      }: {
    variant: CampaignVariant;
}) {
    const searchParams = useSearchParams();
    const [modal, setModal] = useState<ModalState>("idle");
    const [platform, setPlatform] = useState<'ios' | 'android'>("ios");
    const [referralCode, setReferralCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+234");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Referral persistence
    useEffect(() => {
        const ref = searchParams.get("ref");
        if (ref) {
            localStorage.setItem(CAMPAIGN_REFERRAL_STORAGE_KEY, ref);
            setReferralCode(ref);
        } else {
            const stored = localStorage.getItem(CAMPAIGN_REFERRAL_STORAGE_KEY);
            if (stored) setReferralCode(stored);
        }
    }, [searchParams]);

    useEffect(() => {
        if (referralCode)
            localStorage.setItem(CAMPAIGN_REFERRAL_STORAGE_KEY, referralCode);
    }, [referralCode]);

    const closeModal = useCallback(() => setModal("idle"), []);

    const onVerifyOtp = useCallback(async (otp: string) => verifyOTPNumber(otp), [])
    const onResendOtp = useCallback(() => resendOTPVerification(), [])
    const onSuccess = useCallback(() => completeAndNavigateToStore(variant, platform), [variant, platform])
    const onSubmit = useCallback(() => sendOTPVerification(phoneNumber, setIsLoading), [phoneNumber])

    const onDownloadImageClick = useCallback((p: 'ios' | 'android') => {
        setPlatform(p);
        setModal('signup');
    }, []);

    const otherVariant: CampaignVariant = variant === "driver" ? "passenger" : "driver";
    const currentHref = `/downloads/${variant}${referralCode.length === 0 ? '' : `?ref=${referralCode}`}`;
    const otherHref = `/downloads/${otherVariant}${referralCode.length === 0 ? '' : `?ref=${referralCode}`}`;
    const currentLabel = variant === "driver" ? "Car Owners" : "Passengers";
    const otherLabel = variant === "driver" ? "Passengers" : "Car Owners";

    return (
        <>
            <NavBar variant={variant} ref={referralCode} onAction={() => setModal("signup")}/>
            <div className={cn("min-h-screen bg-white mt-3", satoshi.className)}>

                <div className="max-w-[1120px] mx-auto md:w-[78%] px-6 md:px-0">

                    <section className="flex flex-col items-center w-full px-6 md:px-0 mb-4">
                        {/* Badge */}
                        <span
                            className={cn(roboto.className, "bg-secondary text-white text-base font-normal py-2 px-4 rounded-full mb-4")}>
                        {variant === 'passenger' ? "For Passengers" : "For Car Owners"}
                    </span>

                        {/* Header & Description */}
                        <div className="text-center max-w-2xl">
                            <h2 className="text-secondary text-2xl md:text-4xl font-bold mb-3">
                                Download Conductor.NG
                            </h2>
                            <p className="text-secondary font-light md:text-lg leading-relaxed">
                                Click the Links below that suits your device
                            </p>
                        </div>
                    </section>

                    <div className="flex flex-col md:flex-row gap-6">
                        <Image
                            onClick={() => onDownloadImageClick('android')}
                            src={`/images/download.${variant}.android.svg`}
                            className="aspect-video cursor-pointer"
                            width={1250}
                            height={900}
                            alt='android image'/>
                        <Image
                            onClick={() => onDownloadImageClick('ios')}
                            src={`/images/download.${variant}.ios.svg`}
                            className="aspect-video cursor-pointer"
                            width={1250}
                            height={900}
                            alt='ios image'/>
                    </div>
                    <div className="flex flex-col my-6">
                        <hr className="border-1 border-gray-400/20 mb-6"/>
                        <p className="text-center md:text-start mb-6">
                            {variant === 'passenger'
                                ? "Are you a passenger? swap to download passenger version"
                                : "Are you a car owner? swap to download car owner version"
                            }
                        </p>

                        <div className="flex flex-row gap-6">
                            <Button href={currentHref}
                                    className="grow border-2 border-black/10 rounded-full text-black">
                                {currentLabel}
                            </Button>
                            <Button href={otherHref}
                                    className="grow rounded-full bg-black text-white">
                                {otherLabel}
                            </Button>
                        </div>

                    </div>
                </div>

                {modal === "signup" && (
                    <SignupModal
                        variant={variant}
                        referralCode={referralCode}
                        phoneNumber={phoneNumber}
                        countryCode={countryCode}
                        onReferralChange={setReferralCode}
                        onPhoneChange={setPhoneNumber}
                        onCountryChange={setCountryCode}
                        isLoading={isLoading}
                        onSubmit={onSubmit}
                        onClose={closeModal}
                        onSuccess={onSuccess}
                        onVerifyOtp={onVerifyOtp}
                        onResendOtp={onResendOtp}
                        enableRefEdit={false}
                    />
                )}

                <div className="hidden md:flex">
                    <Footer variant={variant} ref={referralCode}/>
                </div>
            </div>
        </>
    );
}