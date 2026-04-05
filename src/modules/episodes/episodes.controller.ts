import { IncomingMessage, ServerResponse } from "http";
import {
  CreateEpisodeInput,
  PatchEpisodeInput,
  PodcastTransferModel,
  UpdateEpisodeInput,
} from "./episodes.types";
import { RoutedRequest } from "../../types/routed-request";
import { sendJson } from "../../shared/http/send-json";
import {
  serviceCreateEpisode,
  serviceDeleteEpisode,
  serviceFilterEpisodes,
  serviceListEpisodes,
  servicePatchEpisode,
  serviceUpdateEpisode,
} from "./episodes.service";
import { bodyParser } from "../../utils/body-parser";
import { getRequiredRouteNumberParam } from "../../utils/request-params";

type PodcastRequest = IncomingMessage & RoutedRequest;

const getPodcastFilterFromQuery = (url: string | undefined): string | undefined => {
  if (!url) return undefined;

  return new URL(url, "http://localhost").searchParams.get("p") ?? undefined;
};
export const getListEpisodes = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const content: PodcastTransferModel = await serviceListEpisodes();

  sendJson(response, content.statusCode, content.body);
};
export const getFilterEpisodes = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const podcastName = getPodcastFilterFromQuery(request.url);
  const content: PodcastTransferModel = await serviceFilterEpisodes(podcastName);

  sendJson(response, content.statusCode, content.body);
};
export const createEpisode = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const body = await bodyParser<CreateEpisodeInput>(request);
  const content: PodcastTransferModel = await serviceCreateEpisode(body);

  sendJson(response, content.statusCode, content.body);
};
export const updateEpisode = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const podcastRequest = request as PodcastRequest;
  const episodeId = getRequiredRouteNumberParam(podcastRequest, "episodeId");
  const body = await bodyParser<Omit<UpdateEpisodeInput, "id">>(request);

  const content: PodcastTransferModel = await serviceUpdateEpisode({
    ...body,
    id: episodeId,
  });

  sendJson(response, content.statusCode, content.body);
};
export const deleteEpisode = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const podcastRequest = request as PodcastRequest;
  const episodeId = getRequiredRouteNumberParam(podcastRequest, "episodeId");

  const content: PodcastTransferModel = await serviceDeleteEpisode(episodeId);

  sendJson(response, content.statusCode, content.body);
};
export const patchEpisode = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const podcastRequest = request as PodcastRequest;
  const episodeId = getRequiredRouteNumberParam(podcastRequest, "episodeId");
  const body = await bodyParser<PatchEpisodeInput>(request);

  const content: PodcastTransferModel = await servicePatchEpisode(episodeId, body);

  sendJson(response, content.statusCode, content.body);
};
