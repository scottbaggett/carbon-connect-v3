import React, { useEffect, useRef, useState } from "react";
import {
  DialogFooter,
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

import FileSelector from "@components/CarbonFilePicker/FileSelector";
import SuccessScreen from "./SuccessScreen";

import FileExtension from "@components/SystemFileUpload/FileExtension/FileExtension";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ClickToUpload from "./ClickToUpload";

export interface UploadFileData {
  lastModified: number;
  name: string;
  type: string;
  size: number;
}

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
  // state variable for file upload
  const [file, setFile] = useState<UploadFileData[]>([]);

  const [folderName, setFolderName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const [isUploading, setIsUploading] = useState<{
    state: boolean;
    percentage: number;
  }>({ state: false, percentage: 0 });

  const handleItemClick = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
  const handleFileUpload = (selectedFiles: File[]): void => {
    const fileList = Array.from(selectedFiles);
    setFile(fileList);

    const firstFile = fileList[0];
    if (firstFile.webkitRelativePath) {
      const pathParts = firstFile.webkitRelativePath.split("/");

      if (pathParts.length > 1) {
        setFolderName(pathParts[0]);
        setStep(2);
      } else {
        setFolderName(null);
      }
    } else {
      setFolderName(null);
    }

    setStep(2);
    uploadFiles(fileList);
  };

  const uploadFiles = (fileList: UploadFileData[]) => {
    setUploading(true);
    setUploadSuccess(false);
    setUploadProgress(0);

    const totalFiles = fileList.length;
    let uploadedFiles = 0;

    fileList.forEach((file, index) => {
      setTimeout(() => {
        uploadedFiles += 1;
        setUploadProgress((uploadedFiles / totalFiles) * 100);

        if (uploadedFiles === totalFiles) {
          setUploading(false);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(true), 3000);
        }
      }, (index + 1) * 1000);
    });
  };

  const convertBytesToKB = (bytes: number): string => {
    return (bytes / 1024).toFixed(2) + " KB";
  };

  useEffect(() => {}, [file]);

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
          <div className="md:cc-hidden cc-h-8 cc-w-8 sm:cc-h-14 sm:cc-w-14 cc-shrink-0 cc-bg-surface-white cc-rounded-lg cc-p-0.5 cc-shadow-e2">
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
        {step === 2 ? (
          <div
            className="cc-text-[#0BABFB]  cc-cursor-pointer cc-font-semibold cc-text-[14px] cc-leading-[24px] cc-border-b-4 cc-border-[#0BABFB] md:cc-hidden"
            onClick={() => {
              setStep(1);
            }}
          >
            Add files
          </div>
        ) : null}
      </DialogHeader>
      {step === 1 && (
        <>
          <ClickToUpload onSubmit={handleFileUpload} />
        </>
      )}
      {step === 2 && (
        <>
          <div className="cc-flex cc-flex-col cc-h-full cc-grow cc-overflow-hidden">
            <div className="cc-hidden md:cc-block">
              <ClickToUpload onSubmit={handleFileUpload} />
            </div>
            <div className=" cc-overflow-scroll">
              <div className="cc-flex cc-w-full  cc-flex-wrap cc-p-2.5  cc-gap-[10px]  cc-pb-[90px]">
                {file.map((data, index) => (
                  <div
                    key={index}
                    className="uploadFileWrapper cc-cursor-pointer group cc-relative  cc-flex cc-border cc-border-solid cc-border-[#0000001F] cc-p-[16px] cc-rounded-xl cc-items-center cc-w-[368px] cc-justify-between hover:cc-shadow-[0_3px_4px_-2px_#00000029]"
                  >
                    <FileExtension fileName={data.type} />
                    <div>
                      <div className="cc-w-[201px] cc-whitespace-nowrap cc-text-ellipsis cc-overflow-hidden cc-text-[#100C20] cc-font-semibold cc-text-base">
                        {data.name}
                      </div>
                      <div className="cc-text-xs cc-font-medium cc-text-[#0000007A]">
                        {convertBytesToKB(data.size)}
                      </div>
                    </div>
                    <div>
                      {uploading && (
                        <div className="cc-w-[48] cc-h-[48] md:cc-w-[40px] md:cc-h-[40px]">
                          <CircularProgressbar
                            value={uploadProgress}
                            text={`${Math.round(uploadProgress)}%`}
                            styles={buildStyles({
                              textSize: "23px",
                              pathColor: `#0BABFB, ${uploadProgress / 100})`,
                              textColor: "#8C8A94",
                              trailColor: "#d6d6d6",
                              backgroundColor: "#3e98c7",
                            })}
                          />
                        </div>
                      )}
                      {uploadSuccess && (
                        <div>
                          <img
                            className="delete cc-hidden md:cc-w-[40px] md:cc-h-[40px] "
                            src={images.deleteIcon}
                            alt="delete"
                          />
                          <img
                            className=" success cc-block md:cc-w-[40px] md:cc-h-[40px] "
                            src={images.fileUploadSuccess}
                            alt="success"
                          />
                        </div>
                      )}
                    </div>
                    <div className="cc-hidden md:cc-block ">
                      <img
                        className="cc-hidden md:cc-block cc-cursor-pointer"
                        onClick={() => handleItemClick(index)}
                        src={images.menudot}
                        alt=""
                      />
                      {openDropdown === index && (
                        <div className="mobileCta cc-absolute cc-flex cc-w-[157px]  cc-py-[8px] cc-px-[20px] cc-bg-[#FFFFFF] cc-border-[1px] cc-border-[#F3F3F4] cc-border-solid cc-rounded-[12px] cc-shadow-[0px_8px_24px_-4px_#0000001F] cc-right-[0] cc-top-[61px] cc-z-[2]  cc-justify-between cc-items-center">
                          <p className="cc-text-[14px] cc-leading-[24px] cc-text-[#100C20] cc-font-semibold">
                            Delete
                          </p>
                          <img
                            src={images.deleteIconBlack}
                            className="cc-w-[18px] cc-h-[18px]"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" cc-fixed cc-bottom-[0px] cc-w-full ">
            <DialogFooter>
              <Button
                variant="primary"
                size="lg"
                className="cc-w-full"
                onClick={() => setStep(3)}
              >
                Submit
              </Button>
            </DialogFooter>
          </div>
        </>
      )}
      {step === 3 && (
        <div className="cc-flex cc-flex-col cc-h-full cc-overflow-hidden">
          <div className="cc-flex cc-flex-col cc-h-full">
            <FileSelector
              headName="My files"
              navigationHeadingFirst="All Files"
              forwardMard={false}
              navigationHeadingSecond=""
              navigationHeadingThird=""
              addViewCtaText="Add more files"
              isDeleteCta={true}
              isErrorMessage={true}
              isAddIcon={true}
              forwardMove={() => {
                setStep(4);
              }}
              setIsUploading={setIsUploading}
            />
          </div>
        </div>
      )}
      {step === 4 && (
        <SuccessScreen
          addMoreFiles={() => {
            setStep(1);
          }}
        />
      )}
      {/* {step === 3 && (
        <AuthForm
          onSubmit={() => {
            setStep(3);
          }}
        />
      )} */}
    </>
  );
}
