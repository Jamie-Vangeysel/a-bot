import { Client } from "discord.js";

export const DisconnectEvent = {
  fire(bot: Client): void {
    console.info(`${bot.user.username} is offline!`);
  }
}