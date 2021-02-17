import aBot from "./app.main";
import dbGuild from "./models/guild";
import BotConfig from "./models/bot-config";
import { Presence, Guild, GuildMember, GuildChannel, TextChannel, Message, Collection, MessageEmbed, Role, User } from "discord.js";
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

    // if (config.checkFunctionanlity('reconnecting')) {
    //   console.debug(`attachEventListeners() -- checkFunctionanlity('reconnecting')`);
    //   bot.client.on('reconnecting', async () => {
    //     //await  ReconnectingEvent.fire(bot.client);
    //   });
    // }

    if (config.checkFunctionanlity('message')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('message')`);
      bot.client.on('message', async (message: Message) => {
        await events.messageEvent(bot, config, message);
      });
    }

    if (config.checkFunctionanlity('presenceUpdate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('presenceUpdate')`);
      bot.client.on('presenceUpdate', async (oldPresence: Presence, newPresence: Presence) => {
        // await events.presenceUpdateEvent({ old: oldPresence, new: newPresence });
      });
    }

    //#region channel events
    if (config.checkFunctionanlity('channelCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('channelCreate')`);
      bot.client.on('channelCreate', async () => {
        // This event triggers when a new channel is created in a guild.
      });
    }
    if (config.checkFunctionanlity('channelCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('channelCreate')`);
      bot.client.on('channelDelete', async () => {
        // This event triggers when a channel is deleted in a guild.
      });
    }
    if (config.checkFunctionanlity('channelCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('channelPinsUpdate')`);
      bot.client.on('channelPinsUpdate', async () => {
        // This event triggers when a message has heen pinned or removed form pins in a channel.
      });
    }
    if (config.checkFunctionanlity('channelCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('channelUpdate')`);
      bot.client.on('channelUpdate', async () => {
        // This event triggers when a channel is modified in a guild.
      });
    }
    //#endregion

    //#region guild events
    if (config.checkFunctionanlity('guildMemberAdd')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildMemberAdd')`);
      bot.client.on('guildMemberAdd', async (member: GuildMember) => {
        // This event triggers when a member has joined a guild.
        await events.guildMemberAddEvent(config, member);
      });
    }
    if (config.checkFunctionanlity('guildMemberRemove')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildMemberRemove')`);
      bot.client.on('guildMemberRemove', async (member: GuildMember) => {
        // This event triggers when a member has left a guild.
        await events.guildMemberRemoveEvent(config, member);
      });
    }
    if (config.checkFunctionanlity('guildMemberAvailable')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildMemberAvailable')`);
      bot.client.on('guildMemberAvailable', async () => {
        // This event triggers when a guild member has become available.
      });
    }
    if (config.checkFunctionanlity('guildMemberSpeaking')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildMemberSpeaking')`);
      bot.client.on('guildMemberSpeaking', async () => {
        // This event triggers when a guild member has started speaking.
      });
    }
    if (config.checkFunctionanlity('guildMemberUpdate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildMemberUpdate')`);
      bot.client.on('guildMemberUpdate', async () => {
        // This event triggers when a guild member has been updated.
      });
    }
    if (config.checkFunctionanlity('guildMembersChunk')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildMembersChunk')`);
      bot.client.on('guildMembersChunk', async () => {
        // This event triggers when a guild member chunk of data has been send.
      });
    }
    if (config.checkFunctionanlity('guildIntegrationsUpdate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildIntegrationsUpdate')`);
      bot.client.on('guildIntegrationsUpdate', async () => {
        // This event triggers, that's all i know.
      });
    }
    if (config.checkFunctionanlity('guildUnavailable')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildUnavailable')`);
      bot.client.on('guildUnavailable', async () => {
        // This event triggers when a guild has become unavailable.
      });
    }
    if (config.checkFunctionanlity('guildBanAdd')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildBanAdd')`);
      bot.client.on('guildBanAdd', async (guild: Guild, user: User) => {
        // This event triggers when a ban has been added in a guild.
        await events.guildBanAddEvent(config, guild, user);
      });
    }
    if (config.checkFunctionanlity('guildBanRemove')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildBanRemove')`);
      bot.client.on('guildBanRemove', async (guild: Guild, user: User) => {
        // This event triggers when a ban has been removed from a guild.
        await events.guildBanRemoveEvent(config, guild, user);
      });
    }
    if (config.checkFunctionanlity('guildCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildCreate')`);
      bot.client.on('guildCreate', async (guild: Guild) => {
        // This event triggers when the bot joins a guild.
        console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        await bot.client.user.setActivity(`${bot.client.guilds.cache.size} Guilds`, { type: "WATCHING" });
      });
    }
    if (config.checkFunctionanlity('guildDelete')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('guildDelete')`);
      bot.client.on('guildDelete', async (guild: Guild) => {
        // this event triggers when the bot is removed from a guild.
        console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
        await bot.client.user.setActivity(`${bot.client.guilds.cache.size} Guilds`, { type: "WATCHING" });
      });
    }
    //#endregion

    if (config.checkFunctionanlity('emojiCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('emojiCreate')`);
      bot.client.on('emojiCreate', async () => {
        // This event triggers when an emoji has been added to a guild.
      });
    }
    if (config.checkFunctionanlity('emojiDelete')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('emojiDelete')`);
      bot.client.on('emojiDelete', async () => {
        // This event triggers when an emoji has been removed from a guild
      });
    }
    if (config.checkFunctionanlity('emojiUpdate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('emojiUpdate')`);
      bot.client.on('emojiUpdate', async () => {
        // This event triggers when an emoji has been updated in a guild.
      });
    }
    if (config.checkFunctionanlity('disconnect')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('disconnect')`);
      bot.client.on('disconnect', async () => {
        // This event triggers when the bot has disconnected.
        console.log('disconnected');
      });
    }
    if (config.checkFunctionanlity('inviteCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('inviteCreate')`);
      bot.client.on('inviteCreate', async () => {
        // This event triggers when a guild invite hes been created.
      });
    }
    if (config.checkFunctionanlity('inviteDelete')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('inviteDelete')`);
      bot.client.on('inviteDelete', async () => {
        // This event triggers when a guild invite has been deleted.
      });
    }
    //#region message event triggers
    if (config.checkFunctionanlity('message')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('message')`);
      bot.client.on('message', async () => {
        // This event triggers when a guild invite has been deleted.
      });
    }
    if (config.checkFunctionanlity('messageDelete')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('messageDelete')`);
      bot.client.on('messageDelete', async () => {
        // This event triggers when a message has been deleted.
      });
    }
    if (config.checkFunctionanlity('messageDeleteBulk')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('messageDeleteBulk')`);
      bot.client.on('messageDeleteBulk', async () => {
        // This event triggers when a bulk delete of messages has started.
      });
    }
    if (config.checkFunctionanlity('messageReactionAdd')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('messageReactionAdd')`);
      bot.client.on('messageReactionAdd', async () => {
        // This event triggers when a reaction has been added to a message.
      });
    }
    if (config.checkFunctionanlity('messageReactionRemove')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('messageReactionRemove')`);
      bot.client.on('messageReactionRemove', async () => {
        // This event triggers when a reaction has been removed from a message.
      });
    }
    if (config.checkFunctionanlity('messageReactionRemoveAll')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('messageReactionRemoveAll')`);
      bot.client.on('messageReactionRemoveAll', async () => {
        // This event triggers when all reactions have been removed from a message.
      });
    }
    if (config.checkFunctionanlity('messageReactionRemoveEmoji')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('messageReactionRemoveEmoji')`);
      bot.client.on('messageReactionRemoveEmoji', async () => {
        // This event triggers a emoji has been removed as reaction from a message.
      });
    }
    //#endregion
    //#region role events
    if (config.checkFunctionanlity('roleCreate')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('roleCreate')`);
      bot.client.on('roleCreate', async () => {
        // This event triggers when a guild role has been created.
      });
    }
    if (config.checkFunctionanlity('roleUpdate')) {
      console.debug(`attachEventListeners() -- checkFunctionality('roleUpdate')`);
      bot.client.on('roleUpdate', async () => {
        // This event triggers when a guild role has been updated.
      });
    }
    if (config.checkFunctionanlity('roleDelete')) {
      console.debug(`attachEventListeners() -- checkFunctionality('roleDelete')`);
      bot.client.on('roleDelete', async () => {
        // This event triggers when a guild role has been updated.
      });
    }
    //#endregion

    if (config.checkFunctionanlity('rateLimit')) {
      console.debug(`attachEventListeners() -- checkFunctionanlity('rateLimit')`);
      bot.client.on('rateLimit', async () => {
        // This event triggers the bot has been rate limited.
      });
    }

    bot.controllers.base = new BaseController(bot, config);
    bot.controllers.home = new HomeController(bot, config);
    bot.controllers.youtube = new YoutubeController(bot, config);

    bot.client.on('error', console.error);
  }

  async readyEvent(bot: aBot): Promise<Presence> {
    console.log(`Bot has started, with ${bot.client.users.cache.size} users, in ${bot.client.channels.cache.size} channels of ${bot.client.guilds.cache.size} guilds.`);
    // options: WATCHING STREAMING PLAYING LISTENING
    await bot.client.user.setActivity("startup sequence", { type: "PLAYING" });


    // check if the guilds are in the database
    bot.client.guilds.cache.forEach(async (guild: Guild) => {
      const result = await new Promise((resolve, reject) => {
        dbGuild.findById(guild.id, undefined, undefined, (err, _dbguild) => {
          if (err) {
            console.error(err);
            resolve(null);
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
              resolve(null);
              return;
            }
            resolve('ok');
          })
        });
      }
    });
    return bot.client.user.setActivity(`${bot.client.guilds.cache.size} Guilds`, { type: "WATCHING" });
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
    const generalChannel = member.new.guild.channels.cache.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      // if old presence has a game set, user is no longer playing
      if (member.old.presence.activities[0] && member.old.presence.activities[0] !== member.new.presence.activities[0]) {
        try {
          const timeplayed = (new Date().getTime() - member.old.presence.activities[0].timestamps.start.getTime()) / 1000 / 60;
          await generalChannel.send(`${member.new.displayName} is no longer playing ${member.old.presence.activities[0].name} [${timeplayed.toFixed(2)}min].`);
        } catch (err) {
          // console.error(err);
        }
      }
      // if new presence has a game set the user started playing
      if (member.new.presence.activities.length > 0) {
        return generalChannel.send(`${member.new.displayName} is now playing ${member.new.presence.activities[0].name}.`);
      }
      // check if the new status does not equal the old status, because well ...
      /** [22:20] BOTaBot: Wraptor is now dnd.
          [22:22] BOTaBot: Wraptor is now dnd.
          [22:24] BOTaBot: Wraptor is now dnd.
       */
      if (member.new.presence.status !== member.old.presence.status) {
        return generalChannel.send(`${member.new.displayName} is now ${member.new.presence.status}.`);
      }

      // do nothing, just chill.
      return null;
    } else {
      // console.error('error while sending message in general channel!');
    }
  }

  async guildMemberAddEvent(config: BotConfig, member: GuildMember): Promise<GuildMember> {
    // console.info(`${member.displayName} has joined the server.`);
    const generalChannel = member.guild.channels.cache.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      const joinedEmbed = new MessageEmbed()
        .setDescription(`${member.displayName} has joined the server.`)
        // .setColor(config.color)
        .setThumbnail(member.user.displayAvatarURL())
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

    const role = member.guild.roles.cache.find((role: Role) => role.name === 'new');
    if (role) {
      return member.roles.add(role);
    } else {
      // console.error('new role does not exist!');
      return;
    }
  }

  async guildMemberRemoveEvent(config: BotConfig, member: GuildMember): Promise<Message | Message[]> {
    const generalChannel = member.guild.channels.cache.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      const joinedEmbed = new MessageEmbed()
        .setDescription(`${member.displayName} has left the server.`)
        // .setColor(config.color)
        .setThumbnail(member.user.displayAvatarURL());
      return generalChannel.send(joinedEmbed);
    } else {
      // console.error('error while sending message in welcome chat!');
    }
  }

  async guildBanAddEvent(config: BotConfig, guild: Guild, user: User): Promise<Message | Message[]> {
    const generalChannel = guild.channels.cache.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      return generalChannel.send(`@${user.username} has been banned!`);
    }
    // do nothing, just chill.
    return null;
  }

  async guildBanRemoveEvent(config: BotConfig, guild: Guild, user: User): Promise<Message | Message[]> {
    const generalChannel = guild.channels.cache.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      return generalChannel.send(`@${user.username} has been unbanned!`);
    }
    // do nothing, just chill.
    return null;
  }
}

export default Events;
