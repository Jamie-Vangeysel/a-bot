export interface iYoutubeApi {
  search(query: string, results: number): Promise<youtubeSearchListResponse>;
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
  thumbnails: youtubeThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
}

export class youtubeThumbnails {
  default: youtubeThumbnail;
  medium: youtubeThumbnail;
  high: youtubeThumbnail;
}

export class youtubeThumbnail {
  url: string;
  width: number;
  height: number;
}
