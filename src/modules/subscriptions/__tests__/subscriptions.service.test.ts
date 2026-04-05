import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  serviceListSubscriptions,
  serviceSubscribe,
  serviceUnsubscribe,
} from "../subscriptions.service";
import * as repository from "../subscriptions.repository";
import { StatusCode } from "../../../utils/status-code";

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

      vi.spyOn(repository, "repositoryFindSubscription").mockReturnValue(
        undefined,
      );

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

    it("deve lançar erro quando o usuário já estiver inscrito", () => {
      vi.spyOn(repository, "repositoryFindSubscription").mockReturnValue({
        id: 1,
        user_id: 1,
        podcast_id: 1,
        created_at: "2023-01-07T10:00:00.000Z",
      });

      expect(() => serviceSubscribe(1, 1)).toThrowError(
        "Usuário já inscrito neste podcast",
      );
    });
  });

  describe("serviceUnsubscribe", () => {
    it("deve retornar status 204 sem conteúdo", () => {
      vi.spyOn(repository, "repositoryFindSubscription").mockReturnValue({
        id: 1,
        user_id: 1,
        podcast_id: 1,
        created_at: "2023-01-07T10:00:00.000Z",
      });

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

    it("deve lançar erro quando a inscrição não existir", () => {
      vi.spyOn(repository, "repositoryFindSubscription").mockReturnValue(
        undefined,
      );

      expect(() => serviceUnsubscribe(1, 1)).toThrowError(
        "Inscrição não encontrada",
      );
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
