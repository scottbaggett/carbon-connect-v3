import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DialogFooter } from "@components/common/design-system/Dialog";
import InfoFill from "@assets/svgIcons/info_fill.svg";
import UserPlus from "@assets/svgIcons/user-plus.svg";
import { Input } from "@components/common/design-system/Input";
import { Button } from "@components/common/design-system/Button";
import {
  IntegrationName,
  ProcessedIntegration,
  ActionType,
} from "../../typing/shared";
import { useCarbon } from "../../context/CarbonContext";
import {
  generateRequestId,
  getBaseURL,
  getConnectRequestProps,
  getIntegrationDisclaimer,
  wasAccountAdded,
} from "../../utils/helper-functions";
import { ENV } from "../../constants/shared";
import Banner, { BannerState } from "../common/Banner";
import Loader from "../common/Loader";

export default function ConfluenceScreen({
  processedIntegration,
  setShowAdditionalStep,
}: {
  processedIntegration: ProcessedIntegration;
  setShowAdditionalStep: Dispatch<SetStateAction<boolean>>;
}) {
  const [confluenceSubdomain, setConfluenceSubdomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bannerState, setBannerState] = useState<BannerState>({
    message: null,
  });
  const [connectingAccount, setConnectingAccount] = useState(false);

  const carbonProps = useCarbon();
  const {
    onSuccess,
    onError,
    useRequestIds,
    setRequestIds,
    requestIds,
    authenticatedFetch,
    environment = ENV.PRODUCTION,
    accessToken,
    whiteLabelingData,
    orgName,
    lastModifications,
    apiURL,
  } = carbonProps;

  useEffect(() => {
    if (wasAccountAdded(lastModifications || [], IntegrationName.CONFLUENCE)) {
      setShowAdditionalStep(false);
      setConnectingAccount(false);
    }
  }, [JSON.stringify(lastModifications)]);

  const fetchOauthURL = async () => {
    try {
      if (!confluenceSubdomain) {
        setBannerState({
          type: "ERROR",
          message: "Please enter your confluence domain.",
        });
        return;
      }

      const domain = confluenceSubdomain
        .replace("https://www.", "")
        .replace("http://www.", "")
        .replace("https://", "")
        .replace("http://", "")
        .replace(/\/$/, "")
        .trim();

      setIsLoading(true);
      const oauthWindow = window.open("", "_blank");

      if (!oauthWindow) {
        setBannerState({
          type: "ERROR",
          message: "Failed to start Oauth flow",
        });
        return;
      }

      oauthWindow?.document.write("Loading...");

      setIsLoading(true);

      let requestId = null;
      if (useRequestIds) {
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
          confluence_subdomain: domain,
          service: processedIntegration.data_source_type,
          connecting_new_account: true,
        },
        carbonProps
      );

      const response = await authenticatedFetch(
        `${getBaseURL(apiURL, environment)}/integrations/oauth_url`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestObject),
        }
      );

      const oAuthURLResponseData = await response.json();

      if (response.status === 200) {
        onSuccess &&
          onSuccess({
            status: 200,
            data: { request_id: requestId },
            action: ActionType.INITIATE,
            event: ActionType.INITIATE,
            integration: IntegrationName.CONFLUENCE,
          });
        setConfluenceSubdomain("");

        oauthWindow.location.href = oAuthURLResponseData.oauth_url;
        setConnectingAccount(true);
      } else {
        oauthWindow.document.body.innerHTML = oAuthURLResponseData.detail;
      }
      setIsLoading(false);
    } catch (error) {
      setBannerState({
        type: "ERROR",
        message: "Error getting oAuth URL. Please try again.",
      });
      setIsLoading(false);
      onError &&
        onError({
          status: 400,
          data: [{ message: "Error getting oAuth URL. Please try again." }],
          action: ActionType.ERROR,
          event: ActionType.ERROR,
          integration: IntegrationName.CONFLUENCE,
        });
    }
  };

  useEffect(() => {
    if (connectingAccount) {
      setTimeout(() => setConnectingAccount(false), 20000);
    }
  }, [connectingAccount]);

  return (
    <>
      <Banner bannerState={bannerState} setBannerState={setBannerState} />
      <div className="cc-p-4 cc-min-h-0 cc-flex-grow">
        <div className="cc-p-2 cc-rounded-md cc-bg-surface-surface_1 cc-inline-block cc-mb-5 dark:cc-bg-svg-background cc-cursor-pointer">
          <img
            src={UserPlus}
            alt="User Plus"
            className="cc-h-6 cc-w-6 dark:cc-invert-[1] dark:cc-hue-rotate-180"
          />
        </div>
        <div className="cc-text-base cc-font-semibold cc-mb-5 dark:cc-text-dark-text-white">
          Please enter the {processedIntegration.name}{" "}
          <span className="cc-px-2 cc-mx-1 cc-bg-surface-info_accent_1 cc-text-info_em cc-rounded-md dark:cc-text-[#88E7FC] dark:cc-bg-[#10284D]">
            domain
          </span>
          of the acount you wish to connect.
        </div>
        <Input
          type="text"
          placeholder="your-subdomain"
          value={confluenceSubdomain}
          onChange={(e) => setConfluenceSubdomain(e.target.value)}
          className="cc-mb-4"
        />
      </div>
      {connectingAccount ? <Loader /> : null}
      <DialogFooter>
        <div className="cc-flex cc-mb-4 cc-gap-2 cc-items-center">
          <img
            src={InfoFill}
            alt="Info Icon"
            className="cc-w-5 cc-shrink-0 dark:cc-invert-[1] dark:cc-hue-rotate-180"
          />
          <p className="cc-text-low_em cc-font-semibold cc-text-sm dark:cc-text-dark-text-white">
            {getIntegrationDisclaimer(
              processedIntegration,
              whiteLabelingData,
              orgName
            )}
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="cc-w-full"
          onClick={() => fetchOauthURL()}
          disabled={isLoading}
        >
          Submit
        </Button>
      </DialogFooter>
    </>
  );
}
