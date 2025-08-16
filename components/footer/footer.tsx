import { cn } from "@/app/utils";
import Image from "next/image";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type InfoProps = { head: string; links: string[] };

const info: InfoProps[] = [
  { head: "Company", links: ["About US", "Our Vision"] },
  { head: "Support", links: ["FAQs", "Email Us!"] },
];

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "800"],
});

const Footer = () => {
  const dt = new Date();
  return (
    <footer>
      <div className="max-w-[1300px] mx-auto pt-[64px] mb-[39px]">
        <div className="md:flex justify-between pb-[64px]">
          <div className="md:mb-0 mb-[48px]">
            <div className="w-[fit-content] mr-auto">
              <span
                className={cn(
                  `${roboto.className}`,
                  "text-tertiary block bg-[#211e1c] w-[fit-content] mr-auto font-normal text-[16px] py-[8px] px-[16px] rounded-[36px] mb-[32px]"
                )}
              >
                Join the Waitlist
              </span>
              <h2 className="font-medium max-w-[319px] text-[32px] text-white mb-[32px] leading-[1.2]">
                Be among the first! <br /> Be Part of the Journey
              </h2>
              <div className="flex gap-x-[16px]">
                <input
                  type="text"
                  placeholder="Enter your email here"
                  className="bg-[#211e1c] placeholder:text-[#63605e] h-[52px] w-[319px] pl-[16px] border-[#E6E5E3]/20 border-[0.2px]"
                />
                <button className="w-[55px] flex justify-center items-center bg-[#f8d9de]">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex gap-x-[57px]">
            {info.map((item, index) => (
              <div key={index} className="md:mt-0 mt-[40px] ">
                <h3 className="text-white mb-[40px] font-normal text-[16px]">
                  {item.head}
                </h3>
                <ul className="flex flex-col gap-y-[40px] text-[#ACA9A6] font-normal text-[14px]">
                  {item.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href="">{link}</Link>
                    </li>
                  ))}
                  <li className="md:hidden">
                    <Link href="">Terms of Service</Link>
                  </li>
                  <li className="md:hidden">
                    <Link href="">Privacy policy</Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex h-[96px] items-end md:border-t-[0.2px] md:border-[#E6E5E3]/20">
            <div className="h-[32px] flex md:justify-start justify-between md:w-fit w-full gap-x-[32px] items-center">
              <span>
                <Link href="/">
                  <Image
                    className="w-[64px] h-full"
                    src="/images/footer_logo.svg"
                    alt="logo image"
                    width={746}
                    height={396}
                    priority
                  />
                </Link>
              </span>
              <span>
                <Link href="https://www.facebook.com/profile.php?id=61574617154383">
                  <Image
                    className="w-[18px] h-[18px]"
                    src="/images/facebook.svg"
                    alt="facebook"
                    width={746}
                    height={396}
                    priority
                  />
                </Link>
              </span>
              <span>
                <Link href="https://x.com/conducterng?t=LW4ISF3V7VAGQ_I7p7Pvdw&s=08 ">
                  <Image
                    className="w-[18px] h-[18px]"
                    src="/images/twitter-x-fill.svg"
                    alt="x.com"
                    width={746}
                    height={396}
                    priority
                  />
                </Link>
              </span>
              <span>
                <Link href="https://www.instagram.com/conductornaija?utm_source=ig_web_button_share_sheet&igsh=Z29vNGxscjBlYXJ4">
                  <Image
                    className="w-[18px] h-[18px]"
                    src="/images/instagram-fill.svg"
                    alt="instagram"
                    width={746}
                    height={396}
                    priority
                  />
                </Link>
              </span>
              <span>
                <Link href="https://www.linkedin.com/company/conductor-nigeria/?viewAsMember=true">
                  <Image
                    className="w-[18px] h-[18px]"
                    src="/images/linkedin-fill.svg"
                    alt="linkedin"
                    width={746}
                    height={396}
                    priority
                  />
                </Link>
              </span>
              <span>
                <Image
                  className="w-[18px] h-[18px]"
                  src="/images/tiktok-fill.svg"
                  alt="tiktok"
                  width={746}
                  height={396}
                  priority
                />
              </span>
            </div>
            <div className="hidden max-w-[418px] md:flex gap-x-[40px] ml-auto text-[#ACA9A6] font-extralight text-[16px]">
              <Link href="" className="decoration-[#ACA9A6] underline">
                Terms of service
              </Link>
              <Link href="" className="decoration-[#ACA9A6] underline">
                Privacy policy
              </Link>
              <span>{dt.getFullYear()} Conductor.ng</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto">
        <Image
          className="w-full h-auto"
          src="/images/footer_bg_logo.png"
          alt="footer background logo"
          width={746}
          height={396}
          priority
        />
      </div>
    </footer>
  );
};

export default Footer;
