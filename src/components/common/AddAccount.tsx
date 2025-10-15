import { useState } from 'react'
import { Input } from './design-system/Input';
import SearchIcon from "@assets/svgIcons/search-icon.svg";
import { Button } from './design-system/Button';
import RefreshIcon from "@assets/svgIcons/refresh-icon.svg";
import AddCircleIconBlack from "@assets/svgIcons/add-circle-icon-black.svg";
import { Checkbox } from './design-system/Checkbox';
import { UserFileApi } from 'src/typing/shared';
import NoResultsIcon from "@assets/svgIcons/no-result.svg";

import Loader from './Loader';
import { DialogFooter } from './design-system/Dialog';
import { pluralize } from '@utils/helper-functions';

const AddAccount = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [syncedFilesRefreshes, setSyncedFilesRefreshes] = useState(0);
const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
const [filesLoading, setFilesLoading] = useState(false);
const [actionInProgress, setActionInProgress] = useState(false);



    const [files, setFiles] = useState<UserFileApi[]>([]);
  return (
    <>
    <div className="cc-p-4 cc-min-h-0 cc-flex-grow cc-flex cc-flex-col">
      <div className="cc-flex cc-gap-2 sm:cc-gap-3 cc-mb-3 cc-flex-col sm:cc-flex-row">
        <p className="cc-text-xl cc-font-semibold cc-flex-grow dark:cc-text-dark-text-white">
          My Accounts
        </p>
        <div className="cc-flex cc-gap-2 sm:cc-gap-3">
          <label className="cc-relative cc-flex-grow sm:cc-max-w-[220px]">
            <img
              src={SearchIcon}
              alt="Search Icon"
              className="dark:cc-invert-[1] dark:cc-hue-rotate-180 cc-h-4 cc-w-4 cc-absolute cc-top-1/2 cc-transform -cc-translate-y-1/2 cc-left-2 cc-pointer-events-none"
            />
            <Input
              type="text"
              placeholder="Search"
              className="cc-h-8 cc-text-xs !cc-pl-7"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </label>
      
       
          
            <Button
              size="sm"
              variant="neutral-white"
              className="cc-text-xs !cc-rounded-xl cc-font-semibold cc-shrink-0"
             
            >
              <img
                src={AddCircleIconBlack}
                alt="Add Circle Plus"
                className="cc-h-[14px] cc-w-[14px] cc-shrink-0 dark:cc-invert-[1] dark:cc-hue-rotate-180"
              />
              Add more accounts
            </Button>
          
        </div>
      </div>
      <div className="cc-flex cc-justify-end cc-flex-col sm:cc-flex-row cc-text-sm cc-font-semibold cc-mb-3 cc-gap-5 sm:cc-gap-3">
        {selectedFiles.length > 0 ? (
          <button
            onClick={() => setSelectedFiles([])}
            className="cc-text-sm cc-font-semibold cc-text-outline-danger_high_em cc-items-start cc-text-left"
          >
            Clear selection
          </button>
        ) : (
          <label className="cc-flex cc-gap-2 cc-text-sm cc-font-semibold cc-cursor-pointer dark:cc-text-dark-text-white">
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
        className=" dark:cc-border-[#FFFFFF1F] cc-border-t cc-flex cc-flex-col cc-border-outline-low_em cc-overflow-y-auto cc-overflow-x-hidden -cc-mx-4 cc-px-4 sm:cc-mx-0 sm:cc-px-0 cc-flex-grow sm:cc-border sm:cc-rounded-xl"
      >
        <div className="cc-bg-surface-surface_1 cc-hidden sm:cc-flex dark:cc-bg-dark-border-color">
          <div className="cc-px-4 cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold cc-flex-grow dark:cc-text-dark-input-text">
            ACCOUNT NAME
          </div>
        
            <div className="cc-px-4 cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold cc-flex-grow cc-text-right sm:cc-w-[100px] dark:cc-text-dark-input-text">
              STATUS
            </div>
          
          <div className="cc-py-2 cc-text-xs cc-text-disabledtext cc-capitalize cc-font-bold cc-shrink-0 cc-text-right sm:cc-w-[228px] dark:cc-text-dark-input-text">
            <p className="cc-px-4">LAST SYNC TIME</p>
          </div>
        </div>
        {filesLoading ? (
          <Loader />
        ) : !files.length ? (
          <div className="cc-py-4 cc-px-4 cc-text-center cc-flex-grow cc-text-disabledtext cc-font-medium cc-text-sm cc-flex cc-flex-col cc-items-center cc-justify-center h-full">
            <div className="cc-p-2 cc-bg-surface-surface_2 cc-rounded-lg cc-mb-3">
              <img
                src={NoResultsIcon}
                alt="No results Icon"
                className="cc-w-6 cc-shrink-0 dark:cc-invert-[1] dark:cc-hue-rotate-180"
              />
            </div>
            <p className="cc-text-base cc-font-medium cc-mb-1 cc-max-w-[282px] dark:cc-text-dark-text-white">
              No matching results
            </p>
            <p className="cc-text-low_em cc-font-medium cc-max-w-[282px] dark:cc-text-dark-text-white">
              Try another search, or use search options to find a file by
              type, format or more.
            </p>
          </div>
        ) : (
       
            <ul className="cc-pb-2">
              {/* {filteredList.map((item) => {
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
              })} */}
            </ul>
    
        )}
      </div>
    </div>
    {selectedFiles.length > 0 && (
      <DialogFooter className="cc-flex cc-justify-between md:cc-flex-col md:cc-gap-2">
        <Button
          variant="primary"
          size="lg"
          className="cc-w-[68%] md:cc-w-full"
          
          disabled={actionInProgress}
        >
          Re-sync accounts
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="cc-w-[30%] cc-bg-[#FFE0E0] cc-text-[#F03D3D] md:cc-w-full"
          
          disabled={actionInProgress}
        >
          Disconnect accounts
        </Button>
      </DialogFooter>
    )}
  </>
  )
}

export default AddAccount