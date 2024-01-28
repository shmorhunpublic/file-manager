export const commands = {
  cd: (service, args) => service.cd(args[0] || ""),
  up: (service, args) => service.up(),
  ls: (service, args) => console.log(service.ls().join("\n")),
};
