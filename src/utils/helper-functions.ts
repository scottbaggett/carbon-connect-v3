import {
  DEFAULT_CHUNK_SIZE,
  DEFAULT_OVERLAP_SIZE,
  SYNC_FILES_ON_CONNECT,
  SYNC_SOURCE_ITEMS,
} from "../constants/shared";
import { useCarbon } from "../context/CarbonContext";
import { CarbonConnectProps, ProcessedIntegration } from "../typing/shared";

export function isEmpty(obj: any) {
  let isEmpty = false;
  const type = typeof obj;
  isEmpty = isEmpty || !obj;
  isEmpty = isEmpty || type === "undefined"; // if it is undefined
  isEmpty = isEmpty || obj === null; // if it is null
  isEmpty = isEmpty || (type === "string" && obj.trim() === ""); // if the string is empty or only have spaces
  isEmpty = isEmpty || obj === false || obj === 0; // if boolean value returns false
  isEmpty = isEmpty || (Array.isArray(obj) && obj.length === 0); // if array is empty
  isEmpty = isEmpty || (type === "object" && Object.keys(obj).length === 0); // if object is empty
  return isEmpty;
}

export const deepClone = (data: any = {}) => {
  return JSON.parse(JSON.stringify(data));
};

export const emptyFunction = () => {};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = 500
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getInitials = (name: string) => {
  if (name !== undefined && name !== null) {
    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0].toUpperCase();
      }
    }
    return initials;
  }
};

export function keyExists(key: string, obj: any) {
  if (
    (Array.isArray(obj) && key in obj) ||
    (obj instanceof Object && Object.prototype.hasOwnProperty.call(obj, key))
  ) {
    return true;
  }
  return false;
}

export const generateRequestId = (length: number) => {
  const prefix = "cc-";
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return prefix + result;
};

export const getConnectRequestProps = (
  processedIntegration: ProcessedIntegration,
  requestId: string | null,
  additionalProps: object = {},
  carbonProps: CarbonConnectProps
) => {
  const {
    chunkSize,
    overlapSize,
    embeddingModel,
    generateSparseVectors,
    prependFilenameToChunks,
    tags,
    fileSyncConfig,
  } = carbonProps;

  const chunkSizeValue =
    processedIntegration?.chunkSize || chunkSize || DEFAULT_CHUNK_SIZE;
  const overlapSizeValue =
    processedIntegration?.overlapSize || overlapSize || DEFAULT_OVERLAP_SIZE;
  const skipEmbeddingGeneration =
    processedIntegration?.skipEmbeddingGeneration || false;
  const embeddingModelValue = embeddingModel || null;
  const generateSparseVectorsValue =
    processedIntegration?.generateSparseVectors ||
    generateSparseVectors ||
    false;
  const prependFilenameToChunksValue =
    processedIntegration?.prependFilenameToChunks ||
    prependFilenameToChunks ||
    false;
  const syncFilesOnConnection =
    processedIntegration?.syncFilesOnConnection ?? SYNC_FILES_ON_CONNECT;
  const syncSourceItems =
    processedIntegration?.syncSourceItems ?? SYNC_SOURCE_ITEMS;
  const fileSyncConfigValue =
    processedIntegration?.fileSyncConfig || fileSyncConfig || {};

  return {
    ...additionalProps,
    tags: tags,
    chunk_size: chunkSizeValue,
    chunk_overlap: overlapSizeValue,
    skip_embedding_generation: skipEmbeddingGeneration,
    embedding_model: embeddingModelValue,
    generate_sparse_vectors: generateSparseVectorsValue,
    prepend_filename_to_chunks: prependFilenameToChunksValue,
    sync_files_on_connection: syncFilesOnConnection,
    ...(requestId && { request_id: requestId }),
    sync_source_items: syncSourceItems,
    file_sync_config: fileSyncConfigValue,
  };
};
