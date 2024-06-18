import React, { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
} from "@components/common/design-system/Dialog";
import BackIcon from "@assets/svgIcons/back-icon.svg";
import AddCircleIconWhite from "@assets/svgIcons/add-circle-icon-white.svg";
import { IntegrationItemType } from "@utils/integrationModalconstants";
import AuthForm from "@components/common/AuthForm";
import UserPlus from "@assets/svgIcons/user-plus.svg";
import { Button } from "@components/common/design-system/Button";
import { images } from "@assets/index";

export default function SystemFileUpload({
  activeStepData,
  setActiveStep,
  onCloseModal,
}: {
  activeStepData?: IntegrationItemType;
  setActiveStep: (val: string) => void;
  onCloseModal: () => void;
}) {
  const [step, setStep] = useState<number>(1);

  return (
    <>
      <DialogHeader closeButtonClass="cc-hidden sm:cc-flex">
        <div className="cc-flex-grow cc-flex cc-gap-3 cc-items-center">
          <button
            className="cc-pr-1 cc-h-10 cc-w-auto cc-shrink-0"
            onClick={() => {
              if (step > 1) {
                // setStep((prev) => prev - 1);
                setStep(1);
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
                alt="logo"
                className="cc-h-4 cc-w-4 sm:cc-h-8 sm:cc-w-8"
              />
            </div>
          </div>
          <DialogTitle className="cc-flex-grow cc-text-left">
            {activeStepData?.name}
          </DialogTitle>
        </div>
      </DialogHeader>
      {step === 1 && (
        <div className="cc-border cc-border-surface-surface_3 cc-rounded-xl cc-m-4">
          <div className="cc-h-full cc-flex cc-flex-col cc-items-center cc-justify-center cc-p-4 sm:cc-h-[500px]">
            <div className="cc-mb-2">
              <img
                src={images.solidplusIcon}
                alt="User Plus"
                className="cc-h-[42px] cc-w-[42px]"
              />
            </div>
            <div className="cc-flex cc-text-base cc-font-semibold cc-mb-1 cc-text-center cc-max-w-[346px]">
              <div
                onClick={() => setStep(3)}
                className="cc-text-info_em cc-cursor-pointer cc-text-medium"
              >
                Click to upload
              </div>
              <div className="cc-text-high_em">
                &nbsp;or drag and drop up to 50 files.
              </div>
            </div>
            <div className="cc-text-low_em cc-text-xs">max 20MB per file</div>
          </div>
        </div>
      )}
      {step === 2 && (
        <AuthForm
          onSubmit={() => {
            setStep(2);
          }}
        />
      )}
    </>
  );
}
