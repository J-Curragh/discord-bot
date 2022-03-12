const {COLOURS} = require("./utils");
const chalk = require("chalk");

module.exports.loadConfig = (config) => {
    const configFileObj = require(config);

    console.log(chalk.bold("--- Verifying Config ---"));
    // TODO: Verify default times are correct
    if (!config.token) {
        throw new Error("[ERROR] No token found in config.json");
    }

    if (!config.targets?.guild || !config.targets?.channel || !config.targets?.user) {
        throw new Error("[ERROR] Targets missing from config.json");
    }

    if (config.messages?.randomTimes.enabled && !config.messages?.random.times) {
        throw new Error("[ERROR] Random times enabled but number of times not specified in config.json",);
    } else {
        if (config.messages.random.times < 1) {
            throw new Error("[ERROR] Random times enabled but number of times was given an invalid value in config.json");
        }
    }

    if (!config.messages?.randomTimes.enabled && config.messages?.defaultTimes.defaultTimes.length === 0) {
        throw new Error("[ERROR] Random times disabled but no default times were provided",);
    }

    console.log(chalk.hex(COLOURS.GREEN)("Config Verified ✔"));

    return configFileObj;
}
