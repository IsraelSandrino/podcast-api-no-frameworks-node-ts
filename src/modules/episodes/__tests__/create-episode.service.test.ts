import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceCreateEpisode } from "../episodes.service";
import * as repository from "../episodes.repository";
import { StatusCode } from "../../../utils/status-code";

describe("create-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceCreateEpisode", () => {
    it("deve retornar status 201 com os dados do episódio criado", () => {
      const episodeMock = {
        id: 2,
        podcast_id: 5,
        title: "ISRAEL SANDRINO VAI A LUA - Venus #007",
        video_id: "RcLCo_C4aE2",
        created_at: "2023-01-07",
      };

      const createInput = {
        podcast_id: 5,
        title: "ISRAEL SANDRINO VAI A LUA - Venus #007",
        video_id: "RcLCo_C4aE2",
      };

      const repositorySpy = vi
        .spyOn(repository, "repositoryCreateEpisode")
        .mockReturnValue([episodeMock]);

      const result = serviceCreateEpisode(createInput);

      expect(repositorySpy).toHaveBeenCalledWith(createInput);
      expect(result).toEqual({
        statusCode: StatusCode.CREATED,
        body: [episodeMock],
      });
    });
  });
});
