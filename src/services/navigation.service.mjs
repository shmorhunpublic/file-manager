import path from "path";
import fs from "fs";
import os from "os";

export class NavigationService {
  constructor() {
    this.homedir = os.homedir();
    this.dir = process.cwd();
  }

  init() {
    try {
      this.cd(this.homedir);
      console.log(`Initial directory: ${this.homedir}`);
    } catch (error) {
      console.error(`Init directory error: ${error.message}`);
    }
  }

  cd(targetDir) {
    const newPath = path.resolve(this.dir, targetDir);
    if (!fs.existsSync(newPath)) {
      throw new Error("Directory does not exist");
    }
    if (!fs.statSync(newPath).isDirectory()) {
      throw new Error("Path is not a directory");
    }
    this.dir = newPath;
  }

  up() {
    const parentDir = path.dirname(this.dir);
    if (parentDir !== this.dir) {
      this.dir = parentDir;
    } else {
      console.log("Already at the root directory");
    }
  }

  ls() {
    const contents = fs.readdirSync(this.dir, { withFileTypes: true });
    return console.table(
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

  location() {
    return this.dir;
  }
}
