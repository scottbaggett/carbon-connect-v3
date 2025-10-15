import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import SyncedConversationSlack from "./SyncedConversationSlack";
import { DialogFooter } from "../design-system/Dialog";
import { Button } from "../design-system/Button";
import SuccessScreenSlack from "./SuccessScreenSlack";
import CarbonContext, { useCarbon } from "src/context/CarbonContext";
import {
  ProcessedIntegration,
  SlackConversation,
} from "../../../typing/shared";
import { SlackConversations } from "../../Screens/SlackScreen";
import Banner, { BannerState } from "../Banner";
import { ENV } from "../../../constants/shared";
import {
  generateRequestId,
  getBaseURL,
  getConnectRequestProps,
} from "../../../utils/helper-functions";

type PropsInfo = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  conversations: SlackConversations;
  setStartCustomSync: React.Dispatch<React.SetStateAction<boolean>>;
  processedIntegration: ProcessedIntegration;
};

export type SlackSyncObject = {
  after?: string;
  id: string;
};

const SlackTab = ({
  activeTab,
  setActiveTab,
  conversations,
  setStartCustomSync,
  processedIntegration,
}: PropsInfo) => {
  const [selectedConversations, setSelectedConversations] = useState<string[]>(
    []
  );
  const [selectFilesMessage, setSelectFilesMessage] = useState<string[]>([]);
  const [step, setStep] = useState<string>("sync");
  const [bannerState, setBannerState] = useState<BannerState>({
    message: null,
  });
  const carbonProps = useCarbon();
  const {
    setSlackActive,
    slackActive,
    environment = ENV.PRODUCTION,
    authenticatedFetch,
    accessToken,
    apiURL,
    useRequestIds,
    setRequestIds,
    requestIds,
  } = carbonProps;
  const [performingSync, setPerformingSync] = useState(false);
  const [conversationDates, setConversationDates] = useState<{
    [id: string]: string;
  }>({});

  const tabValues = [
    {
      tab: "channels",
      text: "Channels",
    },
    { tab: "messages", text: "Messages" },
  ];

  const syncConversation = async (id: string) => {
    const filters: { conversation_id: string; after?: string } = {
      conversation_id: id,
    };
    if (conversationDates[id]) {
      filters["after"] = conversationDates[id];
    }
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
        filters,
      },
      carbonProps
    );

    const slackSyncResponse = await authenticatedFetch(
      `${getBaseURL(apiURL, environment)}/integrations/slack/sync`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObject),
      }
    );
    return slackSyncResponse;
  };

  const syncConversations = async () => {
    if (selectFilesMessage.length > 5 || selectedConversations.length > 5) {
      setBannerState({
        message: "Can't sync more than 5 messages and 5 channels at a time",
        type: "ERROR",
      });
      return;
    }
    setPerformingSync(true);
    let promises: any = [];
    for (let id of selectFilesMessage) {
      promises.push(syncConversation(id));
    }
    for (let id of selectedConversations) {
      promises.push(syncConversation(id));
    }
    Promise.all(promises).then(function (values) {
      let successCount = 0;
      let failedCount = 0;
      for (let value of values) {
        if (value.status == 200) {
          successCount += 1;
        } else {
          failedCount += 1;
        }
      }

      if (failedCount) {
        setBannerState({
          message: "Finished syncing conversations",
          type: "ERROR",
          additionalInfo: `${successCount} succeeded, ${failedCount} failed`,
        });
      } else {
        setSlackActive(true);
        setStep("success");
      }
    });
    setPerformingSync(false);
  };

  return (
    <>
      <Banner bannerState={bannerState} setBannerState={setBannerState} />
      {step === "sync" && (
        <div className="cc-p-[16px]">
          <div className="cc-flex cc-gap-[16px]  ">
            {tabValues.map((item) => {
              return (
                <div className="cc-w-[368px]">
                  <label
                    key={item.tab}
                    className={`cc-flex cc-w-full cc-justify-between cc-items-center cc-cursor-pointer cc-border cc-rounded-xl cc-px-3 cc-py-3 
                     ${
                       activeTab === item.tab
                         ? "cc-border-surface-info_main"
                         : "cc-border-surface-surface_3 dark:cc-border-[#FFFFFF1F]"
                     }
                `}
                  >
                    <input
                      type="radio"
                      name="tab"
                      checked={activeTab === item.tab}
                      onChange={() => {
                        setActiveTab(item.tab);
                      }}
                      className="cc-hidden"
                    />
                    <span
                      className={`cc-custom-radio cc-text-sm cc-font-semibold cc-text-high_em dark:cc-text-dark-text-white dark:before:cc-border-dark-text-gray  ${
                        activeTab === item.tab ? "cc-custom-radio-checked " : ""
                      }`}
                    >
                      {item.text}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
          <SyncedConversationSlack
            activeTab={activeTab}
            selectedConversations={selectedConversations}
            setSelectedConversations={setSelectedConversations}
            selectFilesMessage={selectFilesMessage}
            setSelectFilesMessage={setSelectFilesMessage}
            conversations={conversations}
            setStartCustomSync={setStartCustomSync}
            conversationDates={conversationDates}
            setConversationDates={setConversationDates}
          />

          {selectedConversations.length > 0 || selectFilesMessage.length > 0 ? (
            <DialogFooter className="cc-fixed cc-bottom-[0px] cc-w-[100%] cc-left-[0px]">
              <Button
                size="md"
                className="cc-w-full"
                onClick={() => syncConversations()}
                disabled={performingSync}
              >
                Sync{" "}
                {selectedConversations.length > 0 &&
                  `${selectedConversations.length} Channel(s)`}{" "}
                {selectFilesMessage.length > 0 &&
                  `${
                    selectFilesMessage.length > 0 &&
                    selectedConversations.length > 0
                      ? "&"
                      : ""
                  } ${selectFilesMessage.length} Message(s)`}
              </Button>
            </DialogFooter>
          ) : null}
        </div>
      )}
      {step === "success" && (
        <SuccessScreenSlack
          setStep={setStep}
          setSelectedConversations={setSelectedConversations}
          setSelectFilesMessage={setSelectFilesMessage}
          totalConversations={
            selectedConversations.length + selectFilesMessage.length
          }
          setStartCustomSync={setStartCustomSync}
        />
      )}
    </>
  );
};

export default SlackTab;
