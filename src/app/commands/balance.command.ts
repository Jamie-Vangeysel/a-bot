import { Message } from "discord.js";
import { BotConfig } from "../models/bot-config";
import { BotGuildConfig } from "../models/bot-guild-config";
import { BotMemberConfig } from "../models/bot-member-config";

export const BalanceCommandHandler = async (config: BotConfig, message: Message): Promise<Message | Message[]> => {
  // Then we delete the command message (sneaky, right?).
  // The catch just ignores the error with a cute smiley thing.
  // await message.delete().catch(err => {
  //   console.error( err );
  // });

  // const confGuild: BotGuildConfig = config.guilds.find(e => e.id === message.guild.id);
  // const confMember: BotMemberConfig = confGuild.members.find(e => e.id === message.member.id);
  let confMember = {
    cash: 100,
    bank: 100
  };

  // And we get the bot to say the thing: 
  return message.reply(`You currently have ${confMember.cash}$ cash and ${confMember.bank}$ in the bank.`);
}