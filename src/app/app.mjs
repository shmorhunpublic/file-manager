import { ReadlineService } from "../services/rl.service.mjs";
import { UserService } from "../services/user.service.mjs";
import { AuthService } from "../services/auth.service.mjs";

export class App {
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
    this.readlineService = new ReadlineService(this.userService.username);
  }

  run() {
    try {
      this.authService.validation(this.userService.username);
      this.readlineService.init();
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  close() {
    this.userService.farewell();
    process.exit(0);
  }
}
