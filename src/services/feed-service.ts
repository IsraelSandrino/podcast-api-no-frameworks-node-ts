import { FeedTransferModel } from "../models/feed-transfer-model";
import { repositoryPodcast } from "../repositories/podcasts-repository";
import { buildRssFeed } from "../utils/rss-builder";
import { StatusCode } from "../utils/status-code";

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

  const feed = buildRssFeed(podcastName ?? "", data);
  const xml = toXml(feed);

  return {
    statusCode: StatusCode.OK,
    body: xml,
  };
};
