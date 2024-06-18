import React, { useState } from "react";
import CarbonConnectModal from "./components/CarbonConnectModal";
import IntegrationModal from "./components/IntegrationModal";
import "./styles.css";
import DisconnectModal from "@components/common/DisconnectModal";
import { Button } from "@components/common/design-system/Button";
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
    </CarbonProvider>
  );
};

export default App;
