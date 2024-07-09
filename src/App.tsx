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

  return (
    <>
      <CarbonProvider {...finalProps}>
        <IntegrationModal />
      </CarbonProvider>
    </>
  );
};

export default CarbonConnect;
