"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { FaArrowRight } from "react-icons/fa6";
import { cn } from "./utils";
import {
  frame1,
  phone,
  num1,
  num2,
  num3,
  num4,
  driver_pic,
  // driver,
  save,
  save_2,
  happy,
  leaf,
  community,
  happy_2,
  leaf_2,
  community_2,
  // curved_line,
  car,
  vehicle_background,
} from "../public/images";
import Footer from "./components/footer/footer.component";

const Home: React.FC = () => {
  const [cardHovered1, setCardHovered1] = useState(false);
  const [cardHovered2, setCardHovered2] = useState(false);
  const [cardHovered3, setCardHovered3] = useState(false);
  const [cardHovered4, setCardHovered4] = useState(false);

  // detect when a section is the focus
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", function () {
      sections.forEach((sec) => {
        const top = window.scrollY;
        const offsetTop = sec.offsetTop - 100;
        const height = sec.offsetHeight;

        if (top >= offsetTop && top < offsetTop + height) {
          sec.classList.add("active-section");
        } else {
          sec.classList.remove("active-section");
        }
      });
    });
  }, []);

  // detect when car anime the focus
  useEffect(() => {
    const hero_section = document.querySelectorAll("section")[0];

    const anime_div = document.querySelector("#car_anime") as HTMLElement;

    const car = document.querySelector("#car") as HTMLElement;

    window.addEventListener("scroll", function () {
      const top = window.scrollY;
      // const offsetTopForCar = car.offsetTop - 100;
      const offsetBottom = hero_section.offsetHeight;
      const offsetTop = anime_div.offsetTop - offsetBottom;

      if (top >= offsetTop && top < offsetBottom) {
        car.classList.add("enter");
      }
    });
  }, []);

  useEffect(() => {
    // const how_to_section = document.querySelectorAll("section")[0];

    const how_to_section = document.querySelector("#how_to") as HTMLElement;

    window.addEventListener("scroll", function () {
      const top = window.scrollY;
      const offsetTop = how_to_section.offsetTop - 150;

      if (top >= offsetTop) {
        how_to_section.classList.add("display");
      }
    });
  }, []);

  //handle card hover by changing inner card properties controlled by setstate
  const handleHoverElement = (b: boolean, cardId: string) => {
    switch (cardId) {
      case "card_1":
        if (b) {
          setCardHovered1(true);
        } else {
          setCardHovered1(false);
        }
        break;
      case "card_2":
        if (b) {
          setCardHovered2(true);
        } else {
          setCardHovered2(false);
        }
        break;
      case "card_3":
        if (b) {
          setCardHovered3(true);
        } else {
          setCardHovered3(false);
        }
        break;
      case "card_4":
        if (b) {
          setCardHovered4(true);
        } else {
          setCardHovered4(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Hero Section  */}
      {/* <section
        id="hero"
        className=" hero min-h-[94vh] bg-[#FCF2E499] md:pb-[200px] pb-[95px]"
      > */}
      {/* for curvy line */}
      {/* <Image
          className="md:block hidden h-[24px] max-w-[156px] rotate-[-30deg] translate-x-[-42%] lg:translate-y-[116vh] md:translate-y-[158vh]"
          src={curved_line}
          alt=""
          width={156}
          height={24}
          priority
        /> */}
      {/* <div className="xl:px-0 md:px-[30px]  px-[15px] lg:pt-[256px] pt-[150px] flex  max-w-[1200px] mx-[auto] lg:flex-row flex-col lg:justify-between items-center gap-[50px] lg:gap-0">
          <div className="self-start">
            <h2 className="text-black font-hilmar font-semibold md:text-[64px] sm:text-[60px] text-[39px] md:leading-[77px] leading-[66px] md:w-[446px] w-[353px] flex flex-col relative">
              <span>Ride together</span>
              <span className="z-10">Share together</span>
              <span className="bg-[var(--secondary-color)] md:w-[96%] w-[74%] md:h-[55px] h-[41px] absolute left-0 md:bottom-[6px] bottom-[10px] z-0"></span>
            </h2>
            <p className="text-black md:w-[506px] w-[100%] md:leading-[41.4px] leading-[38.4px] md:text-[20px] text-[17px] md:text-left text-justify font-normal">
              We&apos;re all about sharing rides – cutting costs, making travel
              a breeze, and doing our part for the planet.
            </p>
            <button className="hover:scale-[1.1] h-[48px] rounded-[8px] flex justify-between items-center bg-[#DB405A] text-white py-[12px] px-[16px] text-[16px] leading-[24px] font-medium md:mt-[15px] mt-[12px]">
              Get started <FaArrowRight className="ml-[5px]" />
            </button>
          </div>
          <div className="relative self-end">
            <Image
              className="h-[373px] max-w-[487px]"
              src={driver}
              alt="driver image"
              width={487}
              height={373}
              priority
            />
            <Image
              className="h-[24px] max-w-[156px] absolute md:top-0 top-[44px] right-0 mr-[-60px] rotate-[9.36deg]"
              src={curved_line}
              alt=""
              width={156}
              height={24}
              priority
            />
          </div>
        </div> */}
      {/* </section> */}
      {/* End of the old hero section */}

      {/* car anime header */}
      <section id="hero" className=" hero min-h-[60vh] bg-[#fff]">
        <h1 className="max-w-[1100px] font-hilmar font-medium md:text-[115px] text-[50px] md:leading-[150px] leading-[75px] text-center pt-[100px] mx-[auto]">
          RIDE <span className="text-[#E88D0E]">TOGETHER</span> SHARE TOGETHER
        </h1>
        <h2 className="md:font-medium font-normal md:text-[20px] text-[16px] md:leading-[38px] leading-[25px] text-center md:max-w-[548px] max-w-[80vw] mx-[auto] mb-[50px]">
          We&apos;re all about sharing rides – cutting costs, making travel a
          breeze, and doing our part for the planet.
        </h2>
        <div className="flex md:flex-row flex-col md:justify-around items-center md:gap-x-[10px] gap-y-[30px] lg:max-w-[1100px] max-w-[50%] mx-[auto] my-[15px] md:pb-[10px] pb-[20px]">
          <div className="max-w-[350px] w-[100%]">
            <input
              type="text"
              className="hero_input md:w-[315px] !px-[15px] !h-[46px] !text-black"
              placeholder="Email address.."
            />
          </div>
          <div>
            <Link href="/waitlist">
              <button className="btn hover:scale-[1.1] lg:w-[255px] w-[100%]">
                Join the waitlist
              </button>
            </Link>
          </div>
        </div>
        {/* vehicle */}
        <div id="car_anime" className="mt-[50px] relative">
          <Image
            className="max-h-[252px] md:max-w-[768px] max-w-[80vw] mx-[auto]"
            src={vehicle_background}
            alt="vehicle's background"
            width={768}
            height={252}
            priority
          />
          <Image
            id="car"
            className="absolute bottom-[5px] max-h-[174px] md:max-w-[481px] max-w-[80vw] mx-[auto] left-[-130vw]"
            src={car}
            alt="vehicle image"
            width={481}
            height={174}
            priority
          />
        </div>
      </section>

      {/* carousel text */}
      <div
        className="bg-[#2E1C03
] h-[37px]"
      >
        <p className="font-hilmar font-medium text-[16px] leading-[18px] py-[1rem] text-white bg-[#2E1C03] h-[37px] text-justify">
          <span className="animate-moving_text  block h-[37px] whitespace-nowrap">
            RIDE TOGETHER <span className="p-[1px] mr-[10px]"></span> SHARE
            TOGETHER <span className="p-[1px] mr-[10px]"></span>RIDE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>SHARE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>RIDE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>SHARE TOGETHER
            <span className="p-[1px] mr-[10px]"></span>
            RIDE TOGETHER <span className="p-[1px] mr-[10px]"></span>SHARE
            TOGETHER <span className="p-[1px] mr-[10px]"></span>RIDE TOGETHER
            <span className="p-[1px] mr-[10px]"></span> SHARE TOGETHER
            <span className="p-[1px] mr-[10px]"></span> RIDE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>SHARE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>RIDE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>SHARE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>RIDE TOGETHER
            <span className="p-[1px] mr-[10px]"></span>
            SHARE TOGETHER<span className="p-[1px] mr-[10px]"></span> RIDE
            TOGETHER <span className="p-[1px] mr-[10px]"></span>SHARE TOGETHER
            <span className="p-[1px] mr-[10px]"></span> RIDE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>SHARE TOGETHER{" "}
            <span className="p-[1px] mr-[10px]"></span>RIDE TOGETHER
            <span className="p-[1px] mr-[10px]"></span> SHARE TOGETHER
          </span>
        </p>
      </div>
      {/* Info Section */}
      <section
        id="info"
        className=" bg-white text-black pt-[100px] md:pb-[100px] pb-[50px] font-normal md:px-[30px]  px-[15px]"
      >
        <div className="max-w-[1200px] flex lg:flex-row  md:items-center flex-col justify-between mx-[auto]">
          <div className="flex flex-col  self-center">
            <h3 className="lg:text-[40px] md:text-[36px] text-[28px] font-hilmar lg:w-[649px] md:w-[480px] font-normal md:leading-[52px] leading-[39px]">
              <span className="text-[#DB405A]">Who we are?</span> At
              <span className="text-[#E88D0E]"> Conductor. ng,</span> we are
              reshaping your daily travel into a shared experience.
            </h3>
            <p className="max-w-[520px] text-[18px] md:leading-[41px] leading-[35px] md:my-[3rem] my-[20px]">
              We&apos;re all about sharing rides – cutting costs, making travel
              a breeze, and doing our part for the planet.
            </p>
            <button className="hover:scale-[1.1] h-[48px] btn md:mx-0 mx-[auto] md:mb-0 mb-[17px]">
              Learn more
            </button>
          </div>
          <div className="max-w-[406px]">
            <Image
              className="h-[487px] w-[100%] md:mt-[70px]"
              src={frame1}
              alt="passengers image"
              width={406}
              height={487}
              priority
            />
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section
        id="service"
        className="bg-white pt-[80px] pb-[100px] md:px-[30px]  px-[15px]"
      >
        <div className="max-w-[1200px] text-white mx-[auto]">
          <h3 className="text-right font-hilmar font-medium md:text-[48px] text-[35px] leading-[50px] text-black">
            Our Services
          </h3>
          <h4 className="text-right font-hilmar font-medium md:text-[32px] text-[24px] leading-[33px] text-[var(--secondary-color)]">
            Why Conductor?
          </h4>
          {/* services Grid */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px] max-w-[870px] mx-[auto] mt-[80px]">
            <div className=" flex flex-col items-center gap-[20px] lg:h-[800px] md:h-[658px]">
              <div
                id="card_1"
                onMouseEnter={() => handleHoverElement(true, "card_1")}
                onMouseLeave={() => handleHoverElement(false, "card_1")}
                className={cn(
                  "bg-black h-[319px] md:w-[425px] w-[100vw] rounded-[22px] border border-solid border-[#E88D0E]  px-[22px] flex flex-col justify-between pt-[40px] pb-[15px]",
                  cardHovered1 && "bg-[#E88D0E]"
                )}
              >
                <h3
                  className={cn(
                    "font-hilmar md:text-[40px] text-[30px] leading-[48px] font-medium text-[#E88D0E]",
                    cardHovered1 && "text-black"
                  )}
                >
                  Cost- Efficiency
                </h3>
                <p
                  className={cn(
                    "md:w-[378px] w-[100%] leading-6  text-[16px] font-normal",
                    cardHovered1 && "text-black"
                  )}
                >
                  Our self-paced trips aim to offer you comfort, and value for
                  your money. With our user-friendly solution, sharing rides is
                  as easy as a few taps on your phone!
                </p>
                <Image
                  className="h-[64px] md:max-w-[64px] max-w-[55px] ml-[auto] mr-[60px]"
                  src={cardHovered1 ? save_2 : save}
                  alt="cash icon"
                  width={64}
                  height={64}
                  priority
                />
              </div>
              <div
                id="card_2"
                onMouseEnter={() => handleHoverElement(true, "card_2")}
                onMouseLeave={() => handleHoverElement(false, "card_2")}
                className={cn(
                  "bg-black h-[319px] md:w-[425px] w-[100vw] rounded-[22px] border border-solid border-[#E88D0E]  px-[22px] flex flex-col justify-between pt-[40px] pb-[15px]",
                  cardHovered2 && "bg-[#E88D0E]"
                )}
              >
                <h3
                  className={cn(
                    "font-hilmar md:text-[40px] text-[30px] leading-[48px] font-medium text-[#E88D0E]",
                    cardHovered2 && "text-black"
                  )}
                >
                  Go green with Conductor
                </h3>
                <p
                  className={cn(
                    "md:w-[378px] w-[100%] leading-6  text-[16px] font-normal",
                    cardHovered2 && "text-black"
                  )}
                >
                  Join us in lowering carbon footprints. By sharing rides,
                  we&apos;re making a positive impact on the environment, one
                  journey at a time.
                </p>
                <Image
                  className="h-[64px] max-w-[64px] ml-[auto] mr-[60px]"
                  src={cardHovered2 ? leaf_2 : leaf}
                  alt="go green icon"
                  width={64}
                  height={64}
                  priority
                />
              </div>
            </div>
            <div className=" flex flex-col gap-[20px] lg:h-[800px] md:h-[658px] items-center md:justify-end">
              <div
                id="card_3"
                onMouseEnter={() => handleHoverElement(true, "card_3")}
                onMouseLeave={() => handleHoverElement(false, "card_3")}
                className={cn(
                  "bg-black h-[319px] md:w-[425px] w-[100vw] rounded-[22px] border border-solid border-[#E88D0E] px-[22px] flex flex-col justify-between pt-[40px] pb-[15px]",
                  cardHovered3 && "bg-[#E88D0E]"
                )}
              >
                <h3
                  className={cn(
                    "font-hilmar md:text-[40px] text-[30px] leading-[48px] font-medium text-[#E88D0E]",
                    cardHovered3 && "text-black"
                  )}
                >
                  Convenience
                </h3>
                <p
                  className={cn(
                    "md:w-[378px] w-[100%] leading-6  text-[16px] font-normal",
                    cardHovered3 && "text-black"
                  )}
                >
                  Our self-paced trips aim to offer you comfort, and value for
                  your money. With our user-friendly solution, sharing rides is
                  as easy as a few taps on your phone!
                </p>
                <Image
                  className="h-[64px] md:max-w-[64px] max-w-[55px] ml-[auto] mr-[60px]"
                  src={cardHovered3 ? happy_2 : happy}
                  alt="convenience icon"
                  width={64}
                  height={64}
                  priority
                />
              </div>
              <div
                id="card_4"
                onMouseEnter={() => handleHoverElement(true, "card_4")}
                onMouseLeave={() => handleHoverElement(false, "card_4")}
                className={cn(
                  "bg-black h-[319px] md:w-[425px] w-[100vw] rounded-[22px] border border-solid border-[#E88D0E] px-[22px] flex flex-col justify-between pt-[40px] pb-[15px]",
                  cardHovered4 && "bg-[#E88D0E]"
                )}
              >
                <h3
                  className={cn(
                    "font-hilmar md:text-[40px] text-[30px] leading-[48px] font-medium text-[#E88D0E]",
                    cardHovered4 && "text-black"
                  )}
                >
                  Community Building
                </h3>
                <p
                  className={cn(
                    "md:w-[378px] w-[100%] leading-6  text-[16px] font-normal",
                    cardHovered4 && "text-black"
                  )}
                >
                  Connect with like-minded travellers while saving cost. With
                  Conductor, your trip is more than a ride
                </p>
                <Image
                  className="h-[64px] md:max-w-[64px] max-w-[55px] ml-[auto] mr-[60px]"
                  src={cardHovered4 ? community_2 : community}
                  alt="community icon"
                  width={64}
                  height={64}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How To Section */}
      <section
        id="how_to"
        className="bg-white md:pt-[250px] pt-[68px] lg:pb-[200px] "
      >
        {/* Grid 2 */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:max-w-[1100px] mx-[auto] lg:gap-8 md:gap-0 w-[100vw]">
          {/* Column 1 */}
          <div
            id="how_to_left"
            className="flex flex-col lg:items-end items-center gap-[50px] lg:p-[20px] lg:order-1 order-2 md:mb-0 mb-[50px] md:mt-0 mt-[25px]"
          >
            <div className="md:text-right text-center max-w-[300px] md:h-[220px]">
              <Image
                className="h-[60px] lg:max-w-[60px] md:max-w-[50px] ml-[auto]"
                src={num1}
                alt="number 1"
                width={50}
                height={50}
                priority
              />
              <h4 className="font-hilmar font-medium leading-[50px] text-[22px] text-black">
                REQUEST A RIDE
              </h4>
              <p className="text-[16px] leading-[26px] font-normal text-[#9E9DA2]">
                Commuting to work? And you don&apos;t want the hassle of
                transport stress? Easily request a ride and enjoy a safe and
                convenient trip!
              </p>
            </div>
            <div className="md:text-right text-center max-w-[300px] md:h-[220px]">
              <Image
                className="h-[60px] lg:max-w-[60px] md:max-w-[50px] ml-[auto]"
                src={num2}
                alt="number 2"
                width={50}
                height={50}
                priority
              />
              <h4 className="font-hilmar font-medium leading-[50px] text-[22px] text-black">
                INSTANT NOTIFICATIONS
              </h4>
              <p className="text-[16px] leading-[26px] font-normal text-[#9E9DA2]">
                Stay updated on every step of your ride with our
                instant notification!
              </p>
            </div>
          </div>
          {/* Column 2 */}
          <div
            id="how_to_middle"
            className=" w-[757px] md:h-[687px] h-[460px] lg:max-w-[757px] md:max-w-[489px] max-w-[300px] relative lg:order-2 md:order-3 order-1 mx-[auto]"
          >
            <div>
              {/* ellipse */}
              <div className="bg-[url('../public/images/ellipse.svg')] bg-no-repeat bg-center lg:bg-[length:400px_400px] md:bg-[length:280px_280px] bg-[length:180px_180px] z-2  p-[50%]  absolute lg:top-[-160px] md:top-[10px] top-[62px]  lg:left-[-205px] md:left-[-83px] left-0" />
              <Image
                className="absolute lg:top-[-105px] md:top-[6px] top-[70px] lg:left-[-208px] md:left-[-83px] left-0 z-5"
                src={phone}
                alt="phone img"
                width={757}
                height={687}
                priority
              />
            </div>
          </div>
          {/* Column 3 */}
          <div
            id="how_to_right"
            className="flex flex-col gap-[50px] lg:p-[20px] md:items-start items-center lg:order-3 order-2 md:mb-0 mb-[50px]"
          >
            <div className="md:text-left text-center max-w-[300px] md:h-[220px]">
              <Image
                className="h-[60px] lg:max-w-[60px] md:max-w-[50px] mr-[auto]"
                src={num3}
                alt="number 3"
                width={50}
                height={50}
                priority
              />
              <h4 className="font-hilmar font-medium leading-[50px] text-[22px] text-black">
                Earn on Your Terms
              </h4>
              <p className="text-[16px] leading-[26px] font-normal text-[#9E9DA2]">
                Set your own schedule and pace, and earn while at it!
              </p>
            </div>
            <div className="md:text-left text-center max-w-[300px] md:h-[220px]">
              <Image
                className="h-[60px] lg:max-w-[60px] md:max-w-[50px] mr-[auto]"
                src={num4}
                alt="number 4"
                width={50}
                height={50}
                priority
              />
              <h4 className="font-hilmar font-medium leading-[50px] text-[22px] text-black">
                personalized experience
              </h4>
              <p className="text-[16px] leading-[26px] font-normal text-[#9E9DA2]">
                Enjoy a personalized experience, connecting with like-minds on
                your commute!
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Submit info section */}
      <section
        id="info_submit"
        className="bg-[#F4B333] pt-[100px] pb-[100px] md:px-[30px]  px-[15px]"
      >
        <div className="max-w-[1100px] mx-[auto] flex md:flex-row flex-col justify-between items-center">
          <div>
            <h3 className="w-[338px] font-hilmar font-medium md:text-[36px] text-[27px] md:text-left text-center leading-[37px] text-black md:mb-4 mb-[40px]">
              We would love <br />
              to hear from you.
            </h3>
            <Image
              className="md:block hidden h-[380px] lg:max-w-[529px] md:max-w-[470px] w-[100%]"
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
                className="block font-hilmar font-normal text-[20px] leading-[22.4px]"
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
                className="block font-hilmar font-normal text-[20px] leading-[22.4px]"
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
                className="block font-hilmar font-normal text-[20px] leading-[22.4px]"
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
              <button className="hover:scale-[1.1] bg-[var(--primary-color)] text-[var(--secondary-color)] min-w-[246px] h-[45px] rounded-[100px]">
                Join the waitlist
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
