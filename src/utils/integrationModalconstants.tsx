import React, { ReactNode } from "react";

import BoxLogo from "../assets/logos/box.svg";
import ConfluenceLogo from "../assets/logos/confluence.svg";
import DropboxLogo from "../assets/logos/dropbox.svg";
import FreshdeskLogo from "../assets/logos/freshdesk.svg";
import GmailLogo from "../assets/logos/gmail.svg";
import GoogleDriveLogo from "../assets/logos/google_drive.svg";
import IntercomLogo from "../assets/logos/intercom.svg";
import NotionLogo from "../assets/logos/notion.svg";
import OneDriveLogo from "../assets/logos/onedrive.svg";
import OutlookLogo from "../assets/logos/outlook.svg";
import S3Logo from "../assets/logos/s3.svg";
import SharePointLogo from "../assets/logos/sharepoint.svg";
import FileUploadIcon from "../assets/logos/file_upload.svg";
import WebScraperIcon from "../assets/logos/web_scraper.svg";
// import SlackLogo from '../assets/logos/slack.svg';
import ZendeskLogo from "../assets/logos/zendesk.svg";
import ZoteroLogo from "../assets/logos/zotero.svg";
import GitbookLogo from "../assets/logos/gitbook.svg";
import GithubLogo from "../assets/logos/github.svg";
import SalesforceLogo from "../assets/logos/salesforce.svg";

export interface IntegrationItemType {
  id: string;
  subpath: string;
  name: string;
  description: string;
  announcementName: string;
  icon: ReactNode;
  iconBgColor?: string;
  logo: any;
  active: boolean;
  data_source_type: string;
  requiresOAuth: boolean;
  multiStep?: boolean;
  integrationsListViewTitle?: string;
  additionalInfo?: string;
  online?: boolean;
}

export const integrationsList: IntegrationItemType[] = [
  {
    id: "CONFLUENCE",
    subpath: "confluence",
    name: "Confluence",
    description: "Lets your users connect their Confluence accounts to Carbon.",
    announcementName: "to connect Confluence",
    icon: <img src={ConfluenceLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: ConfluenceLogo,
    active: true,
    data_source_type: "CONFLUENCE",
    requiresOAuth: true,
    multiStep: true,
    online: true,
  },
  {
    id: "LOCAL_FILES",
    subpath: "local",
    name: "File Upload",
    description: "Lets your users upload local files to Carbon.",
    announcementName: "to upload local files",
    icon: <img src={FileUploadIcon} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: FileUploadIcon,
    active: true,
    data_source_type: "LOCAL_FILES",
    requiresOAuth: false,
    additionalInfo: "max 20MB per file",
  },
  {
    id: "WEB_SCRAPER",
    subpath: "scraper",
    name: "Web Scraper",
    description: "Lets your users Scrape websites to Carbon.",
    announcementName: "for Web Scraping",
    icon: <img src={WebScraperIcon} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: WebScraperIcon,
    active: true,
    data_source_type: "WEB_SCRAPER",
    requiresOAuth: false,
    additionalInfo: "max 50 links to sync",
  },
  {
    id: "GITHUB",
    subpath: "github",
    name: "Github",
    description: "Lets your users connect their Gitbook accounts to Carbon.",
    announcementName: "to connect Gitbook",
    icon: <img src={GithubLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: GithubLogo,
    active: true,
    data_source_type: "GITHUB",
    requiresOAuth: false,
    multiStep: true,
    online: false,
  },
  {
    id: "DROPBOX",
    subpath: "dropbox",
    name: "Dropbox",
    description: "Lets your users connect their Dropbox accounts to Carbon.",
    announcementName: "to connect Dropbox",
    icon: <img src={DropboxLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: DropboxLogo,
    active: true,
    data_source_type: "DROPBOX",
    requiresOAuth: true,
  },
  {
    id: "GOOGLE_DRIVE",
    subpath: "google",
    name: "Google Drive",
    description: "Lets your users connect their Google Drive to Carbon.",
    announcementName: "to connect Google Drive",
    icon: <img src={GoogleDriveLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: GoogleDriveLogo,
    active: true,
    data_source_type: "GOOGLE_DRIVE",
    requiresOAuth: true,
    integrationsListViewTitle: "Google Drive",
  },
  {
    id: "NOTION",
    subpath: "notion",
    name: "Notion",
    description: "Lets your users connect their Notion accounts to Carbon.",
    announcementName: "to connect Notion",
    icon: <img src={NotionLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: NotionLogo,
    active: true,
    data_source_type: "NOTION",
    requiresOAuth: true,
  },
  {
    id: "SALESFORCE",
    subpath: "salesforce",
    name: "Salesforce",
    description: "Lets your users connect their Salesforce accounts to Carbon.",
    announcementName: "to connect Salesforce",
    icon: <img src={SalesforceLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: SalesforceLogo,
    active: true,
    data_source_type: "SALESFORCE",
    requiresOAuth: true,
    multiStep: true,
  },
  {
    id: "ZENDESK",
    subpath: "zendesk",
    name: "Zendesk",
    description: "Lets your users connect their Zendesk accounts to Carbon.",
    announcementName: "to connect Zendesk",
    icon: <img src={ZendeskLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: ZendeskLogo,
    active: true,
    data_source_type: "ZENDESK",
    requiresOAuth: true,
    multiStep: true,
  },
  {
    id: "ONEDRIVE",
    subpath: "onedrive",
    name: "OneDrive",
    description: "Lets your users connect their OneDrive accounts to Carbon.",
    announcementName: "to connect OneDrive",
    icon: <img src={OneDriveLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: OneDriveLogo,
    active: true,
    data_source_type: "ONEDRIVE",
    requiresOAuth: true,
  },
  {
    id: "S3",
    subpath: "s3",
    name: "S3",
    description: "Lets your users connect their data on S3 to Carbon.",
    announcementName: "to connect S3",
    icon: <img src={S3Logo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: S3Logo,
    active: true,
    data_source_type: "S3",
    requiresOAuth: false,
    multiStep: true,
  },
  {
    id: "SHAREPOINT",
    subpath: "sharepoint",
    name: "Sharepoint",
    description: "Lets your users connect their Sharepoint accounts to Carbon.",
    announcementName: "to connect Sharepoint",
    icon: <img src={SharePointLogo} className="cc-w-7 cc-h-7" />,
    logo: SharePointLogo,
    active: true,
    data_source_type: "SHAREPOINT",
    requiresOAuth: true,
    multiStep: true,
  },
  {
    id: "GMAIL",
    subpath: "gmail",
    name: "Gmail",
    description: "Lets your users connect their Gmail to Carbon.",
    announcementName: "to connect Gmail",
    icon: <img src={GmailLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: GmailLogo,
    active: true,
    data_source_type: "GMAIL",
    requiresOAuth: true,
    integrationsListViewTitle: "Gmail",
  },
  {
    id: "FRESHDESK",
    subpath: "freshdesk",
    name: "Freshdesk",
    description: "Lets your users connect their Freshdesk accounts to Carbon.",
    announcementName: "to connect Freshdesk",
    icon: <img src={FreshdeskLogo} className="cc-w-7 cc-h-7" />,
    logo: FreshdeskLogo,
    active: true,
    data_source_type: "FRESHDESK",
    requiresOAuth: true,
    multiStep: true,
  },
  {
    id: "BOX",
    subpath: "box",
    name: "Box",
    description: "Lets your users connect their Box accounts to Carbon.",
    announcementName: "to connect Box",
    icon: <img src={BoxLogo} className="cc-w-7 cc-h-7" alt="Box Logo" />,
    iconBgColor: "gray-50",
    logo: BoxLogo,
    active: true,
    data_source_type: "BOX",
    requiresOAuth: true,
  },
  {
    id: "GITBOOK",
    subpath: "gitbook",
    name: "Gitbook",
    description: "Lets your users connect their Gitbook accounts to Carbon.",
    announcementName: "to connect Gitbook",
    icon: <img src={GitbookLogo} className="cc-w-7 cc-h-7" />,
    logo: GitbookLogo,
    active: true,
    data_source_type: "GITBOOK",
    requiresOAuth: false,
    multiStep: true,
  },
  {
    id: "INTERCOM",
    subpath: "intercom",
    name: "Intercom",
    description: "Lets your users connect their Intercom to Carbon.",
    announcementName: "to connect Intercom",
    icon: <img src={IntercomLogo} className="cc-w-7 cc-h-7" />,
    iconBgColor: "gray-50",
    logo: IntercomLogo,
    active: true,
    data_source_type: "INTERCOM",
    requiresOAuth: true,
  },
  {
    id: "OUTLOOK",
    subpath: "outlook",
    name: "Outlook",
    description: "Lets your users connect their Outlook accounts to Carbon.",
    announcementName: "to connect Outlook",
    icon: <img src={OutlookLogo} className="cc-w-7 cc-h-7" />,
    logo: OutlookLogo,
    active: true,
    data_source_type: "OUTLOOK",
    requiresOAuth: true,
  },
  {
    id: "ZOTERO",
    subpath: "zotero",
    name: "Zotero",
    description: "Lets your users connect their Zotero accounts to Carbon.",
    announcementName: "to connect Zotero",
    icon: <img src={ZoteroLogo} className="cc-w-7 cc-h-7" />,
    logo: ZoteroLogo,
    active: true,
    data_source_type: "ZOTERO",
    requiresOAuth: true,
    multiStep: false,
  },
];
