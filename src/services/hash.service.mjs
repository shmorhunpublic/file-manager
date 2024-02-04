import crypto from "crypto";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { messages } from "../utils/messages/messages.mjs";

const pipe = promisify(pipeline); // Promisify the pipeline for async/await usage

/**
 * Service for hashing files using SHA256.
 */
export class HashService {
  /**
   * Initializes a new instance of the HashService.
   * @param {NavigationService} navigationService - Service to manage navigation and current directory.
   */
  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  /**
   * Asynchronously calculates the SHA256 hash of a file.
   * @param {string} filePath - The path to the file, relative to the current directory.
   * @returns {Promise<void>} - The promise that resolves when hashing is complete.
   */
  async hash(filePath) {
    const fullPath = path.join(this.navigationService.location(), filePath);
    const hash = crypto.createHash("sha256");
    try {
      await pipe(fs.createReadStream(fullPath), hash);
      console.log(`Hash of ${filePath}: ${hash.digest("hex")}`);
    } catch (error) {
      console.error(`${messages.errors.fileRead} ${error.message}`);
    }
  }
}
