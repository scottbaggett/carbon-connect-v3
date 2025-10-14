import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import carbonLogo from "@assets/carbon.svg";
import LockIcon from "@assets/svgIcons/lock.svg";
import Shield from "@assets/svgIcons/shield.svg";
import rubber from "@assets/rubberImage.svg";

import { Button } from "@components/common/design-system/Button";
import { useCarbon } from "../../context/CarbonContext";
import { ActiveStep } from "../../typing/shared";

import { useTheme } from "next-themes";
import Loader from "../common/Loader";
export interface ModalProps {
    onPrimaryButtonClick?: (step: ActiveStep) => void;

    setCarbonActive: Dispatch<SetStateAction<boolean>>;
}

function ConnectScreen({
    onPrimaryButtonClick = () => {},
    setCarbonActive,
}: ModalProps) {
    const {
        whiteLabelingData,
        brandIcon,
        orgName,
        entryPointIntegrationObject,
        tosURL,
        privacyPolicyURL,
        entryPoint,
        loading,
        navigateBackURL,
        manageModalOpenState,
    } = useCarbon();

    const handlePrimaryButtonClick = () => {
        setCarbonActive(false);
        if (entryPointIntegrationObject?.active) {
            onPrimaryButtonClick(entryPointIntegrationObject.data_source_type);
        } else {
            onPrimaryButtonClick("INTEGRATION_LIST");
        }
    };

    const isWhiteLabeledOrg = Boolean(whiteLabelingData?.remove_branding);
    const isWhiteLabeledEntryPoint = Boolean(
        entryPoint &&
            whiteLabelingData?.integrations &&
            whiteLabelingData?.integrations?.[entryPoint],
    );

    const navigateBack = () => {
        if (navigateBackURL) window.open(navigateBackURL, "_self");
        else manageModalOpenState(false);
    };

    return (
        <div className="sm:cc-max-h-[100%] sm:cc-w-[415px] sm:cc-h-[703px] cc-gap-0 sm:cc-rounded-[20px] md:cc-w-full">
            <div>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="cc-p-6 md:!cc-p-4  cc-flex-grow cc-overflow-auto">
                            <div className="">
                                <div className="cc-flex-cc-space-x-2">
                                    <img
                                        src={brandIcon}
                                        alt={`${orgName} Icon`}
                                        className="cc-h-15 cc-w-15"
                                    />
                                </div>
                            </div>
                            {isWhiteLabeledOrg ? (
                                <h2 className="cc-font-medium cc-mb-6 cc-text-2xl cc-tracking-tight dark:cc-text-dark-text-white">
                                    <span className="cc-font-bold">
                                        {orgName}
                                    </span>{" "}
                                    wants to access your data{" "}
                                    {entryPointIntegrationObject?.announcementName && (
                                        <>
                                            <span>on</span>
                                            <span className="cc-font-bold">
                                                {` ${entryPointIntegrationObject?.name}`}
                                            </span>
                                        </>
                                    )}
                                </h2>
                            ) : (
                                <h2 className="cc-font-medium cc-mb-6 cc-text-2xl cc-tracking-tight dark:cc-text-dark-text-white">
                                    Connect to{" "}
                                    {entryPointIntegrationObject?.announcementName ? (
                                        <span className="cc-font-bold">
                                            {entryPointIntegrationObject?.name}
                                        </span>
                                    ) : (
                                        <span>your data</span>
                                    )}
                                </h2>
                            )}
                            <div className="cc-flex cc-flex-col cc-gap-y-5 cc-py-2 w-full">
                                <div className="cc-flex cc-items-start">
                                    <span className="cc-h-10 cc-w-10 cc-mr-4 cc-flex cc-shrink-0 cc-items-center cc-justify-center cc-bg-gray-50 cc-rounded-lg dark:cc-bg-svg-background">
                                        <img
                                            src={LockIcon}
                                            alt="Lock"
                                            className="cc-h-6 cc-w-6  dark:cc-invert-[1] dark:cc-hue-rotate-180"
                                        />
                                    </span>
                                    <div>
                                        <p className="cc-font-semibold cc-text-lg  dark:cc-text-dark-text-white">
                                            Private
                                        </p>
                                        <p className="cc-text-low_em cc-text-base cc-font-semibold dark:cc-text-dark-text-gray">
                                            Your credentials will never be made
                                            available to {orgName}
                                        </p>
                                    </div>
                                </div>
                                <div className="cc-flex cc-items-start">
                                    <span className="cc-h-10 cc-w-10 cc-mr-4 cc-flex cc-shrink-0 cc-items-center cc-justify-center cc-bg-gray-50 cc-rounded-lg dark:cc-bg-svg-background">
                                        <img
                                            src={Shield}
                                            alt="Shield"
                                            className="cc-h-6 cc-w-6 dark:cc-invert-[1] dark:cc-hue-rotate-180"
                                        />
                                    </span>
                                    <div>
                                        <p className="cc-font-semibold cc-text-lg dark:cc-text-dark-text-white">
                                            Secure
                                        </p>
                                        <p className="cc-text-low_em cc-font-semibold cc-text-base dark:cc-text-dark-text-gray">
                                            {`By connecting, your data is securely shared with ${orgName} and 3rd parties like OpenAI.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cc-px-8 !cc-p-4 cc-pt-6 cc-pb-8 cc-flex cc-flex-col cc-gap-y-5 cc-border-t cc-border-color-black-7 dark:cc-border-dark-border-color cc-fixed cc-bottom-[0px] cc-w-full">
                            <Button
                                size="lg"
                                onClick={handlePrimaryButtonClick}
                            >
                                Connect
                            </Button>
                            <Button
                                variant="neutral-white-fix"
                                size="lg"
                                onClick={() => navigateBack()}
                            >
                                Go back
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ConnectScreen;
