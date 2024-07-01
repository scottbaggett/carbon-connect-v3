import React from "react";
import { images } from "@assets/index";

const tabValues = [
  { tab: "website", text: "Website", icon: images.monitor },
  {
    tab: "sitemap",
    text: "Sitemap",
    icon: images.tabler_sitemap,
  },
];

export default function WebScraperTabs({
  activeTab,
  setActiveTab,
  sitemapEnabled,
}: {
  activeTab: string;
  setActiveTab: (val: string) => void;
  sitemapEnabled?: boolean;
}) {
  if (!sitemapEnabled) {
    return (
      <div className="cc-flex cc-justify-start cc-items-center cc-mb-6">
        <div className="cc-mr-2">
          <img
            src={tabValues[0].icon}
            alt={tabValues[0].text}
            className="cc-h-6 cc-w-6"
          />
        </div>
        <div className="cc-text-xl cc-font-medium cc-ml-2">
          {tabValues[0].text}
        </div>
      </div>
    );
  }

  return (
    <div className="cc-flex cc-w-full cc-mb-6">
      <div className="cc-flex cc-w-full cc-gap-x-4">
        {tabValues.length > 0 &&
          tabValues.map((item) => {
            return (
              <label
                key={item.tab}
                className={`cc-flex cc-w-full cc-justify-between cc-items-center cc-cursor-pointer cc-border cc-rounded-xl cc-px-3 cc-py-3 ${
                  activeTab === item.tab
                    ? "cc-border-surface-info_main"
                    : "cc-border-surface-surface_3 dark:cc-border-[#FFFFFF1F]"
                }`}
              >
                <input
                  type="radio"
                  name="tab"
                  checked={activeTab === item.tab}
                  onChange={() => setActiveTab(item.tab)}
                  className="cc-hidden"
                />
                <span
                  className={`cc-custom-radio cc-text-sm cc-font-semibold cc-text-high_em dark:cc-text-dark-text-white dark:before:cc-border-dark-text-gray  ${
                    activeTab === item.tab ? "cc-custom-radio-checked " : ""
                  }`}
                >
                  {item.text}
                </span>
                <div>
                  <img
                    src={item.icon}
                    alt="monitor"
                    className="cc-h-6 cc-w-6"
                  />
                </div>
              </label>
            );
          })}
      </div>
    </div>
  );
}
