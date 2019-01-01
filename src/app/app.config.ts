export const DefaultConfig: BotConfig = {
  token: 'NTI5MjAxMDM1NDQ1NjY1Nzky.DwtbWw.fxqqcBD_-EuCbd3hDKBwLzJbsjI',
  prefix: 'a!',
  color: '#19A8DF',
  guilds: []
}

export class BotConfig {
  public token: string;
  public prefix: string;
  public color: string;
  public guilds: BotGuildConfig[];
}

export class BotGuildConfig {
  public id: string;
  public name: string;
  public adminRole: string;
  public moderatorRole: string;
  public members: BotMemberConfig[];
  public channels: BotChannelConfig[];
}

export class BotMemberConfig {
  public id: string;
  public name: string;
  public title: string;
  public description: string;
  public experience: number;
  public level: number;
  public reputation: number;
  public cash: number;
  public bank: number;
}

export class BotChannelConfig {
  public id: string;
  public name: string;
  public type: string;
}

export type PresenceChannel = 'general' | 'member-log' | 'precense';
export type HomeChannel = 'general' | 'home';
