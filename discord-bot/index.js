const Client = require("./client.js");
const {CRON} = require("./constants.js");
const {ConsoleUtils, MessageTimeUtils} = require("./utils");
const cron = require("node-cron");

// Configuration
const config = require("./config.js")
    .loadConfig("../config.json")

// Discord.js Client wrapper representing the bot user.
const client = new Client(config);

client.once("ready", async (ctx) => {
    ConsoleUtils.printInfoStrong(`Ready! Logged in as ${ctx.user.tag}`);

    // Discord.js Guild object representing a Discord server.
    const guild = await client.getGuildObject();
    // Discord.js Channel object representing a Discord Text Channel in the Discord Server.
    const targetChannel = await client.findChannelById(guild, config.targets.channel);

    ConsoleUtils.printInfo(`Guild: ${guild}, Channel: ${targetChannel}`);

    // Every midnight, generate new times.
    cron.schedule(CRON.EVERY_MIDNIGHT, () => {
        ConsoleUtils.printInfo("Generating new times...");
        MessageTimeUtils.writeTimesToFile(config.messages);
        ConsoleUtils.printSuccess("New times generated!");
    }, CRON.DEFAULT_SCHEDULE_OPTIONS);

    // Send a random message if the current time matches.
    cron.schedule(CRON.EACH_MINUTE, async () => {
        ConsoleUtils.printInfo("Checking time...");
        const doTimesMatch = MessageTimeUtils.checkCurrentTimeIsInFile()
        if (doTimesMatch) {
            ConsoleUtils.printInfoStrong("Time matches. Sending message...");
            const randomMessage = await client.getRandomMessageFromUser(targetChannel);
            targetChannel.send(randomMessage);
            ConsoleUtils.printSuccessStrong("Message sent!");
        }
    }, CRON.DEFAULT_SCHEDULE_OPTIONS);
});

// Establish WebSocket connection to Discord.
client.login();