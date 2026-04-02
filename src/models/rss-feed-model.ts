import { RssItem } from "./rss-item-model";

export interface RssFeed {
  title: string;
  items: RssItem[];
}
