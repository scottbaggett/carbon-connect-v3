import React, { useState } from "react";
import { DialogFooter } from "@components/common/design-system/Dialog";
import InfoFill from "@assets/svgIcons/info_fill.svg";
import UserPlus from "@assets/svgIcons/user-plus.svg";
import { Input } from "@components/common/design-system/Input";
import { Button } from "@components/common/design-system/Button";
import { ActionType, ProcessedIntegration } from "../../typing/shared";
import { useCarbon } from "../../context/CarbonContext";
import {
  generateRequestId,
  getConnectRequestProps,
} from "../../utils/helper-functions";
import { BASE_URL, ENV } from "../../constants/shared";

export default function FreshdeskScreen({
  processedIntegration,
}: {
  processedIntegration: ProcessedIntegration;
}) {
  const [freshdeskdomain, setFreshdeskdomain] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  } = carbonProps;

  const connectFreshdesk = async () => {
    try {
      if (!freshdeskdomain) {
        // toast.error('Please enter a subdomain.');
        return;
      }
      if (!apiKey) {
        // toast.error('Please enter an API key.');
        return;
      }

      setIsLoading(true);

      onSuccess &&
        onSuccess({
          status: 200,
          data: null,
          action: ActionType.INITIATE,
          event: ActionType.INITIATE,
          integration: processedIntegration.id,
        });
      setIsLoading(true);

      let requestId = null;
      if (useRequestIds) {
        requestId = generateRequestId(20);
        setRequestIds({
          ...requestIds,
          [processedIntegration?.data_source_type]: requestId,
        });
      }

      const domain = freshdeskdomain
        .replace("https://www.", "")
        .replace("http://www.", "")
        .replace("https://", "")
        .replace("http://", "")
        .replace(/\/$/, "")
        .trim();

      const requestObject = getConnectRequestProps(
        processedIntegration,
        requestId,
        { api_key: apiKey, domain: domain },
        carbonProps
      );

      const response = await authenticatedFetch(
        `${BASE_URL[environment]}/integrations/freshdesk`,
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
        // toast.info("Freshdesk sync initiated.");
        setApiKey("");
        setFreshdeskdomain("");
      } else {
        // toast.error(responseData.detail);
        onError &&
          onError({
            status: 400,
            data: [{ message: responseData.detail }],
            action: ActionType.ERROR,
            event: ActionType.ERROR,
            integration: processedIntegration.id,
          });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      // toast.error("Error connecting your Freshdesk. Please try again.");
      setIsLoading(false);
      onError &&
        onError({
          status: 400,
          data: [
            { message: "Error connecting your Freshdesk. Please try again." },
          ],
          action: ActionType.ERROR,
          event: ActionType.ERROR,
          integration: processedIntegration.id,
        });
    }
  };
  return (
    <>
      <div className="cc-p-4 cc-min-h-0 cc-flex-grow">
        <div className="cc-p-2 cc-rounded-md cc-bg-surface-surface_1 cc-inline-block cc-mb-5 dark:cc-bg-svg-background">
          <img
            src={UserPlus}
            alt="User Plus"
            className="cc-h-6 cc-w-6 dark:cc-invert-[1] dark:cc-hue-rotate-180"
          />
        </div>
        <div className="cc-text-base cc-font-semibold cc-mb-5 dark:cc-text-dark-text-white">
          Please enter Freshdesk{" "}
          <span className="cc-px-2 cc-mx-1 cc-bg-surface-info_accent_1 cc-text-info_em cc-rounded-md dark:cc-text-[#88E7FC] dark:cc-bg-[#10284D]">
            domain
          </span>
          and
          <span className="cc-px-2 cc-mx-1 cc-bg-surface-info_accent_1 cc-text-info_em cc-rounded-md dark:cc-text-[#88E7FC] dark:cc-bg-[#10284D]">
            api key
          </span>
          of the acount you wish to connect.
        </div>
        <Input
          type="text"
          placeholder="domain.freshdesk.com"
          value={freshdeskdomain}
          onChange={(e) => setFreshdeskdomain(e.target.value)}
          className="cc-mb-4"
        />
        <Input
          type="password"
          placeholder="API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
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
            By connecting to Freshdesk, you are providing us with access to your
            Freshdesk account. We will use this access to import your data into
            Carbon. We will not modify your data in any way.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="cc-w-full"
          onClick={() => connectFreshdesk()}
        >
          Submit
        </Button>
      </DialogFooter>
    </>
  );
}
