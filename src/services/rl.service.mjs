import readline from "readline";
import { UserService } from "./user.service.mjs";
import { NavigationService } from "./navigation.service.mjs";
import { FsService } from "./fs.services.mjs";

export class ReadlineService {
  constructor() {
    this.userService = new UserService();
    this.navigationService = new NavigationService();
    this.fsService = new FsService(this.navigationService);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  init() {
    this.rl.setPrompt("");
    this.rl.prompt();
    this.rl.on("close", () => this.close());

    this.userService.greet();
    this.navigationService.init();
    this.rl.on("line", async (line) => {
      const [command, ...args] = line.trim().split(" ");
      await this.exec(command, args);
      console.log(`Current directory: ${this.navigationService.location()}`);
      this.rl.prompt();
    });
  }

  async exec(command, args) {
    switch (command) {
      case "cd":
        try {
          const targetDir = args.join(" ");
          this.navigationService.cd(targetDir);
          console.log(
            `Directory changed to: ${this.navigationService.location()}`
          );
        } catch (error) {
          console.error(`Command error 'cd': ${error.message}`);
        }
        break;

      case "up":
        try {
          this.navigationService.up();
          console.log(
            `Current directory: ${this.navigationService.location()}`
          );
        } catch (error) {
          console.error(`Command error 'up': ${error.message}`);
        }
        break;

      case "ls":
        try {
          this.navigationService.ls(); //
        } catch (error) {
          console.error(`Command error "ls": ${error.message}`);
        }
        break;
      case "cat":
        await this.fsService.cat(args.join(" "));
        break;
      case "add":
        await this.fsService.add(args.join(" "));
        break;
      case "rn":
        await this.fsService.rn(args[0], args[1]);
        break;
      case "cp":
        await this.fsService.cp(args[0], args[1]);
        break;
      case "mv":
        await this.fsService.mv(args[0], args[1]);
        break;
      case "rm":
        await this.fsService.rm(args.join(" "));
        break;
      default:
        console.log(`Command '${command}' is undefined`);
        break;
    }
  }

  close() {
    this.userService.farewell();
    this.rl.close();
    process.exit(0);
  }
}
