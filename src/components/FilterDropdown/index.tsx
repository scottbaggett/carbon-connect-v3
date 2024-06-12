import React, { useEffect, useRef, useState } from "react";

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

  const optionsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="cc-relative cc-inline-block cc-text-left">
      <div>
        {/* ref={optionsRef} */}
        <button
          type="button"
          className={`cc-flex cc-items-center cc-rounded-md cc-border cc-border-outline-base_em cc-bg-outline-base_em cc-px-1 cc-py-1 cc-text-xxs cc-font-semibold cc-w-11 cc-text-med_em hover:cc-bg-gray-50 ${
            width ? "cc-w-" + width : ""
          }`}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {options.find((option) => option.value === selectedOption)?.label}
          <svg
            className="cc-ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 10"
            aria-hidden="true"
            width="12"
            height="8"
          >
            <path
              fillRule="evenodd"
              d="M5.293 3.293a1 1 0 011.414 0L10 7.586l3.293-4.293a1 1 0 011.414 1.414l-4 5a1 1 0 01-1.414 0l-4-5a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="cc-z-20 cc-origin-top-right cc-absolute cc-right-0 cc-mt-2 cc-w-24 cc-rounded-md cc-shadow-lg cc-bg-white cc-ring-1 cc-ring-black cc-ring-opacity-5 focus:cc-outline-none"
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
