import { Message } from "discord.js";
import { aBot } from "../app.main";
import { BotConfig } from "../models/bot-config";

export const ConfigCommandHandler = (bot: aBot, message: Message, args: string[]): Promise<Message | Message[]> => {
  switch (args[0]) {
    case 'show':
      let botconf: BotConfig = Object.assign({}, bot.config);
      botconf.token = 'nice try...';
      // delete botconf.guilds;
      const confString = JSON.stringify(botconf, null, 2);
      return message.channel.send(`displaying the current configuration: \`\`\`json\n${confString}\n\`\`\``);

    case 'set':
      if (args[1] && args[2]) {
        switch (args[1]) {
          case 'prefix':
            bot.config.prefix = args[2];
            bot.saveConfig();
            break;

          case 'color':
            // bot.config.color = args[2];
            bot.saveConfig();
            break;

          case 'events.ready':
            // bot.config.events.ready = args[2] == 'true';
            bot.saveConfig();
            break;

          case 'events.message':
            // bot.config.events.message = args[2] == 'true';
            bot.saveConfig();
            break;

          case 'events.disconnect':
            // bot.config.events.disconnect = args[2] == 'true';
            bot.saveConfig();
            break;

          case 'events.presenceUpdate':
            // bot.config.events.presenceUpdate = args[2] == 'true';
            bot.saveConfig();
            break;

          case 'events.guildBanAdd':
            // bot.config.events.guildBanAdd = args[2] == 'true';
            bot.saveConfig();
            break;

          case 'events.guildBanRemove':
            // bot.config.events.guildBanRemove = args[2] == 'true';
            bot.saveConfig();
            break;

          case 'events.guildMemberAdd':
            // bot.config.events.guildMemberAdd = args[2] == 'true';
            bot.saveConfig();
            break;

          case 'events.guildMemberRemove':
            // bot.config.events.guildMemberRemove = args[2] == 'true';
            bot.saveConfig();
            break;

          default:
            return message.channel.send(`property '${args[1]}' not found.`);
        }
        return message.channel.send(`updating property '${args[1]}' to '${args[2]}'`);
      } else {
        return message.channel.send(`property and/or value not set please use '${bot.config.prefix}config set {property} {value}'`);
      }

    default:
      return message.channel.send(`unsupported argument, try '${bot.config.prefix}config show'`);
  }
}
