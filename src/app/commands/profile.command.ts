import { RichEmbed, Message } from "discord.js";
import { BotConfig, BotGuildConfig, BotMemberConfig } from "../app.config";
import { aBot } from "../app.main";

export const ProfileCommandHandler = (bot: aBot, config: BotConfig, message: Message): Promise<Message | Message[]> => {
  const confGuild: BotGuildConfig = config.guilds.find(e => e.id === message.guild.id);
  const confMember: BotMemberConfig = confGuild.members.find(e => e.id === message.member.id);

  const helpembed = new RichEmbed()
    .setDescription(`Profile ~ ${confMember.title}${confMember.name}`)
    .setColor(config.color)
    .setThumbnail(message.member.user.displayAvatarURL)
    .addField('description',`${confMember.description}`)
    .addField('balance',`cash: ${confMember.cash}$, bank: ${confMember.bank}`)
    .addField('level',`you are level ${confMember.level}`)
    .addField('reputation',`You have ${confMember.reputation} reputation`);
  return message.channel.send(helpembed);
};
