export interface RssItem {
  title: string;
  url: string;
  date: string;
}

export interface RssFeed {
  title: string;
  items: RssItem[];
}

export interface FeedTransferModel {
  statusCode: number;
  body: string;
}
