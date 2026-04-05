import { beforeEach, describe, expect, it, vi } from "vitest";

import { servicePatchEpisode } from "../episodes.service";
import * as repository from "../episodes.repository";
import { StatusCode } from "../../../utils/status-code";

describe("patch-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("servicePatchEpisode", () => {
    it("deve retornar status 200 sem conteúdo", () => {
      const partialEpisodeMock = {
        title: "ROBINSON FARINAZZO [ARTE DA GUERRA] - Flow #581",
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
