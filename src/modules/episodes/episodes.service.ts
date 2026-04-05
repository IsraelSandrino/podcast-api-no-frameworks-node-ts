import {
  CreateEpisodeInput,
  EpisodeEntity,
  EpisodeOutput,
  PatchEpisodeInput,
  PodcastTransferModel,
  UpdateEpisodeInput,
} from "./episodes.types";
import {
  repositoryCreateEpisode,
  repositoryDeleteEpisode,
  repositoryPatchEpisode,
  repositoryPodcast,
  repositoryUpdateEpisode,
} from "./episodes.repository";
import { StatusCode } from "../../utils/status-code";

const toEpisodeOutput = (episode: EpisodeEntity): EpisodeOutput => ({
  id: episode.id,
  podcast_id: episode.podcast_id,
  title: episode.title,
  video_id: episode.video_id,
  created_at: episode.created_at,
});

export const serviceCreateEpisode = (
  data: CreateEpisodeInput,
): PodcastTransferModel => {
  const result = repositoryCreateEpisode(data);

  return {
    statusCode: StatusCode.CREATED,
    body: result.map(toEpisodeOutput),
  };
};

export const serviceDeleteEpisode = (id: number): PodcastTransferModel => {
  repositoryDeleteEpisode(id);

  return {
    statusCode: StatusCode.NO_CONTENT,
    body: [],
  };
};

export const serviceFilterEpisodes = async (
  podcastName: string | undefined,
): Promise<PodcastTransferModel> => {
  const data = await repositoryPodcast(podcastName);

  return {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
    body: data.map(toEpisodeOutput),
  };
};

export const serviceListEpisodes = async (): Promise<PodcastTransferModel> => {
  const data = await repositoryPodcast();

  return {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
    body: data.map(toEpisodeOutput),
  };
};

export const servicePatchEpisode = (
  id: number,
  body: PatchEpisodeInput,
): PodcastTransferModel => {
  repositoryPatchEpisode(id, body);

  return {
    statusCode: StatusCode.OK,
    body: [],
  };
};

export const serviceUpdateEpisode = (
  data: UpdateEpisodeInput,
): PodcastTransferModel => {
  const result = repositoryUpdateEpisode(data);

  return {
    statusCode: StatusCode.OK,
    body: result.map(toEpisodeOutput),
  };
};
