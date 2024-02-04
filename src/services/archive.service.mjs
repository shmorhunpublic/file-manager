import { messages } from "../utils/messages/messages.mjs";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";

const pipe = promisify(pipeline);

/**
 * Service for archiving files.
 */

export class ArchiveService {
  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  /**
   * Compresses a file using Brotli algorithm.
   * @param {string} filePath - The path to the file to compress.
   * @param {string} destination - The destination path for the compressed file.
   * @returns {Promise<void>}
   */

  async compress(filePath, destination) {
    const sourcePath = path.join(this.navigationService.location(), filePath);
    const destinationPath =
      path.join(this.navigationService.location(), destination) + ".br";

    try {
      await pipe(
        createReadStream(sourcePath),
        createBrotliCompress(),
        createWriteStream(destinationPath)
      );
      console.log(messages.success.compress(filePath, destinationPath));
    } catch (error) {
      console.error(`${messages.errors.compress} ${error.message}`);
    }
  }

  /**
   * Decompresses a file using Brotli algorithm.
   * @param {string} filePath - The path to the compressed file.
   * @param {string} destination - The destination path for the decompressed file.
   * @returns {Promise<void>}
   */

  async decompress(filePath, destination) {
    const sourcePath = path.join(this.navigationService.location(), filePath);
    const destinationPath = path.join(
      this.navigationService.location(),
      destination
    );

    try {
      await pipe(
        createReadStream(sourcePath),
        createBrotliDecompress(),
        createWriteStream(destinationPath)
      );
      console.log(messages.success.decompress(filePath, destinationPath));
    } catch (error) {
      console.error(`${messages.errors.decompress} ${error.message}`);
    }
  }
}
