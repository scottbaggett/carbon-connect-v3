import React, { useState } from "react";
import CarbonConnectModal from "./components/CarbonConnectModal";
import IntegrationModal from "./components/IntegrationModal";
import "./styles.css";
import { CarbonConnectProps, EmbeddingGenerators } from "./typing/shared";
import { CarbonProvider } from "./context/CarbonContext";
import { TEST_PROPS } from "./constants/testProps";
import { ENV } from "./constants/shared";

const App: React.FC<CarbonConnectProps> = (props) => {
  const [openCarbonConnect, setOpenCarbonConnect] = useState<boolean>(true);
  const [openIntegration, setOpenIntegration] = useState<boolean>(false);
  const finalProps = props.environment != ENV.PRODUCTION ? TEST_PROPS : props;

  return (
    <CarbonProvider {...finalProps}>
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
    </CarbonProvider>
  );
};

export default App;
