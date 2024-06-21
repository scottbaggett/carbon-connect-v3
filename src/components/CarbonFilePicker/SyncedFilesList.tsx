import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RefreshIcon from "@assets/svgIcons/refresh-icon.svg";
import { Input } from "@components/common/design-system/Input";
import { Button } from "@components/common/design-system/Button";
import { DialogFooter } from "@components/common/design-system/Dialog";
import FolderIcon from "@assets/svgIcons/folder.svg";
import SearchIcon from "@assets/svgIcons/search-icon.svg";
import NoResultsIcon from "@assets/svgIcons/no-result.svg";
import AddCircleIconBlack from "@assets/svgIcons/add-circle-icon-black.svg";
import { Checkbox } from "@components/common/design-system/Checkbox";

import { useCarbon } from "../../context/CarbonContext";
import { BASE_URL, ENV } from "../../constants/shared";
import { IntegrationAPIResponse } from "../IntegrationModal";
import { UserFileApi } from "../../typing/shared";
import FileItem from "./FileItem";
import { SyncingModes } from "./CarbonFilePicker";

const PER_PAGE = 20;

export default function SyncedFilesList({
  setIsUploading,
  selectedDataSource,
  handleUploadFilesClick,
  mode,
}: {
  setIsUploading: (val: { state: boolean; percentage: number }) => void;
  selectedDataSource: IntegrationAPIResponse | null;
  handleUploadFilesClick: () => void;
  mode: SyncingModes | null;
}) {
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [serchValue, setSearchValue] = useState<string>("");
  const {
    authenticatedFetch,
    environment = ENV.PRODUCTION,
    accessToken,
  } = useCarbon();
  const [files, setFiles] = useState<UserFileApi[]>([]);
  const [hasMoreFiles, setHasMoreFiles] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [syncedFilesRefreshes, setSyncedFilesRefreshes] = useState(0);

  const getUserFiles = async (
    selectedDataSource: IntegrationAPIResponse,
    offset: number
  ) => {
    const requestBody = {
      pagination: {
        offset: offset,
        limit: PER_PAGE,
      },
      filters: {
        organization_user_data_source_id: [selectedDataSource.id],
      },
      order_by: "created_at",
      order_dir: "desc",
    };

    const userFilesResponse = await authenticatedFetch(
      `${BASE_URL[environment]}/user_files_v2`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    if (userFilesResponse.status === 200) {
      const data = await userFilesResponse.json();
      const count = data.count;
      const userFiles = data.results;
      return { count, userFiles };
    } else {
      setHasMoreFiles(false);
      return { count: null, userFiles: [] };
    }
  };

  const loadInitialData = async (
    selectedDataSource: IntegrationAPIResponse
  ) => {
    const { count, userFiles } = await getUserFiles(selectedDataSource, 0);
    setFiles([...userFiles]);
    setOffset(userFiles.length);

    if (count > userFiles.length) {
      setHasMoreFiles(true);
    } else {
      setHasMoreFiles(false);
    }
  };

  const loadMoreRows = async () => {
    if (!selectedDataSource) return;
    const { count, userFiles } = await getUserFiles(selectedDataSource, offset);
    const newFiles = [...files, ...userFiles];
    setFiles(newFiles);
    setOffset(offset + userFiles.length);

    if (count > offset + userFiles.length) {
      setHasMoreFiles(true);
    } else {
      setHasMoreFiles(false);
    }
  };

  useEffect(() => {
    if (!selectedDataSource) return;
    setOffset(0);
    setFiles([]);
    setSearchValue("");
    setHasMoreFiles(true);
    setIsLoading(true);
    loadInitialData(selectedDataSource).then(() => setIsLoading(false));
  }, [selectedDataSource?.id, syncedFilesRefreshes]);

  const filteredList = files.filter((item) =>
    item.name.toLowerCase().includes(serchValue.toLowerCase())
  );

  return (
    <>
      <div className="cc-p-4 cc-min-h-0 cc-flex-grow cc-flex cc-flex-col">
        <div className="cc-flex cc-gap-2 sm:cc-gap-3 cc-mb-3 cc-flex-col sm:cc-flex-row">
          <p className="cc-text-xl cc-font-semibold cc-flex-grow">All Files</p>
          <div className="cc-flex cc-gap-2 sm:cc-gap-3">
            <label className="cc-relative cc-flex-grow sm:cc-max-w-[220px]">
              <img
                src={SearchIcon}
                alt="Search Icon"
                className="cc-h-4 cc-w-4 cc-absolute cc-top-1/2 cc-transform -cc-translate-y-1/2 cc-left-2 cc-pointer-events-none"
              />
              <Input
                type="text"
                placeholder="Search"
                className="cc-h-8 cc-text-xs cc-pl-7"
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>
            {/* <Button
              size="sm"
              variant="neutral-white"
              className="cc-text-xs cc-rounded-xl cc-font-semibold"
            >
              View synced files
            </Button> */}
            <Button
              size="sm"
              variant="gray"
              className="cc-rounded-xl cc-shrink-0 cc-hidden sm:cc-flex"
              onClick={() => setSyncedFilesRefreshes((prev) => prev + 1)}
            >
              <img
                src={RefreshIcon}
                alt="User Plus"
                className="cc-h-[18px] cc-w-[18px] cc-shrink-0"
              />
            </Button>
            {mode ? (
              <Button
                size="sm"
                variant="neutral-white"
                className="cc-text-xs cc-rounded-xl cc-font-semibold cc-shrink-0"
                onClick={() => handleUploadFilesClick()}
              >
                <img
                  src={AddCircleIconBlack}
                  alt="Add Circle Plus"
                  className="cc-h-[14px] cc-w-[14px] cc-shrink-0"
                />
                Add more files
              </Button>
            ) : null}
          </div>
        </div>
        <div className="cc-flex cc-flex-col sm:cc-flex-row cc-text-sm cc-font-semibold cc-mb-3 cc-gap-5 sm:cc-gap-3">
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
                className="my-0.5"
                checked={
                  files.length ? selectedFiles.length === files.length : false
                }
                onCheckedChange={() => {
                  const allFilesId = files.map((item) => item.id);
                  setSelectedFiles(allFilesId);
                }}
              />
              Select all
            </label>
          )}
        </div>
        <div
          id="scrollableTarget"
          className="cc-border-t cc-flex cc-flex-col cc-border-outline-low_em cc-overflow-y-auto cc-overflow-x-hidden -cc-mx-4 cc-px-4 sm:cc-mx-0 sm:cc-px-0 cc-flex-grow sm:cc-border sm:cc-rounded-xl"
        >
          <div className="cc-bg-surface-surface_1 cc-hidden sm:cc-flex">
            <div className="cc-px-4 cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold cc-flex-grow">
              FILE NAME
            </div>
            {filteredList[0]?.sync_status && (
              <div className="cc-px-4 cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold cc-flex-grow cc-text-right sm:cc-w-[100px]">
                STATUS
              </div>
            )}
            <div className="cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold cc-shrink-0 cc-text-right sm:cc-w-[228px]">
              <p className="cc-px-4">CREATED AT</p>
            </div>
          </div>
          {!isLoading ? (
            <InfiniteScroll
              dataLength={files.length}
              next={loadMoreRows}
              hasMore={hasMoreFiles} // Replace with a condition based on your data source
              loader={<p>Loading...</p>}
              scrollableTarget="scrollableTarget"
            >
              <ul className="cc-pb-2">
                {filteredList.map((item) => {
                  const isChecked = selectedFiles.indexOf(item.id) >= 0;

                  return (
                    <FileItem
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
            </InfiniteScroll>
          ) : (
            <div className="cc-py-4 cc-px-4 cc-text-center cc-flex-grow cc-text-disabledtext cc-font-medium cc-text-sm cc-flex cc-flex-col cc-items-center cc-justify-center h-full">
              <div className="cc-p-2 cc-bg-surface-surface_2 cc-rounded-lg cc-mb-3">
                <img
                  src={NoResultsIcon}
                  alt="No results Icon"
                  className="cc-w-6 cc-shrink-0"
                />
              </div>
              <p className="cc-text-base cc-font-medium cc-mb-1 cc-max-w-[282px]">
                No matching results
              </p>
              <p className="cc-text-low_em cc-font-medium cc-max-w-[282px]">
                Try another search, or use search options to find a file by
                type, format or more.
              </p>
            </div>
          )}
        </div>
      </div>
      {selectedFiles.length > 0 && (
        <DialogFooter>
          <Button
            variant="primary"
            size="lg"
            className="cc-w-full"
            onClick={() => {
              setIsUploading({ state: true, percentage: 24 });
            }}
          >
            Upload {selectedFiles.length} files
          </Button>
        </DialogFooter>
      )}
    </>
  );
}
