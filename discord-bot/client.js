const {Client: DClient, Intents, SnowflakeUtil} = require("discord.js");
const {TimeDateUtils, ConsoleUtils} = require("./utils");

class Client extends DClient {
    constructor(config) {
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        });
        this.token = config.token;
        this.msgOpts = config.messages;
        this.targets = config.targets;
    }

    async getGuildObject(guildId = this.targets.guild) {
        let partialGuild;
        await this.guilds.fetch()
            .then((guilds) => {
                partialGuild = guilds.find((guild) => guild.id === guildId);
            });

        let fullGuild;
        await partialGuild.fetch()
            .then((guild) => {
                fullGuild = guild;
            });
        return fullGuild;
    }

    async findChannelById(guild, channelId) {
        let resChannel;
        await guild.channels.fetch()
            .then((channels) =>
                resChannel = channels.find((channel) => channel.id === channelId)
            );
        return resChannel;
    }

    async getRandomMessageFromUser(textChannel) {
        while (true) {
            const date = TimeDateUtils.getRandomDate(
                this.msgOpts.random.startDate,
                this.msgOpts.random.endDate,
            );
            ConsoleUtils.printInfo(`Fetching messages from ${textChannel.name} using date ${date}`);
            const messageSnowflake = SnowflakeUtil.generate(date);
            const messages = await textChannel.messages.fetch({
                limit: 100,
                around: messageSnowflake,
            });

            // TODO: instead of finding the first message, filter a list and pick a random one
            const message = messages.find((message) =>
                message.author.id === this.targets.user
            ).content;

            if (!message) continue;

            return message;
        }
    }
}

module.exports = Client;
