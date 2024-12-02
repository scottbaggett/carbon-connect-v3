# Carbon Connect

## Setup Instructions


1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/hubbleai/carbon-connect-v3.git
   
   cd carbon-connect-v3
   
2. Install the project dependencies:
    ```bash
    npm install
    
3. Link the package using below command:
    ```bash
    npm link
    
4. Start the development server:
    ```bash
    npm run dev


5. In a new directory create a nextJS project with command:
    ```bash
    npx create-next-app@14.2.4 my-app
    
    cd my-app
    
6. Replace the `Page.tsx` code with below code snippet`:
```
"use client";

import {
  CarbonConnect,
  EmbeddingGenerators,
  IntegrationName,
  AutoSyncedSourceTypes,
} from "carbon-connect";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState<boolean>(true);

  const tokenFetcher = async () => {
    const response = await fetch(
      "https://api.dev.carbon.ai/auth/v1/access_token",
      {
        method: "GET",
        headers: {
          "customer-id": "frontend@costrings.com",
          Authorization:
            "Bearer 5e8a917c668d195618de63e3fb120c89f72be4ec3d76e23b41f235ed678a5f98",
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return {
        access_token: data.access_token,
      };
    } else {
      return { access_token: "" };
    }
  };

  return (
    <>
      <CarbonConnect
        orgName="RANDOM"
        brandIcon=""
        tokenFetcher={tokenFetcher}
        environment={"DEVELOPMENT"}
        tags={{
          appType: "chatbot",
          appVersion: "1.1.1",
          appDescription: "Chatbot for Rubber",
          // appId: '378476476985508433',
        }}
        maxFileSize={100000000}
        // allowMultipleFiles={false}
        embeddingModel={EmbeddingGenerators.OPENAI_ADA_LARGE_1024}
        generateSparseVectors={false}
        prependFilenameToChunks={true}
        // entryPoint="INTEGRATIONS_HOME"
        // showFilesTab={false}
        setPageAsBoundary={false}
        useRequestIds={true}
        parsePdfTablesWithOcr={false}
        sendDeletionWebhooks={true}
        // showFilesTab={false}
        // fileSyncConfig={{
        //   auto_synced_data_sources: [AutoSyncedSourceTypes.ARTICLE]
        // }}
        enabledIntegrations={[
          {
            id: IntegrationName.BOX,
          },
          {
            id: IntegrationName.CONFLUENCE,
            syncFilesOnConnection: false,
          },
          {
            id: IntegrationName.DROPBOX,
            setPageAsBoundary: true,
            showFilesTab: false,
          },
          {
            id: IntegrationName.GOOGLE_DRIVE,
            useOcr: true,
            fileSyncConfig: {
              detect_audio_language: true,
              split_rows: true,
            },
            useCarbonFilePicker: true,
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
            maxFilesCount: 50,
            skipEmbeddingGeneration: false,
            prependFilenameToChunks: true,
            generateSparseVectors: false,
            maxItemsPerChunk: 2,
            setPageAsBoundary: true,
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
              {
                extension: "mp3",
              },
              {
                extension: "xlsx",
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
            // sitemapEnabled: false,
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
            useCarbonFilePicker: true,
          },
          {
            id: IntegrationName.SLACK,
          },
        ]}
        onSuccess={(data: any) =>
          console.log("Data on Success Dropbox: ", data)
        }
        onError={(error: any) => console.log("Data on Error Dropbox: ", error)}
        open={open}
        setOpen={() => setOpen((prev) => !prev)}
      />
    </>
  );
}
```

7. Link carbon connect:
    ```bash
    npm link carbon-connect
    

8. Start the development server:
    ```bash
    npm run dev
    
9. Open your browser and navigate to:
    ```bash
    http://localhost:3000
    
10. To run the project next time just run command `npm run dev` in both `carbon-connect-v3` and `my-app` project directories.



