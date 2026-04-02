import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryCreateEpisode } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceCreateEpisode = (
  data: PodcastModel,
): PodcastTransferModel => {
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  const result = repositoryCreateEpisode(data);

  responseFormat = {
    statusCode: StatusCode.CREATED,
    body: result,
  };

  return responseFormat;
};
