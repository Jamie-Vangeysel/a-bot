import { Mojang, iMojang } from './api.mojang';
import { Crafatar, iCrafatar } from './api.crafatar';

export class Api {
  constructor() {

  }

  public get mojang(): iMojang {
    return Mojang;
  };

  public get cravatar(): iCrafatar {
    return Crafatar;
  };
}