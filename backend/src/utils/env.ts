import envVars from "../configs/env.config";

type EnvVarsKeys = keyof typeof envVars;

/**
 * This function return `.env` key and throw error when key unavailable
 * @param varName
 * @returns `.env` key value as string
 */
export default function getEnv(varName: EnvVarsKeys): string {
  if (typeof envVars[varName] === "undefined") {
    console.error(`'${varName}' is not available`);
    process.exit(1);
  } else {
    return envVars[varName];
  }
}
