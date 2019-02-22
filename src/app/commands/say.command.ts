import { Message, RichEmbed } from "discord.js";
import { Api } from "../api/api";
import { ResolvedUUID } from "../api/api.mojang";
import { aBot } from "../app.main";

export const SayCommandHandler = async (bot: aBot, message: Message, args: Array<string>): Promise<Message | Message[]> => {
  const sayMessage = args.join(' ');
  // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
  await message.delete().catch(err => {
    // console.error(err);
  });
  const api = new Api();
  const response: ResolvedUUID = await api.mojang.getuuid('simplintho');
  const player_uuid = response.id;
  const player_name = response.name;
  const urlFace = `https://crafatar.com/avatars/${player_uuid}.png`;
  const urlBody = `https://crafatar.com/renders/body/${player_uuid}.png`;
  // And we get the bot to say the thing
  const serverembed = new RichEmbed()
    .setTitle(`Very cool title for profile: ${player_name}`)
    .setAuthor(`MVP: ${player_name}`, message.member.user.displayAvatarURL)
    .setDescription(sayMessage)
    .setColor(bot.config.color)
    .setThumbnail(urlFace)
    .addField(':scream:', 'Very scary message about blue whales.')
    .setFooter("This message has been send by `a bot`, please don't overthrow the world!")
    .setImage(urlBody);
  return message.channel.send(serverembed);
}