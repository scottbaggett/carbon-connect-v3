import React, { useEffect } from "react";
import { images } from "@assets/index";

export type BannerState = {
  message: string | null;
  ctaText?: string | null;
  type?: "WARN" | "SUCCESS" | "ERROR" | null;
  additionalInfo?: string | null;
};

const BG_COLORS = {
  WARN: "surface-warning_accent_1",
  SUCCESS: "surface-success_accent_1",
  ERROR: "surface-danger_accent_1",
};

const ICONS = {
  WARN: images.warningTick,
  SUCCESS: images.greenTick,
  ERROR: images.warningTick,
};

const Banner = ({
  bannerState,
  setBannerState,
}: {
  bannerState: BannerState;
  setBannerState: React.Dispatch<React.SetStateAction<BannerState>>;
}) => {
  // useEffect(() => {
  //   const interval = setInterval(
  //     () => setBannerState({ message: null, type: null, ctaText: null }),
  //     5000
  //   );
  //   return () => clearInterval(interval);
  // }, [bannerState]);

  const bgColor = BG_COLORS[bannerState.type || "SUCCESS"];
  const icon = ICONS[bannerState.type || "SUCCESS"];

  return bannerState.message ? (
    <div
      className={`cc-flex cc-justify-between cc-items-center cc-bg-${bgColor} cc-p-[8px_24px_8px_16px]`}
    >
      <div className="cc-flex cc-items-center">
        <img
          src={icon}
          alt={bannerState.type || ""}
          className="cc-mr-[10px]"
          height={"15px"}
        />
        <div>
          <span className="cc-text-[14px] cc-leading-[24px] cc-font-bold cc-text-[#000000] cc-mr-[10px]">
            {bannerState.message}
          </span>
          <span className="md:cc-block cc-text-[14px] cc-leading-[24px] cc-font-medium cc-text-[#0000007A]">
            {bannerState.additionalInfo}
          </span>
        </div>
      </div>
      <div className="cc-flex cc-items-center">
        <img src={images.verticleSeperate} alt="" />
        <p
          onClick={() =>
            setBannerState({
              ctaText: null,
              message: null,
              type: null,
            })
          }
          className={`cc-text-[14px] cc-leading-[24px] cc-font-semibold cc-text-[#F03D3D] cc-ml-[10px] cc-border-b-[2px] cc-border-[#FF7373] cc-cursor-pointer`}
        >
          {bannerState.ctaText || "Got It"}
        </p>
      </div>
    </div>
  ) : null;
};

export default Banner;
