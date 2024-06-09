import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@components/common/Dialog";
import { emptyFunction } from "@utils/helper-functions";
import IntegrationList from "@components/IntegrationList";
import WebScraper from "@components/WebScraper";
import GithubFlow from "@components/GithubFlow";

export interface ModalProps {
  isOpen: boolean;
  onCloseModal?: () => void;
  goToConnectModal?: () => void;
}

function IntegrationModal({
  isOpen = false,
  onCloseModal = emptyFunction,
  goToConnectModal = emptyFunction,
}: ModalProps) {
  const entryPoint: string = "INTEGRATION_LIST";
  const [activeStep, setActiveStep] = useState<string | number>(entryPoint);

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

  const showActiveContent = (activeStep: string | number) => {
    switch (activeStep) {
      case "INTEGRATION_LIST":
        return (
          <IntegrationList
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            goToConnectModal={goToConnectModal}
            onCloseModal={onCloseModal}
          />
        );
        break;
      case "WEB_SCRAPER":
        return (
          <WebScraper activeStep={activeStep} setActiveStep={setActiveStep} />
        );
        break;
      case "GITHUB":
        return (
          <GithubFlow
            setActiveStep={setActiveStep}
            onCloseModal={onCloseModal}
          />
        );
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>{showActiveContent(activeStep)}</DialogContent>
    </Dialog>
  );
}

export default IntegrationModal;
