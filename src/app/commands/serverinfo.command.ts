import { RichEmbed, Message } from "discord.js";
import { aBot } from "../app.main";
import { BotConfig } from "../models/bot-config";

export const ServerInfoCommandHandler = (bot: aBot, config: BotConfig, message: Message): Promise<Message | Message[]> => {
  const serverembed = new RichEmbed()
    .setDescription('Server Information.')
    // .setColor(config.color)
    .setThumbnail(message.guild.iconURL)
    .addField('Server name', message.guild.name)
    .addField('Created on', message.guild.createdAt)
    .addField('You joined', message.member.joinedAt)
    .addField('Total Members', message.guild.memberCount);
  return message.channel.send(serverembed);
}
