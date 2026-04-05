import { AppError } from "../../shared/errors/app-error";
import { SubscriptionTransferModel } from "./subscriptions.types";
import {
  repositoryFindSubscription,
  repositoryListSubscriptions,
  repositorySubscribe,
  repositoryUnsubscribe,
} from "./subscriptions.repository";
import { StatusCode } from "../../utils/status-code";

export const serviceSubscribe = (
  user_id: number,
  podcast_id: number,
): SubscriptionTransferModel => {
  const existingSubscription = repositoryFindSubscription(user_id, podcast_id);

  if (existingSubscription) {
    throw new AppError("Usuário já inscrito neste podcast", StatusCode.CONFLICT);
  }

  const result = repositorySubscribe(user_id, podcast_id);

  return {
    statusCode: StatusCode.CREATED,
    body: result,
  };
};

export const serviceUnsubscribe = (
  user_id: number,
  podcast_id: number,
): SubscriptionTransferModel => {
  const existingSubscription = repositoryFindSubscription(user_id, podcast_id);

  if (!existingSubscription) {
    throw new AppError("Inscrição não encontrada", StatusCode.NOT_FOUND);
  }

  repositoryUnsubscribe(user_id, podcast_id);

  return {
    statusCode: StatusCode.NO_CONTENT,
    body: [],
  };
};

export const serviceListSubscriptions = (
  user_id: number,
): SubscriptionTransferModel => {
  const subscriptions = repositoryListSubscriptions(user_id);

  return {
    statusCode: StatusCode.OK,
    body: subscriptions,
  };
};
