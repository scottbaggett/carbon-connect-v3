import React, { useState } from "react";
import FolderIcon from "@assets/svgIcons/folder.svg";
import FIleIcon from "@assets/svgIcons/file.svg";
import { Checkbox } from "@components/common/design-system/Checkbox";

export type FileItemType = {
  type: "FILE";
  id: string;
  name: string;
  createdAt: string;
  status?: "READY" | "ERROR" | "SYNCING";
};

export type FolderItemType = {
  type: "FOLDER";
  id: string;
  name: string;
  createdAt: string;
  status?: "READY" | "ERROR" | "SYNCING";
};

export type GithubRepoItemType = {
  type: "GITHUB_REPO";
  id: string;
  name: string;
  url: string;
  status?: "READY" | "ERROR" | "SYNCING";
};

type FileListItemProps = {
  isChecked: boolean;
  onSelect: () => void;
  item: FileItemType | FolderItemType | GithubRepoItemType;
};

export default function FileListItem({
  item,
  isChecked,
  onSelect,
}: FileListItemProps) {
  return (
    <li
      key={item.id}
      className="cc-flex cc-transition-all cc-py-3 cc-font-semibold cc-text-high_em cc-text-sm cc-border-b cc-border-outline-base_em hover:cc-bg-gray-25 cc-cursor-pointer"
    >
      <div className="cc-gap-2 cc-flex cc-items-start cc-w-full sm:cc-px-2">
        <Checkbox
          className="cc-my-0.5"
          checked={isChecked}
          onCheckedChange={onSelect}
        />
        {item.type === "FOLDER" && (
          <img
            src={FolderIcon}
            alt="Folder Icon"
            className="cc-w-5 cc-shrink-0"
          />
        )}
        {item.type === "FILE" && (
          <img
            src={FIleIcon}
            alt="Folder Icon"
            className="cc-w-5 cc-shrink-0"
          />
        )}
        <div className="cc-flex cc-flex-grow cc-gap-x-4 cc-gap-y-1 cc-flex-wrap">
          <p className="cc-flex-grow">{item.name}</p>
          <>
            {item.status && item.status === "READY" && (
              <div className="cc-bg-surface-success_accent_1 cc-text-success_high_em cc-py-[3px] cc-text-xs cc-px-2 cc-rounded-lg">
                Ready
              </div>
            )}
            {item.status && item.status === "ERROR" && (
              <div className="cc-bg-surface-danger_accent_1 cc-text-outline-danger_high_em cc-py-[3px] cc-text-xs cc-px-2 cc-rounded-lg">
                Error
              </div>
            )}
            {item.status && item.status === "SYNCING" && (
              <div className="cc-bg-surface-warning_accent_1 cc-text-warning-600 cc-py-[3px] cc-text-xs cc-px-2 cc-rounded-lg">
                Syncing
              </div>
            )}
          </>
          <p className="cc-w-full cc-shrink-0 cc-text-left cc-text-xs cc-text-low_em sm:cc-text-high_em sm:cc-w-[200px] sm:text-sm sm:cc-text-right sm:cc-text-sm cc-truncate">
            {(item.type === "FOLDER" || item.type === "FILE") && item.createdAt}
            {item.type === "GITHUB_REPO" && item.url}
          </p>
        </div>
      </div>
    </li>
  );
}
