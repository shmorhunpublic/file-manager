import readline from "readline";
import { messages } from "../utils/data/messages/messages.mjs";

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
    console.log(messages.user.farewell(this.username));
    this.rl.close();
    process.exit(0);
  }
}
