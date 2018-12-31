import { Message, Collection } from "discord.js";

export const PurgeCommandHandler = async (message: Message, args: Array<string>): Promise<Message | Message[] | Collection<string, Message>> => {
  // This command removes all messages from all users in the channel, up to 100.

  // get the delete count, as an actual number.
  let deleteCount = parseInt(args[0], 10);

  // if arg is all set count to 100
  if (args[0] && args[0].toLowerCase() === 'all')
    deleteCount = 100;

  // Ooooh nice, combined conditions. <3
  if (!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

  // So we get our messages, and delete them. Simple enough, right?
  const fetched = await message.channel.fetchMessages({ limit: deleteCount });
  return message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
};
