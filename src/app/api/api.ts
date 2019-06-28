import { Mojang } from './api.mojang';
import { Crafatar } from './api.crafatar';
import { YoutubeApi } from './api.youtube';
import { iMojang } from './models/mojang';
import { iCrafatar } from './models/crafatar';
import { iYoutubeApi } from './models/youtube';

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