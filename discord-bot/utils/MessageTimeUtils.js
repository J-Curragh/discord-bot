const {readFileSync, writeFileSync} = require("fs");
const TimeDateUtils = require("./TimeDateUtils.js");
const ConsoleUtils = require("./ConsoleUtils.js");

const file = "./messagetimes";

// TODO: Refactor to reduce number of IO operations made.
const readTimes = () => {
    const fileObj = readFileSync(file);
    return fileObj.toString().split("\n");
};

const writeTimes = (opts) => {
    if (!opts.randomTimesEnabled) {
        const times = opts.defaultTimes;
        writeFileSync(file, times.join("\n"));
        return times;
    }
    let times = [];
    for (let i = 0; i < opts.randomTimesCount; i++) {
        times.push(TimeDateUtils.getRandomTime(opts.startDate, opts.endDate));
    }
    if (opts.defaultTimes.length > 0) {
        times = times.concat(opts.defaultTimes);
    }
    writeFileSync(file, times.join("\n"));
    return times;
};

exports.writeTimesToFile = (config) => {
    ConsoleUtils.printInfo("Writing times to file...");
    const times = writeTimes({
        defaultTimes: config.default,
        randomTimesCount: config.random.times,
        randomTimesEnabled: config.random.enabled,
        startDate: config.random.start,
        endDate: config.random.end,
    });
    ConsoleUtils.printInfo(`Wrote times to file. Times are ${times.join(", ")}`);
};

exports.checkCurrentTimeIsInFile = () => {
    const currentTime = TimeDateUtils.getCurrentTime();
    const times = readTimes();
    let found = false;
    times.forEach((time) => {
        if (TimeDateUtils.areTimesEqual(currentTime, time)) {
            found = true;
        }
    });
    return found;
};

