import { useEffect, useState } from "react";
import SlackLogo from "../../assets/logos/slack.svg";
import { Button } from "@components/common/design-system/Button";
import { useCarbon } from "src/context/CarbonContext";
import {
  ActiveStep,
  IntegrationName,
  SlackConversation,
} from "src/typing/shared";
import AddAccount from "@components/common/AddAccount";
import {
  IntegrationItemType,
  INTEGRATIONS_LIST,
} from "@utils/integrationModalconstants";

import Channel from "@components/common/Slack/Channel";
import Banner, { BannerState } from "../common/Banner";
import { IntegrationAPIResponse } from "../IntegrationModal";

export type ActiveSlackScreen = "CONNECTED" | "CHANNEL";

export type SlackConversations = {
  publicChannels: SlackConversation[];
  privateChannels: SlackConversation[];
  dms: SlackConversation[];
  mpdms: SlackConversation[];
};

const SlackScreen = ({
  setActiveStep,
  activeStepData,
  screen,
  setStartCustomSync,
  selectedDataSource,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStep>>;
  activeStepData?: IntegrationItemType;
  screen: ActiveSlackScreen;
  setStartCustomSync: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDataSource: IntegrationAPIResponse | null;
}) => {
  const [active, setActive] = useState(0);
  const [activeScreen, setActiveScreen] = useState(screen);
  const { entryPoint, setSlackActive, slackActive } = useCarbon();

  const [bannerState, setBannerState] = useState<BannerState>({
    message: null,
  });

  const handleSelectClick = () => {
    setSlackActive(false);
    setActiveScreen("CHANNEL");
  };

  return (
    <>
      {activeScreen === "CONNECTED" && (
        <div>
          <div className="  cc-p-[32px] md:cc-p-[16px] md:cc-mt-[188px]">
            <img className="cc-w-[50px]" src={SlackLogo} alt="logo" />
            <p className="cc-text-[26px] cc-leading-[40px] cc-font-medium cc-tracking-[-0.26px] cc-text-[#100C20] cc-mt-[24px]  md:cc-mt-[16px] md:cc-text-[20px] md:cc-leading-[32px] dark:cc-text-dark-text-white">
              Your Slack account is connected.
            </p>
            <p className="cc-text-lg cc-font-semibold cc-text-[#8C8A94] cc-mt-[8px] md:cc-mt-[6px] md:cc-text-[14px] md:cc-leading-[24px] dark:cc-text-dark-text-white">
              You can select specific channels and direct messages to sync.
            </p>
          </div>
          <div className="cc-p-[32px] md:cc-p-[16px] md:cc-border-none cc-border-t-[1px] dark:cc-border-t-[0px] cc-border-b-[#F3F3F4] md:cc-fixed md:cc-bottom-[0px] md:cc-left-[0px] md:cc-w-full dark:cc-shadow-[0px_-3px_8px_-2px_#ffffff1F]">
            <Button
              variant="primary"
              className="cc-w-full  cc-text-base cc-h-[48px] cc-font-extrabold"
              onClick={() => handleSelectClick()}
            >
              Select conversations from Slack
            </Button>
            <Button
              onClick={() => {
                setStartCustomSync(false);
              }}
              variant="neutral-white-fix"
              size="lg"
              className="cc-w-full cc-mt-[20px]"
            >
              Go back
            </Button>
          </div>
        </div>
      )}

      {activeScreen === "CHANNEL" && (
        <>
          <Channel
            setActiveStep={setActiveStep}
            setActive={setActiveScreen}
            activeScreen={activeScreen}
            activeStepData={INTEGRATIONS_LIST.find(
              (item) => item.id === IntegrationName.SLACK
            )}
            setStartCustomSync={setStartCustomSync}
            setBannerState={setBannerState}
            bannerState={bannerState}
            selectedDataSource={selectedDataSource}
          />
        </>
      )}
    </>
  );
};

export default SlackScreen;
