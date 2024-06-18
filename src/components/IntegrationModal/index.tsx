import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@components/common/design-system/Dialog";
import { emptyFunction } from "@utils/helper-functions";
import IntegrationList from "@components/IntegrationModal/IntegrationList";
import WebScraper from "@components/WebScraper/WebScraper";
import CarbonFilePicker from "@components/CarbonFilePicker/CarbonFilePicker";
import { integrationsList } from "@utils/integrationModalconstants";
import AccessKeyAuth from "@components/AccessKeyAuth/AccessKeyAuth";
import SystemFileUpload from "@components/SystemFileUpload/SystemFileUpload";

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
          <WebScraper
            // activeStepData={integrationsList.find(
            //   (item) => item.id === activeStep
            // )}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            onCloseModal={onCloseModal}
          />
        );
        break;

      case "CONFLUENCE":
        return (
          <AccessKeyAuth
            activeStepData={integrationsList.find(
              (item) => item.id === activeStep
            )}
            setActiveStep={setActiveStep}
            onCloseModal={onCloseModal}
          />
        );
        break;
      case "LOCAL_FILES":
        return (
          <SystemFileUpload
            activeStepData={integrationsList.find(
              (item) => item.id === activeStep
            )}
            setActiveStep={setActiveStep}
            onCloseModal={onCloseModal}
          />
        );
        break;
      default:
        return (
          <CarbonFilePicker
            activeStepData={integrationsList.find(
              (item) => item.id === activeStep
            )}
            setActiveStep={setActiveStep}
            onCloseModal={onCloseModal}
          />
        );
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
