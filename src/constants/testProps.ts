import React, { useState } from "react";
import { AutoSyncedSourceTypes, IntegrationName } from "../typing/shared";
import { ENV } from "./shared";

// const [showDataSourcesModal, toggleDataSourcesModal] = useState(true);

const tokenFetcher = async () => {
  return {
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6Miwib3JnYW5pemF0aW9uX2lkIjoyLCJvcmdhbml6YXRpb25fc3VwcGxpZWRfdXNlcl9pZCI6InN3YXBuaWxAY2FyYm9uLmFpIiwib3JnYW5pemF0aW9uX3VzZXJfaWQiOjIzNywiZXhwIjoxNzE4ODI0ODY1fQ.L9610LLwlIT6ohtNzudNpbxwvf_aRgWq9yojIkkgxjs",
  };
};

export const TEST_PROPS = {
  orgName: "Rubber",
  brandIcon: "/assets/images/icon-integration.png",
  tokenFetcher: tokenFetcher,
  environment: ENV.DEVELOPMENT,
  tags: {
    appType: "chatbot",
    appVersion: "1.1.1",
    appDescription: "Chatbot for Rubber",
    // appId: '378476476985508433',
  },
  maxFileSize: 100000000,
  // maxItemsPerChunk={1}
  // allowMultipleFiles={false}
  // embeddingModel={EmbeddingGenerators.OPENAI_ADA_LARGE_1024}
  generateSparseVectors: false,
  prependFilenameToChunks: true,
  maxItemsPerChunk: 1,
  // entryPoint="INTEGRATIONS_HOME"
  // showFilesTab={false}
  setPageAsBoundary: false,
  useRequestIds: true,
  parsePdfTablesWithOcr: false,
  // primaryTextColor="black"
  sendDeletionWebhooks: true,
  // showFilesTab={false}
  // fileSyncConfig={{
  //   auto_synced_data_sources: [AutoSyncedSourceTypes.ARTICLE]
  // }}
  enabledIntegrations: [
    {
      id: IntegrationName.BOX,
      showFilesTab: true,
    },
    {
      id: IntegrationName.CONFLUENCE,
      syncFilesOnConnection: true,
    },
    {
      id: IntegrationName.DROPBOX,
      setPageAsBoundary: true,
    },
    {
      id: IntegrationName.GOOGLE_DRIVE,
      useOcr: true,
      fileSyncConfig: {
        detect_audio_language: true,
        split_rows: true,
      },
    },
    {
      id: IntegrationName.INTERCOM,
      syncFilesOnConnection: true,
      fileSyncConfig: {
        auto_synced_source_types: [AutoSyncedSourceTypes.TICKET],
      },
      syncSourceItems: false,
    },
    {
      id: IntegrationName.LOCAL_FILES,
      chunkSize: 400,
      overlapSize: 20,
      // maxFileSize: 1000000000,
      allowMultipleFiles: true,
      maxFilesCount: 50,
      skipEmbeddingGeneration: false,
      prependFilenameToChunks: true,
      generateSparseVectors: false,
      maxItemsPerChunk: 2,
      setPageAsBoundary: true,
      filePickerMode: "FILES",
      sendDeletionWebhooks: true,
      allowedFileTypes: [
        {
          extension: "csv",
          skipEmbeddingGeneration: true,
        },
        {
          extension: "txt",
        },
        {
          extension: "pdf",
          useOcr: true,
        },
        {
          extension: "HTML",
        },
      ],
    },
    {
      id: IntegrationName.NOTION,
    },
    {
      id: IntegrationName.ONEDRIVE,
    },
    {
      id: IntegrationName.SHAREPOINT,
    },
    {
      id: IntegrationName.WEB_SCRAPER,
      // enableAutoSync: true,
      chunkSize: 1100,
      recursionDepth: 0,
      // maxPagesToScrape: 500,
      // embeddingModel: "COHERE_MULTILINGUAL_V3",
      // cssClassesToSkip: ["some"],
      // htmlTagsToSkip: ["script"],
      generateSparseVectors: false,
      sitemapEnabled: false,
    },
    {
      id: IntegrationName.ZENDESK,
      syncFilesOnConnection: true,
    },
    {
      id: IntegrationName.ZOTERO,
    },
    {
      id: IntegrationName.FRESHDESK,
      syncFilesOnConnection: true,
    },
    {
      id: IntegrationName.GITBOOK,
      syncFilesOnConnection: true,
      syncSourceItems: false,
    },
    {
      id: IntegrationName.GITHUB,
      syncFilesOnConnection: false,
      generateSparseVectors: true,
      skipEmbeddingGeneration: false,
      useOcr: true,
      parsePdfTablesWithOcr: true,
    },
    {
      id: IntegrationName.SALESFORCE,
      syncFilesOnConnection: false,
      setPageAsBoundary: true,
    },
    {
      id: IntegrationName.GMAIL,
      syncFilesOnConnection: false,
    },
    {
      id: IntegrationName.OUTLOOK,
      syncFilesOnConnection: false,
    },
    {
      id: IntegrationName.S3,
      syncFilesOnConnection: false,
    },
  ],
  onSuccess: (data: any) => {
    console.log("Data on Success Dropbox: ", data);
  },
  onError: (error: any) => {
    console.log("Data on Error Dropbox: ", error);
  },
  primaryBackgroundColor: "#525252",
  // entryPoint={IntegrationName.CONFLUENCE}
  //   open: showDataSourcesModal,
  //   setOpen: () => toggleDataSourcesModal(true),
};
