import React from "react";
import { useDropzone } from "react-dropzone";
import { images } from "@assets/index";

interface Props {
  onSubmit: (files: File[]) => void;
}

const ClickToUpload: React.FC<Props> = ({ onSubmit }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "application/json": [".json"],
      "audio/mpeg": [".mp3"],
      "video/mp4": [".mp4"],
      "audio/aac": [".aac"],
      "audio/wav": [".wav"],
      "audio/flac": [".flac"],
      "audio/x-pcm": [".pcm"],
      "audio/mp4": [".m4a"],
      "audio/ogg": [".ogg"],
      "audio/opus": [".opus"],
      "image/webp": [".webp"],
    },
    maxFiles: 50,

    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onSubmit(acceptedFiles);
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
            You can upload up to 50 files or entire folders.
          </div>
          <div className="cc-text-high_em md:cc-hidden dark:cc-text-dark-text-white">
            &nbsp;or drag and drop up to 50 files or folders.
          </div>
        </div>
        <div className="cc-text-low_em cc-text-xs dark:cc-text-dark-text-gray">
          max 20MB per file
        </div>
      </div>
    </div>
  );
};

export default ClickToUpload;
