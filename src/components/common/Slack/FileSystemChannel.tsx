import { Dispatch, SetStateAction, useEffect, useState } from "react";
import privateChannelIcon from "@assets/svgIcons/privateChannel.svg";
import { Checkbox } from "../design-system/Checkbox";
import { channelInfo } from "./FileSelectionSlack";
import calender from "@assets/svgIcons/calendar.svg";

import "react-day-picker/dist/style.css";
import CalenderFooter from "./CalenderFooter";
import calenderUpdate from "@assets/svgIcons/calendarUpdate.svg";
import DatePicker from "./DatePicker";
import { SlackConversation } from "../../../typing/shared";

type propInfo = {
  item: SlackConversation;
  isChecked: boolean;
  onSelect: () => void;
  conversationDates: { [id: string]: string };
  setConversationDates: Dispatch<SetStateAction<{ [id: string]: string }>>;
};
const FileSystemChannel = ({
  item,
  isChecked,
  onSelect,
  conversationDates,
  setConversationDates,
}: propInfo) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const storeDate = (date: string) => {
    const dates = Object.assign({}, conversationDates);
    dates[item.id] = date;
    setConversationDates(dates);
  };

  return (
    <div className=" cc-flex  cc-p-[16px_0px] md:cc-w-[100%] tab:cc-w-[100%] cc-w-[361px] cc-border-t cc-border-[#F3F3F4] cc-justify-between cc-items-center dark:cc-border-[#ffffff7a] dark:hover:cc-bg-[#464646]">
      <div className="cc-text-[14px] cc-flex cc-items-center cc-leading-[24px] cc-font-semibold cc-text-[#100C20] ">
        <Checkbox
          className="cc-mr-[8px]"
          checked={isChecked}
          onCheckedChange={onSelect}
        />

        <div className="cc-flex cc-flex-col">
          <div className="cc-flex dark:cc-text-dark-text-white">
            <span>#{item.name}</span>
            {item.is_private ? (
              <img
                className="cc-ml-[8px] cc-mt-[2px] cc-items-center"
                src={privateChannelIcon}
                alt="icon"
              />
            ) : null}
          </div>
          <span className="cc-text-[#8C8A94] cc-leading-[16px] cc-text-[12px] cc-font-medium dark:cc-text-dark-text-white">
            {conversationDates[item.id] &&
              `Starting from ${conversationDates[item.id]}`}
          </span>
        </div>
      </div>
      <div className="cc-relative">
        {conversationDates[item.id] ? (
          <img
            src={calenderUpdate}
            className="cc-cursor-pointer"
            onClick={() => setOpen(true)}
            alt="calender"
          />
        ) : (
          <img
            src={calender}
            className="cc-cursor-pointer"
            onClick={() => setOpen(true)}
            alt="calender"
          />
        )}
      </div>

      {open && (
        <DatePicker
          setOpen={setOpen}
          selected={selected}
          setSelected={setSelected}
          setStoreDate={storeDate}
        />
      )}
    </div>
  );
};

export default FileSystemChannel;
