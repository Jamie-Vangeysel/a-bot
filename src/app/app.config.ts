import { IBotConfig } from "./models/bot-config";

export const DefaultConfig: IBotConfig = {
  googleApiKey: null,
  token: 'NTI5MjAxMDM1NDQ1NjY1Nzky.DwtbWw.fxqqcBD_-EuCbd3hDKBwLzJbsjI',
  prefix: 'a!',
  suffix: null,
  dbConnection: 'mongodb+srv://alastor:nuwqen-4jaqNu-fuzkoh@cluster0-1z5qu.mongodb.net/test?retryWrites=true&w=majority',
  enabledFunctionality: {
    'all': true
  },
  version: 1.0
}
