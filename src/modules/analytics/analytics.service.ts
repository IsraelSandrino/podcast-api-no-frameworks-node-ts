import { AnalyticsTransferModel } from "./analytics.types";
import {
  repositoryEpisodeAnalytics,
  repositoryPodcastAnalytics,
  repositoryRegisterPlay,
} from "./analytics.repository";
import { StatusCode } from "../../utils/status-code";

export const serviceRegisterPlay = (
  episode_id: number,
  user_id: number,
): AnalyticsTransferModel => {
  const result = repositoryRegisterPlay(episode_id, user_id);

  return {
    statusCode: StatusCode.CREATED,
    body: result,
  };
};

export const serviceEpisodeAnalytics = (
  episode_id: number,
): AnalyticsTransferModel => {
  const episodeAnalytics = repositoryEpisodeAnalytics(episode_id);

  return {
    statusCode: StatusCode.OK,
    body: episodeAnalytics,
  };
};

export const servicePodcastAnalytics = (
  podcastName: string,
): AnalyticsTransferModel => {
  const podcastAnalytics = repositoryPodcastAnalytics(podcastName);

  if (!podcastAnalytics) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: [],
    };
  }

  return {
    statusCode: StatusCode.OK,
    body: [podcastAnalytics],
  };
};
