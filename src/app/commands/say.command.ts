import { Message } from "discord.js";

export const SayCommandHandler = async (message: Message, args: Array<string>): Promise<Message | Message[]> => {
  const sayMessage = args.join(' ');
  // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
  await message.delete().catch(err => {
    console.error( err );
  }); 
  // And we get the bot to say the thing: 
  return message.channel.send(sayMessage);
}