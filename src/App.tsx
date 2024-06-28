import React, { useEffect, useState } from "react";
import CarbonConnectModal from "./components/CarbonConnectModal";
import IntegrationModal from "./components/IntegrationModal";
import { useTheme } from "next-themes";
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
import { ThemeProvider } from "next-themes";

const App: React.FC<CarbonConnectProps> = (props) => {
  const [openCarbonConnect, setOpenCarbonConnect] = useState<boolean>(true);
  const [openIntegration, setOpenIntegration] = useState<boolean>(false);
  const finalProps = props.environment != ENV.PRODUCTION ? TEST_PROPS : props;
  const [activeStep, setActiveStep] = useState<ActiveStep>("CONNECT");

  const checking = useTheme();

  useEffect(() => {
    if (activeStep == "CONNECT") {
      setOpenIntegration(false);
      setOpenCarbonConnect(true);
    }
  }, [activeStep]);

  return (
    // @ts-ignore
    <ThemeProvider attribute="class" defaultTheme="system">
      <CarbonProvider {...finalProps}>
        <CarbonConnectModal
          isOpen={openCarbonConnect}
          title=""
          onCloseModal={() => setOpenCarbonConnect(false)}
          onPrimaryButtonClick={(step: ActiveStep) => {
            setOpenCarbonConnect(false);
            setActiveStep(step);
            setOpenIntegration(true);
          }}
        />
        <IntegrationModal
          isOpen={openIntegration}
          onCloseModal={() => setOpenIntegration(false)}
          goToConnectModal={() => {
            setOpenIntegration(false);
            setOpenCarbonConnect(true);
          }}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </CarbonProvider>
    </ThemeProvider>
  );
};

export default App;
