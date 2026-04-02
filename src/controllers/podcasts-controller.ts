import { IncomingMessage, ServerResponse } from "http";
import { serviceListEpisodes } from "../services/list-episodes-service";
import { serviceFilterEpisodes } from "../services/filter-episode-service";
import { ContentType } from "../utils/content-type";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { serviceCreateEpisode } from "../services/create-episode-service";
import { bodyParser } from "../utils/body-parser";
import { serviceUpdateEpisode } from "../services/update-episode-service";
import { extractUrlParam } from "../utils/url-params";
import { Routes } from "../routes/routes";
import { serviceDeleteEpisode } from "../services/delete-episode-service";
import { servicePatchEpisode } from "../services/patch-episode-service";

const defaultContent = { "Content-Type": ContentType.JSON };

// Function that lists all episodes
export const getListEpisodes = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const content: PodcastTransferModel = await serviceListEpisodes();

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};

// Function that lists filtered episodes
export const getFilterEpisodes = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const content: PodcastTransferModel = await serviceFilterEpisodes(
    request.url,
  );

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};

// Function that creates episodes
export const createEpisode = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const body = await bodyParser(request);
  const content: PodcastTransferModel = await serviceCreateEpisode(body);

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};

// Function that updates all episode data
export const updateEpisode = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const id = extractUrlParam(request.url, Routes.EPISODE_UPDATE);
  const body = await bodyParser(request);

  const content: PodcastTransferModel = await serviceUpdateEpisode({
    ...body,
    id: Number(id),
  });

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};

// Function that deletes episodes
export const deleteEpisode = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const id = extractUrlParam(request.url, Routes.EPISODE_DELETE);

  const content: PodcastTransferModel = await serviceDeleteEpisode(Number(id));

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};

// Function that partially updates episode data
export const patchEpisode = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const id = extractUrlParam(request.url, Routes.EPISODE_PATCH);
  const body = await bodyParser(request);

  const content: PodcastTransferModel = await servicePatchEpisode(
    Number(id),
    body,
  );

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};
