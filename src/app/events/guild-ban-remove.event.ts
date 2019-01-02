import { Message, Guild, GuildChannel, TextChannel, User } from "discord.js";
import { BotConfig } from "../models/bot-config";

export const GuildBanRemoveEvent = {
  async fire(config: BotConfig, guild: Guild, user: User): Promise<Message | Message[]> {
    const generalChannel = guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      return generalChannel.send(`@${user.username} has been unbanned!`);
    }
    // do nothing, just chill.
    return null;
  }
};