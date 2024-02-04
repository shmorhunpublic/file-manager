import crypto from "crypto";
import fs from "fs";
import path from "path";

export class HashService {
  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  hash(filePath) {
    const fullPath = path.join(this.navigationService.location(), filePath);
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(fullPath);

    stream.on("data", (data) => {
      hash.update(data);
    });

    stream.on("end", () => {
      console.log(`Hash of ${filePath}: ${hash.digest("hex")}`);
    });

    stream.on("error", (error) => {
      console.error(`Error reading file: ${error.message}`);
    });
  }
}
