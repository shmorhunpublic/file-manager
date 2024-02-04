import { messages } from "../utils/data/messages/messages.mjs";

export class AuthService {
  constructor() {}

  validation(username) {
    if (!username || typeof username !== "string" || username.trim() === "") {
      throw new Error(messages.errors.auth.username);
    }

    return true;
  }
}
