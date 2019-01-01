import { Presence, Guild, GuildChannel, GuildMember } from "discord.js";
import { aBot } from "../app.main";
import { BotGuildConfig, BotChannelConfig, BotMemberConfig } from "../app.config";

export const ReadyEvent = {
  async fire(bot: aBot): Promise<Presence> {
    console.log(`Bot has started, with ${bot.client.users.size} users, in ${bot.client.channels.size} channels of ${bot.client.guilds.size} guilds.`);
    // options: WATCHING STREAMING PLAYING LISTENING
    await bot.client.user.setActivity("startup sequence", { type: "LISTENING" });

    // check config file integrity!
    // check if all guilds are presend in the config
    bot.client.guilds.forEach((guild: Guild) => {
      if ( bot.config.guilds.some( (e: BotGuildConfig) => e.name == guild.name )) {
        // guild is in config
        console.debug(`lloaded configuration for guild ${guild.name}`);
        // check the integrity of the config
      } else {
        console.debug(`Guild ${guild.name} is not yet in the confguration, creating default config!`);
        const channels: BotChannelConfig[] = [];
        const members: BotMemberConfig[] = [];
        guild.channels.forEach((channel: GuildChannel) => {
          // only add text and voice channels
          if (channel.type !== 'text' && channel.type !== 'voice') return;
          channels.push({
            id: channel.id,
            name: channel.name,
            type: channel.type
          });
        });

        guild.members.forEach((member: GuildMember) => {
          // if bot => skip
          if (member.user.bot) return;
          members.push({
            id: member.id,
            name: member.displayName,
            title: '',
            description: 'hi there OwO!',
            experience: 0,
            level: 0,
            reputation: 0,
            cash: 100,
            bank: 0
          });
        });

        bot.config.guilds.push({
          id: guild.id,
          name: guild.name,
          adminRole: 'Administrator',
          moderatorRole: 'Moderator',
          channels: channels,
          members: members
        });
        console.debug(`created guild entry in configuration!`);
        bot.saveConfiguratiom();
      }
    });

    return bot.client.user.setActivity("netflix", { type: "WATCHING" });
  }
}