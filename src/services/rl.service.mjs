import readline from "readline";
import { UserService } from "./user.service.mjs";
import { NavigationService } from "./navigation.service.mjs";
import { FsService } from "./fs.services.mjs";
import { OsService } from "./os.service.mjs";
import { HashService } from "./hash.service.mjs";
import { ArchiveService } from "./archive.service.mjs";
import { messages } from "../utils/messages/messages.mjs";

/**
 * Service for handling readline interface and executing user commands.
 */

export class ReadlineService {
  /**
   * Initializes services used for command execution.
   */

  constructor() {
    this.userService = new UserService();
    this.navigationService = new NavigationService();
    this.fsService = new FsService(this.navigationService);
    this.osService = new OsService();
    this.hashService = new HashService(this.navigationService);
    this.archiveService = new ArchiveService(this.navigationService);

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * Initializes the readline prompt and sets up command processing.
   */
  init() {
    this.rl.setPrompt("");
    this.rl.prompt();
    this.rl.on("close", () => this.close());

    this.userService.greet();
    this.navigationService.init();
    this.rl.on("line", async (line) => {
      const [command, ...args] = line.trim().split(" ");
      await this.exec(command, args);
      console.log(
        `${
          messages.navigation.currentDirectory
        }${this.navigationService.location()}`
      );
      this.rl.prompt();
    });
  }

  /**
   * Executes the given command with provided arguments.
   * @param {string} command - The command to execute.
   * @param {Array<string>} args - Arguments for the command.
   */

  async exec(command, args) {
    try {
      switch (command) {
        case ".exit":
          this.exit();
          break;
        case "cd":
          const targetDir = args.join(" ");
          this.navigationService.cd(targetDir);
          console.log(
            `${
              messages.commands.directoryChanged
            }${this.navigationService.location()}`
          );
          break;
        case "up":
          this.navigationService.up();
          console.log(
            `${
              messages.commands.directoryChanged
            }${this.navigationService.location()}`
          );
          break;
        case "ls":
          this.navigationService.ls();
          break;
        case "cat":
          await this.fsService.cat(args.join(" "));
          break;
        case "add":
          await this.fsService.add(args.join(" "));
          break;
        case "rn":
          await this.fsService.rn(args[0], args.slice(1).join(" "));
          break;
        case "cp":
          await this.fsService.cp(args[0], args.slice(1).join(" "));
          break;
        case "mv":
          await this.fsService.mv(args[0], args.slice(1).join(" "));
          break;
        case "rm":
          await this.fsService.rm(args.join(" "));
          break;
        case "os":
          this.handleOsCommand(args);
          break;
        case "hash":
          if (args.length) {
            await this.hashService.hash(args.join(" "));
          } else {
            console.log(messages.commands.specifyFilePath);
          }
          break;
        case "compress":
          if (args.length >= 2) {
            await this.archiveService.compress(
              args[0],
              args.slice(1).join(" ")
            );
          } else {
            console.log(messages.commands.specifyFilePathAndDestination);
          }
          break;
        case "decompress":
          if (args.length >= 2) {
            await this.archiveService.decompress(
              args[0],
              args.slice(1).join(" ")
            );
          } else {
            console.log(messages.commands.specifyFilePathAndDestination);
          }
          break;
        default:
          console.log(`${messages.commands.commandUndefined} '${command}'`);
          break;
      }
    } catch (error) {
      console.error(
        `${messages.commands.commandError} '${command}': ${error.message}`
      );
    }
  }

  /**
   * Handles OS related commands.
   * @param {Array<string>} args - Arguments for the OS command.
   */

  handleOsCommand(args) {
    if (args.length) {
      switch (args[0]) {
        case "--EOL":
          this.osService.eol();
          break;
        case "--cpus":
          this.osService.cpus();
          break;
        case "--homedir":
          this.osService.homedir();
          break;
        case "--username":
          this.osService.username();
          break;
        case "--architecture":
          this.osService.architecture();
          break;
        default:
          console.log(messages.commands.unknownOsCommand);
          break;
      }
    }
  }

  /**
   * Exits the File Manager application.
   */

  exit() {
    this.rl.close();
    process.exit(0);
  }

  /**
   * Closes the readline interface and exits the application.
   */
  close() {
    this.userService.farewell();
    this.exit();
  }
}
