import morgan from "morgan";
import logger from "./winston.logger";
import getEnv from "../utils/env";

const stream = {
  // Use the http severity
  write: (message) => logger.http(message.trim()),
};

const skip = () => {
  const env = getEnv("nodeEnv") || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
