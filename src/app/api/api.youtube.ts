import { fetch } from 'cross-fetch';
import { youtubeSearchListResponse, iYoutubeApi } from './models/youtube';
const url = 'https://www.googleapis.com/youtube/v3/';
const apiKey = 'AIzaSyDJoPGamS12nfX-J5hAVyxfk3PSjljfniY';

export const YoutubeApi: iYoutubeApi = {
  async search(query: string, results: number = 5): Promise<youtubeSearchListResponse> {
    return fetch(`${url}search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${results
      }&key=${apiKey}&type=video`).then<youtubeSearchListResponse>(r => r.json());
  }
}
