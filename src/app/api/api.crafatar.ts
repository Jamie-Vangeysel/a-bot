import { fetch } from 'cross-fetch';
const url = 'https://crafatar.com/';

export const Crafatar: iCrafatar = {
  getBodyRender(uuid: string): Promise<Response> {
    return fetch(`${url}renders/body/${uuid}`);
  }
}

export interface iCrafatar {
  getBodyRender(uuid: string): Promise<Response>;
}