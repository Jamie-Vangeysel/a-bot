/**
 * @interface:ConfigBot configuration interface
 * if [prefix] and [suffix] are used only [prefix] will work, if none are preset the bot will throw an error and use default 'a!'
 * [enableFunctionality] this is mainly to be able to keep live environments up to date without enableing experimental features
 */
export class BotConfig implements IBotConfig {
  // google api key for youtube searches
  public googleApiKey: string;
  // auth api token to login with bot
  public token: string;
  // prefix for bot commands
  public prefix: string | null;
  // suffix for bot commands
  public suffix: string | null;
  // connection string for mongodb
  public dbConnection: string;
  // enable or disable certain functionality
  public enabledFunctionality: {
    [key: string]: boolean
  };
  // version of the config file
  public version: number | null;

  constructor(conf: IBotConfig) {
    this.googleApiKey = conf.googleApiKey;
    this.token = conf.token;
    this.prefix = conf.prefix;
    this.suffix = conf.suffix;
    this.enabledFunctionality = conf.enabledFunctionality;
    this.version = conf.version;
  }

  public static checkBuffer(buffer: Buffer): BotConfig {
    if (buffer) {
      console.debug(`BotConfig.checkBuffer() -- buffer is not null.`);
      const configText: string = buffer.toString();
      try {
        const configObj: IBotConfig = JSON.parse(configText);
        console.debug(`BotConfig.checkBuffer() -- buffer is JSON.`);
        if (configObj && configObj.token && configObj.enabledFunctionality && configObj.version && (configObj.prefix || configObj.suffix) && configObj.dbConnection) {
          console.debug(`BotConfig.checkBuffer() -- config has needed values.`);
          return new BotConfig(configObj);
        }
        console.debug(`BotConfig.checkBuffer() -- config does not contain required keys.`);
      } catch (e) {
        console.debug(`BotConfig.checkBuffer() -- buffer not JSON, ${e}.`);
      }
    }

    return null;
  }

  public checkFunctionanlity(functionalityName: string): boolean {
    return this.enabledFunctionality.all === true || this.enabledFunctionality[functionalityName] === true;
  }
}

export default BotConfig;

export interface IBotConfig {
  // google api key for youtube searches
  googleApiKey: string;
  // auth api token to login with bot
  token: string;
  // prefix for bot commands
  prefix: string | null;
  // suffix for bot commands
  suffix: string | null;
  // connection string for mongodb
  dbConnection: string;
  // enable or disable certain functionality
  enabledFunctionality: {
    [key: string]: boolean
  };
  // version of the config file
  version: number | null;
}