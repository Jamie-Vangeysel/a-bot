/**
 * This is the entry point of the application, in here we start our instance of the bot.
 */
import aBot from "./app/app.main";
import BotConfig from "./app/models/bot-config";
import { DefaultConfig } from "./app/app.config";
import { FileSystem } from './app/filesystem';

// global bot var
let bot: aBot;
const filesystem = new FileSystem();

/**
 * @function: main()
 * @description: this is the entry point of the program, return true if the application started
 */
const main = async (debug?: boolean): Promise<boolean> => {
  if (debug) {
    console.log = () => { };
    console.info = () => { };
  }
  // const MongoClient = require(‘mongodb’).MongoClient;
  // const uri = "mongodb+srv://alastor:<password>@cluster0-1z5qu.mongodb.net/test?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, { useNewUrlParser: true });

  return new Promise<boolean>(async (resolve, reject) => {
    const fileExists: boolean = await filesystem.exists('./config.json');
    try {
      if (fileExists === true) {
        const configBuffer: Buffer = await filesystem.readFile('./config.json');
        const config = BotConfig.checkBuffer(configBuffer);

        if (config) {
          bot = new aBot(config);
        }
      } else {
        // create file with default config attached
        const writeOk = await filesystem.writeFile('./config.json', Buffer.from(JSON.stringify(DefaultConfig)));
        if (writeOk) {
          bot = new aBot(new BotConfig(DefaultConfig));
        } else {
          resolve(false);
          return
        }
      }

      resolve(bot?.config.token?.length > 0);
    } catch (err) {
      reject(err);
    }
  });
}
export default main;

main();

// catch ctrl+c event and exit normally
process.on('SIGINT', async _ => {
  await bot.kill();
  console.debug('SIGINT!');
  process.exit();
});

// catch uncaught exceptions, trace, then restart
process.on('uncaughtException', _ => {
  try {
    console.debug('process.uncaughtException -- Try to kill bot if still running.');
    bot.kill();
  } catch (e) {
    console.error('process.uncaughtException -- There was an error killing the bot.');
    bot.kill();
  }
  console.debug('process.uncaughtException -- Starting new instance of bot.');
  main();
});
