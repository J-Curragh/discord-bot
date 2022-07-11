const chalk = require("chalk");
const { COLOURS } = require("../constants.js");
const { getCurrentTime } = require("./TimeDateUtils.js");

const INFO_PREFIX = "[INFO] ";
const ERROR_PREFIX = "[ERROR] ";
const SUCCESS_PREFIX = "[SUCCESS] ";

const log = (message, colour, bold = false) => {
  const TIMESTAMP = getCurrentTime() + " ";
  bold
    ? console.log(TIMESTAMP + chalk.hex(colour).bold(message))
    : console.log(TIMESTAMP + chalk.hex(colour)(message));
};
exports.printInfo = (msg) => log(INFO_PREFIX + msg, COLOURS.INFO);
exports.printInfoStrong = (msg) => log(INFO_PREFIX + msg, COLOURS.INFO, true);
exports.printError = (msg) => log(ERROR_PREFIX + msg, COLOURS.ERROR);
exports.printErrorStrong = (msg) =>
  log(ERROR_PREFIX + msg, COLOURS.ERROR, true);
exports.printSuccess = (msg) => log(SUCCESS_PREFIX + msg, COLOURS.SUCCESS);
exports.printSuccessStrong = (msg) =>
  log(SUCCESS_PREFIX + msg, COLOURS.SUCCESS, true);
