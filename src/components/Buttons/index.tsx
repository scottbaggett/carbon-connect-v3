import React from "react";
import { debounce, emptyFunction } from "../../utils/helper-functions";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: string;
  size?: string;
  widthSize?: string;
  customClassName?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick = emptyFunction,
  label,
  type = "solid",
  size = "v1",
  widthSize = "auto",
  customClassName = "",
  disabled = false,
}) => {
  let cls = "inline-flex items-center justify-center";

  if (type === "solid") {
    cls += disabled
      ? " cc-cursor-not-allowed cc-font-extrabold cc-rounded-xl cc-text-white cc-bg-surface-info_main cc-bg-opacity-30"
      : " cc-cursor-pointer cc-font-extrabold cc-rounded-xl cc-bg-surface-info_main cc-text-white  hover:cc-bg-surface-info_main focus:cc-bg-surface-info_main active:cc-bg-surface-info_main";
  } else if (type === "outline") {
    cls += disabled
      ? " cc-cursor-not-allowed cc-font-extrabold cc-rounded-xl cc-text-primary cc-border cc-border-color-black-7 cc-border-opacity-40 cc-bg-surface-white cc-bg-opacity-40"
      : " cc-cursor-pointer cc-font-extrabold cc-rounded-xl cc-bg-surface-white cc-text-primary cc-border cc-border-color-black-7 hover:cc-text-primary-hover focus:cc-text-primary-hover active:cc-text-primary-active hover:cc-border-color-black-7-hover focus:cc-border-color-black-7-hover active:cc-border-color-black-7-active";
  } else if (type === "link") {
    cls += disabled
      ? " cc-cursor-not-allowed cc-font-extrabold cc-text-primary cc-text-opacity-40"
      : " cc-cursor-pointer cc-font-extrabold cc-text-primary hover:cc-text-primary-hover focus:cc-text-primary-hover active:cc-text-primary-active";
  }

  if (size === "v1") {
    cls += " cc-text-16 cc-leading-24";
    cls += type === "link" ? " cc-px-2" : " cc-px-4 cc-py-3";
  } else if (size === "v2") {
    cls += " cc-text-14 cc-leading-20";
    cls += type === "link" ? " cc-px-2" : " cc-px-3 cc-py-3";
  }

  if (widthSize === "auto") {
    cls += "";
  } else if (widthSize === "full") {
    cls += " cc-w-full";
  }

  return (
    <button
      className={`${customClassName} ${cls}`}
      onClick={disabled ? emptyFunction : debounce(onClick)}
    >
      {label}
    </button>
  );
};

export { Button };
