import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

// all `.env` keys
const envVars = {
  port: process.env.PORT || "5000",
  frontendUrl: process.env.FRONTEND_URL,
  nodeEnv: process.env.NODE_ENV as "development" | "production",
  dbConnect: process.env.DB_CONNECT,
  accessToken: process.env.ACCESS_TOKEN,
};

export default envVars;
