import Client from "./client/client.js";
import DateUtils from "./utils/dateutils.js";
import cron from "node-cron";
import config from "../config.json" assert { type: "json" };

const client = new Client(config);
const guild = await client.getGuildObject(client.guild);
const targetChannel = await client.findChannelById(guild, "658715415190700053");

const randomTimes = [];

client.once("ready", (ctx) => {
  console.log(`Ready! Logged in as ${ctx.user.tag}`);
  // At midnight, push two random times to the randomTimes array
  cron.schedule("0 0 * * *", () => {
    randomTimes.length = 0;
    // TODO: Make the number of times generated configurable
    for (let i = 0; i < 2; i++) {
      const randomTime = DateUtils.getRandomTime();
      randomTimes.push(randomTime);
    }
  });

  // Every minute, check if the current time is in the randomTimes array
  cron.schedule("*/2 * * * *", async () => {
    console.log("Starting cron job: Check Random Times");
    const currentTime = DateUtils.getCurrentTime();
    let found = false;
    randomTimes.forEach((randomTime) => {
      if (DateUtils.areTimesEqual(currentTime, randomTime)) {
        found = true;
        return;
      }
    });

    if (found) {
      const randomMessage = await client.getRandomMessageFromUser(targetChannel);
      console.log(randomMessage)
      targetChannel.send(randomMessage);
    }
  });
});

// Establish WebSocket connection to Discord.
client.login();
