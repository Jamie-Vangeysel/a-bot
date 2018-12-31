import { Client } from "discord.js";
import { botEventListener } from "./events/listener";
import { BotConfig, AppConfig } from "./app.config";

/**
 * This is the main class of the project containing bootstrap logic for our bot.
 */
export class aBot {
  private _config: BotConfig;
  private _bot: Client;
  private _startDate: Date;

  constructor() {
    console.debug('aBot has been initialized!');
    this._config = AppConfig;
    this._startDate = new Date();

    // call the initialize function
    this.init(this._config);
  }

  /**
   * Initializes the bot; attaching listeners and applying the configuration.
   * @param config: the current configuration of the bot
   */
  public init(config: BotConfig) {
    this._bot = new Client({
      disableEveryone: true // bot cannot use everyone, for security purpose. Will be re-enabled later.
    });

    // load event listeners
    try {
      botEventListener.attach(this, config);
      console.debug('all event listeners were attached to the bot!');
    } catch (err) {
      console.error('error while trying to attach event listeners to bot client', err);
      return; // exit 0x0
    }

    // start the bot after init has completed
    this.start();
  }

  /**
   * Start the bot
   */
  public start() {
    // login with token
    this._bot.login(this._config.token).then(e => {
      console.debug('login ok!');
    }, (err: any) => {
      console.warn(`error ${err} while loggin in!`);
    }).catch((err: any) => {
      console.error(err);
    });
  }

  /**
   * Kill the bot
   */
  public async kill() {
    await this._bot.destroy();
  }

  /**
   * get the Client socket
   */
  public get client(): Client {
    return this._bot;
  }

  /**
   * Get runtime of the process
   */
  public get runtime(): string {
    let totalseconds: number = Math.floor((new Date().getTime() - this._startDate.getTime()) / 1000);
    let totalminutes = 0;
    let totalhours = 0;

    if (totalseconds > 60) {
      totalminutes = Math.floor(totalseconds / 60);
      totalseconds = totalseconds - (totalminutes * 60);
    }

    if (totalminutes > 60) {
      totalhours = Math.floor(totalminutes / 60);
      totalminutes = totalminutes - (totalhours * 60);
    }

    const secondsstring: string = (totalseconds > 0) ? (totalseconds === 1 ? '1 second' : `${totalseconds} seconds`) : '';
    const minutesstring: string = (totalminutes > 0) ? (totalminutes === 1 ? '1 minute ' : `${totalminutes} minutes `) : '';
    const hoursstring: string = (totalhours > 0) ? (totalhours === 1 ? '1 hour ' : `${totalminutes} hours `) : '';

    return `${hoursstring}${minutesstring}${secondsstring}`;
  }
}
