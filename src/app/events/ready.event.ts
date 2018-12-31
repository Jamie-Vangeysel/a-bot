import { Presence } from "discord.js";
import { aBot } from "../app.main";

export const ReadyEvent = {
  fire(bot: aBot): Promise<Presence> {
    console.log(`Bot has started, with ${bot.client.users.size} users, in ${bot.client.channels.size} channels of ${bot.client.guilds.size} guilds.`);
    // options: WATCHING STREAMING PLAYING LISTENING
    return bot.client.user.setActivity("netflix", { type: "WATCHING" });
  }
}