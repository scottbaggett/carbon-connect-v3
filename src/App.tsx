import React, { useState } from "react";
import CarbonConnectModal from "./components/CarbonConnectModal";
import IntegrationModal from "./components/IntegrationModal";
import "./styles.css";

const App: React.FC = () => {
  const [openCarbonConnect, setOpenCarbonConnect] = useState<boolean>(true);
  const [openIntegration, setOpenIntegration] = useState<boolean>(false);

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
        isOpen={openIntegration}
        onCloseModal={() => setOpenIntegration(false)}
        goToConnectModal={() => {
          setOpenIntegration(false);
          setOpenCarbonConnect(true);
        }}
      />
    </>
  );
};

export default App;
