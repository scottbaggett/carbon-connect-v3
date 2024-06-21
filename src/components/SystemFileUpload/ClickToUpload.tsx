import { images } from "@assets/index";
import React, { useRef } from "react";

interface Props {
  onSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClickToUpload = ({ onSubmit }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = async () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="cc-border cc-border-surface-surface_3 cc-rounded-xl cc-m-4">
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
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            accept=".jpg, .jpeg, .png , .pdf ,.sheet, .xlsx, .csv , .docx , .txt , .md, .rtf , .tsv, .pptx , .json , .mp3 , .mp4 , .mp2, .aac, .wav, .flac, .pcm , .m4a , .ogg , .opus"
            onChange={onSubmit}
          />
          <div className="cc-text-high_em md:cc-block cc-hidden">
            You can upload up to 50 files.
          </div>
          <div className="cc-text-high_em md:cc-hidden">
            &nbsp;or drag and drop up to 50 files.
          </div>
        </div>
        <div className="cc-text-low_em cc-text-xs">max 20MB per file</div>
      </div>
    </div>
  );
};

export default ClickToUpload;
