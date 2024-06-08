import React, { useEffect } from "react";
import { images } from "@assets/index";
import { emptyFunction } from "@utils/helper-functions";

interface SearchProps {
  label?: string;
  customClassName?: string;
  searchText?: string;
  setSearchText?: (searchText: string) => void;
  onSearchText?: (searchText: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setFocus?: (focusState: boolean) => void;
  text?: string;
}

const Search: React.FC<SearchProps> = ({
  label,
  customClassName = "",
  searchText = "",
  setSearchText = emptyFunction,
  onSearchText = emptyFunction,
  setFocus = emptyFunction,
  text = "",
}) => {
  const onChangeText = (resText: string) => {
    const text = resText.replace(/[^a-zA-Z0-9 ()]/g, "");
    setSearchText(text);
  };

  useEffect(() => {
    setSearchText(text);
  }, [text]);

  function searchOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSearchText?.(searchText);
    }
  }

  return (
    <div className={`${customClassName}`}>
      <span className="cc-absolute cc-mt-[14px] cc-ml-4">
        <img
          src={images.searchIcon}
          alt="search Icon"
          className="cc-h-5 cc-w-5"
        />
      </span>
      <input
        type="text"
        placeholder={label}
        className={`cc-pl-12 cc-py-3 cc-bg-color-black-7 cc-outline-none cc-rounded-xl cc-pr-4 cc-w-full`}
        onChange={(e) => onChangeText(e?.target?.value)}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
          searchOnKeyDown(event)
        }
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={searchText}
      />
    </div>
  );
};

export { Search };
