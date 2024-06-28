import React, { useState } from "react";
import { emptyFunction } from "@utils/helper-functions";
import {
  DialogHeader,
  DialogTitle,
} from "@components/common/design-system/Dialog";

import BackIcon from "@assets/svgIcons/back-icon.svg";
import WebsiteTabContent from "./WebsiteTabContent";
import SitemapTabContent from "./SitemapTabContent";
import { ActiveStep } from "../../typing/shared";

export interface WebScraperProps {
  activeStep?: string;
  setActiveStep?: (stepId: ActiveStep) => void;
  onCloseModal?: () => void;
}

export type FilterData = {
  [key: string]: number | string;
};

function WebScraper({
  activeStep = "",
  setActiveStep = emptyFunction,
  onCloseModal,
}: WebScraperProps) {
  const [activeTab, setActiveTab] = useState<string>("website");

  return (
    <>
      <DialogHeader
        className="cc-bg-white cc-border-b cc-border-outline-low_em"
        closeButtonClass="cc-hidden sm:cc-flex"
        onCloseModal={onCloseModal}
      >
        <div className="cc-flex-grow cc-flex cc-gap-3 cc-items-center">
          <button
            className="cc-pr-1 cc-h-10 cc-w-auto"
            onClick={() => setActiveStep("INTEGRATION_LIST")}
          >
            <img
              src={BackIcon}
              alt="Lock"
              className="cc-h-[18px] cc-w-[18px] dark:cc-invert-[1] dark:cc-hue-rotate-180"
            />
          </button>
          <DialogTitle className="cc-flex-grow cc-text-left">
            Web Scraper
          </DialogTitle>
        </div>
      </DialogHeader>
      {activeTab === "website" && (
        <WebsiteTabContent setActiveTab={setActiveTab} />
      )}
      {activeTab === "sitemap" && (
        <SitemapTabContent setActiveTab={setActiveTab} />
      )}
    </>
  );
}

export default WebScraper;
