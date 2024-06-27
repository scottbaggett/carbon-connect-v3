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

export default function AccessKeyAuth({
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
            className="cc-pr-1 cc-h-10 cc-w-auto cc-shrink-0 "
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
              className="cc-h-[18px] cc-w-[18px] dark:cc-invert-[1] dark:cc-hue-rotate-180"
            />
          </button>
          <div className="cc-h-8 cc-w-8 sm:cc-h-14 sm:cc-w-14 cc-shrink-0 cc-bg-surface-white cc-rounded-lg cc-p-0.5 cc-shadow-e2 dark:cc-shadow-[0px_3px_4px_-2px_#0000007A] dark:cc-border-dark-border-color">
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
        <div className="cc-h-full cc-flex-grow cc-flex cc-flex-col cc-items-center cc-justify-center cc-p-4 sm:cc-h-[500px]">
          <div className="cc-p-2 cc-rounded-md cc-bg-surface-surface_1 cc-inline-block cc-mb-3">
            <img
              src={UserPlus}
              alt="User Plus"
              className="cc-h-6 cc-w-6 dark:cc-invert-[1] dark:cc-hue-rotate-180"
            />
          </div>
          <div className="cc-text-base cc-font-semibold cc-mb-6 cc-text-center cc-max-w-[206px]">
            No account connected, please connect an account
          </div>
          <Button onClick={() => setStep(2)} size="md" className="cc-px-6">
            <img
              src={AddCircleIconWhite}
              alt="Add Circle Plus"
              className="cc-h-[18px] cc-w-[18px] cc-shrink-0 dark:cc-invert-initial dark:cc-hue-rotate-180"
            />
            Connect Account
          </Button>
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
