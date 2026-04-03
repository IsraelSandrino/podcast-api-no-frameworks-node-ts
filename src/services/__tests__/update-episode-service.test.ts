import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceUpdateEpisode } from "../update-episode-service";
import * as repository from "../../repositories/podcasts-repository";
import { StatusCode } from "../../utils/status-code";

describe("update-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceUpdateEpisode", () => {
    it("deve retornar status 200 com os dados do episódio atualizado", () => {
      const episodeMock = {
        id: 2,
        podcastName: "Venus Podcast",
        episode: "ISRAEL SANDRINO VAI A LUA - Venus #007",
        video_id: "RcLCo_C4aE2",
        categories: ["ciencia", "entreterimento"],
        date: "2023-01-07",
      };

      const repositorySpy = vi
        .spyOn(repository, "repositoryUpdateEpisode")
        .mockReturnValue([episodeMock]);

      const result = serviceUpdateEpisode(episodeMock);

      expect(repositorySpy).toHaveBeenCalledWith(episodeMock);
      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: [episodeMock],
      });
    });
  });
});
