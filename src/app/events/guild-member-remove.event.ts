import { GuildMember, TextChannel, RichEmbed, GuildChannel, Message } from "discord.js";
import { BotConfig } from "../models/bot-config";

export const GuildMemberRemoveEvent = {
  async fire(config: BotConfig, member: GuildMember): Promise<Message | Message[]> {
    // console.info(`${member.displayName} has joined the server.`);
    const generalChannel = member.guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      const joinedEmbed = new RichEmbed()
        .setDescription(`${member.displayName} has left the server.`)
        .setColor(config.color)
        .setThumbnail(member.user.displayAvatarURL);
      return generalChannel.send(joinedEmbed);
    } else {
      // console.error('error while sending message in welcome chat!');
    }
  }
};
