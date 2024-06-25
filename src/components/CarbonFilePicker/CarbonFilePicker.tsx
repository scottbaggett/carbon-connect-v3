import React, { useEffect, useState } from "react";
import {
  DialogHeader,
  DialogTitle,
} from "@components/common/design-system/Dialog";
import BackIcon from "@assets/svgIcons/back-icon.svg";
import AuthForm from "../common/AuthForm";
import FileSelector from "./FileSelector";
import RefreshIcon from "@assets/svgIcons/refresh-icon.svg";
import { Button } from "@components/common/design-system/Button";
import { IntegrationItemType } from "@utils/integrationModalconstants";
import SettingsDropdown from "@components/common/SettingsDropdown";
import AccountDropdown from "@components/common/AccountDropdown";
import { IntegrationAPIResponse } from "../IntegrationModal";
import UserPlus from "@assets/svgIcons/user-plus.svg";
import AddCircleIconWhite from "@assets/svgIcons/add-circle-icon-white.svg";
import {
  BASE_URL,
  DEFAULT_CHUNK_SIZE,
  DEFAULT_OVERLAP_SIZE,
  ENV,
  FILE_PICKER_SUPPORTED_CONNECTORS,
  onSuccessEvents,
  SYNC_FILES_ON_CONNECT,
  SYNC_SOURCE_ITEMS,
  SYNC_URL_SUPPORTED_CONNECTORS,
  TWO_STEP_CONNECTORS,
} from "../../constants/shared";
import {
  ActionType,
  IntegrationName,
  ProcessedIntegration,
} from "../../typing/shared";
import { useCarbon } from "../../context/CarbonContext";
import {
  generateRequestId,
  getConnectRequestProps,
  getDataSourceDomain,
} from "../../utils/helper-functions";
import GithubScreen from "../Screens/FreshdeskScreen";
import FreshdeskScreen from "../Screens/FreshdeskScreen";

import SourceItemsList from "./SourceItemsList";
import SyncedFilesList from "./SyncedFilesList";

export enum SyncingModes {
  FILE_PICKER = "FILE_PICKER",
  SYNC_URL = "SYNC_URL",
}

export default function CarbonFilePicker({
  activeStepData,
  setActiveStep,
  onCloseModal,
  activeIntegrations,
}: {
  activeStepData?: IntegrationItemType;
  setActiveStep: (val: string) => void;
  onCloseModal: () => void;
  activeIntegrations: IntegrationAPIResponse[];
}) {
  const carbonProps = useCarbon();
  const {
    accessToken,
    processedIntegrations,
    useRequestIds,
    setRequestIds,
    requestIds,
    authenticatedFetch,
    environment = ENV.PRODUCTION,
    entryPoint,
    onSuccess,
  } = carbonProps;

  const integrationName = activeStepData?.id;
  const [isUploading, setIsUploading] = useState<{
    state: boolean;
    percentage: number;
  }>({ state: false, percentage: 0 });
  const [step, setStep] = useState<number>(1);
  const [connectedDataSources, setConnectedDataSources] = useState<
    IntegrationAPIResponse[]
  >([]);
  const [selectedDataSource, setSelectedDataSource] =
    useState<IntegrationAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [processedIntegration, setProcessedIntegration] =
    useState<ProcessedIntegration | null>(null);
  const [showAdditionalStep, setShowAdditionalStep] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [filePickerRefreshes, setFilePickerRefreshes] = useState(0);
  const [isRevokingDataSource, setIsRevokingDataSource] = useState(false);
  const [isResyncingDataSource, setIsResyncingDataSource] = useState(false);
  const [mode, setMode] = useState<SyncingModes | null>(null);

  // if user specified that they want to use file picker or if sync url is not supported
  useEffect(() => {
    if (
      FILE_PICKER_SUPPORTED_CONNECTORS.find((c) => c == integrationName) &&
      (processedIntegration?.useCarbonFilePicker ||
        !SYNC_URL_SUPPORTED_CONNECTORS.find((c) => c == integrationName))
    ) {
      setMode(SyncingModes.FILE_PICKER);
    } else if (
      SYNC_URL_SUPPORTED_CONNECTORS.find((c) => c == integrationName)
    ) {
      setMode(SyncingModes.SYNC_URL);
    }
  });

  useEffect(() => {
    setProcessedIntegration(
      processedIntegrations?.find(
        (integration) => integration.id === integrationName
      ) || null
    );
  }, [processedIntegrations]);

  useEffect(() => {
    const connected = activeIntegrations.filter(
      (integration) => integration.data_source_type === activeStepData?.id
    );
    setConnectedDataSources(connected);

    if (selectedDataSource === null && connected.length) {
      if (connected.length === 1) {
        setSelectedDataSource(connected[0]);
      } else {
        const sorted = connected.sort((a, b) => b.id - a.id);
        setSelectedDataSource(sorted[0]);
      }
    }
    setIsLoading(false);
  }, [JSON.stringify(activeIntegrations)]);

  // show file selector by default if
  useEffect(() => {
    if (!selectedDataSource) return;
    if (
      integrationName &&
      !selectedDataSource.files_synced_at &&
      mode == SyncingModes.FILE_PICKER
    ) {
      setShowFilePicker(true);
    } else {
      setShowFilePicker(false);
    }
  }, [selectedDataSource?.id]);

  const sendOauthRequest = async (
    mode = "CONNECT",
    dataSourceId: number | null = null,
    extraParams = {}
  ) => {
    if (!processedIntegration) return;
    try {
      const oauthWindow = window.open("", "_blank");
      oauthWindow?.document.write("Loading...");

      let requestId = null;
      if (useRequestIds && processedIntegration) {
        requestId = generateRequestId(20);
        setRequestIds({
          ...requestIds,
          [processedIntegration?.data_source_type]: requestId,
        });
      }

      const requestObject = getConnectRequestProps(
        processedIntegration,
        requestId,
        {
          ...(dataSourceId && { data_source_id: dataSourceId }),
          ...extraParams,
          service: processedIntegration.data_source_type,
        },
        carbonProps
      );

      const oAuthURLResponse = await authenticatedFetch(
        `${BASE_URL[environment]}/integrations/oauth_url`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${accessToken}`,
          },
          body: JSON.stringify(requestObject),
        }
      );

      const oAuthURLResponseData = await oAuthURLResponse.json();

      if (oAuthURLResponse.status === 200) {
        // setFlag(service?.data_source_type, true);
        onSuccess &&
          onSuccess({
            status: 200,
            data: { request_id: requestId },
            integration: processedIntegration?.data_source_type,
            action: ActionType.INITIATE,
            event: ActionType.INITIATE,
          });
        if (oauthWindow)
          oauthWindow.location.href = oAuthURLResponseData.oauth_url;
      } else {
        if (oauthWindow)
          oauthWindow.document.body.innerHTML = oAuthURLResponseData.detail;
      }
    } catch (err) {
      console.error(
        "[ThirdPartyHome.js] Error in sending Oauth request: ",
        err
      );
    }
  };

  const handleAddAccountClick = async () => {
    if (!integrationName) return;
    if (TWO_STEP_CONNECTORS.indexOf(integrationName) !== -1) {
      setShowAdditionalStep(true);
      setSelectedDataSource(null);
    } else {
      // toast.info(
      //   'You will be redirected to the service to connect your account'
      // );
      await sendOauthRequest();
    }
  };

  const handleAccountChange = (id: number) => {
    const selectedAccount = connectedDataSources.find(
      (account) => account.id === id
    );

    setSelectedDataSource(selectedAccount || null);
  };

  const handleUploadFilesClick = () => {
    if (!selectedDataSource) return;
    if (mode == SyncingModes.SYNC_URL) {
      const dataSourceType = selectedDataSource.data_source_type;
      const extraParams: any = {};
      if (dataSourceType == IntegrationName.SALESFORCE) {
        extraParams.salesforce_domain = getDataSourceDomain(selectedDataSource);
      } else if (dataSourceType == IntegrationName.ZENDESK) {
        extraParams.zendesk_subdomain = getDataSourceDomain(selectedDataSource);
      } else if (dataSourceType == "CONFLUENCE") {
        extraParams.confluence_subdomain =
          getDataSourceDomain(selectedDataSource);
      } else if (dataSourceType == "SHAREPOINT") {
        const workspace = getDataSourceDomain(selectedDataSource) || "";
        const parts = workspace.split("/");
        if (parts.length == 2) {
          extraParams.microsoft_tenant = parts[0];
          extraParams.sharepoint_site_name = parts[1];
        }
      }
      sendOauthRequest("UPLOAD", selectedDataSource.id, extraParams);
    } else if (mode == SyncingModes.FILE_PICKER) {
      setShowFilePicker(!showFilePicker);
    } else {
      // toast.error("Unable to start a file sync");
    }
  };

  const revokeDataSource = async () => {
    setIsRevokingDataSource(true);
    if (!selectedDataSource) return;

    const revokeAccessResponse = await authenticatedFetch(
      `${BASE_URL[environment]}/revoke_access_token`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data_source_id: selectedDataSource.id }),
      }
    );

    if (revokeAccessResponse.status === 200) {
      // toast.success('Successfully disconnected account');
      setSelectedDataSource(null);
      setActiveStep("INTEGRATION_LIST");
    } else {
      // toast.error('Error disconnecting account');
    }
    setIsRevokingDataSource(false);
  };
  const resyncDataSource = async () => {
    if (!selectedDataSource) return;
    setIsResyncingDataSource(true);
    const requestBody = {
      data_source_id: selectedDataSource.id,
    };

    const resyncDataSourceResponse = await authenticatedFetch(
      `${BASE_URL[environment]}/integrations/items/sync`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (resyncDataSourceResponse.status === 200) {
      // toast.success("Your connection is being synced");
    } else {
      // toast.error("Error resyncing connection");
    }
    setIsResyncingDataSource(false);
  };

  if (isUploading.state) {
    return (
      <div className="cc-h-[560px] cc-flex-grow cc-flex cc-flex-col cc-items-center cc-justify-center">
        <div className="cc-relative cc-h-14 cc-w-14 cc-rounded-full cc-bg-surface-surface_2 cc-mb-3 cc-p-1">
          <div
            className="cc-absolute cc-top-0 cc-left-0 cc-right-0 cc-bottom-0 cc-rounded-full cc-transform -cc-rotate-90"
            style={{
              background: `conic-gradient(#0BABFB 0% ${isUploading.percentage}%, transparent ${isUploading.percentage}% 100%)`,
            }}
          />
          <div className="cc-h-full cc-relative cc-w-full cc-bg-white cc-rounded-full cc-flex cc-items-center cc-justify-center cc-z-10">
            <p className="cc-items-baseline cc-font-semibold cc-text-low_em cc-text-center cc-text-sm">
              {isUploading.percentage}
              <span className="cc-text-xs">%</span>
            </p>
          </div>
        </div>
        <p className="cc-text-sm cc-text-center cc-font-semibold">
          Uploading 12 files...
        </p>
      </div>
    );
  }

  return (
    <>
      <DialogHeader closeButtonClass="cc-hidden sm:cc-flex">
        <div className="cc-flex-grow cc-flex cc-gap-3 cc-items-center">
          <button
            className="cc-pr-1 cc-h-10 cc-w-auto cc-shrink-0"
            onClick={() => {
              if (!entryPoint) setActiveStep("INTEGRATIONS_HOME");
              else setActiveStep("CONNECT");
            }}
          >
            <img
              src={BackIcon}
              alt="Lock"
              className="cc-h-[18px] cc-w-[18px]"
            />
          </button>
          <div className="cc-h-8 cc-w-8 sm:cc-h-14 sm:cc-w-14 cc-shrink-0 cc-bg-surface-white cc-rounded-lg cc-p-0.5 cc-shadow-e2">
            <div className="cc-h-full cc-w-full cc-bg-gray-50 cc-flex cc-items-center cc-justify-center cc-rounded-lg">
              <img
                src={activeStepData?.logo}
                alt="Github logo"
                className="cc-h-4 cc-w-4 sm:cc-h-8 sm:cc-w-8"
              />
            </div>
          </div>
          <DialogTitle className="cc-flex-grow cc-text-left">
            {activeStepData?.name}
          </DialogTitle>
          {/* {step > 1 && ( */}
          <>
            <Button
              size="sm"
              variant="gray"
              className="cc-rounded-xl cc-shrink-0 sm:cc-hidden"
            >
              <img
                src={RefreshIcon}
                alt="User Plus"
                className="cc-h-[18px] cc-w-[18px] cc-shrink-0"
              />
            </Button>
            {!showAdditionalStep ? (
              <>
                <AccountDropdown
                  dataSources={connectedDataSources}
                  selectedDataSource={selectedDataSource}
                  handleAddAccountClick={handleAddAccountClick}
                  handleAccountChange={handleAccountChange}
                />
                <SettingsDropdown
                  revokeDataSource={revokeDataSource}
                  isRevokingDataSource={isRevokingDataSource}
                  resyncDataSource={resyncDataSource}
                  isResyncingDataSource={isResyncingDataSource}
                />{" "}
              </>
            ) : null}
          </>
        </div>
      </DialogHeader>
      {!isLoading && connectedDataSources?.length === 0 ? (
        <div className="cc-h-full cc-flex cc-flex-col cc-items-center cc-justify-center cc-p-4 sm:cc-h-[500px]">
          <div className="cc-p-2 cc-rounded-md cc-bg-surface-surface_1 cc-inline-block cc-mb-3">
            <img src={UserPlus} alt="User Plus" className="cc-h-6 cc-w-6" />
          </div>
          <div className="cc-text-base cc-font-semibold cc-mb-6 cc-text-center cc-max-w-[206px]">
            No account connected, please connect an account
          </div>
          <Button onClick={() => setStep(2)} size="md" className="cc-px-6">
            <img
              src={AddCircleIconWhite}
              alt="Add Circle Plus"
              className="cc-h-[18px] cc-w-[18px] cc-shrink-0"
            />
            Connect Account
          </Button>
        </div>
      ) : showAdditionalStep && processedIntegration ? (
        // (integrationName === 'ZENDESK' && (
        //   <ZendeskScreen
        //     buttonColor={
        //       integrationData?.branding?.header?.primaryButtonColor
        //     }
        //     labelColor={
        //       integrationData?.branding?.header?.primaryLabelColor
        //     }
        //   />
        // )) ||
        // (integrationName === 'CONFLUENCE' && (
        //   <ConfluenceScreen
        //     buttonColor={
        //       integrationData?.branding?.header?.primaryButtonColor
        //     }
        //     labelColor={
        //       integrationData?.branding?.header?.primaryLabelColor
        //     }
        //   />
        // )) ||
        // (integrationName === 'SHAREPOINT' && (
        //   <SharepointScreen
        //     buttonColor={
        //       integrationData?.branding?.header?.primaryButtonColor
        //     }
        //     labelColor={
        //       integrationData?.branding?.header?.primaryLabelColor
        //     }
        //   />
        // )) ||
        // (integrationName == 'S3' && (
        //   <S3Screen
        //     buttonColor={
        //       integrationData?.branding?.header?.primaryButtonColor
        //     }
        //     labelColor={
        //       integrationData?.branding?.header?.primaryLabelColor
        //     }
        //   />
        // )) ||
        integrationName == "FRESHDESK" && (
          <FreshdeskScreen processedIntegration={processedIntegration} />
        )
      ) : showFilePicker ? (
        <SourceItemsList
          setIsUploading={setIsUploading}
          setShowFilePicker={setShowFilePicker}
          selectedDataSource={selectedDataSource}
          processedIntegration={processedIntegration}
        />
      ) : (
        // (integrationName == 'GITBOOK' && (
        //   <GitbookScreen
        //     buttonColor={
        //       integrationData?.branding?.header?.primaryButtonColor
        //     }
        //     labelColor={
        //       integrationData?.branding?.header?.primaryLabelColor
        //     }
        //   />
        // )) ||
        // (integrationName == 'SALESFORCE' && (
        //   <SalesforceScreen
        //     buttonColor={
        //       integrationData?.branding?.header?.primaryButtonColor
        //     }
        //     labelColor={
        //       integrationData?.branding?.header?.primaryLabelColor
        //     }
        //   />
        // )) ||
        // (integrationName == 'GITHUB' && (
        //   <GithubScreen
        //     buttonColor={
        //       integrationData?.branding?.header?.primaryButtonColor
        //     }
        //     labelColor={
        //       integrationData?.branding?.header?.primaryLabelColor
        //     }
        //     activeIntegrations={activeIntegrations}
        //     setActiveStep={setActiveStep}
        //     pauseDataSourceSelection={pauseDataSourceSelection}
        //     setPauseDataSourceSelection={setPauseDataSourceSelection}
        //   />
        // ))
        <SyncedFilesList
          setIsUploading={setIsUploading}
          selectedDataSource={selectedDataSource}
          handleUploadFilesClick={handleUploadFilesClick}
          mode={mode}
        />
      )}
      {/* {step === 1 && (
        <AuthForm
          onSubmit={() => {
            setStep(2);
          }}
        />
      )} */}
      {step === 2 && (
        <FileSelector
          headName="Select repos to sync"
          navigationHeadingFirst="All Repos"
          navigationHeadingSecond="Awesome-Algorithms"
          navigationHeadingThird="Contoso Project"
          forwardMard={true}
          isAddIcon={false}
          addViewCtaText="View synced files"
          isDeleteCta={false}
          isErrorMessage={false}
          forwardMove={() => {}}
          setIsUploading={setIsUploading}
        />
      )}
    </>
  );
}
