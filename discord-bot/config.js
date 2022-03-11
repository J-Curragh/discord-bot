import { COLOURS } from "./constants.js";
import { readFileSync } from "fs";
import chalk from "chalk";

let config = JSON.parse(readFileSync("./config.json"));

console.log(chalk.bold("--- Verifying Config ---"));

// TODO: Verify default times are correct

if (!config.token) {
  throw new Error("[ERROR] No token found in config.json");
}

if (
  !config.targets?.guild || !config.targets?.channel || !config.targets?.user
) {
  throw new Error("[ERROR] Targets missing from config.json");
}

if (
  config.messaging?.randomTimes.enabled && !config.messaging?.randomTimes.times
) {
  throw new Error(
    "[ERROR] Random times enabled but no times specified in config.json",
  );
}

if (
  !config.messaging?.randomTimes.enabled &&
  config.messaging?.defaultTimes.defaultTimes.length === 0
) {
  throw new Error(
    "[ERROR] Random times disabled but no default times were provided",
  );
}

console.log(chalk.hex(COLOURS.GREEN)("Config Verified ✔"));

export default config;
