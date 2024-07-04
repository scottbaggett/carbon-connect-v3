import React from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { images } from "@assets/index";
import { getSupportedFileTypes } from "../../utils/files";
import { ONE_MB } from "../../constants/shared";
import { BannerState } from "../common/Banner";

interface Props {
  onSubmit: (files: File[]) => void;
  maxFileSize: number;
  maxFiles: number;
  allowedFileExtensions: string[];
  setBannerState: React.Dispatch<React.SetStateAction<BannerState>>;
}

const ClickToUpload: React.FC<Props> = ({
  onSubmit,
  maxFileSize,
  maxFiles,
  allowedFileExtensions,
  setBannerState,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: getSupportedFileTypes(allowedFileExtensions),
    maxFiles: maxFiles,
    multiple: maxFiles > 1,
    maxSize: maxFileSize * ONE_MB,
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        onSubmit(acceptedFiles);
      }
      if (fileRejections.length > 0) {
        setBannerState({
          type: "ERROR",
          message: `${fileRejections.length} file(s) didn't meet constraints`,
        });
      }
    },
  });

  return (
    <div className="cc-border md:cc-border-none cc-border-surface-surface_3 cc-rounded-xl cc-m-4">
      <div
        {...getRootProps({
          className:
            "cc-h-full cc-flex cc-flex-col cc-items-center cc-justify-center cc-p-4 sm:cc-h-[500px]",
        })}
      >
        <input {...getInputProps()} />
        <div className="cc-mb-2">
          <img
            src={images.solidplusIcon}
            alt="User Plus"
            className="cc-h-[42px] cc-w-[42px] cc-cursor-pointer"
          />
        </div>
        <div className="cc-flex cc-text-base cc-font-semibold cc-mb-1 cc-text-center cc-max-w-[346px]">
          <div
            className="cc-text-info_em cc-cursor-pointer cc-text-medium md:cc-hidden"
            onClick={() => getInputProps().onClick}
          >
            Click to upload
          </div>
          <div className="cc-text-high_em md:cc-block cc-hidden dark:cc-text-dark-text-white">
            You can upload up to {maxFiles} file
            {maxFiles > 1 && "s or entire folders"}.
          </div>
          <div className="cc-text-high_em md:cc-hidden dark:cc-text-dark-text-white">
            &nbsp;or drag and drop up to {maxFiles} file
            {maxFiles > 1 && "s or folders"}.
          </div>
        </div>
        <div className="cc-text-low_em cc-text-xs dark:cc-text-dark-text-gray">
          max {maxFileSize}MB per file
        </div>
      </div>
    </div>
  );
};

export default ClickToUpload;
