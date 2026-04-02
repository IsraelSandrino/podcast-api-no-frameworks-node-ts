import { IncomingMessage, ServerResponse } from "http";
import { serviceFeed } from "../services/feed-service";
import { FeedTransferModel } from "../models/feed-transfer-model";
import { extractUrlParam } from "../utils/url-params";
import { Routes } from "../routes/routes";

export const getFeed = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const podcastName = extractUrlParam(request.url, Routes.FEED);
  const content: FeedTransferModel = await serviceFeed(podcastName);

  response.writeHead(content.statusCode, {
    "Content-Type": "application/rss+xml",
  });
  response.write(content.body);

  response.end();
};
