import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@components/common/design-system/Dialog";
import { emptyFunction } from "@utils/helper-functions";
import IntegrationList from "@components/IntegrationModal/IntegrationList";
import WebScraper from "@components/WebScraper/WebScraper";
import CarbonFilePicker from "@components/CarbonFilePicker/CarbonFilePicker";
import { INTEGRATIONS_LIST } from "@utils/integrationModalconstants";
import AccessKeyAuth from "@components/AccessKeyAuth/AccessKeyAuth";
import { useCarbon } from "../../context/CarbonContext";
import { BASE_URL } from "../../constants/shared";
import { IntegrationName } from "../../typing/shared";
import SystemFileUpload from "@components/SystemFileUpload/SystemFileUpload";

export interface ModalProps {
  isOpen: boolean;
  onCloseModal?: () => void;
  goToConnectModal?: () => void;
}

// todo - better types
export type IntegrationAPIResponse = {
  id: number;
  data_source_type: IntegrationName;
  data_source_external_id: string;
  files: never;
  synced_files: never[];
  sync_status: string;
  last_synced_at: Date;
  last_sync_action: string;
  source_items_synced_at: Date;
  files_synced_at: Date;
  data_source_metadata: object;
};

function IntegrationModal({
  isOpen = false,
  onCloseModal = emptyFunction,
  goToConnectModal = emptyFunction,
}: ModalProps) {
  const { orgName, accessToken, fetchTokens } = useCarbon();
  const entryPoint: string = "INTEGRATION_LIST";
  const [activeStep, setActiveStep] = useState<string | number>(entryPoint);
  const [activeIntegrations, setActiveIntegrations] = useState<
    IntegrationAPIResponse[]
  >([]);

  const { environment = "PRODUCTION", authenticatedFetch } = useCarbon();

  const fetchUserIntegrations = async () => {
    try {
      const userIntegrationsResponse = await authenticatedFetch(
        `${BASE_URL[environment]}/integrations/?${new URLSearchParams({
          include_files: "false",
        })}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${accessToken}`,
          },
        }
      );

      if (userIntegrationsResponse.status === 200) {
        const responseBody = await userIntegrationsResponse.json();
        setActiveIntegrations(responseBody["active_integrations"]);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserIntegrations();
    } else {
      fetchTokens();
    }
  }, [accessToken]);

  const showActiveContent = (activeStep: string | number) => {
    switch (activeStep) {
      case "INTEGRATION_LIST":
        return (
          <IntegrationList
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            goToConnectModal={goToConnectModal}
            onCloseModal={onCloseModal}
            activeIntegrations={activeIntegrations}
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

      case "LOCAL_FILES":
        return (
          <SystemFileUpload
            activeStepData={INTEGRATIONS_LIST.find(
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
            activeStepData={INTEGRATIONS_LIST.find(
              (item) => item.id === activeStep
            )}
            setActiveStep={setActiveStep}
            onCloseModal={onCloseModal}
            activeIntegrations={activeIntegrations}
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
