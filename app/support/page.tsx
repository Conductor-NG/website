import React from "react";
import Footer from "../components/footer/footer.component";

const Support = () => {
  return (
    <>
      <div className="bg-[#FCF2E499] min-h-[100vh]">
        <div className="text-black md:py-[253px] py-[140px] px-[30px] max-w-[1100px] mx-[auto] ">
          <h1 className="font-hilmar font-normal md:text-[64px] text-[40px] leading-[67px] mb-[16px]">
            FAQ
          </h1>
          <h2 className="font-medium md:text-[24px] text-[18px] leading-[33px] mb-[45px]">
            Frequently asked questions
          </h2>
          <div>
            <h3 className="font-medium leading-[33px] md:text-[24px] text-[18px] mb-[25px]">
              How does Conductor Work?
            </h3>
            <p className="font-light md:text-[24px] text-[18px] md:leading-[33px] leading-[29px] mb-[40px]">
              With Conductor, you can connect with drivers and fellow passengers
              easily: sign up, input your destination, and enjoy affordable
              shared rides.
            </p>
          </div>
          <div>
            <h3 className="font-medium leading-[33px] md:text-[24px] text-[18px] mb-[25px]">
              How do I earn on Conductor?
            </h3>
            <p className="font-light md:text-[24px] text-[18px] leading-[29px] mb-[40px]">
              With Conductor, easily earn weekly by setting your trip price and
              comparing competitive driver offers.
            </p>
          </div>
          <div>
            <h3 className="font-medium leading-[29px] md:text-[24px] text-[18px] mb-[25px]">
              Can I schedule rides?
            </h3>
            <p className="font-light md:text-[24px] text-[18px] leading-[29px] mb-[40px]">
              Yes. Book your rides for the week and receive real-time
              notifications before, during, and after your trip, ensuring a
              stress-free commute experience
            </p>
          </div>
          <div>
            <h2 className="md:text-[48px] text-[25px]">
              Still have questions?
            </h2>
            <h3 className="font-medium md:text-[24px] text-[18px] leading-[29px]">
              Reach out to us at support@conductor.ng
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Support;
