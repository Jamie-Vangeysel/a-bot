import { IBotConfig } from "./models/bot-config";

export const DefaultConfig: IBotConfig = {
  googleApiKey: null,
  token: null,
  prefix: ';',
  dbConnection: 'mongodb+srv://alastor:nuwqen-4jaqNu-fuzkoh@cluster0-1z5qu.mongodb.net/test?retryWrites=true&w=majority',
  mode: 'standalone',
  enabledFunctionality: {
    'all': true
  },
  version: 1.0
}
