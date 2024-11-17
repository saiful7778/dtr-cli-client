import getEnv from "./utils/env";
import expressApp from "./expressApp";
import connectDB from "./utils/connectDB";

(async () => {
  const server = expressApp();
  await connectDB();

  const port = getEnv("port");

  server.listen(port, () => {
    console.log(`server is running on port:${port}`);
  });
})();
