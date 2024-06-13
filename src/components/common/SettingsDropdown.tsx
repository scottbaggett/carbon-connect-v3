import React, { useState } from "react";
import SettingsIcon from "@assets/svgIcons/settings-icon.svg";
import DisconnectIcon from "@assets/svgIcons/disconnect-icon.svg";
import RefreshIcon from "@assets/svgIcons/refresh-icon.svg";
import { Button } from "@components/common/design-system/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/common/design-system/Dropdown";
import DisconnectModal from "@components/common/DisconnectModal";

export default function SettingsDropdown() {
  const [showDisconnectModal, setShowDisconnectModal] =
    useState<boolean>(false);
  return (
    <>
      <DisconnectModal
        isOpen={showDisconnectModal}
        onOpenChange={setShowDisconnectModal}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="gray"
            className="cc-rounded-xl cc-shrink-0 cc-px-0 cc-w-8"
          >
            <img
              src={SettingsIcon}
              alt="User Plus"
              className="cc-h-[18px] cc-w-[18px] cc-shrink-0"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="cc-w-[208px]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setShowDisconnectModal(true);
              }}
              className="hover:cc-bg-surface-surface_1 cc-justify-between"
            >
              Disconnect account
              <img
                src={DisconnectIcon}
                alt="Disconnect Icon"
                className="cc-h-[14px] cc-w-[14px] cc-shrink-0"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cc-bg-surface-surface_1 cc-justify-between">
              Re-sync account
              <img
                src={RefreshIcon}
                alt="Refresh Icon"
                className="cc-h-[14px] cc-w-[14px] cc-shrink-0"
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
