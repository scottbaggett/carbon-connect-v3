import React from "react";

import zoteroLogoPng from "../zotero.png";

import BoxLogo from "../assets/logos/box.svg";
import ConfluenceLogo from "../assets/logos/confluence.svg";
import DropboxLogo from "../assets/logos/dropbox.svg";
// import GmailLogo from '../assets/logos/gmail.svg';
import GoogleDriveLogo from "../assets/logos/google_drive.svg";
import IntercomLogo from "../assets/logos/intercom.svg";
import NotionLogo from "../assets/logos/notion.svg";
import OneDriveLogo from "../assets/logos/onedrive.svg";
import SharePointLogo from "../assets/logos/sharepoint.svg";
import FileUploadIcon from "../assets/logos/file_upload.svg";
import WebScraperIcon from "../assets/logos/web_scraper.svg";
// import SlackLogo from '../assets/logos/slack.svg';
import ZendeskLogo from "../assets/logos/zendesk.svg";
import ZoteroLogo from "../assets/logos/zotero.svg";
import S3Logo from "../assets/logos/s3.svg";
import FreshdeskLogo from "../assets/logos/freshdesk.svg";
import GmailLogo from "../assets/logos/gmail.svg";
import GitbookLogo from "../assets/logos/gitbook.svg";
import GithubLogo from "../assets/logos/github.svg";
import SalesforceLogo from "../assets/logos/salesforce.svg";
import OutlookLogo from "../assets/logos/outlook.svg";
import { Integration, IntegrationName } from "../typing/shared";

export type IntegrationData = {
  id: IntegrationName;
  subpath: string;
  name: string;
  description: string;
  announcementName: string;
  // icon: <BsDropbox className="cc-w-7 cc-h-7" />,
  logo: string;
  active: boolean;
  data_source_type: IntegrationName;
  requiresOAuth: boolean;
  multiStep: boolean;
  integrationsListViewTitle?: string;
  branding: {
    header: {
      primaryBackgroundColor: string;
      primaryButtonColor: string;
      primaryLabelColor: string;
      primaryTextColor: string;
      secondaryTextColor: string;
    };
  };
};

export const INTEGRATIONS_LIST: IntegrationData[] = [
  {
    id: IntegrationName.BOX,
    subpath: "box",
    name: "Box",
    description: "Connect your Box account",
    announcementName: "to connect Box",
    // icon: <SiBox className="cc-w-7 cc-h-7" />,
    logo: BoxLogo,
    active: true,
    data_source_type: IntegrationName.BOX,
    requiresOAuth: true,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#d1f2ff",
        primaryButtonColor: "#04adef",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.CONFLUENCE,
    subpath: "confluence",
    name: "Confluence",
    description: "Connect your Confluence account",
    announcementName: "to connect Confluence",
    // icon: <SiConfluence className="cc-w-7 cc-h-7" />,
    logo: ConfluenceLogo,
    active: true,
    data_source_type: IntegrationName.CONFLUENCE,
    requiresOAuth: true,
    multiStep: true,
    branding: {
      header: {
        primaryBackgroundColor: "#d6e7ff",
        primaryButtonColor: "#2381fc",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.DROPBOX,
    subpath: "dropbox",
    name: "Dropbox",
    description: "Connect your Dropbox account",
    announcementName: "to connect Dropbox",
    // icon: <BsDropbox className="cc-w-7 cc-h-7" />,
    logo: DropboxLogo,
    active: true,
    data_source_type: IntegrationName.DROPBOX,
    requiresOAuth: true,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#d6ecfc",
        primaryButtonColor: "#007ee5",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.FRESHDESK,
    subpath: "freshdesk",
    name: "Freshdesk",
    description:
      "Lets your users connect their Freshdesk accounts to Carbon. And then",
    announcementName: "to connect Freshdesk",
    // icon: <img src={FreshdeskLogo} className="cc-w-7 cc-h-7" />,
    logo: FreshdeskLogo,
    active: true,
    data_source_type: IntegrationName.FRESHDESK,
    requiresOAuth: true,
    multiStep: true,
    branding: {
      header: {
        primaryBackgroundColor: "#d6ecfc",
        primaryButtonColor: "#007ee5",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.LOCAL_FILES,
    subpath: "local",
    name: "File Upload",
    description: "Upload files from your computer",
    announcementName: "to upload local files",
    // icon: <BsCloudUpload className="cc-w-7 cc-h-7" />,
    logo: FileUploadIcon,
    active: true,
    data_source_type: IntegrationName.LOCAL_FILES,
    requiresOAuth: false,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#dadfe8",
        primaryButtonColor: "#000000",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",
      },
    },
  },
  {
    id: IntegrationName.GITBOOK,
    subpath: "gitbook",
    name: "Gitbook",
    description: "Lets your users connect their Gitbook accounts to Carbon.",
    announcementName: "to connect Gitbook",
    // icon: <img src={GitbookLogo} className="cc-w-7 cc-h-7" />,
    logo: GitbookLogo,
    active: true,
    data_source_type: IntegrationName.GITBOOK,
    requiresOAuth: false,
    multiStep: true,
    branding: {
      header: {
        primaryBackgroundColor: "#dadfe8",
        primaryButtonColor: "#000000",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",
      },
    },
  },
  {
    id: IntegrationName.GITHUB,
    subpath: "github",
    name: "Github",
    description: "Lets your users connect their Github accounts to Carbon.",
    announcementName: "to connect Github",
    // icon: <img src={GithubLogo} className="cc-w-7 cc-h-7" />,
    logo: GithubLogo,
    active: true,
    data_source_type: IntegrationName.GITHUB,
    requiresOAuth: false,
    multiStep: true,
    branding: {
      header: {
        primaryBackgroundColor: "#dadfe8",
        primaryButtonColor: "#000000",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",
      },
    },
  },
  {
    id: IntegrationName.GMAIL,
    subpath: "gmail",
    name: "Gmail",
    description: "Lets your users connect their Gmail to Carbon.",
    announcementName: "to connect Gmail",
    // icon: <img src={GmailLogo} className="cc-w-7 cc-h-7" />,
    logo: GmailLogo,
    active: true,
    data_source_type: IntegrationName.GMAIL,
    requiresOAuth: true,
    multiStep: false,
    integrationsListViewTitle: "Connect your Gmail",
    branding: {
      header: {
        primaryBackgroundColor: "#dadfe8",
        primaryButtonColor: "#000000",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",
      },
    },
  },
  {
    id: IntegrationName.GOOGLE_DRIVE,
    subpath: "google",
    name: "Google Drive",
    description: "Connect your Google Drive account",
    announcementName: "to connect Google Drive",
    // icon: <FcGoogle className="cc-w-7 cc-h-7" />,
    logo: GoogleDriveLogo,
    active: true,
    data_source_type: IntegrationName.GOOGLE_DRIVE,
    requiresOAuth: true,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#c9ddff",
        primaryButtonColor: "#3777e3",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.INTERCOM,
    subpath: "intercom",
    name: "Intercom",
    description: "Connect your Intercom account",
    announcementName: "to connect Intercom",
    // icon: <FaIntercom className="cc-w-7 cc-h-7" />,
    logo: IntercomLogo,
    active: true,
    data_source_type: IntegrationName.INTERCOM,
    requiresOAuth: true,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#d6ecfc",
        primaryButtonColor: "#007ee5",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.NOTION,
    subpath: "notion",
    name: "Notion",
    description: "Connect your Notion accounts",
    announcementName: "to connect Notion",
    // icon: <RxNotionLogo className="cc-w-7 cc-h-7" />,
    logo: NotionLogo,
    active: true,
    data_source_type: IntegrationName.NOTION,
    requiresOAuth: true,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#dadfe8",
        primaryButtonColor: "#000000",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.ONEDRIVE,
    subpath: "onedrive",
    name: "OneDrive",
    description: "Connect your OneDrive account",
    announcementName: "to connect OneDrive",
    // icon: <GrOnedrive className="cc-w-7 cc-h-7" />,
    logo: OneDriveLogo,
    active: true,
    data_source_type: IntegrationName.ONEDRIVE,
    requiresOAuth: true,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#d6ebff",
        primaryButtonColor: "#0363b8",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.OUTLOOK,
    subpath: "outlook",
    name: "Outlook",
    description: "Lets your users connect their Outlook accounts to Carbon.",
    announcementName: "to connect Outlook",
    // icon: <img src={OutlookLogo} className="cc-w-7 cc-h-7" />,
    logo: OutlookLogo,
    active: true,
    multiStep: false,
    data_source_type: IntegrationName.OUTLOOK,
    requiresOAuth: true,
    branding: {
      header: {
        primaryBackgroundColor: "#d6ebff",
        primaryButtonColor: "#0363b8",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.S3,
    subpath: "s3",
    name: "S3",
    description: "Lets your users connect their data on S3 to Carbon.",
    announcementName: "to connect S3",
    // icon: <img src={S3Logo} className="cc-w-7 cc-h-7" />,
    logo: S3Logo,
    active: true,
    data_source_type: IntegrationName.S3,
    requiresOAuth: false,
    multiStep: true,
    branding: {
      header: {
        primaryBackgroundColor: "#d6ebff",
        primaryButtonColor: "#0363b8",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.SALESFORCE,
    subpath: "salesforce",
    name: "Salesforce",
    description: "Lets your users connect their Salesforce accounts to Carbon.",
    announcementName: "to connect Salesforce",
    // icon: <img src={SalesforceLogo} className="cc-w-7 cc-h-7" />,
    logo: SalesforceLogo,
    active: true,
    data_source_type: IntegrationName.SALESFORCE,
    requiresOAuth: true,
    multiStep: true,
    branding: {
      header: {
        primaryBackgroundColor: "#d6ebff",
        primaryButtonColor: "#0363b8",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.SHAREPOINT,
    subpath: "sharepoint",
    name: "Sharepoint",
    description: "Connect your Sharepoint account",
    announcementName: "to connect Sharepoint",
    // icon: <SiMicrosoftsharepoint className="cc-w-7 cc-h-7" />,
    logo: SharePointLogo,
    active: true,
    data_source_type: IntegrationName.SHAREPOINT,
    requiresOAuth: true,
    multiStep: true,
    branding: {
      header: {
        primaryBackgroundColor: "#c8f5f7",
        primaryButtonColor: "#036b70",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.WEB_SCRAPER,
    subpath: "scraper",
    name: "Web Scraper",
    description: "Scrape data from any website",
    announcementName: "for Web Scraping",
    // icon: <CgWebsite className="cc-w-7 cc-h-7" />,
    logo: WebScraperIcon,
    active: true,
    data_source_type: IntegrationName.WEB_SCRAPER,
    requiresOAuth: false,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#dadfe8",
        primaryButtonColor: "#000000",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.ZENDESK,
    subpath: "zendesk",
    name: "Zendesk",
    description: "Connect your Zendesk account",
    announcementName: "to connect Zendesk",
    // icon: <SiZendesk className="cc-w-7 cc-h-7" />,
    logo: ZendeskLogo,
    active: true,
    data_source_type: IntegrationName.ZENDESK,
    requiresOAuth: true,
    multiStep: true,
    branding: {
      header: {
        primaryBackgroundColor: "#dadfe8",
        primaryButtonColor: "#000000",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
  {
    id: IntegrationName.ZOTERO,
    subpath: "zotero",
    name: "Zotero",
    description: "Lets your users connect their Zotero accounts to Carbon.",
    announcementName: "to connect Zotero",
    // icon: <img src={zoteroLogoPng} className="cc-w-7 cc-h-7" />,
    // <SiZotero className="cc-w-7 cc-h-7" />,
    logo: ZoteroLogo,
    active: true,
    data_source_type: IntegrationName.ZOTERO,
    requiresOAuth: true,
    multiStep: false,
    branding: {
      header: {
        primaryBackgroundColor: "#ffc4c9",
        primaryButtonColor: "#CC2836",
        primaryLabelColor: "#FFFFFF",
        primaryTextColor: "#000000",
        secondaryTextColor: "#000000",

        // secondaryBackgroundColor: '#0061D5',
        // secondaryButtonColor: '#143B83',
      },
    },
  },
];
