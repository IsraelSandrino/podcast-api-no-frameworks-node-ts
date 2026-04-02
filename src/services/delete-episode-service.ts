import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryDeleteEpisode } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceDeleteEpisode = (id: number): PodcastTransferModel => {
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  repositoryDeleteEpisode(id);

  responseFormat = {
    statusCode: StatusCode.NO_CONTENT,
    body: [],
  };

  return responseFormat;
};
