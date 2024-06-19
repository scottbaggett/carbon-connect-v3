import React from "react";
import { Button } from "@components/common/design-system/Button";
import { images } from "@assets/index";

export default function SuccessState({
  image = images.successIcon,
  heading,
  action,
}: {
  image?: string;
  heading: string;
  action: () => void;
}) {
  return (
    <div className="sm:cc-border cc-border-surface-surface_3 cc-p-4 cc-flex cc-flex-col cc-items-center cc-justify-center cc-rounded-xl cc-flex-grow">
      <div className="cc-p-2 cc-rounded-md cc-bg-surface-surface_1 cc-inline-block cc-mb-3">
        <img src={image} alt="Success" className="cc-h-6 cc-w-6" />
      </div>
      <div className="cc-text-base cc-font-semibold cc-mb-6 cc-text-center cc-max-w-[206px]">
        {heading}
      </div>
      <Button onClick={action} size="md" className="cc-px-6">
        Got it
      </Button>
    </div>
  );
}
