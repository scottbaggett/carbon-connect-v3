import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@components/common/design-system/Dialog";
import { emptyFunction, findModifications } from "@utils/helper-functions";
import IntegrationList from "@components/IntegrationModal/IntegrationList";
import WebScraper from "@components/WebScraper/WebScraper";
import CarbonFilePicker from "@components/CarbonFilePicker/CarbonFilePicker";
import { INTEGRATIONS_LIST } from "@utils/integrationModalconstants";
import AccessKeyAuth from "@components/AccessKeyAuth/AccessKeyAuth";
import { useCarbon } from "../../context/CarbonContext";
import { BASE_URL } from "../../constants/shared";
import { ActiveStep, IntegrationName } from "../../typing/shared";
import SystemFileUpload from "@components/SystemFileUpload/SystemFileUpload";
import SyncedFilesList from "../CarbonFilePicker/SyncedFilesList";
import LocalFilesScreen from "../SystemFileUpload/LocalFilesScreen";
import CarbonConnectModal from "@components/CarbonConnectModal";

export interface ModalProps {
  isOpen: boolean;
  onCloseModal?: () => void;
  goToConnectModal?: () => void;
  activeStep: ActiveStep;
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStep>>;
  openCarbon: boolean;
  manageModalState: (modalOpenState: boolean) => void;
  primaryClick?: (step: ActiveStep) => void;
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
  data_source_metadata: any;
};

function IntegrationModal({
  isOpen = false,
  onCloseModal = emptyFunction,
  goToConnectModal = emptyFunction,
  activeStep,
  setActiveStep,
  openCarbon,
  manageModalState,
  primaryClick,
}: ModalProps) {
  const {
    orgName,
    accessToken,
    fetchTokens,
    requestIds,
    onSuccess,
    processedIntegrations,
  } = useCarbon();
  const [activeIntegrations, setActiveIntegrations] = useState<
    IntegrationAPIResponse[]
  >([]);

  const requestIdsRef = useRef(requestIds);
  const activeIntegrationsRef = useRef(activeIntegrations);

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
        if (activeIntegrations.length) {
          const integrationModifications = findModifications(
            responseBody["active_integrations"],
            activeIntegrationsRef.current,
            requestIdsRef
          );

          if (integrationModifications.length > 0) {
            for (let i = 0; i < integrationModifications.length; i++) {
              onSuccess && onSuccess(integrationModifications[i]);
            }
          }
          activeIntegrationsRef.current = responseBody["active_integrations"];
          setActiveIntegrations(responseBody["active_integrations"]);
        } else {
          setActiveIntegrations(responseBody["active_integrations"]);
        }
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

  useEffect(() => {
    if (accessToken && isOpen) {
      const intervalId = setInterval(fetchUserIntegrations, 10000);
      // Make sure to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [accessToken, isOpen]);

  useEffect(() => {
    requestIdsRef.current = requestIds || {};
  }, [requestIds]);

  useEffect(() => {
    activeIntegrationsRef.current = activeIntegrations;
  }, [activeIntegrations]);

  const showActiveContent = (activeStep: ActiveStep) => {
    switch (activeStep) {
      case "CONNECT":
        return (
          <CarbonConnectModal
            isOpen={openCarbon}
            manageModalOpenState={manageModalState}
            onPrimaryButtonClick={primaryClick}
          />
        );
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

      case IntegrationName.WEB_SCRAPER:
        return (
          <WebScraper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            onCloseModal={onCloseModal}
          />
        );

      case IntegrationName.LOCAL_FILES:
        return (
          <LocalFilesScreen
            setActiveStep={setActiveStep}
            activeStepData={INTEGRATIONS_LIST.find(
              (item) => item.id === IntegrationName.LOCAL_FILES
            )}
          />
        );
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
    <Dialog
      open={isOpen}
      onOpenChange={(modalOpenState) => manageModalState(modalOpenState)}
    >
      <DialogContent>{showActiveContent(activeStep)}</DialogContent>
    </Dialog>
  );
}

export default IntegrationModal;
