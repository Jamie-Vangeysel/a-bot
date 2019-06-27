import { Message, RichEmbed } from "discord.js";
import { aBot } from "../app.main";
import { BotConfig } from "../models/bot-config";

export const BotInfoCommandHandler = (bot: aBot, config: BotConfig, message: Message): Promise<Message | Message[]> => {
  const botembed = new RichEmbed()
    .setDescription('Bot made by JamieVangeysel')
    // .setColor(config.color)
    .setThumbnail(bot.client.user.displayAvatarURL)
    .addField('Botname', bot.client.user.username)
    .addField('Created On', bot.client.user.createdAt)
    .addField('Runtime', `${bot.runtime}`)
    .addField('Version', process.env.npm_package_version);
  return message.channel.send(botembed);
};
