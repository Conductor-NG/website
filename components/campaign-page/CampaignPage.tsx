"use client";

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {ArrowRight, ChevronDown, Loader, Play, X} from "lucide-react";

import {satoshi} from "@/app/fonts/satoshi";
import {cn} from "@/app/utils";
import {
    CampaignVariant,
    CAMPAIGN_LOCATIONS,
    CAMPAIGN_REFERRAL_STORAGE_KEY,
    CAMPAIGN_STORE_URLS,
    DISTANCE_MATRIX_GEMINI as DISTANCE_MATRIX,
    ISLAND_LOCATIONS,
    sendOTPVerification, completeAndNavigateToStore, resendOTPVerification, verifyOTPNumber
} from "@/lib/campaign";
import {Roboto} from "next/font/google";

// ─── Types ───────────────────────────────────────────────────────────────────

type FrequencyKey = "daily" | "weekly" | "monthly";
type TripType = "one-way" | "round-trip";
type Step = "phone" | "otp";
type ModalState = "idle" | "calculator" | "signup";

interface SignupModalProps {
    variant: CampaignVariant;
    referralCode: string;
    phoneNumber: string;
    countryCode: string;
    enableUserRefCode: boolean;
    onReferralChange: (v: string) => void;
    onPhoneChange: (v: string) => void;
    onCountryChange: (v: string) => void;
    /** Called when the user submits their phone number (sends OTP) */
    onPhoneNumberSubmit: () => Promise<void>;
    /** Called when the OTP is verified successfully */
    onOtpVerifySuccess: () => void;
    /** Verify the OTP – resolve on success, throw/reject on failure */
    onVerifyPhoneOtp: (otp: string) => Promise<void>;
    /** Resend OTP request */
    onResendPhoneOtp: () => Promise<void>;
    isLoading: boolean;
    onClose: () => void;
}

// ─── OTP_RESEND_SECONDS ───────────────────────────────────────────────────────

const OTP_RESEND_SECONDS = 60;
const OTP_LENGTH = 6;

// ─── Constants ───────────────────────────────────────────────────────────────

const FREQUENCIES = [
    {key: "daily", label: "Daily", multiplier: 1},
    {key: "weekly", label: "Weekly", multiplier: 5},
    {key: "monthly", label: "Monthly", multiplier: 20},
] as const;

const ASSETS = {
    illustrations: {
        driver: "/images/campaign.driver.coined.user.svg",
        passenger: "/images/campaign.passenger.car.user.svg",
    },
    modalHeader: "/images/campaign-modal-header-bg.svg",
    signupPanel: "/images/passenger-signup-panel.svg",
    signupPanelDriver: "/images/driver-signup-panel.svg",
    badges: {
        play: "/images/pg_playstore_download_button.svg",
        app: "/images/pg_appstore_download_button.svg",
    },
    qr: {
        play: "/images/pg_play_scan.svg",
        app: "/images/pg_app_scan.svg",
    },
    logo: "/images/conductor.svg",
} as const;

const COPY = {
    hero: {
        driver: {
            title: "Help Us Reach",
            highlight: "1,000",
            suffix: "Drivers",
            subtitle: "Join us in growing and earning easily",
            progress: 25,
        },
        passenger: {
            title: "We Are Currently",
            highlight: "Cooking",
            suffix: "",
            subtitle: "Learn more about us",
        },
    },
    calculator: {
        driver: {
            title: "Earnings Calculator",
            subtitle: "Enter your Route and see how much you can Earn",
            description: "Estimate what you can earn on your daily route",
            button: "Estimated Earning",
            modalTitle: "Unlock Your Daily Capital",
            modalDescription:
                "We've calculated your route. Turn your empty seats into a steady paycheck starting today.",
            modalEstimateLabel: "Estimated earning",
            modalCta: "Claim My Route",
        },
        passenger: {
            title: "Route Cost Calculator",
            subtitle: "Enter your Route and see how much it cost",
            description: "Estimate what you spend on your daily route",
            button: "Estimated Cost",
            modalTitle: "Ride safe, Spend less",
            modalDescription:
                "We've calculated your route. Turn your journey into a comfy ride",
            modalEstimateLabel: "Estimated Cost",
            modalCta: "Register",
        },
    },
    signup: {
        driver: {
            title: "Your Journey Starts Here",
            subtitle: "Sign Up to Ride",
            cta: "Continue & Download App",
        },
        passenger: {
            title: "Join in and enjoy",
            subtitle: "amazing trip",
            cta: "Register",
        },
    },
} as const;

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

type InfoProps = { head: string; links: { title: string; href: string }[] };

const info: InfoProps[] = [
    {
        head: "Company",
        links: [
            {title: "About Us", href: "/about"},
            {title: "Our Vision", href: "/vision"},
        ],
    },
    {
        head: "Support",
        links: [
            {title: "FAQs", href: "/faq"},
            {title: "Email Us!", href: "mailto:support@conductor.ng"},
        ],
    },
];

const socialLinks = [
    {href: "https://www.facebook.com/61574617154383/", icon: "facebook.svg", alt: "facebook"},
    {href: "https://x.com/conducterng", icon: "twitter-x-fill.svg", alt: "x"},
    {
        href: "https://www.instagram.com/conductornaija?igsh=MTQ1d3Z4cGRkZG41Yg==",
        icon: "instagram-fill.svg",
        alt: "instagram"
    },
    {href: "https://www.linkedin.com/company/conductor-nigeria/", icon: "linkedin-fill.svg", alt: "linkedin"},
    // {href: "#", icon: "tiktok-fill.svg", alt: "tiktok"},
];

// ─── Utilities ───────────────────────────────────────────────────────────────
function formatNaira(value: number) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        currencyDisplay: "narrowSymbol",
        trailingZeroDisplay: "stripIfInteger",
        notation: "compact",
    }).format(value);
}

// ─── OTP Step Component ───────────────────────────────────────────────────────

function OtpStep({
                     phoneNumber,
                     countryCode,
                     onVerifyOtp,
                     onResendOtp,
                     onSuccess,
                 }: {
    phoneNumber: string;
    countryCode: string;
    onVerifyOtp: (otp: string) => Promise<void>;
    onResendOtp: () => Promise<void>;
    onSuccess: () => void;
    isLoading: boolean;
}) {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [error, setError] = useState<string | null>(null);
    const [verifying, setVerifying] = useState(false);
    const [resending, setResending] = useState(false);
    const [countdown, setCountdown] = useState(OTP_RESEND_SECONDS);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(id);
    }, [countdown]);

    const focusInput = (index: number) => {
        inputRefs.current[index]?.focus();
    };

    const handleChange = (index: number, value: string) => {
        // allow only digits
        const digit = value.replace(/\D/g, "").slice(-1);
        const next = [...otp];
        next[index] = digit;
        setOtp(next);
        setError(null);
        if (digit && index < OTP_LENGTH - 1) focusInput(index + 1);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const next = [...otp];
                next[index] = "";
                setOtp(next);
            } else if (index > 0) {
                focusInput(index - 1);
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            focusInput(index - 1);
        } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            focusInput(index + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
        const next = [...otp];
        pasted.split("").forEach((ch, i) => {
            next[i] = ch;
        });
        setOtp(next);
        const lastFilled = Math.min(pasted.length, OTP_LENGTH - 1);
        focusInput(lastFilled);
    };

    const handleVerify = async () => {
        const code = otp.join("");
        if (code.length < OTP_LENGTH) {
            setError("Please enter the full 6-digit code.");
            return;
        }
        setError(null);
        setVerifying(true);
        try {
            await onVerifyOtp(code);
            onSuccess();
        }
            // eslint-disable-next-line
        catch (err: any) {
            setError(err?.message ?? "Invalid OTP. Please try again.");
            setOtp(Array(OTP_LENGTH).fill(""));
            focusInput(0);
        } finally {
            setVerifying(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0 || resending) return;
        setResending(true);
        setError(null);
        try {
            await onResendOtp();
            setCountdown(OTP_RESEND_SECONDS);
            setOtp(Array(OTP_LENGTH).fill(""));
            focusInput(0);
        }
            // eslint-disable-next-line
        catch (err: any) {
            setError(err?.message ?? "Failed to resend OTP. Please try again.");
        } finally {
            setResending(false);
        }
    };

    const maskedPhone = `${countryCode} ${"*".repeat(Math.max(0, phoneNumber.length - 4))}${phoneNumber.slice(-4)}`;

    // const inputClass =
    //     "w-full rounded-xl bg-[#efeeec] px-4 py-3 text-sm text-[#292928] outline-none placeholder:text-[#a09e9c]";

    return (
        <div className="space-y-4">
            <p className="text-xs text-[#676563]">
                A 6-digit code was sent to{" "}
                <span className="font-medium text-[#292928]">{maskedPhone}</span>
            </p>

            {/* OTP boxes */}
            <fieldset>
                <label className="text-xs text-[#676563]">Enter OTP</label>
                <div
                    className="mt-2 flex gap-2"
                    onPaste={handlePaste}
                >
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => {
                                inputRefs.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className={cn(
                                "h-12 w-full rounded-xl bg-[#efeeec] text-center text-base font-semibold text-[#292928] outline-none transition-all",
                                "focus:ring-2 focus:ring-[#292928]/20",
                                error ? "ring-2 ring-red-400" : ""
                            )}
                            autoFocus={i === 0}
                        />
                    ))}
                </div>
            </fieldset>

            {/* Error message */}
            {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">
                    {error}
                </p>
            )}

            {/* Verify button */}
            <PrimaryButton
                disabled={verifying || otp.join("").length < OTP_LENGTH}
                onClick={handleVerify}
                className="w-full flex place-items-center justify-center"
            >
                {verifying
                    ? <Loader className="h-4 w-4 animate-spin"/>
                    : "Verify & Continue"}
            </PrimaryButton>

            {/* Resend */}
            <div className="text-center">
                {countdown > 0 ? (
                    <p className="text-xs text-[#a09e9c]">
                        Resend code in{" "}
                        <span className="font-medium text-[#676563]">{countdown}s</span>
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="text-xs font-medium text-[#292928] underline underline-offset-2 disabled:opacity-50"
                    >
                        {resending ? "Resending…" : "Resend OTP"}
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Primitives ──────────────────────────────────────────────────────────────

export const Section = ({
                            className,
                            children,
                            as: Tag = "section",
                        }: {
    className?: string;
    children: React.ReactNode;
    as?: "section" | "div" | "nav";
}) => (
    <Tag className={cn("mx-auto w-full max-w-5xl px-6", className)}>
        {children}
    </Tag>
);

function Modal({
                   children,
                   onClose,
                   z = 300,
               }: {
    children: React.ReactNode;
    onClose: () => void;
    z?: number;
}) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
            style={{zIndex: z}}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {children}
        </div>
    );
}

function IconButton({
                        onClick,
                        label,
                        className,
                        children,
                    }: {
    onClick: () => void;
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={cn(
                "flex size-8 items-center justify-center rounded-full transition-colors",
                className,
            )}
        >
            {children}
        </button>
    );
}

function PrimaryButton({
                           onClick,
                           disabled,
                           className,
                           children,
                       }: {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "rounded-xl bg-primary px-6 py-3 text-sm text-white transition-colors hover:bg-[#d97f07] disabled:cursor-not-allowed disabled:opacity-60",
                className,
            )}
        >
            {children}
        </button>
    );
}

function SelectField({
                         value,
                         onChange,
                         placeholder,
                         type,
                     }: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    type: "from" | "to";
}) {
    const options = type === "from" ? CAMPAIGN_LOCATIONS : ISLAND_LOCATIONS;
    return (
        <div className="relative w-full">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none rounded-xl bg-[#efeeec] px-4 py-3 text-base text-[#292928] outline-none focus:ring-2 focus:ring-primary/40"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                        {loc.name}
                    </option>
                ))}
            </select>
            <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#676563]"/>
        </div>
    );
}

function ProgressBar({value}: { value: number }) {
    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#e6e5e3]">
            <div
                className="h-full rounded-full bg-tertiary transition-all duration-500"
                style={{width: `${value}%`}}
            />
        </div>
    );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

export function Navbar({
                           variant,
                           onAction,
                           ref
                       }: {
    variant: CampaignVariant;
    ref: string,
    onAction: () => void;
}) {
    const isDriver = variant === "driver";
    const otherVariant: CampaignVariant = variant === "driver" ? "passenger" : "driver";
    const href = `/campaign/${otherVariant}${ref.length === 0 ? '' : `?ref=${ref}`}`;
    const label = isDriver ? "Download App" : "Register";

    return (
        <nav className="w-full border-b border-[#aca9a6] bg-white">
            <Section as="div" className="flex items-center justify-between py-5">
                <Link href="/">
                    <Image
                        src={ASSETS.logo}
                        alt="Conductor"
                        width={50}
                        height={50}
                        className="w-[28px] h-[28px] md:w-[50px] md:h-[50px]"
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
                        {label}
                    </button>
                </div>
            </Section>
        </nav>
    );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function Footer({variant, ref}: { variant: CampaignVariant, ref: string }) {
    const currentYear = new Date().getFullYear();
    const otherVariant: CampaignVariant = variant === "driver" ? "passenger" : "driver";
    const href = `/campaign/${otherVariant}${ref.length === 0 ? '' : `?ref=${ref}`}`;


    return (
        <footer className="w-full text-white bg-[#0A0704]">
            <div className="max-w-[1120px] mx-auto md:w-[78%] px-6 md:px-0 pt-16 pb-10">
                <div className="flex flex-col md:flex-row justify-between pb-16 gap-y-12">

                    {/* Waitlist Section */}
                    <div className="flex flex-col items-start max-w-sm">
                        <a href={href}
                           className={cn(roboto.className, "text-tertiary bg-[#211e1c] text-sm py-2 px-4 rounded-full mb-8")}>
                            {variant === "driver" ? 'Support as a Passenger' : 'Onboard as a car owner'}
                        </a>
                        <h2 className="text-xl md:text-3xl font-medium mb-8 leading-tight">
                            Be among the first! <br/> Be Part of the Journey
                        </h2>
                        <div className="flex w-full h-[52px]">
                            <input
                                type="email"
                                placeholder="Enter your email here"
                                className="flex-1 bg-[#211e1c] placeholder:text-[#63605e] px-4 border border-white/10 outline-none focus:border-tertiary/50 transition-colors"
                            />
                            <button
                                className="w-14 flex justify-center items-center bg-[#f8d9de] text-black hover:bg-[#f2c5cc] transition-colors">
                                <ArrowRight size={20}/>
                            </button>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="flex gap-x-14 md:gap-x-20">
                        {info.map((item, index) => (
                            <div key={index}>
                                <h3 className="text-base font-medium mb-8 uppercase tracking-wider text-white/90">
                                    {item.head}
                                </h3>
                                <ul className="flex flex-col gap-y-6 text-[#ACA9A6] text-sm">
                                    {item.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link href={link.href} className="hover:text-white transition-colors">
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                    {/* Mobile-only links inside the first list to save space */}
                                    {index === 0 && (
                                        <>
                                            <li className="md:hidden"><Link href="/terms-and-conditions">Terms of
                                                Service</Link></li>
                                            <li className="md:hidden"><Link href="/privacy-policy">Privacy Policy</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-y-8">
                    <div className="flex items-center gap-x-8 w-full md:w-auto justify-between md:justify-start">
                        <Link href="/">
                            <Image src="/images/conductor.svg" alt="logo" width={50} height={52}
                                   className="w-[28px] h-[28px] md:w-[50px] md:h-[50px]"/>
                        </Link>
                        <div className="flex gap-x-5">
                            {socialLinks.map((social, i) => (
                                <Link key={i} href={social.href}
                                      className="opacity-70 hover:opacity-100 transition-opacity">
                                    <Image src={`/images/${social.icon}`} alt={social.alt} width={18} height={18}
                                           className="w-[18px] h-[18px]"/>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex gap-x-10 text-[#ACA9A6] text-sm font-light">
                        <Link href="/terms-and-conditions" className="underline decoration-white/20 hover:text-white">
                            Terms of service
                        </Link>
                        <Link href="/privacy-policy" className="underline decoration-white/20 hover:text-white">
                            Privacy policy
                        </Link>
                        <span>© {currentYear} Conductor.ng</span>
                    </div>

                    <span className="md:hidden text-xs text-[#ACA9A6]">© {currentYear} Conductor.ng</span>
                </div>
            </div>

            {/* Decorative Background Image */}
            <div className="relative w-screen">
                <Image
                    src="/images/footer_bg_logo.png"
                    alt=""
                    width={1064}
                    height={64}
                    className="object-cover object-top pointer-events-none w-screen h-40 brightness-150"
                    priority
                />
            </div>
        </footer>
    );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection({variant}: { variant: CampaignVariant }) {
    const isDriver = variant === "driver";
    const copy = COPY.hero[variant];

    // 1. Track if the user is in "active watching" mode
    const [isWatching, setIsWatching] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleStartWatching = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Restart for full context
            videoRef.current.muted = false;   // Unmute since user expressed intent
            videoRef.current.play();
            setIsWatching(true);
        }
    };

    const handleStopWatching = (e?: React.MouseEvent) => {
        // If e is present, prevent the click from bubbling (e.g., if we had links behind)
        e?.stopPropagation();

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.muted = true; // Re-mute for background feel
            setIsWatching(false);
        }
    };

    return (
        <Section className="pb-8 pt-10 md:pt-16">
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-[#302f2f] md:text-5xl">
                    {copy.title} <span className="text-primary">{copy.highlight}</span>{" "}
                    {copy.suffix}
                </h1>

                {isDriver ? (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-base text-[#676563]">
                            <span>{copy.subtitle}</span>
                            <span>{(copy as (typeof COPY)["hero"]["driver"]).progress}%</span>
                        </div>
                        <ProgressBar value={(copy as (typeof COPY)["hero"]["driver"]).progress}/>
                    </div>
                ) : (
                    <p className="text-base text-[#676563] md:text-3xl">{copy.subtitle}</p>
                )}
            </div>

            <div className="relative mt-8 group">
                <video
                    ref={videoRef}
                    src={variant === "driver" ? "/videos/DRIVER.mp4" : "/videos/PASSENGER.mp4"}
                    autoPlay
                    muted
                    loop
                    playsInline
                    // 2. Clicking the video itself stops playback and shows the button
                    onClick={isWatching ? () => handleStopWatching() : undefined}
                    className={`w-full rounded-2xl transition-all ${
                        isWatching ? "cursor-pointer" : "cursor-default"
                    }`}
                />

                {/* 3. The Pause/Close Overlay (Visible when watching) */}
                {isWatching && (
                    <button
                        onClick={handleStopWatching}
                        className="absolute top-4 right-4 z-10 size-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity opacity-100 md:opacity-0 group-hover:opacity-100 hover:bg-black/70"
                        aria-label="Stop video"
                    >
                        <X className="size-6"/>
                    </button>
                )}

                {/* 4. The "Watch" Overlay Button (Visible when NOT watching) */}
                {!isWatching && (
                    <button
                        onClick={handleStartWatching}
                        className="absolute bottom-4 left-0 rounded-br-[42px] rounded-tr-lg bg-[#f1ebe4] px-5 py-4 text-left shadow-sm transition-opacity hover:bg-[#eaddd0] md:bottom-6 md:w-60"
                    >
                        <p className="text-sm font-light text-[#302f2f]">
                            See How Conductor Works in Real Life
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-[#302f2f]">
                            <span>Watch video</span>
                            <span
                                className="flex size-4 items-center justify-center rounded-full border border-primary text-primary">
                <Play className="ml-px size-2 fill-primary stroke-primary"/>
              </span>
                        </div>
                    </button>
                )}
            </div>
        </Section>
    );
}

// ─── Calculator Section ──────────────────────────────────────────────────────

function CalculatorSection({
                               variant,
                               startLocation,
                               endLocation,
                               onStartChange,
                               onEndChange,
                               onCalculate,
                               canEstimate,
                           }: {
    variant: CampaignVariant;
    startLocation: string;
    endLocation: string;
    onStartChange: (v: string) => void;
    onEndChange: (v: string) => void;
    onCalculate: () => void;
    canEstimate: boolean;
}) {
    const copy = COPY.calculator[variant];

    return (
        <Section className="mt-16">
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
                <div className="w-full md:w-5/12">
                    <Image
                        src={ASSETS.illustrations[variant]}
                        alt=""
                        width={1060}
                        height={940}
                        className="h-auto w-full"
                    />
                </div>

                <div className="flex w-full flex-1 flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-[#292928]">
                            {copy.title}
                        </h2>
                        <p className="mt-2 hidden text-2xl font-bold text-[#292928] md:block">
                            {copy.subtitle}
                        </p>
                        <p className="mt-2 text-sm text-[#676563] md:text-lg">
                            {copy.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <SelectField
                            value={startLocation}
                            onChange={onStartChange}
                            placeholder="Select starting point route"
                            type="from"
                        />
                        <SelectField
                            value={endLocation}
                            onChange={onEndChange}
                            placeholder="Select destination route"
                            type="to"
                        />
                        <PrimaryButton
                            onClick={onCalculate}
                            disabled={!canEstimate}
                            className="w-fit self-center bg-[#d2a96b] hover:bg-[#c2995b] md:w-full"
                        >
                            {copy.button}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </Section>
    );
}

// ─── Store Footer ────────────────────────────────────────────────────────────

function StoreFooter({variant, showSignup}: { variant: CampaignVariant, showSignup: () => void }) {
    const urls = CAMPAIGN_STORE_URLS[variant];

    return (
        <section className="mt-20 bg-[#efeeec]">
            <Section className="flex flex-col items-center gap-10 py-12 md:flex-row md:items-start md:py-16">
                <div className="max-w-lg text-center md:text-left">
                    <h2 className="text-2xl text-[#292928] md:text-4xl">
                        Start Earning on Your Daily Commute
                    </h2>
                    <p className="mt-4 text-sm text-[#676563] md:text-base">
                        Download the conductor app and turn your regular route into income
                    </p>
                </div>

                {/* Desktop: QR + badges */}
                <div className="hidden items-center gap-10 md:flex">
                    {[
                        {qr: ASSETS.qr.play, badge: ASSETS.badges.play, alt: "Google Play", href: urls.android},
                        {qr: ASSETS.qr.app, badge: ASSETS.badges.app, alt: "App Store", href: urls.ios},
                    ].map((store) => (
                        <div key={store.alt} className="flex flex-col items-center gap-4">
                            <Image src={store.qr} alt="" width={164} height={164}/>
                            <div onClick={showSignup}>
                                <Image
                                    src={store.badge}
                                    alt={store.alt}
                                    width={120}
                                    height={40}
                                    className="transition-opacity hover:opacity-80"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: badges only */}
                <div className="flex items-center gap-4 md:hidden">
                    <Link href={urls.android || "#"}>
                        <Image src={ASSETS.badges.play} alt="Google Play" width={120} height={40}/>
                    </Link>
                    <Link href={urls.ios || "#"}>
                        <Image src={ASSETS.badges.app} alt="App Store" width={120} height={40}/>
                    </Link>
                </div>
            </Section>
        </section>
    );
}

// ─── Frequency Slider ────────────────────────────────────────────────────────

function FrequencySlider({
                             frequency,
                             onChange,
                         }: {
    frequency: FrequencyKey;
    onChange: (f: FrequencyKey) => void;
}) {
    const idx = FREQUENCIES.findIndex((f) => f.key === frequency);
    const pct = (idx / (FREQUENCIES.length - 1)) * 100;

    return (
        <div className="mt-6">
            <div className="relative flex h-10 items-center px-1">
                {/* Track background */}
                <div className="absolute inset-x-1 h-[3px] rounded-full bg-[#e6e5e3]"/>
                {/* Filled track */}
                <div
                    className="absolute left-1 h-[3px] rounded-full bg-[#db405a]"
                    style={{width: `calc(${pct}% - 4px)`}}
                />

                {/* Endpoint dots */}
                {FREQUENCIES.map((f, i) => {
                    const pos = (i / (FREQUENCIES.length - 1)) * 100;
                    const isActive = i <= idx;
                    return (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => onChange(f.key)}
                            className={cn(
                                "absolute size-3 rounded-full border-2 bg-white transition-colors",
                                isActive ? "border-[#db405a]" : "border-[#d1d0ce]",
                            )}
                            style={{left: `calc(${pos}% - 6px + 4px)`}}
                            aria-label={f.label}
                        />
                    );
                })}

                {/* Thumb */}
                <div
                    className="pointer-events-none absolute flex size-8 items-center justify-center rounded-full bg-[#1a1a1a] shadow-md transition-all duration-200"
                    style={{left: `calc(${pct}% - 16px + 4px)`}}
                >
                    <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        className="text-white"
                    >
                        <path
                            d="M5 1L1.5 5L5 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 1L12.5 5L9 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Invisible range input for drag interaction */}
                <input
                    type="range"
                    min={0}
                    max={FREQUENCIES.length - 1}
                    step={1}
                    value={idx}
                    onChange={(e) => onChange(FREQUENCIES[+e.target.value].key)}
                    className="absolute inset-0 w-full cursor-pointer opacity-0"
                    aria-label="Frequency"
                />
            </div>

            <div className="mt-3 flex justify-between text-xs">
                {FREQUENCIES.map((f) => (
                    <span
                        key={f.key}
                        className={
                            f.key === frequency
                                ? "font-semibold text-[#292928]"
                                : "text-[#676563]"
                        }
                    >
            {f.label}
          </span>
                ))}
            </div>
        </div>
    );
}

// ─── Calculator Modal ────────────────────────────────────────────────────────

function CalculatorModal({
                             variant,
                             estimate,
                             frequency,
                             tripType,
                             onTripTypeChange,
                             onFrequencyChange,
                             onClose,
                             onContinue,
                         }: {
    variant: CampaignVariant;
    estimate: number;
    frequency: FrequencyKey;
    tripType: TripType;
    onTripTypeChange: (t: TripType) => void,
    onFrequencyChange: (f: FrequencyKey) => void;
    onClose: () => void;
    onContinue: () => void;
}) {
    const copy = COPY.calculator[variant];

    return (
        <Modal onClose={onClose}>
            <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-black shadow-2xl sm:max-w-xl">
                {/* Header */}
                <div className="relative h-28 w-full sm:h-40 aspect-ratio">
                    <Image
                        src={ASSETS.modalHeader}
                        alt=""
                        fill
                        className="hidden rounded-t-3xl object-cover sm:block aspect-ratio"
                        priority
                    />
                    <div className="absolute left-6 top-6 max-w-md pr-12 text-white">
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-semibold sm:text-2xl">
                                    {copy.modalTitle}
                                </h3>
                                <p className="mt-2 text-xs text-white/80 sm:text-sm">
                                    {copy.modalDescription}
                                </p>
                            </div>
                            <div className="hidden w-20 sm:block"></div>
                        </div>
                    </div>
                    <IconButton
                        onClick={onClose}
                        label="Close"
                        className="absolute right-4 top-6 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                    >
                        <X className="size-4"/>
                    </IconButton>
                </div>

                {/* Body */}
                <div className="rounded-b-3xl rounded-t-3xl bg-white px-6 pb-8 pt-6 sm:rounded-t-none">

                    {/* --- Trip Type Toggle --- */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex rounded-full bg-[#F2F2F1] p-1.5 gap-3">
                            <button
                                onClick={() => onTripTypeChange('one-way')}
                                className={`rounded-full px-6 py-2 text-sm transition-all ${
                                    tripType === 'one-way'
                                        ? "bg-[#EE9113] text-white shadow-sm"
                                        : "text-[#676563] hover:text-[#393938]"
                                }`}
                            >
                                One way
                            </button>
                            <button
                                onClick={() => onTripTypeChange('round-trip')}
                                className={`rounded-full px-6 py-2 text-sm transition-all ${
                                    tripType === 'round-trip'
                                        ? "bg-[#EE9113] text-white shadow-sm"
                                        : "text-[#676563] hover:text-[#393938]"
                                }`}
                            >
                                Round Trip
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-sm text-[#676563]">
                        {copy.modalEstimateLabel}
                    </p>
                    <p className="mt-1 text-center text-4xl font-black text-[#393938]">
                        {formatNaira(estimate)}
                    </p>
                    <p className="text-center text-sm lowercase text-[#878583]">
                        {frequency}
                    </p>

                    <FrequencySlider
                        frequency={frequency}
                        onChange={onFrequencyChange}
                    />

                    <div className="mt-6 text-center">
                        <PrimaryButton onClick={onContinue}>
                            {copy.modalCta}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

// ─── Signup Modal ────────────────────────────────────────────────────────────


export function SignupModal({
                                variant,
                                referralCode,
                                phoneNumber,
                                countryCode,
                                onPhoneChange,
                                onCountryChange,
                                onPhoneNumberSubmit,
                                onOtpVerifySuccess,
                                onVerifyPhoneOtp,
                                onResendPhoneOtp,
                                isLoading,
                                onClose,
                                enableUserRefCode,
                            }: SignupModalProps) {
    const copy = COPY.signup[variant];
    const [step, setStep] = useState<Step>("phone");
    const [userRefCode, setUserRefCode] = useState<string>('');
    const [submitError, setSubmitError] = useState<string | null>(null);

    const inputClass =
        "w-full rounded-xl bg-[#efeeec] px-4 py-3 text-sm text-[#292928] outline-none placeholder:text-[#a09e9c]";

    const handlePhoneSubmit = async () => {
        setSubmitError(null);
        try {
            await onPhoneNumberSubmit();
            console.log({referralCode})
            setStep("otp");
        }
            // eslint-disable-next-line
        catch (err: any) {
            setSubmitError(err?.message ?? "Something went wrong. Please try again.");
        }
    };

    const phoneForm = (
        <div className="space-y-4">
            <fieldset>
                <label className="text-xs text-[#676563]">Phone number</label>
                <div className="mt-2 flex gap-2">
                    <div className="relative">
                        <select
                            value={countryCode}
                            onChange={(e) => onCountryChange(e.target.value)}
                            className="w-20 appearance-none rounded-xl bg-[#efeeec] px-3 py-3 text-xs text-[#292928] outline-none"
                        >
                            <option value="+234">+234</option>
                        </select>
                        <ChevronDown
                            className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 opacity-50"/>
                    </div>
                    <input
                        value={phoneNumber}
                        onChange={(e) => onPhoneChange(e.target.value)}
                        placeholder="Number"
                        className={cn(inputClass, "flex-1")}
                    />
                </div>
            </fieldset>

            {enableUserRefCode && (<fieldset>
                <label className="text-xs text-[#676563]">Referral Code</label>
                <input
                    value={userRefCode}
                    onChange={(e) => setUserRefCode(e.target.value)}
                    placeholder="Enter Referral code (Optional)"
                    className={cn(inputClass, "mt-2")}
                />
            </fieldset>)}

            {submitError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">
                    {submitError}
                </p>
            )}

            <div className="text-xs text-[0.6rem] text-[#666666] text-center">
                By creating an account, you confirm that you have read and agree to our <a href="/terms-and-conditions"
                                                                                           target='_blank'
                                                                                           className="font-black underline cursor-pointer">Terms
                & Conditions</a>.
            </div>

            <PrimaryButton
                disabled={isLoading}
                onClick={handlePhoneSubmit}
                className="w-full flex place-items-center justify-center"
            >
                {isLoading
                    ? <Loader className="h-4 w-4 animate-spin"/>
                    : copy.cta}
            </PrimaryButton>
        </div>
    );

    // ── passenger variant ──────────────────────────────────────────────────────
    if (variant === "passenger") {
        return (
            <Modal onClose={onClose} z={320}>
                <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-2xl">
                    <div className="flex flex-col md:flex-row">
                        {/* Form */}
                        <div className="flex-1 p-6 md:px-8">
                            <div className="hidden sm:block">
                                <p className="text-[#292928] text-3xl">{copy.title}</p>
                                <p className="text-[#292928] text-3xl">
                                    {step === "otp" ? "Verify your number" : copy.subtitle}
                                </p>
                            </div>
                            <div className="block sm:hidden text-2xl">
                                {copy.title}{" "}
                                {step === "otp" ? "Verify your number" : copy.subtitle}
                            </div>

                            <div className="mt-6">
                                {step === "phone" ? phoneForm : (
                                    <OtpStep
                                        phoneNumber={phoneNumber}
                                        countryCode={countryCode}
                                        onVerifyOtp={onVerifyPhoneOtp}
                                        onResendOtp={onResendPhoneOtp}
                                        onSuccess={onOtpVerifySuccess}
                                        isLoading={isLoading}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Side image */}
                        <div className="relative hidden w-full md:block md:w-3/6">
                            <Image
                                src={ASSETS.signupPanel}
                                alt=""
                                fill
                                className="rounded-bl-[3rem] object-center object-cover"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    // ── driver variant ─────────────────────────────────────────────────────────
    return (
        <Modal onClose={onClose} z={320}>
            <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-2xl">
                <div className="flex flex-col md:flex-row">
                    {/* Side image */}
                    <div className="relative hidden w-full md:block md:w-3/6">
                        <Image
                            src={ASSETS.signupPanelDriver}
                            alt=""
                            fill
                            className="rounded-br-[3rem] object-right object-cover"
                        />
                    </div>

                    {/* Form */}
                    <div className="flex-1 p-6 md:px-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-lg font-semibold text-[#292928] md:text-lg">
                                    {copy.title}
                                </p>
                                <p className="text-lg font-semibold text-[#292928] md:text-lg">
                                    {step === "otp" ? "Verify your number" : copy.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            {step === "phone" ? phoneForm : (
                                <OtpStep
                                    phoneNumber={phoneNumber}
                                    countryCode={countryCode}
                                    onVerifyOtp={onVerifyPhoneOtp}
                                    onResendOtp={onResendPhoneOtp}
                                    onSuccess={onOtpVerifySuccess}
                                    isLoading={isLoading}
                                />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </Modal>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function CampaignPage({
                                         variant,
                                     }: {
    variant: CampaignVariant;
}) {
    const isDriver = variant === "driver";
    const searchParams = useSearchParams();

    const [referralCode, setReferralCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+234");
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");
    const [frequency, setFrequency] = useState<FrequencyKey>("weekly");
    const [tripType, setTripType] = useState<TripType>("one-way");
    const [modal, setModal] = useState<ModalState>("idle");
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

    // Estimate calculation
    const baseEstimate = useMemo(() => {
        if (!startLocation || !endLocation) return 0;

        const lookupKey = `${startLocation}_${endLocation}`;
        const distance = DISTANCE_MATRIX[lookupKey];

        if (distance === undefined) {
            console.warn(`Distance not mapped for key: ${lookupKey}`);
            return 0;
        }

        const estimate = ((280 * distance) / 4) + (35 * distance)

        if (isDriver) {
            const estimatePassengers = 4;
            return estimate * estimatePassengers;
        }

        return estimate;
    }, [startLocation, endLocation, isDriver]);

    const estimate = useMemo(() => {

        const tripTypeMultiplier = tripType === "round-trip" ? 2 : 1;

        const mult =
            FREQUENCIES.find((f) => f.key === frequency)?.multiplier ?? 1;

        return baseEstimate * mult * tripTypeMultiplier;
    }, [baseEstimate, frequency, tripType]);

    const canEstimate = Boolean(startLocation && endLocation);

    const closeModal = useCallback(() => setModal("idle"), []);

    const onVerifyPhoneOtp = useCallback(async (otp: string) => verifyOTPNumber(otp), [])
    const onResendPhoneOtp = useCallback(() => resendOTPVerification(), [])
    const onOtpVerifySuccess = useCallback(() => completeAndNavigateToStore(variant), [variant])
    const onPhoneNumberSubmit = useCallback(() => sendOTPVerification(phoneNumber, setIsLoading), [phoneNumber])

    return (
        <>
            <div className={cn("min-h-screen bg-white", satoshi.className)}>
                <Navbar variant={variant} ref={referralCode} onAction={() => setModal("signup")}/>

                <HeroSection variant={variant}/>

                <CalculatorSection
                    variant={variant}
                    startLocation={startLocation}
                    endLocation={endLocation}
                    onStartChange={setStartLocation}
                    onEndChange={setEndLocation}
                    onCalculate={() => setModal("calculator")}
                    canEstimate={canEstimate}
                />

                <StoreFooter variant={variant} showSignup={() => setModal("signup")}/>

                {modal === "calculator" && (
                    <CalculatorModal
                        variant={variant}
                        estimate={estimate}
                        frequency={frequency}
                        onFrequencyChange={setFrequency}
                        tripType={tripType}
                        onTripTypeChange={setTripType}
                        onClose={closeModal}
                        onContinue={() => setModal("signup")}
                    />
                )}

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
                        onClose={closeModal}
                        onPhoneNumberSubmit={onPhoneNumberSubmit}
                        onOtpVerifySuccess={onOtpVerifySuccess}
                        onVerifyPhoneOtp={onVerifyPhoneOtp}
                        onResendPhoneOtp={onResendPhoneOtp}
                        enableUserRefCode={true}
                    />
                )}

                <Footer variant={variant} ref={referralCode}/>
            </div>
        </>
    );
}
