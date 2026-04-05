import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceListEpisodes } from "../episodes.service";
import * as repository from "../episodes.repository";
import { StatusCode } from "../../../utils/status-code";

describe("list-episodes-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceListEpisodes", () => {
    it("deve retornar status 200 com os episódios do podcast", async () => {
      const episodesMock = [
        {
          id: 1,
          podcast_id: 10,
          title: "ROBINSON FARINAZZO [ARTE DA GUERRA] - Flow #581",
          video_id: "we9abjZyjo8",
          created_at: "2024-04-03",
        },
        {
          id: 2,
          podcast_id: 10,
          title: "DJ ARMIN VAN BUUREN - Flow #577",
          video_id: "C4aE2_RcLCo",
          created_at: "2025-02-01",
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
