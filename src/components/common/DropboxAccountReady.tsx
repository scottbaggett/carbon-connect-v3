import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@components/common/design-system/Dialog";
import { Button } from "./design-system/Button";
import DropboxIcon from "@assets/logos/dropbox.svg";

export default function DropboxAccountReady({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        activeState={"INTEGRATION_LIST"}
        className="cc-h-auto sm:cc-h-fit sm:cc-max-h-[90vh] cc-top-auto sm:cc-w-[464px] cc-gap-0 sm:cc-rounded-[20px] cc-translate-y-0 -sm:cc-translate-y-1/2 cc-bottom-0 cc-rounded-t-2xl sm:cc-bottom-auto sm:top-1/2"
      >
        <div className="cc-p-4 sm:cc-p-8">
          <img
            src={DropboxIcon}
            alt="Disconnect Icon"
            className="cc-h-16 cc-w-16 cc-mb-6"
          />
          <p className="cc-text-2.5xl cc-font-medium cc-mb-1.5">
            Your Dropbox account is connected.
          </p>
          <p className="text-low-em">
            Please select files to add. Once you’re done, you can close this
            tab.
          </p>
        </div>
        <DialogFooter className="p-4 sm:cc-px-8 sm:cc-pb-8 sm:cc-pt-6">
          <Button size="lg" className="cc-w-full cc-mb-2 sm:cc-mb-5">
            Select Files from Dropbox
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="neutral-white"
            size="lg"
            className="cc-w-full"
          >
            Go Back
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
