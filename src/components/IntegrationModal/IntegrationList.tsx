import React, { useState } from "react";
import { emptyFunction, isEmpty } from "@utils/helper-functions";
import SearchIcon from "@assets/svgIcons/search-icon.svg";
import { integrationsList } from "@utils/integrationModalconstants";
import {
  DialogHeader,
  DialogTitle,
} from "@components/common/design-system/Dialog";
import BackIcon from "@assets/svgIcons/back-icon.svg";
import { Input } from "@components/common/design-system/Input";
import { Button } from "@components/common/design-system/Button";

export interface IntegrationListProps {
  activeStep?: string;
  setActiveStep?: (stepId: string) => void;
  onCloseModal?: () => void;
  goToConnectModal?: () => void;
}

function IntegrationList({
  activeStep = "",
  setActiveStep = emptyFunction,
  onCloseModal,
  goToConnectModal,
}: IntegrationListProps) {
  const [searchText, setSearchText] = useState<string>("");

  const listData = integrationsList?.filter(
    (ai) =>
      ai.name.includes(searchText) ||
      ai?.integrationsListViewTitle?.includes(searchText) ||
      ai.description.includes(searchText)
  );

  return (
    <>
      <DialogHeader
        className="cc-bg-white cc-border-b cc-border-outline-low_em"
        closeButtonClass="cc-hidden sm:cc-flex"
        onCloseModal={onCloseModal}
      >
        <div className="cc-flex-grow cc-flex cc-gap-3 cc-items-center">
          <Button
            variant="neutral-white"
            className="cc-pr-1 cc-h-10 cc-w-auto cc-absolute sm:cc-relative cc-p-0 cc-border-none"
            onClick={goToConnectModal}
          >
            <img
              src={BackIcon}
              alt="Lock"
              className="cc-h-[18px] cc-w-[18px]"
            />
          </Button>
          <DialogTitle className="cc-flex-grow sm:cc-text-left">
            Integration
          </DialogTitle>
        </div>
      </DialogHeader>
      <div className="cc-p-4 cc-flex-grow cc-overflow-auto">
        <div className="cc-relative cc-mb-6">
          <Input
            placeholder="Search Integrations"
            className="cc-pl-10"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="search Icon"
            className="cc-h-5 cc-w-5 cc-absolute cc-left-[14px] cc-transform -cc-translate-y-1/2 cc-top-1/2 cc-pointer-events-none"
          />
        </div>
        <ul className="cc-grid cc-grid-cols-2 cc-gap-3 sm:cc-grid-cols-3">
          {!isEmpty(listData) &&
            listData.map((integration) => {
              return (
                <li
                  key={integration.id}
                  className={`cc-border cc-rounded-xl cc-h-fit cc-items-center cc-p-2 sm:cc-p-3 cc-transition-all ${
                    !integration.active
                      ? "cc-bg-gray-200 cc-cursor-not-allowed"
                      : "cc-bg-white cc-cursor-pointer hover:cc-bg-surface-surface_1 hover:cc-border-outline-med_em"
                  }`}
                >
                  <div
                    className="cc-flex cc-flex-row cc-items-center cc-w-full cc-justify-between"
                    onClick={() => setActiveStep(integration?.id)}
                  >
                    <div className="cc-flex cc-flex-row cc-items-center cc-justify-start">
                      <div className="cc-flex cc-items-center cc-justify-center cc-border-2 cc-rounded-md cc-shadow-e2 cc-border-white cc-h-[56px] cc-w-[56px] cc-mr-3 cc-shrink-0">
                        <div
                          className={`cc-flex  cc-items-center cc-justify-center cc-h-full cc-w-full cc-rounded-md
                      ${
                        integration?.iconBgColor
                          ? "cc-bg-" + integration?.iconBgColor
                          : ""
                      }`}
                        >
                          {integration.icon}
                        </div>
                      </div>
                      <div className="cc-flex-grow">
                        <h2 className="cc-text-base cc-font-semibold cc-items-center cc-justify-center">
                          {integration.integrationsListViewTitle ||
                            integration.name}
                          {/* {integration.data_source_type === "GOOGLE_DRIVE"
                            ? "Connect your Google Drive"
                            : integration.name} */}
                        </h2>
                        <p className="cc-font-semibold cc-text-xs cc-text-low_em cc-mt-1">
                          {integration.additionalInfo}
                        </p>
                      </div>
                    </div>
                    <div className="cc-flex cc-flex-col">
                      <div className="cc-flex cc-flex-row cc-w-full cc-items-center cc-space-x-4">
                        {!integration.active && (
                          <p className="cc-text-xs cc-text-gray-600 cc-bg-white cc-px-4 cc-py-1 cc-rounded-full ">
                            Coming Soon
                          </p>
                        )}

                        {/* {integration.active && integrationStatus && (
                            <HiCheckCircle className="cc-text-green-500 cc-w-6 cc-h-6" />
                          )} */}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default IntegrationList;
