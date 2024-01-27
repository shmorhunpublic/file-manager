export const ERRORS = {
  ENOENT: "ENOENT", // "Error NO ENTry" or "Error No Entity"
  AUTH: "",
};

export const PATHS = {
  COPY_PATH: (fileName) => [fileName],
  COPY_TO: ["files_copy"],
  FILES_DIR: (fileName) => ["files", fileName],
};
