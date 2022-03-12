const Client = require("./client.js");
const {CRON} = require("./constants.js");
const {MessageTimeUtils} = require("./utils");
const cron = require("node-cron");

// Configuration
const config = require("./config.js")
    .loadConfig("../config.json")

// Discord.js Client wrapper representing the bot user.
const client = new Client(config);
// Discord.js Guild object representing a Discord server.
const guild = (async () => await client.getGuildObject());
// Discord.js Channel object representing a Discord Text Channel in the Discord Server.
const targetChannel = (async () => await client.findChannelById(guild, config.targets.channel));

client.once("ready", (ctx) => {
    console.log(`Ready! Logged in as ${ctx.user.tag}`);
    // Every midnight, generate new times.
    cron.schedule(CRON.EVERY_MIDNIGHT, () => {
        MessageTimeUtils.writeTimesToFile(config.messages);
    }, CRON.DEFAULT_SCHEDULE_OPTIONS);

    // Send a random message if the current time matches.
    cron.schedule(CRON.EACH_MINUTE, async () => {
        const doTimesMatch = MessageTimeUtils.checkCurrentTimeIsInFile()
        if (doTimesMatch) {
            const randomMessage = await client.getRandomMessageFromUser(targetChannel);
            targetChannel.send(randomMessage);
        }
    }, CRON.DEFAULT_SCHEDULE_OPTIONS);
});

// Establish WebSocket connection to Discord.
client.login();