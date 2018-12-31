/**
 * This is the entry point of the application, in here we start our instance of the bot.
 */
import { aBot } from "./app/app.main";

const bot = new aBot();

// catch ctrl+c event and exit normally
process.on('SIGINT', () => {
  bot.kill();
  console.debug('exiting process!');
  // process.exit(13);
});

//catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', () => {
  bot.kill();
  process.exit(99);
});
