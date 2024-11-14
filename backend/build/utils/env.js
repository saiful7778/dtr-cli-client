"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEnv;
const env_config_1 = __importDefault(require("../configs/env.config"));
/**
 * This function return `.env` key and throw error when key unavailable
 * @param varName
 * @returns `.env` key value as string
 */
function getEnv(varName) {
    if (typeof env_config_1.default[varName] === "undefined") {
        console.error(`'${varName}' is not available`);
        process.exit(1);
    }
    else {
        return env_config_1.default[varName];
    }
}
