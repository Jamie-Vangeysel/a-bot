import { Message } from "discord.js";

export const VersionCommandHandler = (message: Message): Promise<Message | Message[]> => {
  return message.channel.send(`Currently running version: ${process.env.npm_package_version}`);
}
