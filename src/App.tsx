import React, { useState } from "react";
import CarbonConnectModal from "./components/CarbonConnectModal";
import IntegrationModal from "./components/IntegrationModal";
// import { ToastContainer } from "react-toastify";
// import { injectStyle as injectToastifyStyle } from "react-toastify/dist/inject-style";
import "./styles.css";

const App: React.FC = () => {
  const [openCarbonConnect, setOpenCarbonConnect] = useState<boolean>(true);
  const [openIntegration, setOpenIntegration] = useState<boolean>(false);
  const entryPoint: string = "WEB_SCRAPER";
  const [activeStep, setActiveStep] = useState<string | number>(entryPoint);

  // injectToastifyStyle();

  return (
    <>
      <CarbonConnectModal
        isOpen={openCarbonConnect}
        title=""
        onCloseModal={() => setOpenCarbonConnect(false)}
        onPrimaryButtonClick={() => {
          setOpenCarbonConnect(false);
          setOpenIntegration(true);
        }}
      />
      <IntegrationModal
        title="Integrations"
        isOpen={openIntegration}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onCloseModal={() => setOpenIntegration(false)}
        backArrowClick={() => {
          setActiveStep("INTEGRATION_LIST");
        }}
      />

      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      /> */}
    </>
  );
};

export default App;
