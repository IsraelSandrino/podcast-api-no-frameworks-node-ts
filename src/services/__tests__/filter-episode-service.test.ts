import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceFilterEpisodes } from "../filter-episode-service";
import * as repository from "../../repositories/podcasts-repository";
import { StatusCode } from "../../utils/status-code";

describe("filter-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceFilterEpisodes", () => {
    it("deve retornar status 200 com os episódios filtrados do podcast", async () => {
      const episodesListMock = [
        {
          id: 2,
          podcastName: "Venus Podcast",
          episode: "ISRAEL SANDRINO VAI A LUA - Venus #007",
          video_id: "RcLCo_C4aE2",
          categories: ["ciencia", "entreterimento"],
          date: "2023-01-07",
        },
      ];

      const repositorySpy = vi
        .spyOn(repository, "repositoryPodcast")
        .mockReturnValue(episodesListMock);

      const result = await serviceFilterEpisodes(
        "/api/episode?p=Venus Podcast",
      );

      expect(repositorySpy).toHaveBeenCalledWith("Venus Podcast");
      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: episodesListMock,
      });
    });
  });
});
