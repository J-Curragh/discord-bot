import { readFileSync, writeFileSync } from "fs";
import DateUtils from "./utils/dateutils.js";
import { COLOURS } from "./constants.js";
import chalk from "chalk";

const file = "./messagetimes";

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
    times.push(DateUtils.getRandomTime(opts.startDate, opts.endDate));
  }
  console.log(opts.defaultTimes.length > 0);
  if (opts.defaultTimes.length > 0) {
    times = times.concat(opts.defaultTimes);
  }
  writeFileSync(file, times.join("\n"));
  return times;
};

const writeTimesToFile = (config) => {
  const times = writeTimes({
    defaultTimes: config.messaging.defaultTimes,
    randomTimesCount: config.messaging.randomTimes.times,
    randomTimesEnabled: config.messaging.randomTimes.enabled,
    startDate: config.messaging.randomTimes.startDate,
    endDate: config.messaging.randomTimes.endDate,
  });
  console.log(times)
  console.log(
    chalk.hex(COLOURS.INFO).bold(
      `[INFO]: Wrote times to file. Times are ${times.join(", ")}`,
    ),
  );
};

const checkCurrentTimeIsInFile = () => {
  const currentTime = DateUtils.getCurrentTime();
  const times = readTimes();
  let found = false;
  times.forEach((time) => {
    if (DateUtils.areTimesEqual(currentTime, time)) {
      found = true;
    }
  });
  return found;
};

export { checkCurrentTimeIsInFile, readTimes, writeTimes, writeTimesToFile };
