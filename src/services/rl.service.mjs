import readline from "readline";
import { farewellUser, greetUser } from "../utils/helpers/user.helpers.mjs";

export class ReadlineService {
  constructor(username) {
    this.username = username;

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
    greetUser(this.username);
  }

  handleLineInput(line) {
    // Example: handle '.exit' command
    if (line.trim() === ".exit") {
      this.closeReadline();
    }

    // Add more command handling logic here

    this.rl.prompt();
  }

  closeReadline() {
    farewellUser(this.username);
    this.rl.close();
    process.exit(0);
  }
}
