/**
 * This is the entry point of the application, in here we start our instance of the bot.
 */
import { aBot } from "./app/app.main";
import { DefaultConfig } from "./app/app.config";
import * as fs from 'fs';

// global bot var
let bot: aBot;

/**
 * @function: main()
 * @description: this is the entry point of the program, return true if the application started
 */

export const main = async (): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    const fileExists = await checkFile('./config.json');
    try {
      if (fileExists) {
        const config = await readFile('./config.json');
        if (config.token !== undefined) {
          bot = new aBot(config);
        }
        resolve(bot.config.token !== undefined);
      } else {
        // create file with default config attached
        const writeOk = await writeFile('./config.json', DefaultConfig);
        if (writeOk) {
          bot = new aBot(DefaultConfig);
          resolve(bot.config.token !== undefined);
        }
        resolve(writeOk);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export const checkFile = (filepath: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      fs.exists(filepath, (exists: boolean) => resolve(exists));
    } catch (err) {
      reject(err);
    }
  });
}

export const readFile = (filepath: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    fs.readFile('./config.json', (err, data) => {
      if (err) reject(err);
      try {
        const obj = JSON.parse(data.toString());
        resolve(obj);
      } catch (ex) {
        reject(ex);
      }
    });
  });
}

export const writeFile = (filepath: string, data: any): Promise<boolean> => {
  return new Promise<any>((resolve, reject) => {
    try {
      fs.writeFile(filepath, Buffer.from(JSON.stringify(data)), (err) => {
        if (err) resolve(false);
        resolve(true);
      });
    } catch (err) {
      reject(err);
    }
  });
}

main();

// catch ctrl+c event and exit normally
process.on('SIGINT', () => {
  bot.kill();
  // console.debug('exiting process!');
  // process.exit(13);
});

// catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', () => {
  bot.kill();
  process.exit(99);
});
