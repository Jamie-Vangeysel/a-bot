import { BotConfig } from "./models/bot-config";

export const DefaultConfig: BotConfig = {
  token: 'NTI5MjAxMDM1NDQ1NjY1Nzky.DwtbWw.fxqqcBD_-EuCbd3hDKBwLzJbsjI',
  prefix: 'a!',
  color: '#19A8DF',
  guilds: [],
  events: {
    disconnect: true,
    ready: true,
    presenceUpdate: true,
    message: true,
    guildBanAdd: true,
    guildBanRemove: true,
    guildMemberAdd: true,
    guildMemberRemove: true
  }
}
