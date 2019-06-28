import { fetch } from 'cross-fetch';
import { iMojang, ResolvedUUID } from './models/mojang';
const url = 'https://api.mojang.com/';

export const Mojang: iMojang = {
  async getuuid(username: string): Promise<ResolvedUUID> {
    return fetch(`${url}users/profiles/minecraft/${username}`).then<ResolvedUUID>(r => r.json());
  }
}
