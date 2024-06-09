import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/common/Dialog";
import BackIcon from "@assets/svgIcons/back-icon.svg";
import GithubForm from "./GithubForm";
import GithubFileSelector from "./GithubFileSelector";
import GithubLogo from "@assets/logos/github.svg";
import SettingsIcon from "@assets/svgIcons/settings-icon.svg";
import { Button } from "@components/common/Button";

export default function GithubFlow({
  setActiveStep,
}: {
  setActiveStep: (val: string) => void;
}) {
  const [step, setStep] = useState<number>(1);

  return (
    <>
      <DialogHeader closeButtonClass="cc-hidden sm:cc-flex">
        <div className="cc-flex-grow cc-flex cc-gap-3 cc-items-center">
          <button
            className="cc-pr-1 cc-h-10 cc-w-auto"
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
          <div className="cc-h-14 cc-w-14 cc-shrink-0 cc-bg-surface-white cc-rounded-lg cc-p-0.5 cc-shadow-e2">
            <div className="cc-h-full cc-w-full cc-bg-gray-50 cc-flex cc-items-center cc-justify-center cc-rounded-lg">
              <img
                src={GithubLogo}
                alt="Github logo"
                className="cc-h-8 cc-w-8"
              />
            </div>
          </div>
          <DialogTitle className="cc-flex-grow cc-text-left">
            Github
          </DialogTitle>
          {step > 1 && (
            <>
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
            </>
          )}
        </div>
      </DialogHeader>
      {step === 1 && (
        <GithubForm
          onSubmit={() => {
            setStep(2);
          }}
        />
      )}
      {step === 2 && <GithubFileSelector />}
    </>
  );
}
