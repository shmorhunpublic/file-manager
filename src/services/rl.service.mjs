import readline from "readline";
import { UserService } from "./user.service.mjs";
import os from "os";
import { NavigationService } from "./navigation.service.mjs";

export class ReadlineService {
  constructor() {
    this.userService = new UserService();
    this.navigationService = new NavigationService();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  init() {
    this.rl.setPrompt("");
    this.rl.prompt();
    this.rl.on("line", (line) => this.handle(line));
    this.rl.on("close", () => this.close());

    // Use UserService to greet the user
    this.userService.greet();

    const startDirectory = os.homedir(); // Get the home directory
    this.navigationService.cd(startDirectory);

    console.log(`Start Directory: ${startDirectory}`);

    this.rl.on("line", async (line) => {
      const [command, ...args] = line.trim().split(" ");
      await this.exec(command, args);
      console.log(`Current directory: ${this.userService.location()}`);
      this.rl.prompt();
    });

    // this.rl.on("line", (line) => {
    //   const [command, ...args] = line.trim().split(" ");
    //   try {
    //     const navigationHandler = commands[command];
    //     if (navigationHandler) {
    //       navigationHandler(this.navigationService, args);
    //     } else {
    //       console.log("Unknown command");
    //     }
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    //   console.log(`Current directory: ${this.navigationService.location()}`);
    //   this.rl.prompt();
    // });
  }

  async exec(command, args) {
    try {
      const commandFunction = (await import(`../modules/${command}.mjs`))
        .default;
      await commandFunction(this, args);
    } catch (error) {
      console.error(`Command execution failed: ${error.message}`);
    }
  }

  // handle(line) {
  //   // Example: handle '.exit' command
  //   if (line.trim() === ".exit") {
  //     this.close();
  //   }

  //   // Command handling logic here

  //   this.rl.prompt();
  // }

  close() {
    // Use UserService to farewell the user
    this.userService.farewell();
    this.rl.close();
    process.exit(0);
  }
}
