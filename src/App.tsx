import React, { useEffect, useState } from "react";
// import CarbonConnectModal from "./components/CarbonConnect";
import IntegrationModal from "./components/IntegrationModal";

import "./styles.css";
import {
  ActiveStep,
  CarbonConnectProps,
  EmbeddingGenerators,
  IntegrationName,
} from "./typing/shared";
import { CarbonProvider } from "./context/CarbonContext";
import { TEST_PROPS } from "./constants/testProps";
import { ENV } from "./constants/shared";
import "react-circular-progressbar/dist/styles.css";

const CarbonConnect: React.FC<CarbonConnectProps> = (props) => {
  const finalProps = props.environment != ENV.PRODUCTION ? TEST_PROPS : props;
  const [openCarbonConnect, setOpenCarbonConnect] = useState<boolean>(
    finalProps.open ?? false
  );
  const [openIntegration, setOpenIntegration] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<ActiveStep>("CONNECT");

  const manageModalOpenState = (modalOpenState: boolean) => {
    if (finalProps.alwaysOpen) return;
    if (!modalOpenState) {
      if (
        finalProps.entryPoint === IntegrationName.LOCAL_FILES ||
        finalProps.entryPoint === IntegrationName.WEB_SCRAPER
      )
        setActiveStep(finalProps.entryPoint);
      else setActiveStep("CONNECT");
    }
    if (finalProps.setOpen) finalProps.setOpen(modalOpenState);
    setOpenCarbonConnect(modalOpenState);
  };

  useEffect(() => {}, [activeStep]);

  useEffect(() => {
    if (!finalProps.theme) {
      const newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.querySelector("html")?.setAttribute("data-mode", newTheme);
      return;
    }
    const newMode = finalProps.theme === "dark" ? "dark" : "light";
    document.querySelector("html")?.setAttribute("data-mode", newMode);
  }, [finalProps.theme]);

  useEffect(() => {
    setOpenCarbonConnect(finalProps.open || false);
  }, [finalProps.open]);

  const handlePrimaryClick = (step: ActiveStep) => {
    setOpenCarbonConnect(false);
    setActiveStep(step);
    setOpenIntegration(true);
  };

  return (
    // @ts-ignore
    <>
      <CarbonProvider {...finalProps}>
        <IntegrationModal
          isOpen={openIntegration}
          onCloseModal={() => setOpenIntegration(false)}
          goToConnectModal={() => {
            setOpenIntegration(false);
            setOpenCarbonConnect(true);
          }}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          openCarbon={openCarbonConnect}
          manageModalState={manageModalOpenState}
          primaryClick={handlePrimaryClick}
        />
      </CarbonProvider>
    </>
  );
};

export default CarbonConnect;
