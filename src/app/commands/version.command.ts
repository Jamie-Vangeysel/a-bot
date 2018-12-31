import { Message } from "discord.js";
import { BotConfig } from "../app.config";
import { aBot } from "../app.main";

export const VersionCommandHandler = (bot: aBot, config: BotConfig, message: Message): Promise<Message | Message[]> => {
  return message.channel.send(`Currently running version: ${config.version}`);
}
