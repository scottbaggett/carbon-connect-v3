import React, { createContext, useContext, useState, useEffect } from "react";

import {
  BASE_URL,
  onSuccessEvents,
  SYNC_FILES_ON_CONNECT,
  SYNC_SOURCE_ITEMS,
} from "../constants/shared";
import {
  ActionType,
  CarbonConnectProps,
  EmbeddingGenerators,
  FilePickerMode,
  Integration,
  IntegrationName,
  ProcessedIntegration,
} from "../typing/shared";
import { INTEGRATIONS_LIST } from "../constants/integrationsList";
import { generateRequestId } from "../utils/helper-functions";

const DEFAULT_CHUNK_SIZE = 1500;
const DEFAULT_OVERLAP_SIZE = 20;

type CarbonContextValues = CarbonConnectProps & {
  accessToken?: string | null;
};

const CarbonContext: React.Context<CarbonContextValues> = createContext({
  orgName: "",
  brandIcon: "",
});

export const CarbonProvider = ({
  orgName,
  brandIcon,
  loadingIconColor = "#3B82F6",
  children,
  tokenFetcher,
  onSuccess = () => {},
  onError = () => {},
  tags = {},
  maxFileSize = 20000000,
  environment = "PRODUCTION",
  entryPoint = null,
  enabledIntegrations = [
    {
      id: IntegrationName.LOCAL_FILES,
      chunkSize: 100,
      overlapSize: 10,
      maxFileSize: 20000000,
      allowMultipleFiles: true,
      skipEmbeddingGeneration: false,
      setPageAsBoundary: false,
      filePickerMode: FilePickerMode.FILES,
      sendDeletionWebhooks: false,
      allowedFileTypes: [
        {
          extension: "csv",
        },
        {
          extension: "txt",
        },
        {
          extension: "pdf",
        },
      ],
    },
  ],
  primaryBackgroundColor = "#000000",
  primaryTextColor = "#FFFFFF",
  secondaryBackgroundColor = "#FFFFFF",
  secondaryTextColor = "#000000",
  allowMultipleFiles = false,
  open = false,
  setOpen = null,
  chunkSize = 1500,
  overlapSize = 20,
  tosURL = "https://carbon.ai/terms",
  privacyPolicyURL = "https://carbon.ai/privacy",
  alwaysOpen = false,
  navigateBackURL = null,
  backButtonText = "Go Back",
  zIndex = 1000,
  enableToasts = true,
  embeddingModel = EmbeddingGenerators.OPENAI,
  generateSparseVectors = false,
  prependFilenameToChunks = false,
  maxItemsPerChunk,
  setPageAsBoundary = false,
  showFilesTab = true,
  useRequestIds = false,
  useOcr = false,
  parsePdfTablesWithOcr = false,
  sendDeletionWebhooks = false,
  fileSyncConfig = {},
}: CarbonConnectProps) => {
  const [showModal, setShowModal] = useState(open);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [processedIntegrations, setProcessedIntegrations] = useState<
    ProcessedIntegration[]
  >([]);
  const [entryPointIntegrationObject, setEntryPointIntegrationObject] =
    useState<ProcessedIntegration | null>(null);
  const [whiteLabelingData, setWhiteLabelingData] = useState(null);
  const [activeStep, setActiveStep] = useState<string | number>(
    entryPoint === "LOCAL_FILES" || entryPoint === "WEB_SCRAPER"
      ? entryPoint
      : 0
  );

  const [requestIds, setRequestIds] = useState({});

  const manageModalOpenState = (modalOpenState: boolean) => {
    if (alwaysOpen) return;
    if (!modalOpenState) {
      if (entryPoint === "LOCAL_FILES" || entryPoint === "WEB_SCRAPER")
        setActiveStep(entryPoint);
      else setActiveStep(0);
    }
    if (setOpen) setOpen(modalOpenState);
    setShowModal(modalOpenState);
  };

  const authenticatedFetch = async (
    url: string,
    options: any = {},
    retry = true
  ): Promise<Response | undefined> => {
    try {
      const response = await fetch(url, {
        body: options.body,
        method: options.method,
        headers: options.headers,
      });

      if (response.status === 401 && retry && tokenFetcher) {
        const response = await tokenFetcher();
        setAccessToken(response?.access_token || null);

        const newOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Token ${response.access_token}`,
          },
        };

        return await authenticatedFetch(url, newOptions, false); // Passing 'false' to avoid endless loop in case refreshing the token doesn't help
      }

      return response;
    } catch (err) {
      console.error(
        `[CarbonContext.js] Error in authenticatedFetch [${url}]: `,
        err
      );
    }
  };

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const response = tokenFetcher && (await tokenFetcher());
      setAccessToken(response?.access_token || null);

      const whiteLabelingResponse = await authenticatedFetch(
        `${BASE_URL[environment]}/auth/v1/white_labeling`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${response?.access_token || null}`,
          },
        }
      );
      const whiteLabelingResponseData = await whiteLabelingResponse?.json();
      setWhiteLabelingData(whiteLabelingResponseData);
    } catch (err) {
      setError(true);
      console.error("[CarbonContext.js] Error in fetchTokens: ", err);
    }
    setLoading(false);
  };

  // todo - handle multiple data sources - this is used for white labeling
  const handleServiceOAuthFlow = async (service: ProcessedIntegration) => {
    try {
      // const alreadyActiveOAuth = getFlag(service?.data_source_type);
      // if (alreadyActiveOAuth === 'true') {
      //   toast.error(
      //     `Please finish the ${service?.data_source_type} authentication before starting another.`
      //   );
      //   return;
      // }

      const chunkSizeValue =
        service?.chunkSize || chunkSize || DEFAULT_CHUNK_SIZE;
      const overlapSizeValue =
        service?.overlapSize || overlapSize || DEFAULT_OVERLAP_SIZE;
      const skipEmbeddingGeneration = service?.skipEmbeddingGeneration || false;
      const embeddingModelValue = embeddingModel || EmbeddingGenerators.OPENAI;
      const generateSparseVectorsValue =
        service?.generateSparseVectors || generateSparseVectors || false;
      const prependFilenameToChunksValue =
        service?.prependFilenameToChunks || prependFilenameToChunks || false;
      const maxItemsPerChunkValue =
        service?.maxItemsPerChunk || maxItemsPerChunk || false;
      const syncFilesOnConnection =
        service?.syncFilesOnConnection ?? SYNC_FILES_ON_CONNECT;
      const setPageAsBoundaryValue =
        service?.setPageAsBoundary || setPageAsBoundary || false;
      const useOcrValue = service?.useOcr || useOcr || false;
      const parsePdfTablesWithOcrValue =
        service?.parsePdfTablesWithOcr || parsePdfTablesWithOcr || false;
      const syncSourceItems = service?.syncSourceItems ?? SYNC_SOURCE_ITEMS;

      let requestId = null;
      if (useRequestIds) {
        requestId = generateRequestId(20);
        setRequestIds({
          ...requestIds,
          [service?.data_source_type]: requestId,
        });
      }

      const oAuthURLResponse = await authenticatedFetch(
        `${BASE_URL[environment]}/integrations/oauth_url`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${accessToken}`,
          },
          body: JSON.stringify({
            tags: tags,
            service: service?.data_source_type,
            chunk_size: chunkSizeValue,
            chunk_overlap: overlapSizeValue,
            skip_embedding_generation: skipEmbeddingGeneration,
            embedding_model: embeddingModelValue,
            generate_sparse_vectors: generateSparseVectorsValue,
            prepend_filename_to_chunks: prependFilenameToChunksValue,
            ...(maxItemsPerChunkValue && {
              max_items_per_chunk: maxItemsPerChunkValue,
            }),
            sync_files_on_connection: syncFilesOnConnection,
            set_page_as_boundary: setPageAsBoundaryValue,
            connecting_new_account: true,
            ...(requestId && { request_id: requestId }),
            use_ocr: useOcrValue,
            parse_pdf_tables_with_ocr: parsePdfTablesWithOcrValue,
            sync_source_items: syncSourceItems,
          }),
        }
      );

      if (oAuthURLResponse?.status === 200) {
        // setFlag(service?.data_source_type, true);
        onSuccess &&
          onSuccess({
            status: 200,
            data: { request_id: requestId },
            integration: service?.data_source_type,
            action: ActionType.INITIATE,
            event: ActionType.INITIATE,
          });
        const oAuthURLResponseData = await oAuthURLResponse.json();

        window.open(oAuthURLResponseData.oauth_url, "_blank");
      }
    } catch (err) {
      console.error(
        "[CarbonContext.js] Error in handleServiceOAuthFlow: ",
        err
      );
    }
  };

  useEffect(() => {
    let tempIntegrations = [];
    // merge the integration data like logos etc with the options provided as props
    for (let i = 0; i < INTEGRATIONS_LIST.length; i++) {
      const integration = INTEGRATIONS_LIST[i];
      const integrationOptions = enabledIntegrations?.find(
        (enabledIntegration) =>
          enabledIntegration.id === integration.id && integration.active
      );
      if (!integrationOptions) continue;
      tempIntegrations.push({ ...integrationOptions, ...integration });
    }
    setProcessedIntegrations(tempIntegrations);

    if (entryPoint) {
      const obj = tempIntegrations.find(
        (integration) => integration.id === entryPoint
      );
      if (!obj) {
        const isIntegrationAvailable = INTEGRATIONS_LIST.find(
          (integration) => integration.id === entryPoint
        );
        if (isIntegrationAvailable)
          console.error(
            "Invalid entry point. Make sure that the integrations is enabled through enabledIntegrations prop."
          );
        else
          console.error(
            "Invalid entry point. Make sure that right integration id is passed."
          );
      }

      setEntryPointIntegrationObject(obj || null);
    }
  }, []);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  const contextValues = {
    accessToken,
    setAccessToken,
    fetchTokens,
    authenticatedFetch,
    enabledIntegrations,
    orgName,
    brandIcon,
    loadingIconColor,
    environment,
    entryPoint,
    tags,
    maxFileSize,
    onSuccess,
    onError,
    primaryBackgroundColor,
    primaryTextColor,
    secondaryBackgroundColor,
    secondaryTextColor,
    allowMultipleFiles,
    topLevelChunkSize: chunkSize,
    topLevelOverlapSize: overlapSize,
    processedIntegrations,
    entryPointIntegrationObject,
    defaultChunkSize: 1500,
    defaultOverlapSize: 20,
    handleServiceOAuthFlow,
    whiteLabelingData,
    tosURL,
    privacyPolicyURL,
    open,
    setOpen,
    showModal,
    setShowModal,
    alwaysOpen,
    navigateBackURL,
    manageModalOpenState,
    activeStep,
    setActiveStep,
    backButtonText,
    enableToasts,
    zIndex,
    embeddingModel,
    generateSparseVectors,
    prependFilenameToChunks,
    maxItemsPerChunk,
    setPageAsBoundary,
    showFilesTab,
    setRequestIds,
    requestIds,
    useRequestIds,
    useOcr,
    parsePdfTablesWithOcr,
    loading,
    sendDeletionWebhooks,
    fileSyncConfig,
  };

  return (
    <CarbonContext.Provider value={contextValues}>
      {children}
    </CarbonContext.Provider>
  );
};

export const useCarbon = () => {
  const context = useContext(CarbonContext);
  if (context === undefined) {
    throw new Error("useCarbon must be used within an CarbonProvider");
  }
  return context;
};

export default CarbonContext;
