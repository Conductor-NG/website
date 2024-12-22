"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logo } from "../../../public/images";
import { RxHamburgerMenu } from "react-icons/rx";
import "./navbar.styles.css";
const NavBar = () => {
  // add active to link that matches the page link and remove from those that don't
  const path = usePathname();
  useEffect(() => {
    const allLists = document.querySelectorAll("nav li");

    allLists.forEach((list) => {
      if (list.classList.contains(path)) {
        list.classList.add("active");
      } else if (list.classList.contains("active")) {
        list.classList.remove("active");
      }
    });
  }, [path]);

  // handle scroll
  // useEffect(() => {
  //   const navbar = document.querySelector("nav");

  //   const navbarMobile = document.querySelector("nav .mobile-toggle");

  //   window.addEventListener("scroll", function () {
  //     if (window.scrollY > 0) {
  //       if (window.innerWidth >= 1024) {
  //         // add scroll to desktop
  //         navbar?.classList.add("scroll");
  //       } else {
  //         navbarMobile?.classList.add("scroll");
  //       }
  //     } else {
  //       if (window.innerWidth >= 1024) {
  //         navbar?.classList.remove("scroll");
  //       } else {
  //         navbarMobile?.classList.remove("scroll");
  //       }
  //     }
  //   });
  // }, []);

  // scroll up menu items on mobile view on page navigation
  useEffect(() => {
    document.querySelector(".mobile-items")?.classList.remove("dropdown");
  }, [path]);
  // change active link in the navbar

  const handleMobileToggle = () => {
    document.querySelector(".mobile-items")?.classList.toggle("dropdown");
  };
  return (
    <nav className="lg:h-[150px] h-[60px] fixed top-0 left-0 right-0 z-[100]">
      {/* Desktop */}
      <ul className=" lg:flex hidden max-w-[1000px] justify-between items-center gap-[66px] text-[14px] leading-[21px] font-normal mt-[15px] mb-[15px] text-black rounded-[60px] bg-white mx-[auto] px-[30px] h-[73px]">
        <li className="/ hover:scale-[1.1]">
          <Link href="/">Home</Link>
        </li>
        <li className="/about hover:scale-[1.1]">
          <Link href="/about">About Us</Link>
        </li>
        <li className="/blogs hover:scale-[1.1]">
          <Link href="/blogs">Blogs</Link>
        </li>
        <li className="hover:scale-[1.1]">
          <Link href="/">
            <Image
              className="w-[78px] h-[40px]"
              src={logo}
              alt="Conductor logo"
              width={78}
              height={40}
              priority
            />
          </Link>
        </li>
        <li className="/support hover:scale-[1.1]">
          <Link href="/support">Support</Link>
        </li>
        <li className="/contact hover:scale-[1.1]">
          <Link href="/contact">Contact Us</Link>
        </li>
        <li className="/waitlist hover:scale-[1.1]">
          <Link href="/waitlist">
            <button className="btn">Join the waitlist</button>
          </Link>
        </li>
      </ul>
      {/* Mobile */}
      <div className="lg:hidden flex mobile-toggle w-[100vw]  justify-between items-center px-[30px]  py-[5px]">
        <Link href="/">
          <Image
            className="hover:scale-[1.1] w-[78px] h-[40px]"
            src={logo}
            alt="Conductor logo"
            width={78}
            height={40}
            priority
          />
        </Link>
        <RxHamburgerMenu
          className="hover:scale-[1.1] text-[#F4B333] text-[50px]"
          onClick={handleMobileToggle}
        />
      </div>
      <div className="lg:hidden block mobile-items">
        <ul className="mobile-list">
          <li className="/ hover:scale-[1.1] text-white">
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
          <li className="/about hover:scale-[1.1]">
            <Link href="/about" className="text-white">
              About Us
            </Link>
          </li>
          <li className="/blogs hover:scale-[1.1]">
            <Link href="/blogs" className="text-white">
              Blogs
            </Link>
          </li>
          <li className="/support hover:scale-[1.1]">
            <Link href="/support" className="text-white">
              Support
            </Link>
          </li>
          <li className="/contact hover:scale-[1.1]">
            <Link href="/contact" className="text-white">
              Contact Us
            </Link>
          </li>
          <li className="/waitlist hover:scale-[1.1]">
            <Link href="/waitlist">
              <button className="btn">Join the waitlist</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
