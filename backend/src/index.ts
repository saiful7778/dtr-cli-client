import expressApp from "./expressApp";
import getEnv from "./utils/env";

const server = expressApp();

server.listen(getEnv("port"), () => {
  console.log(`server is running on port ${getEnv("port")}`);
});
