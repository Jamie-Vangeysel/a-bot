import { Message } from "discord.js";
import { aBot } from "../app.main";

export const PingCommandHandler = async (bot: aBot, message: Message): Promise<Message | Message[]> => {
  // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
  // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
  const m = await message.channel.send("Ping?");

  if (m instanceof Message) {
    return m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.client.ping)}ms`);
  }
  return;
}
