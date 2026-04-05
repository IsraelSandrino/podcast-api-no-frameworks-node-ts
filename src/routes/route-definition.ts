import { IncomingMessage, ServerResponse } from "http";
import {
  getEpisodeAnalytics,
  getPodcastAnalytics,
  registerPlay,
} from "../modules/analytics/analytics.controller";
import { login, register } from "../modules/auth/auth.controller";
import { getFeed } from "../modules/feed/feed.controller";
import {
  createEpisode,
  deleteEpisode,
  getFilterEpisodes,
  getListEpisodes,
  patchEpisode,
  updateEpisode,
} from "../modules/episodes/episodes.controller";
import {
  listSubscriptionsPodcast,
  subscribePodcast,
  unsubscribePodcast,
} from "../modules/subscriptions/subscriptions.controller";
import { Routes } from "./routes";

export interface RouteDefinition {
  method: string;
  path: string;
  requiresAuth?: boolean;
  paramName?: string;
  handler: (
    request: IncomingMessage,
    response: ServerResponse,
  ) => Promise<void> | void;
}

// Esta tabela centraliza o contrato de roteamento da API (metodo, path, auth e handler), reduz ifs encadeados e facilita manutencao/testes.
export const routes: RouteDefinition[] = [
  { method: "GET", path: Routes.LIST, handler: getListEpisodes },
  { method: "GET", path: Routes.EPISODE, handler: getFilterEpisodes },
  {
    method: "POST",
    path: Routes.EPISODE,
    requiresAuth: true,
    handler: createEpisode,
  },
  {
    method: "PUT",
    path: Routes.EPISODE_BY_ID,
    requiresAuth: true,
    paramName: "episodeId",
    handler: updateEpisode,
  },
  {
    method: "DELETE",
    path: Routes.EPISODE_BY_ID,
    requiresAuth: true,
    paramName: "episodeId",
    handler: deleteEpisode,
  },
  {
    method: "PATCH",
    path: Routes.EPISODE_BY_ID,
    requiresAuth: true,
    paramName: "episodeId",
    handler: patchEpisode,
  },
  { method: "POST", path: Routes.REGISTER, handler: register },
  { method: "POST", path: Routes.LOGIN, handler: login },
  {
    method: "GET",
    path: Routes.FEED,
    paramName: "podcastName",
    handler: getFeed,
  },
  {
    method: "GET",
    path: Routes.SUBSCRIPTIONS,
    requiresAuth: true,
    handler: listSubscriptionsPodcast,
  },
  {
    method: "POST",
    path: Routes.SUBSCRIPTION_BY_PODCAST,
    requiresAuth: true,
    paramName: "podcastId",
    handler: subscribePodcast,
  },
  {
    method: "DELETE",
    path: Routes.SUBSCRIPTION_BY_PODCAST,
    requiresAuth: true,
    paramName: "podcastId",
    handler: unsubscribePodcast,
  },
  {
    method: "POST",
    path: Routes.PLAYS,
    paramName: "episodeId",
    handler: registerPlay,
  },
  {
    method: "GET",
    path: Routes.ANALYTICS_EPISODE,
    requiresAuth: true,
    paramName: "episodeId",
    handler: getEpisodeAnalytics,
  },
  {
    method: "GET",
    path: Routes.ANALYTICS_PODCAST,
    requiresAuth: true,
    paramName: "podcastName",
    handler: getPodcastAnalytics,
  },
];
