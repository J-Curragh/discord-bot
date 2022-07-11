const { Client: DClient, Intents, SnowflakeUtil } = require("discord.js");
const { TimeDateUtils } = require("./utils");

const REQUEST_LIMIT = 5;

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
    await this.guilds.fetch().then((guilds) => {
      partialGuild = guilds.find((guild) => guild.id === guildId);
    });

    let fullGuild;
    await partialGuild.fetch().then((guild) => {
      fullGuild = guild;
    });
    return fullGuild;
  }

  async findChannelById(guild, channelId) {
    let resChannel;
    await guild.channels
      .fetch()
      .then(
        (channels) =>
          (resChannel = channels.find((channel) => channel.id === channelId))
      );
    return resChannel;
  }

  async getRandomMessagesFromUser(textChannel) {
    for (let i = 0; i < REQUEST_LIMIT; i++) {
      const date = TimeDateUtils.getRandomDate(
        this.msgOpts.random.start,
        this.msgOpts.random.end
      );
      const messageSnowflake = SnowflakeUtil.generate(date);
      const allMessages = await textChannel.messages.fetch({
        limit: 100,
        around: messageSnowflake,
      });

      const messages = allMessages
        .filter((msg) => msg.author.id === this.targets.user)
        .map((msg) => msg.content);

      if (!messages || messages.length === 0) continue;

      return messages;
    }

    return [];
  }
}

module.exports = Client;
