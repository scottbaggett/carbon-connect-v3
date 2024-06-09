import React, { ReactNode, useEffect, useState } from "react";
import { emptyFunction, isEmpty } from "@utils/helper-functions";
// import { toast } from "react-toastify";
// import { images } from "@assets/index";
import { Search } from "@components/Search";
import {
  integationItem,
  integrationsList,
} from "@utils/integrationModalconstants";

export interface IntegrationListProps {
  activeStep?: string;
  setActiveStep?: (stepId: string) => void;
}

function IntegrationList({
  activeStep = "",
  setActiveStep = emptyFunction,
}: IntegrationListProps) {
  const [listData, setListData] = useState<integationItem[]>(integrationsList);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    onSearchText(searchText);
  }, [searchText]);

  const onSearchText = (text: string) => {
    const matchingIntegrations = integrationsList?.filter(
      (ai) =>
        ai.name.includes(text) ||
        ai?.integrationsListViewTitle?.includes(text) ||
        ai.description.includes(text)
    );
    setListData(matchingIntegrations);
  };

  return (
    <div>
      <div className="cc-mb-4">
        <Search
          label="Search Integrations"
          searchText={searchText}
          setSearchText={setSearchText}
          onSearchText={onSearchText}
        />
      </div>
      <div className="">
        <ul className="cc-grid cc-gap-3 cc-grid-cols-3 cc-overflow-y-scroll cc-h-[50vh]">
          {!isEmpty(listData) &&
            listData.map((integration) => {
              return (
                <li
                  key={integration.id}
                  className={`cc-border cc-rounded-xl cc-h-fit cc-items-center cc-px-3 cc-py-3 ${
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
                      <div className="cc-flex  cc-items-center cc-justify-center cc-border-2 cc-rounded-md cc-border-white cc-shadow-logo cc-h-[56px] cc-w-[56px] cc-mr-3 cc-shrink-0">
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
                      <h2 className="cc-text-base cc-font-semibold cc-items-center cc-justify-center">
                        {integration.integrationsListViewTitle ||
                          integration.name}
                        {/* {integration.data_source_type === 'GOOGLE_DRIVE'
              ? 'Connect your Google Drive'
              : integration.name} */}
                      </h2>
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
    </div>
  );
}

export default IntegrationList;
