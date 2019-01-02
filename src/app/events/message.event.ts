import { Message, Collection } from "discord.js";
import { BotConfig } from "../app.config";
import { aBot } from "../app.main";
import { BotInfoCommandHandler } from "../commands/botinfo.command";
import { ServerInfoCommandHandler } from "../commands/serverinfo.command";
import { VersionCommandHandler } from "../commands/version.command";
import { HelpCommandHandler } from "../commands/help.command";
import { PurgeCommandHandler } from "../commands/purge.command";
import { PingCommandHandler } from "../commands/ping.command";
import { SayCommandHandler } from "../commands/say.command";
import { BalanceCommandHandler } from "../commands/balance.command";
import { ProfileCommandHandler } from "../commands/profile.command";

export const MessageEvent = {
  fire(bot: aBot, config: BotConfig, message: Message): Promise<Message | Message[] | Collection<string, Message>> {
    if (message.author.bot || message.channel.type === 'dm' || message.content.slice(0, config.prefix.length) !== config.prefix) {
      // include error message? console.debug('help me!');
      return;
    }

    // splits the arguments and removes the prefic from the command
    const args: Array<string> = message.content.slice(config.prefix.length).trim().split(/ +/g);
    // get the first element of the argument array, stores it in a const and removes it from the source array
    const command: string = args.shift().toLowerCase();

    switch (command) {
      case 'help':
        return HelpCommandHandler(bot, config, message);

      case 'balance':
        return BalanceCommandHandler(config, message);

      case 'profile':
        return ProfileCommandHandler(bot, config, message);

      case 'say':
        return SayCommandHandler(message, args);

      case 'ping':
        return PingCommandHandler(bot, message);

      case 'serverinfo':
        return ServerInfoCommandHandler(bot, config, message);

      case 'botinfo':
        return BotInfoCommandHandler(bot, config, message);

      case 'version':
        return VersionCommandHandler(message);

      case 'purge':
        return PurgeCommandHandler(message, args);

      case 'terminate':
      case 'kill':
        const allowedRoles: Array<string> = ['Administrator'];
        if (!message.member.roles.some(role => allowedRoles.includes(role.name)))
          return message.reply("Sorry, you don't have permissions to use this!");
        bot.kill();
        return;

      default:
        return message.channel.send(`Unknown command, type ${config.prefix}help for a list of available commands`);
    }

  }
}