import os from "os";
import { messages } from "../utils/messages/messages.mjs";

/**
 * Service for retrieving operating system information.
 */
export class OsService {
  /**
   * Prints the system's End-Of-Line marker.
   */

  eol() {
    console.log(`${messages.os.eol}${JSON.stringify(os.EOL)}`);
  }

  /**
   * Prints information about the system's CPUs.
   */

  cpus() {
    console.log(messages.os.cpus);
    os.cpus().forEach((cpu, index) => {
      console.log(
        `CPU ${index + 1}: Model - ${cpu.model}, Speed - ${cpu.speed} MHz`
      );
    });
  }

  /**
   * Prints the current user's home directory.
   */

  homedir() {
    console.log(`${messages.os.homedir}${os.homedir()}`);
  }

  /**
   * Prints the current system user's name.
   */

  username() {
    console.log(`${messages.os.username}${os.userInfo().username}`);
  }

  /**
   * Prints the CPU architecture for which the Node.js binary was compiled.
   */

  architecture() {
    console.log(`${messages.os.architecture}${os.arch()}`);
  }
}
