import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { messages } from "../utils/messages/messages.mjs";

const pipe = promisify(pipeline);
/**
 * Service for performing filesystem operations.
 */

export class FsService {
  /**
   * Initializes a new instance of the filesystem service.
   * @param {NavigationService} navigationService Navigation service for current directory access.
   */
  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  /**
   * Reads the content of a file and prints it to the console.
   * @param {string} fileName Name of the file to read.
   */
  async cat(fileName) {
    const filePath = path.join(this.navigationService.location(), fileName);
    const readStream = fs.createReadStream(filePath, "utf-8");

    readStream.on("data", (chunk) => console.log(chunk));
    readStream.on("error", (error) =>
      console.error(`${messages.errors.fileRead} ${error.message}`)
    );
  }

  /**
   * Creates an empty file in the current working directory.
   * @param {string} newFileName Name of the new file to create.
   */
  async add(newFileName) {
    const filePath = path.join(this.navigationService.location(), newFileName);
    fs.writeFileSync(filePath, "");
    console.log(messages.success.add(newFileName));
  }

  /**
   * Renames a file.
   * @param {string} oldFileName Current name of the file.
   * @param {string} newFileName New name of the file.
   */
  async rn(oldFileName, newFileName) {
    const oldFilePath = path.join(
      this.navigationService.location(),
      oldFileName
    );
    const newFilePath = path.join(
      this.navigationService.location(),
      newFileName
    );
    fs.renameSync(oldFilePath, newFilePath);
    console.log(messages.success.rename(oldFileName, newFileName));
  }

  /**
   * Copies a file to a new directory.
   * @param {string} sourceFileName Name of the source file.
   * @param {string} destinationDir Directory to copy the file to.
   */
  async cp(sourceFileName, destinationDir) {
    const sourceFilePath = path.join(
      this.navigationService.location(),
      sourceFileName
    );
    const destinationFilePath = path.join(
      this.navigationService.location(),
      destinationDir,
      sourceFileName
    );

    await pipe(
      fs.createReadStream(sourceFilePath),
      fs.createWriteStream(destinationFilePath)
    );
    console.log(messages.success.copy(sourceFileName, destinationDir));
  }

  /**
   * Moves a file to a new directory.
   * @param {string} sourceFileName Name of the source file.
   * @param {string} destinationDir Directory to move the file to.
   */
  async mv(sourceFileName, destinationDir) {
    await this.cp(sourceFileName, destinationDir);
    await this.rm(sourceFileName);
    console.log(messages.success.rename(sourceFileName, destinationDir));
  }

  /**
   * Deletes a file.
   * @param {string} fileName Name of the file to delete.
   */

  async rm(fileName) {
    const filePath = path.join(this.navigationService.location(), fileName);
    fs.unlinkSync(filePath);
    console.log(messages.success.delete(fileName));
  }
}
