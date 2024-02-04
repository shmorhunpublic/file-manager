import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const pipe = promisify(pipeline);

export class FsService {
  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  async cat(fileName) {
    const filePath = path.join(this.navigationService.location(), fileName);
    const readStream = fs.createReadStream(filePath, "utf-8");
    readStream.on("data", (chunk) => console.log(chunk));
    readStream.on("error", (error) =>
      console.error(`Error reading file: ${error.message}`)
    );
  }

  async add(newFileName) {
    const filePath = path.join(this.navigationService.location(), newFileName);
    fs.writeFileSync(filePath, "");
    console.log(`${newFileName} has been created.`);
  }

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
    console.log(`${oldFileName} has been renamed to ${newFileName}.`);
  }

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
    console.log(`${sourceFileName} has been copied to ${destinationDir}.`);
  }

  async mv(sourceFileName, destinationDir) {
    await this.cp(sourceFileName, destinationDir);
    await this.rm(sourceFileName);
    console.log(`${sourceFileName} has been moved to ${destinationDir}.`);
  }

  async rm(fileName) {
    const filePath = path.join(this.navigationService.location(), fileName);
    fs.unlinkSync(filePath);
    console.log(`${fileName} has been deleted.`);
  }
}
