import Client from "./client.js";
import { CRON } from "./constants.js";
import { checkCurrentTimeIsInFile, writeTimesToFile } from "./times.js";
import config from "./config.js";
import cron from "node-cron";

const client = new Client(config);
const guild = await client.getGuildObject();
const targetChannel = await client.findChannelById(
  guild,
  config.targets.channel,
);

client.once("ready", (ctx) => {
  console.log(`Ready! Logged in as ${ctx.user.tag}`);
  // Every midnight, write new times to file
  cron.schedule(CRON.EVERY_MIDNIGHT, () => {
    writeTimesToFile(config);
  });

  cron.schedule(CRON.EACH_MINUTE, async () => {
    const doTimesMatch = checkCurrentTimeIsInFile()
    if (doTimesMatch) {
      const randomMessage = await client.getRandomMessageFromUser(
        targetChannel,
      );
      targetChannel.send(randomMessage);
    }
  });
});

// Establish WebSocket connection to Discord.
client.login();
