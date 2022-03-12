const chalk = require("chalk");
const {COLOURS} = require("../constants.js");

const INFO_PREFIX = "[INFO] "
const ERROR_PREFIX = "[ERROR] "
const SUCCESS_PREFIX = "[SUCCESS] "
exports.printInfo = (msg) => console.log(chalk.hex(COLOURS.INFO)(INFO_PREFIX + msg));
exports.printInfoStrong = (msg) => console.log(chalk.hex(COLOURS.INFO).bold(INFO_PREFIX + msg));
exports.printError = (msg) => console.log(chalk.hex(COLOURS.ERROR)(ERROR_PREFIX + msg));
exports.printErrorStrong = (msg) => console.log(chalk.hex(COLOURS.ERROR).bold(ERROR_PREFIX + msg));
exports.printSuccess = (msg) => console.log(chalk.hex(COLOURS.SUCCESS)(SUCCESS_PREFIX + msg));
exports.printSuccessStrong = (msg) => console.log(chalk.hex(COLOURS.SUCCESS).bold(SUCCESS_PREFIX + msg));