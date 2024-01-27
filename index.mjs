import { AuthService } from "./src/services/auth.service.mjs";
import { ReadlineService } from "./src/services/rl.service.mjs";
import { messages } from "./src/utils/data/messages/messages.mjs";
import { getUserName } from "./src/utils/helpers/user.helpers.mjs";

const authService = new AuthService();
const { userValidation } = authService;
const readlineService = new ReadlineService(username);

try {
  const username = getUserName();
  userValidation(username);
  console.log(messages.user.greet(username));

  // Set up the readline interface for CLI interaction
  readlineService.initReadline();
} catch (error) {
  console.error(`${messages.errors.auth.failed} ${error.message}`);
  process.exit(1);
}
