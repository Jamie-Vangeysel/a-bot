import aBot from "../app.main";
import { BotConfig } from "../models/bot-config";
import { Message, RichEmbed } from "discord.js";

export default class HomeController {
  private _bot: aBot;
  private _config: BotConfig;

  constructor(bot: aBot, config: BotConfig) {
    this._bot = bot;
    this._config = config;
  }

  async handle(arg: string, message: Message): Promise<Message | Message[]> {
    // splits the arguments and removes the prefic from the command
    const args: Array<string> = arg.split(/ +/g);
    // get the first element of the argument array, stores it in a const and removes it from the source array
    const command: string = args.shift().toLowerCase();

    switch (command) {
      case '?':
      case 'help':
        return this.help(message);

      default:
        await message.delete();
        const newM = await message.channel.send(`Unknown command: '${this._config.prefix}home ${command}', type ${this._config.prefix}home help for a list of available commands`);
        if (newM instanceof Message) {
          newM.delete(2000);
        }
        return newM;
    }
  }

  help(message: Message): Promise<Message | Message[]> {
    const helpembed = new RichEmbed()
      .setDescription('Home commands list')
      // .setColor(config.color)
      .setThumbnail(this._bot.client.user.displayAvatarURL)
      .addField(`${this._config.prefix}home help`, 'Displays this message, use ```!home help [command]``` to get help for specific commands if available')
      .addField('Suggestions for the bot?', 'You can always message me <@250591432975319043>!')
    return message.channel.send(helpembed);
  }
}