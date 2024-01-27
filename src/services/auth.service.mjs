import { messages } from "../utils/data/messages/messages.mjs";
import { isInvalidUserName } from "../utils/helpers/auth.helpers.mjs";

export class AuthService {
  constructor() {}

  userValidation(username) {
    // Simple validation: check if the username is not empty

    if (isInvalidUserName(username)) {
      throw new Error(messages.errors.auth.username);
    }
    // More complex validation logic can be added here
    return true;
  }

  // Additional authentication methods can be added here
}
