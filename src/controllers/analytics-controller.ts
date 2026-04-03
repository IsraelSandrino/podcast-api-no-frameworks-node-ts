import { IncomingMessage, request, ServerResponse } from "node:http";
import { ContentType } from "../utils/content-type";
import { extractUrlParam } from "../utils/url-params";
import { Routes } from "../routes/routes";
import { AnalyticsTransferModel } from "../models/analytics-transfer-model";
import {
  serviceEpisodeAnalytics,
  servicePodcastAnalytics,
  serviceRegisterPlay,
} from "../services/analytics-service";

const defaultContent = { "Content-Type": ContentType.JSON };

export const registerPlay = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const episode_id = extractUrlParam(request.url, Routes.PLAYS);
  const user_id = (request as any).user.id ?? null;

  const content: AnalyticsTransferModel = await serviceRegisterPlay(
    Number(episode_id),
    user_id,
  );

  response.writeHead(content.statusCode, defaultContent);
  response.write(content.body);

  response.end();
};

export const getEpisodeAnalytics = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const episode_id = extractUrlParam(request.url, Routes.ANALYTICS_EPISODE);

  const content: AnalyticsTransferModel = await serviceEpisodeAnalytics(
    Number(episode_id),
  );

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};

export const getPodcastAnalytics = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const podcastName = extractUrlParam(request.url, Routes.ANALYTICS_PODCAST);

  const content: AnalyticsTransferModel = servicePodcastAnalytics(
    podcastName ?? "",
  );

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};
