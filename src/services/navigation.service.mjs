import path from "path";
import fs from "fs";
import os from "os";
import { messages } from "../utils/messages/messages.mjs";

/**
 * Service for navigating the file system.
 */
export class NavigationService {
  /**
   * Constructs the navigation service and sets the initial directory paths.
   */
  constructor() {
    this.homedir = os.homedir();
    this.dir = process.cwd();
  }

  /**
   * Initializes the navigation to the home directory.
   */

  init() {
    try {
      this.cd(this.homedir);
    } catch (error) {
      console.error(`${messages.navigation.initError}${error.message}`);
    }
  }

  /**
   * Changes the current directory to the specified target directory.
   * @param {string} targetDir The target directory to change to.
   */

  cd(targetDir) {
    const newPath = path.resolve(this.dir, targetDir);
    if (!fs.existsSync(newPath)) {
      throw new Error(messages.navigation.dirNotExist);
    }
    if (!fs.statSync(newPath).isDirectory()) {
      throw new Error(messages.navigation.notADirectory);
    }
    this.dir = newPath;
    console.log(`${messages.navigation.currentDirectory}${this.dir}`);
  }

  /**
   * Moves up one directory level from the current directory.
   */

  up() {
    const parentDir = path.dirname(this.dir);
    if (parentDir !== this.dir) {
      this.dir = parentDir;
      // console.log(`${messages.navigation.currentDirectory}${this.dir}`);
    } else {
      console.log(messages.navigation.rootDirectory);
    }
  }

  /**
   * Lists the contents of the current directory.
   */

  ls() {
    const contents = fs.readdirSync(this.dir, { withFileTypes: true });
    console.table(
      contents
        .map((dirent, index) => ({
          name: dirent.name,
          type: dirent.isDirectory() ? "folder" : "file",
        }))
        .sort((a, b) => {
          if (a.type === b.type) return a.name.localeCompare(b.name);
          return a.type === "folder" ? -1 : 1;
        })
    );
  }

  /**
   * Gets the current directory path.
   * @returns {string} The current directory path.
   */

  location() {
    return this.dir;
  }
}
