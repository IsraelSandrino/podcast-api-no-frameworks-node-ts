import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceUpdateEpisode } from "../episodes.service";
import * as repository from "../episodes.repository";
import { StatusCode } from "../../../utils/status-code";

describe("update-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceUpdateEpisode", () => {
    it("deve retornar status 200 com os dados do episódio atualizado", () => {
      const episodeMock = {
        id: 2,
        podcast_id: 5,
        title: "ISRAEL SANDRINO VAI A LUA - Venus #007",
        video_id: "RcLCo_C4aE2",
        created_at: "2023-01-07",
      };

      const updateInput = {
        id: 2,
        podcast_id: 5,
        title: "ISRAEL SANDRINO VAI A LUA - Venus #007",
        video_id: "RcLCo_C4aE2",
      };

      const repositorySpy = vi
        .spyOn(repository, "repositoryUpdateEpisode")
        .mockReturnValue([episodeMock]);

      const result = serviceUpdateEpisode(updateInput);

      expect(repositorySpy).toHaveBeenCalledWith(updateInput);
      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: [episodeMock],
      });
    });
  });
});
