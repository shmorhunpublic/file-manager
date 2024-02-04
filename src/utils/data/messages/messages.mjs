export const messages = {
  errors: {
    auth: {
      username: "Invalid or missing username!",
      failed: "Authentication failed:",
    },
    fs: "FS operation failed",
    dir: "Error reading directory",
    fileRead: "Error reading file:",
    writeFile: "Error writing to the file:",
    transform: "Error in transform:",
    compress: "Error during compression:",
    decompress: "Error during decompression:",
  },
  user: {
    greet: (username) => `Welcome to the File Manager, ${username}!`,
    farewell: (username) =>
      `Thank you for using File Manager, ${username}, goodbye!`,
  },
  success: {
    copy: "Folder copied successfully.",
    rename: (oldName, newName) =>
      `File ${oldName} renamed to ${newName} successfully.`,
    delete: (fileName) => `File ${fileName} deleted successfully.`,
    list: "Files in the directory:",
    read: "Content of the file:",
    hash: (fileName) => `SHA256 Hash of ${fileName}:`,
    read: "File read successfully.",
    written: (filePath) => `Data has been written to ${filePath}`,
    compress: (inputFile, outputFile) =>
      `${inputFile} has been compressed to ${outputFile}`,
    decompress: (inputFile, outputFile) =>
      `${inputFile} has been decompressed to to ${outputFile}`,
  },
};
