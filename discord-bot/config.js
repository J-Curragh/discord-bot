const { ConsoleUtils } = require("./utils");

module.exports.loadConfig = (config) => {
    const configFileObj = require(config);

    ConsoleUtils.printInfoStrong("Verifying Config...");
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
        ConsoleUtils.printInfoStrong("There were errors found in your config.json. " +
            "Please fix them and try again.");
        errors.forEach((err) => {
            ConsoleUtils.printError("✗ " + err)
        })
        throw new Error("Config.json invalid.")
    }

    ConsoleUtils.printSuccess("Config Verified ✔");
    return configFileObj;
}
