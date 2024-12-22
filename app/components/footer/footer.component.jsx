import React from "react";
import { google_play, apple_store, vehicle } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const dt = new Date();
  return (
    <footer className="">
      <div className="bg-white">
        <div className="md:px-[30px]  px-[15px] max-w-[1100px] md:pt-[200px] pt-[90px] md:pb-[50px] pb-[100px] flex md:flex-row flex-col justify-between mx-[auto] md:items-start items-center">
          {/* First column */}

          <div className="flex md:flex-col justify-between gap-[40px]">
            <div>
              <div>
                <Image
                  className="h-[77px] max-w-[150px]"
                  src={vehicle}
                  alt="vehicle icon"
                  width={150}
                  height={77}
                  priority
                />
              </div>
              <div className="mt-[20px]">
                <p className="font-normal text-[13px] leading-[21px] w-[212px] text-black">
                  Making travel a breeze, and doing our part for the planet.
                </p>
              </div>
            </div>
            <div className="flex md:flex-row flex-col justify-evenly">
              <Image
                className="hover:scale-[1.1] cursor-pointer h-[50px] max-w-[167px] md:ml-[-40px]"
                src={apple_store}
                alt="apple store icon"
                width={167}
                height={50}
                priority
              />
              <Image
                className="hover:scale-[1.1] cursor-pointer h-[50px] max-w-[167px]"
                src={google_play}
                alt="google play icon"
                width={167}
                height={50}
                priority
              />
            </div>
          </div>
          {/* Second column */}
          <ul className="text-black font-normal text-[18px] leading-[29px] md:mt-0 mt-[50px] ">
            <li className="hover:scale-[1.1] cursor-pointer mb-[10px]">
              <Link href="/about">About us</Link>
            </li>
            <li className="hover:scale-[1.1] cursor-pointer mb-[10px]">
              <Link href="/blogs">Blogs</Link>
            </li>
            <li className="hover:scale-[1.1] cursor-pointer mb-[10px]">
              <Link href="/support">Support</Link>
            </li>
          </ul>
          {/* Third column */}
          <div className="w-[339px] flex flex-col-reverse justify-between min-h-[229px] md:mt-0 mt-[20px]">
            <div className="flex justify-between text-[40px] md:order-2 order-3">
              <FaFacebookSquare className="hover:scale-[1.1] cursor-pointer text-black text-[40px]" />
              <FaXTwitter className="hover:scale-[1.1] cursor-pointer text-black text-[40px]" />
              <FaLinkedin className="hover:scale-[1.1] cursor-pointer text-black text-[40px]" />
              <RiInstagramFill className="hover:scale-[1.1] cursor-pointer text-black text-[40px]" />
            </div>
            <div>
              <h3 className="font-normal text-[24px] leading-[36px] text-black mb-[10px]">
                Subscribe to our Newsletter
              </h3>
              <div className="relative">
                <input type="text" placeholder="Enter email here" />
                <button className="hover:scale-[1.1] absolute top-[7px] right-[7px] w-[130px] px-[24px] py-[16px] h-[58px] bg-[#E88D0E] text-black font-medium text-[16px] leading-[24px]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--secondary-color)] md:h-[100px]  h-[100%]">
          <div className="md:px-[30px]  px-[15px] flex md:flex-row flex-col md:gap-[250px] gap-[30px] md:justify-center justify-start pt-[20px] font-hilmar font-semibold text-[16px] text-center leading-[17px] tracking-[3px]">
            <p>&copy;CONDUCTOR. All Rights Reserved. {dt.getFullYear()}</p>
            <ul className="flex md:flex-row flex-col gap-[30px] md:mb-0 mb-[15px]">
              <li>TERMS&CONDITIONS</li>
              <li>PRIVACY</li>
              <li>POLICY</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
