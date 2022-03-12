const {COLOURS} = require("./constants.js");
const chalk = require("chalk");

module.exports.loadConfig = (config) => {
    const configFileObj = require(config);

    console.log(chalk.bold("Verifying Config..."));
    // TODO: Verify default times are correct
    const errors = [];

    if (!configFileObj.token) {
        errors.push("No token found in config.json");
    }

    if (!configFileObj.targets?.guild || !configFileObj.targets?.channel || !configFileObj.targets?.user) {
        errors.push("Targets missing from config.json");
    }

    if (configFileObj.messages?.random.enabled && !configFileObj.messages?.random.times) {
        errors.push("Random times enabled but number of times not specified in config.json");
    } else {
        if (configFileObj.messages?.random.times < 1) {
            errors.push("Random times enabled but number of times was given an invalid value in config.json");
        }
    }

    if (!configFileObj.messages?.random.enabled && configFileObj.messages?.random.defaultTimes.length === 0) {
        errors.push("Random times disabled but no default times were provided");
    }

    if (errors.length) {
        console.log(chalk.hex(COLOURS.INFO).bold("There were errors found in config.json:"));
        errors.forEach((err) => {
            console.log(chalk.hex(COLOURS.ERROR)("✗ " + err))
        })
        throw new Error("Config.json invalid.")
    }

    console.log(chalk.hex(COLOURS.GREEN)("Config Verified ✔"));
    return configFileObj;
}
