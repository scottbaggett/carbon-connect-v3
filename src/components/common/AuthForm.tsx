// WARNING - THIS FILE IS ONLY FOR REFERENCE, DO NOT MODIFY
// THIS HAS BEEN INTEGRATED AS FreshdeskScreen

import React from "react";
import { DialogFooter } from "@components/common/design-system/Dialog";
import InfoFill from "@assets/svgIcons/info_fill.svg";
import UserPlus from "@assets/svgIcons/user-plus.svg";
import { Input } from "@components/common/design-system/Input";
import { Button } from "@components/common/design-system/Button";

interface AuthFormProps {
  onSubmit: () => void;
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
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
          Please enter your Github{" "}
          <span className="cc-px-2 cc-mx-1 cc-bg-surface-info_accent_1 cc-text-info_em cc-rounded-md">
            access key
          </span>
          and
          <span className="cc-px-2 cc-mx-1 cc-bg-surface-info_accent_1 cc-text-info_em cc-rounded-md">
            access key secret
          </span>
          of the acount you wish to connect.
        </div>
        <Input
          type="text"
          placeholder="Github.heeko.design"
          className="cc-mb-4"
        />
        <Input
          type="password"
          placeholder="Enter Password"
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
            By connecting to Github, you are providing us with access to your
            Confluence profile and
            <br className="cc-hidden sm:cc-block" /> Help Center articles.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="cc-w-full"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </DialogFooter>
    </>
  );
}
