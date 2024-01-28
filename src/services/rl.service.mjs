import readline from "readline";
import { UserService } from "./user.service.mjs";

export class ReadlineService {
  constructor(userService) {
    this.userService = new UserService();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  initReadline() {
    this.rl.setPrompt("> ");
    this.rl.prompt();
    this.rl.on("line", (line) => this.handleLineInput(line));
    this.rl.on("close", () => this.closeReadline());

    // Use UserService to greet the user
    this.userService.greet();
  }

  handleLineInput(line) {
    // Example: handle '.exit' command
    if (line.trim() === ".exit") {
      this.closeReadline();
    }

    // Command handling logic here

    this.rl.prompt();
  }

  closeReadline() {
    // Use UserService to farewell the user
    this.userService.farewell();
    this.rl.close();
    process.exit(0);
  }
}
