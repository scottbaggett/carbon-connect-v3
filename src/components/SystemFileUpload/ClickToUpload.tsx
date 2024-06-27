import React, { useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { images } from "@assets/index";

interface Props {
  onSubmit: (files: File[]) => void;
}

const ClickToUpload: React.FC<Props> = ({ onSubmit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const fileTypes = [
    "JPG",
    "JPEG",
    "PDF",
    "XLSX",
    "CSV",
    "DOCX",
    "TXT",
    "MD",
    "RTF",
    "PPTX",
    "JSON",
    "MP3",
    "MP4",
    "MP2",
    "AAC",
    "WAV",
    "FLAC",
    "PCM",
    "M4A",
    "OGG",
    "OPUS",
    "WEBP",
  ];

  return (
    <div className="cc-border md:cc-border-none cc-border-surface-surface_3 cc-rounded-xl cc-m-4 ">
      <FileUploader handleChange={onSubmit} multiple={true} types={fileTypes}>
        <div className="cc-h-full cc-flex cc-flex-col cc-items-center cc-justify-center cc-p-4 sm:cc-h-[500px]">
          <div className="cc-mb-2" onClick={handleUploadClick}>
            <img
              src={images.solidplusIcon}
              alt="User Plus"
              className="cc-h-[42px] cc-w-[42px] cc-cursor-pointer"
            />
          </div>
          <div className="cc-flex cc-text-base cc-font-semibold cc-mb-1 cc-text-center cc-max-w-[346px]">
            <div
              onClick={handleUploadClick}
              className="cc-text-info_em cc-cursor-pointer cc-text-medium md:cc-hidden"
            >
              Click to upload
            </div>
            <div className="cc-text-high_em md:cc-block cc-hidden dark:cc-text-dark-text-white">
              You can upload up to 50 files.
            </div>
            <div className="cc-text-high_em md:cc-hidden dark:cc-text-dark-text-white">
              &nbsp;or drag and drop up to 50 files.
            </div>
          </div>
          <div className="cc-text-low_em cc-text-xs dark:cc-text-dark-text-gray">
            max 20MB per file
          </div>
        </div>
      </FileUploader>
    </div>
  );
};

export default ClickToUpload;
