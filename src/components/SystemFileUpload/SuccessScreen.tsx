import { images } from "@assets/index";

interface Props {
  addMoreFiles: () => void;
}

const SuccessScreen = ({ addMoreFiles }: Props) => {
  return (
    <div className="cc-border cc-border-surface-surface_3 cc-rounded-xl cc-m-4 md:cc-border-none">
      <div className="cc-h-full cc-flex cc-flex-col cc-items-center cc-justify-center cc-p-4 sm:cc-h-[500px]">
        <div className="cc-mb-2">
          <img src={images.greenTick} alt="Green Tick" className="" />
        </div>
        <div className="cc-flex cc-text-base cc-font-semibold cc-mb-1 cc-text-center cc-max-w-[346px]">
          <div className="cc-text-base cc-text-[#100C20] dark:cc-text-dark-text-white">
            All files submitted successfully.
          </div>
        </div>
        <button
          className="cc-mt-[10px] cc-w-auto cc-p-[8px_24px] cc-text-[14px] cc-leading-[24px] cc-bg-[#0BABFB]  cc-rounded-[12px] cc-font-bold cc-text-[#FFFFFF]"
          onClick={addMoreFiles}
        >
          Add more files
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
