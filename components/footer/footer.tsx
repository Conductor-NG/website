import { cn } from "@/app/utils";
import Image from "next/image";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type InfoProps = { head: string; links: { title: string; href: string }[] };

const info: InfoProps[] = [
  {
    head: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Our Vision", href: "/vision" },
    ],
  },
  {
    head: "Support",
    links: [
      { title: "FAQs", href: "/faq" },
      { title: "Email Us!", href: "mailto:support@conductor.ng" },
    ],
  },
];

const socialLinks = [
  { href: "https://www.facebook.com/...", icon: "facebook.svg", alt: "facebook" },
  { href: "https://x.com/...", icon: "twitter-x-fill.svg", alt: "x" },
  { href: "https://www.instagram.com/...", icon: "instagram-fill.svg", alt: "instagram" },
  { href: "https://www.linkedin.com/...", icon: "linkedin-fill.svg", alt: "linkedin" },
  { href: "#", icon: "tiktok-fill.svg", alt: "tiktok" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="w-full text-white">
        <div className="max-w-[1300px] mx-auto pt-16 pb-10 px-6 md:px-0">
          <div className="flex flex-col md:flex-row justify-between pb-16 gap-y-12">

            {/* Waitlist Section */}
            <div className="flex flex-col items-start max-w-sm">
            <span className={cn(
                roboto.className,
                "text-tertiary bg-[#211e1c] text-sm py-2 px-4 rounded-full mb-8"
            )}>
              Join the Waitlist
            </span>
              <h2 className="text-xl md:text-3xl font-medium mb-8 leading-tight">
                Be among the first! <br /> Be Part of the Journey
              </h2>
              <div className="flex w-full h-[52px]">
                <input
                    type="email"
                    placeholder="Enter your email here"
                    className="flex-1 bg-[#211e1c] placeholder:text-[#63605e] px-4 border border-white/10 outline-none focus:border-tertiary/50 transition-colors"
                />
                <button className="w-14 flex justify-center items-center bg-[#f8d9de] text-black hover:bg-[#f2c5cc] transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Links Grid */}
            <div className="flex gap-x-14 md:gap-x-20">
              {info.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-base font-medium mb-8 uppercase tracking-wider text-white/90">
                      {item.head}
                    </h3>
                    <ul className="flex flex-col gap-y-6 text-[#ACA9A6] text-sm">
                      {item.links.map((link, idx) => (
                          <li key={idx}>
                            <Link href={link.href} className="hover:text-white transition-colors">
                              {link.title}
                            </Link>
                          </li>
                      ))}
                      {/* Mobile-only links inside the first list to save space */}
                      {index === 0 && (
                          <>
                            <li className="md:hidden"><Link href="/terms-and-conditions">Terms of Service</Link></li>
                            <li className="md:hidden"><Link href="/privacy-policy">Privacy Policy</Link></li>
                          </>
                      )}
                    </ul>
                  </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-y-8">
            <div className="flex items-center gap-x-8 w-full md:w-auto justify-between md:justify-start">
              <Link href="/">
                <Image src="/images/footer_logo.svg" alt="logo" width={64} height={32} />
              </Link>
              <div className="flex gap-x-5">
                {socialLinks.map((social, i) => (
                    <Link key={i} href={social.href} className="opacity-70 hover:opacity-100 transition-opacity">
                      <Image src={`/images/${social.icon}`} alt={social.alt} width={18} height={18} />
                    </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex gap-x-10 text-[#ACA9A6] text-sm font-light">
              <Link href="/terms-and-conditions" className="underline decoration-white/20 hover:text-white">
                Terms of service
              </Link>
              <Link href="/privacy-policy" className="underline decoration-white/20 hover:text-white">
                Privacy policy
              </Link>
              <span>© {currentYear} Conductor.ng</span>
            </div>

            <span className="md:hidden text-xs text-[#ACA9A6]">© {currentYear} Conductor.ng</span>
          </div>
        </div>

        {/* Decorative Background Image */}
        <div className="w-full h-auto overflow-hidden leading-[0]">
          <Image
              className="w-full h-auto object-cover opacity-80"
              src="/images/footer_bg_logo.png"
              alt=""
              width={1440}
              height={100}
          />
        </div>
      </footer>
  );
};

export default Footer;