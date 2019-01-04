import { fetch } from 'cross-fetch';
const url = 'https://api.mojang.com/';

export const Mojang: iMojang = {
  async getuuid(username: string): Promise<ResolvedUUID> {
    return fetch(`${url}users/profiles/minecraft/${username}`).then<ResolvedUUID>(r => r.json());
  }
}

export interface iMojang {
  getuuid(username: string): Promise<ResolvedUUID>;
}

export class ResolvedUUID {
  public id: string;
  public name: string;
}