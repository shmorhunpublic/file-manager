export const getUserName = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith("--username="));
  const username = usernameArg.split("=")[1];
  return username;
};
