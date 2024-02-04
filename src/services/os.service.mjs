import os from "os";

export class OsService {
  eol() {
    console.log(`EOL Marker: ${JSON.stringify(os.EOL)}`);
  }

  cpus() {
    console.log(`CPUs Info:`);
    os.cpus().forEach((cpu, index) => {
      console.log(
        `CPU ${index + 1}: Model - ${cpu.model}, Speed - ${cpu.speed} MHz`
      );
    });
  }

  homedir() {
    console.log(`Home Directory: ${os.homedir()}`);
  }

  username() {
    console.log(`Current User Name: ${os.userInfo().username}`);
  }

  architecture() {
    console.log(`CPU Architecture: ${os.arch()}`);
  }
}
