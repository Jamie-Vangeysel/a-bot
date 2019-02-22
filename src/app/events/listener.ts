import { Message, GuildMember, Guild, User } from "discord.js";
import { aBot } from "../app.main";
import { ReadyEvent } from "./ready.event";
import { MessageEvent } from "./message.event";
import { DisconnectEvent } from "./disconnect.event";
import { PresenceUpdateEvent } from "./presence-update.event";
import { GuildMemberAddEvent } from "./guild-member-add.event";
import { GuildMemberRemoveEvent } from "./guild-member-remove.event";
import { GuildBanAddEvent } from "./guild-ban-add.event";
import { GuildBanRemoveEvent } from "./guild-ban-remove.event";
import { BotConfig } from "../models/bot-config";

export const botEventListener = {
  attach(bot: aBot, config: BotConfig): void {
    // attach all enabled event listeners to the client
    // WARN: disabling ready event can lead to catastrophic start failiures when config changes!
    if ( config.events.ready === true ) {
      bot.client.on('ready', async () => {
        await ReadyEvent.fire(bot);
      });
    }

    if ( config.events.disconnect === true ) {
      bot.client.on('disconnect', () => {
        DisconnectEvent.fire(bot.client);
      });
    }

    if ( config.events.message === true ) {
      bot.client.on('message', async (message: Message) => {
        await MessageEvent.fire(bot, config, message);
      });
    }

    if ( config.events.presenceUpdate === true ) {
      bot.client.on('presenceUpdate', async (oldMember: GuildMember, newMember: GuildMember) => {
        await PresenceUpdateEvent.fire({ old: oldMember, new: newMember });
      });
    }

    if ( config.events.guildMemberAdd === true ) {
      bot.client.on('guildMemberAdd', async (member: GuildMember) => {
        await GuildMemberAddEvent.fire(config, member);
      });
    }

    if ( config.events.guildMemberRemove === true ) {
      bot.client.on('guildMemberRemove', async (member: GuildMember) => {
        await GuildMemberRemoveEvent.fire(config, member);
      });
    }

    if ( config.events.guildBanAdd === true ) {
      bot.client.on('guildBanAdd', async (guild: Guild, user: User) => {
        await GuildBanAddEvent.fire(config, guild, user);
      });
    }

    if ( config.events.guildBanRemove === true ) {
      bot.client.on('guildBanRemove', async (guild: Guild, user: User) => {
        await GuildBanRemoveEvent.fire(config, guild, user);
      });
    }

    bot.client.on("guildCreate", guild => {
      // This event triggers when the bot joins a guild.
      // console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
      // client.user.setActivity(`Serving ${client.guilds.size} servers`);
    });

    bot.client.on("guildDelete", guild => {
      // this event triggers when the bot is removed from a guild.
      // console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
      // client.user.setActivity(`Serving ${client.guilds.size} servers`);
    });

    bot.client.on('error', console.error);
  }
};