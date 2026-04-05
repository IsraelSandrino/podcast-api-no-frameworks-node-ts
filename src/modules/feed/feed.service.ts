import { repositoryPodcast } from "../episodes/episodes.repository";
import { EpisodeOutput } from "../episodes/episodes.types";
import { buildRssFeed } from "../../utils/rss-builder";
import { StatusCode } from "../../utils/status-code";
import { FeedTransferModel } from "./feed.types";

const toXml = (feed: {
  title: string;
  items: { title: string; url: string; date: string }[];
}): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${feed.title}</title>
    ${feed.items
      .map(
        (item) => `
    <item>
      <title>${item.title}</title>
      <link>${item.url}</link>
      <pubDate>${item.date}</pubDate>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;
};

export const serviceFeed = (
  podcastName: string | undefined,
): FeedTransferModel => {
  const data = repositoryPodcast(podcastName);

  if (data.length === 0) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: "",
    };
  }

  const episodeOutput: EpisodeOutput[] = data.map((episode) => ({
    id: episode.id,
    podcast_id: episode.podcast_id,
    title: episode.title,
    video_id: episode.video_id,
    created_at: episode.created_at,
  }));

  const feed = buildRssFeed(podcastName ?? "", episodeOutput);
  const xml = toXml(feed);

  return {
    statusCode: StatusCode.OK,
    body: xml,
  };
};
