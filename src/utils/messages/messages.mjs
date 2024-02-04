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
  os: {
    eol: "End-Of-Line Marker: ",
    cpus: "CPUs Information:",
    homedir: "Home Directory: ",
    username: "Current User Name: ",
    architecture: "CPU Architecture: ",
  },
  navigation: {
    initError: "Initialization error: ",
    dirNotExist: "Directory does not exist",
    notADirectory: "Path is not a directory",
    rootDirectory: "Already at the root directory",
    currentDirectory: "Current directory: ",
  },
  commands: {
    exit: "Exiting the File Manager.",
    commandUndefined: "Command is undefined",
    specifyFilePath: "Please specify the file path.",
    specifyFilePathAndDestination:
      "Please specify the file path and destination.",
    directoryChanged: "Directory changed to: ",
    commandError: "Command error: ",
  },
  success: {
    copy: (sourceFileName, destinationDir) =>
      `${sourceFileName} copied successfully to ${destinationDir}.`,
    rename: (oldName, newName) =>
      `File ${oldName} renamed to ${newName} successfully.`,
    delete: (fileName) => `File ${fileName} deleted successfully.`,
    list: "Files in the directory:",
    read: "Content of the file:",
    hash: (filePath, hashValue) => `SHA256 hash of ${filePath}: ${hashValue}`,
    read: "File read successfully.",
    add: (filePath) => `File was created: ${filePath}`,
    compress: (inputFile, outputFile) =>
      `${inputFile} has been compressed to ${outputFile}`,
    decompress: (inputFile, outputFile) =>
      `${inputFile} has been decompressed to to ${outputFile}`,
  },
};
