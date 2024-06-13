import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@components/common/design-system/Dialog";
import { Button } from "./design-system/Button";
import { images } from "@assets/index";
import { FilterData } from "@components/WebScraper/WebScraper";
import { Input } from "./design-system/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default function WebsiteFilterBottomSheet({
  isOpen,
  onOpenChange,
  filterData,
  idx,
  handleFilterData,
}: {
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  filterData: FilterData[];
  idx: number;
  handleFilterData: (
    idx: number,
    fieldName: keyof FilterData,
    fieldValue: number | string
  ) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="cc-h-auto sm:cc-h-fit sm:cc-max-h-[90vh] cc-top-auto  cc-gap-0 sm:cc-rounded-[20px] cc-translate-y-0 -sm:cc-translate-y-1/2 cc-bottom-0 cc-rounded-t-2xl sm:cc-bottom-auto sm:top-1/2 cc-overflow-visible"
        style={{ height: "auto" }}
      >
        <DialogClose asChild>
          <button
            className="cc-absolute -cc-top-14 cc-left-1/2 -cc-translate-x-1/2 cc-bg-white cc-rounded-xl cc-h-10 cc-w-10 cc-flex cc-items-center cc-justify-center cc-cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            <img
              src={images.crossIcon}
              alt="CrossIcon"
              className="cc-h-[18px] cc-w-[18px]"
            />
          </button>
        </DialogClose>
        <div className="cc-p-4 sm:cc-p-8">
          <div className="cc-text-xlxt cc-font-bold cc-mb-2">Filter by</div>
          <div>
            <div className="cc-py-3 cc-flex cc-justify-between cc-items-center">
              <div className="cc-flex">
                <label>
                  <input
                    type="radio"
                    name="tab"
                    checked={filterData[idx]?.filterType === "Recursion depth"}
                    onChange={() =>
                      handleFilterData(idx, "filterType", "Recursion depth")
                    }
                    className="cc-hidden"
                  />
                  <span
                    className={`cc-custom-radio cc-text-base cc-font-semibold cc-text-high_em ${
                      filterData[idx]?.filterType === "Recursion depth"
                        ? "cc-custom-radio-checked"
                        : ""
                    }`}
                  >
                    Recursion depth
                  </span>
                </label>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`cc-flex cc-items-center cc-rounded-xl cc-bg-surface-surface_2 cc-px-1 cc-py-1 cc-font-semibold cc-text-med_em hover:cc-bg-gray-50 cc-w-[51px] cc-text-xs cc-pl-2 cc-h-8`}
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {filterData[idx]?.depthValue}
                    <svg
                      className="cc-ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 10"
                      aria-hidden="true"
                      width="12"
                      height="8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 3.293a1 1 0 011.414 0L10 7.586l3.293-4.293a1 1 0 011.414 1.414l-4 5a1 1 0 01-1.414 0l-4-5a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  side={"top"}
                  className="cc-w-[92px] cc-bg-white cc-border cc-border-outline-base_em cc-rounded-xl cc-shadow-e3"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cc-flex cc-justify-between cc-font-semibold cc-py-2 cc-px-5 cc-cursor-pointer"
                      onClick={() => handleFilterData(idx, "depthValue", 1)}
                    >
                      01
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cc-flex cc-justify-between cc-font-semibold cc-py-2 cc-px-5 cc-cursor-pointer"
                      onClick={() => handleFilterData(idx, "depthValue", 2)}
                    >
                      02
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cc-flex cc-justify-between cc-font-semibold cc-py-2 cc-px-5 cc-cursor-pointer"
                      onClick={() => handleFilterData(idx, "depthValue", 3)}
                    >
                      03
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="cc-py-3 cc-flex cc-justify-between cc-items-center">
              <div className="cc-flex">
                <label>
                  <input
                    type="radio"
                    name="tab"
                    checked={
                      filterData[idx]?.filterType === "Max pages to scrape"
                    }
                    onChange={() =>
                      handleFilterData(idx, "filterType", "Max pages to scrape")
                    }
                    className="cc-hidden"
                  />
                  <span
                    className={`cc-custom-radio cc-text-base cc-font-semibold cc-text-high_em ${
                      filterData[idx]?.filterType === "Max pages to scrape"
                        ? "cc-custom-radio-checked"
                        : ""
                    }`}
                  >
                    Max pages to scrape
                  </span>
                </label>
              </div>
              <Input
                type="text"
                placeholder=""
                className="cc-h-8 cc-w-[51px] cc-text-xs cc-pl-2"
                value={filterData[idx]?.maxPages}
                onChange={(e) =>
                  handleFilterData(idx, "maxPages", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter className="p-4 sm:cc-px-8 sm:cc-pb-8 sm:cc-pt-6 cc-border-t-0">
          <Button
            variant="primary"
            size="lg"
            className="cc-w-full cc-mb-2 sm:cc-mb-5"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
