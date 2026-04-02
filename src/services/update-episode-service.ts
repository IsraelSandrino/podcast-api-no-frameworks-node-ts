import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryUpdateEpisode } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceUpdateEpisode = (
  data: PodcastModel,
): PodcastTransferModel => {
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  const result = repositoryUpdateEpisode(data);
  responseFormat = {
    statusCode: StatusCode.OK,
    body: result,
  };

  return responseFormat;
};
