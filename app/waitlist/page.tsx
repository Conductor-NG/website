"use client";
import React, { useEffect } from "react";
import Footer from "../components/footer/footer.component";

const Waitlist = () => {
  useEffect(() => {
    const page = document.querySelector("#waitlist-page") as HTMLElement;

    if (page) {
      const height = page.offsetHeight;

      const insertHeight = document.querySelector("#waitlist") as HTMLElement;
      if (insertHeight) {
        insertHeight.style.height = `${height + 400}px`;
      }
    }
  }, []);
  return (
    <>
      <div
        id="waitlist"
        className="text-center bg-black text-white md:min-h-[155vh] min-h-[213vh] w-[100vw] md:py-[230px] py-[160px] relative"
      >
        <div className="bg-[url(../public/images/ellipse_effect.svg)] w-[131%] h-[71%] absolute top-[20px] left-[-642px] rotate-[90deg] bg-no-repeat" />
        <div
          id="waitlist-page"
          className="w-[100%] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-10"
        >
          <div className="p-[30px]">
            <h1 className="max-w-[1334px] font-hilmar font-medium md:text-[80px] text-[40px] leading-[92px] mb-[60px] mx-[auto]">
              BE AMONG THE FIRST <br />
              TO EXPERIENCE T
              <span className="text-grad">HIS EXCITING JOURNEY</span>
            </h1>
          </div>
          <form>
            <div className="px-[30px] z-10">
              <div className="flex flex-col md:gap-[80px] gap-[40px] px-[30px] z-10">
                <div className="flex md:flex-row flex-col justify-around gap-y-[35px] gap-x-[5px] items-center">
                  <div className="max-w-[400px] w-[100%]">
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-[100%] inline-block !px-[12px]"
                    />
                  </div>
                  <div className="max-w-[400px] w-[100%]">
                    <input
                      type="email"
                      placeholder="Email address.."
                      className="inline-block w-[100%] !px-[12px]"
                    />
                  </div>
                </div>
                <div className="flex justify-around md:flex-row flex-col gap-y-[35px] gap-x-[5px] items-center">
                  <div className="max-w-[400px] w-[100%]">
                    <input
                      type="number"
                      placeholder="Phone number"
                      className="inline-block max-w-[400px] !px-[12px]"
                    />
                  </div>
                  <div className="max-w-[400px] w-[100%]">
                    <input
                      type="text"
                      placeholder="How did you hear about us"
                      className="inline-block max-w-[400px] !px-[12px]"
                    />
                  </div>
                </div>

                <div>
                  <button className="btn w-[161px] hover:scale-[1.1]">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Waitlist;
