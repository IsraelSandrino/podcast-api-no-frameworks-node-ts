import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceDeleteEpisode } from "../episodes.service";
import * as repository from "../episodes.repository";
import { StatusCode } from "../../../utils/status-code";

describe("delete-episode-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceDeleteEpisode", () => {
    it("deve retornar status 204 sem conteúdo", () => {
      const repositorySpy = vi
        .spyOn(repository, "repositoryDeleteEpisode")
        .mockReturnValue();

      const result = serviceDeleteEpisode(1);

      expect(repositorySpy).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        statusCode: StatusCode.NO_CONTENT,
        body: [],
      });
    });
  });
});
