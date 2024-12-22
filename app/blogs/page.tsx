import React from "react";
import Footer from "../components/footer/footer.component";

const Blogs = () => {
  return (
    <>
      <div className="md:py-[272px] py-[140px] bg-[#FCF2E499] min-h-[100vh]">
        <h2 className="font-hilmar font-medium leading-[96px] text-center lg:text-[93px] text-[54px] text-[#EB9311]">
          Get our latest news
        </h2>
        <div className="md:text-[245px] text-[176px] md:h-[313px] h-[240px] text-center mb-[35px]">
          🤩
        </div>
        <h3 className="font-hilmar font-medium md:text-[80px] text-[30px] leading-[84px] text-center">
          STAY TUNED
        </h3>
        <p className="font-hilmar font-medium text-[30px] leading-[65px] text-center">
          Something is Cooking
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
