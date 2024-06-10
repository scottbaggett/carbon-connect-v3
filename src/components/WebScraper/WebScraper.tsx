import React, { useEffect, useRef, useState } from "react";
import { emptyFunction, isEmpty } from "@utils/helper-functions";
import { images } from "@assets/index";
import FilterDropdown from "@components/FilterDropdown";
import BackIcon from "@assets/svgIcons/back-icon.svg";
import {
  DialogHeader,
  DialogTitle,
} from "@components/common/design-system/Dialog";
import { Button } from "@components/common/design-system/Button";

export interface WebScraperProps {
  activeStep?: string;
  setActiveStep?: (stepId: string) => void;
  onCloseModal?: () => void;
}

type FilterData = {
  [key: string]: number | string;
};

function WebScraper({
  activeStep = "",
  setActiveStep = emptyFunction,
  onCloseModal,
}: WebScraperProps) {
  const [activeTab, setActiveTab] = useState<"website" | "sitemap">("website");
  const [singleTabValue, setSinglTabValue] = useState<
    "website" | "sitemap" | null
  >(null);
  const [urls, setUrls] = useState([""]); // List of URLs to be scraped.
  const [filterData, setFilterData] = useState<FilterData[]>([]);
  const [sitemapUrls, setSitemapUrls] = useState([]); // List of URLs to be scraped selected from the sitemap.

  const [areUrlsProvided, setAreUrlsProvided] = useState(false); // Flag to check if the user has provided any URLs to be scraped.
  const [areSitemapUrlsProvided, setAreSitemapUrlsProvided] = useState(false); // Flag to check if the user has provided any URLs to be scraped from the sitemap.

  const [scrapingResponse, setScrapingResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sitemapUrl, setSitemapUrl] = useState("");

  const [sitemapUrlsLoading, setSitemapUrlsLoading] = useState(false);
  const [sitemapUrlsError, setSitemapUrlsError] = useState(null);
  const [selectedUrlIds, setSelectedUrlIds] = useState([]);
  const [selectAllUrls, setSelectAllUrls] = useState(false);
  const [service, setService] = useState(null);
  const [inputUrl, setInputUrl] = useState("");
  const [filter, setFilter] = useState("");
  const [recursionDepth, setRecursionDepth] = useState<number>(3);
  const [maxPages, setMaxPages] = useState<number>(40);
  const [isDropdownOpen, setIsDropdownOpen] = useState<Record<number, boolean>>(
    {}
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddUrl = () => {
    setUrls((prevList) => [...prevList, ""]);
  };

  const handleDeleteUrl = (idx: number) => {
    setUrls((prevList) => prevList.filter((_, index) => index !== idx));
  };

  const handleFilterClick = (idx: number) => {
    setIsDropdownOpen((prevOpen) => ({ ...prevOpen, [idx]: !prevOpen[idx] }));
  };

  const handleUrlChange = (url_index: number, url: string) => {
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

  const handleSubmit = () => {
    console.log("Submitted URLs:", urls);
  };

  // const handleSitemapUrlChange = (url) => {
  //   setSitemapUrl(url);
  // };

  // const handleFetchSitemapUrls = async () => {
  //   try {
  //     if (!sitemapUrl) {
  //       toast.error("Please provide a valid sitemap URL.");
  //       return;
  //     }
  //     setSitemapUrlsLoading(true);
  //     const response = await authenticatedFetch(
  //       `${BASE_URL[environment]}/process_sitemap?url=${sitemapUrl}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Token ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const responseData = await response.json();
  //       setSitemapUrls(responseData.urls);
  //       setSitemapUrlsLoading(false);
  //     } else {
  //       throw new Error("Error fetching sitemap. Please try again.");
  //     }
  //   } catch (error) {
  //     setSitemapUrlsLoading(false);
  //     toast.error("Error fetching sitemap. Please try again.");
  //     setSitemapUrlsError("Error fetching sitemap. Please try again.");
  //   }
  // };

  const handleRemoveUrl = (url_index: number) => {
    setUrls((prevList) => {
      let newUrls = [...prevList];
      newUrls.splice(url_index, 1);
      return newUrls;
    });
  };

  const filteredUrls = urls.filter((url) => url.includes(filter));

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
      <div className="cc-text-center cc-w-full">
        <div className="cc-min-h-96  cc-p-4">
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
          {/* <div className="cc-flex cc-justify-center cc-mb-4">
        <input
          type="text"
          placeholder="https://"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="cc-flex-1 cc-p-2 cc-border cc-border-gray-300 cc-rounded"
        />
        <button
          onClick={handleAddUrl}
          className="cc-flex cc-items-center cc-px-4 cc-py-2 cc-ml-2 cc-bg-blue-500 cc-text-white cc-rounded"
        >
          <span className="cc-mr-2">Add</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cc-h-5 cc-w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 01.993.883L11 6v4h4a1 1 0 01.117 1.993L15 12h-4v4a1 1 0 01-1.993.117L9 16v-4H5a1 1 0 01-.117-1.993L5 10h4V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="cc-flex cc-justify-center cc-mb-4">
        <input
          type="text"
          placeholder="Filter URLs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="cc-flex-1 cc-p-2 cc-border cc-border-gray-300 cc-rounded"
        />
      </div>
      <div className="cc-mb-4">
        {filteredUrls.map((url, index) => (
          <div
            key={index}
            className="cc-flex cc-justify-between cc-items-center cc-bg-gray-100 cc-p-2 cc-mb-2 cc-border cc-border-gray-300 cc-rounded"
          >
            {url}
            <button
              onClick={() => handleDeleteUrl(index)}
              className="cc-text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="cc-h-5 cc-w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-.707.293L4 3H2a1 1 0 100 2h1v11a2 2 0 002 2h8a2 2 0 002-2V5h1a1 1 0 100-2h-2l-1.293-1.293A1 1 0 0014 2H6zm3 5a1 1 0 112 0v7a1 1 0 11-2 0V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div> */}
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
                        className="cc-py-2 cc-px-3 cc-flex-grow cc-text-text-disabled cc-rounded-tr-xl cc-leading-24 cc-rounded-br-xl cc-border-l cc-border-outline-med_em cc-bg-color-black-7 cc-text-sm focus:cc-outline-focus-primary  focus:cc-bg-surface-white cc-font-semibold"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => handleUrlChange(idx, e.target.value)}
                      />
                    </div>
                    <div className="cc-mr-4">
                      <div className="cc-relative cc-p-4">
                        <div
                          className="cc-relative cc-inline-block"
                          ref={dropdownRef}
                        >
                          <button
                            type="button"
                            className="cc-flex cc-justify-center cc-items-center cc-rounded-xl cc-w-[130px] cc-bg-white cc-px-3 cc-py-2 cc-text-sm cc-font-medium cc-text-gray-700 hover:cc-bg-gray-50"
                            onClick={() => handleFilterClick(idx)}
                            style={{ width: "140px" }}
                          >
                            <img
                              src={images.filter}
                              alt=""
                              className="cc-mr-3"
                            />
                            Filter by
                            <svg
                              className="cc-ml-2 cc-h-5 cc-w-5"
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
                          {isDropdownOpen[idx] && (
                            <div className="cc-absolute cc-right-0 cc-mt-2 cc-w-296 cc-z-10">
                              <div className="cc-px-2 cc-py-2 cc-shadow-dropdown cc-border cc-rounded-xl cc-bg-white cc-border-color-black-7">
                                <div className="cc-py-4 cc-px-4 cc-flex cc-justify-between cc-items-center">
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
                                  <FilterDropdown
                                    options={[
                                      { label: "03", value: 3 },
                                      { label: "04", value: 4 },
                                      { label: "05", value: 5 },
                                    ]}
                                    selectedOption={filterData[idx]?.depthValue}
                                    onSelect={(value) =>
                                      handleFilterData(idx, "depthValue", value)
                                    }
                                    width={"11"}
                                  />
                                </div>
                                <div className="cc-py-4 cc-px-4 cc-flex cc-justify-between cc-items-center">
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
                                  <FilterDropdown
                                    options={[
                                      { label: "40", value: 40 },
                                      { label: "50", value: 50 },
                                      { label: "60", value: 60 },
                                    ]}
                                    selectedOption={filterData[idx]?.maxPages}
                                    onSelect={(value) =>
                                      handleFilterData(idx, "maxPages", value)
                                    }
                                    width={"11"}
                                  />
                                </div>
                                <button
                                  className="cc-flex cc-flex-row cc-w-full cc-items-center cc-justify-center cc-rounded-md cc-cursor-pointer cc-px-4 cc-py-2 cc-text-base cc-font-extrabold cc-bg-surface-white cc-border cc-border-color-black-7 cc-text-high_em cc-mt-4"
                                  onClick={() => {
                                    setIsDropdownOpen({});
                                  }}
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <img
                        src={images.trash_2}
                        alt=""
                        className="cc-cursor-pointer"
                        onClick={() => handleDeleteUrl(idx)}
                      />
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
                <div
                  key={0}
                  className="cc-flex cc-space-x-2 cc-items-center cc-w-full cc-h-10 cc-mb-6"
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
                      className="cc-py-2 cc-px-3 cc-flex-grow cc-text-text-disabled cc-rounded-tr-xl cc-leading-24 cc-rounded-br-xl cc-border-l cc-border-outline-med_em cc-bg-color-black-7 cc-text-sm focus:cc-outline-focus-primary  focus:cc-bg-surface-white cc-font-semibold"
                      placeholder="Enter URL"
                      value={urls?.[0]}
                      onChange={(e) => handleUrlChange(0, e.target.value)}
                    />
                  </div>
                  <div className="cc-mr-4 cc-w-20">
                    <div className="">
                      <button className="cc-flex cc-flex-row cc-text-smxt cc-items-center cc-justify-center cc-rounded-xl cc-border cc-border-color-black-7 cc-cursor-pointer cc-px-4 cc-py-2 cc-font-bold cc-bg-surface-white  cc-text-high_em">
                        Fetch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* {activeTab === 'sitemap' && (
              <div className="cc-flex cc-flex-col cc-justify-start cc-h-full cc-items-start cc-w-full cc-space-y-4">
                <div className="cc-flex cc-space-x-2 cc-items-center cc-w-full cc-h-10">
                  <input
                    type="text"
                    className="cc-p-2 cc-flex-grow cc-text-gray-700 cc-text-sm cc-border-4 cc-border-gray-400"
                    style={{ borderRadius: '0.375rem' }}
                    placeholder="Enter Sitemap URL"
                    value={sitemapUrl}
                    onChange={(e) => handleSitemapUrlChange(e.target.value)}
                  />
                  <div
                    className="cc-text-sm cc-border cc-border-gray-400 cc-w-14 cc-h-10 cc-p-2 cc-cursor-pointer cc-items-center"
                    onClick={handleFetchSitemapUrls}
                    style={{
                      backgroundColor: fetchButtonHoveredState
                        ? darkenColor(primaryBackgroundColor, -10)
                        : primaryBackgroundColor,
                      color: primaryTextColor,
                      borderRadius: '0.375rem',
                    }}
                    onMouseEnter={() => setFetchButtonHoveredState(true)}
                    onMouseLeave={() => setFetchButtonHoveredState(false)}
                  >
                    Fetch
                  </div>
                </div>

                <div className="cc-w-full cc-h-70 cc-overflow-y-auto">
                  {sitemapUrlsLoading && (
                    <div className="cc-h-full cc-w-full cc-items-center cc-justify-center cc-flex">
                      <BiLoaderAlt className="cc-animate-spin cc-text-5xl" />
                    </div>
                  )}
                  {sitemapUrlsError && (
                    <div className="cc-h-full cc-w-full cc-items-center cc-justify-center cc-flex cc-flex-col cc-pt-8">
                      <div className="cc-flex cc-w-full">
                        <HiXCircle className="cc-text-red-500 cc-w-6 cc-h-6" />
                        <p className="cc-text-center">{sitemapUrlsError}</p>
                      </div>
                    </div>
                  )}
                  {sitemapUrls.length > 0 && (
                    <>
                      <div className="cc-flex cc-flex-row cc-items-center cc-w-full cc-h-10 cc-p-2 cc-bg-gray-200 cc-space-x-2">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            // const service = processedIntegrations.find(
                            //   (integration) => integration.id === 'WEB_SCRAPER'
                            // );
                            const maxPagesToScrape =
                              service?.maxPagesToScrape ||
                              DEFAULT_MAX_PAGES_TO_SCRAPE;
                            if (e.target.checked) {
                              if (sitemapUrls.length > maxPagesToScrape) {
                                toast.error(
                                  `You can select a maximum of ${maxPagesToScrape} URLs.`
                                );
                                return;
                              }
                              setSelectAllUrls(true);
                              setSelectedUrlIds(
                                sitemapUrls.map((url, idx) => idx)
                              );
                            } else {
                              setSelectAllUrls(false);
                              setSelectedUrlIds([]);
                            }
                          }}
                          checked={selectAllUrls}
                        />
                        <p className="cc-text-sm cc-text-gray-700 cc-font-bold cc-w-full">
                          URLs
                        </p>
                      </div>
                      <div className="cc-flex cc-flex-col cc-justify-start cc-h-64 cc-items-start cc-w-full cc-space-y-4">
                        {sitemapUrls.map((url, idx) => (
                          <div
                            key={idx}
                            className="cc-flex cc-space-x-2 cc-items-center cc-w-full cc-h-10 cc-p-2"
                          >
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUrlIds((prevList) => [
                                    ...prevList,
                                    idx,
                                  ]);
                                } else {
                                  setSelectedUrlIds((prevList) => {
                                    let newIdsList = [...prevList];
                                    newIdsList.splice(
                                      newIdsList.indexOf(idx),
                                      1
                                    );
                                    setSelectAllUrls(false);
                                    return newIdsList;
                                  });
                                }
                              }}
                              checked={selectedUrlIds.includes(idx)}
                            />
                            <p className="cc-text-sm cc-text-gray-700">{url}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )} */}
          </div>
        </div>
        <div className="cc-border-t cc-border-color-black-7 cc-shadow-modal-footer-top cc-mt-6 cc-px-4 cc-pb-4">
          <div className="cc-mt-4 cc-mb-4 cc-full cc-text-sm cc-flex cc-justify-center cc-text-low_em cc-font-semibold">
            <img
              src={images.info_fill}
              alt="info_fill"
              className="cc-h-5 cc-w-5 cc-flex cc-mr-2"
            />
            The first 50 links per website are synced.
          </div>
          <Button size="md" className="cc-w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default WebScraper;
