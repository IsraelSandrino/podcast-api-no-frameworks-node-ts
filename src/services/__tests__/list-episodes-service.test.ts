import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceListEpisodes } from "../list-episodes-service";
import * as repository from "../../repositories/podcasts-repository";
import { StatusCode } from "../../utils/status-code";

describe("list-episodes-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceListEpisodes", () => {
    it("deve retornar status 200 com os episódios do podcast", async () => {
      const episodesMock = [
        {
          id: 1,
          podcastName: "Flow Podcast",
          episode: "ROBINSON FARINAZZO [ARTE DA GUERRA] - Flow #581",
          video_id: "we9abjZyjo8",
          categories: ["guerra", "conhecimento", "história"],
          date: "2024-04-03",
        },
        {
          id: 2,
          podcastName: "Flow Podcast",
          episode: "DJ ARMIN VAN BUUREN - Flow #577",
          video_id: "C4aE2_RcLCo",
          categories: ["música", "entreterimento"],
          date: "2025-02-01",
        },
      ];

      vi.spyOn(repository, "repositoryPodcast").mockReturnValue(episodesMock);

      const result = await serviceListEpisodes();

      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: episodesMock,
      });
    });
  });
});
