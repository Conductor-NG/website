import React from "react";
import Footer from "../components/footer/footer.component";

const About = () => {
  return (
    <>
      <div className="max-w-[100vw] w-[100vw] h-[981px] bg-[url('../public/images/hero_about.svg')] bg-no-repeat bg-cover bg-center pt-[431px] relative overflow-y-hidden min-h-[100vh]">
        <div className="absolute z-10 w-[100vw]">
          <h1 className="md:text-[148px] text-[59px] font-hilmar font-normal leading-[155px] text-center text-white">
            ABOUT US
          </h1>
          <p className="text-center text-white font-normal leading-[33px] max-w-[486px] mx-[auto] px-[10px]">
            Say goodbye to solo drives and hello to shared, sustainable
            journeys.
          </p>
        </div>
        <div className="bg-[url(../public/images/ellipse_effect.svg)] w-[100%] h-[1209px] absolute top-[270px]" />
      </div>
      <div className="md:pt-[180px] pt-[113px] bg-[#FCF2E499] md:pb-[200px] pb-[20px]">
        <div className="max-w-[823px] mb-[200px] px-[30px] text-justify">
          <h3 className="font-hilmar font-normal md:text-[48px] text-[40px] leading-[50.4px] text-[#E88D0E] mb-[40px]">
            About Us
          </h3>
          <p className="text-black md:text-[21px] text-[17px] md:leading-[48px] leading-[38px] font-normal">
            We are a team of innovators who have gained a reputation of
            delivering quality services by delivering time critical solutions to
            solve urban and rural problems, while continuously evolving to match
            the emerging digital and creative trend. We have a dedicated team of
            high-quality professionals who constantly work with diverse
            industrial players in varied sectors like cyber security, blockchain
            technology, health, agriculture, biometrics, education, banking,
            media, monitoring, retail, shipping, logistics etc.
          </p>
        </div>
        <div className="relative">
          <div className="max-w-[823px] mb-[200px] px-[30px] text-justify ">
            <h3 className="font-hilmar font-normal md:text-[48px] text-[40px] leading-[50.4px] text-[#E88D0E] mb-[40px]">
              Our Story
            </h3>
            <p className="text-black md:text-[21px] text-[17px] md:leading-[48px] leading-[38px] font-normal">
              Conductor started as an idea back in 2019 to help with the
              transportation challenges in Lagos Nigeria. Challenges with
              passenger and driver route planning, passenger and driver identity
              and security and also route optimization. As a it personel the use
              of Google maps for route optimization and traffic avoidance was
              easy for me, but the challenge of sharing this knowledge with
              other commuters. Work on the app finally begun in January of 24,
              after details of financial sustainance of the app and company as a
              whole was ironed out.
            </p>
            <div className="bg-[url(../public/images/cup.svg)] w-[280px] h-[300px] bg-no-repeat bg-contain bg-center absolute right-[-60px] bottom-[-200px]" />
          </div>
        </div>

        <div className="max-w-[823px] px-[30px] mb-[200px] text-justify">
          <h3 className="font-hilmar font-normal md:text-[48px] text-[40px] leading-[50.4px] text-[#E88D0E] mb-[40px]">
            Go green with Conductor
          </h3>
          <p className="text-black md:text-[21px] text-[17px] md:leading-[48px] leading-[38px] font-normal">
            At Conductor, we are committed to creating a sustainable ride
            experience that reduces carbon footprint. As part of our corporate
            social responsibility, we aim to reduce greenhouse gas emissions to
            carbon net zero by 2040, starting with Lagos, Nigeria 🇳🇬 as our
            flagship city in Africa.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
