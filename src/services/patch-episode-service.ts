import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPatchEpisode } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const servicePatchEpisode = (
  id: number,
  body: Partial<PodcastModel>,
): PodcastTransferModel => {
  repositoryPatchEpisode(id, body);

  return {
    statusCode: StatusCode.OK,
    body: [],
  };
};
