import { beforeEach, describe, expect, it, vi } from "vitest";

import { servicePatchEpisode } from "../patch-episode-service";
import * as repository from "../../repositories/podcasts-repository";
import { StatusCode } from "../../utils/status-code";

describe("patch-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("servicePatchEpisode", () => {
    it("deve retornar status 200 sem conteúdo", () => {
      const partialEpisodeMock = {
        podcastName: "Flow Podcast",
        episode: "ROBINSON FARINAZZO [ARTE DA GUERRA] - Flow #581",
      };

      const repositorySpy = vi
        .spyOn(repository, "repositoryPatchEpisode")
        .mockReturnValue(undefined);

      const result = servicePatchEpisode(1, partialEpisodeMock);

      expect(repositorySpy).toHaveBeenCalledWith(1, partialEpisodeMock);

      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: [],
      });
    });
  });
});
