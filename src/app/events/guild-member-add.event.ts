import { GuildMember, TextChannel, RichEmbed, GuildChannel, Role } from "discord.js";
import { BotConfig } from "../models/bot-config";
import { BotGuildConfig } from "../models/bot-guild-config";

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


    const confGuild: BotGuildConfig = config.guilds.find(e => e.id === member.guild.id);
    confGuild.members.push({
      id: member.id,
      name: member.displayName,
      title: '',
      description: 'hi there OwO!',
      experience: 0,
      level: 0,
      reputation: 0,
      cash: 100,
      bank: 0
    });

    const role = member.guild.roles.find((role: Role) => role.name === 'new');
    if (role) {
      return member.addRole(role);
    } else {
      console.error('new role does not exist!');
      return;
    }
  }
};
