import { AuthService } from "../services/auth.service.mjs";
import { ReadlineService } from "../services/rl.service.mjs";
import { messages } from "../utils/data/messages/messages.mjs";
import { initUser } from "../utils/helpers/user.helpers.mjs";

export class App {
  constructor() {
    this.user = initUser();
    this.authService = new AuthService();
    this.readlineService = new ReadlineService(this.user);
  }

  run() {
    try {
      this.authService.userValidation(this.user);
      this.readlineService.initReadline();
    } catch (error) {
      console.error(`${messages.errors.auth.failed} ${error.message}`);
      process.exit(1);
    }
  }
}
