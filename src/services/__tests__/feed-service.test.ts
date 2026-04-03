import { beforeEach, describe, expect, it, vi } from "vitest";

import { serviceFeed } from "../feed-service";
import * as repository from "../../repositories/podcasts-repository";
import { StatusCode } from "../../utils/status-code";

describe("feed-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceFeed", () => {
    it("deve retornar status 200 com o feed do podcast", () => {
      const episodesMock = [
        {
          id: 1,
          podcastName: "Venus Podcast",
          episode: "Episodio 1",
          videoId: "abc123",
          date: "2023-01-07",
        },
      ];

      const repositorySpy = vi
        .spyOn(repository, "repositoryPodcast")
        .mockReturnValue(episodesMock as any);

      const result = serviceFeed("Venus Podcast");

      expect(repositorySpy).toHaveBeenCalledWith("Venus Podcast");
      expect(result.statusCode).toBe(StatusCode.OK);
      expect(result.body).toContain("<title>Venus Podcast</title>");
      expect(result.body).toContain("<title>Episodio 1</title>");
      expect(result.body).toContain("https://www.youtube.com/watch?v=abc123");
    });
  });
});
