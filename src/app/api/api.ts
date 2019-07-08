import { Mojang } from './api.mojang';
import { Crafatar } from './api.crafatar';
import { YoutubeApi } from './api.youtube';
import { HomeApi } from './api.home';

import { iMojang } from './models/mojang';
import { iCrafatar } from './models/crafatar';
import { iYoutubeApi } from './models/youtube';
import { iHomeApi } from './models/home';
import { iSimplinthoApi } from './models/simplintho';

export class Api {
  constructor() {

  }

  public get mojang(): iMojang {
    return Mojang;
  }

  public get cravatar(): iCrafatar {
    return Crafatar;
  }

  public get youtube(): iYoutubeApi {
    return YoutubeApi;
  }

  public get home(): iHomeApi {
    return HomeApi;
  }

  public get simplintho(): iSimplinthoApi {
    return null;
  }

  public toString() {
    return '';
  }
}