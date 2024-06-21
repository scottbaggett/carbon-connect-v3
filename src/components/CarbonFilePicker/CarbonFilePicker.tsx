import React, { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
} from "@components/common/design-system/Dialog";
import BackIcon from "@assets/svgIcons/back-icon.svg";
import AuthForm from "../common/AuthForm";
import FileSelector from "./FileSelector";
import RefreshIcon from "@assets/svgIcons/refresh-icon.svg";
import { Button } from "@components/common/design-system/Button";
import { IntegrationItemType } from "@utils/integrationModalconstants";
import SettingsDropdown from "@components/common/SettingsDropdown";
import AccountDropdown from "@components/common/AccountDropdown";

export default function CarbonFilePicker({
  activeStepData,
  setActiveStep,
  onCloseModal,
}: {
  activeStepData?: IntegrationItemType;
  setActiveStep: (val: string) => void;
  onCloseModal: () => void;
}) {
  const [isUploading, setIsUploading] = useState<{
    state: boolean;
    percentage: number;
  }>({ state: false, percentage: 0 });
  const [step, setStep] = useState<number>(1);

  if (isUploading.state) {
    return (
      <div className="cc-h-[560px] cc-flex-grow cc-flex cc-flex-col cc-items-center cc-justify-center">
        <div className="cc-relative cc-h-14 cc-w-14 cc-rounded-full cc-bg-surface-surface_2 cc-mb-3 cc-p-1">
          <div
            className="cc-absolute cc-top-0 cc-left-0 cc-right-0 cc-bottom-0 cc-rounded-full cc-transform -cc-rotate-90"
            style={{
              background: `conic-gradient(#0BABFB 0% ${isUploading.percentage}%, transparent ${isUploading.percentage}% 100%)`,
            }}
          />
          <div className="cc-h-full cc-relative cc-w-full cc-bg-white cc-rounded-full cc-flex cc-items-center cc-justify-center cc-z-10">
            <p className="cc-items-baseline cc-font-semibold cc-text-low_em cc-text-center cc-text-sm">
              {isUploading.percentage}
              <span className="cc-text-xs">%</span>
            </p>
          </div>
        </div>
        <p className="cc-text-sm cc-text-center cc-font-semibold">
          Uploading 12 files...
        </p>
      </div>
    );
  }

  return (
    <>
      <DialogHeader closeButtonClass="cc-hidden sm:cc-flex">
        <div className="cc-flex-grow cc-flex cc-gap-3 cc-items-center">
          <button
            className="cc-pr-1 cc-h-10 cc-w-auto cc-shrink-0"
            onClick={() => {
              if (step > 1) {
                setStep((prev) => prev - 1);
              } else {
                setActiveStep("INTEGRATION_LIST");
              }
            }}
          >
            <img
              src={BackIcon}
              alt="Lock"
              className="cc-h-[18px] cc-w-[18px]"
            />
          </button>
          <div className="cc-h-8 cc-w-8 sm:cc-h-14 sm:cc-w-14 cc-shrink-0 cc-bg-surface-white cc-rounded-lg cc-p-0.5 cc-shadow-e2">
            <div className="cc-h-full cc-w-full cc-bg-gray-50 cc-flex cc-items-center cc-justify-center cc-rounded-lg">
              <img
                src={activeStepData?.logo}
                alt="Github logo"
                className="cc-h-4 cc-w-4 sm:cc-h-8 sm:cc-w-8"
              />
            </div>
          </div>
          <DialogTitle className="cc-flex-grow cc-text-left">
            {activeStepData?.name}
          </DialogTitle>
          {step > 1 && (
            <>
              <Button
                size="sm"
                variant="gray"
                className="cc-rounded-xl cc-shrink-0 sm:cc-hidden"
              >
                <img
                  src={RefreshIcon}
                  alt="User Plus"
                  className="cc-h-[18px] cc-w-[18px] cc-shrink-0"
                />
              </Button>
              <AccountDropdown />
              <SettingsDropdown />
            </>
          )}
        </div>
      </DialogHeader>
      {step === 1 && (
        <AuthForm
          onSubmit={() => {
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <FileSelector
          headName="Select repos to sync"
          navigationHeadingFirst="All Repos"
          navigationHeadingSecond="Awesome-Algorithms"
          navigationHeadingThird="Contoso Project"
          forwardMard={true}
          isAddIcon={false}
          addViewCtaText="View synced files"
          isDeleteCta={false}
          isErrorMessage={false}
          forwardMove={() => {}}
          setIsUploading={setIsUploading}
        />
      )}
    </>
  );
}
