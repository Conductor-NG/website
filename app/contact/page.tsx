import Image from "next/image";
import React from "react";

import { driver_pic } from "@/public/images";
import Footer from "../components/footer/footer.component";

const Page = () => {
  return (
    <>
      {/* Submit info section */}
      <section
        id="info_submit"
        className="bg-[#FCF2E499] pt-[225px] pb-[100px] md:px-[30px]  px-[15px] min-h-[100vh]"
      >
        <div className="max-w-[1100px] mx-[auto] flex md:flex-row flex-col justify-between items-center pb-[50px]">
          <div>
            <h3 className="w-[338px] font-hilmar font-medium md:text-[36px] text-[27px] md:text-left text-center leading-[37px] text-[#EA9212] md:mb-4 mb-[40px]">
              We would love to hear from you.
            </h3>
            <Image
              className="md:block hidden h-[380px] lg:max-w-[529px] md:max-w-[470px]"
              src={driver_pic}
              alt="number 4"
              width={380}
              height={529}
              priority
            />
          </div>
          <form className="lg:w-[493px] md:w-[340px] pl-[15px]">
            <div className="mb-[15px]">
              <label
                htmlFor="name"
                className="block font-hilmar font-normal text-[20px] leading-[22.4px] text-[#EA9212]"
              >
                Full name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter full name here"
                className="block grad w-[100%] h-[52px] rounded-[8px] pl-[10px]"
              />
            </div>
            <div className="mb-[15px]">
              <label
                htmlFor="email"
                className="block font-hilmar font-normal text-[20px] leading-[22.4px] text-[#EA9212]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email here"
                className="block grad w-[100%] h-[52px] rounded-[8px] pl-[10px]"
              />
            </div>
            <div className="mb-[20px]">
              <label
                htmlFor="message"
                className="block font-hilmar font-normal text-[20px] leading-[22.4px] text-[#EA9212]"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Your text here"
                className="block grad w-[100%] h-[119px] rounded-[8px] pl-[10px] pt-3"
              ></textarea>
            </div>
            <div>
              <button className="hover:scale-[1.1] bg-[#EA9212] text-black min-w-[246px] h-[45px] rounded-[100px]">
                Contact Us
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
