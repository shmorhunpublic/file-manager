import { messages } from "../utils/data/messages/messages.mjs";

export class UserService {
  constructor() {
    this.username = this.init();
  }

  init() {
    const args = process.argv.slice(2);
    const usernameArg = args.find((arg) => arg.startsWith("--username="));
    if (!usernameArg) {
      throw new Error(messages.errors.auth.username);
    }
    return usernameArg.split("=")[1];
  }

  greet() {
    console.log(messages.user.greet(this.username));
  }

  farewell() {
    console.log(messages.user.farewell(this.username));
  }
}
