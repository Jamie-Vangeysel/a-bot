/**
 * This is the entry point of the application, in here we start our instance of the bot.
 */
import { aBot } from "./app/app.main";
import { AppConfig } from "./app/app.config";
import * as fs from 'fs';

let bot: aBot;

// check if config file exists.
fs.exists('./config.json', (exists: boolean) => {
  if (exists) {
    // config.json exists!
    fs.readFile('./config.json', (err, data) => {
      if (err) throw err;
      console.log(data);
      bot = new aBot(JSON.parse(data.toString()));
    });
  } else {
    // create file with default config attached
    fs.writeFile('./config.json', Buffer.from(JSON.stringify(AppConfig)), (err) => {
      if (err) throw err;
      console.debug('config created');
      bot = new aBot(AppConfig);
    });
  }
});

// catch ctrl+c event and exit normally
process.on('SIGINT', () => {
  bot.kill();
  console.debug('exiting process!');
  // process.exit(13);
});

// catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', () => {
  bot.kill();
  process.exit(99);
});
