import { IntegrationName } from "../typing/shared";

export enum ENV {
  PRODUCTION = "PRODUCTION",
  DEVELOPMENT = "DEVELOPMENT",
  LOCAL = "LOCAL",
}

export const BASE_URL = {
  [ENV.PRODUCTION]: "https://api.carbon.ai",
  [ENV.DEVELOPMENT]: "https://api.dev.carbon.ai",
  [ENV.LOCAL]: "http://localhost:8000",
};

export const onSuccessEvents = {
  ADD: "ADD",
  CANCEL: "CANCEL",
  ERROR: "ERROR",
  INITIATE: "INITIATE",
  REMOVE: "REMOVE",
  UPDATE: "UPDATE",
};

export const SYNC_FILES_ON_CONNECT = true;

export const SYNC_SOURCE_ITEMS = true;

export const TWO_STEP_CONNECTORS = [
  IntegrationName.ZENDESK,
  IntegrationName.SHAREPOINT,
  IntegrationName.CONFLUENCE,
  IntegrationName.SALESFORCE,
  IntegrationName.S3,
  IntegrationName.FRESHDESK,
  IntegrationName.GITBOOK,
  IntegrationName.GITHUB,
];

export const THIRD_PARTY_CONNECTORS = [
  IntegrationName.BOX,
  IntegrationName.CONFLUENCE,
  IntegrationName.DROPBOX,
  IntegrationName.GOOGLE_DRIVE,
  IntegrationName.INTERCOM,
  IntegrationName.NOTION,
  IntegrationName.ONEDRIVE,
  IntegrationName.SHAREPOINT,
  IntegrationName.ZENDESK,
  IntegrationName.ZOTERO,
  IntegrationName.FRESHDESK,
  IntegrationName.GITBOOK,
  IntegrationName.GMAIL,
  IntegrationName.OUTLOOK,
  IntegrationName.SALESFORCE,
  IntegrationName.S3,
  IntegrationName.GITHUB,
];

// used to check if we need to generate sync/OAuth URL for syncing files
export const SYNC_URL_SUPPORTED_CONNECTORS = [
  IntegrationName.BOX,
  IntegrationName.DROPBOX,
  IntegrationName.GOOGLE_DRIVE,
  IntegrationName.INTERCOM,
  IntegrationName.NOTION,
  IntegrationName.ONEDRIVE,
  IntegrationName.SHAREPOINT,
  IntegrationName.ZENDESK,
  IntegrationName.ZOTERO,
  IntegrationName.CONFLUENCE,
  IntegrationName.SALESFORCE,
];

export const FILE_PICKER_SUPPORTED_CONNECTORS = [
  IntegrationName.BOX,
  IntegrationName.CONFLUENCE,
  IntegrationName.DROPBOX,
  IntegrationName.GOOGLE_DRIVE,
  IntegrationName.INTERCOM,
  IntegrationName.NOTION,
  IntegrationName.ONEDRIVE,
  IntegrationName.SHAREPOINT,
  IntegrationName.ZENDESK,
  IntegrationName.ZOTERO,
  IntegrationName.FRESHDESK,
  IntegrationName.GITBOOK,
  IntegrationName.SALESFORCE,
  IntegrationName.S3,
  IntegrationName.GITHUB,
];

export const LOCAL_FILE_TYPES = [
  "TEXT",
  "CSV",
  "TSV",
  "PDF",
  "DOCX",
  "PPTX",
  "XLSX",
  "MD",
  "RTF",
  "JSON",
  "HTML",
  "RAW_TEXT",
  "JPG",
  "JPEG",
  "PNG",
  "MP3",
  "MP4",
  "MP2",
  "AAC",
  "WAV",
  "FLAC",
  "PCM",
  "M4A",
  "OGG",
  "OPUS",
  "WEBM",
];

export const DEFAULT_CHUNK_SIZE = 1500;

export const DEFAULT_OVERLAP_SIZE = 20;
