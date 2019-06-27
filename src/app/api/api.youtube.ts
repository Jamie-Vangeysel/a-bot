import { fetch } from 'cross-fetch';
const url = 'https://www.googleapis.com/youtube/v3/';
const apiKey = 'AIzaSyDJoPGamS12nfX-J5hAVyxfk3PSjljfniY';

export const YoutubeApi: iYoutubeApi = {
  async search(query: string): Promise<youtubeSearchListResponse> {
    return fetch(`${url}search?part=snippet&q=${encodeURIComponent(query)}&maxResults=5&key=${apiKey}&type=video`).then<youtubeSearchListResponse>(r => r.json());
  }
}

export interface iYoutubeApi {
  search(query: string): Promise<youtubeSearchListResponse>;
}

export class youtubeSearchListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: youtubeSearchResult[]
}

export class youtubeSearchResult {
  kind: string;
  etag: string;
  id: youtubeVideo;
  snippet: youtubeVideoSnippet;
}

export class youtubeVideo {
  kind: string;
  videoId: string;
}

export class youtubeVideoSnippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: { [key: string]: youtubeThumbnail };
  channelTitle: string;
  liveBroadcastContent: string;
}

export class youtubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export type thumbnailSizes = 'default' | 'medium' | 'high';