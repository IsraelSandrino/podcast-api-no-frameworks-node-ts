import * as http from "http";
import {
  createEpisode,
  deleteEpisode,
  getFilterEpisodes,
  getListEpisodes,
  patchEpisode,
  updateEpisode,
} from "./controllers/podcasts-controller";
import { Routes } from "./routes/routes";
import { HttpMethod } from "./utils/http-methods";
import { login, register } from "./controllers/auth-controller";
import { authMiddleware } from "./middlewares/auth";
import { getFeed } from "./controllers/feed-controller";
import { subscribe, unsubscribe } from "diagnostics_channel";
import {
  listSubscriptionsPodcast,
  subscribePodcast,
  unsubscribePodcast,
} from "./controllers/subscription-controller";
import { start } from "repl";

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
) => {
  // query string
  const baseUrl = request.url?.split("?")[0];

  // listar podcasts
  if (request.method == HttpMethod.GET && baseUrl === Routes.LIST) {
    await getListEpisodes(request, response);
  }

  // listar podcasts filtrados
  if (request.method == HttpMethod.GET && baseUrl === Routes.EPISODE) {
    await getFilterEpisodes(request, response);
  }

  // criar episódios
  if (request.method === HttpMethod.POST && baseUrl === Routes.EPISODE_CREATE) {
    authMiddleware(request, response, async () => {
      await createEpisode(request, response);
    });
  }

  // atualizar todos os dados de um episódio
  if (request.method === HttpMethod.PUT && baseUrl === Routes.EPISODE_UPDATE) {
    authMiddleware(request, response, async () => {
      await updateEpisode(request, response);
    });
  }

  // deletar episódios
  if (
    request.method === HttpMethod.DELETE &&
    baseUrl === Routes.EPISODE_DELETE
  ) {
    authMiddleware(request, response, async () => {
      await deleteEpisode(request, response);
    });
  }

  // atualizar parcialmente os dados de um episódio
  if (request.method === HttpMethod.PATCH && baseUrl === Routes.EPISODE_PATCH) {
    authMiddleware(request, response, async () => {
      await patchEpisode(request, response);
    });
  }

  // criar usuário
  if (request.method === HttpMethod.POST && baseUrl === Routes.REGISTER) {
    await register(request, response);
  }

  // loga usuário
  if (request.method === HttpMethod.POST && baseUrl === Routes.LOGIN) {
    await login(request, response);
  }

  // feed
  if (request.method === HttpMethod.GET && baseUrl?.startsWith(Routes.FEED)) {
    await getFeed(request, response);
  }

  // subscribe
  if (
    request.method === HttpMethod.POST &&
    baseUrl?.startsWith(Routes.SUBSCRIPTIONS)
  ) {
    authMiddleware(request, response, async () => {
      await subscribePodcast(request, response);
    });
  }

  // unsubscribe
  if (
    request.method === HttpMethod.DELETE &&
    baseUrl === Routes.SUBSCRIPTIONS
  ) {
    authMiddleware(request, response, async () => {
      await unsubscribePodcast(request, response);
    });
  }

  // return subscriptions
  if (request.method === HttpMethod.GET && baseUrl === Routes.SUBSCRIPTIONS) {
    authMiddleware(request, response, async () => {
      await listSubscriptionsPodcast(request, response);
    });
  }
};
