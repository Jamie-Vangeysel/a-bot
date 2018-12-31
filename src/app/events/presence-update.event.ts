import { Client, GuildMember, TextChannel, RichEmbed, GuildChannel } from "discord.js";
import { BotConfig } from "../app.config";

export const PresenceUpdateEvent = {
  async fire(bot: Client, config: BotConfig, member: { old: GuildMember, new: GuildMember }): Promise<any> {
    const generalChannel = member.new.guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      /* const embed = new RichEmbed()
        .setDescription(`${member.new.displayName} has changed presence from ${member.old.presence.status} to ${member.new.presence.status}.`)
        .setColor(config.color); */
        if ( member.old.presence.game ) {
          await generalChannel.send(`${member.new.displayName} is no longer playing ${member.old.presence.game.name}.`);
        }
        if ( member.new.presence.game ) {
          return generalChannel.send(`${member.new.displayName} is now playing ${member.new.presence.game.name}.`);
        }
      return generalChannel.send(`${member.new.displayName} is now ${member.new.presence.status}.`);
    } else {
      console.error('error while sending message in welcome chat!');
    }
  }
}