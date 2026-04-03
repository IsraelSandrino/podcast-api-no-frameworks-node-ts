import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  serviceEpisodeAnalytics,
  servicePodcastAnalytics,
  serviceRegisterPlay,
} from "../analytics-service";
import * as repository from "../../repositories/analytics-repository";
import { StatusCode } from "../../utils/status-code";

describe("analytics-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceRegisterPlay", () => {
    it("deve retornar status 201 com os dados do play registrado", () => {
      const playMock = {
        id: 1,
        episode_id: 10,
        user_id: 5,
        played_at: "2026-04-03T10:00:00.000Z",
      };

      const repositorySpy = vi
        .spyOn(repository, "repositoryRegisterPlay")
        .mockReturnValue(playMock);

      const result = serviceRegisterPlay(10, 5);

      expect(repositorySpy).toHaveBeenCalledWith(10, 5);
      expect(result).toEqual({
        statusCode: StatusCode.CREATED,
        body: playMock,
      });
    });
  });

  describe("serviceEpisodeAnalytics", () => {
    it("deve retornar status 200 com os analytics do episódio", () => {
      const analyticsMock = [
        {
          data: "2026-04-03",
          plays_no_dia: 3,
          total_plays_historico: 12,
        },
        {
          data: "2026-04-02",
          plays_no_dia: 1,
          total_plays_historico: 12,
        },
      ];

      const repositorySpy = vi
        .spyOn(repository, "repositoryEpisodeAnalytics")
        .mockReturnValue(analyticsMock);

      const result = serviceEpisodeAnalytics(7);

      expect(repositorySpy).toHaveBeenCalledWith(7);
      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: analyticsMock,
      });
    });
  });

  describe("servicePodcastAnalytics", () => {
    it("deve retornar status 200 e encapsular o analytics do podcast em array", () => {
      const analyticsMock = {
        total_plays: 20,
        top_episode: "Flow #100",
        current_week_plays: "5 plays nesta semana",
      };

      const repositorySpy = vi
        .spyOn(repository, "repositoryPodcastAnalytics")
        .mockReturnValue(analyticsMock);

      const result = servicePodcastAnalytics("flow");

      expect(repositorySpy).toHaveBeenCalledWith("flow");
      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: [analyticsMock],
      });
    });

    it("deve retornar status 404 quando não houver analytics para o podcast", () => {
      const repositorySpy = vi
        .spyOn(repository, "repositoryPodcastAnalytics")
        .mockReturnValue(undefined);

      const result = servicePodcastAnalytics("podcast-inexistente");

      expect(repositorySpy).toHaveBeenCalledWith("podcast-inexistente");
      expect(result).toEqual({
        statusCode: StatusCode.NOT_FOUND,
        body: [],
      });
    });
  });
});
