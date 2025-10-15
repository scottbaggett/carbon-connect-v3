import { useState } from "react";
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
} from "../../utils/helper-functions";
import { ENV } from "../../constants/shared";
import Banner, { BannerState } from "../common/Banner";

export default function GitbookScreen({
  processedIntegration,
  setStep,
  username,
  setUsername,
}: {
  processedIntegration: ProcessedIntegration;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [ghToken, setGHToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bannerState, setBannerState] = useState<BannerState>({
    message: null,
  });

  const carbonProps = useCarbon();
  const {
    onSuccess,
    onError,
    authenticatedFetch,
    environment = ENV.PRODUCTION,
    accessToken,
    whiteLabelingData,
    orgName,
    showFilesTab,
    apiURL,
    dataSourceTags
  } = carbonProps;
  const shouldShowFilesTab = processedIntegration?.showFilesTab ?? showFilesTab;

  const connectGithub = async () => {
    try {
      if (!ghToken) {
        setBannerState({
          message: "Please enter your github token",
          type: "ERROR",
        });
        return;
      }
      if (!username) {
        setBannerState({
          message: "Please enter your github username",
          type: "ERROR",
        });
        return;
      }

      onSuccess &&
        onSuccess({
          status: 200,
          data: null,
          action: ActionType.INITIATE,
          event: ActionType.INITIATE,
          integration: IntegrationName.GITHUB,
        });
      setIsLoading(true);

      const requestObject = {
        username: username,
        access_token: ghToken,
        sync_source_items: processedIntegration?.syncSourceItems || false,
        data_source_tags: dataSourceTags || {}
      };

      const response = await authenticatedFetch(
        `${getBaseURL(apiURL, environment)}/integrations/github`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestObject),
        }
      );

      const responseData = await response.json();

      if (response.status === 200) {
        setBannerState({
          message: `${processedIntegration.name} sync initiated.`,
          type: "SUCCESS",
        });
        if (processedIntegration?.syncSourceItems) {
          setUsername("");
        } else {
          shouldShowFilesTab && setStep("repo_sync");
        }
        setGHToken("");
      } else {
        setBannerState({ type: "ERROR", message: responseData.detail });
        onError &&
          onError({
            status: 400,
            data: [{ message: responseData.detail }],
            action: ActionType.ERROR,
            event: ActionType.ERROR,
            integration: IntegrationName.GITHUB,
          });
      }
      setIsLoading(false);
    } catch (error) {
      setBannerState({
        type: "ERROR",
        message: `Error connecting your ${processedIntegration.name}. Please try again.`,
      });
      setIsLoading(false);
      onError &&
        onError({
          status: 400,
          data: [
            {
              message: `Error connecting your ${processedIntegration.name}. Please try again.`,
            },
          ],
          action: ActionType.ERROR,
          event: ActionType.ERROR,
          integration: IntegrationName.GITHUB,
        });
    }
  };

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
          Please enter {processedIntegration.name}{" "}
          <span className="cc-px-2 cc-mx-1 cc-bg-surface-info_accent_1 cc-text-info_em cc-rounded-md dark:cc-text-[#88E7FC] dark:cc-bg-[#10284D]">
            username
          </span>
          and
          <span className="cc-px-2 cc-mx-1 cc-bg-surface-info_accent_1 cc-text-info_em cc-rounded-md dark:cc-text-[#88E7FC] dark:cc-bg-[#10284D]">
            access token
          </span>
          of the acount you wish to connect.
        </div>
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="cc-mb-4"
        />
        <Input
          type="password"
          placeholder="Token"
          value={ghToken}
          onChange={(e) => setGHToken(e.target.value)}
          className="cc-mb-32"
        />
      </div>
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
          onClick={() => connectGithub()}
          disabled={isLoading}
        >
          Submit
        </Button>
      </DialogFooter>
    </>
  );
}
