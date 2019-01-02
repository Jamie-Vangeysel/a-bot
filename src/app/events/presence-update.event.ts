import { GuildMember, TextChannel, GuildChannel } from "discord.js";

export const PresenceUpdateEvent = {
  async fire(member: { old: GuildMember, new: GuildMember }): Promise<any> {
    const generalChannel = member.new.guild.channels.find((channel: GuildChannel) => channel.name === 'general');

    if (generalChannel && (generalChannel instanceof TextChannel)) {
      // if old presence has a game set, user is no longer playing
      if (member.old.presence.game) {
        const timeplayed = (new Date().getTime() - member.old.presence.game.timestamps.start.getTime()) / 1000 / 60;
        await generalChannel.send(`${member.new.displayName} is no longer playing ${member.old.presence.game.name} [${timeplayed.toFixed(2)}min].`);
      }
      // if new presence has a game set the user started playing
      if (member.new.presence.game) {
        return generalChannel.send(`${member.new.displayName} is now playing ${member.new.presence.game.name}.`);
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
      console.error('error while sending message in general channel!');
    }
  }
}