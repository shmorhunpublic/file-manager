import { messages } from "../utils/data/messages/messages.mjs";

export class AuthService {
  constructor() {}

  validation(username) {
    // Simple validation: check if the username is not empty

    if (!username || typeof username !== "string" || username.trim() === "") {
      throw new Error(messages.errors.auth.username);
    }
    // More complex validation logic can be added here
    return true;
  }

  // Additional authentication methods can be added here
}
