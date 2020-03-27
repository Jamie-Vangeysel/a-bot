import aBot from "../app.main";
import { BotConfig } from "../models/bot-config";
import { Message, MessageEmbed } from "discord.js";
import { youtubeSearchListResponse } from "../api/models/youtube";

export default class YoutubeController {
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
        return await this.search(message, arg);
    }
  }

  async help(message: Message): Promise<Message | Message[]> {
    const helpembed = new MessageEmbed()
      .setDescription('Home commands list')
      // .setColor(config.color)
      .setThumbnail(this._bot.client.user.displayAvatarURL())
      .addField(`${this._config.prefix}home help`, 'Displays this message, use ```!home help [command]``` to get help for specific commands if available')
      .addField('Suggestions for the bot?', 'You can always message me <@250591432975319043>!')
    return await message.channel.send(helpembed);
  }

  async search(message: Message, query: string): Promise<Message | Message[]> {
    let titles: string = `Top 3 Youtube Search results for query: '${query}'\n\n`;
    const resp: youtubeSearchListResponse = await this._bot.api.youtube.search(query, 3);
    if (resp && resp.items) {
      // console.log(JSON.stringify(resp));
      resp.items.forEach(vid => {
        titles += decodeURIComponent(vid.snippet.title) + ` \n`;
      });
      titles += `\nhttps://www.youtube.com/watch?v=${resp.items[0].id.videoId}`;
      return await message.channel.send(titles);
    } else if (resp) {
      return await message.channel.send(JSON.stringify(resp));
    } else {
      return await message.channel.send('unknown err');
    }
  }
}