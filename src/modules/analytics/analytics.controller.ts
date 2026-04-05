import { IncomingMessage, ServerResponse } from "node:http";
import { AnalyticsTransferModel } from "./analytics.types";
import { AuthenticatedRequest } from "../../types/authenticated-request";
import { RoutedRequest } from "../../types/routed-request";
import { sendJson } from "../../shared/http/send-json";
import {
  serviceEpisodeAnalytics,
  servicePodcastAnalytics,
  serviceRegisterPlay,
} from "./analytics.service";
import {
  getRequiredRouteNumberParam,
  getRequiredRouteParam,
} from "../../utils/request-params";

type AnalyticsRequest = IncomingMessage & RoutedRequest & AuthenticatedRequest;

export const registerPlay = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const routedRequest = request as AnalyticsRequest;
  const episodeId = getRequiredRouteNumberParam(routedRequest, "episodeId");
  const user_id = routedRequest.user?.id;

  const content: AnalyticsTransferModel = serviceRegisterPlay(
    episodeId,
    user_id ?? 0,
  );

  sendJson(response, content.statusCode, content.body);
};

export const getEpisodeAnalytics = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const routedRequest = request as AnalyticsRequest;
  const episodeId = getRequiredRouteNumberParam(routedRequest, "episodeId");

  const content: AnalyticsTransferModel = serviceEpisodeAnalytics(episodeId);

  sendJson(response, content.statusCode, content.body);
};

export const getPodcastAnalytics = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const routedRequest = request as AnalyticsRequest;
  const podcastName = getRequiredRouteParam(routedRequest, "podcastName");

  const content: AnalyticsTransferModel = servicePodcastAnalytics(podcastName);

  sendJson(response, content.statusCode, content.body);
};
