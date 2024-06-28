import React, { useState } from "react";

import { Button } from "@components/common/design-system/Button";
import { Input } from "@components/common/design-system/Input";
import { images } from "@assets/index";
import DownChevIcon from "@assets/svgIcons/down-chev-icon.svg";
import { cn } from "@components/common/design-system/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/common/design-system/Popover";
import WebScraperTabs from "./WebScraperTabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/common/design-system/Dropdown";
import WebsiteFilterBottomSheet from "@components/common/WebsiteFilterBottomSheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@components/common/design-system/Dialog";
import SuccessState from "@components/common/SuccessState";

type WebsiteListDataType = {
  url: string;
  recursionDepth: number;
  maxPageToScrape: number;
  selectedFilter: "recursionDepth" | "maxPageToScrape" | null;
};

const initialData: WebsiteListDataType = {
  url: "",
  recursionDepth: 3,
  maxPageToScrape: 40,
  selectedFilter: null,
};

export default function WebsiteTabContent({
  setActiveTab,
}: {
  setActiveTab: (val: string) => void;
}) {
  const [internalStep, setInternalStep] = useState<number>(1);
  const [websiteDataList, setWebsiteDataList] = useState<WebsiteListDataType[]>(
    [initialData]
  );

  const updateWebsiteListData = (
    index: number,
    newValues: { [key: string]: any }
  ) => {
    setWebsiteDataList((prev: WebsiteListDataType[]) => {
      const newData = [...prev];
      newData[index] = { ...prev[index], ...newValues };
      return newData;
    });
  };

  const deleteWebsiteListData = (index: number) => {
    setWebsiteDataList((prev: WebsiteListDataType[]) => {
      const newData = prev.filter((_, i) => i !== index);
      if (newData.length === 0) {
        return [initialData];
      }
      return newData;
    });
  };

  if (internalStep === 2) {
    return (
      <div className="cc-flex-grow cc-p-4 cc-overflow-auto cc-flex cc-flex-col">
        <WebScraperTabs activeTab="website" setActiveTab={setActiveTab} />
        <SuccessState
          heading="Scraping request initiated successfully."
          action={() => setInternalStep(1)}
        />
      </div>
    );
  }

  return (
    <>
      <div className="cc-flex-grow cc-p-4 cc-overflow-auto">
        <WebScraperTabs activeTab="website" setActiveTab={setActiveTab} />
        <div className="cc-pb-4 cc-flex cc-grow cc-w-full">
          <div className="cc-flex cc-flex-col cc-justify-start cc-items-start cc-w-full cc-space-y-4">
            {websiteDataList.map((websiteData, index) => (
              <div
                key={index}
                className="cc-flex cc-space-x-2 cc-items-center cc-w-full cc-h-10"
              >
                <div className="cc-flex cc-flex-1 cc-relative">
                  <div>
                    <img
                      src={images.left_icon}
                      alt="tabler_sitemap"
                      className="cc-absolute cc-top-3 cc-left-2 cc-pointer-events-none dark:cc-invert-[1] dark:cc-hue-rotate-180"
                    />
                    <Input
                      type="text"
                      className="cc-w-[100px_!important] cc-pl-8 cc-rounded-r-none"
                      placeholder="Enter URL"
                      disabled={true}
                      value="https://"
                    />
                  </div>
                  <div className="cc-w-px cc-shrink-0 cc-bg-outline-med_em dark:cc-bg-dark-input-bg " />
                  <Input
                    type="text"
                    className="cc-rounded-l-none"
                    placeholder="Enter URL"
                    value={websiteData.url}
                    onChange={(e) =>
                      updateWebsiteListData(index, { url: e.target.value })
                    }
                  />
                </div>
                <div className="cc-flex sm:cc-hidden cc-relative">
                  <MobileWebsiteUrlDropdown
                    initialData={websiteData}
                    index={index}
                    updateWebsiteListData={updateWebsiteListData}
                    deleteUrl={
                      websiteDataList.length === 1 &&
                      websiteDataList[0].url === ""
                        ? undefined
                        : () => deleteWebsiteListData(index)
                    }
                  />
                </div>
                <div className="cc-hidden sm:cc-flex cc-items-center cc-gap-3">
                  <FilterPopover
                    initialData={websiteData}
                    index={index}
                    updateWebsiteListData={updateWebsiteListData}
                  />
                  <Button
                    size="md"
                    variant="neutral-white"
                    className="cc-px-[0_!important] cc-w-10 cc-border-transparent"
                  >
                    <img
                      src={images.trash_2}
                      alt=""
                      className="cc-cursor-pointer dark:cc-invert-[1] dark:cc-hue-rotate-180"
                      onClick={() => deleteWebsiteListData(index)}
                    />
                  </Button>
                </div>
              </div>
            ))}
            {websiteDataList.length < 50 && (
              <>
                <Button
                  size="md"
                  variant="neutral-white"
                  onClick={() => {
                    setWebsiteDataList((prev) => [...prev, initialData]);
                  }}
                  className="cc-w-full cc-flex sm:cc-hidden"
                >
                  <img
                    src={images.addIcon}
                    className="cc-w-[18px] cc-h-[18px] cc-shrink-0"
                  />
                  Add
                </Button>
                <Button
                  size="lg"
                  variant="neutral-white-fix"
                  onClick={() => {
                    setWebsiteDataList((prev) => [...prev, initialData]);
                  }}
                  className="cc-w-full cc-hidden sm:cc-flex"
                >
                  <img
                    src={images.addIcon}
                    className="cc-w-5 cc-h-5 cc-shrink-0"
                  />
                  Add
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <DialogFooter>
        <div className="cc-mb-4 cc-full cc-text-sm cc-flex cc-justify-center cc-text-low_em cc-font-semibold dark:cc-text-dark-text-gray">
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
          onClick={() => {
            setInternalStep(2);
          }}
        >
          Submit
        </Button>
      </DialogFooter>
    </>
  );
}

function FilterPopover({
  initialData,
  index,
  updateWebsiteListData,
}: {
  initialData: WebsiteListDataType;
  index: number;
  updateWebsiteListData: (
    index: number,
    newValues: { [key: string]: any }
  ) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="md"
          variant="neutral-white"
          className="cc-gap-2 cc-font-semibold cc-relative"
        >
          {initialData.selectedFilter !== null && (
            <div className="cc-absolute -cc-right-0.5 -cc-top-0.5 cc-border-2 cc-border-white cc-h-2.5 cc-w-2.5 cc-rounded-full cc-bg-surface-info_main dark:cc-border-dark-bg-black "></div>
          )}
          <img
            src={images.filter}
            alt=""
            className="cc-mr-2 dark:cc-invert-[1] dark:cc-hue-rotate-180"
          />
          Configure
          <img
            src={DownChevIcon}
            alt=""
            className="dark:cc-invert-[1] dark:cc-hue-rotate-180"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="cc-p-2">
        <ConfigureForm
          initialData={initialData}
          index={index}
          updateWebsiteListData={updateWebsiteListData}
          close={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

function MobileWebsiteUrlDropdown({
  initialData,
  index,
  updateWebsiteListData,
  deleteUrl,
}: {
  initialData: WebsiteListDataType;
  index: number;
  updateWebsiteListData: (
    index: number,
    newValues: { [key: string]: any }
  ) => void;
  deleteUrl?: () => void;
}) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent
          className="cc-h-auto sm:cc-h-fit sm:cc-max-h-[90vh] cc-top-auto  cc-gap-0 sm:cc-rounded-[20px] cc-translate-y-0 -sm:cc-translate-y-1/2 cc-bottom-0 cc-rounded-t-2xl sm:cc-bottom-auto sm:top-1/2 cc-overflow-visible"
          style={{ height: "auto" }}
        >
          <DialogClose asChild>
            <Button
              size="md"
              variant="neutral-white"
              className="cc-absolute -cc-top-14 cc-left-1/2 cc-px-[0_!important] cc-w-10 -cc-translate-x-1/2"
              onClick={() => setShowDialog(false)}
            >
              <img
                src={images.crossIcon}
                alt="CrossIcon"
                className="cc-h-[18px] cc-w-[18px]"
              />
            </Button>
          </DialogClose>
          <div className="cc-p-4 flex flex-col gap-8">
            <div className="cc-text-xlxt cc-font-bold cc-mb-2">Configure</div>
            <ConfigureForm
              initialData={initialData}
              index={index}
              updateWebsiteListData={updateWebsiteListData}
              close={() => setShowDialog(false)}
              buttonVariant="primary"
            />
          </div>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <img
            src={images.menuIcon}
            alt="Menu Icon"
            className="cc-h-[18px] cc-w-[18px] cc-shrink-0"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="cc-w-48 cc-bg-white cc-border cc-border-outline-base_em cc-rounded-xl cc-shadow-e3 cc-z-30"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cc-flex cc-justify-between cc-font-semibold cc-py-2 cc-px-5 cc-cursor-pointer"
              onClick={() => setShowDialog(true)}
            >
              <span>Configure</span>
              <img
                src={images.filter}
                alt=""
                className="cc-w-[18px] cc-h-[18px]"
              />
            </DropdownMenuItem>
            {deleteUrl && <DropdownMenuSeparator />}
            {deleteUrl && (
              <DropdownMenuItem
                className="cc-flex cc-justify-between cc-font-semibold cc-py-2 cc-px-5 cc-cursor-pointer"
                onClick={deleteUrl}
              >
                <span>Delete</span>
                <img
                  src={images.trash_2}
                  alt=""
                  className="cc-w-[18px] cc-h-[18px dark:cc-invert-[1] dark:cc-hue-rotate-180"
                />
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function ConfigureForm({
  initialData,
  index,
  updateWebsiteListData,
  close,
  buttonVariant = "neutral-white",
}: {
  initialData: WebsiteListDataType;
  index: number;
  updateWebsiteListData: (
    index: number,
    newValues: { [key: string]: any }
  ) => void;
  close: () => void;
  buttonVariant?: "neutral-white" | "primary";
}) {
  const [urlData, setUrlData] = useState<WebsiteListDataType>(initialData);

  return (
    <>
      <div className="cc-flex cc-justify-between cc-items-center cc-py-2">
        <div className="cc-flex">
          <label>
            <input
              type="radio"
              name="tab"
              checked={urlData.selectedFilter === "recursionDepth"}
              onChange={() =>
                setUrlData((prev) => {
                  return {
                    ...prev,
                    selectedFilter:
                      prev.selectedFilter === "recursionDepth"
                        ? null
                        : "recursionDepth",
                  };
                })
              }
              className="cc-hidden"
            />
            <span
              className={cn(
                `dark:after:cc-bg-dark-bg-black cc-custom-radio cc-text-sm cc-font-semibold cc-text-high_em dark:cc-text-dark-text-white dark:before:cc-border-dark-text-gray `,
                urlData.selectedFilter === "recursionDepth"
                  ? "cc-custom-radio-checked"
                  : ""
              )}
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
            value={urlData.recursionDepth || 0}
            onChange={(e) => {
              setUrlData((prev) => ({
                ...prev,
                recursionDepth: parseInt(e.target.value) || 0,
                selectedFilter: "recursionDepth",
              }));
            }}
          />
        </div>
      </div>
      <div className="cc-flex cc-justify-between cc-items-center cc-py-2">
        <div className="cc-flex">
          <label>
            <input
              type="radio"
              name="tab"
              checked={urlData.selectedFilter === "maxPageToScrape"}
              onChange={() =>
                setUrlData((prev) => {
                  return {
                    ...prev,
                    selectedFilter:
                      prev.selectedFilter === "maxPageToScrape"
                        ? null
                        : "maxPageToScrape",
                  };
                })
              }
              className="cc-hidden"
            />
            <span
              className={cn(
                `cc-custom-radio cc-text-sm cc-font-semibold cc-text-high_em dark:cc-text-dark-text-white dark:before:cc-border-dark-text-gray `,
                urlData.selectedFilter === "maxPageToScrape"
                  ? "cc-custom-radio-checked"
                  : ""
              )}
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
            value={urlData.maxPageToScrape || 0}
            onChange={(e) => {
              setUrlData((prev) => ({
                ...prev,
                maxPageToScrape: parseInt(e.target.value) || 0,
                selectedFilter: "maxPageToScrape",
              }));
            }}
          />
        </div>
      </div>
      <Button
        size="md"
        variant="neutral-white-fix"
        className="cc-font-semibold cc-w-full cc-mt-3"
        onClick={() => {
          updateWebsiteListData(index, {
            recursionDepth: urlData.recursionDepth,
            maxPageToScrape: urlData.maxPageToScrape,
            selectedFilter: urlData.selectedFilter,
          });
          close();
        }}
      >
        Apply
      </Button>
    </>
  );
}
