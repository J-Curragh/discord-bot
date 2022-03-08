import { Client, Intents, SnowflakeUtil } from "discord.js";
import DateUtils from "../utils/dateutils.js";

export default class extends Client {
  constructor(config) {
    super({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
    this.token = config["token"];
    this.guild = config["guild"];
  }

  async getGuildObject(guildId = this.guild) {
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
    const messageSnowflake = SnowflakeUtil.generate(DateUtils.getRandomDate(
      "01/01/2020",
      "01/09/2021",
    ));
    const messages = await textChannel.messages.fetch({
      limit: 100,
      around: messageSnowflake,
    });
    const message =
      messages.find((message) => message.author.id === "244967176094613504")
        .content;
    console.log(message);
    return message;
  }
}
