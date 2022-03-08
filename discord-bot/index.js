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
  // Every Second, push two random times to the randomTimes array
  cron.schedule("* * * * * *", () => {
    console.log("Starting cron job: Generate Random Times");
    for (let i = 0; i < 2; i++) {
      const randomTime = DateUtils.getRandomTime();
      randomTimes.push(randomTime);
    }
  });

  // Every 10 minutes, check if the current time is in the randomTimes array
  cron.schedule("*/10 * * * *", async () => {
    console.log("Starting cron job: Check Random Times");
    const currentTime = DateUtils.getCurrentTime();
    const found = false;
    randomTimes.forEach((randomTime) => {
      if (DateUtils.areTimesEqual(currentTime, randomTime)) {
        console.log("Found a match!");
        found = true;
        return;
      }
    });

    if (found) {
      const randomMessage = await client.getRandomMessageFromUser();
      targetChannel.send(randomMessage);
    }
  });

  // cron.schedule("* * * * *", async () => {
  //   console.log("Running cron job");
  //   const randomMessage = await client.getRandomMessageFromUser(targetChannel);
  //   console.log("Message:", randomMessage)
  //   targetChannel.send(randomMessage);
  // });
});

// Establish WebSocket connection to Discord.
client.login();
