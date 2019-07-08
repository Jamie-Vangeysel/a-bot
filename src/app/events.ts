import aBot from "./app.main";
import dbGuild from "./models/guild";
import BotConfig from "./models/bot-config";
import { Presence, Guild, GuildMember, GuildChannel, TextChannel, Message, Collection, RichEmbed, Role, User } from "discord.js";
import HomeController from "./controllers/home";
import BaseController from "./controllers/base";
import YoutubeController from "./controllers/youtube";

export class Events {
  static attach(bot: aBot, config: BotConfig): void {
    const events: Events = new Events();
    // attach all enabled event listeners to the client
    // WARN: disabling ready event can lead to catastrophic start failiures when config changes!

    if (config.checkFunctionanlity('ready')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('ready')`);
      bot.client.on('ready', async () => {
        await events.readyEvent(bot);
      });
    }

    if (config.checkFunctionanlity('disconnect')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('disconnect')`);
      bot.client.on('disconnect', async () => {
        await events.disconnectEvent(bot);
      });
    }

    if (config.checkFunctionanlity('reconnecting')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('reconnecting')`);
      bot.client.on('reconnecting', async () => {
        //await  ReconnectingEvent.fire(bot.client);
      });
    }

    if (config.checkFunctionanlity('message')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('message')`);
      bot.client.on('message', async (message: Message) => {
        await events.messageEvent(bot, config, message);
      });
    }

    if (config.checkFunctionanlity('presenceUpdate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('presenceUpdate')`);
      bot.client.on('presenceUpdate', async (oldMember: GuildMember, newMember: GuildMember) => {
        // await PresenceUpdateEvent.fire({ old: oldMember, new: newMember });
      });
    }

    if (config.checkFunctionanlity('guildMemberAdd')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildMemberAdd')`);
      bot.client.on('guildMemberAdd', async (member: GuildMember) => {
        await events.guildMemberAddEvent(config, member);
      });
    }

    if (config.checkFunctionanlity('guildMemberRemove')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildMemberRemove')`);
      bot.client.on('guildMemberRemove', async (member: GuildMember) => {
        await events.guildMemberRemoveEvent(config, member);
      });
    }

    if (config.checkFunctionanlity('guildBanAdd')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildBanAdd')`);
      bot.client.on('guildBanAdd', async (guild: Guild, user: User) => {
        await events.guildBanAddEvent(config, guild, user);
      });
    }

    if (config.checkFunctionanlity('guildBanRemove')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildBanRemove')`);
      bot.client.on('guildBanRemove', async (guild: Guild, user: User) => {
        await events.guildBanRemoveEvent(config, guild, user);
      });
    }

    if (config.checkFunctionanlity('guildCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildCreate')`);
      bot.client.on('guildCreate', (guild: Guild) => {
        // This event triggers when the bot joins a guild.
        // console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        // client.user.setActivity(`Serving ${client.guilds.size} servers`);
      });
    }

    if (config.checkFunctionanlity('guildDelete')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildDelete')`);
      bot.client.on('guildDelete', (guild: Guild) => {
        // this event triggers when the bot is removed from a guild.
        // console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
        // client.user.setActivity(`Serving ${client.guilds.size} servers`);
      });
    }

    bot.controllers.base = new BaseController(bot, config);
    bot.controllers.home = new HomeController(bot, config);
    bot.controllers.youtube = new YoutubeController(bot, config);

    bot.client.on('error', console.error);
  }

  async readyEvent(bot: aBot): Promise<Presence> {
    console.log(`Bot has started, with ${bot.client.users.size} users, in ${bot.client.channels.size} channels of ${bot.client.guilds.size} guilds.`);
    // options: WATCHING STREAMING PLAYING LISTENING
    await bot.client.user.setActivity("startup sequence", { type: "PLAYING" });


    // check if the guilds are in the database
    bot.client.guilds.forEach(async (guild: Guild) => {
      const result = await new Promise((resolve, reject) => {
        dbGuild.findById(guild.id, (err, _dbguild) => {
          if (err) {
            console.error(err);
            resolve();
            return;
          }
          resolve(_dbguild);
        });
      });

      if (result) {
        // guild ok
      } else {
        // create guild
        await new Promise((resolve, reject) => {
          const newGuild = {
            _id: guild.id,
            name: guild.name,
            owner: guild.ownerID,
            createdAt: guild.createdAt,
            joinedAt: guild.joinedAt,
            icon: guild.iconURL
          };
          new dbGuild(newGuild).save((err) => {
            if (err) {
              console.error(err);
              resolve();
              return;
            }
            resolve('ok');
          })
        });
      }
    });
    return bot.client.user.setActivity("guilds", { type: "WATCHING" });
  }

  disconnectEvent(bot: aBot): void {
    console.info(`${bot.client.user.username} just disconnected, making sure you know, I will reconnect now...`);
  }

  async messageEvent(bot: aBot, config: BotConfig, message: Message): Promise<Message | Message[] | Collection<string, Message>> {
    if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(config.prefix)) {
      // include error message? console.debug('help me!');
      return;
    }

    return await bot.controllers.base.handle(message);
  }

  async presenceUpdateEvent(member: { old: GuildMember, new: GuildMember }): Promise<any> {
    const generalChannel = member.new.guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      // if old presence has a game set, user is no longer playing
      if (member.old.presence.game && member.old.presence.game !== member.new.presence.game) {
        try {
          const timeplayed = (new Date().getTime() - member.old.presence.game.timestamps.start.getTime()) / 1000 / 60;
          await generalChannel.send(`${member.new.displayName} is no longer playing ${member.old.presence.game.name} [${timeplayed.toFixed(2)}min].`);
        } catch (err) {
          // console.error(err);
        }
      }
      // if new presence has a game set the user started playing
      if (member.new.presence.game) {
        // return generalChannel.send(`${member.new.displayName} is now playing ${member.new.presence.game.name}.`);
      }
      // check if the new status does not equal the old status, because well ...
      /** [22:20] BOTaBot: Wraptor is now dnd.
          [22:22] BOTaBot: Wraptor is now dnd.
          [22:24] BOTaBot: Wraptor is now dnd.
       */
      if (member.new.presence.status !== member.old.presence.status) {
        // return generalChannel.send(`${member.new.displayName} is now ${member.new.presence.status}.`);
      }

      // do nothing, just chill.
      return null;
    } else {
      // console.error('error while sending message in general channel!');
    }
  }

  async guildMemberAddEvent(config: BotConfig, member: GuildMember): Promise<GuildMember> {
    // console.info(`${member.displayName} has joined the server.`);
    const generalChannel = member.guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      const joinedEmbed = new RichEmbed()
        .setDescription(`${member.displayName} has joined the server.`)
        // .setColor(config.color)
        .setThumbnail(member.user.displayAvatarURL)
        .addField('Welcome', `${member.displayName} has entred the server, Hi! :wave:`);
      await generalChannel.send(joinedEmbed);
    } else {
      // console.error('error while sending message in welcome chat!');
    }


    /* const confGuild: BotGuildConfig = config.guilds.find(e => e.id === member.guild.id);
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
    }); */

    const role = member.guild.roles.find((role: Role) => role.name === 'new');
    if (role) {
      return member.addRole(role);
    } else {
      // console.error('new role does not exist!');
      return;
    }
  }

  async guildMemberRemoveEvent(config: BotConfig, member: GuildMember): Promise<Message | Message[]> {
    const generalChannel = member.guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      const joinedEmbed = new RichEmbed()
        .setDescription(`${member.displayName} has left the server.`)
        // .setColor(config.color)
        .setThumbnail(member.user.displayAvatarURL);
      return generalChannel.send(joinedEmbed);
    } else {
      // console.error('error while sending message in welcome chat!');
    }
  }

  async guildBanAddEvent(config: BotConfig, guild: Guild, user: User): Promise<Message | Message[]> {
    const generalChannel = guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      return generalChannel.send(`@${user.username} has been banned!`);
    }
    // do nothing, just chill.
    return null;
  }

  async guildBanRemoveEvent(config: BotConfig, guild: Guild, user: User): Promise<Message | Message[]> {
    const generalChannel = guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      return generalChannel.send(`@${user.username} has been unbanned!`);
    }
    // do nothing, just chill.
    return null;
  }
}

export default Events;
