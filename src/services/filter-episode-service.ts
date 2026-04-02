import { repositoryPodcast } from "../repositories/podcasts-repository";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { StatusCode } from "../utils/status-code";

export const serviceFilterEpisodes = async (
  podcastsName: string | undefined,
): Promise<PodcastTransferModel> => {
  // define a interface de retorno
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  // busca os dados
  const queryString = podcastsName?.split("?p=")[1] || "";
  const data = await repositoryPodcast(queryString);

  //verifica se tem conteúdo
  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
    body: data,
  };

  return responseFormat;
};
