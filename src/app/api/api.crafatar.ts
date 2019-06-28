import { fetch } from 'cross-fetch';
import { iCrafatar } from './models/crafatar';
const url = 'https://crafatar.com/';

export const Crafatar: iCrafatar = {
  getBodyRender(uuid: string): Promise<Response> {
    return fetch(`${url}renders/body/${uuid}`);
  }
}
