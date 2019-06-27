import { Mojang, iMojang } from './api.mojang';
import { Crafatar, iCrafatar } from './api.crafatar';
import { YoutubeApi, iYoutubeApi } from './api.youtube';

export class Api {
  constructor() {

  }

  public get mojang(): iMojang {
    return Mojang;
  };

  public get cravatar(): iCrafatar {
    return Crafatar;
  };

  public get youtube(): iYoutubeApi {
    return YoutubeApi;
  };
}