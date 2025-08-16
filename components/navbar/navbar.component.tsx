"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, CircleX } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

import "./navbar.styles.css";
import { cn } from "@/app/utils";
import { useState } from "react";
// import { store } from "@/lib/redux/store";
const NavBar = () => {
  const scrollY = useAppSelector((state) => state.onScrollSlice.value);
  const currentPage = useAppSelector((state) => state.onScrollSlice.page);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleContactUs, setToggleContactUs] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 right-0 z-[200]  min-h-[96px] py-[15px] ",
        `${scrollY > 0 ? "border-b-[1px] border-gray-300" : ""}`
      )}
    >
      {/* Desktop */}
      <ul className=" lg:flex hidden max-w-[1300px] items-center text-[16px] leading-[21px] font-medium text-black bg-white mx-[auto] h-[60px]">
        <li className="hover:scale-[1.1]">
          <Link href="/">
            <Image
              className="w-[78px] h-[40px]"
              src="/images/logo.svg"
              alt="Conductor logo"
              width={78}
              height={40}
              priority
            />
          </Link>
        </li>

        <li className="hover:underline decoration-gray-300  ml-auto mr-[16px]">
          <Link href="/">FAQs</Link>
        </li>
        <li
          className="hover:underline decoration-gray-300 mr-[16px] flex gap-1 items-end cursor-pointer"
          onClick={() => setToggleContactUs(!toggleContactUs)}
        >
          <span>Contact Us </span> <ChevronDown className="h-[16px]" />
        </li>
        <li>
          {currentPage === "driver" ? (
            <Link href="/">
              <button className="hover:rounded-none transition-all duration-300 bg-white  py-[12px] px-[16px] font-[500] rounded-[30px] border-[#E6E5E3] border-solid border-[1px] text-[16px] mr-[16px]">
                Conductor.ng for Passengers
              </button>
            </Link>
          ) : (
            <Link href="/driver">
              <button className="hover:rounded-none transition-all duration-300 bg-white  py-[12px] px-[16px] font-[500] rounded-[30px] border-[#E6E5E3] border-solid border-[1px] text-[16px] mr-[16px]">
                Conductor.ng for Car Owners
              </button>
            </Link>
          )}
        </li>
        <li>
          <Link href="/">
            <button className="hover:rounded-none transition-all duration-300 bg-tertiary bg-opacity-30 py-[12px] px-[24px] font-[700] rounded-[30px]">
              Register
            </button>
          </Link>
        </li>
      </ul>
      <div
        className={
          " max-w-[1300px] justify-end items-center text-[16px] leading-[21px] font-medium text-black gap-x-[16px] " +
          `${toggleContactUs ? "flex" : "hidden"}`
        }
      >
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
      </div>
      {/* Mobile */}
      <div
        className={cn(
          "md:hidden flex flex-col",
          `${toggleMenu ? "h-[100vh]" : ""}`
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
                className="md:w-[78px] w-[65px] md:h-[40px] h-[32px["
                src="/images/logo.svg"
                alt="Conductor logo"
                width={78}
                height={40}
                priority
              />
            </Link>
          </span>

          {scrollY === 0 ? (
            <span>
              <Link href="/driver">
                <button className="hover:rounded-none transition-all duration-300 bg-white  py-[12px] px-[16px] font-[500] rounded-[30px] border-[#E6E5E3] border-solid border-[1px] text-[14px]">
                  Conductor.ng for Car Owners
                </button>
              </Link>
            </span>
          ) : (
            <span>
              <Link href="#scan">
                <button className="hover:rounded-none transition-all duration-300 bg-primary  py-[8px] px-[33px] font-[500] rounded-[30px] border-[#E6E5E3] border-solid border-[1px] text-[14px]">
                  Download the App
                </button>
              </Link>
            </span>
          )}

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
                <CircleX className="w-[40px] rounded-full h-[40px]" />{" "}
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
              <Link href="/">
                <button className="hover:rounded-none transition-all duration-300 bg-tertiary bg-opacity-30 py-[12px] px-[24px] font-[700] rounded-[30px]">
                  Register
                </button>
              </Link>
            </li>
            <li className="hover:underline decoration-gray-300  ml-auto mr-[16px]">
              <Link href="/">FAQs</Link>
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
  );
};

export default NavBar;
