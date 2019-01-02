import { Message, GuildMember, Guild, User } from "discord.js";
import { BotConfig } from "../app.config";
import { aBot } from "../app.main";
import { ReadyEvent } from "./ready.event";
import { MessageEvent } from "./message.event";
import { DisconnectEvent } from "./disconnect.event";
import { PresenceUpdateEvent } from "./presence-update.event";
import { GuildMemberAddEvent } from "./guild-member-add.event";
import { GuildMemberRemoveEvent } from "./guild-member-remove.event";
import { GuildMemberBanAddEvent } from "./guild-member-ban-add.event";
import { GuildMemberBanRemoveEvent } from "./guild-member-ban-remove.event";

export const botEventListener = {
  attach(bot: aBot, config: BotConfig): void {
    // attach all event listeners to the client
    bot.client.on('guildMemberAdd', async (member: GuildMember) => {
      await GuildMemberAddEvent.fire(config, member);
    });

    bot.client.on('guildMemberRemove', async (member: GuildMember) => {
      await GuildMemberRemoveEvent.fire(config, member);
    });

    bot.client.on('guildBanAdd', async (guild: Guild, user: User) => {
      await GuildMemberBanAddEvent.fire(config, guild, user);
    });

    bot.client.on('guildBanRemove', async (guild: Guild, user: User) => {
      await GuildMemberBanRemoveEvent.fire(config, guild, user);
    });

    bot.client.on('message', async (message: Message) => {
      await MessageEvent.fire(bot, config, message);
    });

    bot.client.on('presenceUpdate', async (oldMember: GuildMember, newMember: GuildMember) => {
      await PresenceUpdateEvent.fire({ old: oldMember, new: newMember });
    });

    bot.client.on('ready', async () => {
      await ReadyEvent.fire(bot);
    });

    bot.client.on('disconnect', () => {
      DisconnectEvent.fire(bot.client);
    });


    bot.client.on("guildCreate", guild => {
      // This event triggers when the bot joins a guild.
      console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
      // client.user.setActivity(`Serving ${client.guilds.size} servers`);
    });

    bot.client.on("guildDelete", guild => {
      // this event triggers when the bot is removed from a guild.
      console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
      // client.user.setActivity(`Serving ${client.guilds.size} servers`);
    });

    bot.client.on('error', console.error);
  }
};