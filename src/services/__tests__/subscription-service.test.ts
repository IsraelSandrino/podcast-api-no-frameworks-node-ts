import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  serviceListSubscriptions,
  serviceSubscribe,
  serviceUnsubscribe,
} from "../subscription-service";
import * as repository from "../../repositories/subscriptions-repository";
import { StatusCode } from "../../utils/status-code";

describe("subscription-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("serviceSubscribe", () => {
    it("deve retornar status 201 com os dados da inscrição", () => {
      const subscriptionMock = {
        id: 1,
        user_id: 1,
        podcast_id: 1,
        created_at: "2023-01-07T10:00:00.000Z",
      };

      const repositorySpy = vi
        .spyOn(repository, "repositorySubscribe")
        .mockReturnValue(subscriptionMock as any);

      const result = serviceSubscribe(1, 1);

      expect(repositorySpy).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual({
        statusCode: StatusCode.CREATED,
        body: subscriptionMock,
      });
    });
  });

  describe("serviceUnsubscribe", () => {
    it("deve retornar status 204 sem conteúdo", () => {
      const repositorySpy = vi
        .spyOn(repository, "repositoryUnsubscribe")
        .mockReturnValue();

      const result = serviceUnsubscribe(1, 1);

      expect(repositorySpy).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual({
        statusCode: StatusCode.NO_CONTENT,
        body: [],
      });
    });
  });

  describe("serviceListSubscriptions", () => {
    it("deve retornar status 200 com os dados das inscrições", () => {
      const subscriptionsMock = [
        {
          id: 1,
          user_id: 1,
          podcast_id: 1,
          created_at: "2023-01-07T10:00:00.000Z",
        },
      ];

      const repositorySpy = vi
        .spyOn(repository, "repositoryListSubscriptions")
        .mockReturnValue(subscriptionsMock);

      const result = serviceListSubscriptions(1);

      expect(repositorySpy).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        statusCode: StatusCode.OK,
        body: subscriptionsMock,
      });
    });
  });
});
