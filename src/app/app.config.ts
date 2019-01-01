export const AppConfig: BotConfig = {
  token: 'NTI5MjAxMDM1NDQ1NjY1Nzky.DwtbWw.fxqqcBD_-EuCbd3hDKBwLzJbsjI',
  prefix: 'a!',
  color: '#19A8DF',
  version: '1.0.0',
}

export class BotConfig {
  public token: string;
  public prefix: string;
  public color: string;
  public version: string;
}

export class BotGuildConfig {
  
}

export type PresenceChannel = 'general' | 'member-log' | 'precense';
export type HomeChannel = 'general' | 'home';
