import Image from "next/image";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";

type ScanDetails = {
  scanSrcDriver: string;
  scanSrcPassenger: string;
  btnLinkStoreDriver: string;
  btnLinkStorePassenger: string;
  btnSrc: string;
  altScan: string;
  altBtn: string;
};

const scanDets: ScanDetails[] = [
  {
    // for playstore
    scanSrcDriver: "/images/pg_play_scan.svg",
    scanSrcPassenger: "/images/pg_play_passenger_scan.svg",
    btnLinkStoreDriver:
      "https://play.google.com/store/apps/details?id=ng.conductor.passenger&hl=en", //to change
    btnLinkStorePassenger:
      "https://play.google.com/store/apps/details?id=ng.conductor.driver",
    btnSrc: "/images/pg_playstore_download_button.svg",
    altScan: "scan for playstore image",
    altBtn: "playstore download button",
  },
  // for appstore
  {
    scanSrcDriver: "/images/pg_app_driver_scan.svg",
    scanSrcPassenger: "/images/pg_app_scan.svg",
    btnLinkStoreDriver:
      "https://apps.apple.com/ng/app/conductor-driver/id6747726138",
    btnLinkStorePassenger:
      "https://apps.apple.com/ng/app/conductor-ng/id6747010463",
    btnSrc: "/images/pg_appstore_download_button.svg",
    altScan: "scan for appstore image",
    altBtn: "appstore download button",
  },
];
const returnUrl = (
  currentPage: string,
  index: number,
  action: string
): string => {
  if (currentPage === "home" && action === "scan") {
    return scanDets[index].scanSrcPassenger;
  }
  if (currentPage === "driver" && action === "scan") {
    return scanDets[index].scanSrcDriver;
  }
  if (currentPage === "home" && action === "btn") {
    return scanDets[index].btnLinkStorePassenger;
  }
  if (currentPage === "driver" && action === "btn") {
    return scanDets[0].btnLinkStoreDriver;
  }
  return "";
};

const Scan = () => {
  const currentPage = useAppSelector((state) => state.onScrollSlice.page);
  return (
    <div className="max-w-[1300px] mx-auto md:flex items-center justify-between md:h-[364px] md:pb-0 pb-[32px]">
      <div className="max-w-[540px]">
        <h2 className="font-medium md:text-[40px] text-[20px] mb-[32px] md:text-left text-center md:pt-0 pt-[32px]">
          Want to download? <span className="text-tertiary">Just scan!</span>
        </h2>
        <p className="md:block hidden max-w-[481px] font-normal text-[16px] leading-[1.8]">
          You can simply turn on your phone camera and place it over the QR
          codes below, click the link that appears
        </p>
      </div>
      <div>
        <div className="flex gap-x-[24px]">
          {scanDets.map((item, index) => (
            <div
              key={index}
              className="w-[187px] md:h-[144px] flex flex-col px-[11.5px]"
            >
              <Image
                className="w-[164px] h-full mb-[26px] md:block hidden"
                src={`${returnUrl(currentPage, index, "scan")}`}
                alt={item.altScan}
                width={746}
                height={396}
                priority
              />
              <Link href={`${returnUrl(currentPage, index, "btn")}`}>
                <Image
                  className="w-[120px] mx-auto h-full"
                  src={item.btnSrc}
                  alt={item.altBtn}
                  width={746}
                  height={396}
                  priority
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scan;
