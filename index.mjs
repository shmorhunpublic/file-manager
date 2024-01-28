import { App } from "./src/app/app.mjs";

const app = new App();

try {
  app.run();
} catch (error) {
  console.error(error.message);
  app.close();
}
