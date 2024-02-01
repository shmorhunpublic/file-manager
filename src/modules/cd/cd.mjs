import path from "path";
import fs from "fs";
export async function cd(currentDir, targetDir) {
  const newPath = path.resolve(currentDir, targetDir);
  if (!fs.existsSync(newPath)) {
    throw new Error("Directory does not exist");
  }
  if (!fs.statSync(newPath).isDirectory()) {
    throw new Error("Path is not a directory");
  }
  return newPath;
}
