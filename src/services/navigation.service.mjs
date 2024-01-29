import { changeDirectory } from "../modules/fs/cd.mjs";
import fs from "fs";
import path from "path";

export class NavigationService {
  constructor() {
    this.dir = process.cwd();
  }

  cd(dir) {
    try {
      this.dir = changeDirectory(this.location(), dir);
    } catch (error) {
      console.error(`cd command failed: ${error.message}`);
    }
  }

  up() {
    const parentDir = path.dirname(this.dir);
    if (parentDir !== this.dir) {
      this.dir = parentDir;
      this.cd(parentDir);
    } else {
      console.log("Already at the root directory");
    }
  }

  ls() {
    const contents = fs.readdirSync(this.dir, { withFileTypes: true });
    return contents
      .map((dirent, index) => ({
        name: dirent.name,
        type: dirent.isDirectory() ? "folder" : "file",
      }))
      .sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === "folder" ? -1 : 1;
      });
  }

  location() {
    return this.dir;
  }
}
