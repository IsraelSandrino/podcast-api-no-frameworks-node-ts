import { IncomingMessage, ServerResponse } from "http";
import { sendRss } from "../../shared/http/send-rss";
import { RoutedRequest } from "../../types/routed-request";
import { serviceFeed } from "./feed.service";
import { FeedTransferModel } from "./feed.types";

export const getFeed = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const routedRequest = request as IncomingMessage & RoutedRequest;
  const podcastName = routedRequest.params?.podcastName;
  const content: FeedTransferModel = await serviceFeed(podcastName);

  sendRss(response, content.statusCode, content.body);
};
