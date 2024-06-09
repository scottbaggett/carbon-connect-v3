import React, { useState } from "react";
import CarbonConnectModal from "./components/CarbonConnectModal";
import IntegrationModal from "./components/IntegrationModal";
import "./styles.css";

const App: React.FC = () => {
  const [openCarbonConnect, setOpenCarbonConnect] = useState<boolean>(true);
  const [openIntegration, setOpenIntegration] = useState<boolean>(false);

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
        onCloseModal={() => setOpenIntegration(false)}
        goToConnectModal={() => {
          setOpenCarbonConnect(true);
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
