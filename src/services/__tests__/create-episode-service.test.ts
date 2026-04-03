import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceCreateEpisode } from "../create-episode-service";
import * as repository from "../../repositories/podcasts-repository";
import { StatusCode } from "../../utils/status-code";

describe("create-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceCreateEpisode", () => {
    it("deve retornar status 201 com os dados do episódio criado", () => {
      const episodeMock = {
        id: 2,
        podcastName: "Venus Podcast",
        episode: "ISRAEL SANDRINO VAI A LUA - Venus #007",
        video_id: "RcLCo_C4aE2",
        categories: ["ciencia", "entreterimento"],
        date: "2023-01-07",
      };

      const repositorySpy = vi
        .spyOn(repository, "repositoryCreateEpisode")
        .mockReturnValue([episodeMock]);

      const result = serviceCreateEpisode(episodeMock);

      expect(repositorySpy).toHaveBeenCalledWith(episodeMock);
      expect(result).toEqual({
        statusCode: StatusCode.CREATED,
        body: [episodeMock],
      });
    });
  });
});
