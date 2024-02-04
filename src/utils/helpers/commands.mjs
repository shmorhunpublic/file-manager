export const commands = {
  cd: (fn, args) => fn(args[0] || ""),
  up: (fn, args) => fn(),
  ls: (fn, args) => console.table(fn()),
};
