import { Client } from "discord.js";
import BotConfig from "./models/bot-config";
import { FileSystem } from "./filesystem";
import dbGuild from "./models/guild";
import Events from "./events";
import HomeController from "./controllers/home";
import BaseController from "./controllers/base";
import { Api } from "./api/api";
import YoutubeController from "./controllers/youtube";

/**
 * This is the main class of the project containing bootstrap logic for our bot.
 */
export class aBot {
  private _config: BotConfig;
  private _bot: Client;
  private _startDate: Date;

  // controllers
  controllers: {
    base?: BaseController,
    home?: HomeController,
    youtube?: YoutubeController
  } = {};
  api: Api;

  constructor(config: BotConfig) {
    this._config = config;
    this._startDate = new Date();

    // call the initialize function
    this.init(this._config);
  }

  /**
   * Initializes the bot; attaching listeners and applying the configuration.
   * @param config: the current configuration of the bot
   */
  public async init(config: BotConfig) {
    this._bot = new Client({
      disableEveryone: true // bot cannot use everyone, for security purpose. Will be re-enabled later.
    });

    // load event listeners
    try {
      Events.attach(this, config);
      // console.debug('all event listeners were attached to the bot!');
    } catch (err) {
      // console.error('error while trying to attach event listeners to bot client', err);
      return; // exit 0x0
    }

    this.api = new Api();

    // start the bot after init has completed
    this.start();
  }

  /**
   * Start the bot
   */
  public start() {
    this._bot.login(this._config.token).then((message: string) => {
      console.debug('login ok!', message);
    }, (err: any) => {
      console.warn(`error ${err} while loggin in!`);
    }).catch(_ => null);
    try {

      dbGuild.find((err: any, books: any) => {
        if (err) {
          throw err;
        } else {
          console.log(JSON.stringify(books));
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Kill the bot
   */
  public async kill() {
    await this._bot.destroy();
  }

  public saveConfig(): Promise<boolean> {
    return new FileSystem().writeFile('./config.json', Buffer.from(JSON.stringify(this._config)));
  }

  /**
   * get the Client socket
   */
  public get client(): Client {
    return this._bot;
  }

  public get config(): BotConfig {
    return this._config;
  }

  /**
   * Get runtime of the process
   */
  public get runtime(): string {
    let totalseconds: number = Math.floor((new Date().getTime() - this._startDate.getTime()) / 1000);
    let totalminutes = 0;
    let totalhours = 0;
    let totaldays = 0;

    if (totalseconds > 60) {
      totalminutes = Math.floor(totalseconds / 60);
      totalseconds = totalseconds - (totalminutes * 60);
    }

    if (totalminutes > 60) {
      totalhours = Math.floor(totalminutes / 60);
      totalminutes = totalminutes - (totalhours * 60);
    }

    if (totalhours > 24) {
      totaldays = Math.floor(totalhours / 24);
      totalhours = totalhours - (totaldays * 24);
    }

    const secondsstring: string = (totalseconds > 0) ? (totalseconds === 1 ? '1 second' : `${totalseconds} seconds`) : '';
    const minutesstring: string = (totalminutes > 0) ? (totalminutes === 1 ? '1 minute ' : `${totalminutes} minutes `) : '';
    const hoursstring: string = (totalhours > 0) ? (totalhours === 1 ? '1 hour ' : `${totalhours} hours `) : '';
    const daysstring: string = (totaldays > 0) ? (totaldays === 1 ? '1 day ' : `${totaldays} days `) : '';

    return `${daysstring}${hoursstring}${minutesstring}${secondsstring}`;
  }
}

export default aBot;
