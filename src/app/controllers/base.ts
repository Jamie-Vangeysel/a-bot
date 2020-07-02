import aBot from "../app.main";
import { BotConfig } from "../models/bot-config";
import { Message, Collection, TextChannel, DMChannel, MessageEmbed } from "discord.js";
import { Api } from "../api/api";
import { ResolvedUUID } from "../api/models/mojang";

export default class BaseController {
  private _bot: aBot;
  private _config: BotConfig;

  constructor(bot: aBot, config: BotConfig) {
    this._bot = bot;
    this._config = config;
  }

  async handle(message: Message): Promise<Message | Message[] | Collection<string, Message>> {
    // splits the arguments and removes the prefic from the command
    const args: Array<string> = message.content.slice(this._config.prefix.length).trim().split(/ +/g);
    // get the first element of the argument array, stores it in a const and removes it from the source array
    const command: string = args.shift().toLowerCase();

    const allowedAdminRoles: Array<string> = ['Administrator'];

    switch (command) {
      case '?':
      case 'help':
        return await this.help(message);

      case 'h':
      case 'home':
        return await this._bot.controllers.home.handle(args.join(' '), message);

      case 'balance':
        return await this.balance(message);

      case 'ban':
        return await this.ban(message, args);

      case 'botinfo':
        return await this.botinfo(message);

      // case 'conf':
      // case 'config':
      //   if (!message.member.roles.some(role => allowedAdminRoles.includes(role.name)))
      //     return message.reply("Sorry, you don't have permissions to do this!");
      //   return ConfigCommandHandler(bot, message, args);

      case 'kick':
        return await this.kick(message, args);

      case 'ping':
        return await this.ping(message);

      case 'profile':
        return await this.profile(message);

      case 'purge':
        return await this.purge(message, args);

      case 'say':
        return await this.say(message, args);

      case 'serverinfo':
        return await this.serverinfo(message);

      case 'version':
        return await this.version(message);

      case 'avatar':
        return await this.avatar(message);
        
      case 'countdown':
        return await this.countdown(message, args);

      case 'yt':
      case 'youtube':
        return await this._bot.controllers.youtube.handle(args.join(' '), message);

      case 'terminate':
      case 'kill':
        if (!message.member.roles.cache.some(role => allowedAdminRoles.includes(role.name)))
          return message.reply("Sorry, you don't have permissions to use this!");
        this._bot.kill();
        return;

      default:
        await message.delete();
        const newM = await message.channel.send(`Unknown command: '${this._config.prefix}${command}', type ${this._config.prefix}help for a list of available commands`);
        // if (newM instanceof Message) {
        //   newM.delete({ timeout: 2000 });
        // }
        return newM;
    }
  }

  async balance(message: Message): Promise<Message | Message[]> {
    let confMember = {
      cash: 100,
      bank: 100
    };

    // And we get the bot to say the thing: 
    return await message.reply(`You currently have ${confMember.cash}$ cash and ${confMember.bank}$ in the bank.`);
  }

  async ban(message: Message, args: string[]): Promise<Message | Message[]> {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    const allowedRoles: Array<string> = ['Administrator'];
    if (!message.member.roles.cache.some(role => allowedRoles.includes(role.name)))
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    await member.ban({ reason: reason })
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  async botinfo(message: Message): Promise<Message | Message[]> {
    const botembed = new MessageEmbed()
      .setDescription('Bot made by JamieVangeysel')
      // .setColor(config.color)
      .setThumbnail(this._bot.client.user.displayAvatarURL())
      .addField('Botname', this._bot.client.user.username)
      .addField('Created On', this._bot.client.user.createdAt)
      .addField('Runtime', `${this._bot.runtime}`)
      .addField('Version', process.env.npm_package_version);
    return await message.channel.send(botembed);
  }

  async help(message: Message): Promise<Message | Message[]> {
    const helpembed = new MessageEmbed()
      .setDescription('Commands List')
      // .setColor(config.color)
      .setThumbnail(this._bot.client.user.displayAvatarURL())
      .addField(`${this._config.prefix}help`, 'Displays this message, use ```!help [command]``` to get help for specific commands if available')
      .addField(`${this._config.prefix}botinfo`, 'Gives information about the bot.')
      .addField(`${this._config.prefix}serverinfo`, 'Gives information about the server')
      .addField(`${this._config.prefix}version`, 'Displays the current version of the bot.')
      .addField('Suggestions for the bot?', 'Put your suggestions in #suggestions or send <@250591432975319043> a message!')
      .addField('Feature updates', 'Leveling and economy system');
    return await message.channel.send(helpembed);
  }

  async kick(message: Message, args: string[]): Promise<Message | Message[]> {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    const allowedRoles: Array<string> = ['Administrator', 'Moderator'];
    if (!message.member.roles.cache.some(role => allowedRoles.includes(role.name)))
      return message.reply("Sorry, you don't have permissions to use this!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    // Now, time for a swift kick in the nuts!
    await member.kick(reason).catch((err: any) => message.reply(`Sorry ${message.author} I couldn't kick because of : ${err}`));
    return message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }

  async countdown(message: Message, args: string[]): Promise<Message | Message[]> {
    if (args.length < 1) {
      return message.reply(`At least 1 argument {time}(XX:XX) is required`);
    }
    //read args => check if input is XX:XX and interval is set to 1m of higher
    const date = new Date();
    if (new RegExp(`[0-2][0-9]:[0-5][0-9]`).test(args[0])) {
      const hours = parseInt(args[0].split(':')[0], 10);
      const minutes = parseInt(args[0].split(':')[1], 10);

      const target = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
      this.doCountdown(message.channel, target, 60000);
      return message.reply(`Started a countdown till ${hours}:${minutes} alerting each 60 seconds`);
    } else {
      return message.reply(`Time argument did not match regex \`/[0-2][0-9]:[0-5][0-9]/g\` got \`${args[0]}\``);
    }
  }

  doCountdown(channel: TextChannel | DMChannel, targetTime: Date, interval: number) {
    const myInterval = setInterval(() => {
      if (new Date() < targetTime) {
        const milis = targetTime.getTime() - new Date().getTime();
        channel.send(`${Math.round(milis / 60000)}m remaining`);
      } else {
        clearInterval(myInterval);
      }
    }, interval);
  }

  async ping(message: Message): Promise<Message | Message[]> {
    const m = await message.channel.send("Ping?");

    if (m instanceof Message) {
      return m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(this._bot.client.ws.ping)}ms.`);
    }
    return m;
  }

  async profile(message: Message): Promise<Message | Message[]> {
    let confMember = {
      title: 'y',
      name: 'y',
      description: 'y',
      level: 100,
      reputation: 100,
      cash: 100,
      bank: 100
    };

    const helpembed = new MessageEmbed()
      .setDescription(`Profile ~ ${confMember.title}${confMember.name}`)
      // .setColor(config.color)
      .setThumbnail(message.member.user.displayAvatarURL())
      .addField('description', `${confMember.description}`)
      .addField('balance', `cash: ${confMember.cash}$, bank: ${confMember.bank}`)
      .addField('level', `you are level ${confMember.level}`)
      .addField('reputation', `You have ${confMember.reputation} reputation`);
    return await message.channel.send(helpembed);
  }

  async avatar(message: Message): Promise<Message | Message[]> {
    // if no one is mentioned retrieve authors avatar
    if (!message.mentions.users.size) {
      return await message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
    }

    // list avatars of all mentioned users
    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
    });

    // send the entire array of strings as a message
    // by default, discord.js will `.join()` the array with `\n`
    return await message.channel.send(avatarList);
  }

  async purge(message: Message, args: string[]): Promise<Message | Message[] | Collection<string, Message>> {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    let deleteCount = parseInt(args[0], 10);

    // if arg is all set count to 100
    if (args[0] && args[0].toLowerCase() === 'all') {
      deleteCount = 100;
    }

    // Ooooh nice, combined conditions. <3
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply('Please provide a number between 2 and 100 for the number of messages to delete.');

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await (await message.channel.messages.fetch({ limit: deleteCount }));
    return message.channel.bulkDelete(fetched, true)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  async say(message: Message, args: string[]): Promise<Message | Message[]> {
    const sayMessage = args.join(' ');
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    await message.delete().catch(err => {
      // console.error(err);
    });
    const api = new Api();
    const response: ResolvedUUID = await api.mojang.getuuid('simplintho');
    const player_uuid = response.id;
    const player_name = response.name;
    const urlFace = `https://crafatar.com/avatars/${player_uuid}.png`;
    const urlBody = `https://crafatar.com/renders/body/${player_uuid}.png`;
    // And we get the bot to say the thing
    const serverembed = new MessageEmbed()
      .setTitle(`Very cool title for profile: ${player_name}`)
      .setAuthor(`MVP: ${player_name}`, message.member.user.displayAvatarURL())
      .setDescription(sayMessage)
      // .setColor(bot.config.color)
      .setThumbnail(urlFace)
      .addField(':scream:', 'Very scary message about blue whales.')
      .setFooter("This message has been send by `a bot`, please don't overthrow the world!")
      .setImage(urlBody);
    return message.channel.send(serverembed);
  }

  async serverinfo(message: Message): Promise<Message | Message[]> {
    const serverembed = new MessageEmbed()
      .setDescription('Server Information.')
      // .setColor(config.color)
      .setThumbnail(message.guild.iconURL())
      .addField('Server name', message.guild.name)
      .addField('Created on', message.guild.createdAt)
      .addField('You joined', message.member.joinedAt)
      .addField('Total Members', message.guild.memberCount);
    return await message.channel.send(serverembed);
  }

  async version(message: Message): Promise<Message | Message[]> {
    return await message.channel.send(`Currently running version: ${process.env.npm_package_version}`);
  }
}