"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: "../../.env",
});
// all `.env` keys
const envVars = {
    port: process.env.PORT || 5000,
    frontendUrl: process.env.FRONTEND_URL,
    nodeEnv: process.env.NODE_ENV,
    dbConnect: process.env.DB_CONNECT,
    accessToken: process.env.ACCESS_TOKEN,
};
exports.default = envVars;
