import { beforeEach, describe, expect, it, vi } from "vitest";

import * as repository from "../episodes.repository";
import { StatusCode } from "../../../utils/status-code";
import { serviceFilterEpisodes } from "../episodes.service";

describe("filter-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceFilterEpisodes", () => {
    it("deve retornar status 200 com os episódios filtrados do podcast", async () => {
      const episodesListMock = [
        {
          id: 2,
          podcast_id: 5,
          title: "ISRAEL SANDRINO VAI A LUA - Venus #007",
          video_id: "RcLCo_C4aE2",
          created_at: "2023-01-07",
        },
      ];

      const repositorySpy = vi
        .spyOn(repository, "repositoryPodcast")
        .mockReturnValue(episodesListMock);

      const result = await serviceFilterEpisodes("Venus Podcast");

      expect(repositorySpy).toHaveBeenCalledWith("Venus Podcast");
      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: episodesListMock,
      });
    });
  });
});
