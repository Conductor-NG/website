"use client";

import React, {useCallback, useEffect, useMemo, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {ChevronDown, Play, X} from "lucide-react";

import {satoshi} from "@/app/fonts/satoshi";
import {cn} from "@/app/utils";
import {
    CAMPAIGN_LOCATIONS,
    CAMPAIGN_REFERRAL_STORAGE_KEY,
    CAMPAIGN_STORE_URLS,
    CampaignVariant,
    ISLAND_LOCATIONS,
} from "@/lib/campaign";

// ─── Types ───────────────────────────────────────────────────────────────────

type FrequencyKey = "daily" | "weekly" | "monthly";
type ModalState = "idle" | "calculator" | "signup";

// ─── Constants ───────────────────────────────────────────────────────────────

const FREQUENCIES = [
    {key: "daily", label: "Daily", multiplier: 1},
    {key: "weekly", label: "Weekly", multiplier: 3},
    {key: "monthly", label: "Monthly", multiplier: 12},
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
            progress: 3,
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
            button: "Estimated Earning",
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

// ─── Utilities ───────────────────────────────────────────────────────────────

function detectPlatform(): "ios" | "android" | "web" {
    if (typeof window === "undefined") return "web";
    const ua = navigator.userAgent || navigator.vendor;
    if (/android/i.test(ua)) return "android";
    if (/iPad|iPhone|iPod/i.test(ua) || /Mac/i.test(navigator.platform))
        return "ios";
    return "web";
}

function formatNaira(value: number) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        currencyDisplay: "narrowSymbol",
        trailingZeroDisplay: "stripIfInteger",
        notation: "compact",
    }).format(value);
}

// ─── Primitives ──────────────────────────────────────────────────────────────

const Section = ({
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

function Navbar({
                    variant,
                    onAction,
                }: {
    variant: CampaignVariant;
    onAction: () => void;
}) {
    const isDriver = variant === "driver";
    const label = isDriver ? "Download App" : "Register";

    return (
        <nav className="w-full border-b border-[#aca9a6] bg-white">
            <Section as="div" className="flex items-center justify-between py-5">
                <Link href="/">
                    <Image
                        src={ASSETS.logo}
                        alt="Conductor"
                        width={30}
                        height={30}
                        className="size-7"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-2">
                    {isDriver && (
                        <Link
                            href="/campaign/passenger"
                            className="hidden rounded-full border border-[#e6e5e3] px-4 py-2 text-sm font-semibold text-primary hover:border-[#d7d5d2] md:inline-flex"
                        >
                            For Passenger
                        </Link>
                    )}
                    <button
                        type="button"
                        onClick={onAction}
                        className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-[#2e1c03] hover:bg-[#d97f07]"
                    >
                        {label}
                    </button>
                </div>
            </Section>
        </nav>
    );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection({variant}: { variant: CampaignVariant }) {
    const isDriver = variant === "driver";
    const copy = COPY.hero[variant];

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
                            <span>
                {(copy as (typeof COPY)["hero"]["driver"]).progress}%
              </span>
                        </div>
                        <ProgressBar
                            value={(copy as (typeof COPY)["hero"]["driver"]).progress}
                        />
                    </div>
                ) : (
                    <p className="text-base text-[#676563] md:text-3xl">
                        {copy.subtitle}
                    </p>
                )}
            </div>

            <div className="relative mt-8">
                <video
                    src="/videos/hero_desktop.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hidden w-full rounded-3xl md:block"
                />
                <video
                    src="/videos/hero_mobile.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full rounded-2xl md:hidden"
                />

                <div
                    className="absolute bottom-4 rounded-br-[42px] rounded-tr-lg bg-[#f1ebe4] px-5 py-4 shadow-sm md:bottom-6 md:left-0 md:w-60">
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
                </div>
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

function StoreFooter({variant}: { variant: CampaignVariant }) {
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
                            <Link href={store.href || "#"}>
                                <Image
                                    src={store.badge}
                                    alt={store.alt}
                                    width={120}
                                    height={40}
                                    className="transition-opacity hover:opacity-80"
                                />
                            </Link>
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
                             onFrequencyChange,
                             onClose,
                             onContinue,
                         }: {
    variant: CampaignVariant;
    estimate: number;
    frequency: FrequencyKey;
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
                    <p className="text-center text-sm text-[#676563]">
                        {copy.modalEstimateLabel}
                    </p>
                    <p className="mt-1 text-center text-4xl font-semibold text-[#292928]">
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

function SignupModal({
                         variant,
                         referralCode,
                         phoneNumber,
                         countryCode,
                         onReferralChange,
                         onPhoneChange,
                         onCountryChange,
                         onSubmit,
                         onClose,
                     }: {
    variant: CampaignVariant;
    referralCode: string;
    phoneNumber: string;
    countryCode: string;
    onReferralChange: (v: string) => void;
    onPhoneChange: (v: string) => void;
    onCountryChange: (v: string) => void;
    onSubmit: () => void;
    onClose: () => void;
}) {
    const copy = COPY.signup[variant];
    const inputClass =
        "w-full rounded-xl bg-[#efeeec] px-4 py-3 text-sm text-[#292928] outline-none placeholder:text-[#a09e9c]";


    if (variant === "passenger") {
        return (
            <Modal onClose={onClose} z={320}>
                <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-xl">
                    <div className="flex flex-col md:flex-row">
                        {/* Form */}
                        <div className="flex-1 p-6 md:px-8">
                            <div className="hidden sm:block">
                                <p className="text-[#292928] text-3xl">
                                    {copy.title}
                                </p>
                                <p className="text-[#292928] text-3xl">
                                    {copy.subtitle}
                                </p>
                            </div>

                            <div className="block sm:hidden text-2xl">
                                {copy.title} {copy.subtitle}
                            </div>

                            <div className="mt-6 space-y-4">
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
                                                <option value="+1">+1</option>
                                                <option value="+44">+44</option>
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

                                <fieldset>
                                    <label className="text-xs text-[#676563]">Referral Code</label>
                                    <input
                                        value={referralCode}
                                        onChange={(e) => onReferralChange(e.target.value)}
                                        placeholder="Enter Referral code (Optional)"
                                        className={cn(inputClass, "mt-2")}
                                    />
                                </fieldset>

                                <PrimaryButton onClick={onSubmit} className="w-full">
                                    {copy.cta}
                                </PrimaryButton>
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

    return (
        <Modal onClose={onClose} z={320}>
            <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-xl">
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
                                    {copy.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
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
                                            <option value="+1">+1</option>
                                            <option value="+44">+44</option>
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

                            <fieldset>
                                <label className="text-xs text-[#676563]">Referral Code</label>
                                <input
                                    value={referralCode}
                                    onChange={(e) => onReferralChange(e.target.value)}
                                    placeholder="Enter Referral code (Optional)"
                                    className={cn(inputClass, "mt-2")}
                                />
                            </fieldset>

                            <PrimaryButton onClick={onSubmit} className="w-full">
                                {copy.cta}
                            </PrimaryButton>
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
    const [modal, setModal] = useState<ModalState>("idle");

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
        const distance =
            Math.abs(Number(startLocation) - Number(endLocation)) * 4 + 6;
        return distance * (isDriver ? 2000 : 1200);
    }, [startLocation, endLocation, isDriver]);

    const estimate = useMemo(() => {
        const mult =
            FREQUENCIES.find((f) => f.key === frequency)?.multiplier ?? 1;
        return baseEstimate * mult;
    }, [baseEstimate, frequency]);

    const canEstimate = Boolean(startLocation && endLocation);

    const handleRegister = useCallback(() => {
        const platform = detectPlatform();
        const urls = CAMPAIGN_STORE_URLS[variant];
        window.location.href = platform === "ios" ? urls.ios : urls.android;
    }, [variant]);

    const closeModal = useCallback(() => setModal("idle"), []);

    return (
        <div className={cn("min-h-screen bg-white", satoshi.className)}>
            <Navbar variant={variant} onAction={() => setModal("signup")}/>

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

            <StoreFooter variant={variant}/>

            {modal === "calculator" && (
                <CalculatorModal
                    variant={variant}
                    estimate={estimate}
                    frequency={frequency}
                    onFrequencyChange={setFrequency}
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
                    onSubmit={handleRegister}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}