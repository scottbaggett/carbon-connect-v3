import React, { ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@components/common/Dialog";
import { emptyFunction } from "@utils/helper-functions";
import { images } from "@assets/index";
import {
  integationItem,
  integrationsList,
} from "@utils/integrationModalconstants";
import IntegrationList from "@components/IntegrationList";
import WebScraper from "@components/WebScraper";
import GithubFlow from "@components/GithubFlow";

export interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  onCloseModal?: () => void;
  goToConnectModal?: () => void;
  children?: ReactNode;
  customClassName?: string;
  wrapperId?: string;
  showCross?: boolean;
  showButtons?: boolean;
  primaryButtonDisabled?: boolean;
}

function IntegrationModal({
  isOpen = false,
  title,
  onPrimaryButtonClick = emptyFunction,
  onSecondaryButtonClick = emptyFunction,
  onCloseModal = emptyFunction,
  goToConnectModal = emptyFunction,
  customClassName = "",
}: ModalProps) {
  const entryPoint: string = "INTEGRATION_LIST";
  const [activeStep, setActiveStep] = useState<string | number>(entryPoint);
  const [listData, setListData] = useState<integationItem[]>(integrationsList);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (
      isOpen &&
      typeof window !== "undefined" &&
      typeof document !== "undefined"
    )
      document.body.classList.add("hasModal");
    return () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.body.classList.remove("hasModal");
      }
    };
  }, [isOpen]);

  useEffect(() => {
    onSearchText(searchText);
  }, [searchText]);

  const handleCloseModal = () => {
    onCloseModal();
  };

  const handlePrimaryButtonClick = () => {
    onPrimaryButtonClick();
    // handleCloseModal();
  };

  const handleSecondaryButtonClick = () => {
    onSecondaryButtonClick();
    handleCloseModal();
  };

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
    <Dialog open={isOpen}>
      <DialogContent>
        {(activeStep === "INTEGRATION_LIST" ||
          activeStep === "WEB_SCRAPER") && (
          <div
            className={`cc-bg-white cc-py-4 cc-rounded-xl cc-border cc-border-color-black-7 cc-shadow-modal  cc-max-h-[80vh] cc-w-[784px] ${customClassName}`}
          >
            <div className="cc-mb-4 cc-px-4 cc-border-b cc-border-color-black-7">
              <div className="cc-flex cc-justify-between cc-items-center cc-mb-4">
                <div className="cc-flex">
                  <div
                    className="cc-mr-3 cc-flex cc-items-center cc-justify-center cc-h-8 cc-w-8 cc-cursor-pointer"
                    onClick={goToConnectModal}
                  >
                    <img
                      src={images.backIcon}
                      alt="Back Icon"
                      className="cc-h-5 cc-w-5"
                    />
                  </div>
                  <div className="cc-text-xl cc-font-bold cc-text-high_em">
                    {title}
                  </div>
                </div>
                <div className="cc-cursor-pointer" onClick={onCloseModal}>
                  <img
                    src={images.crossIcon}
                    alt="Cross Icon"
                    className="cc-h-5 cc-w-5"
                  />
                </div>
              </div>
            </div>
            <div className="cc-px-4 ">
              {activeStep === "INTEGRATION_LIST" && (
                <IntegrationList
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}

              {activeStep === "WEB_SCRAPER" && (
                <WebScraper
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}
            </div>
          </div>
        )}
        {activeStep === "GITHUB" && (
          <GithubFlow setActiveStep={setActiveStep} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default IntegrationModal;
