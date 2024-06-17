import React, { useEffect, useRef, useState } from "react";
import { emptyFunction, isEmpty } from "@utils/helper-functions";
import { images } from "@assets/index";
import BackIcon from "@assets/svgIcons/back-icon.svg";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/common/design-system/Dialog";
import { Button } from "@components/common/design-system/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import WebsiteFilterBottomSheet from "@components/common/WebsiteFilterBottomSheet";
import { Input } from "@components/common/design-system/Input";
import { Checkbox } from "@components/common/design-system/Checkbox";

export interface WebScraperProps {
  activeStep?: string;
  setActiveStep?: (stepId: string) => void;
  onCloseModal?: () => void;
}

export type FilterData = {
  [key: string]: number | string;
};

type UrlType = {
  id: string;
  url: string;
};

function WebScraper({
  activeStep = "",
  setActiveStep = emptyFunction,
  onCloseModal,
}: WebScraperProps) {
  const [activeTab, setActiveTab] = useState<"website" | "sitemap" | "success">(
    "website"
  );
  const [singleTabValue, setSinglTabValue] = useState<
    "website" | "sitemap" | null
  >(null);
  const [urls, setUrls] = useState([""]); // List of URLs to be scraped.
  const [filterData, setFilterData] = useState<FilterData[]>([]);
  const [internalSteps, setInternalSteps] = useState<number>(1);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<{
    state: boolean;
    percentage: number;
  }>({ state: false, percentage: 0 });
  const [showSitemapSubmitCTA, setShowSitemapSubmitCTA] =
    useState<boolean>(false);
  const [showSitemapFetchCTA, setShowSitemapFetchCTA] = useState<boolean>(true);
  const [
    showMobileWebsiteFilterBottomSheet,
    setShowMobileWebsiteFilterBottomSheet,
  ] = useState<boolean>(false);

  useEffect(() => {
    setUrls([""]);
    setInternalSteps(1);
  }, [activeTab]);

  const handleAddUrl = () => {
    setUrls((prevList) => [...prevList, ""]);
  };

  const handleDeleteUrl = (idx: number) => {
    setUrls((prevList) => prevList.filter((_, index) => index !== idx));
  };

  const handleFilterClick = (idx: number) => {
    // setIsDropdownOpen((prevOpen) => ({ ...prevOpen, [idx]: !prevOpen[idx] }));
  };

  const handleUrlChange = (url_index: number, url: string) => {
    if ((activeStep = "sitemap")) {
      setShowSitemapFetchCTA(true);
      setShowSitemapSubmitCTA(false);
    }
    setUrls((prevList) => {
      let newUrls = [...prevList];
      newUrls[url_index] = url;
      return newUrls;
    });
  };

  const handleFilterData = (
    url_index: number,
    fieldName: keyof FilterData,
    fieldValue: number | string
  ) => {
    setFilterData((prevList) => {
      let newUrls = [...prevList] || [];
      if (isEmpty(newUrls[url_index])) {
        newUrls[url_index] = {};
      }
      newUrls[url_index][fieldName] = fieldValue;
      return newUrls;
    });
  };

  const handleWebiteSubmit = () => {
    console.log("Submitted Website URLs:", urls);
    setActiveTab("success");
  };

  const handleSitemapSubmit = () => {
    console.log("Submitted Sitemap URLs:", urls);
    setActiveTab("success");
  };

  const fileList: UrlType[] = [
    {
      id: "italic.com1",
      url: "https://italic.com/sitemap-main.xml",
    },
    {
      id: "italic.com2",
      url: "https://italic.com/sitemap-images.xml",
    },
    {
      id: "italic.com3",
      url: "https://italic.com/guides/sitemap.xml",
    },
    {
      id: "italic.com4",
      url: "https://italic.com",
    },
    {
      id: "italic.com5",
      url: "https://italic.com/careers",
    },
    {
      id: "italic.com6",
      url: "https://italic.com/how-it-works",
    },
    {
      id: "italic.com7",
      url: "https://italic.com/membership",
    },
    {
      id: "italic.com8",
      url: "https://italic.com/sitemap-main.xml",
    },
    {
      id: "italic.com9",
      url: "https://italic.com/sitemap-images.xml",
    },
  ];

  type SitemapItemProps = {
    isChecked: boolean;
    onSelect: () => void;
    item: UrlType;
  };

  const SitemapItem = ({ item, isChecked, onSelect }: SitemapItemProps) => {
    return (
      <li
        key={item.id}
        className="cc-flex cc-transition-all cc-py-3 cc-font-semibold cc-text-high_em cc-text-sm cc-border-b cc-border-outline-base_em hover:cc-bg-gray-25 cc-cursor-pointer"
      >
        <div className="cc-gap-2 cc-flex cc-items-start cc-w-full sm:cc-px-2">
          <Checkbox
            className="cc-my-0.5"
            checked={isChecked}
            onCheckedChange={onSelect}
          />
          <div className="cc-flex cc-flex-grow cc-gap-x-4 cc-gap-y-1 cc-flex-wrap">
            <p className="cc-flex cc-flex-grow cc-flex-start">{item.url}</p>
          </div>
        </div>
      </li>
    );
  };

  const mobileFilterDeleteComponent = (idx: number) => {
    return (
      <DropdownMenuContent
        align="end"
        className="cc-w-48 cc-bg-white cc-border cc-border-outline-base_em cc-rounded-xl cc-shadow-e3 cc-z-30"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cc-flex cc-justify-between cc-font-semibold cc-border-b cc-border-outline-base_em cc-py-2 cc-px-5 cc-cursor-pointer"
            onClick={() => setShowMobileWebsiteFilterBottomSheet(true)}
          >
            <span>Configure by</span>
            <img src={images.filter} alt="" className="" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cc-flex cc-justify-between cc-text-smxt cc-font-semibold cc-py-2 cc-px-5 cc-cursor-pointer"
            onClick={() => handleDeleteUrl(idx)}
          >
            <span>Delete</span>
            <img src={images.trash_2} alt="" className="cc-cursor-pointer" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    );
  };

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
              className="cc-h-[18px] cc-w-[18px]"
            />
          </button>
          <DialogTitle className="cc-flex-grow cc-text-left">
            Web Scraper
          </DialogTitle>
        </div>
      </DialogHeader>
      <div className="cc-text-center cc-w-full cc-flex cc-flex-col cc-h-full">
        <div className="cc-min-h-80 sm:cc-max-h-96 cc-p-4 cc-flex-grow cc-overflow-auto">
          <div className="cc-flex cc-w-full cc-mb-6">
            {singleTabValue === null && (
              <div className="cc-flex cc-w-full cc-gap-x-4">
                <div className="cc-flex cc-w-1/2">
                  <div
                    className={`cc-flex cc-w-full cc-justify-between cc-items-center cc-cursor-pointer cc-border cc-rounded-xl cc-px-3 cc-py-3 ${
                      activeTab === "website"
                        ? "cc-border-surface-info_main"
                        : "cc-border-surface-surface_3"
                    }`}
                    onClick={() => setActiveTab("website")}
                  >
                    <div className="cc-flex">
                      <label>
                        <input
                          type="radio"
                          name="tab"
                          checked={activeTab === "website"}
                          onChange={() => setActiveTab("website")}
                          className="cc-hidden"
                        />
                        <span
                          className={`cc-custom-radio cc-text-sm cc-font-semibold cc-text-high_em ${
                            activeTab === "website"
                              ? "cc-custom-radio-checked"
                              : ""
                          }`}
                        >
                          Website
                        </span>
                      </label>
                    </div>
                    <div>
                      <img
                        src={images.monitor}
                        alt="monitor"
                        className="cc-h-6 cc-w-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="cc-flex cc-w-1/2">
                  <div
                    className={`cc-flex cc-w-full cc-justify-between cc-items-center cc-cursor-pointer cc-border cc-rounded-xl cc-px-3 cc-py-3 ${
                      activeTab === "sitemap"
                        ? "cc-border-surface-info_main"
                        : "cc-border-surface-surface_3"
                    }`}
                    onClick={() => setActiveTab("sitemap")}
                  >
                    <div className="cc-flex">
                      <label>
                        <input
                          type="radio"
                          name="tab"
                          checked={activeTab === "sitemap"}
                          onChange={() => setActiveTab("sitemap")}
                          className="cc-hidden"
                        />
                        <span
                          className={`cc-custom-radio cc-text-sm cc-font-semibold cc-text-high_em ${
                            activeTab === "sitemap"
                              ? "cc-custom-radio-checked"
                              : ""
                          }`}
                        >
                          Sitemap
                        </span>
                      </label>
                    </div>
                    <div>
                      <img
                        src={images.tabler_sitemap}
                        alt="tabler_sitemap"
                        className="cc-h-6 cc-w-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {singleTabValue === "website" && (
              <div className="cc-flex cc-justify-start cc-items-center">
                <div className="cc-mr-2">
                  <img
                    src={images.monitor}
                    alt="monitor"
                    className="cc-h-6 cc-w-6"
                  />
                </div>
                <div className="cc-text-xl cc-font-medium cc-ml-2">Website</div>
              </div>
            )}
            {singleTabValue === "sitemap" && (
              <div className="cc-flex cc-justify-start cc-items-center">
                <div className="cc-mr-2">
                  <img
                    src={images.tabler_sitemap}
                    alt="tabler_sitemap"
                    className="cc-h-6 cc-w-6"
                  />
                </div>
                <div className="cc-text-xl cc-font-medium cc-ml-2">Sitemap</div>
              </div>
            )}
          </div>
          <div className="py-4 cc-flex cc-grow cc-w-full">
            {activeTab === "website" && (
              <div className="cc-flex cc-flex-col cc-justify-start cc-h-full cc-items-start cc-w-full cc-space-y-4">
                {urls.map((url, idx) => (
                  <div
                    key={idx}
                    className="cc-flex cc-space-x-2 cc-items-center cc-w-full cc-h-10"
                  >
                    <div className="cc-flex cc-flex-1 cc-relative">
                      <div className="cc-absolute cc-top-3 cc-left-2">
                        <img src={images.left_icon} alt="tabler_sitemap" />
                      </div>
                      <input
                        type="text"
                        className=" cc-w-100 cc-py-2 cc-pl-8 cc-pr-3 cc-flex cc-text-disabledtext cc-leading-24 cc-rounded-tl-xl cc-rounded-bl-xl  cc-bg-color-black-7 cc-text-sm cc-font-semibold"
                        placeholder="Enter URL"
                        disabled={true}
                        value={"https://"}
                      />
                      <input
                        type="text"
                        className="cc-py-2 cc-px-3 cc-flex-grow cc-text-text-disabled cc-rounded-tr-xl cc-leading-24 cc-rounded-br-xl cc-border-l cc-border-outline-med_em cc-bg-color-black-7 cc-text-sm cc-ring-blue-400/40 focus-visible:cc-outline-none focus-visible:cc-bg-white focus-visible:cc-ring-4 focus-visible:cc-ring-ring  focus:cc-bg-surface-white cc-font-semibold"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => handleUrlChange(idx, e.target.value)}
                      />
                    </div>
                    <div className="cc-flex sm:cc-hidden cc-relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <img
                            src={images.menuIcon}
                            alt="Menu Icon"
                            className="cc-h-[18px] cc-w-[18px] cc-shrink-0"
                          />
                        </DropdownMenuTrigger>
                        {mobileFilterDeleteComponent(idx)}
                      </DropdownMenu>
                    </div>
                    <div className="cc-hidden sm:cc-flex cc-items-center">
                      <div className="cc-mr-3">
                        <div className="">
                          <DropdownMenu onOpenChange={setIsFilterOpen}>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className={`cc-flex cc-relative cc-justify-center cc-items-center cc-text-smxt cc-border cc-border-color-black-7 cc-rounded-xl cc-w-[166px] cc-h-10 cc-px-3 cc-font-bold cc-text-gray-700 hover:cc-bg-surface-surface_1 ${
                                  isFilterOpen
                                    ? "cc-bg-surface-surface_1"
                                    : "cc-bg-white"
                                }`}
                                onClick={() => handleFilterClick(idx)}
                              >
                                {filterData[idx]?.filterType != null && (
                                  <div className="cc-absolute -cc-right-0.5 -cc-top-0.5 cc-border-2 cc-border-white cc-h-2.5 cc-w-2.5 cc-rounded-full cc-bg-surface-info_main "></div>
                                )}
                                <img
                                  src={images.filter}
                                  alt=""
                                  className="cc-mr-2"
                                />
                                Configure by
                                <svg
                                  className="cc-ml-1 cc-h-5 cc-w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.879a1 1 0 011.414 1.414l-4 4.5a1 1 0 01-1.414 0l-4-4.5a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="cc-w-296 cc-bg-white cc-border cc-rounded-xl cc-border-outline-base_em cc-shadow-e3 cc-z-40"
                            >
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  className="cc-flex cc-flex-col cc-justify-between cc-font-semibold cc-py-2 cc-px-2 "
                                  onSelect={(event) => event.preventDefault()}
                                >
                                  <div className="cc-py-3 cc-px-2 cc-flex cc-justify-between cc-items-center">
                                    <div className="cc-flex">
                                      <label>
                                        <input
                                          type="radio"
                                          name="tab"
                                          checked={
                                            filterData[idx]?.filterType ===
                                            "Recursion depth"
                                          }
                                          onChange={() =>
                                            handleFilterData(
                                              idx,
                                              "filterType",
                                              "Recursion depth"
                                            )
                                          }
                                          className="cc-hidden"
                                        />
                                        <span
                                          className={`cc-custom-radio cc-text-sm cc-font-semibold cc-text-high_em ${
                                            filterData[idx]?.filterType ===
                                            "Recursion depth"
                                              ? "cc-custom-radio-checked"
                                              : ""
                                          }`}
                                        >
                                          Recursion depth
                                        </span>
                                      </label>
                                    </div>
                                    <div className="cc-w-[51px]">
                                      <Input
                                        type="text"
                                        placeholder=""
                                        className="cc-h-8 cc-text-xs cc-pl-2"
                                        value={filterData[idx]?.depthValue}
                                        onChange={(e) =>
                                          handleFilterData(
                                            idx,
                                            "depthValue",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="cc-py-3 cc-px-2 cc-flex cc-justify-between cc-items-center">
                                    <div className="cc-flex">
                                      <label>
                                        <input
                                          type="radio"
                                          name="tab"
                                          checked={
                                            filterData[idx]?.filterType ===
                                            "Max pages to scrape"
                                          }
                                          onChange={() =>
                                            handleFilterData(
                                              idx,
                                              "filterType",
                                              "Max pages to scrape"
                                            )
                                          }
                                          className="cc-hidden"
                                        />
                                        <span
                                          className={`cc-custom-radio cc-text-sm cc-font-semibold cc-text-high_em ${
                                            filterData[idx]?.filterType ===
                                            "Max pages to scrape"
                                              ? "cc-custom-radio-checked"
                                              : ""
                                          }`}
                                        >
                                          Max pages to scrape
                                        </span>
                                      </label>
                                    </div>
                                    <div className="cc-w-[51px]">
                                      <Input
                                        type="text"
                                        placeholder=""
                                        className="cc-h-8 cc-text-xs cc-pl-2"
                                        value={filterData[idx]?.maxPages}
                                        onChange={(e) =>
                                          handleFilterData(
                                            idx,
                                            "maxPages",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <button
                                    className="cc-flex cc-flex-row cc-w-full cc-items-center cc-justify-center cc-rounded-md cc-cursor-pointer cc-px-4 cc-py-2 cc-text-base cc-font-extrabold cc-bg-surface-white cc-border cc-border-color-black-7 cc-text-high_em cc-mt-4"
                                    onClick={() => {}}
                                  >
                                    Apply
                                  </button>
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="cc-mr-2">
                        <img
                          src={images.trash_2}
                          alt=""
                          className="cc-cursor-pointer"
                          onClick={() => handleDeleteUrl(idx)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {urls.length < 50 && (
                  <button
                    className={`cc-flex cc-flex-row cc-w-full cc-items-center cc-justify-center cc-rounded-xl cc-cursor-pointer cc-px-4 cc-py-2 cc-text-base cc-font-extrabold cc-bg-surface-white cc-border cc-border-color-black-7 cc-text-high_em cc-mt-4 cc-mb-4`}
                    onClick={handleAddUrl}
                  >
                    <img src={images.addIcon} className="cc-mr-2" />
                    Add
                  </button>
                )}
              </div>
            )}
            {activeTab === "sitemap" && (
              <div className="cc-flex cc-flex-col cc-justify-start cc-h-full cc-items-start cc-w-full cc-space-y-4">
                {
                  <div
                    key={0}
                    className="cc-flex cc-space-x-2 cc-items-center cc-w-full cc-h-10 cc-mb-2"
                  >
                    <div className="cc-flex cc-flex-1 cc-relative">
                      <div className="cc-absolute cc-top-3 cc-left-2">
                        <img src={images.left_icon} alt="tabler_sitemap" />
                      </div>
                      <input
                        type="text"
                        className=" cc-w-100 cc-py-2 cc-pl-8 cc-pr-3 cc-flex cc-text-disabledtext cc-leading-24 cc-rounded-tl-xl cc-rounded-bl-xl  cc-bg-color-black-7 cc-text-sm cc-font-semibold"
                        placeholder="Enter URL"
                        disabled={true}
                        value={"https://"}
                      />
                      <input
                        type="text"
                        className="cc-py-2 cc-px-3 cc-flex-grow cc-text-text-disabled cc-rounded-tr-xl cc-leading-24 cc-rounded-br-xl cc-border-l cc-border-outline-med_em cc-bg-color-black-7 cc-text-sm cc-ring-blue-400/40 focus-visible:cc-outline-none focus-visible:cc-bg-white focus-visible:cc-ring-4 focus-visible:cc-ring-ring  focus:cc-bg-surface-white cc-font-semibold"
                        placeholder="Enter URL"
                        value={urls?.[0]}
                        onChange={(e) => handleUrlChange(0, e.target.value)}
                      />
                    </div>
                    <div className="cc-hidden sm:cc-flex sm:cc-mr-4 sm:cc-w-20">
                      <div className="">
                        <button
                          className="cc-flex cc-flex-row cc-text-smxt cc-items-center cc-justify-center cc-rounded-xl cc-border cc-border-color-black-7 cc-cursor-pointer cc-px-4 cc-py-2 cc-font-bold cc-bg-surface-white  cc-text-high_em"
                          onClick={() => setInternalSteps(2)}
                        >
                          Fetch
                        </button>
                      </div>
                    </div>
                  </div>
                }
                {internalSteps === 2 && (
                  <div className="cc-border-t cc-border-outline-low_em cc-overflow-auto sm:cc-max-h-80 sm:cc-border sm:cc-rounded-xl cc-w-full">
                    <div className="cc-flex cc-justify-between cc-items-center cc-bg-surface-surface_1 sm:cc-flex">
                      <div className="cc-px-4 cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold">
                        Fetched URLs
                      </div>
                      <div className="cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold cc-text-right cc-mr-4">
                        {selectedFiles.length > 0 ? (
                          <button
                            onClick={() => setSelectedFiles([])}
                            className="cc-text-sm cc-font-semibold cc-text-outline-danger_high_em cc-items-start cc-text-left"
                          >
                            Clear selection
                          </button>
                        ) : (
                          <label className="cc-flex cc-gap-2 cc-text-sm cc-font-semibold cc-cursor-pointer">
                            <Checkbox
                              className="cc-my-0.5"
                              checked={selectedFiles.length === fileList.length}
                              onCheckedChange={() => {
                                const allFilesId = fileList.map(
                                  (item) => item.id
                                );
                                setSelectedFiles(allFilesId);
                              }}
                            />
                            Select all
                          </label>
                        )}
                      </div>
                    </div>
                    {fileList.length > 0 ? (
                      <ul className="cc-pb-10 sm:cc-px-4">
                        {fileList.map((item) => {
                          const isChecked = selectedFiles.indexOf(item.id) >= 0;

                          return (
                            <SitemapItem
                              key={item.id}
                              isChecked={isChecked}
                              item={item}
                              onSelect={() => {
                                setSelectedFiles((prev) => {
                                  if (isChecked) {
                                    return prev.filter((id) => id !== item.id);
                                  } else {
                                    return [...prev, item.id];
                                  }
                                });
                              }}
                            />
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="cc-py-4 cc-text-center cc-text-disabledtext cc-font-medium cc-text-sm">
                        No item found
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "success" && (
              <div className="cc-border cc-border-surface-surface_3 cc-p-4 cc-rounded-xl cc-w-full">
                <div className="cc-flex cc-flex-col cc-items-center cc-justify-center cc-p-4 cc-h-[300px]">
                  <div className="cc-p-2 cc-rounded-md cc-bg-surface-surface_1 cc-inline-block cc-mb-3">
                    <img
                      src={images.successIcon}
                      alt="Success"
                      className="cc-h-6 cc-w-6"
                    />
                  </div>
                  <div className="cc-text-base cc-font-semibold cc-mb-6 cc-text-center cc-max-w-[206px]">
                    Scraping request initiated successfully.
                  </div>
                  <Button
                    onClick={() => setActiveStep("INTEGRATION_LIST")}
                    size="md"
                    className="cc-px-6"
                  >
                    Got it
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {activeTab === "website" && (
          <div className="cc-border-t cc-border-color-black-7 cc-shadow-modal-footer-top cc-mt-6 cc-px-4 cc-pb-4">
            <div className="cc-mt-4 cc-mb-4 cc-full cc-text-sm cc-flex cc-justify-center cc-text-low_em cc-font-semibold">
              <img
                src={images.info_fill}
                alt="info_fill"
                className="cc-h-5 cc-w-5 cc-flex cc-mr-2"
              />
              The first 50 links per website are synced.
            </div>
            <Button
              size="md"
              className="cc-w-full"
              onClick={handleWebiteSubmit}
            >
              Submit
            </Button>
          </div>
        )}
        {activeTab === "sitemap" && (
          <>
            {urls?.[0].length > 0 && showSitemapFetchCTA && (
              <DialogFooter className="cc-flex sm:cc-hidden">
                <Button
                  variant="primary"
                  size="lg"
                  className="cc-w-full"
                  onClick={() => {
                    setInternalSteps(2);
                    setShowSitemapSubmitCTA(true);
                    setShowSitemapFetchCTA(false);
                  }}
                >
                  Fetch
                </Button>
              </DialogFooter>
            )}
            <div
              className={`${
                showSitemapSubmitCTA ? "" : "cc-hidden"
              }  cc-flex-col sm:cc-flex cc-border-t cc-border-color-black-7 cc-shadow-modal-footer-top cc-mt-2 sm:cc-mt-6 cc-px-4 cc-pb-4`}
            >
              <div className="cc-mt-4 cc-mb-4 cc-full cc-text-sm cc-flex cc-justify-center cc-text-low_em cc-font-semibold">
                <img
                  src={images.info_fill}
                  alt="info_fill"
                  className="cc-h-5 cc-w-5 cc-flex cc-mr-2"
                />
                Select a max of 50 links to sync.
              </div>
              <Button
                size="md"
                className="cc-w-full"
                onClick={handleSitemapSubmit}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
      <WebsiteFilterBottomSheet
        isOpen={showMobileWebsiteFilterBottomSheet}
        onOpenChange={setShowMobileWebsiteFilterBottomSheet}
        filterData={filterData}
        idx={0}
        handleFilterData={handleFilterData}
      />
    </>
  );
}

export default WebScraper;
