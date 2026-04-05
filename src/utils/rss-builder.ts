import { EpisodeOutput } from "../modules/episodes/episodes.types";
import { RssFeed, RssItem } from "../modules/feed/feed.types";

export function buildRssFeed(
  podcastName: string,
  episodes: EpisodeOutput[],
): RssFeed {
  const items: RssItem[] = episodes.map((episode) => ({
    title: episode.title,
    url: `https://www.youtube.com/watch?v=${episode.video_id}`,
    date: episode.created_at ?? episode.date ?? "",
  }));

  return {
    title: podcastName,
    items,
  };
}
