import React, { useState } from "react";

interface DropdownProps {
  options: { label: string; value: string | number }[];
  selectedOption: string | number;
  onSelect: (value: string | number) => void;
  width?: string;
}

const FilterDropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  width = "auto",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cc-relative cc-inline-block cc-text-left">
      <div>
        <button
          type="button"
          className={`cc-inline-flex cc-justify-center cc-rounded-md cc-border cc-border-gray-300 cc-bg-white cc-px-4 cc-py-2 cc-text-sm cc-font-medium cc-text-gray-700 hover:cc-bg-gray-50 focus:cc-outline-none focus:cc-ring-2 focus:cc-ring-offset-2 focus:cc-ring-offset-gray-100 focus:cc-ring-indigo-500 ${
            width ? "cc-w-" + width : ""
          }`}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {options.find((option) => option.value === selectedOption)?.label}
          <svg
            className="cc-ml-2 cc-h-5 cc-w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.879a1 1 0 011.414 1.414l-4 4.5a1 1 0 01-1.414 0l-4-4.5a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="cc-origin-top-right cc-absolute cc-right-0 cc-mt-2 cc-w-56 cc-rounded-md cc-shadow-lg cc-bg-white cc-ring-1 cc-ring-black cc-ring-opacity-5 focus:cc-outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="cc-py-1" role="none">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`cc-block cc-w-full cc-text-left cc-px-4 cc-py-2 cc-text-sm ${
                  selectedOption === option.value
                    ? "cc-bg-gray-100 cc-text-gray-900"
                    : "cc-text-gray-700"
                }`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
