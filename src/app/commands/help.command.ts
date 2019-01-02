import { RichEmbed, Message } from "discord.js";
import { aBot } from "../app.main";
import { BotConfig } from "../models/bot-config";

export const HelpCommandHandler = (bot: aBot, config: BotConfig, message: Message): Promise<Message | Message[]> => {
  const helpembed = new RichEmbed()
    .setDescription('Commands List')
    .setColor(config.color)
    .setThumbnail(bot.client.user.displayAvatarURL)
    .addField(`${config.prefix}help`, 'Displays this message, use ```!help [command]``` to get help for specific commands')
    .addField(`${config.prefix}botinfo`, 'Gives information about the bot.')
    .addField(`${config.prefix}serverinfo`, 'Gives information about the server')
    .addField(`${config.prefix}version`, 'Displays the current version of the bot.')
    .addField('Suggestions for the bot?', 'Put your suggestions in #suggestions or send @Kualdir#4341 a message!')
    .addField('Feature updates', 'Leveling and economy system');
  return message.channel.send(helpembed);
};
