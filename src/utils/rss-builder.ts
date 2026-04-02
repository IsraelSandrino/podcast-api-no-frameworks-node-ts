import { PodcastModel } from "../models/podcast-model";

import { RssFeed } from "../models/rss-feed-model";
import { RssItem } from "../models/rss-item-model";

export function buildRssFeed(
  podcastName: string,
  episodes: PodcastModel[],
): RssFeed {
  const items: RssItem[] = episodes.map((ep) => ({
    title: ep.episode,
    url: `https://www.youtube.com/watch?v=${ep.videoId}`,
    date: ep.date,
  }));

  return {
    title: podcastName,
    items,
  };
}
