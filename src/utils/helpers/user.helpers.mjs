import { messages } from "../data/messages/messages.mjs";
export const initUser = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith("--username="));
  const username = usernameArg.split("=")[1];
  return username;
};

export const greetUser = (username) =>
  console.log(messages.user.greet(username));

export const farewellUser = (username) =>
  console.log(messages.user.farewell(username));
