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
  DropdownMenuTrigger,
} from "@components/common/design-system/Dropdown";
import WebsiteFilterBottomSheet from "@components/common/WebsiteFilterBottomSheet";
import { DialogFooter } from "@components/common/design-system/Dialog";
import { Checkbox } from "@components/common/design-system/Checkbox";
import SuccessState from "@components/common/SuccessState";

type UrlType = {
  id: string;
  url: string;
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

export default function SitemapTabContent({
  setActiveTab,
}: {
  setActiveTab: (val: string) => void;
}) {
  const [internalStep, setInternalStep] = useState<number>(1);
  const [url, setUrl] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  if (internalStep === 3) {
    return (
      <div className="cc-flex-grow cc-p-4 cc-overflow-auto cc-flex cc-flex-col">
        <WebScraperTabs activeTab="sitemap" setActiveTab={setActiveTab} />
        <SuccessState
          heading="Scraping request initiated successfully."
          action={() => setInternalStep(1)}
        />
      </div>
    );
  }

  return (
    <>
      <div className="cc-flex-grow cc-p-4 cc-overflow-auto cc-flex cc-flex-col">
        <WebScraperTabs activeTab="sitemap" setActiveTab={setActiveTab} />
        <div
          key={0}
          className="cc-flex cc-space-x-2 cc-items-center cc-w-full cc-h-10 cc-mb-3"
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
                className="cc-w-[100px_!important] cc-pl-8 cc-rounded-r-none "
                placeholder="Enter URL"
                disabled={true}
                value="https://"
              />
            </div>
            <div className="cc-w-px cc-shrink-0 cc-bg-outline-med_em dark:cc-bg-dark-input-bg" />
            <Input
              type="text"
              className="cc-rounded-l-none"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button
            size="md"
            variant="neutral-white"
            className="cc-font-semibold cc-hidden sm:cc-flex"
            disabled={url === ""}
            onClick={() => setInternalStep(2)}
          >
            Fetch
          </Button>
        </div>
        {internalStep === 2 && (
          <div className="cc-border-t cc-flex-grow cc-border-outline-low_em cc-overflow-y-auto cc-overflow-x-hidden -cc-mx-4 sm:cc-mx-0 sm:cc-border sm:cc-rounded-xl dark:cc-border-[#FFFFFF1F]">
            <div className="cc-flex cc-justify-between cc-items-center cc-bg-surface-surface_1 sm:cc-flex dark:cc-bg-dark-border-color">
              <div className="cc-px-4 cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold dark:cc-text-dark-input-text">
                Fetched URLs
              </div>
              <div className="cc-py-2 cc-text-xs cc-text-disabledtext dark:cc-text-dark-text-white cc-capitalize cc-font-bold cc-text-right cc-mr-4">
                {selectedFiles.length === fileList.length ? (
                  <button
                    onClick={() => setSelectedFiles([])}
                    className="cc-text-sm cc-font-semibold cc-h-6 cc-text-outline-danger_high_em cc-items-start cc-text-left"
                  >
                    Clear selection
                  </button>
                ) : (
                  <label className="cc-flex cc-gap-2 cc-items-center cc-h-6 cc-text-sm cc-font-semibold cc-cursor-pointer">
                    <Checkbox
                      className="cc-my-0.5"
                      checked={selectedFiles.length === fileList.length}
                      onCheckedChange={() => {
                        const allFilesId = fileList.map((item) => item.id);
                        setSelectedFiles(allFilesId);
                      }}
                    />
                    Select all
                  </label>
                )}
              </div>
            </div>
            {fileList.length > 0 ? (
              <ul className="cc-px-4 sm:cc-px-0 sm:cc-pb-2">
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

      {internalStep === 1 && (
        <DialogFooter className="sm:cc-hidden">
          <Button
            variant="primary"
            size="lg"
            className="cc-w-full"
            disabled={url === ""}
            onClick={() => {
              setInternalStep(2);
            }}
          >
            Fetch
          </Button>
        </DialogFooter>
      )}
      {internalStep === 2 && selectedFiles.length > 0 && (
        <DialogFooter>
          <div className="cc-mb-4 cc-full cc-text-sm cc-flex cc-justify-center cc-text-low_em cc-font-semibold dark:cc-text-dark-text-white">
            <img
              src={images.info_fill}
              alt="info_fill"
              className="cc-h-5 cc-w-5 cc-flex cc-mr-2 dark:cc-invert-[1] dark:cc-hue-rotate-180"
            />
            Select a max of 50 links to sync.
          </div>
          <Button
            size="md"
            className="cc-w-full"
            onClick={() => {
              setInternalStep(3);
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      )}
    </>
  );
}

type SitemapItemProps = {
  isChecked: boolean;
  onSelect: () => void;
  item: UrlType;
};

function SitemapItem({ item, isChecked, onSelect }: SitemapItemProps) {
  return (
    <li
      key={item.id}
      onClick={onSelect}
      className="cc-flex cc-transition-all sm:cc-px-4 cc-font-semibold cc-text-high_em cc-text-sm dark:cc-text-dark-text-white dark:hover:cc-bg-[#464646] hover:cc-bg-gray-25 cc-cursor-pointer"
    >
      <div className="cc-py-3 cc-border-b cc-border-outline-base_em cc-w-full">
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
      </div>
    </li>
  );
}
