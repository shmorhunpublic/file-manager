import fs from "fs";
import path from "path";

export class NavigationService {
  constructor() {
    this.dir = process.cwd();
  }

  cd(dir) {
    // Implementation for changing directory
    console.log("cd command");
  }

  up() {
    // Implementation for going up one directory
    console.log("up command");
  }

  ls() {
    // Implementation for listing directory contents
  }

  location() {
    return this.dir;
  }
}
