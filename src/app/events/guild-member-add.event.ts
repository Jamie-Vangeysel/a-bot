import { GuildMember, TextChannel, RichEmbed, GuildChannel, Role } from "discord.js";
import { BotConfig } from "../app.config";

export const GuildMemberAddEvent = {
  async fire(config: BotConfig, member: GuildMember): Promise<GuildMember> {
    console.info(`${member.displayName} has joined the server.`);
    const generalChannel = member.guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      const joinedEmbed = new RichEmbed()
        .setDescription(`${member.displayName} has joined the server.`)
        .setColor(config.color)
        .setThumbnail(member.user.displayAvatarURL)
        .addField('Welcome', `${member.displayName} has entred the server, Hi! :wave:`);
      await generalChannel.send(joinedEmbed);
    } else {
      console.error('error while sending message in welcome chat!');
    }

    const role = member.guild.roles.find((role: Role) => role.name === 'new');
    return member.addRole(role);
  }
};
